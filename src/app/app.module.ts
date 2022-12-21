import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ClipboardModule} from 'ngx-clipboard';
import {TranslateModule} from '@ngx-translate/core';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./_auth/auth.guard";
import {AuthInterceptor} from "./_auth/auth.interceptor";
import {UserService} from "./_services/user.service";
import {RouterModule} from "@angular/router";
import {CadastroAlunoComponent} from './admin/cadastro-aluno/cadastro-aluno.component';
import {CadastroExercicioComponent} from './admin/cadastro-exercicio/cadastro-exercicio.component';
import {CadastroFichaComponent} from './admin/cadastro-ficha/cadastro-ficha.component';
import {ListaAlunosComponent} from './admin/lista-alunos/lista-alunos.component';
import {ListaExerciciosComponent} from './admin/lista-exercicios/lista-exercicios.component';
import {ListaFichasComponent} from './admin/lista-fichas/lista-fichas.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {ConfirmDialogComponent} from './modules/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ModalModule} from "ngx-bootstrap/modal";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {
  AdicionarExerciciosFichaComponent
} from './admin/adicionar-exercicios-ficha/adicionar-exercicios-ficha.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {CustomPaginator} from "./dao/CustomPaginator";
import {MatSortModule} from "@angular/material/sort";
import { FichaAnamneseComponent } from './admin/ficha-anamnese/ficha-anamnese.component';
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [AppComponent, CadastroAlunoComponent, CadastroExercicioComponent, CadastroFichaComponent, ListaAlunosComponent, ListaExerciciosComponent, ListaFichasComponent, ConfirmDialogComponent, AdicionarExerciciosFichaComponent, FichaAnamneseComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        HttpClientModule,
        ClipboardModule,
        AppRoutingModule,
        InlineSVGModule.forRoot(),
        NgbModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        ModalModule.forRoot(),
        MatCardModule,
        MatProgressBarModule,
        MatInputModule,
        MatAutocompleteModule,
        AutocompleteLibModule,
        MatPaginatorModule,
        MatSortModule,
        MatListModule,
        MatCheckboxModule,
        MatSelectModule
    ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService,
    {provide: MatPaginatorIntl, useValue: CustomPaginator()}

  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
