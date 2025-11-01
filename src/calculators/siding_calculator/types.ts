export interface siding_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface siding_calculatorResults {
  result: number;
  analysis?: string;
}

export interface siding_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface siding_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
