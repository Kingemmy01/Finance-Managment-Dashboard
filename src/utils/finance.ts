export function calcVatAmount(amount: number, vatPercent: number) {
  return (amount * vatPercent) / 100;
}

export function calcTotal(amount: number, vatPercent: number) {
  return amount + calcVatAmount(amount, vatPercent);
}
