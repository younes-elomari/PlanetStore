export function ItemInArray(array: any[], id: number) {
  return array.find((item) => item.id === id) ? true : false;
}
