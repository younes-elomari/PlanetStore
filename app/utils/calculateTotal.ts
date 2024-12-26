export function calculateTotal(price: number, offre: number, quantity: number){
    return parseFloat(
        (
          parseFloat((price - (price * offre) / 100).toFixed(2)) * quantity
        ).toFixed(2)
      );
}