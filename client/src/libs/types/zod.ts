import {z} from 'zod';

export const updateUserSchema = z.object({
  tag:z.string(),
  username:z.string(),
  password:z.string()
});

export const checkUserSchema = z.object({
  username:z.string(),
  password:z.string()
})