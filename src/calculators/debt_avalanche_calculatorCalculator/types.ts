export interface debt_avalanche_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface debt_avalanche_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface debt_avalanche_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface debt_avalanche_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
