import { EntryBase } from "../base/entryBase.model";
import { ImageField } from "../fields/imageField.model";
import { IHero } from "../../interfaces/contentfulApi/components/hero.interface";

export class Hero extends EntryBase {
  constructor(heroArgs: IHero) {
    super(heroArgs?.sys);

    this.image = new ImageField(heroArgs?.fields?.image);
    this.header = heroArgs?.fields?.header;
    this.verticalTitle = heroArgs?.fields?.verticalTitle;
    this.shortCopy = heroArgs?.fields?.shortCopy;
  }

  image: ImageField;
  verticalTitle: string;
  header: string;
  shortCopy: string;
}
