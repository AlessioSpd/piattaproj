import { Component } from '@angular/core';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss']
})
export class OrderDetailsModalComponent {

  openBoolean: Boolean = false;

  closeOpenModal() {
    this.openBoolean = !this.openBoolean;
  }
}
