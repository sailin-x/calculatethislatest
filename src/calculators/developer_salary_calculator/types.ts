export interface developer_salary_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface developer_salary_calculatorResults {
  result: number;
  analysis?: string;
}

export interface developer_salary_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface developer_salary_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
