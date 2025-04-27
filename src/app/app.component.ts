import { Component } from '@angular/core';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-management-dashboard';

  constructor(private modalService: NgbModal) {}

  openAddTaskModal(): void {
    this.modalService.open(AddTaskModalComponent);
  }
}
