import { model, Schema, Types } from 'mongoose';

export interface LeaderboardEntry {
  user: Types.ObjectId;
  points: number;
  period: string;
}

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, min: 0, required: true, default: 0 },
    period: { type: String, required: true, default: 'all-time' },
  },
  { timestamps: true },
);

leaderboardSchema.index({ points: -1 });

export default model<LeaderboardEntry>('Leaderboard', leaderboardSchema);
