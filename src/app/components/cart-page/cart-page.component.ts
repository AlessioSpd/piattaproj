import { Component, ViewChild } from '@angular/core';
import { OrderConfirmModalComponent } from '../order-confirm-modal/order-confirm-modal.component';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent{

  cartBadge: number = 0;
  
  @ViewChild(OrderConfirmModalComponent) childComponent!: OrderConfirmModalComponent;
  
  testItem = [
    {name: "Iphone 14 Pro Max", brand: "Apple", prezzo: 1, quantita: 10},
    {name: "8T Pro", brand: "Oneplus", prezzo: 10, quantita: 10},
    {name: "S22", brand: "Samsung", prezzo: 12, quantita: 2},
  ];

  calcTot() {
    let somma: number = 0

    this.testItem.map(item => {
      somma = somma + item.prezzo*item.quantita;
    })
    return somma;
  }

  modifyQuantity(index: number, sign: number) {
    this.testItem[index].quantita = this.testItem[index].quantita + sign;
    
    if(this.testItem[index].quantita == 0) this.testItem.splice(index, 1)
  }

  clearCart() {
    this.testItem = [];
  }

  confirmOrder66() {
    //chiamata al server con l ordine
    this.clearCart();
    this.childComponent.closeOpenModal();
  }
}