import { Component, ViewChild, OnInit } from '@angular/core';
import { OrderConfirmModalComponent } from '../order-confirm-modal/order-confirm-modal.component';
import { CartService } from 'src/app/services/cart-service.service';
import { AuthenticationService } from 'src/app/services/auth-service.service';
import { IProdotto } from 'src/app/models/IProdotto';
import { IProdottoCarrello } from 'src/app/models/IProdottoCarrello';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{

  cartBadge: number = 0;
  
  @ViewChild(OrderConfirmModalComponent) childComponent!: OrderConfirmModalComponent;
  
  cartItemList!: Array<IProdottoCarrello>;
  
  constructor(private route: Router, private cartServ: CartService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    let email = this.auth.getLoggedEmail();
    if(email !== '') {
      console.log('ciao')
      this.cartServ.getCarelloFromUsermail(email).subscribe(res => {
        this.cartItemList = res;
        console.log(res);
      })
    } else {
      this.route.navigate(['/login']);
    }
  }

  calcTot() {
    let somma: number = 0
    this.cartItemList.map(item => {
      somma = somma + item.prezzo*item.quantita;
    })
    return somma;
  }

  modifyQuantity(product: IProdottoCarrello, sign: number) {
    console.log(product)
    if(product.quantita + sign == 0) {
      console.log('entrato1')
      this.cartServ.removeItemFromCart(product.id, this.auth.getLoggedEmail()).subscribe(res => {
        console.log(res);
      })
      this.cartItemList.splice(this.cartItemList.indexOf(product), 1);
    } else {
      console.log('entrato2')
      this.cartServ.addItemToCart(product.prodotto.codice, this.auth.getLoggedEmail(), sign).subscribe(res => {
        console.log(res);
        product.quantita = product.quantita + sign;
      })
    }
  }

  clearCart() {
    this.cartServ.clearCart(this.auth.getLoggedEmail()).subscribe(res => {
      console.log(res);
    });
  }

  confirmOrder66() {
    //chiamata al server con l ordine
    this.clearCart();
    this.childComponent.closeOpenModal();
  }
}