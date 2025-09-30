export interface alphaCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface alphaCalculatorResults {
  result: number;
  analysis?: string;
}

export interface alphaCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface alphaCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
