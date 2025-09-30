export interface refinanceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface refinanceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface refinanceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface refinanceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
