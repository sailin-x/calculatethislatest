export interface blood_alcohol_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface blood_alcohol_calculatorResults {
  result: number;
  analysis?: string;
}

export interface blood_alcohol_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface blood_alcohol_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
