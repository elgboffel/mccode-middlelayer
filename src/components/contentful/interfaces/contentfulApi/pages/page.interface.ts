import { Entry } from "../base/entry.interface";
import { IComponentType } from "../components/componentType.interface";

export interface IPageFields {
  internalName: string;
  slug: Record<string, string>;
  title: string;
  content: IComponentType[];
  childPages: Record<string, IPage[]>;
}

export type IPage = Entry<IPageFields>;
