export interface './finance/conservation-easement-tax-benefit/conservation_easement_tax_benefit';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/conservation-easement-tax-benefit/conservation_easement_tax_benefit';Results {
  result: number;
  analysis?: string;
}

export interface './finance/conservation-easement-tax-benefit/conservation_easement_tax_benefit';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/conservation-easement-tax-benefit/conservation_easement_tax_benefit';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
