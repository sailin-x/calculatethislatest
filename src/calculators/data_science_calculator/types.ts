export interface data_science_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface data_science_calculatorResults {
  result: number;
  analysis?: string;
}

export interface data_science_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface data_science_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
