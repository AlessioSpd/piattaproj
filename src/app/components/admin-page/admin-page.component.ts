import { Component, ViewChild } from '@angular/core';
import { OrderDetailsModalComponent } from '../order-details-modal/order-details-modal.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  @ViewChild(OrderDetailsModalComponent) orderDetailModal!: OrderDetailsModalComponent;

  lastActive: string = 'Prodotti';
  userDetailsFlag: boolean = true;

  tableBackground = ['#F5F5F5', 'white'];
  
  tabMenu = [
    { label: "Utenti", active: true },
    { label: "Prodotti", active: false },
  ];

  userTestItem = [
    "alessiospadafora.main@gmail.com",
    "alessiospadafora.work@gmail.com",
    "pamuimc@gmail.com",
    "alessiospadafora.main@gmail.com",
    "alessiospadafora.work@gmail.com",
    "pamuimc@gmail.com",
  ]

  orderTestItem = [
    {id: 1, nProd: 123, price: 555},
    {id: 2, nProd: 30573985, price: 8595},
    {id: 3, nProd: 30573985, price: 8595},
    {id: 4, nProd: 30573985, price: 8595},
    {id: 5, nProd: 30573985, price: 8595},
    {id: 6, nProd: 30573985, price: 8595},
  ]

  productTestItem = [
    {marca: 'Apple', nome: 'Iphone', quant: 10, prezzo: 100},
    {marca: 'Apple', nome: 'Iphone', quant: 0, prezzo: 100},
    {marca: 'Apple', nome: 'Iphone', quant: 10, prezzo: 100},
    {marca: 'Apple', nome: 'Iphone', quant: 0, prezzo: 100},
  ]

  setActive(index: number) {
    this.tabMenu.map(item => {
      item.active = false;
    });

    this.tabMenu[index].active = true;
    this.lastActive = this.tabMenu[index].label;
  }

  openUserDetail(index: number) {
    this.userDetailsFlag = !this.userDetailsFlag;
  }

  openOrderDetail(index: number) {
    console.log('cliccato');
    this.orderDetailModal.closeOpenModal()
  }
}
