export interface './legal/contract-breach-calculator/contract_breach_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/contract-breach-calculator/contract_breach_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/contract-breach-calculator/contract_breach_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/contract-breach-calculator/contract_breach_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
