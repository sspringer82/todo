export interface Login {
  username: string;
  password: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password?: string;
}
