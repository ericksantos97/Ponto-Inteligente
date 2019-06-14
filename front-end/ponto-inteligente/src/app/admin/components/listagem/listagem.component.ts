import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSelect, MatSnackBar, MatTableDataSource, MAT_DIALOG_DATA, PageEvent, Sort } from '@angular/material';
import { Lancamento } from 'src/app/shared/models/lancamento';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';
import { Funcionario } from './../../../shared/models/funcionario';
import { FuncionarioService } from './../../../shared/services/funcionario.service';
import { HttpUtilService } from './../../../shared/services/http-util.service';
import { Messages } from './../../../shared/utils/messages';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html'
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao', 'acao'];
  funcionarioId: string;
  totalLancamentos: number;

  funcionarios: Funcionario[];
  @ViewChild(MatSelect) matSelect: MatSelect;
  form: FormGroup;

  private pagina: number;
  private ordem: string;
  private direcao: string;

  constructor(private lancamentoService: LancamentoService,
              private httpUtil: HttpUtilService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private funcionarioService: FuncionarioService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.pagina = 0;
    this.ordemPadrao();
    this.obterFuncionarios();
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      funcs: ['', []]
    });
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  get funcId(): string {
    return sessionStorage.funcionarioId || false;
  }

  obterFuncionarios() {
    this.funcionarioService.listarFuncionariosPorEmpresa().subscribe(dados => {
      const usuarioId = this.httpUtil.obterIdUsuario();
      this.funcionarios = (dados.data as Funcionario[]).filter(func => func.id !== usuarioId);

      if (this.funcId) {
        this.form.get('funcs').setValue(parseInt(this.funcId, 10));
        this.exibirLancamentos();
      }
    }, (err: any) => {
      const msg = Messages.ERRO_FUNCIONARIOS;
      this.snackBar.open(msg, 'Erro', { duration: 5000 });
    });
  }

  exibirLancamentos() {
    if (this.matSelect.selected) {
      this.funcionarioId = this.matSelect.selected['value'];
    } else if (this.funcId) {
      this.funcionarioId = this.funcId;
    } else {
      return;
    }
    sessionStorage.funcionarioId = this.funcionarioId;

    this.lancamentoService.listarLancamentosPorFuncionario(
      this.funcionarioId, this.pagina, this.ordem, this.direcao
    ).subscribe((dados: any) => {
      this.totalLancamentos = dados.data.totalElements;
      const lancamentos = dados.data.content as Lancamento[];
      this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
    }, (err: any) => {
      const msg = Messages.ERRO_LANCAMENTOS;
      this.snackBar.open(msg, 'Erro', { duration: 5000 });
    });
  }

  removerDialog(lancamentoId: string) {
    const dialog = this.dialog.open(DialogComponent, {});
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(lancamentoId);
      }
    });
  }

  remover(lancamentoId: string) {
    this.lancamentoService.remover(lancamentoId).subscribe(data => {
      const msg = Messages.LANCAMENTO_REMOVIDO;
      this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
      this.exibirLancamentos();
    }, (err: any) => {
      let msg = Messages.TENTE_NOVAMENTE;
      if (err.status === 400) {
        msg = err.error.errors.join(' ');
      }
      this.snackBar.open(msg, 'Erro', { duration: 5000 });
    });
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.exibirLancamentos();
  }

  ordenar(sort: Sort) {
    if (sort.direction === '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.exibirLancamentos();
  }

}

// @Component({
//   selector: 'confirmar-dialog',
//   template: `
//     <h1 mat-dialog-title>Deseja realmente remover o lançamento?</h1>
//     <div mat-dialog-actions>
//       <button mat-button [mat-dialog-close]="false" tabindex="-1">Não</button>
//       <button mat-button [mat-dialog-close]="true" tabindex="2">Sim</button>
//     </div>
//   `
// })

// export class ConfirmarDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
// }
