import { IComponentType } from "../interfaces/contentfulApi/components/componentType.interface";
import { ComponentAlias } from "../interfaces/contentfulApi/components/componentAlias.enum";
import { Person } from "../models/components/person.model";
import { IPerson } from "../interfaces/contentfulApi/components/person.interface";
import { Media } from "../models/components/media.model";
import { IMedia } from "../interfaces/contentfulApi/components/media.interface";
import { IColumns } from "../interfaces/contentfulApi/components/columns.interface";
import { Columns } from "../models/components/columns.model";
import { ComponentType } from "../models/componentType.model";
import { ContentfulClientApi, createClient } from "contentful";
import { IText } from "../interfaces/contentfulApi/components/text.interface";
import { Text } from "../models/components/text.model";
import { Hero } from "../models/components/hero.model";
import { IHero } from "../interfaces/contentfulApi/components/hero.interface";

export class ComponentFactory {
  private readonly _client: ContentfulClientApi;

  constructor() {
    this._client =
      this._client ??
      createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
      });
  }

  public getComponent(component: IComponentType): ComponentType {
    const contentType = component?.sys?.contentType?.sys?.id;

    if (!contentType) return;

    switch (contentType) {
      case ComponentAlias.Person:
        return new Person(component as IPerson);
      case ComponentAlias.Media:
        return new Media(component as IMedia);
      case ComponentAlias.Columns:
        return new Columns(component as IColumns);
      case ComponentAlias.Text:
        return new Text(component as IText);
      case ComponentAlias.Hero:
        return new Hero(component as IHero);
    }
  }
}
