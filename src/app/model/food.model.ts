import { Choix } from "./choix.model";
import { Image } from "./image.model";
export class Food {
    idFood !: number ;
    nomFood! : string;
    prixFood! : number;
    datePreparation! : Date ;
    choix! : Choix;
    image! : Image;
  imageStr!:string;
  images!: Image[];

    }