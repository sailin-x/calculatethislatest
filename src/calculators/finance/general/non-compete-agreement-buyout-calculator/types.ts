export interface non_compete_agreement_buyout_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface non_compete_agreement_buyout_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface non_compete_agreement_buyout_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface non_compete_agreement_buyout_calculatorOutputs {
  result: number;
  analysis: non_compete_agreement_buyout_calculatorAnalysis;
}
