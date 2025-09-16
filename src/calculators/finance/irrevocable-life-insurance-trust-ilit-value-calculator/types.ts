export interface ILITInputs {
  trustValue: number;
  annualPremium: number;
  deathBenefit: number;
  trustDuration: number;
  discountRate: number;
  inflationRate: number;
  taxRate: number;
  administrativeCosts: number;
  numberOfBeneficiaries: number;
  trustType: 'life-insurance' | 'charitable-remainder' | 'grantor';
  includeCrummeyPowers: boolean;
  stateOfResidence: string;
}

export interface ILITResults {
  presentValue: number;
  futureValue: number;
  taxSavings: number;
  netBenefit: number;
  beneficiaryShare: number;
  administrativeCostTotal: number;
  effectiveYield: number;
  breakEvenPeriod: number;
  riskAssessment: string;
}

export interface ILITMetrics {
  trustEfficiency: number;
  taxOptimizationScore: number;
  beneficiaryProtection: number;
  estatePlanningBenefit: 'low' | 'medium' | 'high';
}