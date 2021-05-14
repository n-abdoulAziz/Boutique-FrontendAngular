import { Item } from "./item";

export class Cart {
  items:Item[]=[];
  resume:{quantity:number,costTax:number,costHT:number,costTTC:number};
}
