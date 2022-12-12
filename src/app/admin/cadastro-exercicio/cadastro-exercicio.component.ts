import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Exercicio} from "../../dao/exercicio";
import {ExercicioService} from "../../_services/exercicio.service";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";


@Component({
  selector: 'app-cadastro-exercicio',
  templateUrl: './cadastro-exercicio.component.html',
  styleUrls: ['./cadastro-exercicio.component.scss']
})
export class CadastroExercicioComponent implements OnInit {
  exercicio: Exercicio;
  errors: String[];
  id = this.activatedRoute.snapshot.paramMap.get('id');

  gruposMusculares = [
    {data: 'Aeróbico', name: 'Aeróbico'},
    {data: 'Abdômen', name: 'Abdômen'},
    {data: 'Bíceps', name: 'Bíceps'},
    {data: 'Costas', name: 'Costas'},
    {data: 'Funcional', name: 'Funcional'},
    {data: 'Glúteos', name: 'Glúteos'},
    {data: 'Ombros', name: 'Ombros'},
    {data: 'Pernas', name: 'Pernas'},
    {data: 'Peito', name: 'Peito'},
    {data: 'Tríceps', name: 'Tríceps'}
  ];

  cadastroForm: UntypedFormGroup = new UntypedFormGroup(
    {
      id: new UntypedFormControl(''),
      nome: new UntypedFormControl(''),
      grupoMuscular: new UntypedFormControl(''),
      imagem: new UntypedFormControl(''),
      link: new UntypedFormControl(''),
      observacao: new UntypedFormControl(''),
    }
  );

  constructor(
    private exercicioService: ExercicioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.exercicio = new Exercicio();
  }

  ngOnInit(): void {
    if (this.id) {
      this.exercicioService.getById(this.id).subscribe(
        {
          next: value => {
            this.cadastroForm.setValue({
              id: value.id,
              nome: value.nome,
              grupoMuscular: value.grupoMuscular,
              imagem: value.imagem,
              link: value.link,
              observacao: value.observacao,
            });
          }
        }
      );
    }
  }

  onSubmit() {
    if (this.id) {
      let exercicio = {
        id: this.cadastroForm.value.id,
        nome: this.cadastroForm.value.nome,
        grupoMuscular: this.cadastroForm.value.grupoMuscular,
        imagem: this.cadastroForm.value.imagem,
        link: this.cadastroForm.value.link,
        observacao: this.cadastroForm.value.observacao,
      }

      this.exercicioService.atualizar(exercicio).subscribe(() => {
        this.router.navigate(['/admin/lista-exercicios']);
      }, errorResponse => {
        this.errors = errorResponse.error.errors;
        for (const error of this.errors) {
        }
      })
    } else if (!this.id) {
      let exercicio = {
        id: this.cadastroForm.value.id,
        nome: this.cadastroForm.value.nome,
        grupoMuscular: this.cadastroForm.value.grupoMuscular,
        imagem: this.cadastroForm.value.imagem,
        link: this.cadastroForm.value.link,
        observacao: this.cadastroForm.value.observacao,
      }

      this.exercicioService
        .salvar(exercicio).subscribe(() => {
          // this.closeDialog();
          this.router.navigate(['/admin/lista-exercicios']);
          // window.history.back();

        },
        errorResponse => {
          this.errors = errorResponse.error.errors;
          for (const error of this.errors) {
          }
        }
      )
    }
  };

}
