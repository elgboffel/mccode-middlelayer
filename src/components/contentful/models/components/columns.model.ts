import { EntryBase } from "../base/entryBase.model";
import { IColumns } from "../../interfaces/contentfulApi/components/columns.interface";
import { Components } from "../components.model";
import { ComponentType } from "../componentType.model";

export class Columns extends EntryBase {
  constructor(columnsArgs: IColumns) {
    super(columnsArgs?.sys);

    this.columns = columnsArgs?.fields?.columns;
    this.components = new Components(columnsArgs?.fields?.components)?.list;
  }

  columns: number;
  components: ComponentType[];
}
