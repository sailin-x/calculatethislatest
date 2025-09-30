export interface registerImmediateAnnuityPayoutCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerImmediateAnnuityPayoutCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerImmediateAnnuityPayoutCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerImmediateAnnuityPayoutCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
