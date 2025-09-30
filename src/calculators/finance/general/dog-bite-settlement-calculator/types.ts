export interface dog_bite_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface dog_bite_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface dog_bite_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface dog_bite_settlement_calculatorOutputs {
  result: number;
  analysis: dog_bite_settlement_calculatorAnalysis;
}
