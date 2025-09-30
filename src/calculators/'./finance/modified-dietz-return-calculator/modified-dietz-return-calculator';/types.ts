export interface './finance/modified-dietz-return-calculator/modified-dietz-return-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/modified-dietz-return-calculator/modified-dietz-return-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/modified-dietz-return-calculator/modified-dietz-return-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/modified-dietz-return-calculator/modified-dietz-return-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
