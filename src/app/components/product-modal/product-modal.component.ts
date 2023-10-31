import { Component, Input } from '@angular/core';
import { IProdotto } from 'src/app/models/IProdotto';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {
  
  @Input() openBoolean: Boolean = false;

  selectedItem: IProdotto = new IProdotto(0, '', '', 0, 0, "");

  closeModal() {
    this.openBoolean = false;
  }

  openModal(selectedProduct: IProdotto) {
    this.openBoolean = true;
    console.log(selectedProduct)
    this.selectedItem = selectedProduct;
  }

}
