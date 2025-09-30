export interface './business/government-contract-bid-calculator/government_contract_bid_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/government-contract-bid-calculator/government_contract_bid_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/government-contract-bid-calculator/government_contract_bid_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/government-contract-bid-calculator/government_contract_bid_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
