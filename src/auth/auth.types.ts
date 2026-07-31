export interface User {
  id: string;
  username: string;
  passwordHash: string;
}

export interface RegisterInput {
  username: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}