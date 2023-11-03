import { IUser } from "../../Interfaces/Users/IUser";
import * as bcrypt from 'bcryptjs';

const UserMock: IUser = {
  id: 1,
  username: 'UserMock',
  email: 'usermock@test.com',
  password: bcrypt.hashSync('usermock', 10),
  role: 'user'
}

export { UserMock };