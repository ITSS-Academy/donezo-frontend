import { Component } from '@angular/core';
import {CreateTagComponent} from '../../../components/create-tag/create-tag.component';

@Component({
  selector: 'app-all-boards',
  standalone: true,
  imports: [
    CreateTagComponent
  ],
  templateUrl: './all-boards.component.html',
  styleUrl: './all-boards.component.scss'
})
export class AllBoardsComponent {

}
