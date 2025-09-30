export interface './finance/accretion-dilution/accretion-dilution';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/accretion-dilution/accretion-dilution';Results {
  result: number;
  analysis?: string;
}

export interface './finance/accretion-dilution/accretion-dilution';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/accretion-dilution/accretion-dilution';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
