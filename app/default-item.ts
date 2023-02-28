import Item from "./item";

const QUALITY_VARIATION_BEFORE_SELL_IN = -1n;
const QUALITY_VARIATION_AFTER_SELL_IN = -2n;

export default class DefaultItem extends Item {
  update() {
    this.decreaseSellIn();
    if (this._sellIn >= 0) {
      this._quality.varyQuality(QUALITY_VARIATION_BEFORE_SELL_IN);
    } else {
      this._quality.varyQuality(QUALITY_VARIATION_AFTER_SELL_IN);
    }
  }
}
