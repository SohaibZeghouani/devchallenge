import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Task, NewTask } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [RouterOutlet,CommonModule, FormsModule, TaskModalComponent],
  providers: [HttpClient],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | NewTask = { title: '', description: '', completed: false, status: 'to-do' };
  isModalVisible = false;
  boardId: string = '';
  currentDate: Date = new Date();
  icons: { [key: string]: string } = {
    'to-do': '📚',
    'in-progress': '⏰',
    'completed': '🏋️',
    'wont-do': '☕'
  };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.initializeBoard();
  }

  initializeBoard(): void {
    const storedBoardId = localStorage.getItem('boardId');
    if (storedBoardId) {
      this.boardId = storedBoardId;
      this.loadTasks();
    } else {
      this.taskService.createBoard().subscribe(response => {
        this.boardId = response.boardId;
        localStorage.setItem('boardId', this.boardId);
        this.loadTasks();
      }, error => {
        console.error('Error creating board:', error);
      });
    }
  }

  loadTasks(): void {
    this.taskService.getTasks(this.boardId).subscribe(
      (tasks) => this.tasks = tasks,
      (error) => console.error('Error loading tasks:', error)
    );
  }

  addTask(): void {
    this.selectedTask = { title: '', description: '', status: 'to-do', completed: false };
    this.isModalVisible = true;
  }

  editTask(task: Task): void {
    this.selectedTask = { ...task };
    this.isModalVisible = true;
  }

  handleSaveTask(task: Task | NewTask): void {
    if (this.isNewTask(task)) {
      this.createTask(task as NewTask);
    } else {
      this.updateTask(task as Task);
    }
    this.closeModal();
  }

  isNewTask(task: Task | NewTask): task is NewTask {
    return (task as NewTask)._id === undefined;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  createTask(task: NewTask): void {
    this.taskService.createTask(this.boardId, task).subscribe(
      (newTask) => this.tasks.push(newTask),
      (error) => console.error('Error adding task:', error)
    );
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(this.boardId, task._id, task).subscribe(
      (updatedTask) => {
        const index = this.tasks.findIndex(t => t._id === updatedTask._id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },
      (error) => console.error('Error updating task:', error)
    );
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(this.boardId, taskId).subscribe(
      () => {
        this.tasks = this.tasks.filter(t => t._id !== taskId);
      },
      (error) => console.error('Error deleting task:', error)
    );
  }

  getIconForStatus(status: string): string {
    return this.icons[status] || '❓'; // Default case if the status is not recognized
  }
}
