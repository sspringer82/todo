import * as express from 'express';
import * as jwt from 'express-jwt';
import controller from './list.controller';

const router = express.Router();

router.get('/', jwt({ secret: 'secret' }), controller.getAllAction);
router.get('/:id', jwt({ secret: 'secret' }), controller.getOneAction);
router.post('/', jwt({ secret: 'secret' }), controller.createAction);
router.put('/:id', jwt({ secret: 'secret' }), controller.updateAction);
router.delete('/:id', jwt({ secret: 'secret' }), controller.deleteAction);
