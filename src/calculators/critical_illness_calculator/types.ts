export interface critical_illness_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface critical_illness_calculatorResults {
  result: number;
  analysis?: string;
}

export interface critical_illness_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface critical_illness_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
