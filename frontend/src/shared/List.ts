import { User } from './User';

export interface List {
  id: number;
  name: string;
  sharedWith?: User[];
}

export interface InputTypeList extends Omit<List, 'id'> {
  id?: number;
}
