import { Component, ViewChild, OnInit } from '@angular/core';
import { OrderDetailsModalComponent } from '../order-details-modal/order-details-modal.component';
import { AuthenticationService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin-page-service.service';
import { IUser } from 'src/app/models/IUser';
import { IProdotto } from 'src/app/models/IProdotto';
import { IOrdine } from 'src/app/models/IOrdine';
import { IProdottoCarrello } from 'src/app/models/IProdottoCarrello';
import { EditProdutModalComponent } from '../edit-produt-modal/edit-produt-modal.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{

  @ViewChild(OrderDetailsModalComponent) orderDetailModal!: OrderDetailsModalComponent;
  @ViewChild(EditProdutModalComponent) editProductModal!: EditProdutModalComponent;

  adminLogged: boolean = false;
  lastActive: string = 'Utenti';
  userDetailsFlag: boolean = false;
  userList: Array<IUser> = []
  tableBackground = ['#F5F5F5', 'white'];
  selectedUser!: IUser;

  selectedProduct!: IProdotto;
  
  productListOfOrder: Array<IProdottoCarrello> = [];
  selectedOrderTotalPrice: number = 0;
  
  tabMenu = [
    { label: "Utenti", active: true },
    { label: "Prodotti", active: false },
  ];

  userOrderList: Array<IOrdine> = [];
  orderNumProduct: number[] = [];

  productList: Array<IProdotto> = []

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private admiServ: AdminService
  ) {}

  inputValue: string = '';
  inputChange(newValue: any) {
    this.admiServ.searchProduct(newValue).subscribe(res => {
      this.productList = res;
    })
  }

  ngOnInit(): void {
    if(this.auth.isAdminLogged()) {
      this.router.navigate(['/']);
    } else {
      
      this.admiServ.getAllUser().subscribe(res => {
        this.userList = res;
      });

      this.admiServ.getAllProduct().subscribe(res => {
        this.productList = res;
      });
    }
  }

  setActive(index: number) {
    this.tabMenu.map(item => {
      item.active = false;
    });

    this.tabMenu[index].active = true;
    this.lastActive = this.tabMenu[index].label;
  }

  openUserDetail(selectedUser: IUser) {
    this.userDetailsFlag = !this.userDetailsFlag;
    this.selectedUser = selectedUser;
    this.admiServ.getAllOrderOfUser(selectedUser.email).subscribe(res => {
      
      let sommaPrezzo = 0;
      let sommaQuant = 0;
      this.userOrderList = res;
      this.userOrderList.map(ordine => {

        ordine.carrello.map(prodotto => {
          sommaQuant+=prodotto.quantita;
          sommaPrezzo += (prodotto.quantita * prodotto.prezzo)
        })

        this.orderNumProduct.push(sommaQuant);
        ordine.total_price = sommaPrezzo;
        sommaPrezzo = 0;
        sommaQuant = 0;
      })
    });
  }

  openOrderDetail(ordine: IOrdine, price: number) {
    this.productListOfOrder = ordine.carrello;
    this.selectedOrderTotalPrice = price;
    this.orderDetailModal.closeOpenModal()
  }

  deleteUser(user: IUser) {
    this.admiServ.removeUser(user.email).subscribe(res => {
      console.log(res);
    });

    this.userList.splice(this.userList.indexOf(user), 1);
  }

  logout() {
    this.auth.logout()
    this.adminLogged = false;
    this.router.navigate(['/']);
  }

  openProductForEdit(selecteditem: IProdotto) {
    this.selectedProduct = selecteditem;
    console.log(this.selectedProduct)
    this.editProductModal.closeOpenModal(selecteditem, false);
  }

  addItem(evn: any) {
    console.log('ho funzionato')
    setTimeout(() => {
      this.admiServ.getAllProduct().subscribe(res => {
        this.productList = res;
      });
    }, 2000);
  }

  createProduct() {
    let nullP = new IProdotto(0,'','',0,0,'')
    this.editProductModal.closeOpenModal(nullP, true);
  }
}
