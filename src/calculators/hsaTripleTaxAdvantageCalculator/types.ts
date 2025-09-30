export interface hsaTripleTaxAdvantageCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hsaTripleTaxAdvantageCalculatorResults {
  result: number;
  analysis?: string;
}

export interface hsaTripleTaxAdvantageCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hsaTripleTaxAdvantageCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
