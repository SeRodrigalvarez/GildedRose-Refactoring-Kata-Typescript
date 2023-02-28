import Item from "./item";

const SULFURAS = "Sulfuras, Hand of Ragnaros";
const IMMUTABLE_QUALITY = 80n;

export default class Sulfuras extends Item {
  constructor(sellIn: bigint) {
    super(SULFURAS, sellIn, IMMUTABLE_QUALITY);
  }

  update() {}

  get maxQuality() {
    return 80n;
  }

  get minQuality() {
    return 80n;
  }
}
