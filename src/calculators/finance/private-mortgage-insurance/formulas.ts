import { PrivateMortgageInsuranceInputs, PrivateMortgageInsuranceOutputs, PrivateMortgageInsuranceAnalysis, PrivateMortgageInsuranceMetrics } from './types';

export function calculatePrivateMortgageInsurance(inputs: PrivateMortgageInsuranceInputs): PrivateMortgageInsuranceOutputs {
  // Calculate basic loan metrics
  const loanToValueRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
  const equityPosition = inputs.propertyValue - inputs.loanAmount;
  const equityPercentage = (equityPosition / inputs.propertyValue) * 100;
  const ltvGap = Math.max(0, inputs.ltvThreshold - loanToValueRatio);

  // Determine if PMI is required
  const pmiRequired = loanToValueRatio > inputs.ltvThreshold;

  // Calculate PMI costs
  const pmiMonthlyPayment = pmiRequired ? (inputs.loanAmount * inputs.pmiRate) / 1200 : 0;
  const pmiAnnualCost = pmiMonthlyPayment * 12;
  const pmiTotalCost = calculateTotalPMICost(inputs, pmiMonthlyPayment);

  // Calculate loan payments
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const monthlyPaymentWithoutPMI = monthlyPayment - pmiMonthlyPayment;
  const paymentIncrease = pmiMonthlyPayment;
  const paymentIncreasePercentage = pmiRequired ? (pmiMonthlyPayment / monthlyPaymentWithoutPMI) * 100 : 0;

  // Calculate effective interest rate
  const effectiveInterestRate = calculateEffectiveInterestRate(inputs, pmiMonthlyPayment);

  // Calculate total loan cost
  const totalLoanCost = (monthlyPayment * inputs.loanTerm * 12) + pmiTotalCost;

  // Calculate cancellation analysis
  const cancellationAnalysis = calculateCancellationAnalysis(inputs, loanToValueRatio);
  const cancellationEligibility = cancellationAnalysis.eligibility;
  const automaticCancellationDate = cancellationAnalysis.automaticDate;
  const requestCancellationDate = cancellationAnalysis.requestDate;
  const monthsToAutomaticCancellation = cancellationAnalysis.monthsToAutomatic;
  const monthsToRequestCancellation = cancellationAnalysis.monthsToRequest;

  // Calculate break-even analysis
  const breakEvenAnalysis = calculateBreakEvenAnalysis(inputs, pmiMonthlyPayment, cancellationAnalysis);
  const breakEvenPoint = breakEvenAnalysis.breakEvenPoint;
  const breakEvenMonths = breakEvenAnalysis.breakEvenMonths;
  const breakEvenCost = breakEvenAnalysis.breakEvenCost;
  const netSavings = breakEvenAnalysis.netSavings;

  // Calculate risk score
  const riskScore = calculateRiskScore(inputs, loanToValueRatio, pmiMonthlyPayment);

  // Calculate timeline analysis
  const timelineAnalysis = calculateTimelineAnalysis(inputs, loanToValueRatio, pmiMonthlyPayment);

  // Calculate sensitivity matrix
  const sensitivityMatrix = calculateSensitivityMatrix(inputs, pmiMonthlyPayment);

  // Calculate scenarios
  const scenarios = calculateScenarios(inputs, pmiMonthlyPayment, cancellationAnalysis);

  // Calculate comparison analysis
  const comparisonAnalysis = calculateComparisonAnalysis(inputs, pmiMonthlyPayment, cancellationAnalysis);

  // Calculate probability of cancellation
  const probabilityOfCancellation = calculateCancellationProbability(inputs, cancellationAnalysis);

  // Calculate worst and best case scenarios
  const worstCaseScenario = calculateWorstCaseScenario(inputs, pmiMonthlyPayment);
  const bestCaseScenario = calculateBestCaseScenario(inputs, pmiMonthlyPayment);

  // Calculate tax analysis
  const taxAnalysis = calculateTaxAnalysis(inputs, pmiAnnualCost);
  const taxDeduction = taxAnalysis.taxDeduction;
  const afterTaxCost = taxAnalysis.afterTaxCost;
  const taxBenefit = taxAnalysis.taxBenefit;

  // Calculate market analysis
  const marketAnalysis = calculateMarketAnalysis(inputs, loanToValueRatio, pmiMonthlyPayment);

  // Generate analysis
  const analysis = generateAnalysis(inputs, {
    pmiRequired,
    loanToValueRatio,
    pmiMonthlyPayment,
    cancellationEligibility,
    breakEvenMonths,
    riskScore,
    totalPMICost: pmiTotalCost,
    equityPosition,
    equityPercentage,
    monthlyPayment,
    monthlyPaymentWithoutPMI,
    paymentIncrease,
    paymentIncreasePercentage,
    pmiSavings: netSavings,
    effectiveInterestRate,
    totalLoanCost,
    automaticCancellationDate,
    requestCancellationDate,
    monthsToAutomaticCancellation,
    monthsToRequestCancellation,
    breakEvenPoint,
    breakEvenCost,
    netSavings,
    timelineAnalysis,
    sensitivityMatrix,
    scenarios,
    comparisonAnalysis,
    probabilityOfCancellation,
    worstCaseScenario,
    bestCaseScenario,
    taxDeduction,
    afterTaxCost,
    taxBenefit,
    marketAnalysis
  });

  return {
    // Core Metrics
    pmiRequired,
    pmiMonthlyPayment,
    pmiAnnualCost,
    loanToValueRatio,
    cancellationEligibility,
    breakEvenMonths,
    riskScore,
    totalPMICost: pmiTotalCost,
    
    // Analysis
    analysis,
    
    // Additional Metrics
    pmiRate: inputs.pmiRate,
    pmiTotalCost: pmiTotalCost,
    currentLtvRatio: loanToValueRatio,
    ltvGap,
    equityPosition,
    equityPercentage,
    monthlyPayment,
    monthlyPaymentWithoutPMI,
    paymentIncrease,
    paymentIncreasePercentage,
    pmiSavings: netSavings,
    effectiveInterestRate,
    totalLoanCost,
    automaticCancellationDate,
    requestCancellationDate,
    monthsToAutomaticCancellation,
    monthsToRequestCancellation,
    breakEvenPoint,
    breakEvenCost,
    netSavings,
    timelineAnalysis,
    sensitivityMatrix,
    scenarios,
    comparisonAnalysis,
    probabilityOfCancellation,
    worstCaseScenario,
    bestCaseScenario,
    taxDeduction,
    afterTaxCost,
    taxBenefit,
    marketAnalysis
  };
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 1200;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

function calculateTotalPMICost(inputs: PrivateMortgageInsuranceInputs, monthlyPMI: number): number {
  if (!inputs.pmiRequired || monthlyPMI === 0) {
    return 0;
  }

  const cancellationAnalysis = calculateCancellationAnalysis(inputs, (inputs.loanAmount / inputs.propertyValue) * 100);
  const monthsToCancellation = Math.min(
    cancellationAnalysis.monthsToAutomatic,
    inputs.analysisPeriod
  );

  return monthlyPMI * monthsToCancellation;
}

function calculateEffectiveInterestRate(inputs: PrivateMortgageInsuranceInputs, monthlyPMI: number): number {
  const baseMonthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const totalMonthlyPayment = baseMonthlyPayment + monthlyPMI;
  
  // Convert PMI to equivalent interest rate
  const pmiEquivalentRate = (monthlyPMI * 12) / inputs.loanAmount * 100;
  
  return inputs.interestRate + pmiEquivalentRate;
}

function calculateCancellationAnalysis(inputs: PrivateMortgageInsuranceInputs, ltvRatio: number): {
  eligibility: boolean;
  automaticDate: string;
  requestDate: string;
  monthsToAutomatic: number;
  monthsToRequest: number;
} {
  const currentLTV = ltvRatio;
  const targetLTV = inputs.ltvThreshold;
  
  if (currentLTV <= targetLTV) {
    const eligibility = inputs.paymentsMade >= 24; // At least 2 years of payments
    const automaticDate = new Date().toISOString().split('T')[0];
    const requestDate = new Date().toISOString().split('T')[0];
    
    return {
      eligibility,
      automaticDate,
      requestDate,
      monthsToAutomatic: 0,
      monthsToRequest: 0
    };
  }

  // Calculate months to reach target LTV through principal payments
  const monthlyPrincipal = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm) - 
                          (inputs.loanAmount * inputs.interestRate / 1200);
  
  const targetLoanAmount = (inputs.propertyValue * targetLTV) / 100;
  const principalReductionNeeded = inputs.currentPrincipalBalance - targetLoanAmount;
  
  let monthsToAutomatic = Math.ceil(principalReductionNeeded / monthlyPrincipal);
  monthsToAutomatic = Math.max(monthsToAutomatic, 24 - inputs.paymentsMade); // Minimum 2 years
  
  // For request cancellation, need 78% LTV and 5 years
  const requestTargetLTV = 78;
  const requestTargetLoanAmount = (inputs.propertyValue * requestTargetLTV) / 100;
  const requestPrincipalReductionNeeded = inputs.currentPrincipalBalance - requestTargetLoanAmount;
  
  let monthsToRequest = Math.ceil(requestPrincipalReductionNeeded / monthlyPrincipal);
  monthsToRequest = Math.max(monthsToRequest, 60 - inputs.paymentsMade); // Minimum 5 years

  const automaticDate = new Date();
  automaticDate.setMonth(automaticDate.getMonth() + monthsToAutomatic);
  
  const requestDate = new Date();
  requestDate.setMonth(requestDate.getMonth() + monthsToRequest);

  return {
    eligibility: false,
    automaticDate: automaticDate.toISOString().split('T')[0],
    requestDate: requestDate.toISOString().split('T')[0],
    monthsToAutomatic,
    monthsToRequest
  };
}

function calculateBreakEvenAnalysis(
  inputs: PrivateMortgageInsuranceInputs, 
  monthlyPMI: number, 
  cancellationAnalysis: any
): {
  breakEvenPoint: number;
  breakEvenMonths: number;
  breakEvenCost: number;
  netSavings: number;
} {
  if (!inputs.pmiRequired || monthlyPMI === 0) {
    return {
      breakEvenPoint: 0,
      breakEvenMonths: 0,
      breakEvenCost: 0,
      netSavings: 0
    };
  }

  const monthsToCancellation = Math.min(
    cancellationAnalysis.monthsToAutomatic,
    inputs.analysisPeriod
  );

  const totalPMICost = monthlyPMI * monthsToCancellation;
  const breakEvenMonths = monthsToCancellation;
  const breakEvenCost = totalPMICost;
  const netSavings = 0; // Break-even means no net savings

  return {
    breakEvenPoint: totalPMICost,
    breakEvenMonths,
    breakEvenCost,
    netSavings
  };
}

function calculateRiskScore(inputs: PrivateMortgageInsuranceInputs, ltvRatio: number, monthlyPMI: number): number {
  let riskScore = 0;

  // LTV risk (0-30 points)
  if (ltvRatio > 95) riskScore += 30;
  else if (ltvRatio > 90) riskScore += 25;
  else if (ltvRatio > 85) riskScore += 20;
  else if (ltvRatio > 80) riskScore += 15;
  else if (ltvRatio > 75) riskScore += 10;
  else if (ltvRatio > 70) riskScore += 5;

  // Credit score risk (0-25 points)
  if (inputs.borrowerCreditScore < 620) riskScore += 25;
  else if (inputs.borrowerCreditScore < 680) riskScore += 20;
  else if (inputs.borrowerCreditScore < 720) riskScore += 15;
  else if (inputs.borrowerCreditScore < 760) riskScore += 10;
  else if (inputs.borrowerCreditScore < 800) riskScore += 5;

  // DTI risk (0-20 points)
  if (inputs.borrowerDebtToIncomeRatio > 50) riskScore += 20;
  else if (inputs.borrowerDebtToIncomeRatio > 43) riskScore += 15;
  else if (inputs.borrowerDebtToIncomeRatio > 36) riskScore += 10;
  else if (inputs.borrowerDebtToIncomeRatio > 28) riskScore += 5;

  // Market risk (0-15 points)
  if (inputs.marketCondition === 'declining') riskScore += 15;
  else if (inputs.marketCondition === 'stable') riskScore += 8;
  else if (inputs.marketCondition === 'growing') riskScore += 5;
  else if (inputs.marketCondition === 'hot') riskScore += 3;

  // PMI cost risk (0-10 points)
  const pmiToIncomeRatio = (monthlyPMI * 12) / inputs.borrowerIncome * 100;
  if (pmiToIncomeRatio > 2) riskScore += 10;
  else if (pmiToIncomeRatio > 1.5) riskScore += 7;
  else if (pmiToIncomeRatio > 1) riskScore += 5;
  else if (pmiToIncomeRatio > 0.5) riskScore += 3;

  return Math.min(riskScore, 100);
}

function calculateTimelineAnalysis(
  inputs: PrivateMortgageInsuranceInputs, 
  ltvRatio: number, 
  monthlyPMI: number
): any[] {
  const timeline = [];
  const monthlyPrincipal = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm) - 
                          (inputs.loanAmount * inputs.interestRate / 1200);

  let currentBalance = inputs.currentPrincipalBalance;
  let cumulativePMI = 0;

  for (let month = 1; month <= Math.min(inputs.analysisPeriod, 120); month++) {
    const currentLTV = (currentBalance / inputs.propertyValue) * 100;
    const pmiPayment = currentLTV > inputs.ltvThreshold ? monthlyPMI : 0;
    cumulativePMI += pmiPayment;

    const date = new Date();
    date.setMonth(date.getMonth() + month);

    timeline.push({
      month,
      date: date.toISOString().split('T')[0],
      ltvRatio: currentLTV,
      pmiPayment,
      cumulativePMI,
      eligibility: currentLTV <= inputs.ltvThreshold && month >= 24
    });

    currentBalance -= monthlyPrincipal;
    if (currentBalance <= 0) break;
  }

  return timeline;
}

function calculateSensitivityMatrix(inputs: PrivateMortgageInsuranceInputs, monthlyPMI: number): any[] {
  const variables = [
    { name: 'Property Appreciation', base: inputs.propertyAppreciationRate, range: [-5, 10] },
    { name: 'Interest Rate', base: inputs.interestRate, range: [2, 8] },
    { name: 'PMI Rate', base: inputs.pmiRate, range: [0.1, 1.5] },
    { name: 'Market Growth', base: inputs.marketGrowthRate, range: [-10, 15] }
  ];

  return variables.map(variable => {
    const values = [];
    const impacts = [];
    
    for (let i = variable.range[0]; i <= variable.range[1]; i += 1) {
      values.push(i);
      
      // Calculate impact on PMI cost
      let impact = 0;
      if (variable.name === 'PMI Rate') {
        impact = (i - variable.base) * inputs.loanAmount / 1200 * 12;
      } else if (variable.name === 'Property Appreciation') {
        const newPropertyValue = inputs.propertyValue * Math.pow(1 + i / 100, 2);
        const newLTV = (inputs.loanAmount / newPropertyValue) * 100;
        impact = newLTV <= inputs.ltvThreshold ? -monthlyPMI * 12 : 0;
      }
      
      impacts.push(impact);
    }

    return {
      variable: variable.name,
      values,
      impacts
    };
  });
}

function calculateScenarios(
  inputs: PrivateMortgageInsuranceInputs, 
  monthlyPMI: number, 
  cancellationAnalysis: any
): any[] {
  return [
    {
      scenario: 'Conservative',
      probability: 0.3,
      pmiCost: monthlyPMI * cancellationAnalysis.monthsToAutomatic * 1.2,
      cancellationDate: cancellationAnalysis.automaticDate,
      savings: 0
    },
    {
      scenario: 'Moderate',
      probability: 0.5,
      pmiCost: monthlyPMI * cancellationAnalysis.monthsToAutomatic,
      cancellationDate: cancellationAnalysis.automaticDate,
      savings: 0
    },
    {
      scenario: 'Optimistic',
      probability: 0.2,
      pmiCost: monthlyPMI * cancellationAnalysis.monthsToAutomatic * 0.8,
      cancellationDate: cancellationAnalysis.requestDate,
      savings: monthlyPMI * (cancellationAnalysis.monthsToAutomatic - cancellationAnalysis.monthsToRequest)
    }
  ];
}

function calculateComparisonAnalysis(
  inputs: PrivateMortgageInsuranceInputs, 
  monthlyPMI: number, 
  cancellationAnalysis: any
): any[] {
  const totalPMICost = monthlyPMI * cancellationAnalysis.monthsToAutomatic;
  
  return [
    {
      option: 'Keep PMI',
      pmiCost: totalPMICost,
      totalCost: totalPMICost,
      cancellationDate: cancellationAnalysis.automaticDate,
      savings: 0
    },
    {
      option: 'Refinance',
      pmiCost: 0,
      totalCost: inputs.loanAmount * 0.03, // 3% refinance cost
      cancellationDate: new Date().toISOString().split('T')[0],
      savings: totalPMICost - (inputs.loanAmount * 0.03)
    },
    {
      option: 'Larger Down Payment',
      pmiCost: 0,
      totalCost: inputs.loanAmount * 0.05, // Additional 5% down payment
      cancellationDate: new Date().toISOString().split('T')[0],
      savings: totalPMICost - (inputs.loanAmount * 0.05)
    }
  ];
}

function calculateCancellationProbability(inputs: PrivateMortgageInsuranceInputs, cancellationAnalysis: any): number {
  if (cancellationAnalysis.eligibility) return 1.0;
  
  const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
  const monthsToCancellation = cancellationAnalysis.monthsToAutomatic;
  
  // Base probability on LTV and time to cancellation
  let probability = 0.5;
  
  if (ltvRatio <= 85) probability += 0.2;
  if (ltvRatio <= 80) probability += 0.2;
  if (monthsToCancellation <= 24) probability += 0.1;
  if (monthsToCancellation <= 12) probability += 0.1;
  
  return Math.min(probability, 1.0);
}

function calculateWorstCaseScenario(inputs: PrivateMortgageInsuranceInputs, monthlyPMI: number): number {
  return monthlyPMI * inputs.analysisPeriod;
}

function calculateBestCaseScenario(inputs: PrivateMortgageInsuranceInputs, monthlyPMI: number): number {
  const cancellationAnalysis = calculateCancellationAnalysis(inputs, (inputs.loanAmount / inputs.propertyValue) * 100);
  return monthlyPMI * Math.min(cancellationAnalysis.monthsToRequest, 12);
}

function calculateTaxAnalysis(inputs: PrivateMortgageInsuranceInputs, annualPMI: number): {
  taxDeduction: number;
  afterTaxCost: number;
  taxBenefit: number;
} {
  const taxDeduction = annualPMI * (inputs.borrowerTaxRate / 100);
  const afterTaxCost = annualPMI - taxDeduction;
  const taxBenefit = taxDeduction;

  return {
    taxDeduction,
    afterTaxCost,
    taxBenefit
  };
}

function calculateMarketAnalysis(
  inputs: PrivateMortgageInsuranceInputs, 
  ltvRatio: number, 
  monthlyPMI: number
): any[] {
  return [
    {
      factor: 'Market Condition',
      impact: inputs.marketCondition === 'declining' ? -10 : inputs.marketCondition === 'growing' ? 5 : 0,
      risk: inputs.marketCondition === 'declining' ? 'High' : 'Low',
      opportunity: inputs.marketCondition === 'growing' ? 'Property appreciation may accelerate cancellation' : 'Limited'
    },
    {
      factor: 'Interest Rate Environment',
      impact: inputs.interestRate > 6 ? -5 : 0,
      risk: inputs.interestRate > 6 ? 'Medium' : 'Low',
      opportunity: 'Refinancing may become attractive'
    },
    {
      factor: 'Property Type',
      impact: inputs.propertyType === 'single_family' ? 0 : -3,
      risk: inputs.propertyType === 'single_family' ? 'Low' : 'Medium',
      opportunity: 'Single family homes typically appreciate more consistently'
    },
    {
      factor: 'Location',
      impact: inputs.marketLocation ? 0 : -2,
      risk: 'Medium',
      opportunity: 'Location-specific factors may affect property value growth'
    }
  ];
}

function generateAnalysis(inputs: PrivateMortgageInsuranceInputs, metrics: any): PrivateMortgageInsuranceAnalysis {
  const ltvRatio = metrics.loanToValueRatio;
  const pmiRequired = metrics.pmiRequired;
  const cancellationEligibility = metrics.cancellationEligibility;
  const riskScore = metrics.riskScore;

  // Determine PMI rating
  let pmiRating: 'Required' | 'Not Required' | 'Eligible for Cancellation' | 'Consider Refinance' | 'Requires Review';
  if (!pmiRequired) {
    pmiRating = 'Not Required';
  } else if (cancellationEligibility) {
    pmiRating = 'Eligible for Cancellation';
  } else if (ltvRatio > 90) {
    pmiRating = 'Consider Refinance';
  } else if (riskScore > 70) {
    pmiRating = 'Requires Review';
  } else {
    pmiRating = 'Required';
  }

  // Determine cost rating
  let costRating: 'High Cost' | 'Moderate Cost' | 'Low Cost' | 'No Cost';
  if (!pmiRequired) {
    costRating = 'No Cost';
  } else if (metrics.pmiAnnualCost > 3000) {
    costRating = 'High Cost';
  } else if (metrics.pmiAnnualCost > 1500) {
    costRating = 'Moderate Cost';
  } else {
    costRating = 'Low Cost';
  }

  // Determine recommendation
  let recommendation: 'Keep PMI' | 'Cancel PMI' | 'Refinance' | 'Requires Review';
  if (cancellationEligibility) {
    recommendation = 'Cancel PMI';
  } else if (ltvRatio > 90 || riskScore > 80) {
    recommendation = 'Refinance';
  } else if (riskScore > 60) {
    recommendation = 'Requires Review';
  } else {
    recommendation = 'Keep PMI';
  }

  // Generate key insights
  const keyStrengths: string[] = [];
  const keyWeaknesses: string[] = [];

  if (ltvRatio <= 85) keyStrengths.push('Reasonable loan-to-value ratio');
  if (inputs.borrowerCreditScore >= 720) keyStrengths.push('Good credit score');
  if (inputs.borrowerDebtToIncomeRatio <= 36) keyStrengths.push('Low debt-to-income ratio');
  if (inputs.marketCondition === 'growing') keyStrengths.push('Growing market may accelerate equity building');

  if (ltvRatio > 90) keyWeaknesses.push('High loan-to-value ratio increases PMI costs');
  if (inputs.borrowerCreditScore < 680) keyWeaknesses.push('Credit score may limit refinancing options');
  if (inputs.borrowerDebtToIncomeRatio > 43) keyWeaknesses.push('High debt-to-income ratio increases risk');
  if (inputs.marketCondition === 'declining') keyWeaknesses.push('Declining market may slow equity building');

  return {
    pmiRating,
    costRating,
    recommendation,
    keyStrengths,
    keyWeaknesses,
    costFactors: [
      `PMI rate: ${inputs.pmiRate}%`,
      `Monthly PMI payment: $${metrics.pmiMonthlyPayment.toFixed(2)}`,
      `Annual PMI cost: $${metrics.pmiAnnualCost.toFixed(2)}`,
      `Total PMI cost: $${metrics.totalPMICost.toFixed(2)}`
    ],
    opportunities: [
      'Consider making additional principal payments to reach 80% LTV faster',
      'Monitor property value appreciation for early cancellation eligibility',
      'Explore refinancing options when rates are favorable',
      'Review PMI cancellation requirements with lender'
    ],
    pmiSummary: `PMI is ${pmiRequired ? 'required' : 'not required'} with a monthly cost of $${metrics.pmiMonthlyPayment.toFixed(2)}.`,
    costAnalysis: `The total PMI cost over the loan term is estimated at $${metrics.totalPMICost.toFixed(2)}.`,
    requirementAnalysis: `PMI requirement is based on the ${ltvRatio.toFixed(1)}% loan-to-value ratio exceeding the ${inputs.ltvThreshold}% threshold.`,
    cancellationSummary: cancellationEligibility 
      ? `Eligible for PMI cancellation after ${metrics.breakEvenMonths} months.`
      : `PMI cancellation expected in ${metrics.monthsToAutomaticCancellation} months.`,
    eligibilityAnalysis: cancellationEligibility
      ? 'Meets all requirements for PMI cancellation including LTV threshold and payment history.'
      : 'Does not yet meet PMI cancellation requirements. Additional principal payments or property appreciation needed.',
    timelineAnalysis: `PMI payments will continue for approximately ${metrics.monthsToAutomaticCancellation} months until automatic cancellation.`,
    costSummary: `PMI adds ${metrics.paymentIncreasePercentage.toFixed(1)}% to monthly payment and ${metrics.effectiveInterestRate.toFixed(2)}% to effective interest rate.`,
    savingsAnalysis: `Cancelling PMI early could save $${metrics.pmiSavings.toFixed(2)} over the loan term.`,
    breakEvenAnalysis: `Break-even point is reached after ${metrics.breakEvenMonths} months of PMI payments.`,
    paymentSummary: `Monthly payment with PMI: $${metrics.monthlyPayment.toFixed(2)}, without PMI: $${metrics.monthlyPaymentWithoutPMI.toFixed(2)}.`,
    impactAnalysis: `PMI increases monthly payment by $${metrics.paymentIncrease.toFixed(2)} and total loan cost by $${metrics.totalPMICost.toFixed(2)}.`,
    cashFlowAnalysis: `PMI reduces monthly cash flow by $${metrics.paymentIncrease.toFixed(2)}, equivalent to ${metrics.paymentIncreasePercentage.toFixed(1)}% of base payment.`,
    equitySummary: `Current equity position: $${metrics.equityPosition.toFixed(2)} (${metrics.equityPercentage.toFixed(1)}% of property value).`,
    equityGrowthAnalysis: `Equity will grow through principal payments and potential property appreciation.`,
    ltvAnalysis: `Current LTV of ${ltvRatio.toFixed(1)}% needs to reach ${inputs.ltvThreshold}% for PMI cancellation.`,
    riskAssessment: `Overall risk score: ${riskScore.toFixed(1)}/100. ${riskScore > 70 ? 'High risk factors present.' : 'Risk factors are manageable.'}`,
    cancellationRisk: `Risk of delayed cancellation due to market conditions or payment issues.`,
    marketRisk: `Market conditions may affect property value and cancellation timeline.`,
    timingRisk: `Timing of PMI cancellation depends on principal payments and property appreciation.`,
    marketAnalysis: `Market analysis shows ${inputs.marketCondition} conditions with ${inputs.marketGrowthRate}% annual growth rate.`,
    appreciationAnalysis: `Property appreciation rate of ${inputs.propertyAppreciationRate}% may accelerate equity building.`,
    competitiveAnalysis: `Current PMI rate of ${inputs.pmiRate}% is ${inputs.pmiRate > 0.5 ? 'above' : 'below'} market average.`,
    taxSummary: `PMI may be tax deductible, providing $${metrics.taxDeduction.toFixed(2)} annual tax benefit.`,
    deductionAnalysis: `Tax deduction reduces effective PMI cost by ${inputs.borrowerTaxRate}%.`,
    benefitAnalysis: `After-tax PMI cost: $${metrics.afterTaxCost.toFixed(2)} annually.`,
    pmiRecommendations: [
      'Monitor LTV ratio monthly to track progress toward cancellation',
      'Consider making additional principal payments to reach 80% LTV faster',
      'Request PMI cancellation as soon as eligibility requirements are met',
      'Keep detailed records of all payments and property improvements'
    ],
    cancellationRecommendations: [
      'Contact lender 30 days before expected cancellation date',
      'Provide current property appraisal if required',
      'Ensure all payments are current and on time',
      'Consider refinancing if rates are favorable and LTV is low'
    ],
    optimizationSuggestions: [
      'Make bi-weekly payments to reduce principal faster',
      'Apply tax refunds or bonuses to principal reduction',
      'Consider home improvements that increase property value',
      'Monitor refinancing opportunities when rates drop'
    ],
    implementationPlan: 'Implement PMI cancellation strategy based on current eligibility and market conditions.',
    nextSteps: [
      'Calculate exact cancellation timeline based on current payment schedule',
      'Contact lender to confirm PMI cancellation requirements',
      'Monitor property value through regular appraisals',
      'Prepare refinancing analysis for comparison'
    ],
    timeline: `PMI cancellation expected in ${metrics.monthsToAutomaticCancellation} months (${metrics.automaticCancellationDate}).`,
    monitoringPlan: 'Review PMI status quarterly and property value annually.',
    keyMetrics: [
      'Loan-to-value ratio',
      'Payment history',
      'Property value appreciation',
      'PMI cancellation eligibility'
    ],
    reviewSchedule: 'Monthly LTV review, quarterly PMI analysis, annual property appraisal.',
    riskManagement: 'Monitor market conditions and payment history to manage cancellation risks.',
    mitigationStrategies: [
      'Maintain excellent payment history',
      'Monitor property value changes',
      'Consider refinancing if beneficial',
      'Keep detailed records of all transactions'
    ],
    contingencyPlans: [
      'Refinance to eliminate PMI if rates are favorable',
      'Make additional principal payments to accelerate cancellation',
      'Consider selling property if PMI costs become prohibitive',
      'Negotiate with lender for early cancellation'
    ],
    performanceBenchmarks: [
      {
        metric: 'PMI Rate',
        target: 0.5,
        benchmark: inputs.pmiRate,
        industry: 'Conventional Loans'
      },
      {
        metric: 'LTV Threshold',
        target: 80,
        benchmark: inputs.ltvThreshold,
        industry: 'Standard'
      },
      {
        metric: 'Cancellation Timeline',
        target: 60,
        benchmark: metrics.monthsToAutomaticCancellation,
        industry: 'Typical'
      }
    ],
    decisionRecommendation: recommendation,
    presentationPoints: [
      `PMI status: ${pmiRating}`,
      `Monthly cost: $${metrics.pmiMonthlyPayment.toFixed(2)}`,
      `Cancellation timeline: ${metrics.monthsToAutomaticCancellation} months`,
      `Total cost: $${metrics.totalPMICost.toFixed(2)}`
    ],
    decisionFactors: [
      'Current loan-to-value ratio',
      'Payment history and credit score',
      'Market conditions and property appreciation',
      'Refinancing opportunities and costs'
    ]
  };
}