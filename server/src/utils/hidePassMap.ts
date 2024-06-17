import { User } from "src/entity/user.entity";

export const hidePassMap = (user:User):User => {
  const arr_user = Object.entries(user);
  const map_user = new Map(arr_user);
  map_user.delete("password");
  return Object.fromEntries(map_user) as User;
}