import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AllTasksComponent} from './all-tasks/all-tasks.component';
import {AllBoardsComponent} from './all-boards/all-boards.component';
import {LayoutComponent} from './layout.component';
import {KanbanComponent} from './kanban/kanban.component';

export const LayoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'kanban/:id',
        component: KanbanComponent,
      },
      {
        path: 'allTasks',
        component: AllTasksComponent
      },
      {
        path: 'allBoards',
        component: AllBoardsComponent
      }
    ],
  }
]
