import * as express from 'express';
import * as jwt from 'express-jwt';
import controller from './user.controller';
import { isAdmin } from '../shared/isAdmin';

const router = express.Router();

router.get('/', jwt({ secret: 'secret' }), isAdmin, controller.getAllAction);
router.get('/:id', jwt({ secret: 'secret' }), isAdmin, controller.getOneAction);
router.post('/', jwt({ secret: 'secret' }), isAdmin, controller.createAction);
router.put('/:id', jwt({ secret: 'secret' }), isAdmin, controller.updateAction);
router.delete(
  '/:id',
  jwt({ secret: 'secret' }),
  isAdmin,
  controller.deleteAction,
);

export default router;
