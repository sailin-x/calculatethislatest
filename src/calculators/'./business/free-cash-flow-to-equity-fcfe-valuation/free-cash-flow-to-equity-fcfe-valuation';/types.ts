export interface './business/free-cash-flow-to-equity-fcfe-valuation/free-cash-flow-to-equity-fcfe-valuation';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/free-cash-flow-to-equity-fcfe-valuation/free-cash-flow-to-equity-fcfe-valuation';Results {
  result: number;
  analysis?: string;
}

export interface './business/free-cash-flow-to-equity-fcfe-valuation/free-cash-flow-to-equity-fcfe-valuation';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/free-cash-flow-to-equity-fcfe-valuation/free-cash-flow-to-equity-fcfe-valuation';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
