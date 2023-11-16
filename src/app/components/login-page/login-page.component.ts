import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { AuthenticationService } from 'src/app/services/auth-service.service';
import { LoginErrorModalComponent } from '../login-error-modal/login-error-modal.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  
  loginType: boolean = false;

  registrationForm!: FormGroup;

  @ViewChild(LoginErrorModalComponent) errorModal!: LoginErrorModalComponent;

  constructor(private router: Router, private fb: FormBuilder, private authServ: AuthenticationService) {}
  
  
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['luigi@pardo', [Validators.required, Validators.email]],
      nome: ['', []],
      cognome: ['', []],
      password: ['luigiluigi', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      let user: IUser = {
        nome: this.registrationForm.value.nome,
        cognome: this.registrationForm.value.cognome,
        password: this.registrationForm.value.password,
        email: this.registrationForm.value.email,
        role: false
      }
      if(this.loginType) {

        this.authServ.userRegistration(user).subscribe(
          (data) => {
            this.authServ.login(user.email);
            this.router.navigate(['/']);
          },
          (error) => {
            this.errorModal.closeOpenModal('Questa mail è già associata ad un utente')
          }
        );

      } else {
        //loggo
        this.authServ.checkUser(user).subscribe(res => {
          if(res) {
            if(res.role) {
              this.authServ.loginAdmin(res.email);
              this.router.navigate(['/admin']);
            }else {
              this.authServ.login(res.email);
              this.router.navigate(['/']);
            }
          }
        });
      }
      this.registrationForm.reset({nome:'', cognome:'', email: '', password: ''})
    } else {
      if(this.registrationForm.invalid) {
        this.errorModal.closeOpenModal('Dati errati. Se non sei registrato, registrati')
      }
    }
  }

  changeModeLogin() {
    this.loginType = !this.loginType;
    console.log(this.registrationForm.controls['password'].invalid)
  }
}
