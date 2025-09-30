export interface './finance/general/payroll-calculator/payroll-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/payroll-calculator/payroll-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/payroll-calculator/payroll-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/payroll-calculator/payroll-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
