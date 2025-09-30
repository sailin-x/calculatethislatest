export interface './lifestyleautomotive/lifestylehub/home-improvement-calculator/home_improvement_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './lifestyleautomotive/lifestylehub/home-improvement-calculator/home_improvement_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './lifestyleautomotive/lifestylehub/home-improvement-calculator/home_improvement_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './lifestyleautomotive/lifestylehub/home-improvement-calculator/home_improvement_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
