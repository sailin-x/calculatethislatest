export interface amino_acid_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface amino_acid_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface amino_acid_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface amino_acid_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
