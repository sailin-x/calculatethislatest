export interface discord_server_monetization_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface discord_server_monetization_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface discord_server_monetization_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface discord_server_monetization_calculatorOutputs {
  result: number;
  analysis: discord_server_monetization_calculatorAnalysis;
}
