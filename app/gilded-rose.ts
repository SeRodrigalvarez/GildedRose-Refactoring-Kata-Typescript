import Item from "./item";

export default class GildedRose {
  private _items: Item[];

  constructor(items) {
    this._items = items;
  }

  updateQuality() {
    this._items.map((item) => item.update());
  }

  getItem(index: number) {
    return this._items[index];
  }

  addItem(item: Item) {
    this._items.push(item);
  }
}
