export interface './finance/general/spinal-cord-injury-compensation-calculator/spinal-cord-injury-compensation-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/spinal-cord-injury-compensation-calculator/spinal-cord-injury-compensation-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/spinal-cord-injury-compensation-calculator/spinal-cord-injury-compensation-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/spinal-cord-injury-compensation-calculator/spinal-cord-injury-compensation-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
