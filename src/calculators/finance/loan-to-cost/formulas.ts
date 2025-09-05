import { LoanToCostInputs, LoanToCostMetrics } from './types';

export function calculateLoanToCostMetrics(inputs: LoanToCostInputs): LoanToCostMetrics {
  // Calculate total project cost
  const totalProjectCost = inputs.landCost + inputs.constructionCost + inputs.softCosts + inputs.contingencyCost;
  
  // LTC Analysis
  const loanToCostRatio = inputs.loanAmount / totalProjectCost;
  const equityContribution = totalProjectCost - inputs.loanAmount;
  const equityPercentage = equityContribution / totalProjectCost;
  const leverageRatio = inputs.loanAmount / equityContribution;
  
  // Cost Analysis
  const costBreakdown = calculateCostBreakdown(inputs, totalProjectCost);
  const costPerSquareFoot = totalProjectCost / inputs.projectSize;
  const costVariance = calculateCostVariance(inputs, costPerSquareFoot);
  
  // Loan Analysis
  const loanPercentage = (inputs.loanAmount / totalProjectCost) * 100;
  const interestExpense = calculateInterestExpense(inputs);
  const totalLoanCost = inputs.loanAmount + interestExpense;
  
  // Cash Flow Analysis
  const constructionCashFlow = calculateConstructionCashFlow(inputs);
  const monthlyInterestExpense = interestExpense / inputs.constructionDuration;
  const totalInterestExpense = interestExpense;
  
  // Risk Metrics
  const riskScore = calculateRiskScore(inputs);
  const probabilityOfCompletion = calculateProbabilityOfCompletion(inputs, riskScore);
  const probabilityOfDefault = calculateProbabilityOfDefault(inputs, riskScore);
  const expectedLoss = calculateExpectedLoss(inputs, probabilityOfDefault);
  
  // Profitability Analysis
  const expectedProfit = calculateExpectedProfit(inputs, totalProjectCost);
  const profitMargin = expectedProfit / inputs.expectedExitValue;
  const returnOnEquity = expectedProfit / equityContribution;
  const returnOnCost = expectedProfit / totalProjectCost;
  
  // Sensitivity Analysis
  const sensitivityMatrix = calculateSensitivityMatrix(inputs, totalProjectCost);
  
  // Scenario Analysis
  const scenarios = calculateScenarios(inputs, totalProjectCost);
  
  // Benchmark Analysis
  const industryBenchmarks = calculateIndustryBenchmarks(inputs, metrics);
  
  return {
    loanToCostRatio,
    equityContribution,
    equityPercentage,
    leverageRatio,
    costBreakdown,
    costPerSquareFoot,
    costVariance,
    loanAmount: inputs.loanAmount,
    loanPercentage,
    interestExpense,
    totalLoanCost,
    constructionCashFlow,
    monthlyInterestExpense,
    totalInterestExpense,
    riskScore,
    probabilityOfCompletion,
    probabilityOfDefault,
    expectedLoss,
    expectedProfit,
    profitMargin,
    returnOnEquity,
    returnOnCost,
    sensitivityMatrix,
    scenarios,
    industryBenchmarks
  };
}

function calculateCostBreakdown(inputs: LoanToCostInputs, totalProjectCost: number) {
  const breakdown = [
    { category: 'Land Cost', amount: inputs.landCost, percentage: inputs.landCost / totalProjectCost },
    { category: 'Site Work', amount: inputs.siteWorkCost, percentage: inputs.siteWorkCost / totalProjectCost },
    { category: 'Foundation', amount: inputs.foundationCost, percentage: inputs.foundationCost / totalProjectCost },
    { category: 'Structural', amount: inputs.structuralCost, percentage: inputs.structuralCost / totalProjectCost },
    { category: 'Exterior', amount: inputs.exteriorCost, percentage: inputs.exteriorCost / totalProjectCost },
    { category: 'Interior', amount: inputs.interiorCost, percentage: inputs.interiorCost / totalProjectCost },
    { category: 'Mechanical', amount: inputs.mechanicalCost, percentage: inputs.mechanicalCost / totalProjectCost },
    { category: 'Electrical', amount: inputs.electricalCost, percentage: inputs.electricalCost / totalProjectCost },
    { category: 'Plumbing', amount: inputs.plumbingCost, percentage: inputs.plumbingCost / totalProjectCost },
    { category: 'Finish', amount: inputs.finishCost, percentage: inputs.finishCost / totalProjectCost },
    { category: 'Architectural Fees', amount: inputs.architecturalFees, percentage: inputs.architecturalFees / totalProjectCost },
    { category: 'Engineering Fees', amount: inputs.engineeringFees, percentage: inputs.engineeringFees / totalProjectCost },
    { category: 'Permit Fees', amount: inputs.permitFees, percentage: inputs.permitFees / totalProjectCost },
    { category: 'Legal Fees', amount: inputs.legalFees, percentage: inputs.legalFees / totalProjectCost },
    { category: 'Insurance', amount: inputs.insuranceCost, percentage: inputs.insuranceCost / totalProjectCost },
    { category: 'Appraisal Fees', amount: inputs.appraisalFees, percentage: inputs.appraisalFees / totalProjectCost },
    { category: 'Survey Fees', amount: inputs.surveyFees, percentage: inputs.surveyFees / totalProjectCost },
    { category: 'Environmental Fees', amount: inputs.environmentalFees, percentage: inputs.environmentalFees / totalProjectCost },
    { category: 'Other Soft Costs', amount: inputs.otherSoftCosts, percentage: inputs.otherSoftCosts / totalProjectCost },
    { category: 'Contingency', amount: inputs.contingencyCost, percentage: inputs.contingencyCost / totalProjectCost }
  ];
  
  return breakdown.filter(item => item.amount > 0);
}

function calculateCostVariance(inputs: LoanToCostInputs, costPerSquareFoot: number): number {
  // Industry average cost per square foot by project type
  const industryAverages: Record<string, number> = {
    residential: 150,
    commercial: 200,
    industrial: 120,
    mixed_use: 180,
    land_development: 50
  };
  
  const industryAverage = industryAverages[inputs.projectType] || 150;
  return ((costPerSquareFoot - industryAverage) / industryAverage) * 100;
}

function calculateInterestExpense(inputs: LoanToCostInputs): number {
  if (inputs.paymentType === 'interest_only') {
    // Interest-only during construction
    return inputs.loanAmount * inputs.interestRate * (inputs.constructionDuration / 12);
  } else if (inputs.paymentType === 'construction_draw') {
    // Interest on drawn amounts over time
    let totalInterest = 0;
    let outstandingBalance = 0;
    
    for (const draw of inputs.drawSchedule) {
      const drawAmount = draw.amount;
      const monthsOutstanding = inputs.constructionDuration - (draw.draw - 1) * (inputs.constructionDuration / inputs.drawSchedule.length);
      const interest = drawAmount * inputs.interestRate * (monthsOutstanding / 12);
      totalInterest += interest;
      outstandingBalance += drawAmount;
    }
    
    return totalInterest;
  } else {
    // Principal and interest payments
    const monthlyRate = inputs.interestRate / 12;
    const totalPayments = inputs.loanTerm;
    const monthlyPayment = inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return (monthlyPayment * totalPayments) - inputs.loanAmount;
  }
}

function calculateConstructionCashFlow(inputs: LoanToCostInputs) {
  const cashFlow = [];
  let cumulativeCost = 0;
  let outstandingBalance = 0;
  
  for (let i = 0; i < inputs.drawSchedule.length; i++) {
    const draw = inputs.drawSchedule[i];
    const drawAmount = draw.amount;
    const monthsOutstanding = inputs.constructionDuration - i * (inputs.constructionDuration / inputs.drawSchedule.length);
    const interestExpense = drawAmount * inputs.interestRate * (monthsOutstanding / 12);
    
    outstandingBalance += drawAmount;
    cumulativeCost += drawAmount + interestExpense;
    
    cashFlow.push({
      period: i + 1,
      drawAmount,
      interestExpense,
      totalCost: drawAmount + interestExpense,
      cumulativeCost
    });
  }
  
  return cashFlow;
}

function calculateRiskScore(inputs: LoanToCostInputs): number {
  let riskScore = 0;
  
  // LTC Risk (0-0.3)
  const ltcRatio = inputs.loanAmount / inputs.totalProjectCost;
  if (ltcRatio <= 0.70) riskScore += 0.05;
  else if (ltcRatio <= 0.75) riskScore += 0.10;
  else if (ltcRatio <= 0.80) riskScore += 0.15;
  else if (ltcRatio <= 0.85) riskScore += 0.25;
  else riskScore += 0.30;
  
  // Borrower Risk (0-0.25)
  if (inputs.borrowerExperience === 'extensive') riskScore += 0.05;
  else if (inputs.borrowerExperience === 'moderate') riskScore += 0.10;
  else if (inputs.borrowerExperience === 'limited') riskScore += 0.15;
  else riskScore += 0.25;
  
  if (inputs.borrowerCreditScore >= 750) riskScore += 0.00;
  else if (inputs.borrowerCreditScore >= 700) riskScore += 0.05;
  else if (inputs.borrowerCreditScore >= 650) riskScore += 0.10;
  else if (inputs.borrowerCreditScore >= 600) riskScore += 0.15;
  else riskScore += 0.20;
  
  // Market Risk (0-0.2)
  if (inputs.marketCondition === 'hot') riskScore += 0.05;
  else if (inputs.marketCondition === 'growing') riskScore += 0.10;
  else if (inputs.marketCondition === 'stable') riskScore += 0.15;
  else riskScore += 0.20;
  
  // Construction Risk (0-0.15)
  if (inputs.constructionRisk === 'low') riskScore += 0.05;
  else if (inputs.constructionRisk === 'medium') riskScore += 0.10;
  else riskScore += 0.15;
  
  // Project Risk (0-0.1)
  if (inputs.projectRisk === 'low') riskScore += 0.05;
  else if (inputs.projectRisk === 'medium') riskScore += 0.08;
  else riskScore += 0.10;
  
  return Math.min(riskScore, 1.0);
}

function calculateProbabilityOfCompletion(inputs: LoanToCostInputs, riskScore: number): number {
  let baseProbability = 0.85;
  
  // Adjust based on risk factors
  if (inputs.borrowerExperience === 'extensive') baseProbability += 0.10;
  else if (inputs.borrowerExperience === 'moderate') baseProbability += 0.05;
  else if (inputs.borrowerExperience === 'limited') baseProbability -= 0.05;
  else baseProbability -= 0.15;
  
  if (inputs.constructionRisk === 'low') baseProbability += 0.05;
  else if (inputs.constructionRisk === 'high') baseProbability -= 0.10;
  
  if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') baseProbability += 0.05;
  else if (inputs.marketCondition === 'declining') baseProbability -= 0.10;
  
  // Adjust based on overall risk score
  baseProbability -= (riskScore * 0.3);
  
  return Math.max(0.1, Math.min(0.95, baseProbability));
}

function calculateProbabilityOfDefault(inputs: LoanToCostInputs, riskScore: number): number {
  let baseProbability = 0.05;
  
  // Adjust based on risk factors
  if (inputs.borrowerCreditScore < 650) baseProbability += 0.10;
  else if (inputs.borrowerCreditScore < 700) baseProbability += 0.05;
  
  if (inputs.borrowerExperience === 'none') baseProbability += 0.15;
  else if (inputs.borrowerExperience === 'limited') baseProbability += 0.10;
  
  if (inputs.marketCondition === 'declining') baseProbability += 0.10;
  
  if (inputs.constructionRisk === 'high') baseProbability += 0.05;
  if (inputs.projectRisk === 'high') baseProbability += 0.05;
  
  // Adjust based on overall risk score
  baseProbability += (riskScore * 0.2);
  
  return Math.max(0.01, Math.min(0.5, baseProbability));
}

function calculateExpectedLoss(inputs: LoanToCostInputs, probabilityOfDefault: number): number {
  // Assume 40% loss severity in default
  const lossSeverity = 0.40;
  return inputs.loanAmount * probabilityOfDefault * lossSeverity;
}

function calculateExpectedProfit(inputs: LoanToCostInputs, totalProjectCost: number): number {
  const totalCost = totalProjectCost + calculateInterestExpense(inputs);
  return inputs.expectedExitValue - totalCost;
}

function calculateSensitivityMatrix(inputs: LoanToCostInputs, totalProjectCost: number) {
  const variables = [
    { name: 'Interest Rate', base: inputs.interestRate, range: [-0.02, -0.01, 0.01, 0.02] },
    { name: 'Construction Cost', base: inputs.constructionCost, range: [-0.1, -0.05, 0.05, 0.1] },
    { name: 'Exit Value', base: inputs.expectedExitValue, range: [-0.1, -0.05, 0.05, 0.1] },
    { name: 'Construction Duration', base: inputs.constructionDuration, range: [-2, -1, 1, 2] }
  ];
  
  return variables.map(variable => {
    const impacts = variable.range.map(change => {
      let adjustedInputs = { ...inputs };
      
      if (variable.name === 'Interest Rate') {
        adjustedInputs.interestRate = inputs.interestRate + change;
      } else if (variable.name === 'Construction Cost') {
        adjustedInputs.constructionCost = inputs.constructionCost * (1 + change);
      } else if (variable.name === 'Exit Value') {
        adjustedInputs.expectedExitValue = inputs.expectedExitValue * (1 + change);
      } else if (variable.name === 'Construction Duration') {
        adjustedInputs.constructionDuration = inputs.constructionDuration + change;
      }
      
      const adjustedMetrics = calculateLoanToCostMetrics(adjustedInputs);
      return adjustedMetrics.expectedProfit;
    });
    
    return {
      variable: variable.name,
      values: variable.range,
      impacts
    };
  });
}

function calculateScenarios(inputs: LoanToCostInputs, totalProjectCost: number) {
  const scenarios = [
    {
      scenario: 'Base Case',
      probability: 0.5,
      ltcRatio: inputs.loanAmount / totalProjectCost,
      profit: calculateExpectedProfit(inputs, totalProjectCost)
    },
    {
      scenario: 'Optimistic',
      probability: 0.25,
      ltcRatio: inputs.loanAmount / (totalProjectCost * 0.95),
      profit: calculateExpectedProfit({ ...inputs, expectedExitValue: inputs.expectedExitValue * 1.1, constructionCost: inputs.constructionCost * 0.95 }, totalProjectCost * 0.95)
    },
    {
      scenario: 'Pessimistic',
      probability: 0.25,
      ltcRatio: inputs.loanAmount / (totalProjectCost * 1.1),
      profit: calculateExpectedProfit({ ...inputs, expectedExitValue: inputs.expectedExitValue * 0.9, constructionCost: inputs.constructionCost * 1.1 }, totalProjectCost * 1.1)
    }
  ];
  
  return scenarios;
}

function calculateIndustryBenchmarks(inputs: LoanToCostInputs, metrics: LoanToCostMetrics) {
  const benchmarks = [
    {
      metric: 'LTC Ratio',
      industry: inputs.projectType === 'residential' ? 'Residential Development' : 'Commercial Development',
      average: inputs.projectType === 'residential' ? 0.75 : 0.70,
      range: inputs.projectType === 'residential' ? '0.70-0.80' : '0.65-0.75'
    },
    {
      metric: 'Return on Equity',
      industry: 'Real Estate Development',
      average: 0.20,
      range: '0.15-0.25'
    },
    {
      metric: 'Profit Margin',
      industry: 'Real Estate Development',
      average: 0.15,
      range: '0.10-0.20'
    },
    {
      metric: 'Construction Duration',
      industry: inputs.projectType === 'residential' ? 'Residential Development' : 'Commercial Development',
      average: inputs.projectType === 'residential' ? 12 : 18,
      range: inputs.projectType === 'residential' ? '10-14 months' : '15-24 months'
    }
  ];
  
  return benchmarks;
}