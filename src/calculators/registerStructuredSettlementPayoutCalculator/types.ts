export interface registerStructuredSettlementPayoutCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerStructuredSettlementPayoutCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerStructuredSettlementPayoutCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerStructuredSettlementPayoutCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
