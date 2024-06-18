import {z} from 'zod';

export const updateUserSchema = z.object({
  tag:z.string().optional(),
  username:z.string().optional(),
  password:z.string().optional()
});

export const checkLoginSchema = z.object({
  tag:z.string().optional(),
  username:z.string().min(1,"username is required"),
  password:z.string().min(1,"password is required")
});

export const checkUserSchema = z.object({
  username:z.string().min(1,"username is required"),
  password:z.string().min(1,"password is required")
});
