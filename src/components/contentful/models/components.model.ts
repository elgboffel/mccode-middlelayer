import { ComponentType } from "./componentType.model";
import { IComponentType } from "../interfaces/contentfulApi/components/componentType.interface";
import { ComponentFactory } from "../factories/component.factory";

export class Components {
  private readonly _componentFactory: ComponentFactory;
  constructor(componentsArgs: IComponentType[]) {
    this._componentFactory = this._componentFactory ?? new ComponentFactory();
    this.populateList(componentsArgs);
  }

  list: ComponentType[] = [];

  private populateList(components: IComponentType[]) {
    components.forEach((component) => {
      this.list.push(this._componentFactory.getComponent(component));
    });
  }
}
