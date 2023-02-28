export default class Quality {
  private _quality: bigint;
  private _maxQuality: bigint;
  private _minQuality: bigint;

  constructor(
    quality: bigint,
    maxQuality: bigint = 50n,
    minQuality: bigint = 0n
  ) {
    this._quality = quality;
    this._maxQuality = maxQuality;
    this._minQuality = minQuality;
  }

  get value() {
    return this._quality;
  }

  setQuality(value: bigint) {
    this._quality = 0n;
    this._adjustQuality();
  }

  varyQuality(value: bigint) {
    this._quality += value;
    this._adjustQuality();
  }

  private _adjustQuality() {
    if (this._quality > this._maxQuality) {
      this._quality = this._maxQuality;
    }
    if (this._quality < this._minQuality) {
      this._quality = this._minQuality;
    }
  }
}
