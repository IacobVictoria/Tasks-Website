import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './task.interface';
import { ActiveTask } from '../../_interfaces/task_active.interface';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task!: ActiveTask;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  editTask() {
    this.edit.emit(this.task.id);
  }

  deleteTask() {
    this.delete.emit(this.task.id);
  }
}
