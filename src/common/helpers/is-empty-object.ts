export const isEmptyObject = (obj: any) =>
  obj && Object.getOwnPropertyNames(obj).length === 0;
