import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from '../../../shared/modules/material.module';
import {MatDialog} from '@angular/material/dialog';
import {CreateBoardComponent} from '../../../components/create-board/create-board.component';
import {Store} from '@ngrx/store';
import {BoardState} from '../../../ngrx/board/board.state';
import {Subscription} from 'rxjs';
import {BoardModel} from '../../../models/board.model';
import {NgStyle} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule,
    NgStyle
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);

  subscriptions: Subscription[] = [];
  boards!: BoardModel[];

  constructor(private store: Store<{ board: BoardState }>,
              private router: Router) {
  }

  ngOnInit() {
    this.subscriptions.push(this.store.select('board', 'boards').subscribe((board) => {
        if (board) {
          this.boards = board;
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateBoardComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  deleteBoard(id: string) {

  }

  getBackgroundUrl(board: BoardModel) {
    if (!board.background) {
      return '';
    }

    if (typeof board.background === 'object' && 'fileLocation' in board.background) {
      return board.background.fileLocation || '';
    }

    return board.background as string;
  }

  navigateToBoard(boardId: string) {
    this.router.navigate(['/kanban', boardId]).then(r => console.log(r));
  }
}
