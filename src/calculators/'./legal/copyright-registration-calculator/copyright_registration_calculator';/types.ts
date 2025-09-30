export interface './legal/copyright-registration-calculator/copyright_registration_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/copyright-registration-calculator/copyright_registration_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/copyright-registration-calculator/copyright_registration_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/copyright-registration-calculator/copyright_registration_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
