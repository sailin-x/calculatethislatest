export interface registerHSATripleTaxAdvantageCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerHSATripleTaxAdvantageCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerHSATripleTaxAdvantageCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerHSATripleTaxAdvantageCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
