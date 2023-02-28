import AgedBrie from "@/aged-brie";
import BackstagePasses from "@/backstage-passes";
import ConjuredItem from "@/conjured-item";
import DefaultItem from "@/default-item";
import Sulfuras from "@/sulfuras";
import GildedRose from "@/gilded-rose";

const items = [
  new DefaultItem("+5 Dexterity Vest", 10n, 20n),
  new AgedBrie(2n, 0n),
  new DefaultItem("Elixir of the Mongoose", 5n, 7n),
  new Sulfuras(0n),
  new Sulfuras(-1n),
  new BackstagePasses(15n, 20n),
  new BackstagePasses(10n, 49n),
  new BackstagePasses(5n, 49n),
  new ConjuredItem("Mana Cake", 3n, 6n),
  new ConjuredItem("Sword", 3n, 40n),
];

const gildedRose = new GildedRose(items);

let days: number = 2;
if (process.argv.length > 2) {
  days = +process.argv[2];
}

for (let i = 0; i < days; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach((element) => {
    console.log(
      element.name + " " + element.sellIn + " " + element.quality.value
    );
  });
  console.log();
  gildedRose.updateQuality();
}
