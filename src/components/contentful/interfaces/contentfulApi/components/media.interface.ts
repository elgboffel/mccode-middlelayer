import { Asset } from "contentful";
import { Entry } from "../base/entry.interface";

export interface IMediaFields {
  image: Asset;
  video: Asset;
}

export type IMedia = Entry<IMediaFields>;
