import {Component, OnInit} from '@angular/core';
import {Aluno} from "../../dao/aluno";
import {AlunoService} from "../../_services/aluno.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.scss']
})
export class CadastroAlunoComponent implements OnInit {
  aluno: Aluno;
  id = this.activatedRoute.snapshot.paramMap.get('id');
  public show = false;
  public abrirEsconder = '+ Campos Opcionais';

  cadastroForm: UntypedFormGroup;

  constructor(
    private alunoService: AlunoService,
    // private dialogRef: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.aluno = new Aluno();
  }

  ngOnInit(): void {
    this.cadastroForm = new UntypedFormGroup(
      {
        id: new UntypedFormControl(''),
        nome: new UntypedFormControl(''),
        sobrenome: new UntypedFormControl(''),
        genero: new UntypedFormControl(''),
        nascimento: new UntypedFormControl(''),
        celular: new UntypedFormControl(''),
        email: new UntypedFormControl(''),
        cep: new UntypedFormControl(''),
        rua: new UntypedFormControl(''),
        numero: new UntypedFormControl(''),
        complemento: new UntypedFormControl(''),
        bairro: new UntypedFormControl(''),
        cidade: new UntypedFormControl(''),
        uf: new UntypedFormControl(''),
        dataCadastro: new UntypedFormControl(''),
      }
    );


    if (this.id) {
      this.alunoService.getAlunoById(this.id).subscribe(
        {
          next: value => {
            this.cadastroForm.setValue({
              id: value.id,
              nome: value.nome,
              sobrenome: value.sobrenome,
              genero: value.genero,
              nascimento: value.nascimento,
              email: value.email,
              celular: value.celular,
              cep: value.cep,
              rua: value.rua,
              numero: value.numero,
              complemento: value.complemento,
              bairro: value.bairro,
              cidade: value.cidade,
              uf: value.uf,
              dataCadastro: value.dataCadastro,
            });
          }
        }
      );
    }
  }

  closeDialog() {
    // this.dialogRef.closeAll();
  }

  onSubmit() {
    // console.log(this.cadastroForm)
    if (this.id) {
      let aluno = {
        id: this.cadastroForm.value.id,
        nome: this.cadastroForm.value.nome,
        sobrenome: this.cadastroForm.value.sobrenome,
        genero: this.cadastroForm.value.genero,
        nascimento: this.cadastroForm.value.nascimento,
        email: this.cadastroForm.value.email,
        celular: this.cadastroForm.value.celular,
        cep: this.cadastroForm.value.cep,
        rua: this.cadastroForm.value.rua,
        numero: this.cadastroForm.value.numero,
        complemento: this.cadastroForm.value.complemento,
        bairro: this.cadastroForm.value.bairro,
        cidade: this.cadastroForm.value.cidade,
        uf: this.cadastroForm.value.uf,
        dataCadastro: this.cadastroForm.value.dataCadastro,
      }

      // console.table(aluno)
      this.alunoService.atualizar(aluno)
        .subscribe(response => {
            this.router.navigate(['/admin/lista-alunos']);
          },
          errorResponse => {
            console.log(errorResponse);
          })
    } else if (!this.id) {
      let aluno = {
        id: this.cadastroForm.value.id,
        nome: this.cadastroForm.value.nome,
        sobrenome: this.cadastroForm.value.sobrenome,
        genero: this.cadastroForm.value.genero,
        nascimento: this.cadastroForm.value.nascimento,
        email: this.cadastroForm.value.email,
        celular: this.cadastroForm.value.celular,
        cep: this.cadastroForm.value.cep,
        rua: this.cadastroForm.value.rua,
        numero: this.cadastroForm.value.numero,
        complemento: this.cadastroForm.value.complemento,
        bairro: this.cadastroForm.value.bairro,
        cidade: this.cadastroForm.value.cidade,
        uf: this.cadastroForm.value.uf,
        dataCadastro: this.cadastroForm.value.dataCadastro,
      }
      this.alunoService
        .salvar(aluno).subscribe(response => {
          this.router.navigate(['/admin/lista-alunos']);

        },
        errorResponse => {
          console.log(errorResponse);
        }
      )
    }

  };

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) {
      this.abrirEsconder = '- Campos Opcionais';
    } else {
      this.abrirEsconder = '+ Campos Opcionais';
    }
  }


}
