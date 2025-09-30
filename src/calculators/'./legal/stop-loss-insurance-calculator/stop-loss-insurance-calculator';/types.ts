export interface './legal/stop-loss-insurance-calculator/stop-loss-insurance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/stop-loss-insurance-calculator/stop-loss-insurance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/stop-loss-insurance-calculator/stop-loss-insurance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/stop-loss-insurance-calculator/stop-loss-insurance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
