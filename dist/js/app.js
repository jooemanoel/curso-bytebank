var saldo = 3000;
var elementSaldo = document.querySelector(".saldo-valor .valor");
elementSaldo.textContent = saldo.toString();
var elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!elementoFormulario.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação!");
        return;
    }
    var inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao");
    var inputValor = elementoFormulario.querySelector("#valor");
    var inputData = elementoFormulario.querySelector("#data");
    var tipoTransacao = inputTipoTransacao.value;
    var valor = inputValor.valueAsNumber;
    var data = new Date(inputData.value);
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
    var novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data,
    };
    console.log(novaTransacao);
    elementoFormulario.reset();
});
