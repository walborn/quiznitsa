export type QuestionType = "single" | "multiple";

export interface Option {
  text: string;
  correct: boolean;
}

export interface Question {
  /** Path under /public, relative (no leading slash) — prefixed with BASE_URL. */
  video: string;
  /** Optional reveal video shown after checking; relative path like `video`. */
  answerVideo?: string;
  muteAnswerVideo?: boolean;
  prompt: string;
  type: QuestionType;
  options: Option[];
}

export const questions: Question[] = [
  {
    video: "videos/flying-machines.mp4",
    answerVideo: "videos/answers/flying-machines.mp4",
    prompt: "Летательные аппараты Бабы Яги?",
    type: "multiple",
    options: [
      { text: "Ковёр-самолёт", correct: false },
      { text: "Ступа", correct: true },
      { text: "Голубой вертолёт", correct: false },
      { text: "Летучий корабль", correct: false },
      { text: "Метла", correct: true },
    ],
  },
  {
    video: "videos/potion-spell.mp4",
    answerVideo: "videos/answers/potion-spell.mp4",
    prompt: "Самое эффективное заклинание для молодильного зелья?",
    type: "single",
    options: [
      { text: "Expecto patronum", correct: false },
      { text: "По щучьему велению, по моему хотению", correct: false },
      { text: "Мутабор!", correct: false },
      { text: "Зелье, варись — бабка, молодись!", correct: true },
      { text: "Раз-два-три, ёдочка гори!", correct: false },
    ],
  },
  {
    video: "videos/residence.mp4",
    answerVideo: "videos/answers/residence.mp4",
    prompt: "Место жительства Бабы Яги?",
    type: "single",
    options: [
      { text: "Горное шале", correct: false },
      { text: "Бунгало на берегу океана", correct: false },
      { text: "Телефонная будка", correct: false },
      { text: "Замок Хогвартс", correct: false },
      { text: "Избушка на курьих ножках", correct: true },
    ],
  },
  {
    video: "videos/pets.mp4",
    answerVideo: "videos/answers/pets.mp4",
    prompt: "Какие любимые домашние животные Бабы Яги (несколько вариантов)?",
    type: "multiple",
    options: [
      { text: "Дракон Беззубик", correct: false },
      { text: "Золотая рыбка", correct: false },
      { text: "Гуси-лебеди", correct: true },
      { text: "Чёрный кот", correct: true },
      { text: "Чёрный ворон", correct: true },
    ],
  },
  {
    video: "videos/footwear.mp4",
    answerVideo: "videos/answers/footwear.mp4",
    prompt: "Обувь Бабы Яги?",
    muteAnswerVideo: true,
    type: "single",
    options: [
      { text: "Пуанты", correct: false },
      { text: "Сапоги-скороходы", correct: false },
      { text: "Хрустальная туфелька", correct: false },
      { text: "Ласты", correct: false },
      { text: "Лапти", correct: true },
    ],
  },
  {
    video: "videos/delicacy.mp4",
    answerVideo: "videos/answers/delicacy.mp4",
    prompt: "Любимое лакомство Бабы Яги?",
    type: "single",
    options: [
      { text: "Груффало с орешками внутри", correct: false },
      { text: "Колобок", correct: false },
      { text: "Каша из топора", correct: false },
      { text: "Пицца Маргарита", correct: false },
      { text: "Непослушные детишки, запечённые в печи", correct: true },
    ],
  },
  {
    video: "videos/frogs-geese.mp4",
    answerVideo: "videos/answers/frogs-geese.mp4",
    prompt: "Сколько лягушек-путешествениц принесут 12 гусей-лебедей?",
    type: "single",
    options: [
      { text: "6", correct: true },
      { text: "12", correct: false },
      { text: "24", correct: false },
    ],
  },
];
