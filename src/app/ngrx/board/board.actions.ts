import {createAction, props} from '@ngrx/store';
import {BoardModel} from '../../models/board.model';

export const getBoards = createAction('[Board] Get Boards')
export const getBoardsSuccess = createAction('[Board] Get Boards Success', props<{ boards: BoardModel[] }>())
export const getBoardsFailure = createAction('[Board] Get Boards Failure', props<{ error: any }>())

export const createBoard = createAction('[Board] Create Board', props<{ board: BoardModel }>())
export const createBoardSuccess = createAction('[Board] Create Board Success', props<{ board: BoardModel }>())
export const createBoardFailure = createAction('[Board] Create Board Failure', props<{ error: any }>())
