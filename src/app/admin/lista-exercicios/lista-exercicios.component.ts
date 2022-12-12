import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Exercicio} from "../../dao/exercicio";
import {ExercicioService} from "../../_services/exercicio.service";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from "@angular/router";
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-lista-exercicios',
  templateUrl: './lista-exercicios.component.html',
  styleUrls: ['./lista-exercicios.component.scss']
})
export class ListaExerciciosComponent implements OnInit {
  exercicios = new MatTableDataSource<Exercicio>();
  exercicioSelecionado: Exercicio;
  errors: String[];
  columnsToDisplay = ['id', 'nome', 'grupoMuscular', 'observacao', 'acoes'];
  modalRef?: BsModalRef;
  id = this.activatedRoute.snapshot.paramMap.get('id');

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
    this.exerciciosService.getAll().subscribe((res: any) => {
      this.exercicios.data = res;
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
}
