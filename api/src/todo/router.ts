import * as express from 'express';
import jwtHelper from '../shared/jwt-helper';
import controller from './todo.controller';

const router = express.Router();

router.get('/', jwtHelper, controller.getAllAction);
router.get('/:id', jwtHelper, controller.getOneAction);
router.post('/', jwtHelper, controller.createAction);
router.put('/:id', jwtHelper, controller.updateAction);
router.delete('/:id', jwtHelper, controller.deleteAction);

export default router;
