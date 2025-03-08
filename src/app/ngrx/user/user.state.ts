import { UserModel } from '../../models/user.model';

export interface UserState {
  datastore: UserModel[];
  selectedUser: UserModel | null;
  error: string | null;
}
