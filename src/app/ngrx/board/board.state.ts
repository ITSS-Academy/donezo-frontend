import {BoardModel} from '../../models/board.model';

export interface BoardState {
  //get boards
  boards: BoardModel[];
  isBoardsLoading: boolean;
  isBoardsSuccess: boolean;
  boardsErrorMessage: string;

  //create board
  isCreateBoardLoading: boolean;
  isCreateBoardSuccess: boolean;
  createBoardErrorMessage: string;
}
