export interface './insurance/stop-loss-insurance-premium-calculator/stop_loss_insurance_premium_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/stop-loss-insurance-premium-calculator/stop_loss_insurance_premium_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/stop-loss-insurance-premium-calculator/stop_loss_insurance_premium_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/stop-loss-insurance-premium-calculator/stop_loss_insurance_premium_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
