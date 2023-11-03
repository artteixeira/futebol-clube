import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req, res) => matchController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req, res) => matchController.finishMatch(req, res),
);
router.patch(
  '/:id',
  Validations.validateToken,
  (req, res) => matchController.updateMatch(req, res),
);
router.get('/:id', (req, res) => matchController.getMatchById(req, res));
router.post(
  '/',
  Validations.validateToken,
  Validations.validateEqualsTeams,
  (req, res) => matchController.createMatch(req, res),
);

export default router;
