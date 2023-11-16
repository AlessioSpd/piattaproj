import { Component, ViewChild, OnInit } from '@angular/core';
import { OrderConfirmModalComponent } from '../order-confirm-modal/order-confirm-modal.component';
import { CartService } from 'src/app/services/cart-service.service';
import { AuthenticationService } from 'src/app/services/auth-service.service';
import { IProdotto } from 'src/app/models/IProdotto';
import { IProdottoCarrello } from 'src/app/models/IProdottoCarrello';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{

  cartBadge: number = 0;
  
  @ViewChild(OrderConfirmModalComponent) childComponent!: OrderConfirmModalComponent;
  
  cartItemList!: Array<IProdottoCarrello>;
  validCart: boolean = true;
  
  constructor(private route: Router, private cartServ: CartService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    let email = this.auth.getLoggedEmail();
    if(email !== '') {
      console.log('ciao')
      this.cartServ.getCarelloFromUsermail(email).subscribe(res => {
        this.cartItemList = res;
        this.cartItemList.map(item => {
          if(item.quantita > item.prodotto.quantita) this.validCart = false;
        })
      })
    } else {
      this.route.navigate(['/login']);
    }
  }

  calcTot() {
    let somma: number = 0
    this.cartItemList.map(item => {
      somma = somma + item.prodotto.prezzo*item.quantita;
    })
    return somma;
  }

  modifyQuantity(product: IProdottoCarrello, sign: number) {
    console.log(product)
    if(product.quantita + sign == 0) {
      this.cartServ.removeItemFromCart(product.id, this.auth.getLoggedEmail()).subscribe(res => {
        this.validCart = true;
        this.cartItemList.map(item => {
          if(item.quantita > item.prodotto.quantita) this.validCart = false;
        })
      })
      this.cartItemList.splice(this.cartItemList.indexOf(product), 1);
    } else {
      this.cartServ.addItemToCart(product.prodotto.codice, this.auth.getLoggedEmail(), sign).subscribe(res => {
        product.quantita = product.quantita + sign;
        this.validCart = true;
        this.cartItemList.map(item => {
          if(item.quantita > item.prodotto.quantita) this.validCart = false;
        })
      })
    }
  }

  clearCart() {
    this.cartItemList=[]
    this.cartServ.clearCart(this.auth.getLoggedEmail()).subscribe();
    this.validCart = false;
  }

  confirmOrder66() {
    this.cartServ.confermaOrdine(this.auth.getLoggedEmail()).subscribe(
    (data) => { 
      this.clearCart()
      this.childComponent.closeOpenModal('Apposto zio')
      this.validCart = false;
    },
    (error) => {
      this.childComponent.closeOpenModal(error)
      this.cartServ.getCarelloFromUsermail(this.auth.getLoggedEmail()).subscribe(res => {
        this.cartItemList = res;
        this.cartItemList.map(item => {
          if(item.quantita > item.prodotto.quantita) this.validCart = false;
        })
      })
    });
  }
}