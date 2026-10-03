export interface Furniture {
  id: number;
  name: string;
  image: string;
}


export interface Question {
  furniture: Furniture;
  options: string[];
}
