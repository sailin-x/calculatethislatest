export interface './finance/credit-utilization-calculator/credit-utilization-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/credit-utilization-calculator/credit-utilization-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/credit-utilization-calculator/credit-utilization-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/credit-utilization-calculator/credit-utilization-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
