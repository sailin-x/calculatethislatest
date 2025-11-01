export interface dissolved_oxygen_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface dissolved_oxygen_calculatorResults {
  result: number;
  analysis?: string;
}

export interface dissolved_oxygen_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface dissolved_oxygen_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
