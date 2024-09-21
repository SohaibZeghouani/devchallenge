import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, NewTask, TaskStatus } from '../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TaskModalComponent {
  @Input() task: Task | NewTask = { title: '', description: '', completed: false, status: 'to-do' };
  @Input() isVisible: boolean = false;
  @Output() save = new EventEmitter<Task | NewTask>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();

icons: { [key in TaskStatus]: string } = {
  'to-do': '📚',
  'in-progress': '⏰',
  'completed': '🏋️',
  'wont-do': '☕'
};

  onSave(): void {
    this.save.emit(this.task);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onDelete(): void {
    if ('_id' in this.task) {
      this.delete.emit((this.task as Task)._id);
      this.cancel.emit();
    }
  }
}
