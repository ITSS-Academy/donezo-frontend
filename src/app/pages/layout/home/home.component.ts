import {Component, inject} from '@angular/core';
import {MaterialModule} from '../../../shared/modules/material.module';
import {MatDialog} from '@angular/material/dialog';
import {CreateBoardComponent} from '../../../components/create-board/create-board.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateBoardComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
