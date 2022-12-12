import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Aluno} from "../dao/aluno";
import {environment} from "../../environments/environment";
import {Exercicio} from "../dao/exercicio";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  apiURL: string = environment.apiURLBase + '/api/alunos';

  constructor(private http: HttpClient) {

  }

  salvar(aluno: Aluno): Observable<Aluno> {
      return this.http.post<Aluno>(this.apiURL, aluno);
  }

  atualizar(aluno: Aluno): Observable<any> {
    // console.table(aluno)
    return this.http.put<Aluno>(`${this.apiURL}/${aluno.id}`, aluno);
  }

  getAll(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiURL)
      .pipe<Aluno[]>(map((data: any) => data));
  }

  getAlunoById(id: string): Observable<Aluno> {
    return this.http.get<any>(`${this.apiURL}/${id}`)
  }

  deletar(aluno: Aluno) {
    return this.http.delete<any>(`${this.apiURL}/${aluno.id}`);
  }


}
