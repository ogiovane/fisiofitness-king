import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from "../../environments/environment";
import {Ficha} from "../dao/ficha";
import {FichaItem} from "../dao/fichaItem";
import {Exercicio} from "../dao/exercicio";
import {map} from "rxjs/operators";
import {Aluno} from "../dao/aluno";


@Injectable({
    providedIn: 'root'
})
export class FichasTreinoService {
    apiURL: string = environment.apiURLBase + '/api/fichas';

    constructor(private http: HttpClient) {
    }

    getFichaPorIdAluno(id: any): Observable<Ficha> {
        return this.http.get<Ficha>(`${this.apiURL}/${id}`);
    }

    salvar(fichaTreino: any): Observable<Ficha> {
        return this.http.post<Ficha>(this.apiURL, fichaTreino)
            .pipe(catchError(this.handleError));
    }

    getFichasByIdAluno(idAluno: any) : Observable<Ficha[]> {
        return this.http.get<Ficha[]>(`${this.apiURL}/${idAluno}`)
          .pipe<Ficha[]>(map((data: any) => data));;
    }


    getFichaItensByFichaId(id: number): Observable<FichaItem[]> {
        return this.http.get<FichaItem[]>(`${this.apiURL}/itens/${id}`)
          .pipe<FichaItem[]>(map((data: any) => data));
    }

    getFichaItemById(id: number) {
        return this.http.get<FichaItem>(`${this.apiURL}/itens/edit?id=${id}`)
          // .pipe<FichaItem[]>(map((data: any) => data));;
    }

  getFichaById(id: any) {
    return this.http.get<Ficha>(`${this.apiURL}/edit?id=${id}`);
  }

    salvarItemFicha(id: any, fichaItem: FichaItem): Observable<FichaItem> {
        return this.http.post<FichaItem>(`${this.apiURL}/itens/${id}`, fichaItem)
            .pipe(catchError(this.handleError));
    }

    atualizarFicha(ficha: any) {
      console.log(ficha)
        return this.http.put<Ficha>(`${this.apiURL}/edit?id=${ficha.id}`, ficha);
    }

    getItemById(id: any): Observable<FichaItem> {
        return this.http.get<FichaItem>(`${this.apiURL}/0/itensficha/${id}`)
            .pipe(catchError(this.handleError));
    }

    deletarFichaItem(item: FichaItem) {
        return this.http.delete<any>(`${this.apiURL}/itens/${item.id}`);
    }

    deletarFicha(ficha: Ficha) {
        return this.http.delete<any>(`${this.apiURL}/${ficha.id}`);
    }

    atualizarFichaItem(fichaItem: FichaItem) {
        return this.http.put<FichaItem>(`${this.apiURL}/itens/${fichaItem.id}`, fichaItem);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
