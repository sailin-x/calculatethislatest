export interface './finance/mezzanine-financing-real-estate/mezzanine_financing_real_estate';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mezzanine-financing-real-estate/mezzanine_financing_real_estate';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mezzanine-financing-real-estate/mezzanine_financing_real_estate';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mezzanine-financing-real-estate/mezzanine_financing_real_estate';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
