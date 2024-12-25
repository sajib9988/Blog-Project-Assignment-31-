import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
// Adjust the path to your actual config file
import { IUser } from './user.interface';
import config from '../../config';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select:0 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

// Exporting the model
const User = model<IUser>('User', userSchema);
export default User;
