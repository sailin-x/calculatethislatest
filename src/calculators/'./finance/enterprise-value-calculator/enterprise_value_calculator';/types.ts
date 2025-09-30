export interface './finance/enterprise-value-calculator/enterprise_value_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/enterprise-value-calculator/enterprise_value_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/enterprise-value-calculator/enterprise_value_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/enterprise-value-calculator/enterprise_value_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
