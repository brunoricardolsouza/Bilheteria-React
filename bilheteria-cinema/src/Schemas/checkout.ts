import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(3, "Digite seu nome completo"),
  email: z.string().email("Digite um e-mail válido"),
  cardNumber: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Formato: 0000 0000 0000 0000"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/AA"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV inválido"),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;
