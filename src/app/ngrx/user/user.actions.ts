import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';

export const getUserById = createAction('[User] Get User By ID', props<{ userId: string }>());
export const getUserByIdSuccess = createAction('[User] Get User By ID Success', props<{ user: UserModel }>());
export const getUserByIdFailure = createAction('[User] Get User By ID Failure', props<{ error: string }>());
