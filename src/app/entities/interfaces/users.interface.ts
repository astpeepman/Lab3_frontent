import {AppItem} from './apps.interface'

export interface User {
    id: number;
    name: string;
    paid: boolean;
    phone:string;
    Apps:AppItem[];
}
  