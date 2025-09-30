export interface './business/celebrity-endorsement-deal-valuation/celebrity_endorsement_deal_valuation';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/celebrity-endorsement-deal-valuation/celebrity_endorsement_deal_valuation';Results {
  result: number;
  analysis?: string;
}

export interface './business/celebrity-endorsement-deal-valuation/celebrity_endorsement_deal_valuation';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/celebrity-endorsement-deal-valuation/celebrity_endorsement_deal_valuation';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
