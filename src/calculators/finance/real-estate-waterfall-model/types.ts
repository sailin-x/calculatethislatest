export interface RealEstateWaterfallModelInputs {
  totalInvestment: number;
  sponsorEquity: number;
  investorEquity: number;
  preferredReturn: number;
  catchUpPercentage: number;
  promotePercentage: number;
  waterfallStructure: 'simple' | 'complex' | 'custom';
  holdPeriod: number;
  annualCashFlow: number;
  exitValue: number;
  managementFees: number;
  acquisitionFees: number;
  dispositionFees: number;
  operatingExpenses: number;
  debtService: number;
  propertyValue: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  interestOnlyPeriod: number;
  depreciation: number;
  taxBenefits: number;
  investorCount: number;
  minimumInvestment: number;
  maximumInvestment: number;
  investorType: 'accredited' | 'non-accredited' | 'both';
  stateRegulations: string[];
  secCompliance: boolean;
  offeringDocument: boolean;
  dueDiligence: boolean;
}

export interface RealEstateWaterfallModelOutputs {
  capitalStructure: {
    totalInvestment: number;
    sponsorEquity: number;
    investorEquity: number;
    debtAmount: number;
    loanToValue: number;
  };
  feeStructure: {
    managementFees: number;
    acquisitionFees: number;
    dispositionFees: number;
    totalFees: number;
  };
  waterfallAnalysis: {
    preferredReturn: number;
    catchUpPercentage: number;
    promotePercentage: number;
    sponsorShare: number;
    investorShare: number;
    breakEvenPoint: number;
  };
  cashFlowProjection: {
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    year5: number;
  };
  returnProjections: {
    expectedIRR: number;
    expectedMultiple: number;
    annualCashFlow: number;
    totalReturn: number;
    netIRR: number;
  };
  taxAnalysis: {
    depreciation: number;
    taxBenefits: number;
    taxSavings: number;
    afterTaxReturn: number;
  };
  investorAnalysis: {
    investorCount: number;
    averageInvestment: number;
    minimumInvestment: number;
    maximumInvestment: number;
    investorType: string;
  };
  complianceAnalysis: {
    secCompliance: boolean;
    stateRegulations: string[];
    offeringDocument: boolean;
    dueDiligence: boolean;
    complianceCost: number;
  };
  riskAssessment: {
    leverageRisk: number;
    marketRisk: number;
    liquidityRisk: number;
    regulatoryRisk: number;
    overallRisk: number;
  };
  summary: {
    totalFees: number;
    netReturn: number;
    sponsorPromote: number;
    investorReturn: number;
    successProbability: number;
  };
}

export interface RealEstateWaterfallModelValidation {
  totalInvestment: boolean;
  sponsorEquity: boolean;
  investorEquity: boolean;
  preferredReturn: boolean;
  catchUpPercentage: boolean;
  promotePercentage: boolean;
  waterfallStructure: boolean;
  holdPeriod: boolean;
  annualCashFlow: boolean;
  exitValue: boolean;
  managementFees: boolean;
  acquisitionFees: boolean;
  dispositionFees: boolean;
  operatingExpenses: boolean;
  debtService: boolean;
  propertyValue: boolean;
  loanAmount: boolean;
  interestRate: boolean;
  loanTerm: boolean;
  interestOnlyPeriod: boolean;
  depreciation: boolean;
  taxBenefits: boolean;
  investorCount: boolean;
  minimumInvestment: boolean;
  maximumInvestment: boolean;
  investorType: boolean;
  stateRegulations: boolean;
  secCompliance: boolean;
  offeringDocument: boolean;
  dueDiligence: boolean;
}