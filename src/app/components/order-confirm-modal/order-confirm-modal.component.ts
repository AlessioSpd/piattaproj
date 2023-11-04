import { Component } from '@angular/core';

@Component({
  selector: 'app-order-confirm-modal',
  templateUrl: './order-confirm-modal.component.html',
  styleUrls: ['./order-confirm-modal.component.scss']
})
export class OrderConfirmModalComponent {

  openBoolean: Boolean = false;

  closeOpenModal() {
    this.openBoolean = !this.openBoolean;
    setTimeout(() => {
      this.openBoolean = false;
    }, 1500);
  }
}
