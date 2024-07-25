import { Armazenador } from "./Armazenador.js";
import { ValidaDebito, validaDeposito } from "./Decorators.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta {
    nome: string;
    private saldo: number = Armazenador.obter<number>("saldo") || 0;
    private transacoes: Transacao[] = Armazenador.obter<Transacao[]>(("transacoes"), (key: string, value: any) => {
        if (key === "data") {
            return new Date(value);
        }
        return value;
    }) || [];

    constructor(nome: string) {
        this.nome = nome;
    }

    public getTitular() {
        return this.nome;
    }

    getSaldo() {
        return this.saldo;
    }

    getDataAcesso(): Date {
        return new Date();
    }

    @ValidaDebito
    debitar(valor: number): void {
        this.saldo -= valor;
        Armazenador.salvar('saldo', this.saldo);
    }

    @validaDeposito
    depositar(valor: number): void {
        this.saldo += valor;
        Armazenador.salvar('saldo', this.saldo);
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
        Armazenador.salvar('transacoes', this.transacoes);
        console.log(this.getGruposTransacoes());
    }

}

export class ContaPremium extends Conta {
    registrarTransacao(transacao: Transacao): void {
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