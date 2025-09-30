export interface registerAnnuityBuyoutCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerAnnuityBuyoutCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerAnnuityBuyoutCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerAnnuityBuyoutCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
