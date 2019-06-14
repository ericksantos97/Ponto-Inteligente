import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Messages } from '../../../../shared/utils/messages';
import { Login } from './../../model/login';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-login-pf',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    this.geralForm();
  }

  geralForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  logar() {
    if (this.form.invalid) {
     return;
    }

    const login: Login = this.form.value;
    this.loginService.logar(login).subscribe(data => {
      localStorage.token = data.data.token;
      const usuarioData = JSON.parse(atob(data.data.token.split('.')[1]));
      if (usuarioData.role === 'ROLE_ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/funcionario']);
      }
    }, (err: any) => {
      let msg: string = Messages.ERRO_LOGIN;
      if (err.status === 401) {
        msg = Messages.EMAIL_SENHA_INVALIDOS;
      }
      this.snackBar.open(msg, 'Erro', { duration: 5000 });
    });
  }

}
