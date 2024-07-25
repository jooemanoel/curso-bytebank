export function ValidaDebito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (valorDebito: number) {
        if (valorDebito <= 0) {
            throw new Error("O valor precisa ser maior do que zero!");
        }
        if (valorDebito > this.saldo) {
            throw new Error("Saldo Insuficiente!");
        }
        return originalMethod.apply(this, [valorDebito]);
    }

    return descriptor;
}

export function validaDeposito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorDeposito: number) {
        if (valorDeposito <= 0) {
            throw new Error("O valor precisa ser maior do que zero!");
        }
        return originalMethod.apply(this, [valorDeposito]);
    }
    return descriptor;
}