import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Member } from '../_interfaces/team-member.interface';
import { MemberService } from '../_services/members-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-member',
  standalone: true,
  imports: [],
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.css',
})
export class TeamMemberComponent {
  @Input() member!: Member;
  @Output() memberSelected = new EventEmitter<string>();

  onMemberClick() {
    this.memberSelected.emit(this.member.id);
    console.log('Event pe membrul cu id-ul: ', this.member.id);
  }
}
