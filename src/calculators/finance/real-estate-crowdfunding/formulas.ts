import { RealEstateCrowdfundingInputs, RealEstateCrowdfundingOutputs } from './types';

export function calculateRealEstateCrowdfunding(inputs: RealEstateCrowdfundingInputs): RealEstateCrowdfundingOutputs {
  const {
    investmentAmount,
    projectValue,
    expectedHoldPeriod,
    expectedAnnualReturn,
    managementFees,
    platformFees,
    exitFees,
    minimumInvestment,
    maximumInvestment,
    projectType,
    location,
    expectedAppreciation,
    expectedCashFlow,
    taxBenefits,
    liquidityPeriod
  } = inputs;

  // Calculate fees
  const managementFeesAmount = investmentAmount * (managementFees / 100);
  const platformFeesAmount = investmentAmount * (platformFees / 100);
  const exitFeesAmount = investmentAmount * (exitFees / 100);
  const totalFees = managementFeesAmount + platformFeesAmount + exitFeesAmount;

  // Calculate net investment after fees
  const netInvestment = investmentAmount - totalFees;

  // Calculate ownership percentage
  const ownershipPercentage = investmentAmount / projectValue;

  // Calculate expected annual cash flow
  const expectedAnnualCashFlow = (expectedCashFlow * ownershipPercentage) / 100;

  // Calculate expected total return over hold period
  const expectedTotalReturn = expectedAnnualReturn * expectedHoldPeriod;

  // Calculate expected IRR (simplified calculation)
  const expectedIRR = Math.pow(1 + (expectedTotalReturn / 100), 1 / expectedHoldPeriod) - 1;

  // Calculate expected multiple
  const expectedMultiple = 1 + (expectedTotalReturn / 100);

  // Calculate expected exit value
  const appreciationFactor = Math.pow(1 + (expectedAppreciation / 100), expectedHoldPeriod);
  const expectedExitValue = investmentAmount * appreciationFactor * expectedMultiple;

  // Calculate expected net profit
  const expectedNetProfit = expectedExitValue - investmentAmount;

  // Calculate annualized return
  const annualizedReturn = (Math.pow(expectedExitValue / investmentAmount, 1 / expectedHoldPeriod) - 1) * 100;

  // Calculate risk metrics
  const leverageRatio = calculateLeverageRatio(projectType, projectValue);
  const debtServiceCoverage = calculateDebtServiceCoverage(expectedCashFlow, projectValue);
  const occupancyRate = calculateOccupancyRate(projectType, location);
  const capRate = (expectedCashFlow / projectValue) * 100;

  // Calculate cash flow projection
  const cashFlowProjection = calculateCashFlowProjection(
    expectedAnnualCashFlow,
    expectedHoldPeriod,
    expectedAppreciation
  );

  return {
    totalFees,
    netInvestment,
    expectedAnnualCashFlow,
    expectedTotalReturn,
    expectedIRR: expectedIRR * 100,
    expectedMultiple,
    expectedExitValue,
    expectedNetProfit,
    annualizedReturn,
    riskMetrics: {
      leverageRatio,
      debtServiceCoverage,
      occupancyRate,
      capRate
    },
    feeBreakdown: {
      managementFees: managementFeesAmount,
      platformFees: platformFeesAmount,
      exitFees: exitFeesAmount,
      totalFees
    },
    cashFlowProjection
  };
}

function calculateLeverageRatio(projectType: string, projectValue: number): number {
  // Typical leverage ratios by project type
  const leverageRatios: Record<string, number> = {
    'residential': 0.75,
    'commercial': 0.70,
    'industrial': 0.65,
    'retail': 0.60,
    'mixed-use': 0.70
  };
  
  return leverageRatios[projectType] || 0.70;
}

function calculateDebtServiceCoverage(expectedCashFlow: number, projectValue: number): number {
  // Simplified DSCR calculation
  const typicalDebtService = projectValue * 0.05; // 5% annual debt service
  return expectedCashFlow / typicalDebtService;
}

function calculateOccupancyRate(projectType: string, location: string): number {
  // Typical occupancy rates by project type and location
  const baseOccupancyRates: Record<string, number> = {
    'residential': 0.95,
    'commercial': 0.90,
    'industrial': 0.85,
    'retail': 0.88,
    'mixed-use': 0.92
  };
  
  const baseRate = baseOccupancyRates[projectType] || 0.90;
  
  // Adjust for location (simplified)
  const locationAdjustment = location.toLowerCase().includes('major') ? 0.05 : 0;
  
  return Math.min(0.98, baseRate + locationAdjustment);
}

function calculateCashFlowProjection(
  annualCashFlow: number,
  holdPeriod: number,
  appreciation: number
): { year1: number; year2: number; year3: number; year4: number; year5: number } {
  const projection: any = {};
  
  for (let year = 1; year <= Math.min(5, holdPeriod); year++) {
    const appreciationFactor = Math.pow(1 + (appreciation / 100), year - 1);
    projection[`year${year}`] = annualCashFlow * appreciationFactor;
  }
  
  // Fill remaining years with 0 if hold period is less than 5 years
  for (let year = holdPeriod + 1; year <= 5; year++) {
    projection[`year${year}`] = 0;
  }
  
  return projection;
}

export function calculateCrowdfundingComparison(
  investment1: RealEstateCrowdfundingOutputs,
  investment2: RealEstateCrowdfundingOutputs
): { 
  irrDifference: number; 
  multipleDifference: number; 
  riskDifference: number;
  recommendation: string;
} {
  const irrDifference = investment1.expectedIRR - investment2.expectedIRR;
  const multipleDifference = investment1.expectedMultiple - investment2.expectedMultiple;
  const riskDifference = investment1.riskMetrics.leverageRatio - investment2.riskMetrics.leverageRatio;
  
  let recommendation = 'Both investments are comparable';
  if (irrDifference > 2) {
    recommendation = 'Investment 1 offers significantly higher returns';
  } else if (irrDifference < -2) {
    recommendation = 'Investment 2 offers significantly higher returns';
  } else if (riskDifference > 0.1) {
    recommendation = 'Investment 1 has higher risk due to leverage';
  } else if (riskDifference < -0.1) {
    recommendation = 'Investment 2 has higher risk due to leverage';
  }
  
  return {
    irrDifference,
    multipleDifference,
    riskDifference,
    recommendation
  };
}

export function calculatePortfolioAllocation(
  totalInvestment: number,
  investments: Array<{ amount: number; risk: number; return: number }>
): {
  totalRisk: number;
  weightedReturn: number;
  diversificationScore: number;
  recommendations: string[];
} {
  const totalAmount = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const weightedReturn = investments.reduce((sum, inv) => 
    sum + (inv.return * inv.amount / totalAmount), 0);
  
  const totalRisk = investments.reduce((sum, inv) => 
    sum + (inv.risk * inv.amount / totalAmount), 0);
  
  // Calculate diversification score (0-100)
  const diversificationScore = Math.min(100, investments.length * 20);
  
  const recommendations: string[] = [];
  if (investments.length < 3) {
    recommendations.push('Consider diversifying across more projects');
  }
  if (totalRisk > 0.7) {
    recommendations.push('Portfolio risk is high, consider lower-risk investments');
  }
  if (weightedReturn < 8) {
    recommendations.push('Consider higher-return opportunities');
  }
  
  return {
    totalRisk,
    weightedReturn,
    diversificationScore,
    recommendations
  };
}