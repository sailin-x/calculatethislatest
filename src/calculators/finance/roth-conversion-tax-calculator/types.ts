export interface RothConversionInputs {
  currentAge: number;
  conversionAmount: number;
  currentTaxBracket: number;
  expectedTaxBracket: number;
  fiveYearRule: boolean;
  timeHorizon: number;
  expectedReturn: number;
  inflationRate: number;
  accountType: 'traditional_ira' | '401k' | 'sep_ira' | 'simple_ira';
  stateTaxRate: number;
  includeStateTax: boolean;
  medicalExpenses: number;
  charitableContributions: number;
}

export interface RothConversionResults {
  immediateTaxLiability: number;
  stateTaxLiability: number;
  totalTaxLiability: number;
  netConversionAmount: number;
  projectedValue: number;
  taxSavings: number;
  breakevenYears: number;
  conversionEfficiency: number;
  recommendedStrategy: string;
}

export interface RothConversionMetrics {
  taxEfficiency: number;
  riskLevel: 'low' | 'medium' | 'high';
  timeValue: number;
  conversionBenefit: number;
  strategyScore: number;
}