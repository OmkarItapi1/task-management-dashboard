import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { tap, catchError } from 'rxjs/operators'; // Add this import


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks'; // json-server endpoint
   tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialTasks();
  }

  private loadInitialTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe(tasks => {
      this.tasksSubject.next(tasks);
    });
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): Observable<Task> {
    const newTask = {
      ...task,
      id: this.generateId(),
      createdAt: new Date()
    };
    // return this.http.post<Task>(this.apiUrl, newTask);

    return this.http.post<Task>(this.apiUrl, newTask).pipe(
      tap(addedTask => {
        // Update local task list immediately
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next([...currentTasks, addedTask]);
      })
    );
  }

  updateTaskStatus(taskId: string, newStatus: Task['status']): Observable<Task> {
    const currentTasks = this.tasksSubject.value;
    const taskToUpdate = currentTasks.find(task => task.id === taskId);
    
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, status: newStatus };
      return this.http.patch<Task>(`${this.apiUrl}/${taskId}`, { status: newStatus });
    }
    
    throw new Error('Task not found');
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}