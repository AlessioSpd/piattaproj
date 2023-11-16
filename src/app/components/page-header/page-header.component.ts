import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth-service.service';
import { CartService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  cartBadge: number = 0;
  currentPath: string = '';
  @Input() mood: string = "user";
  logged: boolean = false;
  lastWord = '';

  @Output() searchInputValueEmitter = new EventEmitter<string>();

  constructor(private cartServ: CartService, private router: Router, private auth: AuthenticationService) {}
  
  ngOnInit(): void {
    this.currentPath = this.router.url.replace('/','');
    this.logged = this.auth.isLogged();

    if(this.logged) {
      this.cartServ.getNProdotti(this.auth.getLoggedEmail()).subscribe(res => {
        this.cartBadge = res
      })
    }
  }

  inputValue: string = '';

  inputChange(newValue: any) {
    this.searchInputValueEmitter.emit(newValue);
  }
  
  changePage(path: string){
    if(path == 'check') {
      if( this.auth.isLogged() ) {
        this.router.navigate(['/cart']);
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/' + path]);
    }
  }

  logOut() {
    this.auth.logout()
    this.logged = false;
    this.router.navigate(['/']);
  }

  refresh() {
    console.log('refresh in header')
    this.cartServ.getNProdotti(this.auth.getLoggedEmail()).subscribe(res => {
      this.cartBadge = res;
    })
  }
}
