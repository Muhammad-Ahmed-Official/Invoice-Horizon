import z from "zod";

export const signInSchema = z.object({
    email: z.email().min(1, "Email is required"),
    password: z.string().min(6, "Password must be atleast 6 characters required"),
})