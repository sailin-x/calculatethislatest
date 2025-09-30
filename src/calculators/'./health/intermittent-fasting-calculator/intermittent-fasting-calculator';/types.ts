export interface './health/intermittent-fasting-calculator/intermittent-fasting-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/intermittent-fasting-calculator/intermittent-fasting-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/intermittent-fasting-calculator/intermittent-fasting-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/intermittent-fasting-calculator/intermittent-fasting-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
