export interface reit_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface reit_calculatorResults {
  result: number;
  analysis?: string;
}

export interface reit_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface reit_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
