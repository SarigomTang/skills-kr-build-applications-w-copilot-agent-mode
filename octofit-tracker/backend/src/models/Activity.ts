import { model, Schema, Types } from 'mongoose';

export interface Activity {
  user: Types.ObjectId;
  type: 'run' | 'cycle' | 'swim' | 'walk' | 'workout';
  durationMinutes: number;
  distanceKm: number;
  calories: number;
  completedAt: Date;
}

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'walk', 'workout'],
      required: true,
    },
    durationMinutes: { type: Number, min: 1, required: true },
    distanceKm: { type: Number, min: 0, default: 0 },
    calories: { type: Number, min: 0, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

activitySchema.index({ user: 1, type: 1, completedAt: 1 }, { unique: true });

export default model<Activity>('Activity', activitySchema);
