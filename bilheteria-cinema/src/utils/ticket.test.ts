import { describe, it, expect } from "vitest";
import { calculateSeatPrice } from "./ticket";

describe("calculateSeatPrice", () => {
  it("retorna o preço cheio para ingresso inteira", () => {
    expect(calculateSeatPrice("full", 40)).toBe(40);
  });

  it("retorna metade do preço para ingresso meia-entrada", () => {
    expect(calculateSeatPrice("half", 40)).toBe(20);
  });
});
