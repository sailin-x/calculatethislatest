export interface './finance/general/discord-server-monetization-calculator/discord-server-monetization-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/discord-server-monetization-calculator/discord-server-monetization-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/discord-server-monetization-calculator/discord-server-monetization-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/discord-server-monetization-calculator/discord-server-monetization-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
