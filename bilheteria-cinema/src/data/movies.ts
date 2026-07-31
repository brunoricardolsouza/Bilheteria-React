export interface ShowTime {
  id: number;
  time: string;
  format: string;
  price: number;
}

export interface Session {
  id: number;
  date: string;
  times: ShowTime[];
}

export interface Movie {
  id: number;
  title: string;
  tagline: string;
  description: string;
  genre: string[];
  rating: number;
  duration: string;
  classification: string;
  format: string[];
  featured: boolean;
  poster: string;
  backdrop: string;
  sessions: Session[];
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Neon Reckoning",
    tagline: "In a city that never sleeps, justice has no shadows.",
    description:
      "Em um futuro próximo, uma detetive implacável descobre uma conspiração que vai além dos limites da cidade. Uma história de traição, poder e redenção.",
    genre: ["Ação", "Ficção Científica"],
    rating: 8.4,
    duration: "2h 18min",
    classification: "16+",
    format: ["IMAX", "4K"],
    featured: true,
    poster: "https://picsum.photos/seed/neon/400/600",
    backdrop: "https://picsum.photos/seed/neon-bg/1400/600",
    sessions: [
      {
        id: 101,
        date: "2026-07-17",
        times: [
          { id: 1011, time: "14:30", format: "IMAX LASER", price: 42 },
          { id: 1012, time: "17:00", format: "STANDARD", price: 28 },
          { id: 1013, time: "20:00", format: "IMAX LASER", price: 42 },
          { id: 1014, time: "22:30", format: "STANDARD", price: 28 },
        ],
      },
      {
        id: 102,
        date: "2026-07-18",
        times: [
          { id: 1021, time: "15:00", format: "STANDARD", price: 28 },
          { id: 1022, time: "18:00", format: "IMAX LASER", price: 42 },
          { id: 1023, time: "21:00", format: "IMAX LASER", price: 42 },
        ],
      },
      {
        id: 103,
        date: "2026-07-19",
        times: [
          { id: 1031, time: "13:00", format: "STANDARD", price: 28 },
          { id: 1032, time: "16:30", format: "IMAX LASER", price: 42 },
          { id: 1033, time: "19:30", format: "STANDARD", price: 28 },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Aurora Red",
    tagline: "In the darkness, we are alone.",
    description:
      "No futuro, a humanidade vive dentro de uma simulação digital. Um piloto solitário mergulha no núcleo do servidor para impedir o colapso total da realidade.",
    genre: ["Ficção Científica", "Ação", "Filosófico"],
    rating: 8.9,
    duration: "2h 45min",
    classification: "18+",
    format: ["IMAX", "4K"],
    featured: false,
    poster: "https://picsum.photos/seed/aurora/400/600",
    backdrop: "https://picsum.photos/seed/aurora-bg/1400/600",
    sessions: [
      {
        id: 201,
        date: "2026-07-17",
        times: [
          { id: 2011, time: "13:00", format: "STANDARD", price: 28 },
          { id: 2012, time: "16:00", format: "IMAX LASER", price: 42 },
          { id: 2013, time: "19:30", format: "IMAX LASER", price: 42 },
        ],
      },
      {
        id: 202,
        date: "2026-07-18",
        times: [
          { id: 2021, time: "14:00", format: "STANDARD", price: 28 },
          { id: 2022, time: "17:30", format: "IMAX LASER", price: 42 },
          { id: 2023, time: "21:00", format: "STANDARD", price: 28 },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Crown of Shadows",
    tagline: "O poder tem um preço.",
    description:
      "Uma rainha exilada retorna ao reino que lhe foi roubado. Mas para reconquistar o trono, ela precisará fazer alianças com seus maiores inimigos.",
    genre: ["Fantasia", "Drama"],
    rating: 7.8,
    duration: "2h 05min",
    classification: "14+",
    format: ["STANDARD"],
    featured: false,
    poster: "https://picsum.photos/seed/crown/400/600",
    backdrop: "https://picsum.photos/seed/crown-bg/1400/600",
    sessions: [
      {
        id: 301,
        date: "2026-07-17",
        times: [
          { id: 3011, time: "15:30", format: "STANDARD", price: 28 },
          { id: 3012, time: "18:30", format: "STANDARD", price: 28 },
          { id: 3013, time: "21:30", format: "STANDARD", price: 28 },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Binary Protocol",
    tagline: "Dois agentes. Uma missão. Nenhuma saída.",
    description:
      "Dois agentes rivais são forçados a cooperar para desmantelar uma rede de espionagem que ameaça os dois lados da guerra fria digital.",
    genre: ["Thriller", "Ação"],
    rating: 7.5,
    duration: "1h 58min",
    classification: "14+",
    format: ["STANDARD", "4K"],
    featured: false,
    poster: "https://picsum.photos/seed/binary/400/600",
    backdrop: "https://picsum.photos/seed/binary-bg/1400/600",
    sessions: [
      {
        id: 401,
        date: "2026-07-17",
        times: [
          { id: 4011, time: "14:00", format: "4K", price: 35 },
          { id: 4012, time: "17:00", format: "STANDARD", price: 28 },
          { id: 4013, time: "20:30", format: "4K", price: 35 },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "The Last Serenade",
    tagline: "Algumas histórias só existem para ser esquecidas.",
    description:
      "Um músico em declínio encontra uma jovem produtora que acredita no seu talento. Uma história sobre arte, perda e a coragem de recomeçar.",
    genre: ["Drama", "Romance"],
    rating: 8.1,
    duration: "1h 52min",
    classification: "12+",
    format: ["STANDARD"],
    featured: false,
    poster: "https://picsum.photos/seed/serenade/400/600",
    backdrop: "https://picsum.photos/seed/serenade-bg/1400/600",
    sessions: [
      {
        id: 501,
        date: "2026-07-17",
        times: [
          { id: 5011, time: "16:00", format: "STANDARD", price: 28 },
          { id: 5012, time: "19:00", format: "STANDARD", price: 28 },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Blackwood Manor",
    tagline: "Algumas portas não devem ser abertas.",
    description:
      "Uma família se muda para uma mansão histórica e começa a descobrir segredos sombrios enterrados nas paredes. O terror mora onde menos se espera.",
    genre: ["Terror", "Suspense"],
    rating: 7.3,
    duration: "1h 45min",
    classification: "18+",
    format: ["STANDARD"],
    featured: false,
    poster: "https://picsum.photos/seed/blackwood/400/600",
    backdrop: "https://picsum.photos/seed/blackwood-bg/1400/600",
    sessions: [
      {
        id: 601,
        date: "2026-07-17",
        times: [
          { id: 6011, time: "21:00", format: "STANDARD", price: 28 },
          { id: 6012, time: "23:30", format: "STANDARD", price: 28 },
        ],
      },
    ],
  },
];

export const genres: string[] = [
  "Todos",
  "Ação",
  "Drama",
  "Ficção Científica",
  "Terror",
  "Fantasia",
  "Thriller",
  "Romance",
];

export const getFeaturedMovie = (): Movie | undefined =>
  movies.find((movie) => movie.featured);

export const getMovieById = (id: string): Movie | undefined =>
  movies.find((movie) => movie.id === Number(id));
