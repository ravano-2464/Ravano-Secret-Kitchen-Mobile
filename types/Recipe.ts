export interface Recipe {
  id: string;
  title: string;
  category: string;
  difficulty: "Mudah" | "Sedang" | "Sulit";
  time: string;
  servings: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  videoUrl?: string;
  tips?: string[];
}
