export interface './legal/hospital-negligence-calculator/hospital_negligence_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/hospital-negligence-calculator/hospital_negligence_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/hospital-negligence-calculator/hospital_negligence_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/hospital-negligence-calculator/hospital_negligence_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
