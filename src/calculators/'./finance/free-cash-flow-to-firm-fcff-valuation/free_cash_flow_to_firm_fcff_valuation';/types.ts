export interface './finance/free-cash-flow-to-firm-fcff-valuation/free_cash_flow_to_firm_fcff_valuation';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/free-cash-flow-to-firm-fcff-valuation/free_cash_flow_to_firm_fcff_valuation';Results {
  result: number;
  analysis?: string;
}

export interface './finance/free-cash-flow-to-firm-fcff-valuation/free_cash_flow_to_firm_fcff_valuation';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/free-cash-flow-to-firm-fcff-valuation/free_cash_flow_to_firm_fcff_valuation';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
