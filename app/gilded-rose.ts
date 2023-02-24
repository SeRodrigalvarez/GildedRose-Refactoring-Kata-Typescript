import Item from '@/item'

const AGED_BRIE = 'Aged Brie'
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert'
const SULFURAS = 'Sulfuras, Hand of Ragnaros'

const DEFAULT_MIN_ITEM_QUALITY = 0
const DEFAULT_MAX_ITEM_QUALITY = 50

const DEFAULT_QUALITY_VARIATION_BEFORE_SELL_IN = -1
const DEFAULT_QUALITY_VARIATION_AFTER_SELL_IN = -2

const AGED_BRIE_QUALITY_VARIATION_BEFORE_SELL_IN = 1
const AGED_BRIE_QUALITY_VARIATION_AFTER_SELL_IN = 2

const BACKSTAGE_PASSES_FIRST_INCREASE_DAY = 10
const BACKSTAGE_PASSES_SECOND_INCREASE_DAY = 5

const BACKSTAGE_PASSES_QUALITY_VARIATION_BEFORE_FIRST_INCREASE_DAY = 1
const BACKSTAGE_PASSES_QUALITY_VARIATION_AFTER_FIRST_INCREASE_DAY = 2
const BACKSTAGE_PASSES_QUALITY_VARIATION_AFTER_SECOND_INCREASE_DAY = 3

const BACKSTAGE_PASSES_QUALITY_AFTER_CONCERT = 0


export default class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {    
    for(const item of this.items) {
      switch(item.name) {
        case AGED_BRIE:
          if (item.sellIn > 0) {
            item.quality += AGED_BRIE_QUALITY_VARIATION_BEFORE_SELL_IN
          } else {
            item.quality += AGED_BRIE_QUALITY_VARIATION_AFTER_SELL_IN
          }

          if (item.quality > DEFAULT_MAX_ITEM_QUALITY) {
            item.quality = DEFAULT_MAX_ITEM_QUALITY
          }

          item.sellIn -= 1
          break
        case BACKSTAGE_PASSES:
          if (item.sellIn <= 0) {
            item.quality = BACKSTAGE_PASSES_QUALITY_AFTER_CONCERT
          } else if (item.sellIn <= BACKSTAGE_PASSES_SECOND_INCREASE_DAY) {
            item.quality += BACKSTAGE_PASSES_QUALITY_VARIATION_AFTER_SECOND_INCREASE_DAY
          } else if (item.sellIn <= BACKSTAGE_PASSES_FIRST_INCREASE_DAY) {
            item.quality += BACKSTAGE_PASSES_QUALITY_VARIATION_AFTER_FIRST_INCREASE_DAY
          } else if (item.sellIn > BACKSTAGE_PASSES_FIRST_INCREASE_DAY) {
            item.quality += BACKSTAGE_PASSES_QUALITY_VARIATION_BEFORE_FIRST_INCREASE_DAY
          }

          if (item.quality > DEFAULT_MAX_ITEM_QUALITY) {
            item.quality = DEFAULT_MAX_ITEM_QUALITY
          }

          item.sellIn -= 1
          break
        case SULFURAS:
          break
        default:
          if (item.sellIn > 0) {
            item.quality += DEFAULT_QUALITY_VARIATION_BEFORE_SELL_IN
          } else {
            item.quality += DEFAULT_QUALITY_VARIATION_AFTER_SELL_IN
          }

          if (item.quality < DEFAULT_MIN_ITEM_QUALITY) {
            item.quality = DEFAULT_MIN_ITEM_QUALITY
          }

          item.sellIn -= 1
      }
    }

    return this.items;
  }
}
