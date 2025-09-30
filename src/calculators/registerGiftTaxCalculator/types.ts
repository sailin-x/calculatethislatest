export interface registerGiftTaxCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerGiftTaxCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerGiftTaxCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerGiftTaxCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
