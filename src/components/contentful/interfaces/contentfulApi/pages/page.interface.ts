import { Asset } from "contentful";
import { Entry } from "../base/entry.interface";
import { IComponentType } from "../components/componentType.interface";

export interface IPageFields {
  internalName: string;
  slug: string;
  heading: string;
  description: string;
  image: Asset;
  content: IComponentType[];
}

export type IPage = Entry<IPageFields>;
