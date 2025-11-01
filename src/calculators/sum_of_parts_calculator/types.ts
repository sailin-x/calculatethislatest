export interface sum_of_parts_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface sum_of_parts_calculatorResults {
  result: number;
  analysis?: string;
}

export interface sum_of_parts_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface sum_of_parts_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
