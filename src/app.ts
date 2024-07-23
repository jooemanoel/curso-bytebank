let saldo = 3000;

const elementSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
elementSaldo.textContent = saldo.toString();


const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement;
elementoFormulario.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!elementoFormulario.checkValidity()) {
    alert("Por favor, preencha todos os campos da transação!");
    return;
  }
  const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao") as HTMLSelectElement;
  const inputValor = elementoFormulario.querySelector("#valor") as HTMLInputElement;
  const inputData = elementoFormulario.querySelector("#data") as HTMLInputElement;

  let tipoTransacao: string = inputTipoTransacao.value;
  let valor: number = inputValor.valueAsNumber;
  let data: Date = new Date(inputData.value);

  switch (tipoTransacao) {
    case "Depósito":
      saldo += valor;
      break;
    case "Transferência":
    case "Pagamento de Boleto":
      saldo -= valor;
      break;
    default:
      alert("Tipo de transação inválido!");
      return;
  }

  elementSaldo.textContent = saldo.toString();

  const novaTransacao = {
    tipoTransacao: tipoTransacao,
    valor: valor,
    data: data,
  };

  console.log(novaTransacao);
  elementoFormulario.reset();
});
