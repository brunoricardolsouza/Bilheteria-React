# 🎬 Cineplex — Bilheteria de Cinema

Aplicação de bilheteria de cinema construída em React + TypeScript, cobrindo o fluxo completo de compra de ingresso: escolha do filme, sessão, assentos (com opção de meia-entrada/inteira), combos de bomboniere, checkout e confirmação da compra.

**🔗 Deploy ao vivo:** [bilheteria-react.vercel.app](https://bilheteria-react.vercel.app/)

> Projeto de estudo com foco em React (hooks essenciais e personalizados, Context API), TypeScript e formulários com validação — construído do zero como peça de portfólio.

---

## 📸 Fluxo da aplicação

`Home` → `Filme (sessão + assentos)` → `Bomboniere` → `Checkout` → `Confirmação`

## ✨ Funcionalidades

- Catálogo de filmes com destaque, carrossel e filtro por gênero
- Seleção de data, horário e assentos por mapa interativo (com assentos reservados simulados)
- Escolha de ingresso **meia-entrada ou inteira** por assento, com cálculo de preço proporcional
- Bomboniere com filtro por categoria e carrinho com controle de quantidade
- Checkout com formulário de dados do cliente, cupom de desconto e método de pagamento (validação completa via Zod)
- Resumo de pedido com subtotal, taxa de conveniência e imposto calculados dinamicamente
- Confirmação da compra com ticket digital (QR code) e opção de impressão
- **Persistência via `localStorage`**: o progresso da compra sobrevive a um recarregamento de página
- Reserva zerada automaticamente ao concluir a compra ou trocar de sessão

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| [React 19](https://react.dev/) | Biblioteca de UI, hooks essenciais e personalizados |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática em todo o projeto |
| [Vite](https://vite.dev/) | Build tool e dev server |
| [React Router](https://reactrouter.com/) | Roteamento client-side (SPA) |
| [React Hook Form](https://react-hook-form.com/) | Gerenciamento de formulários |
| [Zod](https://zod.dev/) | Validação de schema, integrada ao React Hook Form |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização utility-first |
| [Vercel](https://vercel.com/) | Deploy e hospedagem |

## 🏗️ Arquitetura

O estado da reserva (filme, sessão, assentos, snacks e dados do cliente) é centralizado num único **Context API** (`BookingContext`), consumido por todas as páginas através de um hook personalizado (`useBooking`). Esse estado é sincronizado automaticamente com o `localStorage` por outro hook personalizado (`useLocalStorage`), garantindo que a compra em andamento não se perca ao recarregar a página.
```
src/
├── components/
│ ├── layout/ # Navbar, Footer, Logo — usados em todas as páginas
│ └── movie/ # MovieCard — card de filme reutilizado em várias telas
├── contexts/
│ └── BookingContext.tsx # Estado global da reserva + hook useBooking()
├── data/
│ ├── movies.ts # Catálogo de filmes mockado (tipos Movie, Session, ShowTime)
│ └── snacks.ts # Catálogo de itens de bomboniere mockado
├── hooks/
│ └── useLocalStorage.ts # Hook genérico: useState sincronizado com localStorage
├── pages/
│ ├── HomePage.tsx
│ ├── MoviePage.tsx # Seleção de sessão, horário e assentos
│ ├── SnacksPage.tsx # Bomboniere e carrinho
│ ├── CheckoutPage.tsx # Formulário de compra (RHF + Zod)
│ └── ConfirmationPage.tsx
├── Schemas/ # Schemas Zod (checkout, cupom, newsletter)
├── utils/
│ └── ticket.ts # Cálculo de preço por tipo de ingresso (meia/inteira)
└── App.tsx # Rotas da aplicação
```
## 📝 Observações

- Os dados de filmes e sessões são mockados localmente (src/data) — não há backend. A integração com uma API pública de filmes é uma evolução planejada.
- As imagens de pôster/backdrop usam um serviço de placeholder — a troca por imagens reais está prevista junto da integração de API.
