// src/app/services/task.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, NewTask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  createBoard(): Observable<{ boardId: string }> {
    return this.http.post<{ boardId: string }>(`${this.apiUrl}/boards`, {});
  }

  // Get tasks for a specific board
  getTasks(boardId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/boards/${boardId}/tasks`);
  }

  // Create a task for a specific board
  createTask(boardId: string, task: NewTask): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/boards/${boardId}/tasks`, task);
  }

  updateTask(boardId: string, taskId: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/boards/${boardId}/tasks/${taskId}`, task);
  }

  deleteTask(boardId: string, taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/boards/${boardId}/tasks/${taskId}`);
  }
}
