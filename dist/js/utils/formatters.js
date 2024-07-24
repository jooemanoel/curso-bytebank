import { FormatoData } from "../types/FormatoData.js";
export function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
export function formatarData(data, formato = FormatoData.PADRAO) {
    if (formato == FormatoData.DIA_SEMANA_DIA_MES_ANO) {
        return data.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
    if (formato == FormatoData.DIA_MES) {
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
    return data.toLocaleDateString('pt-BR');
}
