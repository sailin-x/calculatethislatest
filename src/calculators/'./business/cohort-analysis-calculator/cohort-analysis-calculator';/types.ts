export interface './business/cohort-analysis-calculator/cohort-analysis-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/cohort-analysis-calculator/cohort-analysis-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/cohort-analysis-calculator/cohort-analysis-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/cohort-analysis-calculator/cohort-analysis-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
