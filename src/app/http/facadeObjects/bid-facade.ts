import { Deserializable } from './deserializable';

export class BidFacade implements Deserializable {
  buyerName: string;
  itemId: number;
  amount: number;
  price: number;
  approved: boolean;
  shopOwnersStatus: Map<string, boolean>;
  constructor(
    buyerName?: string,
    itemId?: number,
    amount?: number,
    price?: number,
    approved?: boolean,
    shopOwnersStatus?: Map<string, boolean>
  ) {
    this.buyerName = buyerName;
    this.itemId = itemId;
    this.amount = amount;
    this.price = price;
    this.approved = approved;
    this.shopOwnersStatus = shopOwnersStatus;
  }

  deserialize(value: any): this {
    this.shopOwnersStatus = new Map();
    if (value) {
      Object.assign(this, value);
      this.shopOwnersStatus = new Map();
      for (const entry of Object.entries(value.shopOwnersStatus)) {
        const approved: boolean = entry[1] as boolean;
        this.shopOwnersStatus.set(entry[0], approved);
      }
    }
    return this;
  }
}
