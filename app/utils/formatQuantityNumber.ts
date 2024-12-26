export function formatQuantityNumber(quantity: number) {
  return quantity < 10 ? `0${quantity}` : quantity;
}
