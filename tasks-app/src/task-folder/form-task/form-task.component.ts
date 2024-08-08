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
import { Task } from '../task/task.interface';
import { Member } from '../../_interfaces/detailed_member.interface';
import { MemberService } from '../../_services/members-service.service';
import { ActiveTaskService } from '../../_services/active_tasks.service';
import { DropdownReusableComponent } from '../../_shared/dropdown-reusable/dropdown-reusable.component';
import { SummaryMember } from '../../_interfaces/team-member.interface';
import { CommonModule } from '@angular/common';


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

  constructor(private fb: FormBuilder) {
    this.formGroupTask = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
    // If task data is provided (for editing), pre-fill the form
    if (this.task) {
      this.formGroupTask.patchValue({
        title: this.task.title,
        description: this.task.description,
        userId: this.task.userId, // Pre-fill userId if available
      });
    }

    this.memberService.getServices().subscribe({
      next: (members) => {
        this.members = members;
        console.log(this.members); // Verifică dacă membrii sunt corect încărcați
      },
      error: (error) => {
        console.error('Error fetching members:', error);
      }
    });
    
    
  }

  generateRandomId(): string {
    return 'id-' + Math.random().toString(36).substring(2,9);
  }

  onSubmit(): void {
    if (this.formGroupTask.valid) {
      const formData: Task = {
        ...this.formGroupTask.value,
        id: this.task ? this.task.id : this.generateRandomId(), // Retain task ID for editing
      };

      
      this.taskService.addTask(formData).subscribe({
        next: (response) => {
          console.log('Task added successfully:', response);
          
          this.formGroupTask.reset();
        },
        error: (error) => {
          console.error('Error adding task:', error);
        }
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
