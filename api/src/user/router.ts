import * as express from 'express';
import { jwtHelper } from '../shared/jwt-helper';
import { controller } from './user.controller';
import { isAdmin } from '../shared/is-admin';

const router = express.Router();

router.get('/', jwtHelper, isAdmin, controller.getAllAction);
router.get('/:id', jwtHelper, isAdmin, controller.getOneAction);
router.post('/', jwtHelper, isAdmin, controller.createAction);
router.post('/register', controller.registerAction);
router.put('/:id', jwtHelper, isAdmin, controller.updateAction);
router.delete('/:id', jwtHelper, isAdmin, controller.deleteAction);

export { router };
