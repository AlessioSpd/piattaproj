import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchPageService } from 'src/app/services/search-page-service.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{

  @ViewChild(ProductModalComponent) childComponent!: ProductModalComponent;

  filterMenuList=[
    {
      nome:"Prodotti",
      opened: false,
      itemMenu: [
        {checked: false, nome: "Cuffie", quantita: 123},
        {checked: false, nome: "Tastiere", quantita: 45}
      ]
    },
    {
      nome:"Marche",
      opened: false,
      itemMenu: [
        {checked: false, nome: "Apple", quantita: 123},
        {checked: false, nome: "Samsung", quantita: 45},
        {checked: false, nome: "Huawei", quantita: 1}
      ]
    },
    {
      nome:"Tipo",
      opened: false,
      itemMenu: [
        {checked: false, nome: "Meccaniche", quantita: 123},
        {checked: false, nome: "Wireless", quantita: 45}
      ]
    },
  ];

  productList = [
    {marca:"Apple", nome:"Apple dildo tech v1", rank: 5, disponibile: true, costo: '30.00', img:'../../../assets/imgs/1.png', new: false},
    {marca:"Samsung", nome:"Samsung dildo tech v2", rank: 2.5, disponibile: false, costo: '20.00', img:"../../../assets/imgs/2.png", new: true},
    {marca:"Huauei", nome:"asdfsadfsd", rank: 1, disponibile: true, costo: '0.01', img:"../../../assets/imgs/1.png", new: false},
  ]

  prova = {
    placeHolder: "Stock status...",
    options: ['All','In stock','Out of stock']
  }

  constructor(private myServ: SearchPageService) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  prendiDati() {
    this.myServ.getListaProdotti().subscribe((res) => {
      console.log(res);
    })
  }

  toggleMenu(x: number){
    console.log('sono il menu ' + x)
    this.filterMenuList[x].opened=!this.filterMenuList[x].opened;
  }

  openProductModal(productIndex: number) {
    this.childComponent.openModal()
  }
}
