import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Messages } from './../../../../shared/utils/messages';
import { CpfCnpjValidator } from './../../../../shared/validators/cpf-cnpj-validator';
import { CadastroPfService } from './../../services/cadastro-pf.service';
import { CadastroPf } from './../models/cadastro-pf';

@Component({
  selector: 'app-cadastrar-pf',
  templateUrl: './cadastrar-pf.component.html'
})
export class CadastrarPfComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private cadastrarPfService: CadastroPfService) { }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfCnpjValidator]],
      cnpj: ['', [Validators.required, CpfCnpjValidator]],
    });
  }

  cadastrarPf() {
    if (this.form.invalid) {
      return;
    }
    const cadastroPf: CadastroPf = this.form.value;
    this.cadastrarPfService.cadastrar(cadastroPf).subscribe(data => {
      const msg: string = Messages.REALIZAR_LOGIN;
      this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
      this.router.navigate(['/login']);
    }, (err: any) => {
      let msg: string = Messages.TENTE_NOVAMENTE;
      if (err.status === 400) {
        msg = err.error.errors.join(' ');
      }
      this.snackBar.open(msg, 'Erro', { duration: 5000 });
    });
    return false;
  }

}
