export interface './finance/commercial-property-valuation/commercial_property_valuation';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/commercial-property-valuation/commercial_property_valuation';Results {
  result: number;
  analysis?: string;
}

export interface './finance/commercial-property-valuation/commercial_property_valuation';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/commercial-property-valuation/commercial_property_valuation';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
