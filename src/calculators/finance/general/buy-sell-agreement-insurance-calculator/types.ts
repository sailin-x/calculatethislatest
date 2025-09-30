export interface buy_sell_agreement_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface buy_sell_agreement_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface buy_sell_agreement_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface buy_sell_agreement_insurance_calculatorOutputs {
  result: number;
  analysis: buy_sell_agreement_insurance_calculatorAnalysis;
}
