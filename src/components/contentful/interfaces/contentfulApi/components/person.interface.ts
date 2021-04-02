import { Asset } from "contentful";
import { Entry } from "../base/entry.interface";

export interface IPersonFields {
  image: Asset;
  name: string;
  title: string;
  company: string;
  shortBio: string;
  email: string;
  phone: string;
  facebook: string;
  twitter: string;
  github: string;
}

export type IPerson = Entry<IPersonFields>;
