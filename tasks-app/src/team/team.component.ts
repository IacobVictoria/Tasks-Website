import { Component, inject, OnInit } from '@angular/core';
import { TeamMemberComponent } from '../team-member/team-member.component';
import { MemberService } from '../_services/members-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SummaryMember } from '../_interfaces/team-member.interface';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [TeamMemberComponent, CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent implements OnInit {
  members: SummaryMember[] = [];
  private memberService: MemberService = inject(MemberService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    this.memberService.getServices().subscribe((members: SummaryMember[]) => {
      this.members = members;
    });
  }

  navigateToMember(id: string) {
    this.router.navigate(['/team', id]);
  }
}
