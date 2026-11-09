import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_request, response) => {
  const teams = await Team.find().populate('members', 'username name').sort({ name: 1 });
  response.json(teams);
});

export default router;
