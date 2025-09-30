export interface './finance/general/premium-deficiency-reserve-pdr-calculator/premium-deficiency-reserve-pdr-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/premium-deficiency-reserve-pdr-calculator/premium-deficiency-reserve-pdr-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/premium-deficiency-reserve-pdr-calculator/premium-deficiency-reserve-pdr-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/premium-deficiency-reserve-pdr-calculator/premium-deficiency-reserve-pdr-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
