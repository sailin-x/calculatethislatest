export interface developer_salaryCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface developer_salaryCalculatorResults {
  result: number;
  analysis?: string;
}

export interface developer_salaryCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface developer_salaryCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
