import { z } from "zod";

export const newSletterSchema = z.object({
  email: z.string().email("Digite um e-mail válido!"),
});

export type NewSletterSchema = z.infer<typeof newSletterSchema>;
