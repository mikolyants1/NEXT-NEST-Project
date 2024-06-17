type TField<T> = Array<keyof T as Key>;

export const hideFieldMap = <T>(
  user:T,
  fields:Array<keyof T>
):T => {
  const arr_user = Object.entries(user);
  const map_user = new Map(arr_user);
  for (const key of fields) {
    const field = key as string;
    map_user.delete(field);
  }
  return Object.fromEntries(map_user) as T;
}