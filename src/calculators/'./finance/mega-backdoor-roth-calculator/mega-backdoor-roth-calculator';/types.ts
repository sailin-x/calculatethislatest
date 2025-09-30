export interface './finance/mega-backdoor-roth-calculator/mega-backdoor-roth-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mega-backdoor-roth-calculator/mega-backdoor-roth-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mega-backdoor-roth-calculator/mega-backdoor-roth-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mega-backdoor-roth-calculator/mega-backdoor-roth-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
