export interface './financeinvestment/investmentportfoliohub/free-cash-flow-to-firm-fcff-valuation/free-cash-flow-to-firm-fcff-valuation';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/free-cash-flow-to-firm-fcff-valuation/free-cash-flow-to-firm-fcff-valuation';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/free-cash-flow-to-firm-fcff-valuation/free-cash-flow-to-firm-fcff-valuation';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/free-cash-flow-to-firm-fcff-valuation/free-cash-flow-to-firm-fcff-valuation';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
