export interface './health/restaurant-tip-calculator/restaurant-tip-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/restaurant-tip-calculator/restaurant-tip-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/restaurant-tip-calculator/restaurant-tip-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/restaurant-tip-calculator/restaurant-tip-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
