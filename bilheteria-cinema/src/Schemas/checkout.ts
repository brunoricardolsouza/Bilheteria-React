import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(3, "Digite seu nome completo").trim(),
  email: z.string().email("Digite um e-mail válido").trim(),
  cardNumber: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Formato: 0000 0000 0000 0000")
    .trim(),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/AA")
    .trim(),
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, "CVV inválido")
    .trim(),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;
