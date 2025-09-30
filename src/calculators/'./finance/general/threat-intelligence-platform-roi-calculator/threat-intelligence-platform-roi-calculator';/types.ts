export interface './finance/general/threat-intelligence-platform-roi-calculator/threat-intelligence-platform-roi-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/threat-intelligence-platform-roi-calculator/threat-intelligence-platform-roi-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/threat-intelligence-platform-roi-calculator/threat-intelligence-platform-roi-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/threat-intelligence-platform-roi-calculator/threat-intelligence-platform-roi-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
