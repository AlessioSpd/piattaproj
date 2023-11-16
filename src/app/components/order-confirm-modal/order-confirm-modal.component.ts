import { Component } from '@angular/core';

@Component({
  selector: 'app-order-confirm-modal',
  templateUrl: './order-confirm-modal.component.html',
  styleUrls: ['./order-confirm-modal.component.scss']
})
export class OrderConfirmModalComponent {

  openBoolean: Boolean = false;
  message: string = '';

  closeOpenModal(message: string) {
    this.openBoolean = !this.openBoolean;
    this.message = message;
    setTimeout(() => {
      this.openBoolean = false;
    }, 2000);
  }
}
