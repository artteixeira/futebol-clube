import { IUser, IUserResponse } from './IUser';

export interface IUserModel {
  findByEmail(email: IUser['email']): Promise<IUserResponse | null>
}
