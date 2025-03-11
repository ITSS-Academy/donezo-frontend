import {BoardModel} from '../../models/board.model';

export interface BoardState {
  //createBoard
  isBoardCreating: boolean;
  boardCreatingError: string | null;
  isCreateBoardSuccess: boolean;

  boards: BoardModel[] | null;
  isBoardsGetting: boolean;
  boardsGettingError: string | null;
  isGetBoardsSuccess: boolean;

  //getBoard
  board: BoardModel | null;
  isGettingBoard: boolean;
  isGettingBoardSuccess: boolean;
  getBoardError: string;

  //invitedBoards
  invitedBoards: BoardModel[] | null;
  isInvitedBoardsGetting: boolean;
  invitedBoardsGettingError: string | null;
  isGetInvitedBoardsSuccess: boolean;
}
