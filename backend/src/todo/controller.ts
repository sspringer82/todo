const controller = {
    getAll(req: Request, res: Response) {
        this.render('Hello express');
    },
    getById(req: Request, res: Response) {
        this.render('Hello express');
    },
    create(req: Request, res: Response) {
        this.render('Hello express');
    },
    update(req: Request, res: Response) {
        this.render('Hello express');
    },
    delete(req: Request, res: Response) {
        this.render('Hello express');
    },
    render(req: Request, res: Response, data: any, view: string) {
        if (req.accepts('json')) {
            res.json(data);
        } else {
            res.render(view);
        }
    }
};

export { controller };
