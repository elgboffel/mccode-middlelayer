import { Entry } from "../base/entry.interface";
import { IComponentType } from "./componentType.interface";

export interface IColumnsFields {
  columns: number;
  components: IComponentType[];
}

export type IColumns = Entry<IColumnsFields>;
