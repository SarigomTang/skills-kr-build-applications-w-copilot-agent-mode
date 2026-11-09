import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_request, response) => {
  const leaderboard = await Leaderboard.find()
    .populate({ path: 'user', select: 'username name team', populate: { path: 'team', select: 'name' } })
    .sort({ points: -1 });
  response.json(leaderboard);
});

export default router;
