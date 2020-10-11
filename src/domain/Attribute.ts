import { Identifiable } from './Identifiable';

export class Attribute implements Identifiable {
  private static minWeight = 1;
  private static maxWeight = 30;

  public constructor(
    private id: string,
    private name: string,
    private description: string,
    private weight: number
  ) {
    this.validateWeight(weight);
  }

  public get Id() {
    return this.id;
  }

  public get Name() {
    return this.name;
  }

  public get Description() {
    return this.description;
  }

  public get Weight() {
    return this.weight;
  }

  private validateWeight(weight: number): void {
    if (weight < Attribute.minWeight || weight > Attribute.maxWeight) {
      // tslint:disable-next-line: max-line-length
      throw new Error(
        `Invalid weight ${weight}. Must obey: ${Attribute.minWeight} <= weight <= ${Attribute.maxWeight}`
      );
    }
  }
}
