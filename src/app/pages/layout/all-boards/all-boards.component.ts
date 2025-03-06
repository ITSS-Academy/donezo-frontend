import { Component } from '@angular/core';
import {CreateTagsComponent} from '../kanban/components/create-tags/create-tags.component';

@Component({
  selector: 'app-all-boards',
  standalone: true,
  imports: [
    CreateTagsComponent
  ],
  templateUrl: './all-boards.component.html',
  styleUrl: './all-boards.component.scss'
})
export class AllBoardsComponent {

}
