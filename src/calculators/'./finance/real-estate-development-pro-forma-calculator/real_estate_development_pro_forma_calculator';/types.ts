export interface './finance/real-estate-development-pro-forma-calculator/real_estate_development_pro_forma_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/real-estate-development-pro-forma-calculator/real_estate_development_pro_forma_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/real-estate-development-pro-forma-calculator/real_estate_development_pro_forma_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/real-estate-development-pro-forma-calculator/real_estate_development_pro_forma_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
