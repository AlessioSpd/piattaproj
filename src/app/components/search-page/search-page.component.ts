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

  lastSearchValue: string = ''
  lastBrandCheck: string[] = [];

  prodotti: Array<IProdotto> = [];

  constructor(private myServ: SearchPageService) {}

  ngOnInit(): void {
    this.myServ.getListaProdotti('', this.lastBrandCheck).subscribe((res) => {
      this.prodotti = res;
      let brandQuantityList = this.brandQuantity()
      this.createFilterMenu(brandQuantityList)
    })
  };

  brandQuantity() {
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

    return marcheQuant;
  }

  createFilterMenu(brandQuantityList: {marca: string, quantita: number}[]) {    
    this.filterMenu = {
      nome:"Marche",
      opened: true,
      itemMenu: [
        {checked: false, nome: '', quantita: 0}
      ]
    };
    
    this.filterMenu.itemMenu.pop()
    brandQuantityList.map(item => {
      this.filterMenu.itemMenu.push(
        {checked: false, nome: item.marca, quantita: item.quantita}
      )
    });
  }

  updateFilterMenu(brandQuantityList: {marca: string, quantita: number}[]) {
    this.filterMenu.itemMenu.map( item => {
      item.quantita = 0
    })

    brandQuantityList.map(item => {
      for(let i = 0; i < this.filterMenu.itemMenu.length; i++) {
        if(item.marca == this.filterMenu.itemMenu[i].nome) {
          this.filterMenu.itemMenu[i].quantita = item.quantita
          break
        }
      }
    })
  }

  toggleMenu(){
    this.filterMenu.opened=!this.filterMenu.opened;
  }

  openProductModal(selectedItem: IProdotto) {
    this.childComponent.openModal(selectedItem)
  }

  startSearch(searchValue: string) {
    this.lastSearchValue = searchValue;
    this.myServ.getListaProdotti(searchValue, this.lastBrandCheck).subscribe((res) => {
      this.prodotti = res;
      let brandQuantityList = this.brandQuantity()
      this.updateFilterMenu(brandQuantityList)
    })
  }

  inputValue: string = '';

  inputChange(index: number) {
    if(this.filterMenu.itemMenu[index].checked) {
      this.filterMenu.itemMenu[index].checked=false;
    } else {
      this.filterMenu.itemMenu[index].checked=true;
    }

    let tempBrand: string[] = [];
    
    this.filterMenu.itemMenu.map( (item) => {
      if(item.checked) tempBrand.push(item.nome)
    })

    this.lastBrandCheck = tempBrand;

    this.myServ.getListaProdotti(this.lastSearchValue, this.lastBrandCheck).subscribe(res => {
      this.prodotti = res;
      let brandQuantityList = this.brandQuantity()
      this.updateFilterMenu(brandQuantityList)
    })
  }
}
