import { Router } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UserController();

const router = Router();

router.post('/', Validations.validateLogin, (req, res) => userController.login(req, res));
router.get('/role', Validations.validateToken, (req, res) => userController.loginRole(req, res));

export default router;
