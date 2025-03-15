import { UserType } from './User';
import { ProductType } from './Product';

export class Discount {
  constructor(public userType: UserType, public productType: ProductType, public discountValue: number) {}
}
