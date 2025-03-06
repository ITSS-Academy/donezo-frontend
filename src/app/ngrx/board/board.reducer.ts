import {createReducer, on} from '@ngrx/store';
import {BoardState} from './board.state';
import * as boardActions from './board.actions';

const initialState: BoardState = {
  boards: [],
  isBoardsLoading: false,
  isBoardsSuccess: false,
  boardsErrorMessage: '',
  isCreateBoardLoading: false,
  isCreateBoardSuccess: false,
  createBoardErrorMessage: ''
}

export const boardReducer = createReducer(
  initialState,
  on(boardActions.getBoards, (state) => {
    console.log('getBoards')
    return {
      ...state,
      isBoardsLoading: true,
      isBoardsSuccess: false,
      boardsErrorMessage: ''
    }
  }),
  on(boardActions.getBoardsSuccess, (state, {boards}) => {
    console.log('getBoardsSuccess')
    return {
      ...state,
      boards: boards,
      isBoardsLoading: false,
      isBoardsSuccess: true
    }
  }),
  on(boardActions.getBoardsFailure, (state, {error}) => {
    return {
      ...state,
      isBoardsLoading: false,
      isBoardsSuccess: false,
      boardsErrorMessage: error
    }
  }),
  on(boardActions.createBoard, (state) => {
    return {
      ...state,
      isCreateBoardLoading: true,
      isCreateBoardSuccess: false,
      createBoardErrorMessage: ''
    }
  }),
  on(boardActions.createBoardSuccess, (state, {board}) => {
    return {
      ...state,
      isCreateBoardLoading: false,
      isCreateBoardSuccess: true
    }
  }),
  on(boardActions.createBoardFailure, (state, {error}) => {
    return {
      ...state,
      isCreateBoardLoading: false,
      isCreateBoardSuccess: false,
      createBoardErrorMessage: error
    }
  }),
)
