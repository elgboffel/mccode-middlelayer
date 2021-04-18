import { EntryBase } from "../base/entryBase.model";
import { IText } from "../../interfaces/contentfulApi/components/text.interface";

export class Text extends EntryBase {
  constructor(textArgs: IText) {
    super(textArgs?.sys);

    this.text = textArgs?.fields?.text;
  }

  text: string;
}
