import { z } from "zod";

export const newSletterSchema = z.object({
  email: z.email("Digite um e-mail válido!").trim(),
});

export type NewSletterSchema = z.infer<typeof newSletterSchema>;
