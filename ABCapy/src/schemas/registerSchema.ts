import { z } from "zod";


const commonTypoRegex = /@(gmil|gmaill|gmai|hotmial|hotmai|outlok)\./i;

export const registerSchema = z
  .object({
    nameUser: z
      .string()
      .min(3, "O nome deve ter pelo menos 3 caracteres"),

    email: z
      .string()
      .min(1, "O e-mail é obrigatório")
      .email("Insira um e-mail válido (ex: exemplo@gmail.com)")
      .refine(
        (email) => !commonTypoRegex.test(email),
        { message: "Parece haver um erro no domínio do e-mail (ex: digite @gmail.com em vez de @gmil.com)" }
      ),

    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .regex(/[*@!#%&()^~{}]+/, "A senha deve conter pelo menos 1 caractere especial")
      .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula (A-Z)" }),

    confirmPassword: z
      .string()
      .min(1, "A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;