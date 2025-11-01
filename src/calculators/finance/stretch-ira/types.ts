export interface StretchIRAInputs {
  initialBalance: number;
  expectedAnnualReturn: number;
  inflationRate: number;
  taxBracket: number;
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately';
  numberOfBeneficiaries: number;
  beneficiaryAges: number[];
  lifeExpectancyMethod: 'uniform_lifetime' | 'single_life' | 'joint_life';
  withdrawalStrategy: 'required_minimum' | 'fixed_percentage' | 'fixed_amount';
  fixedWithdrawalAmount?: number;
  fixedWithdrawalPercentage?: number;
  analysisPeriod: number;
  currentAge: number;
}

export interface StretchIRAOutputs {
  totalDistributions: number;
  totalTaxesPaid: number;
  netDistributions: number;
  remainingBalance: number;
  averageAnnualDistribution: number;
  effectiveTaxRate: number;
  stretchDuration: number;
  beneficiaryAnalysis: Array<{
    beneficiaryNumber: number;
    age: number;
    lifeExpectancy: number;
    totalDistributions: number;
    totalTaxes: number;
    netAmount: number;
  }>;
  yearByYearProjections: Array<{
    year: number;
    beginningBalance: number;
    growth: number;
    requiredMinimum: number;
    actualDistribution: number;
    taxes: number;
    netDistribution: number;
    endingBalance: number;
  }>;
  optimizationRecommendations: string[];
}