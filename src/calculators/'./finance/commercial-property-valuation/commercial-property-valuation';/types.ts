export interface './finance/commercial-property-valuation/commercial-property-valuation';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/commercial-property-valuation/commercial-property-valuation';Results {
  result: number;
  analysis?: string;
}

export interface './finance/commercial-property-valuation/commercial-property-valuation';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/commercial-property-valuation/commercial-property-valuation';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
