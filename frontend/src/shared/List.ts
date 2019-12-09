import { User } from './User';

export interface List {
  id: number;
  name: string;
  sharedWith?: User[];
}

export interface InputTypeList {
  id?: number;
  name: string;
  sharedWith?: User[];
}
