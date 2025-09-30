export interface './business/cam-girl-revenue-calculator/cam_girl_revenue_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/cam-girl-revenue-calculator/cam_girl_revenue_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/cam-girl-revenue-calculator/cam_girl_revenue_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/cam-girl-revenue-calculator/cam_girl_revenue_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
