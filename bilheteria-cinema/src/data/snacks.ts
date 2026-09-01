export interface Snack {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  badge: string | null;
  image: string;
}

export const snacks: Snack[] = [
  {
    id: 1,
    name: "Pipoca Jumbo Cinema",
    category: "Pipoca",
    price: 32.5,
    description:
      "Nossa pipoca amanteigada exclusiva, temperada com sal especial da casa.",
    badge: "Mais Vendido",
    image: "https://placehold.co/400x300?text=Pipoca+Jumbo+Cinema",
  },
  {
    id: 2,
    name: "Combo Director's Cut",
    category: "Combos",
    price: 58.0,
    description:
      "Pipoca grande, 2 refrigerantes médios e 1 caixa de chocolate.",
    badge: "Economia 20%",
    image: "https://placehold.co/400x300?text=Combo+Director's+Cut",
  },
  {
    id: 3,
    name: "Refrigerante Fountain XL",
    category: "Bebidas",
    price: 18.5,
    description: "Refrigerante gelado em copo gigante. Refil grátis incluído.",
    badge: null,
    image: "https://placehold.co/400x300?text=Refrigerante+Fountain+XL",
  },
  {
    id: 4,
    name: "Caixa Gourmet Selection",
    category: "Snacks",
    price: 42.0,
    description:
      "Seleção premium de chocolates artesanais e clássicos do cinema.",
    badge: null,
    image: "https://placehold.co/400x300?text=Caixa+Gourmet+Selection",
  },
  {
    id: 5,
    name: "Choc-Top Signature",
    category: "Snacks",
    price: 24.5,
    description:
      "Sorvete de baunilha coberto com chocolate belga amargo artesanal.",
    badge: "Economia 15%",
    image: "https://placehold.co/400x300?text=Choc-Top+Signature",
  },
  {
    id: 6,
    name: "Nachos Loaded",
    category: "Snacks",
    price: 38.0,
    description:
      "Nachos crocantes com molho de queijo, jalapeños e guacamole da casa.",
    badge: null,
    image: "https://placehold.co/400x300?text=Nachos+Loaded",
  },
  {
    id: 7,
    name: "Pipoca Caramel Premium",
    category: "Pipoca",
    price: 28.0,
    description: "Pipoca com cobertura de caramelo belga e flor de sal.",
    badge: null,
    image: "https://placehold.co/400x300?text=Pipoca+Caramel+Premium",
  },
  {
    id: 8,
    name: "Água Mineral 500ml",
    category: "Bebidas",
    price: 9.0,
    description: "Água mineral gelada.",
    badge: null,
    image: "https://placehold.co/400x300?text=Água+Mineral+500ml",
  },
];

export const snackCategories: string[] = [
  "Todos",
  "Pipoca",
  "Combos",
  "Bebidas",
  "Snacks",
];
