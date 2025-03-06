import {Routes} from '@angular/router';
import {KanbanComponent} from './kanban.component';
import {CreateTagsComponent} from './components/create-tags/create-tags.component';


export const KanbanRoutes: Routes = [
  {
    path: '',
    component: KanbanComponent,
  },

  {
    path: 'create-tags',
    component: CreateTagsComponent,
  },
]

