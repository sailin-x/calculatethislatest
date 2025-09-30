export interface earthquake_insuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface earthquake_insuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface earthquake_insuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface earthquake_insuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
