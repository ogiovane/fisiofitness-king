export class Ficha {
    constructor(id: any) {
        this.aluno = {id: id};
    }

    id: String;
    numFicha: String;
    nome: String;
    observacoes: String;
    objetivo: String;
    dificuldade: String;
    repeticoes: String;
    dataInicio: Date;
    dataTermino: Date;
    estaAtivo: boolean;
    aluno: { id: number }
}
