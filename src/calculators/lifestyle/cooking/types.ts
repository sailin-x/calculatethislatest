export interface CookingCalculatorInputs {
  recipeType: 'baking' | 'cooking' | 'grilling' | 'frying' | 'steaming' | 'boiling';
  originalServings: number;
  desiredServings: number;
  ingredients: Array<{
    name: string;
    amount: number;
    unit: string;
  }>;
  cookingTime: number;
  temperature: number;
  temperatureUnit: 'celsius' | 'fahrenheit';
  measurementSystem: 'metric' | 'imperial';
}

export interface CookingCalculatorMetrics {
  scaledIngredients: Array<{
    name: string;
    originalAmount: number;
    scaledAmount: number;
    unit: string;
  }>;
  adjustedCookingTime: number;
  adjustedTemperature: number;
  scalingFactor: number;
  totalCost: number;
  costPerServing: number;
}

export interface CookingCalculatorAnalysis {
  scalingAccuracy: string;
  cookingAdjustments: string[];
  nutritionalNotes: string[];
  costEfficiency: string;
}

export interface CookingCalculatorOutputs {
  scaledIngredients: Array<{
    name: string;
    originalAmount: number;
    scaledAmount: number;
    unit: string;
  }>;
  adjustedCookingTime: number;
  analysis: CookingCalculatorAnalysis;
}
