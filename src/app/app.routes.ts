import { Routes } from '@angular/router';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskViewComponent } from './task-view/task-view.component';

export const routes: Routes = [
    { path: '', component: TaskBoardComponent },
    { path: 'board/:boardId', component: TaskViewComponent },

];
