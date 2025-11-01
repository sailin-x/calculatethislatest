export interface government_contract_bid_no_bid_decision_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface government_contract_bid_no_bid_decision_calculatorResults {
  result: number;
  analysis?: string;
}

export interface government_contract_bid_no_bid_decision_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface government_contract_bid_no_bid_decision_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
