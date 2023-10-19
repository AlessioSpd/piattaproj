import { Component } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

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
        {checked: false, nome: "Samsung", quantita: 45}
      ]
    },
    {
      nome:"Tipo",
      opened: false,
    },
  ];

  productList = [
    {marca:"Apple", nome:"Apple dildo tech v1", rank: 5, disponibile: true, costo: '30.00', img:'../../../assets/imgs/1.png'},
    {marca:"Samsung", nome:"Samsung dildo tech v2", rank: 2, disponibile: false, costo: '20.00', img:"../../../assets/imgs/2.png"},
    {marca:"huauei", nome:"asdfsadfsd", rank: 1, disponibile: true, costo: '0.01', img:"../../../assets/imgs/1.png"},
  ]

  flagTest = false;
  
  constructor(){}

  toggleMenu(x: number){
    console.log('sono il menu ' + x)
    this.filterMenuList[x].opened=!this.filterMenuList[x].opened;
  }
}
