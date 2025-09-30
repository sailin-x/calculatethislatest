export interface tender_offer_valuation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface tender_offer_valuation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface tender_offer_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface tender_offer_valuation_calculatorOutputs {
  result: number;
  analysis: tender_offer_valuation_calculatorAnalysis;
}
