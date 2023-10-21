import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-idrop-menu',
  templateUrl: './idrop-menu.component.html',
  styleUrls: ['./idrop-menu.component.scss']
})
export class IDropMenuComponent implements OnInit {
  
  @Input() dropMenu !: {placeHolder:string, options:string[]};
  placeHolderSave: string = '';
  openDropMenuFlag: boolean = false;

  ngOnInit(): void {
    this.placeHolderSave = this.dropMenu.placeHolder;
  }

  openDropMenu() {
    this.openDropMenuFlag=!this.openDropMenuFlag
  }

  selectItem(index:number) {    
    console.log("hai selezionato : " + this.dropMenu.options[index]);
    (index == 0)
      ? this.dropMenu.placeHolder = this.placeHolderSave
      : this.dropMenu.placeHolder = this.dropMenu.options[index];
  }

}
