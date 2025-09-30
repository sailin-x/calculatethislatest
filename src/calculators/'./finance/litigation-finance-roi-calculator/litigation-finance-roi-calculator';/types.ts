export interface './finance/litigation-finance-roi-calculator/litigation-finance-roi-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/litigation-finance-roi-calculator/litigation-finance-roi-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/litigation-finance-roi-calculator/litigation-finance-roi-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/litigation-finance-roi-calculator/litigation-finance-roi-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
