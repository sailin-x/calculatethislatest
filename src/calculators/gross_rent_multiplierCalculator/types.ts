export interface gross_rent_multiplierCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface gross_rent_multiplierCalculatorResults {
  result: number;
  analysis?: string;
}

export interface gross_rent_multiplierCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface gross_rent_multiplierCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
