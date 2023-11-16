import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IProdotto } from 'src/app/models/IProdotto';
import { AuthenticationService } from 'src/app/services/auth-service.service';
import { CartService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {
  
  openBoolean: Boolean = false;
  countItem: number = 0;
  @Input() itemDispo!: number;
  @Output() addCartEmitter = new EventEmitter<boolean>();

  selectedItem: IProdotto = new IProdotto(0, '', '', 0, 0, "");

  constructor(private auth: AuthenticationService, private cartServ: CartService, private router: Router) {}

  closeModal() {
    this.openBoolean = false;
  }

  openModal(selectedProduct: IProdotto) {
    this.openBoolean = true;
    console.log(selectedProduct)
    this.selectedItem = selectedProduct;
  }

  addItemToCart(codice: number) {
    if(this.auth.isLogged()) {
      this.cartServ.addItemToCart(codice, this.auth.getLoggedEmail(), this.countItem).subscribe( res => {
        console.log(res)
      });
      console.log('refresh emit')
      this.addCartEmitter.emit(false);
      this.closeModal();
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  changeCounter(sign: number) {
    if ( (this.countItem + sign) < 0) return;
    this.countItem += sign;
  }

}
