export interface catastrophic_injury_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface catastrophic_injury_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface catastrophic_injury_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface catastrophic_injury_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
