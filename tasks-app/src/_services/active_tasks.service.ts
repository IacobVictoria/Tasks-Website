import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveTask } from '../_interfaces/task_active.interface';
import { Task } from '../_interfaces/task.interface';
import { UpdateTaskRequest } from '../_interfaces/update_task_request.interface';

@Injectable({ providedIn: 'root' })
export class ActiveTaskService {
  private url = 'https://localhost:7036/api/task/active';
  private url2 = 'https://localhost:7036/api/task';
  private httpClient = inject(HttpClient);

  getTaskActiveById(userId: string): Observable<ActiveTask[]> {
    return this.httpClient.get<ActiveTask[]>(`${this.url}/?userId=${userId}`);
  }

  deleteTaskActive(id: string): Observable<ActiveTask[]> {
    return this.httpClient.delete<ActiveTask[]>(
      `${this.url2}/delete/?id=${id}`
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.url2}/add`, task);
  }

  public getTaskByID(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.url2}/by-id?id=${id}`);
  }

  public editTask(editedTask: UpdateTaskRequest): Observable<UpdateTaskRequest> {
    return this.httpClient.put<UpdateTaskRequest>(`${this.url2}/update`, editedTask);
  }
}
