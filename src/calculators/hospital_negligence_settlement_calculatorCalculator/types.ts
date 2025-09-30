export interface hospital_negligence_settlement_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hospital_negligence_settlement_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface hospital_negligence_settlement_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hospital_negligence_settlement_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
