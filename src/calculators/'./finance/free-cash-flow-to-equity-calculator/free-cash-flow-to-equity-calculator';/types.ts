export interface './finance/free-cash-flow-to-equity-calculator/free-cash-flow-to-equity-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/free-cash-flow-to-equity-calculator/free-cash-flow-to-equity-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/free-cash-flow-to-equity-calculator/free-cash-flow-to-equity-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/free-cash-flow-to-equity-calculator/free-cash-flow-to-equity-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
