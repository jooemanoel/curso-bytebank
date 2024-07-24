import { formatarMoeda, formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";

const elementSaldo = document.querySelector(".saldo-valor .valor") as HTMLSpanElement;

const elementoDataAcesso = document.querySelector('time') as HTMLTimeElement;
elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);

function renderizarSaldo(): void {
    elementSaldo.textContent = formatarMoeda(Conta.getSaldo());
}

renderizarSaldo();

const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    }
}

export default SaldoComponent;