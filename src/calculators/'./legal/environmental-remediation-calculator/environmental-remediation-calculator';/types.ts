export interface './legal/environmental-remediation-calculator/environmental-remediation-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/environmental-remediation-calculator/environmental-remediation-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/environmental-remediation-calculator/environmental-remediation-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/environmental-remediation-calculator/environmental-remediation-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
