export const partialAssign = <T>(el: any, el2: Partial<T>): T =>
  Object.assign(el, el2) as unknown as T;
