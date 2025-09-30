export interface './finance/opportunity-zone-investment/opportunity-zone-investment';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/opportunity-zone-investment/opportunity-zone-investment';Results {
  result: number;
  analysis?: string;
}

export interface './finance/opportunity-zone-investment/opportunity-zone-investment';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/opportunity-zone-investment/opportunity-zone-investment';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
