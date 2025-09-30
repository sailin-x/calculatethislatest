export interface './health/hvac-maintenance-cost-calculator/hvac-maintenance-cost-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/hvac-maintenance-cost-calculator/hvac-maintenance-cost-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/hvac-maintenance-cost-calculator/hvac-maintenance-cost-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/hvac-maintenance-cost-calculator/hvac-maintenance-cost-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
