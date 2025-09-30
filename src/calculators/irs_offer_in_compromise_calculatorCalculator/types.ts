export interface irs_offer_in_compromise_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface irs_offer_in_compromise_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface irs_offer_in_compromise_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface irs_offer_in_compromise_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
