export interface Recipe {
  id: number;
  title: string;
  image: string;
}

export interface RecipeSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface MeasureUnit {
  amount: number;
  unitLong: string;
}

export interface Measures {
  us: MeasureUnit;
  metric: MeasureUnit;
}

export interface ExtendedIngredient {
  original: string;
  image: string;
  measures: Measures;
}

export interface InstructionStep {
  number: number;
  step: string;
}

export interface AnalyzedInstruction {
  steps: InstructionStep[];
}

export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  extendedIngredients: ExtendedIngredient[];
  analyzedInstructions: AnalyzedInstruction[];
}
