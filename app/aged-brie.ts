import Item from "./item";

const AGED_BRIE = "Aged Brie";

const QUALITY_INCREASE_BEFORE_SELL_IN = 1n;
const QUALITY_INCREASE_AFTER_SELL_IN = 2n;

export default class AgedBrie extends Item {
  constructor(sellIn: bigint, quality: bigint) {
    super(AGED_BRIE, sellIn, quality);
  }

  update() {
    this.decreaseSellIn();
    if (this._sellIn >= 0) {
      this._quality.varyQuality(QUALITY_INCREASE_BEFORE_SELL_IN);
    } else {
      this._quality.varyQuality(QUALITY_INCREASE_AFTER_SELL_IN);
    }
  }
}
