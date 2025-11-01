export interface ApiMonetizationCalculatorinputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ApiMonetizationCalculatorresults {
  result: number;
  analysis?: string;
}

export interface ApiMonetizationCalculatormetrics {
  result: number;
  // Add more metrics as needed
}

export interface ApiMonetizationCalculatoranalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
