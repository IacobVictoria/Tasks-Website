import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Member } from '../../_interfaces/detailed_member.interface';
import { MemberService } from '../../_services/members-service.service';
import { ActiveTaskService } from '../../_services/active_tasks.service';
import { DropdownReusableComponent } from '../../_shared/dropdown-reusable/dropdown-reusable.component';
import { SummaryMember } from '../../_interfaces/team-member.interface';
import { CommonModule } from '@angular/common';
import { MemberDropdownOption } from '../../_interfaces/member-dropdown.interface';
import { Task } from '../../_interfaces/task.interface';
import { ActivatedRoute } from '@angular/router';
import { UpdateTaskRequest } from '../../_interfaces/update_task_request.interface';
import { ShowLeavePageConfirmationDialog } from '../../_interfaces/show-leave-confirmation-dialog.interface';

@Component({
  selector: 'app-form-task',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownReusableComponent, CommonModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css',
})
export class FormTaskComponent implements OnInit, ShowLeavePageConfirmationDialog {
  // sa se deschida form ul asta si daca am de adaugat si daca am de editat
  //daca e de editat sa imi apara datele deja acolo
  formGroupTask!: FormGroup;
  @Output() formSubmitted = new EventEmitter<Task>(); // trimite catre parinte
  members: SummaryMember[] = [];
  private taskService = inject(ActiveTaskService);
  private memberService = inject(MemberService);
  route = inject(ActivatedRoute);
  memberOptions: MemberDropdownOption[] = []; // tr sa fac un array de options ca sa pot sa bag in dropdown ul reutilizabil
  formTitle: string = '';
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder) {
    const currentDate = new Date().toISOString().split('T')[0];
    this.formGroupTask = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      userId: ['', Validators.required],
      dueDate: [currentDate, Validators.required],
    });
  }

  ngOnInit(): void {
    // If task data is provided (for editing), pre-fill the form
    const taskId = this.route.snapshot.paramMap.get('id');

    if (taskId) {
      this.taskService.getTaskByID(taskId).subscribe((task) => {
        if (task) {
          this.formTitle = 'Edit Task';
          this.formGroupTask.patchValue({
            title: task.title,
            description: task.description,
            userId: task.userId,
            dueDate: task.dueDate,
          });
        }
      });
    } else {
      this.formTitle = 'Add Task';
    }

    this.memberService.getServices().subscribe({
      next: (members) => {
        this.members = members;
        this.memberOptions = this.transformMembersToDropdownOptions(
          this.members
        );
      },
      error: (error) => {
        console.error('Error fetching members:', error);
      },
    });


  }

  transformMembersToDropdownOptions(
    members: SummaryMember[]
  ): MemberDropdownOption[] {
    return members.map((member) => ({
      id: member.id,
      name: `${member.firstName} ${member.lastName}`,
      imageUrl: member.avatar,
    }));
    //returnam un obiect il punem intre ()
  }

  generateRandomId(): string {
    return 'id-' + Math.random().toString(36).substring(2, 9);
  }

  onSubmit(): void {
    const currentDate = new Date().toISOString().split('T')[0];
  
    if (this.formGroupTask.valid) {
      this.isSubmitting = true;

      let formData: Task;
      let formDataUpdate: UpdateTaskRequest;

      if (this.formTitle === 'Add Task') {
        // Construiește formData pentru adăugarea unui task nou, inclusiv userId
        formData = {
          ...this.formGroupTask.value,
          id: this.generateRandomId(), // Generează un ID nou
          status: 1,
          completedAt: currentDate,
          startedAt: currentDate,
        };
        this.taskService.addTask(formData).subscribe({
          next: (response) => {
            console.log('Task added successfully:', response);
            this.formGroupTask.reset();
            this.isSubmitting = false;
          },
          error: (error) => {
            console.error('Error adding task:', error);
            this.isSubmitting = false;
          },
        });
      } else {
        // Construiește formData pentru actualizarea unui task existent, fără userId
        const { title, description, dueDate, userId } = this.formGroupTask.value;
        const taskId = this.route.snapshot.paramMap.get('id');
        formDataUpdate = {
          id: String(taskId), // Folosește ID-ul existent
          title,
          description,
          userId,
          dueDate,
          status:1, // păstrează statusul existent sau un status nou dacă e nevoie
          completedAt: currentDate,
        };
        console.log(formDataUpdate);
        this.taskService.editTask(formDataUpdate).subscribe({
          next: (response) => {
            console.log('Task updated successfully:', response);
            this.formGroupTask.reset();
            this.isSubmitting = false;
          },
          error: (error) => {
            console.error('Error updating task:', error);
            this.isSubmitting = false;
          },
        });
      }
    }
  }
  


  onMemberSelect(event: Member) {
    if (event && event.id) {
      this.formGroupTask.patchValue({
        userId: event.id,
      });
    }
  }

  showLeavePageConfirmationDialog(): boolean {
		return this.formGroupTask.dirty && !this.isSubmitting;
	}
}
