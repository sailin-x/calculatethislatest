export interface './legal/car-accident-pain-suffering-calculator/car_accident_pain_suffering_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/car-accident-pain-suffering-calculator/car_accident_pain_suffering_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/car-accident-pain-suffering-calculator/car_accident_pain_suffering_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/car-accident-pain-suffering-calculator/car_accident_pain_suffering_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
