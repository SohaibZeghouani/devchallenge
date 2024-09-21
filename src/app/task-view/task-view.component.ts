// src/app/task-view/task-view.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';  // Import the TaskService
import { Task } from '../models/task.model'; // Import Task model
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class TaskViewComponent implements OnInit {
  tasks: Task[] = [];    // List of tasks
  boardId: string = '';  // Board ID passed through the route
  currentDate: Date = new Date(); // Add this

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to route parameters to get boardId
    this.route.params.subscribe(params => {
      this.boardId = params['boardId'];
      this.loadTasks(); // Load tasks once the boardId is available
    });
  }

  // Fetch tasks for the board
  loadTasks(): void {
    this.taskService.getTasks(this.boardId).subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  // Optional: Get an icon based on the task status
getIconForStatus(status: string): string {
  const icons: { [key: string]: string } = {
    'to-do': '📚',
    'in-progress': '⏰',
    'completed': '🏋️',
    'wont-do': '☕'
  };
  return icons[status] || '❓'; // Default to '❓' if status is unrecognized
}

}
