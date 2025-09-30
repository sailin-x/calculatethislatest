export interface './finance/mezzanine-financing/mezzanine-financing';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mezzanine-financing/mezzanine-financing';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mezzanine-financing/mezzanine-financing';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mezzanine-financing/mezzanine-financing';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
