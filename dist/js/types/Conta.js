var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Armazenador } from "./Armazenador.js";
import { ValidaDebito, validaDeposito } from "./Decorators.js";
import { TipoTransacao } from "./TipoTransacao.js";
export class Conta {
    nome;
    saldo = Armazenador.obter("saldo") || 0;
    transacoes = Armazenador.obter(("transacoes"), (key, value) => {
        if (key === "data") {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor(nome) {
        this.nome = nome;
    }
    getTitular() {
        return this.nome;
    }
    getSaldo() {
        return this.saldo;
    }
    getDataAcesso() {
        return new Date();
    }
    debitar(valor) {
        this.saldo -= valor;
        Armazenador.salvar('saldo', this.saldo);
    }
    depositar(valor) {
        this.saldo += valor;
        Armazenador.salvar('saldo', this.saldo);
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
        Armazenador.salvar('transacoes', this.transacoes);
        console.log(this.getGruposTransacoes());
    }
}
__decorate([
    ValidaDebito
], Conta.prototype, "debitar", null);
__decorate([
    validaDeposito
], Conta.prototype, "depositar", null);
export class ContaPremium extends Conta {
    registrarTransacao(transacao) {
        if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            transacao.valor += 0.5;
            console.log("Ganhou um bônus!");
        }
        super.registrarTransacao(transacao);
    }
}
const contax = new Conta("Joana da Silva Oliveira");
const contaPremium = new ContaPremium("Monica Hillman");
console.log(contax.getTitular());
export default contax;
