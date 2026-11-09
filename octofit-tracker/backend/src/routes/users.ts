import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_request, response) => {
  const users = await User.find().populate('team', 'name').sort({ name: 1 });
  response.json(users);
});

export default router;
