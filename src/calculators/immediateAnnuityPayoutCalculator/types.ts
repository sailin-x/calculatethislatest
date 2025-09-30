export interface immediateAnnuityPayoutCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface immediateAnnuityPayoutCalculatorResults {
  result: number;
  analysis?: string;
}

export interface immediateAnnuityPayoutCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface immediateAnnuityPayoutCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
