import AgedBrie from "@/aged-brie";
import BackstagePasses from "@/backstage-passes";
import ConjuredItem from "@/conjured-item";
import DefaultItem from "@/default-item";
import Sulfuras from "@/sulfuras";
import GildedRose from "@/gilded-rose";

const DEFAULT_ITEM = "Defualt Item";
const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const CONJURED = "sword";

describe("Gilded Rose", () => {
  describe(DEFAULT_ITEM, () => {
    it("should decrease -1 in quality before sellIn", () => {
      const gildedRose = new GildedRose([
        new DefaultItem(DEFAULT_ITEM, 2n, 10n),
      ]);
      gildedRose.updateQuality();
      const item = gildedRose.getItem(0);
      expect(item.sellIn).toBe(1n);
      expect(item.quality.value).toBe(9n);
    });

    it("should decrease -2 in quality before sellIn", () => {
      const gildedRose = new GildedRose([
        new DefaultItem(DEFAULT_ITEM, 0n, 10n),
      ]);
      gildedRose.updateQuality();
      const item = gildedRose.getItem(0);
      expect(item.sellIn).toBe(-1n);
      expect(item.quality.value).toBe(8n);
    });
  });

  describe(AGED_BRIE, () => {
    it("should increase +1 in quality before sellIn", () => {
      const gildedRose = new GildedRose([new AgedBrie(2n, 10n)]);
      gildedRose.updateQuality();
      const item = gildedRose.getItem(0);
      expect(item.sellIn).toBe(1n);
      expect(item.quality.value).toBe(11n);
    });

    it("should decrease +2 in quality after sellIn", () => {
      const gildedRose = new GildedRose([new AgedBrie(0n, 10n)]);
      gildedRose.updateQuality();
      const item = gildedRose.getItem(0);
      expect(item.sellIn).toBe(-1n);
      expect(item.quality.value).toBe(12n);
    });
  });

  describe(SULFURAS, () => {
    it("should stay in quality and sellIn", () => {
      const gildedRose = new GildedRose([new Sulfuras(2n)]);
      gildedRose.updateQuality();
      const item = gildedRose.getItem(0);
      expect(item.sellIn).toBe(2n);
      expect(item.quality.value).toBe(80n);
    });
  });

  describe(BACKSTAGE_PASSES, () => {
    it("should increase +1 in quality before first increase day", () => {
      const gildedRose = new GildedRose([new BackstagePasses(11n, 10n)]);
      gildedRose.updateQuality();
      const item = gildedRose.getItem(0);
      expect(item.sellIn).toBe(10n);
      expect(item.quality.value).toBe(11n);
    });

    it("should increase +2 in quality after first increase day", () => {
      const gildedRose = new GildedRose([new BackstagePasses(10n, 10n)]);
      gildedRose.updateQuality();
      const item = gildedRose.getItem(0);
      expect(item.sellIn).toBe(9n);
      expect(item.quality.value).toBe(12n);
    });

    it("should increase +3 in quality after second increase day", () => {
      const gildedRose = new GildedRose([new BackstagePasses(5n, 10n)]);
      gildedRose.updateQuality();
      const item = gildedRose.getItem(0);
      expect(item.sellIn).toBe(4n);
      expect(item.quality.value).toBe(13n);
    });

    it("should be 0 quality after sellIn day", () => {
      const gildedRose = new GildedRose([new BackstagePasses(0n, 10n)]);
      gildedRose.updateQuality();
      const item = gildedRose.getItem(0);
      expect(item.sellIn).toBe(-1n);
      expect(item.quality.value).toBe(0n);
    });
  });

  describe(CONJURED, () => {
    it("should decrease -2 in quality before sellIn", () => {
      const gildedRose = new GildedRose([new ConjuredItem(CONJURED, 2n, 10n)]);
      gildedRose.updateQuality();
      const item = gildedRose.getItem(0);
      expect(item.sellIn).toBe(1n);
      expect(item.quality.value).toBe(8n);
    });

    it("should decrease -4 in quality before sellIn", () => {
      const gildedRose = new GildedRose([new ConjuredItem(CONJURED, 0n, 10n)]);
      gildedRose.updateQuality();
      const item = gildedRose.getItem(0);
      expect(item.sellIn).toBe(-1n);
      expect(item.quality.value).toBe(6n);
    });
  });

  describe("Quality value limits", () => {
    it("should not increase quality over max value", () => {
      const gildedRose = new GildedRose([new AgedBrie(0n, 50n)]);
      gildedRose.updateQuality();
      const item = gildedRose.getItem(0);
      expect(item.quality.value).toBe(50n);
    });

    it("should not decrease quality over min value", () => {
      const gildedRose = new GildedRose([
        new DefaultItem(DEFAULT_ITEM, 0n, 0n),
      ]);
      gildedRose.updateQuality();
      const item = gildedRose.getItem(0);
      expect(item.quality.value).toBe(0n);
    });
  });
});
