import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveTask } from '../_interfaces/task_active.interface';

@Injectable({ providedIn: 'root' })
export class ActiveTaskService {
  private url = 'https://localhost:7036/api/task/active';
  private url2 = 'https://localhost:7036/api/task';
  private httpClient = inject(HttpClient);

  getTaskActiveById(userId: string): Observable<ActiveTask[]> {
    return this.httpClient.get<ActiveTask[]>(`${this.url}/?userId=${userId}`);
  }

  deleteTaskActive(id: string): Observable<ActiveTask[]> {
    return this.httpClient.delete<ActiveTask[]>(`${this.url2}/delete/?id=${id}`);
  }
  
}
