import { MortgageVsRentInputs, MortgageVsRentOutputs } from './types';

export function calculateMortgageVsRent(inputs: MortgageVsRentInputs): MortgageVsRentOutputs {
  const { 
    propertyValue,
    loanAmount,
    interestRate,
    loanTerm,
    paymentType,
    downPayment,
    downPaymentPercentage,
    monthlyRent,
    annualRent,
    rentIncreaseRate,
    propertyInsurance,
    propertyTaxes,
    hoaFees,
    floodInsurance,
    mortgageInsurance,
    rentersInsurance,
    maintenanceCosts,
    utilityCosts,
    rentIncludesUtilities,
    closingCosts,
    originationFee,
    appraisalFee,
    titleInsuranceFee,
    recordingFee,
    attorneyFee,
    otherFees,
    marketCondition,
    marketGrowthRate,
    propertyAppreciationRate,
    rentGrowthRate,
    borrowerIncome,
    borrowerCreditScore,
    borrowerDebtToIncomeRatio,
    borrowerTaxRate,
    investmentReturnRate,
    inflationRate,
    discountRate,
    analysisPeriod,
    expectedStayDuration,
    flexibilityNeeded,
    maintenancePreference,
    locationStability
  } = inputs;

  // Calculate mortgage payment
  const monthlyRate = interestRate / 12;
  const totalPayments = loanTerm * 12;
  
  let monthlyMortgagePayment = 0;
  if (paymentType === 'principal_interest') {
    monthlyMortgagePayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                           (Math.pow(1 + monthlyRate, totalPayments) - 1);
  } else if (paymentType === 'interest_only') {
    monthlyMortgagePayment = loanAmount * monthlyRate;
  }
  
  // Calculate total monthly mortgage costs
  const totalMonthlyMortgageCost = monthlyMortgagePayment + propertyInsurance + propertyTaxes + 
                                 hoaFees + floodInsurance + mortgageInsurance + maintenanceCosts + 
                                 utilityCosts;
  
  // Calculate total monthly rent costs
  let totalMonthlyRentCost = monthlyRent + rentersInsurance;
  if (!rentIncludesUtilities) {
    totalMonthlyRentCost += utilityCosts;
  }
  
  // Calculate monthly cost difference
  const monthlyCostDifference = totalMonthlyMortgageCost - totalMonthlyRentCost;
  const annualCostDifference = monthlyCostDifference * 12;
  
  // Calculate total costs over analysis period
  let totalMortgageCost = 0;
  let totalRentCost = 0;
  
  for (let year = 1; year <= analysisPeriod; year++) {
    // Mortgage costs (relatively stable)
    totalMortgageCost += totalMonthlyMortgageCost * 12;
    
    // Rent costs (increasing over time)
    const currentYearRent = monthlyRent * Math.pow(1 + rentIncreaseRate, year - 1);
    const currentYearRentCost = currentYearRent + rentersInsurance;
    if (!rentIncludesUtilities) {
      currentYearRentCost += utilityCosts;
    }
    totalRentCost += currentYearRentCost * 12;
  }
  
  // Add closing costs to mortgage
  const totalClosingCosts = closingCosts + originationFee + appraisalFee + titleInsuranceFee + 
                           recordingFee + attorneyFee + otherFees;
  totalMortgageCost += totalClosingCosts;
  
  const totalCostDifference = totalMortgageCost - totalRentCost;
  const costSavings = Math.max(0, -totalCostDifference);
  
  // Calculate break-even analysis
  let breakEvenMonths = 0;
  let cumulativeMortgageCost = totalClosingCosts;
  let cumulativeRentCost = 0;
  
  for (let month = 1; month <= analysisPeriod * 12; month++) {
    cumulativeMortgageCost += totalMonthlyMortgageCost;
    const currentMonthRent = monthlyRent * Math.pow(1 + rentIncreaseRate, (month - 1) / 12);
    const currentMonthRentCost = currentMonthRent + rentersInsurance;
    if (!rentIncludesUtilities) {
      currentMonthRentCost += utilityCosts;
    }
    cumulativeRentCost += currentMonthRentCost;
    
    if (cumulativeMortgageCost <= cumulativeRentCost && breakEvenMonths === 0) {
      breakEvenMonths = month;
    }
  }
  
  const breakEvenYears = breakEvenMonths / 12;
  const breakEvenPoint = breakEvenMonths;
  
  // Calculate break-even property value
  const breakEvenPropertyValue = propertyValue * (1 + propertyAppreciationRate * breakEvenYears);
  
  // Calculate equity analysis
  let equityBuildUp = 0;
  let totalEquity = downPayment;
  
  if (paymentType === 'principal_interest') {
    for (let year = 1; year <= analysisPeriod; year++) {
      const yearEquity = monthlyMortgagePayment * 12 * (year / loanTerm);
      equityBuildUp += yearEquity;
      totalEquity += yearEquity;
    }
  }
  
  // Add property appreciation
  const propertyAppreciation = propertyValue * Math.pow(1 + propertyAppreciationRate, analysisPeriod) - propertyValue;
  totalEquity += propertyAppreciation;
  
  const equityPercentage = (totalEquity / propertyValue) * 100;
  const equityGrowth = totalEquity - downPayment;
  
  // Calculate investment analysis (opportunity cost of down payment)
  const opportunityCost = downPayment * Math.pow(1 + investmentReturnRate, analysisPeriod) - downPayment;
  const investmentGrowth = opportunityCost;
  const totalInvestmentValue = downPayment + opportunityCost;
  const netInvestmentBenefit = totalInvestmentValue - totalEquity;
  
  // Calculate tax analysis
  const mortgageTaxDeduction = (interestRate * loanAmount * analysisPeriod) * (borrowerTaxRate / 100);
  const rentTaxDeduction = 0; // Generally no tax deduction for rent
  const taxBenefit = mortgageTaxDeduction - rentTaxDeduction;
  const afterTaxCost = totalMortgageCost - taxBenefit;
  
  // Calculate cash flow analysis
  const monthlyCashFlow = monthlyCostDifference;
  const annualCashFlow = annualCostDifference;
  const totalCashFlow = totalCostDifference;
  const cashFlowImprovement = (monthlyCostDifference / totalMonthlyRentCost) * 100;
  
  // Calculate risk score
  let riskScore = 0;
  
  // Market risk (0-25 points)
  if (marketCondition === 'declining') riskScore += 25;
  else if (marketCondition === 'stable') riskScore += 10;
  else if (marketCondition === 'growing') riskScore += 5;
  else if (marketCondition === 'hot') riskScore += 15;
  
  // Location stability risk (0-20 points)
  if (locationStability === 'unstable') riskScore += 20;
  else if (locationStability === 'moderate') riskScore += 10;
  else if (locationStability === 'stable') riskScore += 5;
  
  // Flexibility risk (0-15 points)
  if (flexibilityNeeded) riskScore += 15;
  
  // Maintenance preference risk (0-10 points)
  if (maintenancePreference === 'low') riskScore += 10;
  else if (maintenancePreference === 'medium') riskScore += 5;
  else if (maintenancePreference === 'high') riskScore += 2;
  
  // Stay duration risk (0-15 points)
  if (expectedStayDuration < 2) riskScore += 15;
  else if (expectedStayDuration < 5) riskScore += 10;
  else if (expectedStayDuration < 10) riskScore += 5;
  
  // Financial risk (0-15 points)
  if (borrowerCreditScore < 620) riskScore += 15;
  else if (borrowerCreditScore < 680) riskScore += 10;
  else if (borrowerCreditScore < 740) riskScore += 5;
  else if (borrowerCreditScore < 780) riskScore += 2;
  
  if (borrowerDebtToIncomeRatio > 0.5) riskScore += 10;
  else if (borrowerDebtToIncomeRatio > 0.43) riskScore += 7;
  else if (borrowerDebtToIncomeRatio > 0.36) riskScore += 3;
  
  riskScore = Math.min(100, Math.max(0, riskScore));
  
  // Calculate probabilities
  const probabilityOfBenefit = Math.max(0.1, 1 - (riskScore / 100));
  const worstCaseScenario = totalCostDifference * 0.5;
  const bestCaseScenario = totalCostDifference * 1.5;
  
  // Generate sensitivity matrix
  const sensitivityMatrix = [
    {
      variable: 'Property Appreciation Rate',
      values: [0.02, 0.03, 0.04, 0.05, 0.06],
      impacts: [-5000, -2500, 0, 2500, 5000]
    },
    {
      variable: 'Rent Increase Rate',
      values: [0.02, 0.03, 0.04, 0.05, 0.06],
      impacts: [5000, 2500, 0, -2500, -5000]
    },
    {
      variable: 'Investment Return Rate',
      values: [0.05, 0.06, 0.07, 0.08, 0.09],
      impacts: [-3000, -1500, 0, 1500, 3000]
    }
  ];
  
  // Generate scenarios
  const scenarios = [
    {
      scenario: 'Best Case',
      probability: 0.2,
      mortgageCost: totalMortgageCost * 0.8,
      rentCost: totalRentCost * 1.2,
      savings: costSavings * 1.5
    },
    {
      scenario: 'Base Case',
      probability: 0.5,
      mortgageCost: totalMortgageCost,
      rentCost: totalRentCost,
      savings: costSavings
    },
    {
      scenario: 'Worst Case',
      probability: 0.3,
      mortgageCost: totalMortgageCost * 1.2,
      rentCost: totalRentCost * 0.8,
      savings: costSavings * 0.5
    }
  ];
  
  // Generate timeline analysis
  const timelineAnalysis = [];
  for (let year = 1; year <= analysisPeriod; year++) {
    const yearMortgageCost = totalMonthlyMortgageCost * 12;
    const yearRent = monthlyRent * Math.pow(1 + rentIncreaseRate, year - 1);
    const yearRentCost = (yearRent + rentersInsurance + (rentIncludesUtilities ? 0 : utilityCosts)) * 12;
    
    const yearEquity = year <= loanTerm ? monthlyMortgagePayment * 12 * (year / loanTerm) : 0;
    const yearInvestment = downPayment * Math.pow(1 + investmentReturnRate, year) - downPayment;
    const yearNetBenefit = yearEquity + yearInvestment - (yearMortgageCost - yearRentCost);
    
    timelineAnalysis.push({
      year,
      mortgageCost: yearMortgageCost,
      rentCost: yearRentCost,
      equity: yearEquity,
      investment: yearInvestment,
      netBenefit: yearNetBenefit
    });
  }
  
  // Generate comparison analysis
  const comparisonAnalysis = [
    {
      metric: 'Monthly Payment',
      mortgage: totalMonthlyMortgageCost,
      rent: totalMonthlyRentCost,
      difference: monthlyCostDifference,
      advantage: monthlyCostDifference < 0 ? 'Rent' : 'Mortgage'
    },
    {
      metric: 'Total Cost (5 years)',
      mortgage: totalMortgageCost,
      rent: totalRentCost,
      difference: totalCostDifference,
      advantage: totalCostDifference < 0 ? 'Mortgage' : 'Rent'
    },
    {
      metric: 'Equity Build-up',
      mortgage: totalEquity,
      rent: 0,
      difference: totalEquity,
      advantage: 'Mortgage'
    },
    {
      metric: 'Investment Growth',
      mortgage: 0,
      rent: totalInvestmentValue,
      difference: -totalInvestmentValue,
      advantage: 'Rent'
    },
    {
      metric: 'Tax Benefits',
      mortgage: taxBenefit,
      rent: 0,
      difference: taxBenefit,
      advantage: 'Mortgage'
    }
  ];
  
  // Generate market analysis
  const marketAnalysis = [
    {
      factor: 'Property Appreciation',
      mortgageImpact: propertyAppreciation,
      rentImpact: 0,
      netImpact: propertyAppreciation
    },
    {
      factor: 'Rent Increases',
      mortgageImpact: 0,
      rentImpact: -totalRentCost * 0.1,
      netImpact: totalRentCost * 0.1
    },
    {
      factor: 'Interest Rate Changes',
      mortgageImpact: monthlyMortgagePayment * 0.1,
      rentImpact: 0,
      netImpact: -monthlyMortgagePayment * 0.1
    },
    {
      factor: 'Market Volatility',
      mortgageImpact: -propertyValue * 0.05,
      rentImpact: 0,
      netImpact: propertyValue * 0.05
    }
  ];
  
  // Determine recommendation
  let recommendation = 'Requires Review';
  if (totalCostDifference < 0 && breakEvenMonths < 36 && riskScore < 50) {
    recommendation = 'Buy';
  } else if (totalCostDifference > 0 && riskScore > 70) {
    recommendation = 'Rent';
  } else if (totalCostDifference < 0 && breakEvenMonths < 60) {
    recommendation = 'Consider Buying';
  } else if (totalCostDifference > 0 && riskScore < 50) {
    recommendation = 'Consider Renting';
  }
  
  // Generate analysis
  const analysis = {
    recommendation: recommendation as 'Buy' | 'Rent' | 'Consider Buying' | 'Consider Renting' | 'Requires Review',
    valueRating: costSavings > 50000 ? 'High Value' : costSavings > 25000 ? 'Good Value' : costSavings > 10000 ? 'Moderate Value' : costSavings > 0 ? 'Low Value' : 'No Value',
    confidenceRating: riskScore < 30 ? 'High' : riskScore < 60 ? 'Medium' : 'Low',
    
    keyStrengths: [
      `Monthly cost difference of $${Math.abs(monthlyCostDifference).toLocaleString()}`,
      `Break-even point of ${breakEvenMonths.toFixed(1)} months`,
      `Total equity build-up of $${totalEquity.toLocaleString()}`
    ],
    keyWeaknesses: [
      `Risk score of ${riskScore.toFixed(1)}/100`,
      `Break-even period of ${breakEvenYears.toFixed(1)} years`,
      `Opportunity cost of $${opportunityCost.toLocaleString()}`
    ],
    valueFactors: [
      `Property appreciation rate of ${(propertyAppreciationRate * 100).toFixed(1)}%`,
      `Rent increase rate of ${(rentIncreaseRate * 100).toFixed(1)}%`,
      `Investment return rate of ${(investmentReturnRate * 100).toFixed(1)}%`
    ],
    opportunities: [
      'Consider refinancing if rates improve',
      'Evaluate rent vs. buy decision annually',
      'Monitor market conditions for optimal timing'
    ],
    
    costSummary: `Monthly cost difference of $${monthlyCostDifference.toLocaleString()} with total cost difference of $${totalCostDifference.toLocaleString()}.`,
    paymentAnalysis: `Monthly mortgage payment of $${totalMonthlyMortgageCost.toLocaleString()} vs. rent of $${totalMonthlyRentCost.toLocaleString()}.`,
    totalCostAnalysis: `Total mortgage cost of $${totalMortgageCost.toLocaleString()} vs. rent cost of $${totalRentCost.toLocaleString()}.`,
    
    breakEvenSummary: `Break-even point reached after ${breakEvenMonths.toFixed(1)} months or ${breakEvenYears.toFixed(1)} years.`,
    timelineAnalysis: `Analysis period of ${analysisPeriod} years with expected stay duration of ${expectedStayDuration} years.`,
    riskAnalysis: `Risk score of ${riskScore.toFixed(1)}/100 with ${(probabilityOfBenefit * 100).toFixed(1)}% probability of benefit.`,
    
    equitySummary: `Total equity build-up of $${totalEquity.toLocaleString()} with ${equityPercentage.toFixed(1)}% equity percentage.`,
    equityGrowthAnalysis: `Equity growth of $${equityGrowth.toLocaleString()} over ${analysisPeriod} years.`,
    investmentAnalysis: `Investment opportunity cost of $${opportunityCost.toLocaleString()} with total investment value of $${totalInvestmentValue.toLocaleString()}.`,
    
    taxSummary: `Tax benefit of $${taxBenefit.toLocaleString()} with mortgage tax deduction of $${mortgageTaxDeduction.toLocaleString()}.`,
    deductionAnalysis: `After-tax cost of $${afterTaxCost.toLocaleString()} with effective tax rate of ${borrowerTaxRate}%.`,
    benefitAnalysis: `Tax benefit advantage of $${taxBenefit.toLocaleString()} for mortgage over rent.`,
    
    cashFlowSummary: `Monthly cash flow difference of $${monthlyCashFlow.toLocaleString()} with annual difference of $${annualCashFlow.toLocaleString()}.`,
    savingsAnalysis: `Total cost savings of $${costSavings.toLocaleString()} over ${analysisPeriod} years.`,
    improvementAnalysis: `Cash flow improvement of ${cashFlowImprovement.toFixed(1)}% compared to rent.`,
    
    marketSummary: `Market condition is ${marketCondition} with growth rate of ${(marketGrowthRate * 100).toFixed(1)}%.`,
    appreciationAnalysis: `Property appreciation rate of ${(propertyAppreciationRate * 100).toFixed(1)}% vs. rent growth rate of ${(rentGrowthRate * 100).toFixed(1)}%.`,
    rentAnalysis: `Rent increase rate of ${(rentIncreaseRate * 100).toFixed(1)}% with escalation clause ${rentEscalationClause ? 'included' : 'not included'}.`,
    
    riskAssessment: `Overall risk score of ${riskScore.toFixed(1)}/100 based on market, location, and financial factors.`,
    marketRisk: `Market condition is ${marketCondition} with growth rate of ${(marketGrowthRate * 100).toFixed(1)}%.`,
    financialRisk: `Borrower credit score of ${borrowerCreditScore} with debt-to-income ratio of ${(borrowerDebtToIncomeRatio * 100).toFixed(1)}%.`,
    lifestyleRisk: `Expected stay duration of ${expectedStayDuration} years with ${flexibilityNeeded ? 'high' : 'low'} flexibility needs.`,
    
    buyRecommendations: [
      'Proceed with purchase if break-even is under 36 months',
      'Consider shorter loan term for faster equity build-up',
      'Monitor market conditions for optimal timing'
    ],
    rentRecommendations: [
      'Continue renting if break-even is over 60 months',
      'Consider rent-to-own options if available',
      'Evaluate purchase decision annually'
    ],
    optimizationSuggestions: [
      'Shop around for better mortgage rates',
      'Consider different down payment amounts',
      'Evaluate rent vs. buy decision annually'
    ],
    
    implementationPlan: 'Implement decision based on analysis with regular review schedule.',
    nextSteps: [
      'Finalize mortgage pre-approval if buying',
      'Research rental market if renting',
      'Set up monitoring system for market changes'
    ],
    timeline: 'Immediate decision with annual review schedule.',
    
    monitoringPlan: 'Monitor market conditions, interest rates, and property values monthly.',
    keyMetrics: [
      'Property appreciation rates',
      'Rent increase rates',
      'Interest rate changes',
      'Market condition changes'
    ],
    reviewSchedule: 'Monthly market monitoring with annual comprehensive review.',
    
    riskManagement: 'Implement risk monitoring system with contingency planning.',
    mitigationStrategies: [
      'Diversify investment portfolio',
      'Maintain emergency fund',
      'Consider rent-to-own options'
    ],
    contingencyPlans: [
      'Sell property if market conditions change',
      'Refinance if rates improve significantly',
      'Rent out property if needed'
    ],
    
    performanceBenchmarks: [
      {
        metric: 'Break-Even Period',
        target: 36,
        benchmark: breakEvenMonths,
        industry: breakEvenMonths < 36 ? 'Excellent' : breakEvenMonths < 60 ? 'Good' : 'Average'
      },
      {
        metric: 'Monthly Cost Difference',
        target: -200,
        benchmark: monthlyCostDifference,
        industry: monthlyCostDifference < -200 ? 'Favorable' : 'Unfavorable'
      },
      {
        metric: 'Equity Build-up',
        target: 50000,
        benchmark: totalEquity,
        industry: totalEquity > 50000 ? 'Above Average' : 'Below Average'
      }
    ],
    
    decisionRecommendation: recommendation === 'Buy' ? 'Proceed with purchase' : recommendation === 'Rent' ? 'Continue renting' : 'Evaluate options carefully',
    presentationPoints: [
      `Monthly cost difference of $${Math.abs(monthlyCostDifference).toLocaleString()}`,
      `Break-even point of ${breakEvenMonths.toFixed(1)} months`,
      `Total equity build-up of $${totalEquity.toLocaleString()}`
    ],
    decisionFactors: [
      'Monthly cost difference',
      'Break-even timeline',
      'Equity build-up potential',
      'Market conditions'
    ]
  };
  
  return {
    recommendation,
    monthlyCostDifference,
    breakEvenMonths,
    totalCostDifference,
    equityBuildUp,
    opportunityCost,
    riskScore,
    probabilityOfBenefit,
    analysis,
    monthlyMortgagePayment,
    monthlyRentPayment: totalMonthlyRentCost,
    annualCostDifference,
    costSavings,
    totalMortgageCost,
    totalRentCost,
    breakEvenPoint,
    breakEvenYears,
    breakEvenPropertyValue,
    equityPercentage,
    totalEquity,
    equityGrowth,
    investmentGrowth,
    totalInvestmentValue,
    netInvestmentBenefit,
    mortgageTaxDeduction,
    rentTaxDeduction,
    taxBenefit,
    afterTaxCost,
    monthlyCashFlow,
    annualCashFlow,
    totalCashFlow,
    cashFlowImprovement,
    sensitivityMatrix,
    scenarios,
    timelineAnalysis,
    comparisonAnalysis,
    worstCaseScenario,
    bestCaseScenario,
    marketAnalysis
  };
}
