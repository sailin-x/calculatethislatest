export interface motorcycle_accident_compensation_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface motorcycle_accident_compensation_calculatorResults {
  result: number;
  analysis?: string;
}

export interface motorcycle_accident_compensation_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface motorcycle_accident_compensation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
