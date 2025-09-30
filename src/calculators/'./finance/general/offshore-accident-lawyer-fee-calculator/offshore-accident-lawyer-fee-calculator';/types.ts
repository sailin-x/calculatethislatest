export interface './finance/general/offshore-accident-lawyer-fee-calculator/offshore-accident-lawyer-fee-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/offshore-accident-lawyer-fee-calculator/offshore-accident-lawyer-fee-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/offshore-accident-lawyer-fee-calculator/offshore-accident-lawyer-fee-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/offshore-accident-lawyer-fee-calculator/offshore-accident-lawyer-fee-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
