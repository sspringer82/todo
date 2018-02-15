import * as express from 'express';
import { jwtHelper } from '../shared/jwt-helper';
import { controller } from './list.controller';

const router = express.Router();

router.use(jwtHelper);

router.get('/', controller.getAllAction);
router.get('/:id', controller.getOneAction);
router.post('/', controller.createAction);
router.put('/:id', controller.updateAction);
router.delete('/:id', controller.deleteAction);

export { router };
