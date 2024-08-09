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

@Component({
  selector: 'app-form-task',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownReusableComponent, CommonModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css',
})
export class FormTaskComponent implements OnInit {
  // sa se deschida form ul asta si daca am de adaugat si daca am de editat
  //daca e de editat sa imi apara datele deja acolo
  formGroupTask!: FormGroup;
  @Input() task!: Task | null; // input pt a primi date de la componenta parinte
  @Output() formSubmitted = new EventEmitter<Task>(); // trimite catre parinte
  members: SummaryMember[] = [];
  private taskService = inject(ActiveTaskService);
  private memberService = inject(MemberService);
  route = inject(ActivatedRoute);
  memberOptions: MemberDropdownOption[] = []; // tr sa fac un array de options ca sa pot sa bag in dropdown ul reutilizabil
  formTitle: string = '';

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
      const formData: Task = {
        ...this.formGroupTask.value,
        id: this.task ? this.task.id : this.generateRandomId(), // Retain task ID for editing
        status: 1,
        completedAt: currentDate, // Asigură-te că este null
        startedAt: currentDate,
      };
      console.log(formData);
      this.taskService.addTask(formData).subscribe({
        next: (response) => {
          console.log('Task added successfully:', response);

          this.formGroupTask.reset();
        },
        error: (error) => {
          console.error('Error adding task:', error);
        },
      });
    }
  }

  onMemberSelect(event: Member) {
    if (event && event.id) {
      this.formGroupTask.patchValue({
        userId: event.id,
      });
    }
  }
}
