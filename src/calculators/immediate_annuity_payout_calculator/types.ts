export interface immediate_annuity_payout_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface immediate_annuity_payout_calculatorResults {
  result: number;
  analysis?: string;
}

export interface immediate_annuity_payout_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface immediate_annuity_payout_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
