export interface './finance/flood-insurance/flood-insurance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/flood-insurance/flood-insurance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/flood-insurance/flood-insurance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/flood-insurance/flood-insurance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
