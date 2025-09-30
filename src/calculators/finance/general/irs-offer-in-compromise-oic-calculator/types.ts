export interface irs_offer_in_compromise_oic_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface irs_offer_in_compromise_oic_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface irs_offer_in_compromise_oic_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface irs_offer_in_compromise_oic_calculatorOutputs {
  result: number;
  analysis: irs_offer_in_compromise_oic_calculatorAnalysis;
}
