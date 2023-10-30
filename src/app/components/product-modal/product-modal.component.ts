import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {
  
  @Input() openBoolean: Boolean = false;

  closeModal() {
    this.openBoolean = false;
  }

  openModal() {
    this.openBoolean = true;
  }

}
