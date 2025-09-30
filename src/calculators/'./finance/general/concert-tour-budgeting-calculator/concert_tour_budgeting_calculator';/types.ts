export interface './finance/general/concert-tour-budgeting-calculator/concert_tour_budgeting_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/concert-tour-budgeting-calculator/concert_tour_budgeting_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/concert-tour-budgeting-calculator/concert_tour_budgeting_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/concert-tour-budgeting-calculator/concert_tour_budgeting_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
