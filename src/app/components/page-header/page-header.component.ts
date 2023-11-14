import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth-service.service';

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

  @Output() searchInputValueEmitter = new EventEmitter<string>();

  constructor(private router: Router, private auth: AuthenticationService){}
  
  ngOnInit(): void {
    this.currentPath = this.router.url.replace('/','');
    this.logged = this.auth.isLogged();
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
    console.log('ciao ciao')
  }
}
