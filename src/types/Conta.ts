import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta {
    nome: string;
    saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;
    transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: any) => {
        if (key === "data") {
            return new Date(value);
        }
        return value;
    }) || [];

    constructor(nome: string) {
        this.nome = nome;
    }

    debitar(valor: number): void {
        if (valor <= 0) {
            throw new Error('O valor a ser debitado deve ser maior que zero!');
        }
        if (valor > this.saldo) {
            throw new Error('Saldo insuficiente!');
        }
        this.saldo -= valor;
        localStorage.setItem('saldo', this.saldo.toString());
    }

    depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error('O valor a ser depositado deve ser maior que zero!');
        }
        this.saldo += valor;
        localStorage.setItem('saldo', this.saldo.toString());
    }
    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao: string = '';
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao != labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    }

    getSaldo() {
        return this.saldo;
    }

    getDataAcesso(): Date {
        return new Date();
    }

    registrarTransacao(novaTransacao: Transacao): void {
        switch (novaTransacao.tipoTransacao) {
            case TipoTransacao.DEPOSITO:
                this.depositar(novaTransacao.valor);
                break;
            case TipoTransacao.TRANSFERENCIA:
            case TipoTransacao.PAGAMENTO_BOLETO:
                this.debitar(novaTransacao.valor);
                novaTransacao.valor *= -1;
                break;
            default:
                throw new Error("Tipo de transação inválido!");
        }
        this.transacoes.push(novaTransacao);
        localStorage.setItem('transacoes', JSON.stringify(this.transacoes));
        console.log(this.getGruposTransacoes());
    }


}

const contaJoana = new Conta("Joana da Silva Oliveira");

export default contaJoana;