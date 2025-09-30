export interface './finance/general/antitrust-hhi-index-calculator/antitrust-hhi-index-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/antitrust-hhi-index-calculator/antitrust-hhi-index-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/antitrust-hhi-index-calculator/antitrust-hhi-index-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/antitrust-hhi-index-calculator/antitrust-hhi-index-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
