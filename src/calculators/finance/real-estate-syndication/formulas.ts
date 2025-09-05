import { RealEstateSyndicationInputs, RealEstateSyndicationOutputs } from './types';

export function calculateRealEstateSyndication(inputs: RealEstateSyndicationInputs): RealEstateSyndicationOutputs {
  const {
    totalInvestment,
    sponsorEquity,
    investorEquity,
    preferredReturn,
    promotePercentage,
    waterfallStructure,
    holdPeriod,
    expectedIRR,
    expectedMultiple,
    managementFees,
    acquisitionFees,
    dispositionFees,
    operatingExpenses,
    debtService,
    propertyValue,
    exitValue,
    depreciation,
    taxBenefits,
    investorCount,
    minimumInvestment,
    maximumInvestment,
    investorType,
    stateRegulations,
    secCompliance,
    offeringDocument,
    dueDiligence
  } = inputs;

  // Calculate capital structure
  const debtAmount = totalInvestment - sponsorEquity - investorEquity;
  const loanToValue = (debtAmount / propertyValue) * 100;

  const capitalStructure = {
    totalInvestment,
    sponsorEquity,
    investorEquity,
    debtAmount,
    loanToValue
  };

  // Calculate fee structure
  const totalFees = managementFees + acquisitionFees + dispositionFees;

  const feeStructure = {
    managementFees,
    acquisitionFees,
    dispositionFees,
    totalFees
  };

  // Calculate waterfall analysis
  const waterfallAnalysis = calculateWaterfallAnalysis(
    preferredReturn,
    promotePercentage,
    waterfallStructure,
    expectedIRR,
    expectedMultiple
  );

  // Calculate return projections
  const returnProjections = calculateReturnProjections(
    expectedIRR,
    expectedMultiple,
    holdPeriod,
    totalFees,
    operatingExpenses,
    debtService
  );

  // Calculate tax analysis
  const taxAnalysis = calculateTaxAnalysis(
    depreciation,
    taxBenefits,
    expectedIRR,
    holdPeriod
  );

  // Calculate investor analysis
  const investorAnalysis = calculateInvestorAnalysis(
    investorCount,
    minimumInvestment,
    maximumInvestment,
    investorType,
    investorEquity
  );

  // Calculate compliance analysis
  const complianceAnalysis = calculateComplianceAnalysis(
    secCompliance,
    stateRegulations,
    offeringDocument,
    dueDiligence,
    investorCount
  );

  // Calculate risk assessment
  const riskAssessment = calculateRiskAssessment(
    loanToValue,
    expectedIRR,
    holdPeriod,
    secCompliance,
    stateRegulations.length
  );

  // Calculate summary
  const summary = calculateSummary(
    totalFees,
    returnProjections,
    waterfallAnalysis,
    taxAnalysis,
    riskAssessment
  );

  return {
    capitalStructure,
    feeStructure,
    waterfallAnalysis,
    returnProjections,
    taxAnalysis,
    investorAnalysis,
    complianceAnalysis,
    riskAssessment,
    summary
  };
}

function calculateWaterfallAnalysis(
  preferredReturn: number,
  promotePercentage: number,
  structure: string,
  expectedIRR: number,
  expectedMultiple: number
): {
  preferredReturn: number;
  promotePercentage: number;
  sponsorShare: number;
  investorShare: number;
  breakEvenPoint: number;
} {
  let sponsorShare: number;
  let investorShare: number;
  let breakEvenPoint: number;

  if (structure === 'simple') {
    // Simple waterfall: preferred return, then split
    sponsorShare = promotePercentage;
    investorShare = 100 - promotePercentage;
    breakEvenPoint = preferredReturn;
  } else if (structure === 'complex') {
    // Complex waterfall: preferred return, catch-up, then promote
    sponsorShare = promotePercentage * 1.5; // Higher promote in complex structure
    investorShare = 100 - sponsorShare;
    breakEvenPoint = preferredReturn * 1.2; // Higher break-even
  } else {
    // Custom structure
    sponsorShare = promotePercentage;
    investorShare = 100 - promotePercentage;
    breakEvenPoint = preferredReturn;
  }

  return {
    preferredReturn,
    promotePercentage,
    sponsorShare,
    investorShare,
    breakEvenPoint
  };
}

function calculateReturnProjections(
  expectedIRR: number,
  expectedMultiple: number,
  holdPeriod: number,
  totalFees: number,
  operatingExpenses: number,
  debtService: number
): {
  expectedIRR: number;
  expectedMultiple: number;
  annualCashFlow: number;
  totalReturn: number;
  netIRR: number;
} {
  const annualCashFlow = (expectedIRR / 100) * (expectedMultiple * 1000000) / holdPeriod;
  const totalReturn = expectedMultiple * 1000000;
  const netIRR = expectedIRR - (totalFees / 1000000) * 2; // Adjust for fees

  return {
    expectedIRR,
    expectedMultiple,
    annualCashFlow,
    totalReturn,
    netIRR
  };
}

function calculateTaxAnalysis(
  depreciation: number,
  taxBenefits: number,
  expectedIRR: number,
  holdPeriod: number
): {
  depreciation: number;
  taxBenefits: number;
  taxSavings: number;
  afterTaxReturn: number;
} {
  const taxSavings = (depreciation + taxBenefits) * 0.25; // Assume 25% tax rate
  const afterTaxReturn = expectedIRR + (taxSavings / 1000000) * 2; // Adjust for tax benefits

  return {
    depreciation,
    taxBenefits,
    taxSavings,
    afterTaxReturn
  };
}

function calculateInvestorAnalysis(
  investorCount: number,
  minimumInvestment: number,
  maximumInvestment: number,
  investorType: string,
  investorEquity: number
): {
  investorCount: number;
  averageInvestment: number;
  minimumInvestment: number;
  maximumInvestment: number;
  investorType: string;
} {
  const averageInvestment = investorEquity / investorCount;

  return {
    investorCount,
    averageInvestment,
    minimumInvestment,
    maximumInvestment,
    investorType
  };
}

function calculateComplianceAnalysis(
  secCompliance: boolean,
  stateRegulations: string[],
  offeringDocument: boolean,
  dueDiligence: boolean,
  investorCount: number
): {
  secCompliance: boolean;
  stateRegulations: string[];
  offeringDocument: boolean;
  dueDiligence: boolean;
  complianceCost: number;
} {
  let complianceCost = 0;
  
  if (secCompliance) {
    complianceCost += 50000; // SEC compliance cost
  }
  
  if (stateRegulations.length > 0) {
    complianceCost += stateRegulations.length * 10000; // State compliance cost
  }
  
  if (offeringDocument) {
    complianceCost += 25000; // Offering document cost
  }
  
  if (dueDiligence) {
    complianceCost += 15000; // Due diligence cost
  }

  return {
    secCompliance,
    stateRegulations,
    offeringDocument,
    dueDiligence,
    complianceCost
  };
}

function calculateRiskAssessment(
  loanToValue: number,
  expectedIRR: number,
  holdPeriod: number,
  secCompliance: boolean,
  stateRegulationCount: number
): {
  leverageRisk: number;
  marketRisk: number;
  liquidityRisk: number;
  regulatoryRisk: number;
  overallRisk: number;
} {
  // Calculate leverage risk (0-100 scale)
  const leverageRisk = Math.min(100, loanToValue * 1.2);
  
  // Calculate market risk based on IRR and hold period
  const marketRisk = Math.max(0, 100 - expectedIRR * 2 - holdPeriod * 5);
  
  // Calculate liquidity risk based on hold period
  const liquidityRisk = Math.min(100, holdPeriod * 10);
  
  // Calculate regulatory risk
  const regulatoryRisk = secCompliance ? 20 : 60 + (stateRegulationCount * 10);
  
  // Calculate overall risk (weighted average)
  const overallRisk = (leverageRisk * 0.3 + marketRisk * 0.3 + liquidityRisk * 0.2 + regulatoryRisk * 0.2);

  return {
    leverageRisk,
    marketRisk,
    liquidityRisk,
    regulatoryRisk,
    overallRisk
  };
}

function calculateSummary(
  totalFees: number,
  returnProjections: any,
  waterfallAnalysis: any,
  taxAnalysis: any,
  riskAssessment: any
): {
  totalFees: number;
  netReturn: number;
  sponsorPromote: number;
  investorReturn: number;
  successProbability: number;
} {
  const netReturn = returnProjections.netIRR;
  const sponsorPromote = waterfallAnalysis.sponsorShare;
  const investorReturn = waterfallAnalysis.investorShare;
  const successProbability = Math.max(0, 100 - riskAssessment.overallRisk);

  return {
    totalFees,
    netReturn,
    sponsorPromote,
    investorReturn,
    successProbability
  };
}

export function calculateSyndicationComparison(
  syndication1: RealEstateSyndicationOutputs,
  syndication2: RealEstateSyndicationOutputs
): {
  irrDifference: number;
  riskDifference: number;
  feeDifference: number;
  recommendation: string;
} {
  const irrDifference = syndication1.returnProjections.expectedIRR - syndication2.returnProjections.expectedIRR;
  const riskDifference = syndication1.riskAssessment.overallRisk - syndication2.riskAssessment.overallRisk;
  const feeDifference = syndication1.feeStructure.totalFees - syndication2.feeStructure.totalFees;
  
  let recommendation = 'Both syndications are comparable';
  if (irrDifference > 2 && riskDifference < 10) {
    recommendation = 'Syndication 1 offers better risk-adjusted returns';
  } else if (irrDifference < -2 && riskDifference > 10) {
    recommendation = 'Syndication 2 offers better risk-adjusted returns';
  } else if (feeDifference > 50000) {
    recommendation = 'Syndication 2 has lower fees';
  } else if (feeDifference < -50000) {
    recommendation = 'Syndication 1 has lower fees';
  }
  
  return {
    irrDifference,
    riskDifference,
    feeDifference,
    recommendation
  };
}

export function calculateInvestorAllocation(
  totalInvestment: number,
  investorCount: number,
  minimumInvestment: number,
  maximumInvestment: number
): {
  averageInvestment: number;
  allocationRange: string;
  diversificationScore: number;
  recommendations: string[];
} {
  const averageInvestment = totalInvestment / investorCount;
  const allocationRange = `$${minimumInvestment.toLocaleString()} - $${maximumInvestment.toLocaleString()}`;
  
  // Calculate diversification score (0-100)
  let diversificationScore = 0;
  if (investorCount >= 10) diversificationScore += 40;
  else if (investorCount >= 5) diversificationScore += 20;
  
  if (averageInvestment >= minimumInvestment * 2) diversificationScore += 30;
  else if (averageInvestment >= minimumInvestment * 1.5) diversificationScore += 20;
  
  if (maximumInvestment <= averageInvestment * 3) diversificationScore += 30;
  else if (maximumInvestment <= averageInvestment * 5) diversificationScore += 20;
  
  const recommendations: string[] = [];
  if (investorCount < 5) {
    recommendations.push('Consider increasing investor count for better diversification');
  }
  if (averageInvestment < minimumInvestment * 1.5) {
    recommendations.push('Consider increasing minimum investment amount');
  }
  if (maximumInvestment > averageInvestment * 5) {
    recommendations.push('Consider reducing maximum investment amount');
  }
  
  return {
    averageInvestment,
    allocationRange,
    diversificationScore,
    recommendations
  };
}