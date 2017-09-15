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

export { controller };
