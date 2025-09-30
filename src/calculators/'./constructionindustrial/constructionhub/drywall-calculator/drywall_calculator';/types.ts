export interface './constructionindustrial/constructionhub/drywall-calculator/drywall_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './constructionindustrial/constructionhub/drywall-calculator/drywall_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './constructionindustrial/constructionhub/drywall-calculator/drywall_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './constructionindustrial/constructionhub/drywall-calculator/drywall_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
