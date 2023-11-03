import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

export default class Validations {
  static async validateLogin(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const BaererToken = req.headers.authorization;
    const token = BaererToken?.split(' ')[1] as string;

    if (!BaererToken) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const isValidToken = await JWT.validateToken(token);

    if (!isValidToken) {
      return res.status(401).json({
        message: 'Token must be a valid token',
      });
    }

    return next();
  }

  static async validateEqualsTeams(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    next();
  }
}
