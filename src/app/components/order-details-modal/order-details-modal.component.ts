import { Component, Input, OnInit } from '@angular/core';
import { IProdotto } from 'src/app/models/IProdotto';
import { IProdottoCarrello } from 'src/app/models/IProdottoCarrello';
import { IUser } from 'src/app/models/IUser';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss']
})
export class OrderDetailsModalComponent implements OnInit {

  tableBackground = ['#F5F5F5', 'white'];

  @Input() productListOfOrder: Array<IProdottoCarrello> = [];
  @Input() totalPrice: number = 0;
  
  openBoolean: Boolean = false;
  
  ngOnInit(): void {}

  closeOpenModal() {
    this.openBoolean = !this.openBoolean;
  }
}
