import { Component, OnInit } from '@angular/core';
import { Address } from 'app/http/facadeObjects/address';
import { CreditCard } from 'app/http/facadeObjects/credit-card';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { ShoppingCartFacade } from 'app/http/facadeObjects/shopping-cart-facade';
import { BuyShoppingCartRequest } from 'app/http/requests/buy-shopping-cart-request';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-check-out-component',
  templateUrl: './check-out-component.component.html',
  styleUrls: ['./check-out-component.component.scss'],
})
export class CheckOutComponentComponent implements OnInit {
  city: string;
  street: string;
  buildingNum: string;
  cardNum: string;
  CVV: string;
  expirationDate: string;
  constructor(
    private config: ConfigService,
    private engine: EngineService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  submitCheckOut() {
    const creditCart: CreditCard = new CreditCard();
    creditCart.cardNumber = this.cardNum;
    creditCart.expiredDate = this.expirationDate;
    creditCart.threeDigits = this.CVV;
    const address: Address = new Address();
    address.buildingNum = this.buildingNum;
    address.city = this.city;
    address.street = this.street;
    const request = new BuyShoppingCartRequest();
    request.address = address;
    request.expectedPrice = this.config.visitor.cart.price;
    request.visitorName = this.config.visitor.name;
    request.paymentMethod = creditCart;
    this.engine.buyShoppingCart(request).subscribe((responseJson) => {
      const response = new ResponseT().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage(), "Got it!" ,4000 );
        this.config.isCartInfoClicked = true;
        // if error is
        // if (response.value) {
        //   this.config.visitor.cart = new ShoppingCartFacade().deserialize(
        //     response.value
        //   );
        // }
      } else {
        this.messageService.validMessage("bought successfully");
        this.config.visitor.cart = new ShoppingCartFacade().deserialize(
          response.value
        );
      }
    });
  }

  canSubmit() {
    return (
      this.city &&
      this.city !== '' &&
      this.street &&
      this.street !== '' &&
      this.buildingNum &&
      this.buildingNum !== '' &&
      this.cardNum &&
      this.cardNum !== '' &&
      this.CVV &&
      this.CVV !== '' &&
      this.expirationDate &&
      this.expirationDate !== ''
    );
  }
}
