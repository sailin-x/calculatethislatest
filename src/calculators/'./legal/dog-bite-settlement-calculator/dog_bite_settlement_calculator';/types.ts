export interface './legal/dog-bite-settlement-calculator/dog_bite_settlement_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/dog-bite-settlement-calculator/dog_bite_settlement_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/dog-bite-settlement-calculator/dog_bite_settlement_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/dog-bite-settlement-calculator/dog_bite_settlement_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
