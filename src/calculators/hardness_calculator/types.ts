export interface hardness_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hardness_calculatorResults {
  result: number;
  analysis?: string;
}

export interface hardness_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hardness_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
