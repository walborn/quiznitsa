export type QuestionType = "single" | "multiple";

export interface Option {
  text: string;
  correct: boolean;
}

export interface Question {
  image: string;
  prompt: string;
  type: QuestionType;
  options: Option[];
}

export const questions: Question[] = [
  {
    image: "/berlin.jpeg",
    prompt: "What is the capital of Germany?",
    type: "single",
    options: [
      { text: "London", correct: false },
      { text: "Berlin", correct: true },
      { text: "Paris", correct: false },
    ],
  },
  {
    image: "/sun.jpg",
    prompt: "What colors can the Sun appear as?",
    type: "multiple",
    options: [
      { text: "Red", correct: true },
      { text: "Yellow", correct: true },
      { text: "Green", correct: false },
    ],
  },
];
