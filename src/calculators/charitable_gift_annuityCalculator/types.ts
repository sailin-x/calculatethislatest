export interface charitable_gift_annuityCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface charitable_gift_annuityCalculatorResults {
  result: number;
  analysis?: string;
}

export interface charitable_gift_annuityCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface charitable_gift_annuityCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
