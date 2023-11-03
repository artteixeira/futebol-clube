import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILogin } from '../Interfaces/Users/IUser';
import { IToken } from '../Interfaces/IToken';
import { IRole } from '../Interfaces/IRole';
import UserModel from '../models/UserModel';
import JWT from '../utils/JWT';

export default class UserService {
  constructor(
    private userModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    try {
      const user = await this.userModel.findByEmail(data.email);

      if (!user) return { status: 'unauthorized', data: { message: 'Invalid email or password' } };

      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
      }

      const { email } = user;
      const token = this.jwtService.createToken({ email });

      return { status: 'successful', data: { token } };
    } catch (error) {
      return {
        status: 'internalError',
        data: { message: `${error}` },
      };
    }
  }

  public async loginRole(BaererToken: string): Promise<ServiceResponse<ServiceMessage | IRole>> {
    try {
      const token = BaererToken.split(' ')[1];
      const data = this.jwtService.decodeToken(token) as JwtPayload;
      const user = await this.userModel.findByEmail(data.email);

      if (!user) return { status: 'notFound', data: { message: 'User not found' } };

      const { role } = user;

      return { status: 'successful', data: { role } };
    } catch (error) {
      return {
        status: 'internalError',
        data: { message: `${error}` },
      };
    }
  }
}
