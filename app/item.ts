import Quality from "./quality";

export default abstract class Item {
  private _name: string;
  protected _sellIn: bigint;
  protected _quality: Quality;

  constructor(name: string, sellIn: bigint, quality: bigint) {
    this._name = name;
    this._sellIn = sellIn;
    this._quality = new Quality(quality, this.maxQuality, this.minQuality);
  }

  get name() {
    return this._name;
  }

  get sellIn() {
    return this._sellIn;
  }

  get quality() {
    return this._quality;
  }

  protected decreaseSellIn() {
    this._sellIn -= 1n;
  }

  protected get maxQuality() {
    return 50n;
  }

  protected get minQuality() {
    return 0n;
  }

  abstract update();
}
