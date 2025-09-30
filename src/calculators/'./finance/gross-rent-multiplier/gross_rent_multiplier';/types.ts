export interface './finance/gross-rent-multiplier/gross_rent_multiplier';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/gross-rent-multiplier/gross_rent_multiplier';Results {
  result: number;
  analysis?: string;
}

export interface './finance/gross-rent-multiplier/gross_rent_multiplier';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/gross-rent-multiplier/gross_rent_multiplier';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
