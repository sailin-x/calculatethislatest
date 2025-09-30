export interface StructuredSettlementPayoutCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface StructuredSettlementPayoutCalculatorResults {
  result: number;
  analysis?: string;
}

export interface StructuredSettlementPayoutCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface StructuredSettlementPayoutCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
