import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  SummaryMember } from '../_interfaces/team-member.interface';
import { Member } from '../_interfaces/detailed_member.interface';

@Injectable({ providedIn: 'root' })
export class MemberService {
  private url = 'https://localhost:7036/api/user';
  private httpClient = inject(HttpClient);

  public getServices(): Observable<SummaryMember[]> {
    return this.httpClient.get<SummaryMember[]>(this.url);
  }

  getMemberById(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`${this.url}/by-id?id=${id}`);
  }
}
