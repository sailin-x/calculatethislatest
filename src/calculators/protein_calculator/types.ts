export interface protein_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface protein_calculatorResults {
  result: number;
  analysis?: string;
}

export interface protein_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface protein_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
