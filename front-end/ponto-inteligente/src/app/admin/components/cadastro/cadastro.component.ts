import { Lancamento } from 'src/app/shared/models/lancamento';
import { Messages } from './../../../shared/utils/messages';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';
import { Tipo } from 'src/app/shared/models/tipo.enum';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  form: FormGroup;
  horas: string[];
  minutos: string[];
  tipos: string[];
  public mask = {
    guide: true,
    showMask : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
  };


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router: Router,
              private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.gerarForm();
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    this.tipos = [
      Tipo.INICIO_TRABALHO,
      Tipo.INICIO_ALMOCO,
      Tipo.TERMINO_ALMOCO,
      Tipo.TERMINO_TRABALHO
    ];
  }

  gerarForm() {
    this.form = this.fb.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]]
    });
  }

  gerarListaNumeros(inicio: number, termino: number): string[] {
    const numeros: string[] = Array();
    for (let i = 0; i <= termino; i++) {
      let numero: string = i.toString();
      if (i < 10) {
        numero = '0' + numero;
      }
      numeros.push(numero);
    }
    return numeros;
  }

  cadastrar() {
    if (this.form.invalid) { return; }

    const dados = this.form.value;
    this.lancamentoService.cadastrar(this.obterLancamento(dados)).subscribe(data => {
      const msg = Messages.LANCAMENTO_CADASTRADO;
      this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
      this.router.navigate(['/admin']);
    }, (err: any) => {
      let msg = Messages.TENTE_NOVAMENTE;
      if (err.status === 400) {
        msg = err.error.erros.join(' ');
      }
      this.snackBar.open(msg, 'Erro', { duration: 5000 });
    });
  }

  obterLancamento(dados: any): Lancamento {
    const data = moment(dados.data);
    data.set({
      hour: dados.horas,
      minute: dados.minutos,
      second: 0
    });

    return new Lancamento(
      data.format('YYYY-MM-DD HH:mm:ss'),
      dados.tipo,
      '',
      this.funcionarioId
    );
  }

  get funcionarioId(): string {
    return sessionStorage.funcionarioId;
  }

}
