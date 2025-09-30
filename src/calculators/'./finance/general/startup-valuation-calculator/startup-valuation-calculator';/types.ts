export interface './finance/general/startup-valuation-calculator/startup-valuation-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/startup-valuation-calculator/startup-valuation-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/startup-valuation-calculator/startup-valuation-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/startup-valuation-calculator/startup-valuation-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
