export interface './health/soil-amendment-calculator/soil-amendment-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/soil-amendment-calculator/soil-amendment-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/soil-amendment-calculator/soil-amendment-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/soil-amendment-calculator/soil-amendment-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
