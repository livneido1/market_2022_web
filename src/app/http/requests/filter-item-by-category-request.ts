import { Deserializable } from "../facadeObjects/deserializable";
import { Category, ItemFacade } from "../facadeObjects/ItemFacade";

export class FilterItemByCategoryRequest implements Deserializable{

  private  items: ItemFacade[];
  private category: Category;

  constructor(){
    this.items = [];
    this.category = Category.general;

  }

  deserialize(value: any): this {
      if (!value){
        return this;
      }

      Object.assign(this,value);
      this.items = [];
      for (const item of value.items){
        this.items.push(new ItemFacade().deserialize(item));
      }
      this.category = value.category;
      return this;
  }
}
