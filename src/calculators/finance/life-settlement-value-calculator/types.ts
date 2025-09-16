export interface LifeSettlementInputs {
  currentAge: number;
  lifeExpectancy: number;
  deathBenefit: number;
  annualPremium: number;
  policyType: 'term' | 'whole' | 'universal' | 'variable';
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  settlementOffer: number;
  discountRate: number;
  inflationRate: number;
  taxRate: number;
  settlementCosts: number;
  remainingTerm: number;
}

export interface LifeSettlementResults {
  netSettlementValue: number;
  breakEvenPeriod: number;
  internalRateOfReturn: number;
  presentValueOfPremiums: number;
  settlementEfficiency: number;
  taxLiability: number;
  netAfterTaxValue: number;
  monthlyIncome: number;
  riskAssessment: string;
}

export interface LifeSettlementMetrics {
  settlementViability: number;
  premiumSavings: number;
  longevityRisk: 'low' | 'medium' | 'high';
  financialBenefit: 'low' | 'medium' | 'high';
}