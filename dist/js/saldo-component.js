let saldo = 3000;
const elementSaldo = document.querySelector(".saldo-valor .valor");
elementSaldo.textContent = formatarMoeda(saldo);
const elementoDataAcesso = document.querySelector('time');
const dataAcesso = new Date();
elementoDataAcesso.textContent = formatarData(dataAcesso);
