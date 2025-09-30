export interface './finance/general/media-mix-modeling-mmm-roi-calculator/media-mix-modeling-mmm-roi-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/media-mix-modeling-mmm-roi-calculator/media-mix-modeling-mmm-roi-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/media-mix-modeling-mmm-roi-calculator/media-mix-modeling-mmm-roi-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/media-mix-modeling-mmm-roi-calculator/media-mix-modeling-mmm-roi-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
