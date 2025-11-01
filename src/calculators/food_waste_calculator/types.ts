export interface food_waste_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface food_waste_calculatorResults {
  result: number;
  analysis?: string;
}

export interface food_waste_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface food_waste_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
