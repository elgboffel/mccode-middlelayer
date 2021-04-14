import { EntryBase } from "../base/entryBase.model";
import { IPage } from "../../interfaces/contentfulApi/pages/page.interface";
import { ImageField } from "../fields/imageField.model";
import { Components } from "../components.model";
import { ComponentType } from "../componentType.model";

export class Page extends EntryBase {
  constructor(pageArgs: IPage) {
    super(pageArgs?.sys);

    this.slug = pageArgs?.fields?.slug;
    this.heading = pageArgs?.fields?.heading;
    this.description = pageArgs?.fields?.description;
    this.image =
      pageArgs?.fields?.image && new ImageField(pageArgs.fields.image);
    this.content =
      pageArgs?.fields?.content &&
      new Components(pageArgs.fields.content)?.list;
  }

  slug: string;
  heading: string;
  description: string;
  image: ImageField;
  content: ComponentType[];
}
