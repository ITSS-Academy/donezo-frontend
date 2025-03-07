import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as boardActions from './board.actions';
import {catchError, exhaustMap, map, of, switchMap} from 'rxjs';
import {inject} from '@angular/core';
import {BoardService} from '../../services/board/board.service';

export const getBoard$ = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService)) => {
    return actions$.pipe(
      ofType(boardActions.getBoards),
      switchMap(() => {
        console.log('234234234')
        return boardService.getBoards().pipe(
          map((boards: any) => {
            console.log(boards)
            return boardActions.getBoardsSuccess({boards})
          }),
          catchError((error: { message: string }) =>
            of(boardActions.getBoardsFailure({error: error.message}))
          )
        )
      })
    );
  },
  {functional: true}
);

export const createBoard$ = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService)) => {
    return actions$.pipe(
      ofType(boardActions.createBoard),
      exhaustMap(({board}) => {
          const background = board.background instanceof File ? board.background : null;
          return boardService.createBoard(board).pipe(
            map((board: any) => boardActions.createBoardSuccess({board})),
            catchError((error: { message: string }) =>
              of(boardActions.createBoardFailure({error: error.message}))
            )
          )
        }
      )
    );
  },
  {functional: true}
);
