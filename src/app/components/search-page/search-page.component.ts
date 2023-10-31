import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchPageService } from 'src/app/services/search-page-service.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { IProdotto } from 'src/app/models/IProdotto';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{

  @ViewChild(ProductModalComponent) childComponent!: ProductModalComponent;

  filterMenu = {
      nome:"Marche",
      opened: false,
      itemMenu: [
        {checked: false, nome: '', quantita: 0}
      ]
    };

  prova = {
    placeHolder: "Stock status...",
    options: ['All','In stock','Out of stock']
  }

  prodotti: Array<IProdotto> = [];

  constructor(private myServ: SearchPageService) {}
  
  ngOnInit(): void {
    this.myServ.getListaProdotti('').subscribe((res) => {
      this.prodotti = res;
      
      let marcheQuant: {marca: string, quantita: number}[] = [];
      let flag: boolean = false;

      this.prodotti.map( (prodotto) => {
        for (let i = 0; i < marcheQuant.length; i++) {
          if(marcheQuant[i].marca === prodotto.marca) {
            marcheQuant[i].quantita++;
            flag = true;
            break;
          }
        }

        if(!flag) {
          marcheQuant.push({marca: prodotto.marca, quantita: 1})
          flag = false;
        }
      })

      console.log(marcheQuant);
      this.filterMenu.itemMenu.pop()

      marcheQuant.map(item => {
        this.filterMenu.itemMenu.push(
          {checked: false, nome: item.marca, quantita: item.quantita}
        )
      });
    })
  };

  toggleMenu(){
    this.filterMenu.opened=!this.filterMenu.opened;
  }

  openProductModal(selectedItem: IProdotto) {
    this.childComponent.openModal(selectedItem)
  }

  startSearch(searchValue: string) {
    this.myServ.getListaProdotti(searchValue).subscribe((res) => {
      this.prodotti = res;
      console.log(this.prodotti);
    })
  }

  inputValue: string = '';

  inputChange(index: number) {
    console.log(index + ' sono cambiato')
  }
}
