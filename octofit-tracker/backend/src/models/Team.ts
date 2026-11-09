import { model, Schema, Types } from 'mongoose';

export interface Team {
  name: string;
  description: string;
  members: Types.ObjectId[];
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export default model<Team>('Team', teamSchema);
