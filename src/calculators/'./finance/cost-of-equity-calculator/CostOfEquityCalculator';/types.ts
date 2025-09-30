export interface './finance/cost-of-equity-calculator/CostOfEquityCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/cost-of-equity-calculator/CostOfEquityCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/cost-of-equity-calculator/CostOfEquityCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/cost-of-equity-calculator/CostOfEquityCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
