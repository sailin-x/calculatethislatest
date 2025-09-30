export interface './finance/car-payment-calculator/CarPaymentCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/car-payment-calculator/CarPaymentCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/car-payment-calculator/CarPaymentCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/car-payment-calculator/CarPaymentCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
