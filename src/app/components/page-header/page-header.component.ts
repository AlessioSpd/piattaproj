import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

  @Output() searchInputValueEmitter = new EventEmitter<string>();

  constructor(private router: Router){}

  inputValue: string = '';

  inputChange(newValue: any) {
    this.searchInputValueEmitter.emit(newValue);
  }
  
  changePage(){
    this.router.navigate(['/search']);
  }

}
