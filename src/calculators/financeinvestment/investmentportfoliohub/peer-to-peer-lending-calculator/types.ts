export interface peer_to_peer_lending_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface peer_to_peer_lending_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface peer_to_peer_lending_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface peer_to_peer_lending_calculatorOutputs {
  result: number;
  analysis: peer_to_peer_lending_calculatorAnalysis;
}
