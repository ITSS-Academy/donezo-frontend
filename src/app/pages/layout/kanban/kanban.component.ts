import {Component} from '@angular/core';
import {ListTasksComponent} from "./components/list-tasks/list-tasks.component";
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [ListTasksComponent, MatButton],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent {

  protected readonly open = open;
}
