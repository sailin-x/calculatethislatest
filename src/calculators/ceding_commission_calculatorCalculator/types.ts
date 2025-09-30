export interface ceding_commission_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ceding_commission_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface ceding_commission_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ceding_commission_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
