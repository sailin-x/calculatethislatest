export interface bad_faith_insurance_claim_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface bad_faith_insurance_claim_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface bad_faith_insurance_claim_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface bad_faith_insurance_claim_calculatorOutputs {
  result: number;
  analysis: bad_faith_insurance_claim_calculatorAnalysis;
}
