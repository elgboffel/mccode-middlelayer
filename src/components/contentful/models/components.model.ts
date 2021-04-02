import { Person } from "./components/person.model";
import { IPerson } from "../interfaces/contentfulApi/components/person.interface";
import { ComponentType } from "./componentType.model";
import { IComponentType } from "../interfaces/contentfulApi/componentType.interface";
import { ComponentAlias } from "../interfaces/contentfulApi/components/componentAlias.enum";
import { Media } from "./components/media.model";
import { IMedia } from "../interfaces/contentfulApi/components/media.interface";

export class Components {
  constructor(componentsArgs: IComponentType[]) {
    this.componentsFactory(componentsArgs);
  }

  list: ComponentType[] = [];

  private componentsFactory(components: IComponentType[]) {
    components.forEach((component) => {
      const contentType = component.sys.contentType.sys.id;

      if (!contentType) return;

      switch (contentType) {
        case ComponentAlias.Person:
          this.list.push(new Person(component as IPerson));
          return;
        case ComponentAlias.Media:
          this.list.push(new Media(component as IMedia));
          return;
      }
    });
  }
}
