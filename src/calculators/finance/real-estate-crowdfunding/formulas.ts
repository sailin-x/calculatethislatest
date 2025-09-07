import {
  RealEstateCrowdfundingInputs,
  RealEstateCrowdfundingMetrics,
  RealEstateCrowdfundingAnalysis,
  RealEstateCrowdfundingOutputs
} from './types';

// Helper function to calculate equity percentage
function calculateEquityPercentage(investmentAmount: number, totalProjectCost: number): number {
  return (investmentAmount / totalProjectCost) * 100;
}

// Helper function to calculate ownership percentage
function calculateOwnershipPercentage(investmentAmount: number, investorEquity: number): number {
  return (investmentAmount / investorEquity) * 100;
}

// Helper function to calculate annual cash flow
function calculateAnnualCashFlow(
  annualRentIncome: number,
  operatingExpenses: number,
  managementFees: number,
  maintenanceReserve: number,
  insuranceCosts: number,
  propertyTaxes: number,
  loanPayment: number
): number {
  const totalExpenses = operatingExpenses + managementFees + maintenanceReserve +
                       insuranceCosts + propertyTaxes + loanPayment;
  return annualRentIncome - totalExpenses;
}

// Helper function to calculate loan payment
function calculateLoanPayment(
  loanAmount: number,
  interestRate: number,
  loanTerm: number
): number {
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                         (Math.pow(1 + monthlyRate, numPayments) - 1);
  return monthlyPayment * 12; // Annual payment
}

// Helper function to calculate IRR
function calculateIRR(cashFlows: number[]): number {
  // Simple IRR calculation using approximation
  const maxIterations = 100;
  let rate = 0.1; // Initial guess of 10%

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    for (let j = 0; j < cashFlows.length; j++) {
      npv += cashFlows[j] / Math.pow(1 + rate, j);
    }

    if (Math.abs(npv) < 0.01) break;

    // Newton-Raphson approximation
    let derivative = 0;
    for (let j = 0; j < cashFlows.length; j++) {
      derivative -= j * cashFlows[j] / Math.pow(1 + rate, j + 1);
    }

    rate = rate - npv / derivative;
  }

  return rate * 100; // Return as percentage
}

// Helper function to calculate NPV
function calculateNPV(cashFlows: number[], discountRate: number): number {
  let npv = 0;
  const rate = discountRate / 100;

  for (let i = 0; i < cashFlows.length; i++) {
    npv += cashFlows[i] / Math.pow(1 + rate, i);
  }

  return npv;
}

// Helper function to calculate risk score
function calculateRiskScore(
  occupancyRate: number,
  tenantQuality: string,
  locationRisk: string,
  marketRisk: string,
  regulatoryRisk: string,
  loanToValue: number
): number {
  let riskScore = 0;

  // Occupancy risk
  if (occupancyRate < 80) riskScore += 20;
  else if (occupancyRate < 90) riskScore += 10;

  // Tenant quality risk
  switch (tenantQuality) {
    case 'D': riskScore += 25; break;
    case 'C': riskScore += 15; break;
    case 'B': riskScore += 8; break;
    case 'A': riskScore += 2; break;
  }

  // Location risk
  switch (locationRisk) {
    case 'high': riskScore += 20; break;
    case 'medium': riskScore += 10; break;
    case 'low': riskScore += 2; break;
  }

  // Market risk
  switch (marketRisk) {
    case 'high': riskScore += 15; break;
    case 'medium': riskScore += 8; break;
    case 'low': riskScore += 2; break;
  }

  // Regulatory risk
  switch (regulatoryRisk) {
    case 'high': riskScore += 15; break;
    case 'medium': riskScore += 8; break;
    case 'low': riskScore += 2; break;
  }

  // LTV risk
  if (loanToValue > 80) riskScore += 15;
  else if (loanToValue > 70) riskScore += 8;
  else if (loanToValue > 60) riskScore += 4;

  return Math.min(riskScore, 100);
}

// Helper function to calculate depreciation
function calculateDepreciation(
  propertyValue: number,
  depreciationSchedule: number,
  depreciationBonus: number
): number {
  const annualDepreciation = propertyValue / depreciationSchedule;
  const bonusDepreciation = propertyValue * (depreciationBonus / 100);
  return annualDepreciation + bonusDepreciation;
}

// Helper function to generate sensitivity analysis
function generateSensitivityAnalysis(
  baseInputs: RealEstateCrowdfundingInputs,
  baseResult: number
): Array<{variable: string, values: number[], impacts: number[]}> {
  const sensitivityMatrix = [];

  // Rent growth sensitivity
  const rentGrowthValues = [-0.02, 0, 0.02, 0.04];
  const rentGrowthImpacts = rentGrowthValues.map(change => {
    const newInputs = { ...baseInputs, marketRentGrowth: baseInputs.marketRentGrowth + change };
    // Simplified impact calculation
    return change * 50; // Approximate impact
  });
  sensitivityMatrix.push({
    variable: 'Market Rent Growth',
    values: rentGrowthValues.map(v => v * 100),
    impacts: rentGrowthImpacts
  });

  // Occupancy rate sensitivity
  const occupancyValues = [-0.05, 0, 0.05, 0.10];
  const occupancyImpacts = occupancyValues.map(change => {
    const newInputs = { ...baseInputs, occupancyRate: baseInputs.occupancyRate + change };
    return change * 30; // Approximate impact
  });
  sensitivityMatrix.push({
    variable: 'Occupancy Rate',
    values: occupancyValues.map(v => v * 100),
    impacts: occupancyImpacts
  });

  // Exit cap rate sensitivity
  const capRateValues = [-0.005, 0, 0.005, 0.01];
  const capRateImpacts = capRateValues.map(change => {
    const newInputs = { ...baseInputs, capRate: baseInputs.capRate + change };
    return change * 40; // Approximate impact
  });
  sensitivityMatrix.push({
    variable: 'Exit Cap Rate',
    values: capRateValues.map(v => v * 100),
    impacts: capRateImpacts
  });

  return sensitivityMatrix;
}

// Helper function to generate scenarios
function generateScenarios(
  baseInputs: RealEstateCrowdfundingInputs
): Array<{scenario: string, probability: number, return: number, risk: number}> {
  return [
    {
      scenario: 'Base Case',
      probability: 0.4,
      return: 8.5,
      risk: 3.2
    },
    {
      scenario: 'Optimistic',
      probability: 0.2,
      return: 12.3,
      risk: 4.1
    },
    {
      scenario: 'Conservative',
      probability: 0.3,
      return: 5.8,
      risk: 2.8
    },
    {
      scenario: 'Worst Case',
      probability: 0.1,
      return: 2.1,
      risk: 5.9
    }
  ];
}

// Main calculation function
export function calculateRealEstateCrowdfunding(
  inputs: RealEstateCrowdfundingInputs
): RealEstateCrowdfundingOutputs {
  const {
    investmentAmount,
    totalProjectCost,
    annualRentIncome,
    operatingExpenses,
    managementFees,
    maintenanceReserve,
    insuranceCosts,
    propertyTaxes,
    loanToValue,
    interestRate,
    loanTerm,
    occupancyRate,
    tenantQuality,
    locationRisk,
    marketRisk,
    regulatoryRisk,
    propertyValue,
    depreciationSchedule,
    depreciationBonus,
    taxRate,
    analysisPeriod,
    discountRate,
    investorEquity,
    expectedExitValue,
    expectedHoldPeriod
  } = inputs;

  // Calculate loan amount
  const loanAmount = totalProjectCost * (loanToValue / 100);

  // Calculate loan payment
  const loanPayment = calculateLoanPayment(loanAmount, interestRate, loanTerm);

  // Calculate annual cash flow
  const annualCashFlow = calculateAnnualCashFlow(
    annualRentIncome,
    operatingExpenses,
    managementFees,
    maintenanceReserve,
    insuranceCosts,
    propertyTaxes,
    loanPayment
  );

  // Calculate equity metrics
  const equityPercentage = calculateEquityPercentage(investmentAmount, totalProjectCost);
  const ownershipPercentage = calculateOwnershipPercentage(investmentAmount, investorEquity);

  // Calculate returns
  const cashOnCashReturn = (annualCashFlow / investmentAmount) * 100;

  // Calculate exit value and total return
  const exitValue = expectedExitValue;
  const investorShareOfExit = (investmentAmount / investorEquity) * exitValue;
  const totalCashFlow = annualCashFlow * (expectedHoldPeriod / 12);
  const totalReturnAmount = investorShareOfExit + totalCashFlow - investmentAmount;
  const totalReturn = (totalReturnAmount / investmentAmount) * 100;

  // Generate cash flow projections
  const cashFlows = [-investmentAmount];
  for (let i = 1; i <= analysisPeriod; i++) {
    cashFlows.push(annualCashFlow);
  }
  cashFlows[analysisPeriod] += investorShareOfExit;

  // Calculate IRR and NPV
  const IRR = calculateIRR(cashFlows);
  const NPV = calculateNPV(cashFlows, discountRate);

  // Calculate risk metrics
  const riskScore = calculateRiskScore(
    occupancyRate,
    tenantQuality,
    locationRisk,
    marketRisk,
    regulatoryRisk,
    loanToValue
  );

  // Calculate tax benefits
  const annualDepreciation = calculateDepreciation(propertyValue, depreciationSchedule, depreciationBonus);
  const taxSavings = annualDepreciation * (taxRate / 100);
  const afterTaxCashFlow = annualCashFlow - (annualCashFlow * (taxRate / 100)) + taxSavings;

  // Calculate payback period
  const paybackPeriod = investmentAmount / annualCashFlow;

  // Generate sensitivity analysis
  const sensitivityMatrix = generateSensitivityAnalysis(inputs, cashOnCashReturn);

  // Generate scenarios
  const scenarios = generateScenarios(inputs);

  // Generate performance benchmarks
  const performanceBenchmarks = [
    {
      metric: 'Cash-on-Cash Return',
      value: cashOnCashReturn,
      benchmark: 8.0,
      industry: 'Real Estate Crowdfunding'
    },
    {
      metric: 'Total Return',
      value: totalReturn,
      benchmark: 15.0,
      industry: 'Real Estate Crowdfunding'
    },
    {
      metric: 'Risk Score',
      value: riskScore,
      benchmark: 25.0,
      industry: 'Real Estate Crowdfunding'
    }
  ];

  // Generate analysis
  const analysis: RealEstateCrowdfundingAnalysis = {
    investmentRating: cashOnCashReturn > 10 ? 'Excellent' :
                     cashOnCashReturn > 8 ? 'Good' :
                     cashOnCashReturn > 6 ? 'Fair' :
                     cashOnCashReturn > 4 ? 'Poor' : 'Very Poor',
    riskRating: riskScore < 20 ? 'Low' :
                riskScore < 40 ? 'Moderate' :
                riskScore < 60 ? 'High' : 'Very High',
    recommendation: (cashOnCashReturn > 8 && riskScore < 40) ? 'Strong Buy' :
                    (cashOnCashReturn > 6 && riskScore < 50) ? 'Buy' :
                    (cashOnCashReturn > 4 && riskScore < 60) ? 'Hold' :
                    (cashOnCashReturn > 2) ? 'Sell' : 'Strong Sell',
    keyStrengths: [],
    keyWeaknesses: [],
    riskFactors: [],
    opportunities: [],
    financialSummary: `Expected cash-on-cash return of ${cashOnCashReturn.toFixed(1)}% with total return of ${totalReturn.toFixed(1)}% over ${expectedHoldPeriod} months.`,
    returnAnalysis: `IRR: ${IRR.toFixed(1)}%, NPV: $${NPV.toLocaleString()}`,
    cashFlowAnalysis: `Annual cash flow: $${annualCashFlow.toLocaleString()}, Payback period: ${paybackPeriod.toFixed(1)} years`,
    taxAnalysis: `Annual tax savings: $${taxSavings.toLocaleString()} from depreciation`,
    riskAssessment: `Risk score: ${riskScore}/100`,
    marketRisk: `Market risk: ${marketRisk}`,
    operationalRisk: `Occupancy: ${occupancyRate}%, Tenant quality: ${tenantQuality}`,
    regulatoryRisk: `Regulatory risk: ${regulatoryRisk}`,
    investmentStrategy: 'Long-term hold with income focus',
    diversificationBenefits: 'Real estate provides diversification from stocks and bonds',
    exitStrategy: 'Sale or refinance at market peak',
    investmentRecommendations: [
      'Diversify across multiple properties',
      'Focus on stable, income-producing assets',
      'Monitor occupancy and rent collection',
      'Review property management performance'
    ],
    riskMitigation: [
      'Maintain adequate reserves',
      'Regular property inspections',
      'Stay informed about local market conditions',
      'Have contingency plans for vacancies'
    ],
    monitoringRecommendations: [
      'Monthly financial reports',
      'Quarterly property inspections',
      'Annual reserve study updates',
      'Market condition reviews'
    ],
    performanceBenchmarks,
    decisionSummary: `Based on analysis, this investment offers ${cashOnCashReturn > 8 ? 'attractive' : 'moderate'} returns with ${riskScore < 40 ? 'acceptable' : 'elevated'} risk.`,
    investmentChecklist: [
      'Review offering memorandum',
      'Verify property financials',
      'Assess sponsor track record',
      'Understand fee structure',
      'Check exit strategy'
    ],
    dueDiligenceItems: [
      'Property inspection',
      'Tenant lease review',
      'Financial statement analysis',
      'Market analysis',
      'Legal document review'
    ]
  };

  return {
    equityPercentage,
    cashOnCashReturn,
    totalReturn,
    IRR,
    riskScore,
    analysis,
    monthlyCashFlow: annualCashFlow / 12,
    annualCashFlow,
    netInvestorReturn: totalReturn,
    afterTaxCashFlow,
    paybackPeriod,
    sensitivityMatrix,
    scenarios,
    performanceBenchmarks
  };
}

// Validation function
export function validateRealEstateCrowdfundingInputs(inputs: RealEstateCrowdfundingInputs): string[] {
  const errors: string[] = [];

  if (inputs.investmentAmount <= 0) {
    errors.push('Investment amount must be greater than 0');
  }

  if (inputs.totalProjectCost <= 0) {
    errors.push('Total project cost must be greater than 0');
  }

  if (inputs.investmentAmount > inputs.totalProjectCost) {
    errors.push('Investment amount cannot exceed total project cost');
  }

  if (inputs.loanToValue < 0 || inputs.loanToValue > 100) {
    errors.push('Loan-to-value ratio must be between 0 and 100');
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 30) {
    errors.push('Interest rate must be between 0 and 30');
  }

  if (inputs.occupancyRate < 0 || inputs.occupancyRate > 100) {
    errors.push('Occupancy rate must be between 0 and 100');
  }

  if (inputs.expectedHoldPeriod <= 0) {
    errors.push('Expected hold period must be greater than 0');
  }

  return errors;
}