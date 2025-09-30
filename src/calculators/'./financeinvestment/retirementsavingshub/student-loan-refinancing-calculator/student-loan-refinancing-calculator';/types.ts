export interface './financeinvestment/retirementsavingshub/student-loan-refinancing-calculator/student-loan-refinancing-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/retirementsavingshub/student-loan-refinancing-calculator/student-loan-refinancing-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/retirementsavingshub/student-loan-refinancing-calculator/student-loan-refinancing-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/retirementsavingshub/student-loan-refinancing-calculator/student-loan-refinancing-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
