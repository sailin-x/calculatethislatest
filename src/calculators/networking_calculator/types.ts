export interface networking_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface networking_calculatorResults {
  result: number;
  analysis?: string;
}

export interface networking_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface networking_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
