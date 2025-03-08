import { UserState } from './user.state';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserModel } from '../../models/user.model';

export const initialState: UserState = {
  datastore: [],
  selectedUser: null,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.getUserByIdSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    error: null
  })),
  on(UserActions.getUserByIdFailure, (state, { error }) => ({
    ...state,
    selectedUser: null,
    error

  }))

);
