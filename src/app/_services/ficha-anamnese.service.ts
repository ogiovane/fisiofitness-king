import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Aluno} from "../dao/aluno";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FichaAnamneseService {
  apiURL: string = environment.apiURLBase + '/api/ficha-anamnese';

  constructor(private http: HttpClient) {

  }

  salvar(ficha: any): Observable<Aluno> {
    return this.http.post<any>(this.apiURL, ficha);
  }
}
