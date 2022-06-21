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
  country: string;
  zipCode: string;
  cardNum: string;
  CVV: string;
  expirationDate: string;
  holderName: string;
  holderID: string;
  constructor(
    private config: ConfigService,
    private engine: EngineService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  submitCheckOut() {
    const date = new Date(this.expirationDate);
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const creditCart: CreditCard = new CreditCard(
      this.cardNum,
      month,
      year,
      this.CVV,
      this.holderName,
      this.holderID
    );
    const address: Address = new Address(
      this.config.visitor.name,
      this.street,
      this.city,
      this.country,
      this.zipCode
    );
    const request = new BuyShoppingCartRequest();
    request.address = address;
    request.expectedPrice = this.config.visitor.cart.price;
    request.visitorName = this.config.visitor.name;
    request.paymentMethod = creditCart;
    this.engine.buyShoppingCart(request).subscribe((responseJson) => {
      const response = new ResponseT().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(
          response.getMessage(),
          'Got it!',
          4000
        );
        this.config.isCartInfoClicked = true;
        // if error is
        // if (response.value) {
        //   this.config.visitor.cart = new ShoppingCartFacade().deserialize(
        //     response.value
        //   );
        // }
      } else {
        this.messageService.validMessage('bought successfully');
        this.config.visitor.cart = new ShoppingCartFacade().deserialize(
          response.value
        );
        this.config.isCartInfoClicked = true;
      }
    });
  }

  canSubmit() {
    return (
      this.city &&
      this.city !== '' &&
      this.street &&
      this.street !== '' &&
      this.country &&
      this.country !== '' &&
      this.zipCode &&
      this.zipCode !== '' &&
      this.cardNum &&
      this.cardNum !== '' &&
      this.CVV &&
      this.CVV !== '' &&
      this.expirationDate &&
      this.expirationDate !== '' &&
      this.holderName &&
      this.holderName !== '' &&
      this.holderID &&
      this.holderID !== ''
    );
  }
}
