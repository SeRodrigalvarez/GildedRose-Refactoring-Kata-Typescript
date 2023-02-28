import Item from "./item";

const CONJURED_PREFIX = "Conjured";

const QUALITY_VARIATION_BEFORE_SELL_IN = -2n;
const QUALITY_VARIATION_AFTER_SELL_IN = -4n;

export default class ConjuredItem extends Item {
  constructor(name: string, sellIn: bigint, quality: bigint) {
    super(`${CONJURED_PREFIX} ${name}`, sellIn, quality);
  }

  update() {
    this.decreaseSellIn();
    if (this._sellIn >= 0) {
      this._quality.varyQuality(QUALITY_VARIATION_BEFORE_SELL_IN);
    } else {
      this._quality.varyQuality(QUALITY_VARIATION_AFTER_SELL_IN);
    }
  }
}
