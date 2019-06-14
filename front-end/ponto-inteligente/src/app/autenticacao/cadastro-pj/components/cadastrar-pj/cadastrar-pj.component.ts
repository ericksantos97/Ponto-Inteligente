import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CadastroPj } from '../model/cadastroPj';
import { Messages } from './../../../../shared/utils/messages';
import { CpfCnpjValidator } from './../../../../shared/validators/cpf-cnpj-validator';
import { CadastroPjService } from './../../services/cadastro-pj.service';

@Component({
  selector: 'app-cadastrar-pj',
  templateUrl: './cadastrar-pj.component.html'
})
export class CadastrarPjComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private cadastrarPjService: CadastroPjService) { }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfCnpjValidator]],
      razaoSocial: ['', [Validators.required, Validators.minLength(5)]],
      cnpj: ['', [Validators.required, CpfCnpjValidator]],
    });
  }

  cadastrarPj() {
    if (this.form.invalid) {
      return;
    }
    const cadastroPj: CadastroPj = this.form.value;
    this.cadastrarPjService.cadastrar(cadastroPj).subscribe(data => {
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
