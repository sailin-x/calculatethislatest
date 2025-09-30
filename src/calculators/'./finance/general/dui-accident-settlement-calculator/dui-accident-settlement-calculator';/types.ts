export interface './finance/general/dui-accident-settlement-calculator/dui-accident-settlement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/dui-accident-settlement-calculator/dui-accident-settlement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/dui-accident-settlement-calculator/dui-accident-settlement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/dui-accident-settlement-calculator/dui-accident-settlement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
