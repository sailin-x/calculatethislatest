export interface buy_sell_agreement_insurance_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface buy_sell_agreement_insurance_calculatorResults {
  result: number;
  analysis?: string;
}

export interface buy_sell_agreement_insurance_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface buy_sell_agreement_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
