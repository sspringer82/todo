import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import userModel from './user/user.model';
import { User } from './shared/user.type';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.redirect('/');
});

router.post('/', async (req: express.Request, res: express.Response) => {
  const user: User = await userModel.getOneByCredentials(
    req.body.username,
    req.body.password,
  );

  if (user) {
    const data = { ...user };
    delete data.password;
    const token = jwt.sign(data, 'secret');
    res.json({ token });
  } else {
    res.statusCode = 401;
    res.send('Unauthorized');
  }
});

export default router;
