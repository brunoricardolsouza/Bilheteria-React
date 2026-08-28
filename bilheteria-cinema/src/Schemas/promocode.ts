import { z } from "zod";

export const promoCodeSchema = z.object({
  code: z.string().min(1, "Digite um código").trim(),
});

export type PromoCodeSchema = z.infer<typeof promoCodeSchema>;
