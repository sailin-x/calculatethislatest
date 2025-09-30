export interface './business/employee-stock-option-plan-calculator/employee-stock-option-plan-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/employee-stock-option-plan-calculator/employee-stock-option-plan-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/employee-stock-option-plan-calculator/employee-stock-option-plan-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/employee-stock-option-plan-calculator/employee-stock-option-plan-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
