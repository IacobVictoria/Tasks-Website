import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../_interfaces/team-member.interface';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MemberService } from '../_services/members-service.service';
import { dummyTasks } from '../task-folder/dummy-tasks';
import { Task } from '../task-folder/task/task.interface';
import { TaskComponent } from '../task-folder/task/task.component';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
  member!: Member;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private memberService: MemberService = inject(MemberService);
  tasks: Task[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.memberService.getMemberById(id).subscribe((member) => {
        this.member = member;
      });
      this.tasks = dummyTasks.filter((task) => task.userId === id);
    }
  }

  deleteTask(event: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== event);
  }

  navigateToForm() {
    this.router.navigate([`/add-form`]);
  }
}
