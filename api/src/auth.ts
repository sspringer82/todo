import * as express from 'express';
import * as jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.redirect('/');
});

router.post('/', (req: express.Request, res: express.Response) => {
  // @todo use database here
  if (req.body.username === 'basti' && req.body.password === 'test') {
    const data = { username: req.body.username };
    const token = jwt.sign(data, 'secret');
    res.json({ token });
  } else {
    res.statusCode = 401;
    res.send('Unauthorized');
  }
});

export default router;
