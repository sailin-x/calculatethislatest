export interface term_life_insuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface term_life_insuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface term_life_insuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface term_life_insuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
