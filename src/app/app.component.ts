import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskBoardComponent } from './task-board/task-board.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TaskBoardComponent],
  providers:[HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tasktodo';
}
