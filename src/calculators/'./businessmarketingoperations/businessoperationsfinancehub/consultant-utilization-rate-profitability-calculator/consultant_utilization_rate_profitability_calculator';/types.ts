export interface './businessmarketingoperations/businessoperationsfinancehub/consultant-utilization-rate-profitability-calculator/consultant_utilization_rate_profitability_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/businessoperationsfinancehub/consultant-utilization-rate-profitability-calculator/consultant_utilization_rate_profitability_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/businessoperationsfinancehub/consultant-utilization-rate-profitability-calculator/consultant_utilization_rate_profitability_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/businessoperationsfinancehub/consultant-utilization-rate-profitability-calculator/consultant_utilization_rate_profitability_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
