let saldo: number = 3000;

const elementSaldo = document.querySelector(".saldo-valor .valor") as HTMLSpanElement;
elementSaldo.textContent = formatarMoeda(saldo);

const elementoDataAcesso = document.querySelector('time') as HTMLTimeElement;
const dataAcesso: Date = new Date();
elementoDataAcesso.textContent = formatarData(dataAcesso);
