export interface './finance/general/dash-diet-calculator/dash-diet-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/dash-diet-calculator/dash-diet-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/dash-diet-calculator/dash-diet-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/dash-diet-calculator/dash-diet-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
