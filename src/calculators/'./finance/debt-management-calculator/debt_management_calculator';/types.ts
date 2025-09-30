export interface './finance/debt-management-calculator/debt_management_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/debt-management-calculator/debt_management_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/debt-management-calculator/debt_management_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/debt-management-calculator/debt_management_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
