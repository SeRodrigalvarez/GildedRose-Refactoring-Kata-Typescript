import Item from "./item";

const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";

const FIRST_INCREASE_DAY = 10;
const SECOND_INCREASE_DAY = 5;

const QUALITY_VARIATION_BEFORE_FIRST_INCREASE_DAY = 1n;
const QUALITY_VARIATION_AFTER_FIRST_INCREASE_DAY = 2n;
const QUALITY_VARIATION_AFTER_SECOND_INCREASE_DAY = 3n;

const QUALITY_AFTER_CONCERT = 0n;

export default class BackstagePasses extends Item {
  constructor(sellIn: bigint, quality: bigint) {
    super(BACKSTAGE_PASSES, sellIn, quality);
  }

  update() {
    this.decreaseSellIn();
    if (this._sellIn < 0) {
      this._quality.setQuality(QUALITY_AFTER_CONCERT);
    } else if (this._sellIn < SECOND_INCREASE_DAY) {
      this._quality.varyQuality(QUALITY_VARIATION_AFTER_SECOND_INCREASE_DAY);
    } else if (this._sellIn < FIRST_INCREASE_DAY) {
      this._quality.varyQuality(QUALITY_VARIATION_AFTER_FIRST_INCREASE_DAY);
    } else if (this._sellIn >= FIRST_INCREASE_DAY) {
      this._quality.varyQuality(QUALITY_VARIATION_BEFORE_FIRST_INCREASE_DAY);
    }
  }
}
