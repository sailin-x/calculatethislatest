export interface './finance/mezzanine-financing/mezzanine_financing';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mezzanine-financing/mezzanine_financing';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mezzanine-financing/mezzanine_financing';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mezzanine-financing/mezzanine_financing';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
