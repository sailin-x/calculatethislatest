export interface './finance/debt-management-calculator/debt-management-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/debt-management-calculator/debt-management-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/debt-management-calculator/debt-management-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/debt-management-calculator/debt-management-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
