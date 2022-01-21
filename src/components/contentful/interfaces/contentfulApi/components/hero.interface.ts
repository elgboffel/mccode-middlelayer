import { Asset } from "contentful";
import { Entry } from "../base/entry.interface";

export interface IHeroFields {
  image: Asset;
  verticalTitle: string;
  header: string;
  shortCopy: string;
}

export type IHero = Entry<IHeroFields>;
