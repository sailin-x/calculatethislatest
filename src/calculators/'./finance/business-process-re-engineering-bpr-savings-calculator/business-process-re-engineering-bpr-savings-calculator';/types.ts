export interface './finance/business-process-re-engineering-bpr-savings-calculator/business-process-re-engineering-bpr-savings-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/business-process-re-engineering-bpr-savings-calculator/business-process-re-engineering-bpr-savings-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/business-process-re-engineering-bpr-savings-calculator/business-process-re-engineering-bpr-savings-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/business-process-re-engineering-bpr-savings-calculator/business-process-re-engineering-bpr-savings-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
