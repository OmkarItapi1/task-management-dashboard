import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent {
  newTask: Omit<Task, 'id' | 'createdAt'> = {
    title: '',
    status: 'To Do',
    description: ''
  };

  statusOptions: Task['status'][] = ['To Do', 'In Progress', 'Done'];

  constructor(
    public activeModal: NgbActiveModal,
    private taskService: TaskService
  ) {}
  onSubmit(): void {
    if (!this.newTask.title) return;
  
    this.taskService.addTask(this.newTask).subscribe({
      next: (addedTask) => {
        this.activeModal.close('Task added');

        this.newTask = {
          title: '',
          status: 'To Do',
          description: ''
        };
      },
      error: (err) => {
        console.error('Error adding task:', err);
      }
    });
  }
}