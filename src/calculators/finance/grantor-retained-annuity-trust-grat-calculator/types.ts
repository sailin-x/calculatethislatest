export interface GRATInputs {
  initialValue: number;
  annuityRate: number;
  termYears: number;
  growthRate: number;
  discountRate: number;
  gstTaxRate: number;
  estateTaxRate: number;
  includeStateTax: boolean;
  stateTaxRate: number;
  inflationRate: number;
  trustType: 'standard' | 'zeroed-out' | 'rollover';
}

export interface GRATResults {
  annuityPayment: number;
  remainderValue: number;
  gstTaxLiability: number;
  estateTaxLiability: number;
  totalTaxLiability: number;
  netBenefit: number;
  internalRateOfReturn: number;
  breakEvenPoint: number;
  optimalStrategy: string;
}

export interface GRATMetrics {
  efficiencyRatio: number;
  taxSavingsPercentage: number;
  riskAssessment: 'low' | 'medium' | 'high';
  successProbability: number;
}