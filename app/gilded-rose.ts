import Item from "@/item";

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";

const CONJURED_REGEXP = /Conjured.*/;

const DEFAULT_MIN_ITEM_QUALITY = 0;
const DEFAULT_MAX_ITEM_QUALITY = 50;

const DEFAULT_QUALITY_VARIATION_BEFORE_SELL_IN = -1;
const DEFAULT_QUALITY_VARIATION_AFTER_SELL_IN = -2;

const CONJURED_QUALITY_VARIATION_BEFORE_SELL_IN = -2;
const CONJURED_QUALITY_VARIATION_AFTER_SELL_IN = -4;

const AGED_BRIE_QUALITY_VARIATION_BEFORE_SELL_IN = 1;
const AGED_BRIE_QUALITY_VARIATION_AFTER_SELL_IN = 2;

const BACKSTAGE_PASSES_FIRST_INCREASE_DAY = 10;
const BACKSTAGE_PASSES_SECOND_INCREASE_DAY = 5;

const BACKSTAGE_PASSES_QUALITY_VARIATION_BEFORE_FIRST_INCREASE_DAY = 1;
const BACKSTAGE_PASSES_QUALITY_VARIATION_AFTER_FIRST_INCREASE_DAY = 2;
const BACKSTAGE_PASSES_QUALITY_VARIATION_AFTER_SECOND_INCREASE_DAY = 3;

const BACKSTAGE_PASSES_QUALITY_AFTER_CONCERT = 0;

export default class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case AGED_BRIE:
          this.updateAgedBrie(item);
          break;
        case BACKSTAGE_PASSES:
          this.updateBackstagePasses(item);
          break;
        case SULFURAS:
          break;
        case item.name.match(CONJURED_REGEXP)?.input:
          this.updateConjuredItem(item);
          break;
        default:
          this.updateDefaultItem(item);
      }
    }

    return this.items;
  }

  private decreaseSellIn(item: Item) {
    item.sellIn -= 1;
  }

  private adjustMaxQuality(item: Item) {
    if (item.quality > DEFAULT_MAX_ITEM_QUALITY) {
      item.quality = DEFAULT_MAX_ITEM_QUALITY;
    }
  }

  private adjustMinQuality(item: Item) {
    if (item.quality < DEFAULT_MIN_ITEM_QUALITY) {
      item.quality = DEFAULT_MIN_ITEM_QUALITY;
    }
  }

  private updateAgedBrie(item: Item) {
    this.decreaseSellIn(item);
    if (item.sellIn >= 0) {
      item.quality += AGED_BRIE_QUALITY_VARIATION_BEFORE_SELL_IN;
    } else {
      item.quality += AGED_BRIE_QUALITY_VARIATION_AFTER_SELL_IN;
    }
    this.adjustMaxQuality(item);
  }

  private updateBackstagePasses(item: Item) {
    this.decreaseSellIn(item);
    if (item.sellIn < 0) {
      item.quality = BACKSTAGE_PASSES_QUALITY_AFTER_CONCERT;
    } else if (item.sellIn < BACKSTAGE_PASSES_SECOND_INCREASE_DAY) {
      item.quality +=
        BACKSTAGE_PASSES_QUALITY_VARIATION_AFTER_SECOND_INCREASE_DAY;
    } else if (item.sellIn < BACKSTAGE_PASSES_FIRST_INCREASE_DAY) {
      item.quality +=
        BACKSTAGE_PASSES_QUALITY_VARIATION_AFTER_FIRST_INCREASE_DAY;
    } else if (item.sellIn >= BACKSTAGE_PASSES_FIRST_INCREASE_DAY) {
      item.quality +=
        BACKSTAGE_PASSES_QUALITY_VARIATION_BEFORE_FIRST_INCREASE_DAY;
    }
    this.adjustMaxQuality(item);
  }

  private updateConjuredItem(item: Item) {
    this.decreaseSellIn(item);
    if (item.sellIn >= 0) {
      item.quality += CONJURED_QUALITY_VARIATION_BEFORE_SELL_IN;
    } else {
      item.quality += CONJURED_QUALITY_VARIATION_AFTER_SELL_IN;
    }
    this.adjustMinQuality(item);
  }

  private updateDefaultItem(item: Item) {
    this.decreaseSellIn(item);
    if (item.sellIn >= 0) {
      item.quality += DEFAULT_QUALITY_VARIATION_BEFORE_SELL_IN;
    } else {
      item.quality += DEFAULT_QUALITY_VARIATION_AFTER_SELL_IN;
    }
    this.adjustMinQuality(item);
  }
}
