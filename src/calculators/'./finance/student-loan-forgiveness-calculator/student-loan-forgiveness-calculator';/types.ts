export interface './finance/student-loan-forgiveness-calculator/student-loan-forgiveness-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/student-loan-forgiveness-calculator/student-loan-forgiveness-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/student-loan-forgiveness-calculator/student-loan-forgiveness-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/student-loan-forgiveness-calculator/student-loan-forgiveness-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
