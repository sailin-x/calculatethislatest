export interface './constructionindustrial/constructionhub/siding-calculator/siding-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './constructionindustrial/constructionhub/siding-calculator/siding-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './constructionindustrial/constructionhub/siding-calculator/siding-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './constructionindustrial/constructionhub/siding-calculator/siding-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
