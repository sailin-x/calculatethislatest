export interface GiftTaxCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface GiftTaxCalculatorResults {
  result: number;
  analysis?: string;
}

export interface GiftTaxCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface GiftTaxCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
