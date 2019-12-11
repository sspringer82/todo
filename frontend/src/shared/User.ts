export interface Login {
  username: string;
  password: string;
}

export interface User extends Omit<Login, 'password'> {
  id: number;
  firstname: string;
  lastname: string;
  password?: string;
}
