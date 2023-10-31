import { Role } from "./Role";
export class User{
    user_id!:number;
    username!:string ;
    password !: string ;
    enabled!:boolean;
    roles!:Role[];
    }
    