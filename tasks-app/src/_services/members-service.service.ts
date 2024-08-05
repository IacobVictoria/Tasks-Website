import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../_interfaces/team-member.interface';

@Injectable({ providedIn: 'root' })
export class MemberService {
  private url = 'https://localhost:7036/api/project';
  private httpClient = inject(HttpClient);

  public getServices(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.url);
  }

  getMemberById(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`${this.url}/by-id?id=${id}`);
  }
}
