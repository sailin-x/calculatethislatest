export interface helocCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface helocCalculatorResults {
  result: number;
  analysis?: string;
}

export interface helocCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface helocCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
