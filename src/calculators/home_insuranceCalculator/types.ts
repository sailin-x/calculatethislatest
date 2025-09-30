export interface home_insuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface home_insuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface home_insuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface home_insuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
