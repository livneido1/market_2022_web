export class AddItemToShoppingCartRequest {
  itemToInsert: ItemFacade;
  amount: number;
  shopName: string;
  visitorName: string;

  constructor(){
    this.amount=0;
    this.shopName="";
    this.visitorName="";

  }








}
