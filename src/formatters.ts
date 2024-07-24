function formatarMoeda(valor: number) : string {
    return valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}

function formatarData(data: Date, formato: FormatoData = FormatoData.PADRAO) : string {
    if(formato == FormatoData.DIA_SEMANA_DIA_MES_ANO){
    return data.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    }
    if(formato == FormatoData.DIA_MES){
        return data.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'});
    }
    return data.toLocaleDateString('pt-BR');
}