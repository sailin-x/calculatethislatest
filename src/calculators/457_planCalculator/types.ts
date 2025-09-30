export interface 457_planCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface 457_planCalculatorResults {
  result: number;
  analysis?: string;
}

export interface 457_planCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface 457_planCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
