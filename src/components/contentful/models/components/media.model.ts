import { EntryBase } from "../base/entryBase.model";
import { ImageField } from "../fields/imageField.model";
import { IMedia } from "../../interfaces/contentfulApi/components/media.interface";

export class Media extends EntryBase {
  constructor(mediaArgs: IMedia) {
    super(mediaArgs.sys);

    this.image = new ImageField(mediaArgs?.fields?.image);
  }
  image: ImageField;
}
