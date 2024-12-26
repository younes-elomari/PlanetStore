export function calculatePriceWithOffer (price: number, offre: number){
    return parseFloat((price - (price * offre) / 100).toFixed(2));
}