import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid Email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password is weak, min 6 characters required"),
});

export const registerFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid Email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password is weak, min 6 characters required"),
});

export const updateFormSchema = z.object({
  name: z.string({required_error:"Name is required"}).min(1,"Enter a valid name"),
  image: z.string({required_error:"Image is required"}).url("Enter valid image url"),
  slug: z.string({required_error:"Username is required"}).min(4,"Enter a valid username"),
});


export const usernameFormSchema = z.object({
  username: z
  .string({ required_error: "Enter a valid username" })
  .min(4, "Username must be at least 4 characters")
  .regex(/^[a-zA-Z0-9-]+$/, "Username can only contain letters, numbers, and hyphens"),
});


export const onboardProfileFormSchema = z.object({
  name: z.string({required_error:"Name is required"}).min(1,"Enter a valid name"),
  image: z.string({required_error:"Image is required"}).url("Enter valid image url"),
  desc: z.string().optional(),
});
