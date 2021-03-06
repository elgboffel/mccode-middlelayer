export class Webhook {
  body: Body;
}

class Body {
  entityId: string;
  spaceId: string;
  environment: string;
  slugs: Record<string, string>;
}
