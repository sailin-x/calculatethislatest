export interface scientificCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface scientificCalculatorResults {
  result: number;
  analysis?: string;
}

export interface scientificCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface scientificCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
