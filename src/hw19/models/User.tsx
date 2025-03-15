export enum UserType {
  Standard = 'Standard',
  Premium = 'Premium',
  Gold = 'Gold',
  Free = 'Free',
}

export class User {
  constructor(public id: string, public type: UserType) {}
}
