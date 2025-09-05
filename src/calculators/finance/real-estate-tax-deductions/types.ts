export interface RealEstateTaxDeductionsInputs {
  propertyType: 'residential' | 'commercial' | 'mixed-use' | 'rental' | 'vacation';
  propertyValue: number;
  landValue: number;
  placedInServiceDate: string;
  businessUsePercentage: number;
  annualRent: number;
  operatingExpenses: number;
  mortgageInterest: number;
  propertyTaxes: number;
  insurance: number;
  utilities: number;
  maintenance: number;
  managementFees: number;
  advertising: number;
  legalFees: number;
  accountingFees: number;
  travelExpenses: number;
  homeOfficeExpenses: number;
  depreciation: number;
  bonusDepreciation: number;
  section179Deduction: number;
  costSegregation: number;
  passiveActivityLoss: number;
  atRiskAmount: number;
  materialParticipation: boolean;
  realEstateProfessional: boolean;
  taxYear: number;
  filingStatus: 'single' | 'married-joint' | 'married-separate' | 'head-of-household';
  adjustedGrossIncome: number;
  otherPassiveIncome: number;
  otherPassiveLosses: number;
}

export interface RealEstateTaxDeductionsOutputs {
  deductibleExpenses: {
    operatingExpenses: number;
    mortgageInterest: number;
    propertyTaxes: number;
    insurance: number;
    utilities: number;
    maintenance: number;
    managementFees: number;
    advertising: number;
    legalFees: number;
    accountingFees: number;
    travelExpenses: number;
    homeOfficeExpenses: number;
    totalOperating: number;
  };
  depreciationDeductions: {
    regularDepreciation: number;
    bonusDepreciation: number;
    section179Deduction: number;
    costSegregation: number;
    totalDepreciation: number;
  };
  passiveActivityAnalysis: {
    passiveActivityLoss: number;
    atRiskAmount: number;
    materialParticipation: boolean;
    realEstateProfessional: boolean;
    deductibleLoss: number;
    suspendedLoss: number;
  };
  taxSavings: {
    operatingExpenseSavings: number;
    depreciationSavings: number;
    totalTaxSavings: number;
    effectiveTaxRate: number;
  };
  netRentalIncome: {
    grossRentalIncome: number;
    totalDeductions: number;
    netRentalIncome: number;
    taxableIncome: number;
  };
  carryoverAnalysis: {
    suspendedLosses: number;
    carryoverYears: number;
    futureTaxSavings: number;
  };
  summary: {
    totalDeductions: number;
    netTaxableIncome: number;
    totalTaxSavings: number;
    afterTaxCashFlow: number;
    taxEfficiency: number;
  };
}

export interface RealEstateTaxDeductionsValidation {
  propertyType: boolean;
  propertyValue: boolean;
  landValue: boolean;
  placedInServiceDate: boolean;
  businessUsePercentage: boolean;
  annualRent: boolean;
  operatingExpenses: boolean;
  mortgageInterest: boolean;
  propertyTaxes: boolean;
  insurance: boolean;
  utilities: boolean;
  maintenance: boolean;
  managementFees: boolean;
  advertising: boolean;
  legalFees: boolean;
  accountingFees: boolean;
  travelExpenses: boolean;
  homeOfficeExpenses: boolean;
  depreciation: boolean;
  bonusDepreciation: boolean;
  section179Deduction: boolean;
  costSegregation: boolean;
  passiveActivityLoss: boolean;
  atRiskAmount: boolean;
  materialParticipation: boolean;
  realEstateProfessional: boolean;
  taxYear: boolean;
  filingStatus: boolean;
  adjustedGrossIncome: boolean;
  otherPassiveIncome: boolean;
  otherPassiveLosses: boolean;
}