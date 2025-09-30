export interface './finance/private-equity-returns-calculator/private-equity-returns-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/private-equity-returns-calculator/private-equity-returns-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/private-equity-returns-calculator/private-equity-returns-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/private-equity-returns-calculator/private-equity-returns-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
