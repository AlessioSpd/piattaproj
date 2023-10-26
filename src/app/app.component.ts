import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EcommerceProj';

  constructor(
    private http: HttpClient
  ) {
    http.get('http://localhost:8080').subscribe((res) => {
    })
  }
}
