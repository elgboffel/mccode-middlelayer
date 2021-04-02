import { EntryBase } from "../base/entryBase.model";
import { IPerson } from "../../interfaces/contentfulApi/components/person.interface";
import { ImageField } from "../fields/imageField.model";

export class Person extends EntryBase {
  constructor(personArgs: IPerson) {
    super(personArgs?.sys);

    this.image = new ImageField(personArgs?.fields?.image);
    this.name = personArgs?.fields?.name;
    this.title = personArgs?.fields?.title;
    this.company = personArgs?.fields?.company;
    this.shortBio = personArgs?.fields?.shortBio;
    this.email = personArgs?.fields?.email;
    this.phone = personArgs?.fields?.phone;
    this.facebook = personArgs?.fields?.facebook;
    this.twitter = personArgs?.fields?.twitter;
    this.github = personArgs?.fields?.github;
  }

  image: ImageField;
  name: string;
  title: string;
  company: string;
  shortBio: string;
  email: string;
  phone: string;
  facebook: string;
  twitter: string;
  github: string;
}
