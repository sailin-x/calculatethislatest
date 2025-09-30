export interface './legal/jones-act-settlement-calculator/jones-act-settlement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/jones-act-settlement-calculator/jones-act-settlement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/jones-act-settlement-calculator/jones-act-settlement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/jones-act-settlement-calculator/jones-act-settlement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
