import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_request, response) => {
  const workouts = await Workout.find().sort({ name: 1 });
  response.json(workouts);
});

export default router;
