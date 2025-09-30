export interface './businessmarketingoperations/businessoperationsfinancehub/cost-of-poor-quality-copq-calculator/cost_of_poor_quality_copq_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/businessoperationsfinancehub/cost-of-poor-quality-copq-calculator/cost_of_poor_quality_copq_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/businessoperationsfinancehub/cost-of-poor-quality-copq-calculator/cost_of_poor_quality_copq_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/businessoperationsfinancehub/cost-of-poor-quality-copq-calculator/cost_of_poor_quality_copq_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
