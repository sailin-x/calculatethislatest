export interface './finance/angel-investment-dilution/angel-investment-dilution';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/angel-investment-dilution/angel-investment-dilution';Results {
  result: number;
  analysis?: string;
}

export interface './finance/angel-investment-dilution/angel-investment-dilution';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/angel-investment-dilution/angel-investment-dilution';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
