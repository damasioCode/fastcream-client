import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

interface AccessToken {
  access_token: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  providers: [LoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.formLogin = this.createFormLogin();
  }

  public createFormLogin(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public submitFormLogin() {
    const { email, password } = this.formLogin.value;
    this.formLogin.reset();

    this.loginService.postTokenLogin({ email, password }).subscribe({
      next: (response: any) => {
        this.loginService.setTokenLogin(response);
        this.router.navigate(["dashboard"]);
        console.log(response);
      },
      error: (error) => {},
      complete: () => {
        console.log("terminou a request");
      },
    });
  }
}
