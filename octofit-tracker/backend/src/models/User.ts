import { model, Schema, Types } from 'mongoose';

export interface User {
  username: string;
  email: string;
  name: string;
  team?: Types.ObjectId;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export default model<User>('User', userSchema);
