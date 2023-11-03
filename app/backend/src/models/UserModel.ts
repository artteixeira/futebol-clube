import { IUser } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  public async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const User = await this.model.findOne({ where: { email } });

    if (!User) {
      return null;
    }

    const { id, username, role, password }: IUser = User;
    return { id, username, role, email, password };
  }
}
