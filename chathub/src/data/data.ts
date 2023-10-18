// data.ts

export class Data {
  private static instance: Data;
  private userId: number;

  private constructor() {
    this.userId = 0;
  }

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  get getUser(): number {
    return this.userId;
  }

  set setUser(value: number) {
    this.userId = value;
  }
}
