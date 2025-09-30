export interface './finance/ebitda-calculator/EbitdaCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/ebitda-calculator/EbitdaCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/ebitda-calculator/EbitdaCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/ebitda-calculator/EbitdaCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
