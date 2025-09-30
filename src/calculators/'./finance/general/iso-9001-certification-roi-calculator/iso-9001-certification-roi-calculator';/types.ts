export interface './finance/general/iso-9001-certification-roi-calculator/iso-9001-certification-roi-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/iso-9001-certification-roi-calculator/iso-9001-certification-roi-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/iso-9001-certification-roi-calculator/iso-9001-certification-roi-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/iso-9001-certification-roi-calculator/iso-9001-certification-roi-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
