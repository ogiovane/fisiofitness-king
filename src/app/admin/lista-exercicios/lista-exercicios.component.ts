import {Component, OnInit, ViewChild} from '@angular/core';
import {Exercicio} from "../../dao/exercicio";
import {ExercicioService} from "../../_services/exercicio.service";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-lista-exercicios',
  templateUrl: './lista-exercicios.component.html',
  styleUrls: ['./lista-exercicios.component.scss']
})
export class ListaExerciciosComponent implements OnInit {
  exercicios!: MatTableDataSource<Exercicio>;
  exercicioSelecionado: Exercicio;
  errors: String[];
  columnsToDisplay = ['id', 'nome', 'grupoMuscular', 'observacao', 'acoes'];
  modalRef?: BsModalRef;
  id = this.activatedRoute.snapshot.paramMap.get('id');
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) matSort !: MatSort;

  constructor(
    private exerciciosService: ExercicioService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  open(content: any) {
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  ngOnInit(): void {
    this.getExercicios();

  }



  getExercicios(): void {
    this.exerciciosService.getAll().subscribe((res) => {
      this.exercicios = new MatTableDataSource<Exercicio>(res);
      this.exercicios.paginator = this.paginator;
      this.exercicios.sort = this.matSort;
    })
  }

  preparaDelecao(exercicio: Exercicio, template: any) {
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef = this.modalService.show(template);
    this.exercicioSelecionado = exercicio;
  }


  deletarExercicio(exercicio: Exercicio) {
    this.exerciciosService.deletar(exercicio)
      .subscribe({
        next: (res: any) => {
          this.getExercicios();
          this.closeModal();
        },
        error: (error) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            this.errors = error.message;
          } else {
            this.errors = error.error.message;
          }
        }
      })
  }

  closeModal() {
    this.modalRef?.hide();
  }

  FilterChange($event: Event) {
    const filtvalue = (event?.target as HTMLInputElement).value;
    this.exercicios.filter = filtvalue;
  }

  onKeyEscape($event: Event) {
    this.exercicios.filter = '';
  }
}
