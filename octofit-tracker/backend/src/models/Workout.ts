import { model, Schema } from 'mongoose';

export interface Workout {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  activityType: 'run' | 'cycle' | 'swim' | 'strength' | 'recovery';
}

const workoutSchema = new Schema<Workout>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, min: 1, required: true },
    activityType: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'strength', 'recovery'],
      required: true,
    },
  },
  { timestamps: true },
);

export default model<Workout>('Workout', workoutSchema);
