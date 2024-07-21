import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css',
})
export class FormTaskComponent {
  // sa se deschida form ul asta si daca am de adaugat si daca am de editat
  //daca e de editat sa imi apara datele deja acolo
  formGroupTask!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formGroupTask = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {}
}
