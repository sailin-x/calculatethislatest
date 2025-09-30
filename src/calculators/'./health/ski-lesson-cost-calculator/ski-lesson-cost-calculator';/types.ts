export interface './health/ski-lesson-cost-calculator/ski-lesson-cost-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/ski-lesson-cost-calculator/ski-lesson-cost-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/ski-lesson-cost-calculator/ski-lesson-cost-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/ski-lesson-cost-calculator/ski-lesson-cost-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
