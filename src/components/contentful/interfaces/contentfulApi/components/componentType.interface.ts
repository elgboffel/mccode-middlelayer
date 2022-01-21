import { IMedia } from "./media.interface";
import { IPerson } from "./person.interface";
import { IColumns } from "./columns.interface";
import { IText } from "./text.interface";
import { IHero } from "./hero.interface";

export type IComponentType = IMedia | IPerson | IColumns | IText | IHero;
