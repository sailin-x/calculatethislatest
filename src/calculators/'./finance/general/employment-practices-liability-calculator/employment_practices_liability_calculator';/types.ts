export interface './finance/general/employment-practices-liability-calculator/employment_practices_liability_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/employment-practices-liability-calculator/employment_practices_liability_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/employment-practices-liability-calculator/employment_practices_liability_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/employment-practices-liability-calculator/employment_practices_liability_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
