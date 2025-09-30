export interface government_contract_bid_no_bid_decision_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface government_contract_bid_no_bid_decision_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface government_contract_bid_no_bid_decision_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface government_contract_bid_no_bid_decision_calculatorOutputs {
  result: number;
  analysis: government_contract_bid_no_bid_decision_calculatorAnalysis;
}
