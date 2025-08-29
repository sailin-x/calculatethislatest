import { HomeAffordabilityInputs, HomeAffordabilityMetrics, HomeAffordabilityAnalysis } from './types';

export function calculateHomeAffordability(inputs: HomeAffordabilityInputs): HomeAffordabilityMetrics {
  // Calculate monthly interest rate
  const monthlyInterestRate = inputs.interestRate / 100 / 12;
  const numberOfPayments = inputs.loanTerm * 12;
  
  // Calculate payment factor
  const paymentFactor = (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
                       (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  
  // Calculate maximum monthly housing payment based on front-end ratio
  const maxMonthlyHousingPayment = inputs.monthlyIncome * (inputs.maxFrontEndRatio / 100);
  
  // Calculate maximum loan amount based on payment
  const maxLoanAmount = maxMonthlyHousingPayment / paymentFactor;
  
  // Calculate maximum home price
  const maxHomePrice = maxLoanAmount / (1 - inputs.downPaymentPercentage / 100);
  
  // Calculate actual loan amount
  const actualLoanAmount = maxHomePrice * (1 - inputs.downPaymentPercentage / 100);
  
  // Calculate monthly payments
  const monthlyPrincipalInterest = actualLoanAmount * paymentFactor;
  const monthlyPropertyTax = (maxHomePrice * inputs.propertyTaxRate / 100) / 12;
  const monthlyInsurance = (maxHomePrice * inputs.homeownersInsuranceRate / 100) / 12;
  const monthlyPMI = inputs.downPaymentPercentage < 20 ? (actualLoanAmount * inputs.pmiRate / 100) / 12 : 0;
  const monthlyHOA = inputs.hoaFees;
  const totalMonthlyPayment = monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
  
  // Calculate financial ratios
  const actualDTI = ((inputs.monthlyDebtPayments + totalMonthlyPayment) / inputs.monthlyIncome) * 100;
  const actualFrontEndRatio = (totalMonthlyPayment / inputs.monthlyIncome) * 100;
  const actualBackEndRatio = actualDTI;
  const housingExpenseRatio = (totalMonthlyPayment / inputs.monthlyIncome) * 100;
  
  // Calculate cost of ownership
  const annualCostOfOwnership = totalMonthlyPayment * 12 + inputs.maintenanceReserve;
  const totalCostOfOwnership = annualCostOfOwnership * inputs.analysisPeriod;
  const costPerSquareFoot = maxHomePrice / 2000; // Assuming 2000 sq ft average
  
  // Calculate cash flow
  const monthlyCashFlow = inputs.monthlyIncome - inputs.monthlyDebtPayments - totalMonthlyPayment;
  const annualCashFlow = monthlyCashFlow * 12;
  const emergencyFundMonths = inputs.liquidAssets / monthlyCashFlow;
  const savingsRate = (monthlyCashFlow / inputs.monthlyIncome) * 100;
  
  // Calculate affordability score
  const affordabilityScore = calculateAffordabilityScore(inputs, totalMonthlyPayment, actualDTI);
  
  // Determine risk level
  const riskLevel = determineRiskLevel(affordabilityScore, actualDTI, actualFrontEndRatio);
  
  // Calculate stress test result
  const stressTestResult = calculateStressTest(inputs, totalMonthlyPayment);
  
  // Calculate market metrics
  const priceToIncomeRatio = maxHomePrice / inputs.annualIncome;
  const rentToPriceRatio = (inputs.medianHomePrice * 0.04) / inputs.medianHomePrice; // Assuming 4% annual rent
  const marketAffordabilityIndex = calculateMarketAffordabilityIndex(inputs);
  
  // Calculate sensitivity matrix
  const sensitivityMatrix = calculateSensitivityMatrix(inputs, maxHomePrice);
  
  // Calculate scenarios
  const scenarios = calculateScenarios(inputs, maxHomePrice);
  
  // Calculate affordability timeline
  const affordabilityTimeline = calculateAffordabilityTimeline(inputs, maxHomePrice);
  
  return {
    // Affordability Analysis
    maxHomePrice,
    maxLoanAmount: actualLoanAmount,
    maxMonthlyPayment: maxMonthlyHousingPayment,
    maxDownPayment: maxHomePrice * (inputs.downPaymentPercentage / 100),
    
    // Payment Analysis
    monthlyPrincipalInterest,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyPMI,
    monthlyHOA,
    totalMonthlyPayment,
    
    // Cost Analysis
    totalCostOfOwnership,
    annualCostOfOwnership,
    costPerSquareFoot,
    
    // Financial Ratios
    actualDTI,
    actualFrontEndRatio,
    actualBackEndRatio,
    housingExpenseRatio,
    
    // Cash Flow Analysis
    monthlyCashFlow,
    annualCashFlow,
    emergencyFundMonths,
    savingsRate,
    
    // Risk Metrics
    affordabilityScore,
    riskLevel,
    stressTestResult,
    
    // Market Analysis
    priceToIncomeRatio,
    rentToPriceRatio,
    marketAffordabilityIndex,
    
    // Sensitivity Analysis
    sensitivityMatrix,
    
    // Scenario Analysis
    scenarios,
    
    // Affordability Timeline
    affordabilityTimeline
  };
}

function calculateAffordabilityScore(inputs: HomeAffordabilityInputs, monthlyPayment: number, dti: number): number {
  let score = 5; // Base score
  
  // Income factor (30% weight)
  const incomeScore = Math.min(inputs.annualIncome / 50000, 3); // Max 3 points for income
  score += incomeScore * 0.3;
  
  // Debt-to-income factor (25% weight)
  if (dti <= 28) score += 2.5;
  else if (dti <= 36) score += 1.5;
  else if (dti <= 43) score += 0.5;
  else score -= 1;
  
  // Down payment factor (20% weight)
  const downPaymentScore = Math.min(inputs.downPaymentPercentage / 20, 2); // Max 2 points for 20%+ down
  score += downPaymentScore * 0.2;
  
  // Credit score factor (15% weight)
  if (inputs.creditScore >= 760) score += 1.5;
  else if (inputs.creditScore >= 700) score += 1;
  else if (inputs.creditScore >= 650) score += 0.5;
  else score -= 0.5;
  
  // Assets factor (10% weight)
  const assetsScore = Math.min(inputs.totalAssets / 100000, 1); // Max 1 point for $100k+ assets
  score += assetsScore * 0.1;
  
  return Math.min(Math.max(score, 1), 10);
}

function determineRiskLevel(affordabilityScore: number, dti: number, frontEndRatio: number): 'low' | 'medium' | 'high' | 'very_high' {
  if (affordabilityScore >= 8 && dti <= 28 && frontEndRatio <= 25) return 'low';
  if (affordabilityScore >= 6 && dti <= 36 && frontEndRatio <= 28) return 'medium';
  if (affordabilityScore >= 4 && dti <= 43 && frontEndRatio <= 31) return 'high';
  return 'very_high';
}

function calculateStressTest(inputs: HomeAffordabilityInputs, monthlyPayment: number): number {
  // Test with 2% higher interest rate
  const stressRate = inputs.interestRate + 2;
  const stressMonthlyRate = stressRate / 100 / 12;
  const numberOfPayments = inputs.loanTerm * 12;
  
  const stressPaymentFactor = (stressMonthlyRate * Math.pow(1 + stressMonthlyRate, numberOfPayments)) / 
                             (Math.pow(1 + stressMonthlyRate, numberOfPayments) - 1);
  
  const maxLoanAmount = inputs.maxLoanAmount || 300000;
  const stressPayment = maxLoanAmount * stressPaymentFactor;
  
  return stressPayment;
}

function calculateMarketAffordabilityIndex(inputs: HomeAffordabilityInputs): number {
  const priceToIncomeRatio = inputs.medianHomePrice / inputs.annualIncome;
  
  if (priceToIncomeRatio <= 2.5) return 10; // Very affordable
  if (priceToIncomeRatio <= 3.5) return 8; // Affordable
  if (priceToIncomeRatio <= 4.5) return 6; // Moderate
  if (priceToIncomeRatio <= 5.5) return 4; // Expensive
  return 2; // Very expensive
}

function calculateSensitivityMatrix(inputs: HomeAffordabilityInputs, basePrice: number): any[] {
  const variables = [
    { name: 'Interest Rate', base: inputs.interestRate, range: [-1, 1] },
    { name: 'Income', base: inputs.annualIncome, range: [-10, 10] },
    { name: 'Down Payment', base: inputs.downPaymentPercentage, range: [-5, 5] },
    { name: 'Monthly Debt', base: inputs.monthlyDebtPayments, range: [-20, 20] }
  ];
  
  return variables.map(variable => {
    const values = [];
    const impacts = [];
    
    for (let i = variable.range[0]; i <= variable.range[1]; i++) {
      const testInputs = { ...inputs };
      const adjustment = 1 + (i / 100);
      
      if (variable.name === 'Interest Rate') {
        testInputs.interestRate = variable.base + i;
      } else if (variable.name === 'Income') {
        testInputs.annualIncome = variable.base * adjustment;
        testInputs.monthlyIncome = testInputs.annualIncome / 12;
      } else if (variable.name === 'Down Payment') {
        testInputs.downPaymentPercentage = variable.base + i;
      } else if (variable.name === 'Monthly Debt') {
        testInputs.monthlyDebtPayments = variable.base * adjustment;
      }
      
      const testMetrics = calculateHomeAffordability(testInputs);
      values.push(variable.base + i);
      impacts.push(testMetrics.maxHomePrice);
    }
    
    return {
      variable: variable.name,
      values,
      impacts
    };
  });
}

function calculateScenarios(inputs: HomeAffordabilityInputs, basePrice: number): any[] {
  return [
    {
      scenario: 'Best Case',
      probability: 20,
      maxPrice: basePrice * 1.2,
      monthlyPayment: inputs.maxMonthlyPayment * 1.1
    },
    {
      scenario: 'Base Case',
      probability: 60,
      maxPrice: basePrice,
      monthlyPayment: inputs.maxMonthlyPayment
    },
    {
      scenario: 'Worst Case',
      probability: 20,
      maxPrice: basePrice * 0.8,
      monthlyPayment: inputs.maxMonthlyPayment * 0.9
    }
  ];
}

function calculateAffordabilityTimeline(inputs: HomeAffordabilityInputs, basePrice: number): any[] {
  const timeline = [];
  
  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    const futureIncome = inputs.annualIncome * Math.pow(1 + inputs.incomeGrowthRate / 100, year);
    const futureMonthlyIncome = futureIncome / 12;
    const futureMaxPayment = futureMonthlyIncome * (inputs.maxFrontEndRatio / 100);
    
    const futurePrice = basePrice * Math.pow(1 + inputs.propertyAppreciationRate / 100, year);
    const futureScore = calculateAffordabilityScore(inputs, futureMaxPayment, inputs.debtToIncomeRatio);
    
    timeline.push({
      year,
      maxPrice: futurePrice,
      monthlyPayment: futureMaxPayment,
      affordabilityScore: futureScore
    });
  }
  
  return timeline;
}

export function generateHomeAffordabilityReport(
  inputs: HomeAffordabilityInputs, 
  metrics: HomeAffordabilityMetrics
): HomeAffordabilityAnalysis {
  // Determine affordability rating
  let affordabilityRating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor';
  if (metrics.affordabilityScore >= 8) affordabilityRating = 'Excellent';
  else if (metrics.affordabilityScore >= 6) affordabilityRating = 'Good';
  else if (metrics.affordabilityScore >= 4) affordabilityRating = 'Fair';
  else if (metrics.affordabilityScore >= 2) affordabilityRating = 'Poor';
  else affordabilityRating = 'Very Poor';
  
  // Determine risk rating
  let riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  if (metrics.riskLevel === 'low') riskRating = 'Low';
  else if (metrics.riskLevel === 'medium') riskRating = 'Moderate';
  else if (metrics.riskLevel === 'high') riskRating = 'High';
  else riskRating = 'Very High';
  
  // Determine recommendation
  let recommendation: 'Buy Now' | 'Wait and Save' | 'Consider Renting' | 'Adjust Expectations' | 'Seek Assistance';
  if (metrics.affordabilityScore >= 7 && metrics.actualDTI <= 36) recommendation = 'Buy Now';
  else if (metrics.affordabilityScore >= 5 && metrics.actualDTI <= 43) recommendation = 'Wait and Save';
  else if (metrics.affordabilityScore >= 3) recommendation = 'Consider Renting';
  else if (metrics.affordabilityScore >= 1) recommendation = 'Adjust Expectations';
  else recommendation = 'Seek Assistance';
  
  // Generate key insights
  const keyStrengths = [];
  const keyWeaknesses = [];
  const riskFactors = [];
  const opportunities = [];
  
  if (metrics.affordabilityScore >= 7) keyStrengths.push('Strong affordability position');
  if (metrics.actualDTI <= 28) keyStrengths.push('Low debt-to-income ratio');
  if (inputs.downPaymentPercentage >= 20) keyStrengths.push('Strong down payment');
  if (inputs.creditScore >= 700) keyStrengths.push('Good credit score');
  if (inputs.totalAssets >= 100000) keyStrengths.push('Strong asset position');
  
  if (metrics.affordabilityScore < 5) keyWeaknesses.push('Limited affordability');
  if (metrics.actualDTI > 43) keyWeaknesses.push('High debt-to-income ratio');
  if (inputs.downPaymentPercentage < 10) keyWeaknesses.push('Small down payment');
  if (inputs.creditScore < 650) keyWeaknesses.push('Poor credit score');
  if (inputs.totalAssets < 50000) keyWeaknesses.push('Limited assets');
  
  if (metrics.actualDTI > 43) riskFactors.push('High debt burden');
  if (metrics.actualFrontEndRatio > 31) riskFactors.push('High housing expense ratio');
  if (metrics.emergencyFundMonths < 3) riskFactors.push('Insufficient emergency fund');
  if (inputs.employmentType === 'unemployed') riskFactors.push('Unemployment risk');
  if (inputs.marketCondition === 'hot') riskFactors.push('Competitive market conditions');
  
  if (inputs.incomeGrowthRate > 3) opportunities.push('Strong income growth potential');
  if (inputs.propertyAppreciationRate > 3) opportunities.push('Property appreciation potential');
  if (inputs.marketCondition === 'buyer_market') opportunities.push('Buyer-friendly market');
  if (metrics.savingsRate > 20) opportunities.push('Strong savings rate');
  
  return {
    // Executive Summary
    affordabilityRating,
    riskRating,
    recommendation,
    
    // Key Insights
    keyStrengths,
    keyWeaknesses,
    riskFactors,
    opportunities,
    
    // Affordability Analysis
    affordabilitySummary: `You can afford a home up to $${metrics.maxHomePrice.toLocaleString()} with a ${affordabilityRating.toLowerCase()} affordability rating.`,
    priceAnalysis: `The maximum home price of $${metrics.maxHomePrice.toLocaleString()} represents ${metrics.priceToIncomeRatio.toFixed(1)}x your annual income.`,
    paymentAnalysis: `Monthly payments would be $${metrics.totalMonthlyPayment.toLocaleString()} with a ${metrics.actualFrontEndRatio.toFixed(1)}% housing expense ratio.`,
    
    // Financial Analysis
    financialSummary: `Your debt-to-income ratio would be ${metrics.actualDTI.toFixed(1)}% with ${metrics.monthlyCashFlow.toLocaleString()} in monthly cash flow.`,
    debtAnalysis: `Total monthly debt payments would be $${(inputs.monthlyDebtPayments + metrics.totalMonthlyPayment).toLocaleString()}.`,
    cashFlowAnalysis: `You would have $${metrics.annualCashFlow.toLocaleString()} in annual cash flow with ${metrics.emergencyFundMonths.toFixed(1)} months of emergency fund coverage.`,
    
    // Risk Assessment
    riskAssessment: `Overall risk profile is ${riskRating.toLowerCase()} with an affordability score of ${metrics.affordabilityScore}/10.`,
    stressTestAnalysis: `Under stress conditions (2% higher rates), payments would increase to $${metrics.stressTestResult.toLocaleString()}.`,
    marketRiskAnalysis: `Market affordability index is ${metrics.marketAffordabilityIndex}/10 for ${inputs.propertyLocation}.`,
    
    // Market Assessment
    marketAssessment: `Market conditions in ${inputs.propertyLocation} are ${inputs.marketCondition.replace('_', ' ')}.`,
    locationAnalysis: `Median home price is $${inputs.medianHomePrice.toLocaleString()} with ${inputs.averageDaysOnMarket} average days on market.`,
    timingAnalysis: `Current market timing appears ${inputs.marketCondition === 'buyer_market' ? 'favorable' : 'challenging'} for buyers.`,
    
    // Recommendations
    actionRecommendations: [
      'Review your budget and spending habits',
      'Consider increasing your down payment',
      'Pay down existing debt to improve DTI ratio',
      'Improve your credit score if possible'
    ],
    financialRecommendations: [
      'Build emergency fund to 6 months of expenses',
      'Increase retirement savings contributions',
      'Consider additional income sources',
      'Review and optimize debt payments'
    ],
    marketRecommendations: [
      'Research different neighborhoods and markets',
      'Consider alternative property types',
      'Monitor interest rate trends',
      'Work with a qualified real estate agent'
    ],
    
    // Implementation
    implementationPlan: 'Develop a comprehensive home buying strategy based on affordability analysis.',
    nextSteps: [
      'Get pre-approved for a mortgage',
      'Research target neighborhoods',
      'Build additional savings',
      'Improve credit score if needed'
    ],
    timeline: '3-12 months for preparation and home search.',
    
    // Monitoring
    monitoringPlan: 'Regularly review affordability factors and market conditions.',
    keyMetrics: [
      'Income and employment stability',
      'Debt levels and payments',
      'Savings and asset growth',
      'Market conditions and interest rates'
    ],
    reviewSchedule: 'Monthly budget review with quarterly affordability assessment.',
    
    // Risk Management
    riskManagement: 'Implement comprehensive risk management strategy for homeownership.',
    mitigationStrategies: [
      'Maintain adequate emergency fund',
      'Keep debt levels manageable',
      'Monitor housing market trends',
      'Plan for maintenance and repairs'
    ],
    contingencyPlans: [
      'Rental backup plan if needed',
      'Emergency fund for unexpected expenses',
      'Insurance coverage for property protection',
      'Exit strategy if circumstances change'
    ],
    
    // Performance Benchmarks
    performanceBenchmarks: [
      {
        metric: 'DTI Ratio',
        target: 36,
        benchmark: metrics.actualDTI,
        industry: 'Mortgage Lending'
      },
      {
        metric: 'Front-End Ratio',
        target: 28,
        benchmark: metrics.actualFrontEndRatio,
        industry: 'Housing Finance'
      },
      {
        metric: 'Affordability Score',
        target: 7,
        benchmark: metrics.affordabilityScore,
        industry: 'Financial Planning'
      }
    ],
    
    // Decision Support
    decisionRecommendation: `Based on the analysis, we recommend ${recommendation.toLowerCase()}.`,
    presentationPoints: [
      `Maximum affordable home price: $${metrics.maxHomePrice.toLocaleString()}`,
      `Monthly payment: $${metrics.totalMonthlyPayment.toLocaleString()}`,
      `Affordability score: ${metrics.affordabilityScore}/10`,
      `Risk level: ${metrics.riskLevel.replace('_', ' ')}`
    ],
    decisionFactors: [
      'Income and employment stability',
      'Debt levels and ratios',
      'Down payment and assets',
      'Credit score and history',
      'Market conditions',
      'Personal financial goals'
    ]
  };
}
