export interface './constructionindustrial/constructionhub/tile-calculator/tile_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './constructionindustrial/constructionhub/tile-calculator/tile_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './constructionindustrial/constructionhub/tile-calculator/tile_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './constructionindustrial/constructionhub/tile-calculator/tile_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
