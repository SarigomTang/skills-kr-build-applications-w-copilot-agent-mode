import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_request, response) => {
  const activities = await Activity.find()
    .populate('user', 'username name')
    .sort({ completedAt: -1 });
  response.json(activities);
});

export default router;
