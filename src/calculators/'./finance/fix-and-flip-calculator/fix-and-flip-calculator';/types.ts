export interface './finance/fix-and-flip-calculator/fix-and-flip-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/fix-and-flip-calculator/fix-and-flip-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/fix-and-flip-calculator/fix-and-flip-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/fix-and-flip-calculator/fix-and-flip-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
