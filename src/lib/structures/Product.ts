export default class Product {
  public name = "";
  public price = 0;

  public constructor(initalizer?: Pick<Product, "name" | "price">) {
    Object.assign(this, initalizer);
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public setPrice(price: number) {
    this.price = price;
    return this; 
  }

  public getFormatedPrice(locale = "id-ID", currency = "IDR") {
    return this
      .price
      .toLocaleString(locale, { style: "currency", currency });
  }
}
