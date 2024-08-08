import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MemberService } from '../_services/members-service.service';
import { TaskComponent } from '../task-folder/task/task.component';
import { Member } from '../_interfaces/detailed_member.interface';
import { ActiveTask } from '../_interfaces/task_active.interface';
import { ActiveTaskService } from '../_services/active_tasks.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RefreshService } from '../_services/refresh.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TaskComponent, ConfirmationDialogComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
  member!: Member;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private memberService: MemberService = inject(MemberService);
  private taskService: ActiveTaskService = inject(ActiveTaskService);
  private refreshService: RefreshService = inject(RefreshService);
  showConfirmationDialog = false;
  taskToDelete: string | null = null;
  tasks: ActiveTask[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.memberService.getMemberById(id).subscribe((member) => {
        this.member = member;
      });

      this.loadTasks(id);
    }
    this.refreshService.refresh$.subscribe(() => {
      if (id) {
        this.loadTasks(id); // Reload tasks when refresh event is triggered
      }
    });
  }
  loadTasks(memberId: string): void {
    this.taskService.getTaskActiveById(memberId).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  deleteTask(event: string): void {
    this.showConfirmationDialog = true;
    this.taskToDelete = event;
  }

  onConfirmedDelete(confirmed: boolean) {
    if (confirmed && this.taskToDelete) {
      this.taskService.deleteTaskActive(this.taskToDelete).subscribe({
        next: (updateTasks) => {
          this.tasks = updateTasks;
          this.refreshService.triggerRefresh(); // Trigger a refresh after deletion
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        },
      });
    }
    this.showConfirmationDialog = false;
    this.taskToDelete = null; // Reset the task to delete
  }

  navigateToForm() {
    this.router.navigate([`/add-form`]);
  }
}
