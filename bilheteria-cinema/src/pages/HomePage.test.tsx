import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("HomePage - newsletter", () => {
  it("mostra erro quando o e-mail é inválido", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await user.type(
      screen.getByLabelText("Endereço de e-mail"),
      "email-invalido",
    );
    await user.click(screen.getByRole("button", { name: "Join Now" }));

    expect(
      await screen.findByText("Digite um e-mail válido!"),
    ).toBeInTheDocument();
  });

  it("mostra mensagem de sucesso quando o e-mail é válido", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await user.type(
      screen.getByLabelText("Endereço de e-mail"),
      "teste@email.com",
    );
    await user.click(screen.getByRole("button", { name: "Join Now" }));

    expect(await screen.findByText(/Inscrito com sucesso/)).toBeInTheDocument();
  });
});
