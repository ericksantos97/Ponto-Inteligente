import { Messages } from './../../../shared/utils/messages';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/observable/of';
import {  MatSnackBar, MatTableDataSource,
          MatPaginator,
          PageEvent,
          MatSort } from '@angular/material';
import { Lancamento } from 'src/app/shared/models/lancamento';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html'
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private lancamentoService: LancamentoService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.lancamentoService.listarTodosLancamentos().subscribe(dados => {
      const lancamento = dados.data as Lancamento[];
      this.dataSource = new MatTableDataSource<Lancamento>(lancamento);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err: any) => {
      const msg = Messages.ERRO_LANCAMENTOS;
      this.snackBar.open(msg, 'Erro', { duration: 5000 });
    });
  }

}
