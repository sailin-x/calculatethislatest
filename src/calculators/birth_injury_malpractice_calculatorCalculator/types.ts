export interface birth_injury_malpractice_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface birth_injury_malpractice_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface birth_injury_malpractice_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface birth_injury_malpractice_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
