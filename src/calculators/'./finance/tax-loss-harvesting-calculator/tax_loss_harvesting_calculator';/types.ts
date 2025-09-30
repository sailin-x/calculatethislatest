export interface './finance/tax-loss-harvesting-calculator/tax_loss_harvesting_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/tax-loss-harvesting-calculator/tax_loss_harvesting_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/tax-loss-harvesting-calculator/tax_loss_harvesting_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/tax-loss-harvesting-calculator/tax_loss_harvesting_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
