import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const router = Router();

router.get('/:path', (req: Request, res: Response) =>
  teamController.getLeaderboardFull(req, res));

router.get('/', (req: Request, res: Response) =>
  teamController.getLeaderboardFull(req, res));

export default router;
