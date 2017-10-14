import { Router, Request, Response } from 'express';

import { controller } from './controller';

const router = Router();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/', controller.delete.bind(controller));

export { router };
