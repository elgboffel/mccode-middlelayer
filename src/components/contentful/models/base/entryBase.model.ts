import { Sys } from "contentful";

export class EntryBase {
  constructor(baseArgs: Sys) {
    this.id = baseArgs.id;
    this.type = baseArgs?.type;
    this.locale = baseArgs?.locale;
    this.createdAt = baseArgs?.createdAt;
    this.updatedAt = baseArgs?.updatedAt;
    this.contentType = baseArgs?.contentType?.sys?.id;
  }

  id: string;
  type: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  contentType?: string;
}
