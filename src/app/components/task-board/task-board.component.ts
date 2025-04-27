import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  isDragging = false;

  constructor(private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) { }
  get connectedDropLists(): string[] {
    return ['todo-list', 'inprogress-list', 'done-list'];
  }
  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => {
      this.updateTaskLists(tasks);
    });
  }

  private updateTaskLists(tasks: Task[]): void {
    this.todoTasks = tasks.filter(task => task.status === 'To Do');
    this.inProgressTasks = tasks.filter(task => task.status === 'In Progress');
    this.doneTasks = tasks.filter(task => task.status === 'Done');
    this.cdr.detectChanges();
  }

  
  async onTaskDrop(event: CdkDragDrop<Task[]>): Promise<void> {
    this.isDragging = false;
    
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      return;
    }

    const task = event.previousContainer.data[event.previousIndex];
    const newStatus = this.getStatusFromContainerId(event.container.id);
    const originalStatus = task.status;

    task.status = newStatus;
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    try {
      await lastValueFrom(this.taskService.updateTaskStatus(task.id, newStatus));
    } catch (error) {
      console.error('Failed to update task status:', error);
      task.status = originalStatus;
      this.updateTaskLists(this.taskService.tasksSubject.value);
    }
  }

  private getStatusFromContainerId(containerId: string): Task['status'] {
    switch (containerId) {
      case 'todo-list': return 'To Do';
      case 'inprogress-list': return 'In Progress';
      case 'done-list': return 'Done';
      default: return 'To Do';
    }
  }
}