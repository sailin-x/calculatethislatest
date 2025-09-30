export interface './business/out-of-home-oh-advertising-roi-calculator/out-of-home-oh-advertising-roi-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/out-of-home-oh-advertising-roi-calculator/out-of-home-oh-advertising-roi-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/out-of-home-oh-advertising-roi-calculator/out-of-home-oh-advertising-roi-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/out-of-home-oh-advertising-roi-calculator/out-of-home-oh-advertising-roi-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
