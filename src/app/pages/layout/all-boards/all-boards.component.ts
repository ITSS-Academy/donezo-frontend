import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem} from '@angular/material/menu';


@Component({
  selector: 'app-all-boards',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatMenu,
    MatMenuItem
  ],
  templateUrl: './all-boards.component.html',
  styleUrl: './all-boards.component.scss'
})
export class AllBoardsComponent {

}
