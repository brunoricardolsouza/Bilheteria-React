import { z } from "zod";

export const promoCodeSchema = z.object({
  code: z.string().min(1, "Digite um código"),
});

export type PromoCodeSchema = z.infer<typeof promoCodeSchema>;
