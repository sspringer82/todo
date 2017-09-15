import { Router, Request, Response } from 'express';

const router = Router();

const controller = {
    getAll(req: Request, res: Response) {
        res.send('Hello express!');
    },
    getById(req: Request, res: Response) {
        res.send('Hello express');
    },
    create(req: Request, res: Response) {
        res.send('Hello express');
    },
    update(req: Request, res: Response) {
        res.send('Hello express');
    },
    delete(req: Request, res: Response) {
        res.send('Hello express');
    }
};

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/', controller.delete.bind(controller));

export { router };
