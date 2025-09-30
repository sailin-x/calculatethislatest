export interface './finance/general/film-distribution-waterfall-calculator/film-distribution-waterfall-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/film-distribution-waterfall-calculator/film-distribution-waterfall-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/film-distribution-waterfall-calculator/film-distribution-waterfall-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/film-distribution-waterfall-calculator/film-distribution-waterfall-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
