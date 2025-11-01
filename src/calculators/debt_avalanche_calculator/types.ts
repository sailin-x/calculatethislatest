export interface debt_avalanche_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface debt_avalanche_calculatorResults {
  result: number;
  analysis?: string;
}

export interface debt_avalanche_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface debt_avalanche_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
