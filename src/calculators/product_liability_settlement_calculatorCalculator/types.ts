export interface product_liability_settlement_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface product_liability_settlement_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface product_liability_settlement_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface product_liability_settlement_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
