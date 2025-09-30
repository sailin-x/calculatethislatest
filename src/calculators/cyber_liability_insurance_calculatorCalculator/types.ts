export interface cyber_liability_insurance_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cyber_liability_insurance_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cyber_liability_insurance_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cyber_liability_insurance_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
