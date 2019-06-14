import { Lancamento } from './../models/lancamento';
import { HttpUtilService } from './http-util.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private readonly PATH: string = 'lancamentos';
  private readonly PATH_ULTIMO_LANC = '/funcionario/{funcionarioId}/ultimo';
  private readonly PATH_LANCAMENTOS = '/funcionario/{funcionarioId';
  private readonly PATH_TODOS_LANC = '/funcionario/{funcionarioId}/todos';

  constructor(private http: HttpClient,
              private httpUtil: HttpUtilService) { }

  buscarUltimoTipoLancado(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH + this.PATH_ULTIMO_LANC.replace(
      '{funcionarioId}', this.httpUtil.obterIdUsuario()), this.httpUtil.headers()
    );
  }

  cadastrar(lancamento: Lancamento): Observable<any> {
    return this.http.post(env.baseApiUrl + this.PATH, lancamento, this.httpUtil.headers());
  }

  listarTodosLancamentos(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH + this.PATH_TODOS_LANC.replace(
      '{funcionarioId}', this.httpUtil.obterIdUsuario()), this.httpUtil.headers()
    );
  }

  listarLancamentosPorFuncionario(funcionarioId: string, pagina: number, ordem: string, direcao: string):  Observable<any> {
    const url = env.baseApiUrl + this.PATH + this.PATH_LANCAMENTOS.replace('{funcionarioId', funcionarioId);
    const params = '?pag=' + pagina + '&ord=' + ordem + '&dir=' + direcao;

    return this.http.get(url + params, this.httpUtil.headers());
  }

  remover(lancamentoId: string): Observable<any> {
    return this.http.delete(env.baseApiUrl + this.PATH + '/' + lancamentoId, this.httpUtil.headers());
  }

  buscarPorId(lancamentoId: string): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH + '/' + lancamentoId, this.httpUtil.headers());
  }

  atualizar(lancamento: Lancamento): Observable<any> {
    return this.http.put(env.baseApiUrl + this.PATH + '/' + lancamento.id, lancamento, this.httpUtil.headers());
  }

}
