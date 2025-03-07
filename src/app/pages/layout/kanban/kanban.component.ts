import {Component, OnInit} from '@angular/core';
import {ListTasksComponent} from "./components/list-tasks/list-tasks.component";
import {KanbanNavbarComponent} from './components/kanban-navbar/kanban-navbar.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [ListTasksComponent, KanbanNavbarComponent],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent implements OnInit{

  protected readonly open = open;

  boardId: string | null = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id');
    console.log('Board ID:', this.boardId);
  }
}
