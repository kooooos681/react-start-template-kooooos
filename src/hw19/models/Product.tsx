export enum ProductType {
  Car = 'Car',
  Toy = 'Toy',
  Food = 'Food',
}

export class Product {
  constructor(public id: string, public type: ProductType) {}
}
