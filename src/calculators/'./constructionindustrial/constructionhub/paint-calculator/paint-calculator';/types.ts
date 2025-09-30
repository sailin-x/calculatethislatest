export interface './constructionindustrial/constructionhub/paint-calculator/paint-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './constructionindustrial/constructionhub/paint-calculator/paint-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './constructionindustrial/constructionhub/paint-calculator/paint-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './constructionindustrial/constructionhub/paint-calculator/paint-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
