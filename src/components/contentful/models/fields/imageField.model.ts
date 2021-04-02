import { Asset } from "contentful";
import { EntryBase } from "../base/entryBase.model";

export class ImageField extends EntryBase {
  constructor(imageArgs: Asset) {
    super(imageArgs?.sys);

    this.fields = new ImageFields(imageArgs);
  }
  fields: ImageFields;
}

class ImageFields {
  constructor(imageFieldsArgs: Asset) {
    this.title = imageFieldsArgs?.fields?.title;
    this.url = imageFieldsArgs?.fields?.file?.url;
    this.size = imageFieldsArgs?.fields?.file?.details?.size;
    this.width = imageFieldsArgs?.fields?.file?.details?.image?.width;
    this.height = imageFieldsArgs?.fields?.file?.details?.image?.height;
    this.fileName = imageFieldsArgs?.fields?.file?.fileName;
  }

  title: string;
  url: string;
  size: number;
  width: number;
  height: number;
  fileName: string;
}
