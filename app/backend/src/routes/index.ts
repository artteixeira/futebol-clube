import { Router } from 'express';
import TeamRouter from './TeamRoutes';
import LoginRouter from './LoginRoutes';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', LoginRouter);

export default router;
