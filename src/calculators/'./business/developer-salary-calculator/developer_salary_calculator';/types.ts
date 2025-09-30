export interface './business/developer-salary-calculator/developer_salary_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/developer-salary-calculator/developer_salary_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/developer-salary-calculator/developer_salary_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/developer-salary-calculator/developer_salary_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
