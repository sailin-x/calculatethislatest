export interface './business/media-mix-modeling-calculator/media_mix_modeling_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/media-mix-modeling-calculator/media_mix_modeling_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/media-mix-modeling-calculator/media_mix_modeling_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/media-mix-modeling-calculator/media_mix_modeling_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
