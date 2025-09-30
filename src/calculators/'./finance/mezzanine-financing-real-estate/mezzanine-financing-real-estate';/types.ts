export interface './finance/mezzanine-financing-real-estate/mezzanine-financing-real-estate';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mezzanine-financing-real-estate/mezzanine-financing-real-estate';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mezzanine-financing-real-estate/mezzanine-financing-real-estate';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mezzanine-financing-real-estate/mezzanine-financing-real-estate';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
