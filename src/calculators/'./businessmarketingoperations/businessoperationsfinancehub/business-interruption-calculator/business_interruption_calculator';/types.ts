export interface './businessmarketingoperations/businessoperationsfinancehub/business-interruption-calculator/business_interruption_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/businessoperationsfinancehub/business-interruption-calculator/business_interruption_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/businessoperationsfinancehub/business-interruption-calculator/business_interruption_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/businessoperationsfinancehub/business-interruption-calculator/business_interruption_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
