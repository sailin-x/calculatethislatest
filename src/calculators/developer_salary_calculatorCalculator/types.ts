export interface developer_salary_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface developer_salary_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface developer_salary_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface developer_salary_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
