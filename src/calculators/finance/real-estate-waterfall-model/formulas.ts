import { RealEstateWaterfallModelInputs, RealEstateWaterfallModelOutputs } from './types';

export function calculateRealEstateWaterfallModel(inputs: RealEstateWaterfallModelInputs): RealEstateWaterfallModelOutputs {
  const {
    totalInvestment,
    sponsorEquity,
    investorEquity,
    preferredReturn,
    catchUpPercentage,
    promotePercentage,
    waterfallStructure,
    holdPeriod,
    annualCashFlow,
    exitValue,
    managementFees,
    acquisitionFees,
    dispositionFees,
    operatingExpenses,
    debtService,
    propertyValue,
    loanAmount,
    interestRate,
    loanTerm,
    interestOnlyPeriod,
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
    catchUpPercentage,
    promotePercentage,
    waterfallStructure,
    annualCashFlow,
    exitValue
  );

  // Calculate cash flow projection
  const cashFlowProjection = calculateCashFlowProjection(
    annualCashFlow,
    holdPeriod,
    exitValue
  );

  // Calculate return projections
  const returnProjections = calculateReturnProjections(
    annualCashFlow,
    exitValue,
    holdPeriod,
    totalFees,
    operatingExpenses,
    debtService
  );

  // Calculate tax analysis
  const taxAnalysis = calculateTaxAnalysis(
    depreciation,
    taxBenefits,
    annualCashFlow,
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
    annualCashFlow,
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
    cashFlowProjection,
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
  catchUpPercentage: number,
  promotePercentage: number,
  structure: string,
  annualCashFlow: number,
  exitValue: number
): {
  preferredReturn: number;
  catchUpPercentage: number;
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
    catchUpPercentage,
    promotePercentage,
    sponsorShare,
    investorShare,
    breakEvenPoint
  };
}

function calculateCashFlowProjection(
  annualCashFlow: number,
  holdPeriod: number,
  exitValue: number
): {
  year1: number;
  year2: number;
  year3: number;
  year4: number;
  year5: number;
} {
  const projection: any = {};
  
  for (let year = 1; year <= Math.min(5, holdPeriod); year++) {
    projection[`year${year}`] = annualCashFlow;
  }
  
  // Fill remaining years with 0 if hold period is less than 5 years
  for (let year = holdPeriod + 1; year <= 5; year++) {
    projection[`year${year}`] = 0;
  }
  
  return projection;
}

function calculateReturnProjections(
  annualCashFlow: number,
  exitValue: number,
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
  const totalCashFlow = annualCashFlow * holdPeriod;
  const totalReturn = totalCashFlow + exitValue;
  const expectedMultiple = totalReturn / (annualCashFlow * holdPeriod);
  const expectedIRR = Math.pow(expectedMultiple, 1 / holdPeriod) - 1;
  const netIRR = expectedIRR - (totalFees / (annualCashFlow * holdPeriod)) * 0.1; // Adjust for fees

  return {
    expectedIRR: expectedIRR * 100,
    expectedMultiple,
    annualCashFlow,
    totalReturn,
    netIRR: netIRR * 100
  };
}

function calculateTaxAnalysis(
  depreciation: number,
  taxBenefits: number,
  annualCashFlow: number,
  holdPeriod: number
): {
  depreciation: number;
  taxBenefits: number;
  taxSavings: number;
  afterTaxReturn: number;
} {
  const taxSavings = (depreciation + taxBenefits) * 0.25; // Assume 25% tax rate
  const afterTaxReturn = annualCashFlow + taxSavings;

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
  annualCashFlow: number,
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
  
  // Calculate market risk based on cash flow and hold period
  const marketRisk = Math.max(0, 100 - annualCashFlow * 0.01 - holdPeriod * 5);
  
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

export function calculateWaterfallComparison(
  waterfall1: RealEstateWaterfallModelOutputs,
  waterfall2: RealEstateWaterfallModelOutputs
): {
  irrDifference: number;
  riskDifference: number;
  feeDifference: number;
  recommendation: string;
} {
  const irrDifference = waterfall1.returnProjections.expectedIRR - waterfall2.returnProjections.expectedIRR;
  const riskDifference = waterfall1.riskAssessment.overallRisk - waterfall2.riskAssessment.overallRisk;
  const feeDifference = waterfall1.feeStructure.totalFees - waterfall2.feeStructure.totalFees;
  
  let recommendation = 'Both waterfall models are comparable';
  if (irrDifference > 2 && riskDifference < 10) {
    recommendation = 'Waterfall 1 offers better risk-adjusted returns';
  } else if (irrDifference < -2 && riskDifference > 10) {
    recommendation = 'Waterfall 2 offers better risk-adjusted returns';
  } else if (feeDifference > 50000) {
    recommendation = 'Waterfall 2 has lower fees';
  } else if (feeDifference < -50000) {
    recommendation = 'Waterfall 1 has lower fees';
  }
  
  return {
    irrDifference,
    riskDifference,
    feeDifference,
    recommendation
  };
}

export function calculateOptimizedWaterfall(
  inputs: RealEstateWaterfallModelInputs
): {
  recommendedPreferredReturn: number;
  recommendedCatchUp: number;
  recommendedPromote: number;
  totalOptimizedReturns: number;
  optimizationNotes: string[];
} {
  const notes: string[] = [];
  let recommendedPreferredReturn = inputs.preferredReturn;
  let recommendedCatchUp = inputs.catchUpPercentage;
  let recommendedPromote = inputs.promotePercentage;
  
  // Optimization logic
  if (inputs.preferredReturn < 6) {
    recommendedPreferredReturn = 6;
    notes.push('Consider increasing preferred return to 6% for better investor appeal');
  }
  
  if (inputs.catchUpPercentage < 10) {
    recommendedCatchUp = 10;
    notes.push('Consider increasing catch-up percentage to 10% for better sponsor alignment');
  }
  
  if (inputs.promotePercentage < 15) {
    recommendedPromote = 15;
    notes.push('Consider increasing promote percentage to 15% for better sponsor incentive');
  }
  
  const totalOptimizedReturns = (recommendedPreferredReturn + recommendedCatchUp + recommendedPromote) * 1000;
  
  return {
    recommendedPreferredReturn,
    recommendedCatchUp,
    recommendedPromote,
    totalOptimizedReturns,
    optimizationNotes: notes
  };
}