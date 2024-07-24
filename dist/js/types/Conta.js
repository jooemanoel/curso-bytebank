import { TipoTransacao } from "./TipoTransacao.js";
export class Conta {
    nome;
    saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
    transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
        if (key === "data") {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor(nome) {
        this.nome = nome;
    }
    debitar(valor) {
        if (valor <= 0) {
            throw new Error('O valor a ser debitado deve ser maior que zero!');
        }
        if (valor > this.saldo) {
            throw new Error('Saldo insuficiente!');
        }
        this.saldo -= valor;
        localStorage.setItem('saldo', this.saldo.toString());
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error('O valor a ser depositado deve ser maior que zero!');
        }
        this.saldo += valor;
        localStorage.setItem('saldo', this.saldo.toString());
    }
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(this.transacoes);
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = '';
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
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
    getDataAcesso() {
        return new Date();
    }
    registrarTransacao(novaTransacao) {
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
