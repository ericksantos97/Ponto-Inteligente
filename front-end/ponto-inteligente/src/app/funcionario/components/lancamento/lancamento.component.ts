import { Messages } from './../../../shared/utils/messages';
import { LancamentoService } from './../../../shared/services/lancamento.service';
import { HttpUtilService } from './../../../shared/services/http-util.service';
import { Tipo } from './../../../shared/models/tipo.enum';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Lancamento } from 'src/app/shared/models/lancamento';

declare var navigator: any;

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html'
})
export class LancamentoComponent implements OnInit {

  private dataAtualEn: string;
  dataAtual: string;
  geoLocation: string;
  ultimoTipoLancado: string;

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private httpUtil: HttpUtilService,
              private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
    this.obterGeoLocation();
    this.ultimoTipoLancado = '';
    this.obterUltimoLancamento();
  }

  obterGeoLocation(): string {
    if (navigator.permissions) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>
          this.geoLocation = `${position.coords.latitude},${position.coords.longitude}`);
      }
    } else {
      return 'Geolocalização não é suportada em seu navegador';
    }
  }

  iniciarTrabalho() {
    this.cadastrar(Tipo.INICIO_TRABALHO);
  }

  terminarTrabalho() {
    this.cadastrar(Tipo.TERMINO_TRABALHO);
  }

  iniciarAlmoco() {
    this.cadastrar(Tipo.INICIO_ALMOCO);
  }

  terminarAlmoco() {
    this.cadastrar(Tipo.TERMINO_ALMOCO);
  }

  obterUltimoLancamento() {
    this.lancamentoService.buscarUltimoTipoLancado().subscribe(dados => {
      this.ultimoTipoLancado = dados.data ? dados.data.tipo : '';
    }, (err: any) => {
      const msg = Messages.ERRO_ULT_LANCAMENTO;
      this.snackBar.open(msg, 'Erro', { duration: 5000 });
    });
    this.ultimoTipoLancado = '';
  }

  cadastrar(tipo: Tipo) {
    const lancamento: Lancamento = new Lancamento(
      this.dataAtualEn,
      tipo,
      this.geoLocation,
      this.httpUtil.obterIdUsuario()
    );

    this.lancamentoService.cadastrar(lancamento).subscribe(data => {
      const msg = Messages.LANCAMENTO_REALIZADO;
      this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
      this.router.navigate(['/funcionario/listagem']);
    }, (err: any) => {
      let msg = Messages.TENTE_NOVAMENTE;
      if (err.status === 400) {
        msg = err.error.errors.join(' ');
      }
      this.snackBar.open(msg, 'Erro', { duration: 5000 });
    });
  }

  obterUrlMapa(): string {
    return `https://www.google.com/maps/search/?api=1&query=${this.geoLocation}`;
  }

  exibirInicioTrabalho(): boolean {
    return this.ultimoTipoLancado === '' || this.ultimoTipoLancado === Tipo.TERMINO_TRABALHO;
  }

  exibirTerminoTrabalho(): boolean {
    return this.ultimoTipoLancado === Tipo.INICIO_TRABALHO || this.ultimoTipoLancado === Tipo.TERMINO_ALMOCO;
  }

  exibirInicioAlmoco(): boolean {
    return this.ultimoTipoLancado === Tipo.INICIO_TRABALHO;
  }

  exibirTerminoAlmoco(): boolean {
    return this.ultimoTipoLancado === Tipo.INICIO_ALMOCO;
  }



}
