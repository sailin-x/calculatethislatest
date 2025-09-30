export interface './businessmarketingoperations/businessoperationsfinancehub/digital-transformation-business-case-calculator/digital-transformation-business-case-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/businessoperationsfinancehub/digital-transformation-business-case-calculator/digital-transformation-business-case-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/businessoperationsfinancehub/digital-transformation-business-case-calculator/digital-transformation-business-case-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/businessoperationsfinancehub/digital-transformation-business-case-calculator/digital-transformation-business-case-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
