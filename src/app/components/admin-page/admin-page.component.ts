import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  lastActive: string = 'Utenti';
  userDetailsFlag: boolean = true;
  
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
}
