import * as express from 'express';
import controller from './todo.controller';

const router = express.Router();

router.get('/', controller.getAllAction);
router.get('/:id', controller.getOneAction);
router.post('/:id', controller.createAction);
router.put('/:id', controller.updateAction);
router.delete('/:id', controller.deleteAction);

export default router;
