export interface dental_malpractice_settlement_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface dental_malpractice_settlement_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface dental_malpractice_settlement_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface dental_malpractice_settlement_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
