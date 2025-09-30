export interface './finance/general/asbestos-settlement-calculator/asbestos-settlement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/asbestos-settlement-calculator/asbestos-settlement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/asbestos-settlement-calculator/asbestos-settlement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/asbestos-settlement-calculator/asbestos-settlement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
