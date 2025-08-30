import { MortgageVsRentInputs, MortgageVsRentOutputs, MortgageVsRentAnalysis } from './types';

export function calculateMortgageVsRent(inputs: MortgageVsRentInputs): MortgageVsRentOutputs {
  // Calculate monthly mortgage payment
  const monthlyMortgagePayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  
  // Calculate total monthly mortgage costs
  const monthlyMortgageCosts = monthlyMortgagePayment + 
    (inputs.propertyInsurance / 12) + 
    (inputs.propertyTaxes / 12) + 
    (inputs.hoaFees / 12) + 
    (inputs.floodInsurance / 12) + 
    (inputs.mortgageInsurance / 12) + 
    (inputs.maintenanceCosts / 12) + 
    (inputs.utilityCosts / 12);

  // Calculate monthly rent costs
  const monthlyRentCosts = inputs.monthlyRent + (inputs.rentersInsurance / 12);
  
  // Calculate monthly cost difference (positive = rent is cheaper)
  const monthlyCostDifference = monthlyRentCosts - monthlyMortgageCosts;
  
  // Calculate total costs over analysis period
  const totalMortgageCost = calculateTotalMortgageCost(inputs, monthlyMortgageCosts);
  const totalRentCost = calculateTotalRentCost(inputs);
  const totalCostDifference = totalRentCost - totalMortgageCost;
  const costSavings = totalMortgageCost - totalRentCost;
  
  // Calculate break-even analysis
  const breakEvenAnalysis = calculateBreakEvenAnalysis(inputs, monthlyCostDifference);
  
  // Calculate equity analysis
  const equityAnalysis = calculateEquityAnalysis(inputs);
  
  // Calculate investment analysis
  const investmentAnalysis = calculateInvestmentAnalysis(inputs);
  
  // Calculate tax analysis
  const taxAnalysis = calculateTaxAnalysis(inputs, monthlyMortgagePayment);
  
  // Calculate cash flow analysis
  const cashFlowAnalysis = calculateCashFlowAnalysis(inputs, monthlyCostDifference);
  
  // Calculate risk score
  const riskScore = calculateRiskScore(inputs, monthlyCostDifference, breakEvenAnalysis.breakEvenMonths);
  
  // Calculate probability of benefit
  const probabilityOfBenefit = calculateProbabilityOfBenefit(inputs, totalCostDifference, riskScore);
  
  // Generate analysis
  const analysis = generateAnalysis(inputs, {
    monthlyCostDifference,
    totalCostDifference,
    breakEvenAnalysis,
    equityAnalysis,
    investmentAnalysis,
    taxAnalysis,
    cashFlowAnalysis,
    riskScore,
    probabilityOfBenefit
  });
  
  // Generate recommendation
  const recommendation = generateRecommendation(inputs, {
    monthlyCostDifference,
    totalCostDifference,
    breakEvenAnalysis,
    equityAnalysis,
    riskScore,
    probabilityOfBenefit
  });
  
  // Generate sensitivity and scenario analyses
  const sensitivityMatrix = generateSensitivityAnalysis(inputs, totalCostDifference);
  const scenarios = generateScenarioAnalysis(inputs, totalCostDifference);
  const timelineAnalysis = generateTimelineAnalysis(inputs, monthlyMortgageCosts, monthlyRentCosts);
  const comparisonAnalysis = generateComparisonAnalysis(inputs, {
    monthlyMortgageCosts,
    monthlyRentCosts,
    totalMortgageCost,
    totalRentCost,
    equityAnalysis,
    investmentAnalysis,
    taxAnalysis
  });
  
  // Calculate worst and best case scenarios
  const worstCaseScenario = Math.min(...scenarios.map(s => s.savings));
  const bestCaseScenario = Math.max(...scenarios.map(s => s.savings));
  
  // Generate market analysis
  const marketAnalysis = generateMarketAnalysis(inputs, totalCostDifference);
  
  return {
    // Core Metrics
    recommendation,
    monthlyCostDifference,
    breakEvenMonths: breakEvenAnalysis.breakEvenMonths,
    totalCostDifference,
    equityBuildUp: equityAnalysis.equityBuildUp,
    opportunityCost: investmentAnalysis.opportunityCost,
    riskScore,
    probabilityOfBenefit,
    
    // Analysis
    analysis,
    
    // Additional Metrics
    monthlyMortgagePayment,
    monthlyRentPayment: monthlyRentCosts,
    annualCostDifference: monthlyCostDifference * 12,
    costSavings,
    totalMortgageCost,
    totalRentCost,
    breakEvenPoint: breakEvenAnalysis.breakEvenPoint,
    breakEvenYears: breakEvenAnalysis.breakEvenYears,
    breakEvenPropertyValue: breakEvenAnalysis.breakEvenPropertyValue,
    equityPercentage: equityAnalysis.equityPercentage,
    totalEquity: equityAnalysis.totalEquity,
    equityGrowth: equityAnalysis.equityGrowth,
    investmentGrowth: investmentAnalysis.investmentGrowth,
    totalInvestmentValue: investmentAnalysis.totalInvestmentValue,
    netInvestmentBenefit: investmentAnalysis.netInvestmentBenefit,
    mortgageTaxDeduction: taxAnalysis.mortgageTaxDeduction,
    rentTaxDeduction: taxAnalysis.rentTaxDeduction,
    taxBenefit: taxAnalysis.taxBenefit,
    afterTaxCost: taxAnalysis.afterTaxCost,
    monthlyCashFlow: cashFlowAnalysis.monthlyCashFlow,
    annualCashFlow: cashFlowAnalysis.annualCashFlow,
    totalCashFlow: cashFlowAnalysis.totalCashFlow,
    cashFlowImprovement: cashFlowAnalysis.cashFlowImprovement,
    sensitivityMatrix,
    scenarios,
    timelineAnalysis,
    comparisonAnalysis,
    worstCaseScenario,
    bestCaseScenario,
    marketAnalysis,
  };
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

function calculateTotalMortgageCost(inputs: MortgageVsRentInputs, monthlyCosts: number): number {
  let totalCost = 0;
  let remainingBalance = inputs.loanAmount;
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numberOfPayments = inputs.loanTerm * 12;
  
  // Calculate total payments over analysis period
  const analysisPayments = Math.min(inputs.analysisPeriod * 12, numberOfPayments);
  
  for (let month = 1; month <= analysisPayments; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm) - interestPayment;
    
    totalCost += monthlyCosts;
    remainingBalance -= principalPayment;
  }
  
  // Add closing costs
  totalCost += inputs.closingCosts;
  
  return totalCost;
}

function calculateTotalRentCost(inputs: MortgageVsRentInputs): number {
  let totalCost = 0;
  let currentRent = inputs.monthlyRent;
  
  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    totalCost += currentRent * 12 + inputs.rentersInsurance;
    currentRent *= (1 + inputs.rentIncreaseRate / 100);
  }
  
  return totalCost;
}

function calculateBreakEvenAnalysis(inputs: MortgageVsRentInputs, monthlyCostDifference: number): {
  breakEvenPoint: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  breakEvenPropertyValue: number;
} {
  if (monthlyCostDifference >= 0) {
    // Rent is more expensive, mortgage breaks even immediately
    return {
      breakEvenPoint: 0,
      breakEvenMonths: 0,
      breakEvenYears: 0,
      breakEvenPropertyValue: inputs.propertyValue
    };
  }
  
  // Calculate break-even point considering closing costs and equity buildup
  const closingCosts = inputs.closingCosts;
  const monthlySavings = Math.abs(monthlyCostDifference);
  
  // Simple break-even calculation
  const breakEvenMonths = closingCosts / monthlySavings;
  const breakEvenYears = breakEvenMonths / 12;
  
  // Calculate property value at break-even
  const appreciationFactor = Math.pow(1 + inputs.propertyAppreciationRate / 100, breakEvenYears);
  const breakEvenPropertyValue = inputs.propertyValue * appreciationFactor;
  
  return {
    breakEvenPoint: closingCosts,
    breakEvenMonths,
    breakEvenYears,
    breakEvenPropertyValue
  };
}

function calculateEquityAnalysis(inputs: MortgageVsRentInputs): {
  equityBuildUp: number;
  equityPercentage: number;
  totalEquity: number;
  equityGrowth: number;
} {
  let remainingBalance = inputs.loanAmount;
  let totalEquity = inputs.downPayment;
  const monthlyRate = inputs.interestRate / 100 / 12;
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  
  // Calculate equity buildup over analysis period
  const analysisPayments = Math.min(inputs.analysisPeriod * 12, inputs.loanTerm * 12);
  
  for (let month = 1; month <= analysisPayments; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    remainingBalance -= principalPayment;
    totalEquity = inputs.propertyValue - remainingBalance;
  }
  
  // Add property appreciation
  const appreciationFactor = Math.pow(1 + inputs.propertyAppreciationRate / 100, inputs.analysisPeriod);
  const appreciatedValue = inputs.propertyValue * appreciationFactor;
  totalEquity = appreciatedValue - remainingBalance;
  
  const equityBuildUp = totalEquity - inputs.downPayment;
  const equityPercentage = (totalEquity / appreciatedValue) * 100;
  const equityGrowth = (equityBuildUp / inputs.downPayment) * 100;
  
  return {
    equityBuildUp,
    equityPercentage,
    totalEquity,
    equityGrowth
  };
}

function calculateInvestmentAnalysis(inputs: MortgageVsRentInputs): {
  opportunityCost: number;
  investmentGrowth: number;
  totalInvestmentValue: number;
  netInvestmentBenefit: number;
} {
  // Calculate opportunity cost of down payment
  const downPaymentOpportunityCost = inputs.downPayment * 
    Math.pow(1 + inputs.investmentReturnRate / 100, inputs.analysisPeriod);
  
  // Calculate monthly investment opportunity
  const monthlyInvestmentOpportunity = Math.abs(
    calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm) - inputs.monthlyRent
  );
  
  let totalInvestmentValue = 0;
  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    const yearlyInvestment = monthlyInvestmentOpportunity * 12;
    const investmentGrowth = yearlyInvestment * Math.pow(1 + inputs.investmentReturnRate / 100, inputs.analysisPeriod - year);
    totalInvestmentValue += investmentGrowth;
  }
  
  const opportunityCost = downPaymentOpportunityCost + totalInvestmentValue;
  const investmentGrowth = totalInvestmentValue;
  const netInvestmentBenefit = totalInvestmentValue - downPaymentOpportunityCost;
  
  return {
    opportunityCost,
    investmentGrowth,
    totalInvestmentValue,
    netInvestmentBenefit
  };
}

function calculateTaxAnalysis(inputs: MortgageVsRentInputs, monthlyPayment: number): {
  mortgageTaxDeduction: number;
  rentTaxDeduction: number;
  taxBenefit: number;
  afterTaxCost: number;
} {
  // Calculate mortgage interest deduction
  let totalInterest = 0;
  let remainingBalance = inputs.loanAmount;
  const monthlyRate = inputs.interestRate / 100 / 12;
  const analysisPayments = Math.min(inputs.analysisPeriod * 12, inputs.loanTerm * 12);
  
  for (let month = 1; month <= analysisPayments; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    totalInterest += interestPayment;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
  }
  
  const mortgageTaxDeduction = totalInterest * (inputs.borrowerTaxRate / 100);
  const rentTaxDeduction = 0; // Rent is not tax deductible for most people
  const taxBenefit = mortgageTaxDeduction - rentTaxDeduction;
  const afterTaxCost = totalInterest - mortgageTaxDeduction;
  
  return {
    mortgageTaxDeduction,
    rentTaxDeduction,
    taxBenefit,
    afterTaxCost
  };
}

function calculateCashFlowAnalysis(inputs: MortgageVsRentInputs, monthlyCostDifference: number): {
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashFlow: number;
  cashFlowImprovement: number;
} {
  const monthlyCashFlow = monthlyCostDifference;
  const annualCashFlow = monthlyCashFlow * 12;
  const totalCashFlow = annualCashFlow * inputs.analysisPeriod;
  const cashFlowImprovement = totalCashFlow;
  
  return {
    monthlyCashFlow,
    annualCashFlow,
    totalCashFlow,
    cashFlowImprovement
  };
}

function calculateRiskScore(inputs: MortgageVsRentInputs, monthlyCostDifference: number, breakEvenMonths: number): number {
  let riskScore = 50; // Base risk score
  
  // Market condition risk
  switch (inputs.marketCondition) {
    case 'declining': riskScore += 20; break;
    case 'stable': riskScore += 0; break;
    case 'growing': riskScore -= 10; break;
    case 'hot': riskScore -= 20; break;
  }
  
  // Location stability risk
  switch (inputs.locationStability) {
    case 'unstable': riskScore += 15; break;
    case 'moderate': riskScore += 5; break;
    case 'stable': riskScore -= 5; break;
  }
  
  // Expected stay duration risk
  if (inputs.expectedStayDuration < 3) riskScore += 20;
  else if (inputs.expectedStayDuration < 5) riskScore += 10;
  else if (inputs.expectedStayDuration > 10) riskScore -= 10;
  
  // Break-even risk
  if (breakEvenMonths > 60) riskScore += 15;
  else if (breakEvenMonths > 36) riskScore += 10;
  else if (breakEvenMonths < 12) riskScore -= 10;
  
  // Monthly cost difference risk
  if (monthlyCostDifference > 500) riskScore += 15;
  else if (monthlyCostDifference < -500) riskScore -= 15;
  
  // Credit score risk
  if (inputs.borrowerCreditScore < 650) riskScore += 10;
  else if (inputs.borrowerCreditScore > 750) riskScore -= 10;
  
  // DTI risk
  if (inputs.borrowerDebtToIncomeRatio > 45) riskScore += 15;
  else if (inputs.borrowerDebtToIncomeRatio < 30) riskScore -= 10;
  
  return Math.max(0, Math.min(100, riskScore));
}

function calculateProbabilityOfBenefit(inputs: MortgageVsRentInputs, totalCostDifference: number, riskScore: number): number {
  let probability = 50; // Base probability
  
  // Cost difference impact
  if (totalCostDifference < -100000) probability += 30;
  else if (totalCostDifference < -50000) probability += 20;
  else if (totalCostDifference < -10000) probability += 10;
  else if (totalCostDifference > 50000) probability -= 20;
  else if (totalCostDifference > 100000) probability -= 30;
  
  // Risk score impact
  if (riskScore < 30) probability += 20;
  else if (riskScore < 50) probability += 10;
  else if (riskScore > 70) probability -= 20;
  else if (riskScore > 80) probability -= 30;
  
  // Market condition impact
  switch (inputs.marketCondition) {
    case 'declining': probability -= 15; break;
    case 'stable': probability += 0; break;
    case 'growing': probability += 10; break;
    case 'hot': probability += 20; break;
  }
  
  // Property appreciation impact
  if (inputs.propertyAppreciationRate > 5) probability += 15;
  else if (inputs.propertyAppreciationRate > 3) probability += 10;
  else if (inputs.propertyAppreciationRate < 1) probability -= 15;
  
  return Math.max(0, Math.min(100, probability));
}

function generateRecommendation(inputs: MortgageVsRentInputs, metrics: any): string {
  const { monthlyCostDifference, totalCostDifference, breakEvenAnalysis, equityAnalysis, riskScore, probabilityOfBenefit } = metrics;
  
  // Strong buy signals
  if (totalCostDifference < -100000 && probabilityOfBenefit > 70 && riskScore < 40) {
    return 'Buy';
  }
  
  // Strong rent signals
  if (totalCostDifference > 100000 && probabilityOfBenefit < 30 && riskScore > 70) {
    return 'Rent';
  }
  
  // Moderate buy signals
  if (totalCostDifference < -50000 && probabilityOfBenefit > 60 && riskScore < 50) {
    return 'Consider Buying';
  }
  
  // Moderate rent signals
  if (totalCostDifference > 50000 && probabilityOfBenefit < 40 && riskScore > 60) {
    return 'Consider Renting';
  }
  
  // Default to requires review
  return 'Requires Review';
}

function generateAnalysis(inputs: MortgageVsRentInputs, metrics: any): MortgageVsRentAnalysis {
  const recommendation = generateRecommendation(inputs, metrics);
  
  // Generate key insights based on the data
  const keyStrengths = [];
  const keyWeaknesses = [];
  const valueFactors = [];
  const opportunities = [];
  
  if (metrics.totalCostDifference < 0) {
    keyStrengths.push('Significant long-term cost savings with homeownership');
    valueFactors.push('Lower total cost of ownership');
  } else {
    keyWeaknesses.push('Higher total cost compared to renting');
  }
  
  if (metrics.equityAnalysis.equityBuildUp > 50000) {
    keyStrengths.push('Strong equity building potential');
    valueFactors.push('Equity accumulation over time');
  }
  
  if (metrics.riskScore < 40) {
    keyStrengths.push('Low risk profile for homeownership');
  } else if (metrics.riskScore > 70) {
    keyWeaknesses.push('High risk factors present');
  }
  
  if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') {
    opportunities.push('Favorable market conditions for appreciation');
  }
  
  if (inputs.expectedStayDuration < 3) {
    keyWeaknesses.push('Short expected stay duration may not justify buying');
  }
  
  // Generate optimization suggestions
  const optimizationSuggestions = [
    'Consider different down payment amounts to optimize costs',
    'Explore different loan terms to find optimal payment structure',
    'Research local market trends for better timing',
    'Compare multiple properties to find best value'
  ];
  
  // Generate next steps
  const nextSteps = [
    'Consult with a mortgage professional',
    'Get pre-approved for financing',
    'Research local market conditions',
    'Calculate additional costs (maintenance, utilities)',
    'Consider tax implications'
  ];
  
  return {
    recommendation,
    valueRating: metrics.totalCostDifference < -50000 ? 'High Value' : 
                 metrics.totalCostDifference < -10000 ? 'Good Value' : 
                 metrics.totalCostDifference < 10000 ? 'Moderate Value' : 'Low Value',
    confidenceRating: metrics.probabilityOfBenefit > 70 ? 'High' : 
                      metrics.probabilityOfBenefit > 50 ? 'Medium' : 'Low',
    keyStrengths,
    keyWeaknesses,
    valueFactors,
    opportunities,
    costSummary: `Total cost difference over ${inputs.analysisPeriod} years: ${metrics.totalCostDifference > 0 ? 'Renting costs more' : 'Buying costs more'}`,
    paymentAnalysis: `Monthly payment difference: ${metrics.monthlyCostDifference > 0 ? 'Rent is more expensive' : 'Mortgage is more expensive'}`,
    totalCostAnalysis: `Long-term cost analysis shows ${Math.abs(metrics.totalCostDifference).toLocaleString()} difference`,
    breakEvenSummary: `Break-even point: ${metrics.breakEvenAnalysis.breakEvenMonths.toFixed(0)} months`,
    timelineAnalysis: `Timeline analysis covers ${inputs.analysisPeriod} years`,
    riskAnalysis: `Risk assessment score: ${metrics.riskScore}/100`,
    equitySummary: `Equity building potential: ${metrics.equityAnalysis.equityBuildUp.toLocaleString()}`,
    equityGrowthAnalysis: `Equity growth rate: ${metrics.equityAnalysis.equityGrowth.toFixed(1)}%`,
    investmentAnalysis: `Investment opportunity cost: ${metrics.investmentAnalysis.opportunityCost.toLocaleString()}`,
    taxSummary: `Tax benefits: ${metrics.taxAnalysis.taxBenefit.toLocaleString()}`,
    deductionAnalysis: `Mortgage interest deduction: ${metrics.taxAnalysis.mortgageTaxDeduction.toLocaleString()}`,
    benefitAnalysis: `After-tax cost analysis completed`,
    cashFlowSummary: `Cash flow impact: ${metrics.cashFlowAnalysis.monthlyCashFlow.toLocaleString()}/month`,
    savingsAnalysis: `Monthly savings potential: ${Math.abs(metrics.monthlyCostDifference).toLocaleString()}`,
    improvementAnalysis: `Cash flow improvement over time`,
    marketSummary: `Market condition: ${inputs.marketCondition}`,
    appreciationAnalysis: `Property appreciation rate: ${inputs.propertyAppreciationRate}%`,
    rentAnalysis: `Rent growth rate: ${inputs.rentIncreaseRate}%`,
    riskAssessment: `Comprehensive risk assessment completed`,
    marketRisk: `Market risk factors evaluated`,
    financialRisk: `Financial risk factors analyzed`,
    lifestyleRisk: `Lifestyle factors considered`,
    buyRecommendations: ['Get pre-approved', 'Research neighborhoods', 'Calculate all costs'],
    rentRecommendations: ['Negotiate rent terms', 'Consider longer lease', 'Research rent control'],
    optimizationSuggestions,
    implementationPlan: 'Step-by-step implementation plan based on recommendation',
    nextSteps,
    timeline: `${inputs.analysisPeriod}-year analysis timeline`,
    monitoringPlan: 'Regular monitoring of market conditions and costs',
    keyMetrics: ['Monthly payment difference', 'Total cost difference', 'Break-even point', 'Risk score'],
    reviewSchedule: 'Annual review of decision factors',
    riskManagement: 'Risk management strategies identified',
    mitigationStrategies: ['Diversify investments', 'Maintain emergency fund', 'Monitor market conditions'],
    contingencyPlans: ['Sell property if needed', 'Refinance if rates improve', 'Rent out if necessary'],
    performanceBenchmarks: [
      {
        metric: 'Total Cost Difference',
        target: -50000,
        benchmark: metrics.totalCostDifference,
        industry: 'Real Estate'
      }
    ],
    decisionRecommendation: recommendation,
    presentationPoints: [
      'Cost comparison analysis',
      'Risk assessment results',
      'Market condition analysis',
      'Timeline considerations'
    ],
    decisionFactors: [
      'Financial capacity',
      'Market conditions',
      'Lifestyle preferences',
      'Risk tolerance'
    ]
  };
}

function generateSensitivityAnalysis(inputs: MortgageVsRentInputs, baseTotalCostDifference: number): any[] {
  const variables = [
    { name: 'Interest Rate', base: inputs.interestRate, range: [-1, 0, 1, 2] },
    { name: 'Property Appreciation', base: inputs.propertyAppreciationRate, range: [-2, -1, 0, 1, 2] },
    { name: 'Rent Increase Rate', base: inputs.rentIncreaseRate, range: [-1, 0, 1, 2] },
    { name: 'Investment Return Rate', base: inputs.investmentReturnRate, range: [-2, -1, 0, 1, 2] }
  ];
  
  return variables.map(variable => {
    const impacts = variable.range.map(change => {
      const modifiedInputs = { ...inputs };
      if (variable.name === 'Interest Rate') modifiedInputs.interestRate = variable.base + change;
      if (variable.name === 'Property Appreciation') modifiedInputs.propertyAppreciationRate = variable.base + change;
      if (variable.name === 'Rent Increase Rate') modifiedInputs.rentIncreaseRate = variable.base + change;
      if (variable.name === 'Investment Return Rate') modifiedInputs.investmentReturnRate = variable.base + change;
      
      const result = calculateMortgageVsRent(modifiedInputs);
      return result.totalCostDifference;
    });
    
    return {
      variable: variable.name,
      values: variable.range.map(v => variable.base + v),
      impacts
    };
  });
}

function generateScenarioAnalysis(inputs: MortgageVsRentInputs, baseTotalCostDifference: number): any[] {
  const scenarios = [
    {
      scenario: 'Optimistic',
      probability: 25,
      description: 'Strong market growth, low interest rates'
    },
    {
      scenario: 'Base Case',
      probability: 50,
      description: 'Current market conditions continue'
    },
    {
      scenario: 'Pessimistic',
      probability: 25,
      description: 'Market decline, higher costs'
    }
  ];
  
  return scenarios.map(scenario => {
    let modifiedInputs = { ...inputs };
    
    if (scenario.scenario === 'Optimistic') {
      modifiedInputs.propertyAppreciationRate += 2;
      modifiedInputs.interestRate -= 1;
      modifiedInputs.rentIncreaseRate -= 1;
      modifiedInputs.investmentReturnRate += 2;
    } else if (scenario.scenario === 'Pessimistic') {
      modifiedInputs.propertyAppreciationRate -= 2;
      modifiedInputs.interestRate += 1;
      modifiedInputs.rentIncreaseRate += 1;
      modifiedInputs.investmentReturnRate -= 2;
    }
    
    const result = calculateMortgageVsRent(modifiedInputs);
    
    return {
      scenario: scenario.scenario,
      probability: scenario.probability,
      mortgageCost: result.totalMortgageCost,
      rentCost: result.totalRentCost,
      savings: result.costSavings
    };
  });
}

function generateTimelineAnalysis(inputs: MortgageVsRentInputs, monthlyMortgageCosts: number, monthlyRentCosts: number): any[] {
  const timeline = [];
  let currentRent = inputs.monthlyRent;
  let remainingBalance = inputs.loanAmount;
  const monthlyRate = inputs.interestRate / 100 / 12;
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  
  for (let year = 1; year <= Math.min(inputs.analysisPeriod, 10); year++) {
    // Calculate mortgage costs for the year
    let yearlyMortgageCost = 0;
    for (let month = 1; month <= 12; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      yearlyMortgageCost += monthlyMortgageCosts;
    }
    
    // Calculate rent costs for the year
    const yearlyRentCost = currentRent * 12 + inputs.rentersInsurance;
    currentRent *= (1 + inputs.rentIncreaseRate / 100);
    
    // Calculate equity
    const equity = inputs.propertyValue - remainingBalance;
    
    // Calculate investment value
    const monthlyDifference = monthlyRentCosts - monthlyMortgageCosts;
    const investmentValue = monthlyDifference > 0 ? 
      monthlyDifference * 12 * Math.pow(1 + inputs.investmentReturnRate / 100, year) : 0;
    
    const netBenefit = yearlyRentCost - yearlyMortgageCost + equity + investmentValue;
    
    timeline.push({
      year,
      mortgageCost: yearlyMortgageCost,
      rentCost: yearlyRentCost,
      equity,
      investment: investmentValue,
      netBenefit
    });
  }
  
  return timeline;
}

function generateComparisonAnalysis(inputs: MortgageVsRentInputs, metrics: any): any[] {
  return [
    {
      metric: 'Monthly Payment',
      mortgage: metrics.monthlyMortgageCosts,
      rent: metrics.monthlyRentCosts,
      difference: metrics.monthlyRentCosts - metrics.monthlyMortgageCosts,
      advantage: metrics.monthlyRentCosts < metrics.monthlyMortgageCosts ? 'Rent' : 'Mortgage'
    },
    {
      metric: 'Total Cost (30 Years)',
      mortgage: metrics.totalMortgageCost,
      rent: metrics.totalRentCost,
      difference: metrics.totalRentCost - metrics.totalMortgageCost,
      advantage: metrics.totalRentCost < metrics.totalMortgageCost ? 'Rent' : 'Mortgage'
    },
    {
      metric: 'Equity Building',
      mortgage: metrics.equityAnalysis.totalEquity,
      rent: 0,
      difference: metrics.equityAnalysis.totalEquity,
      advantage: 'Mortgage'
    },
    {
      metric: 'Investment Opportunity',
      mortgage: 0,
      rent: metrics.investmentAnalysis.totalInvestmentValue,
      difference: -metrics.investmentAnalysis.totalInvestmentValue,
      advantage: 'Rent'
    },
    {
      metric: 'Tax Benefits',
      mortgage: metrics.taxAnalysis.mortgageTaxDeduction,
      rent: metrics.taxAnalysis.rentTaxDeduction,
      difference: metrics.taxAnalysis.mortgageTaxDeduction - metrics.taxAnalysis.rentTaxDeduction,
      advantage: 'Mortgage'
    }
  ];
}

function generateMarketAnalysis(inputs: MortgageVsRentInputs, totalCostDifference: number): any[] {
  return [
    {
      factor: 'Property Appreciation',
      mortgageImpact: inputs.propertyAppreciationRate * 1000,
      rentImpact: 0,
      netImpact: inputs.propertyAppreciationRate * 1000
    },
    {
      factor: 'Rent Growth',
      mortgageImpact: 0,
      rentImpact: -inputs.rentIncreaseRate * 1000,
      netImpact: inputs.rentIncreaseRate * 1000
    },
    {
      factor: 'Interest Rate Changes',
      mortgageImpact: inputs.interestRate > 5 ? -5000 : 5000,
      rentImpact: 0,
      netImpact: inputs.interestRate > 5 ? -5000 : 5000
    },
    {
      factor: 'Market Conditions',
      mortgageImpact: inputs.marketCondition === 'hot' ? 10000 : 
                     inputs.marketCondition === 'growing' ? 5000 : 
                     inputs.marketCondition === 'stable' ? 0 : -5000,
      rentImpact: 0,
      netImpact: inputs.marketCondition === 'hot' ? 10000 : 
                 inputs.marketCondition === 'growing' ? 5000 : 
                 inputs.marketCondition === 'stable' ? 0 : -5000
    }
  ];
}