import GildedRose from '@/gilded-rose';
import Item from '@/item';

const DEFAULT_ITEM = "Defualt Item"
const AGED_BRIE = 'Aged Brie'
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert'
const SULFURAS = 'Sulfuras, Hand of Ragnaros'
const CONJURED = 'Conjured'

describe('Gilded Rose', () => {

  describe(DEFAULT_ITEM, () => {
    it('should decrease -1 in quality before sellIn', () => {
      const gildedRose = new GildedRose([new Item(DEFAULT_ITEM, 2, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(9);
    });

    it('should decrease -2 in quality before sellIn', () => {
      const gildedRose = new GildedRose([new Item(DEFAULT_ITEM, 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(8);
    });
  })

  describe(AGED_BRIE, () => {
    it('should increase +1 in quality before sellIn', () => {
      const gildedRose = new GildedRose([new Item(AGED_BRIE, 2, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(11);
    });

    it('should decrease +2 in quality after sellIn', () => {
      const gildedRose = new GildedRose([new Item(AGED_BRIE, 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(12);
    });
  })

  describe(SULFURAS, () => {
    it('should stay in quality and sellIn', () => {
      const gildedRose = new GildedRose([new Item(SULFURAS, 2, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(2);
      expect(items[0].quality).toBe(10);
    });
  })

  describe(BACKSTAGE_PASSES, () => {
    it('should increase +1 in quality before first increase day', () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 11, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(11);
    });

    it('should increase +2 in quality after first increase day', () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(12);
    });

    it('should increase +3 in quality after second increase day', () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(13);
    });

    it('should be 0 quality after sellIn day', () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  })

  describe(CONJURED, () => {
    it('should decrease -2 in quality before sellIn', () => {
      const gildedRose = new GildedRose([new Item(CONJURED, 2, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(8);
    });

    it('should decrease -4 in quality before sellIn', () => {
      const gildedRose = new GildedRose([new Item(CONJURED, 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(6);
    });
  })
});
