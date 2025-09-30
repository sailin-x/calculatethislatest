export interface './legal/hospital-negligence-calculator/hospital-negligence-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/hospital-negligence-calculator/hospital-negligence-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/hospital-negligence-calculator/hospital-negligence-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/hospital-negligence-calculator/hospital-negligence-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
