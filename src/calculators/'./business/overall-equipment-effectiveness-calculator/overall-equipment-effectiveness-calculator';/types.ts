export interface './business/overall-equipment-effectiveness-calculator/overall-equipment-effectiveness-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/overall-equipment-effectiveness-calculator/overall-equipment-effectiveness-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/overall-equipment-effectiveness-calculator/overall-equipment-effectiveness-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/overall-equipment-effectiveness-calculator/overall-equipment-effectiveness-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
