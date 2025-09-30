export interface './finance/general/government-contract-bid-no-bid-decision-calculator/government_contract_bid_no_bid_decision_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/government-contract-bid-no-bid-decision-calculator/government_contract_bid_no_bid_decision_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/government-contract-bid-no-bid-decision-calculator/government_contract_bid_no_bid_decision_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/government-contract-bid-no-bid-decision-calculator/government_contract_bid_no_bid_decision_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
