import { z } from "zod";

export const registerSchema = z
  .object({
    nom: z.string().min(2, "Min. 2 caractères"),
    prenom: z.string().min(2, "Min. 2 caractères"),
    email: z.string().email("Email invalide"),
    password: z
      .string()
      .min(6, "Min. 6 caractères")
      .regex(/[A-Z]/, "1 majuscule requise")
      .regex(/[0-9]/, "1 chiffre requis"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Mots de passe différents",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Min. 6 caractères"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
