import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { AuthenticationService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  
  loginType: boolean = false;

  registrationForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authServ: AuthenticationService) {}
  
  
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', []],
      cognome: ['', []],
      password: ['', [Validators.required, Validators.minLength(8)]]
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
        console.log("registro")
        this.authServ.userRegistration(user).subscribe(res => {
          if(res) this.authServ.login(user.email);
          this.router.navigate(['/']);

        });
      } else {
        this.authServ.checkUser(user).subscribe(res => {
          if(res) this.authServ.login(user.email);
          this.router.navigate(['/']);
        });
      }

      this.registrationForm.reset({nome:'', cognome:'', email: '', password: ''})
    } else {
      Object.keys(this.registrationForm.controls).forEach(field => {
        let control = this.registrationForm.get(field);
        if (control!.invalid) {
          console.log(`Validation errors for ${field}:`, control!.errors);
        }
      });
    }
  }

  changeModeLogin() {
    this.loginType = !this.loginType;
    console.log(this.registrationForm.controls['password'].invalid)
  }

  test() {
    console.log(this.registrationForm.controls['password'].invalid)
  }

}
