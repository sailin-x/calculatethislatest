export interface marine_cargo_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface marine_cargo_calculatorResults {
  result: number;
  analysis?: string;
}

export interface marine_cargo_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface marine_cargo_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
