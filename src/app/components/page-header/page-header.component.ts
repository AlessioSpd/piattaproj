import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  currentPath: string = '';

  @Output() searchInputValueEmitter = new EventEmitter<string>();

  constructor(private router: Router){}
  
  ngOnInit(): void {
   this.currentPath = this.router.url.replace('/','');
  }

  inputValue: string = '';

  inputChange(newValue: any) {
    this.searchInputValueEmitter.emit(newValue);
  }
  
  changePage(path: string){
    if(path == this.currentPath) return

    this.router.navigate(['/' + path]);
    console.log('cambio')
  }

}
