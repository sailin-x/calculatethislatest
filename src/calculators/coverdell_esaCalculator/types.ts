export interface coverdell_esaCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface coverdell_esaCalculatorResults {
  result: number;
  analysis?: string;
}

export interface coverdell_esaCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface coverdell_esaCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
