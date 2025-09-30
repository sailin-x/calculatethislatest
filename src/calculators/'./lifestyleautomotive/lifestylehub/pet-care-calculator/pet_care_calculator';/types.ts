export interface './lifestyleautomotive/lifestylehub/pet-care-calculator/pet_care_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './lifestyleautomotive/lifestylehub/pet-care-calculator/pet_care_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './lifestyleautomotive/lifestylehub/pet-care-calculator/pet_care_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './lifestyleautomotive/lifestylehub/pet-care-calculator/pet_care_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
