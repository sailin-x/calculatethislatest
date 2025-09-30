export interface './constructionindustrial/constructionhub/insulation-calculator/insulation-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './constructionindustrial/constructionhub/insulation-calculator/insulation-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './constructionindustrial/constructionhub/insulation-calculator/insulation-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './constructionindustrial/constructionhub/insulation-calculator/insulation-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
