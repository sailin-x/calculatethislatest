export interface lifeSettlementValueCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface lifeSettlementValueCalculatorResults {
  result: number;
  analysis?: string;
}

export interface lifeSettlementValueCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface lifeSettlementValueCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
