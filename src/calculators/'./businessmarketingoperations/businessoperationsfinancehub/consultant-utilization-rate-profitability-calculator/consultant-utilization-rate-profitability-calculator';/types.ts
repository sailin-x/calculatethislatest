export interface './businessmarketingoperations/businessoperationsfinancehub/consultant-utilization-rate-profitability-calculator/consultant-utilization-rate-profitability-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/businessoperationsfinancehub/consultant-utilization-rate-profitability-calculator/consultant-utilization-rate-profitability-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/businessoperationsfinancehub/consultant-utilization-rate-profitability-calculator/consultant-utilization-rate-profitability-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/businessoperationsfinancehub/consultant-utilization-rate-profitability-calculator/consultant-utilization-rate-profitability-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
