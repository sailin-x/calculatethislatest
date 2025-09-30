export interface './finance/general/ammonia-calculator/ammonia-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/ammonia-calculator/ammonia-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/ammonia-calculator/ammonia-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/ammonia-calculator/ammonia-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
