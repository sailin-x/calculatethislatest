export interface './health/cheat-meal-calculator/cheat_meal_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/cheat-meal-calculator/cheat_meal_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/cheat-meal-calculator/cheat_meal_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/cheat-meal-calculator/cheat_meal_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
