export interface './finance/retirement-savings/tax-loss-harvesting-calculator/TaxLossHarvestingCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/retirement-savings/tax-loss-harvesting-calculator/TaxLossHarvestingCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/retirement-savings/tax-loss-harvesting-calculator/TaxLossHarvestingCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/retirement-savings/tax-loss-harvesting-calculator/TaxLossHarvestingCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
