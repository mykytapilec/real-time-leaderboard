import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { LoginInput, RegisterInput, User } from './auth.types';

const users = new Map<string, User>();

export async function registerUser(input: RegisterInput) {
  const existingUser = Array.from(users.values()).find(
    (user) => user.username === input.username,
  );

  if (existingUser) {
    throw new Error('Username already exists');
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  const user: User = {
    id: randomUUID(),
    username: input.username,
    passwordHash,
  };

  users.set(user.id, user);

  return {
    id: user.id,
    username: user.username,
  };
}

export async function loginUser(input: LoginInput) {
  const user = Array.from(users.values()).find(
    (item) => item.username === input.username,
  );

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(
    input.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  return user;
}