import { Component } from '@angular/core';
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

  selectedItem: IProdotto = new IProdotto(0, '', '', 0, 0, "");

  constructor(private auth: AuthenticationService, private cartServ: CartService) {}

  closeModal() {
    this.openBoolean = false;
  }

  openModal(selectedProduct: IProdotto) {
    this.openBoolean = true;
    console.log(selectedProduct)
    this.selectedItem = selectedProduct;
  }

  addItemToCart(codice: number) {
    let quant = 1;
    if(this.auth.isLogged())
      this.cartServ.addItemToCart(codice, this.auth.getLoggedEmail(),quant).subscribe( res => {
        console.log(res)
      });
    else console.log('no bro devi logga')
  }

}
