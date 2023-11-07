import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss']
})
export class OrderDetailsModalComponent implements OnInit {

  tableBackground = ['#F5F5F5', 'white'];
  
  orderTestItem = [
    {id: 1, marca: 'Apple', nome: 'Iphone', price: 125143, quant: 124},
    {id: 2, marca: 'Apple', nome: 'Iphone', price: 125143, quant: 124},
    {id: 3, marca: 'Apple', nome: 'Iphone', price: 125143, quant: 124},
    {id: 4, marca: 'Apple', nome: 'Iphone', price: 125143, quant: 124},
    {id: 5, marca: 'Apple', nome: 'Iphone', price: 125143, quant: 124},
    {id: 6, marca: 'Samsung', nome: 'Iphone', price: 125143, quant: 124},
    {id: 4, marca: 'Apple', nome: 'Iphone', price: 125143, quant: 124},
    {id: 5, marca: 'Apple', nome: 'Iphone', price: 125143, quant: 124},
    {id: 6, marca: 'Apple', nome: 'Iphone', price: 125143, quant: 124},
    {id: 4, marca: 'Apple', nome: 'Iphone', price: 125143, quant: 124},
    {id: 5, marca: 'Apple', nome: 'Iphone', price: 125143, quant: 124},
    {id: 6, marca: 'Apple', nome: 'Iphone', price: 125143, quant: 124},
  ]
  
  tot: number = 0;
  
  openBoolean: Boolean = false;
  
  ngOnInit(): void {
    this.orderTestItem.map(item => {
      this.tot = this.tot + (item.quant*item.price);
    })
  }

  closeOpenModal() {
    this.openBoolean = !this.openBoolean;
  }
}
