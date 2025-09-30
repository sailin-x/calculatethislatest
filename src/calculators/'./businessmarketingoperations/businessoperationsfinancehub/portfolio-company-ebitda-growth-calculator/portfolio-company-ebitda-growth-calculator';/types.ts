export interface './businessmarketingoperations/businessoperationsfinancehub/portfolio-company-ebitda-growth-calculator/portfolio-company-ebitda-growth-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/businessoperationsfinancehub/portfolio-company-ebitda-growth-calculator/portfolio-company-ebitda-growth-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/businessoperationsfinancehub/portfolio-company-ebitda-growth-calculator/portfolio-company-ebitda-growth-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/businessoperationsfinancehub/portfolio-company-ebitda-growth-calculator/portfolio-company-ebitda-growth-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
