import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.userService.login(req.body);
    const { status, data } = response;

    return res.status(mapStatusHTTP(status)).json(data);
  };

  public loginRole = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization as string;
    const response = await this.userService.loginRole(token);

    const { status, data } = response;

    return res.status(mapStatusHTTP(status)).json(data);
  };
}
