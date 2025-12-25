import z from "zod";

export const userNameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")

export const signUpSchema = z.object({
    userName: userNameValidation,
    email: z.email().min(1, "Email is required"),
    password: z.string().min(6, "Password must be atleast 6 characters required"),
    // ngoId: z.string().min(3, "Ngo Id is required"),
    // isAuthorized: z.boolean().refine(val => val === true, {
    //     message: "You must confirm that you are an authorized NGO staff member."
    // })
})