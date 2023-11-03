import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { status, data } = await this.matchService.getAllMatches(inProgress?.toString() || '');

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.updateMatch(Number(id), req.body);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getMatchById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.getMatchById(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { status, data } = await this.matchService.createMatch(req.body);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
