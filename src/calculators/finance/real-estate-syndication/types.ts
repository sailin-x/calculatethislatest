export interface RealEstateSyndicationInputs {
  totalInvestment: number;
  sponsorEquity: number;
  investorEquity: number;
  preferredReturn: number;
  promotePercentage: number;
  waterfallStructure: 'simple' | 'complex' | 'custom';
  holdPeriod: number;
  expectedIRR: number;
  expectedMultiple: number;
  managementFees: number;
  acquisitionFees: number;
  dispositionFees: number;
  operatingExpenses: number;
  debtService: number;
  propertyValue: number;
  exitValue: number;
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

export interface RealEstateSyndicationOutputs {
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
    promotePercentage: number;
    sponsorShare: number;
    investorShare: number;
    breakEvenPoint: number;
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

export interface RealEstateSyndicationValidation {
  totalInvestment: boolean;
  sponsorEquity: boolean;
  investorEquity: boolean;
  preferredReturn: boolean;
  promotePercentage: boolean;
  waterfallStructure: boolean;
  holdPeriod: boolean;
  expectedIRR: boolean;
  expectedMultiple: boolean;
  managementFees: boolean;
  acquisitionFees: boolean;
  dispositionFees: boolean;
  operatingExpenses: boolean;
  debtService: boolean;
  propertyValue: boolean;
  exitValue: boolean;
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