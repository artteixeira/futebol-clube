import { Router } from 'express';
import TeamRouter from './TeamRoutes';
import LoginRouter from './LoginRoutes';
import MatchRouter from './MatchRoutes';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', LoginRouter);
router.use('/matches', MatchRouter);

export default router;
