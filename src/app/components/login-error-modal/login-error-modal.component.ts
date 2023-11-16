import { Component } from '@angular/core';

@Component({
  selector: 'app-login-error-modal',
  templateUrl: './login-error-modal.component.html',
  styleUrls: ['./login-error-modal.component.scss']
})
export class LoginErrorModalComponent {

  openBoolean: Boolean = false;
  errorMessage: string = '';

  closeOpenModal(error: string) {
    this.openBoolean = !this.openBoolean;
    this.errorMessage = error;
    setTimeout(() => {
      this.openBoolean = false;
    }, 2500);
  }
}
