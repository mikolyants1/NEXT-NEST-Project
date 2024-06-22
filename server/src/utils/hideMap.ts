export const hideFieldMap = <T>(obj:T,keys:Array<keyof T>):T => {
  const obj_entries = Object.entries(obj);
  const obj_map = new Map(obj_entries);
  for (const key of keys) {
    const field = key as string;
    obj_map.delete(field);
  }
  return Object.fromEntries(obj_map) as T;
}