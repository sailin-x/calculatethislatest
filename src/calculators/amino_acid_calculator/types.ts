export interface amino_acid_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface amino_acid_calculatorResults {
  result: number;
  analysis?: string;
}

export interface amino_acid_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface amino_acid_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
