import {User} from './users.interface';

export interface AppItem {
    id: number;
    name: string;
    free: boolean;
    autor:string;
    Users:User[];
}
  