import { MortgageRefinanceInputs, MortgageRefinanceOutputs } from './types';

// Calculate new monthly payment
export function calculateNewMonthlyPayment(
  newLoanAmount: number,
  newInterestRate: number,
  newLoanTerm: number
): number {
  const monthlyRate = newInterestRate / 100 / 12;
  const numPayments = newLoanTerm * 12;

  if (monthlyRate === 0) return newLoanAmount / numPayments;

  return newLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

// Calculate total refinance costs
export function calculateTotalRefinanceCosts(inputs: MortgageRefinanceInputs): number {
  return inputs.closingCosts + inputs.discountPoints + inputs.appraisalFee +
         inputs.titleInsurance + inputs.otherFees - inputs.lenderCredits;
}

// Calculate break-even period in months
export function calculateBreakEvenPeriod(
  totalCosts: number,
  monthlySavings: number
): number {
  if (monthlySavings <= 0) return Infinity;
  return Math.ceil(totalCosts / monthlySavings);
}

// Calculate total savings over time
export function calculateTotalSavingsOverTime(
  monthlySavings: number,
  expectedStayDuration: number,
  totalCosts: number
): number {
  const totalMonths = Math.min(expectedStayDuration, 360); // Max 30 years
  const grossSavings = monthlySavings * totalMonths;
  return grossSavings - totalCosts;
}

// Calculate net present value of refinance
export function calculateNetPresentValue(
  monthlySavings: number,
  totalCosts: number,
  discountRate: number,
  expectedStayDuration: number
): number {
  const monthlyDiscountRate = discountRate / 100 / 12;
  let npv = -totalCosts; // Initial cost (negative)

  for (let month = 1; month <= expectedStayDuration && month <= 360; month++) {
    const discountedSavings = monthlySavings / Math.pow(1 + monthlyDiscountRate, month);
    npv += discountedSavings;
  }

  return npv;
}

// Calculate internal rate of return
export function calculateInternalRateOfReturn(
  totalCosts: number,
  monthlySavings: number,
  expectedStayDuration: number
): number {
  // Simplified IRR calculation - in practice, this would use more sophisticated methods
  const totalSavings = monthlySavings * Math.min(expectedStayDuration, 360);
  const netBenefit = totalSavings - totalCosts;

  if (netBenefit <= 0) return 0;

  // Approximate IRR as annual return
  const years = Math.min(expectedStayDuration, 360) / 12;
  const irr = (Math.pow(netBenefit / totalCosts + 1, 1 / years) - 1) * 100;

  return Math.max(0, irr);
}

// Calculate cash to close
export function calculateCashToClose(inputs: MortgageRefinanceInputs): number {
  const totalCosts = calculateTotalRefinanceCosts(inputs);
  const cashOut = inputs.cashOutAmount || 0;

  return totalCosts + cashOut;
}

// Calculate new loan amount
export function calculateNewLoanAmount(inputs: MortgageRefinanceInputs): number {
  return inputs.currentLoanBalance + inputs.cashOutAmount;
}

// Calculate total payments over life of new loan
export function calculateNewTotalPayments(
  newMonthlyPayment: number,
  newLoanTerm: number
): number {
  return newMonthlyPayment * newLoanTerm * 12;
}

// Calculate total interest savings
export function calculateTotalInterestSavings(
  currentTotalPayments: number,
  newTotalPayments: number,
  currentLoanBalance: number
): number {
  const currentRemainingInterest = currentTotalPayments - currentLoanBalance;
  const newTotalInterest = newTotalPayments - currentLoanBalance;

  return currentRemainingInterest - newTotalInterest;
}

// Calculate equity position
export function calculateEquityPosition(propertyValue: number, loanBalance: number): number {
  return Math.max(0, propertyValue - loanBalance);
}

// Calculate loan-to-value ratio
export function calculateLoanToValueRatio(loanAmount: number, propertyValue: number): number {
  if (propertyValue <= 0) return 0;
  return (loanAmount / propertyValue) * 100;
}

// Calculate affordability analysis
export function calculateAffordabilityAnalysis(
  newMonthlyPayment: number,
  monthlyIncome: number,
  totalMonthlyDebts: number
): MortgageRefinanceOutputs['affordabilityAnalysis'] {
  const paymentToIncomeRatio = (newMonthlyPayment / monthlyIncome) * 100;
  const housingExpenseRatio = ((newMonthlyPayment + totalMonthlyDebts) / monthlyIncome) * 100;

  let affordabilityScore: 'Excellent' | 'Good' | 'Fair' | 'Poor' = 'Poor';

  if (paymentToIncomeRatio <= 25 && housingExpenseRatio <= 36) {
    affordabilityScore = 'Excellent';
  } else if (paymentToIncomeRatio <= 28 && housingExpenseRatio <= 43) {
    affordabilityScore = 'Good';
  } else if (paymentToIncomeRatio <= 33 && housingExpenseRatio <= 50) {
    affordabilityScore = 'Fair';
  }

  return {
    paymentToIncomeRatio,
    housingExpenseRatio,
    affordabilityScore
  };
}

// Calculate cost-benefit analysis
export function calculateCostBenefitAnalysis(
  totalCosts: number,
  monthlySavings: number,
  expectedStayDuration: number
): MortgageRefinanceOutputs['costBenefitAnalysis'] {
  const costToBenefitRatio = monthlySavings > 0 ? totalCosts / (monthlySavings * 12) : Infinity;
  const monthlyBenefit = monthlySavings;
  const annualBenefit = monthlySavings * 12;
  const totalBenefit = monthlySavings * Math.min(expectedStayDuration, 360);
  const roi = totalCosts > 0 ? ((totalBenefit - totalCosts) / totalCosts) * 100 : 0;

  return {
    costToBenefitRatio,
    monthlyBenefit,
    annualBenefit,
    roi
  };
}

// Calculate risk assessment
export function calculateRiskAssessment(inputs: MortgageRefinanceInputs): MortgageRefinanceOutputs['riskAssessment'] {
  // Interest rate risk
  let interestRateRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.marketConditions === 'Rising' || inputs.newInterestRate > inputs.currentInterestRate + 1) {
    interestRateRisk = 'High';
  } else if (inputs.marketConditions === 'Falling' || inputs.newInterestRate > inputs.currentInterestRate + 0.5) {
    interestRateRisk = 'Medium';
  }

  // Prepayment penalty risk
  let prepaymentPenaltyRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.prepaymentPenalty > 0) {
    const penaltyPercentage = (inputs.prepaymentPenalty / inputs.currentLoanBalance) * 100;
    if (penaltyPercentage > 2) {
      prepaymentPenaltyRisk = 'High';
    } else if (penaltyPercentage > 1) {
      prepaymentPenaltyRisk = 'Medium';
    }
  }

  // Market timing risk
  let marketTimingRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (inputs.timeToRefinance > 60) {
    marketTimingRisk = 'High';
  } else if (inputs.timeToRefinance > 30) {
    marketTimingRisk = 'Medium';
  }

  // Overall risk
  const riskScores = { Low: 1, Medium: 2, High: 3 };
  const averageRisk = (riskScores[interestRateRisk] + riskScores[prepaymentPenaltyRisk] + riskScores[marketTimingRisk]) / 3;

  let overallRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (averageRisk >= 2.5) overallRisk = 'High';
  else if (averageRisk >= 1.5) overallRisk = 'Medium';

  return {
    interestRateRisk,
    prepaymentPenaltyRisk,
    marketTimingRisk,
    overallRisk
  };
}

// Generate scenario analysis
export function generateScenarioAnalysis(
  inputs: MortgageRefinanceInputs,
  baseNewPayment: number,
  baseCosts: number
): MortgageRefinanceOutputs['scenarioAnalysis'] {
  // Conservative scenario: higher rates, higher costs
  const conservativeRate = inputs.newInterestRate + 0.5;
  const conservativeCosts = baseCosts * 1.2;
  const conservativePayment = calculateNewMonthlyPayment(
    inputs.currentLoanBalance + inputs.cashOutAmount,
    conservativeRate,
    inputs.newLoanTerm
  );

  // Expected scenario: as entered
  const expectedPayment = baseNewPayment;
  const expectedCosts = baseCosts;

  // Optimistic scenario: lower rates, lower costs
  const optimisticRate = Math.max(0, inputs.newInterestRate - 0.5);
  const optimisticCosts = baseCosts * 0.8;
  const optimisticPayment = calculateNewMonthlyPayment(
    inputs.currentLoanBalance + inputs.cashOutAmount,
    optimisticRate,
    inputs.newLoanTerm
  );

  return {
    conservative: {
      monthlyPayment: conservativePayment,
      totalCost: conservativeCosts,
      breakEven: calculateBreakEvenPeriod(conservativeCosts, inputs.currentMonthlyPayment - conservativePayment)
    },
    expected: {
      monthlyPayment: expectedPayment,
      totalCost: expectedCosts,
      breakEven: calculateBreakEvenPeriod(expectedCosts, inputs.currentMonthlyPayment - expectedPayment)
    },
    optimistic: {
      monthlyPayment: optimisticPayment,
      totalCost: optimisticCosts,
      breakEven: calculateBreakEvenPeriod(optimisticCosts, inputs.currentMonthlyPayment - optimisticPayment)
    }
  };
}

// Generate recommendations
export function generateRecommendations(
  inputs: MortgageRefinanceInputs,
  breakEvenPeriod: number,
  monthlySavings: number,
  totalCosts: number,
  riskAssessment: MortgageRefinanceOutputs['riskAssessment']
): MortgageRefinanceOutputs['recommendations'] {
  const shouldRefinance = breakEvenPeriod < inputs.expectedStayDuration && monthlySavings > 0;

  let primaryRecommendation = '';

  if (shouldRefinance) {
    if (riskAssessment.overallRisk === 'Low') {
      primaryRecommendation = 'Strong refinance opportunity - proceed with confidence';
    } else if (riskAssessment.overallRisk === 'Medium') {
      primaryRecommendation = 'Good refinance opportunity - monitor market conditions';
    } else {
      primaryRecommendation = 'Refinance may be beneficial but consider risks carefully';
    }
  } else {
    primaryRecommendation = 'Refinance may not be beneficial based on current analysis';
  }

  const alternativeOptions = [
    'Wait for better rates',
    'Consider shorter loan term',
    'Look for lenders with lower fees',
    'Consider cash-out refinance for home improvements',
    'Explore FHA streamline refinance options'
  ];

  const timingAdvice = breakEvenPeriod < 24 ?
    'Act quickly to take advantage of current rates' :
    'Monitor rates and be prepared to act when favorable';

  const riskConsiderations = [];
  if (riskAssessment.interestRateRisk === 'High') {
    riskConsiderations.push('Interest rates may rise - consider rate lock');
  }
  if (riskAssessment.prepaymentPenaltyRisk === 'High') {
    riskConsiderations.push('Prepayment penalty may reduce savings');
  }
  if (inputs.expectedStayDuration < breakEvenPeriod) {
    riskConsiderations.push('Short expected stay may not justify refinance costs');
  }

  return {
    shouldRefinance,
    primaryRecommendation,
    alternativeOptions,
    timingAdvice,
    riskConsiderations
  };
}

// Main calculation function
export function calculateMortgageRefinance(inputs: MortgageRefinanceInputs): MortgageRefinanceOutputs {
  // Calculate new loan details
  const newLoanAmount = inputs.currentLoanBalance + inputs.cashOutAmount;
  const newMonthlyPayment = calculateNewMonthlyPayment(newLoanAmount, inputs.newInterestRate, inputs.newLoanTerm);
  const monthlySavings = inputs.currentMonthlyPayment - newMonthlyPayment;

  // Calculate costs and break-even
  const totalRefinanceCosts = calculateTotalRefinanceCosts(inputs);
  const breakEvenPeriod = calculateBreakEvenPeriod(totalRefinanceCosts, monthlySavings);
  const totalSavingsOverTime = calculateTotalSavingsOverTime(monthlySavings, inputs.expectedStayDuration, totalRefinanceCosts);

  // Calculate advanced metrics
  const netPresentValue = calculateNetPresentValue(monthlySavings, totalRefinanceCosts, inputs.newInterestRate, inputs.expectedStayDuration);
  const internalRateOfReturn = calculateInternalRateOfReturn(totalRefinanceCosts, monthlySavings, inputs.expectedStayDuration);

  // Calculate loan details
  const cashToClose = calculateCashToClose(inputs);
  const newTotalPayments = calculateNewTotalPayments(newMonthlyPayment, inputs.newLoanTerm);
  const totalInterestSavings = calculateTotalInterestSavings(
    inputs.currentMonthlyPayment * inputs.currentLoanTerm,
    newTotalPayments,
    inputs.currentLoanBalance
  );

  // Calculate ratios and positions
  const equityPosition = calculateEquityPosition(inputs.propertyValue, newLoanAmount);
  const loanToValueRatio = calculateLoanToValueRatio(newLoanAmount, inputs.propertyValue);

  // Assume some default values for affordability (would be passed in real implementation)
  const affordabilityAnalysis = calculateAffordabilityAnalysis(
    newMonthlyPayment,
    80000 / 12, // Default monthly income
    inputs.currentMonthlyPayment // Simplified
  );

  const costBenefitAnalysis = calculateCostBenefitAnalysis(totalRefinanceCosts, monthlySavings, inputs.expectedStayDuration);
  const riskAssessment = calculateRiskAssessment(inputs);
  const scenarioAnalysis = generateScenarioAnalysis(inputs, newMonthlyPayment, totalRefinanceCosts);
  const recommendations = generateRecommendations(inputs, breakEvenPeriod, monthlySavings, totalRefinanceCosts, riskAssessment);

  // Comparison metrics
  const currentTotalPayments = inputs.currentMonthlyPayment * inputs.currentLoanTerm;
  const newTotalPaymentsCalc = newTotalPayments;

  return {
    newMonthlyPayment,
    monthlySavings,
    totalRefinanceCosts,
    breakEvenPeriod,
    totalSavingsOverTime,
    netPresentValue,
    internalRateOfReturn,
    cashToClose,
    newLoanAmount,
    newTotalPayments: newTotalPaymentsCalc,
    totalInterestSavings,
    equityPosition,
    loanToValueRatio,
    debtToIncomeRatio: affordabilityAnalysis.housingExpenseRatio,
    affordabilityAnalysis,
    costBenefitAnalysis,
    riskAssessment,
    scenarioAnalysis,
    recommendations,
    comparisonMetrics: {
      currentVsNew: {
        monthlyPayment: {
          current: inputs.currentMonthlyPayment,
          new: newMonthlyPayment,
          difference: monthlySavings
        },
        totalPayments: {
          current: currentTotalPayments,
          new: newTotalPaymentsCalc,
          difference: currentTotalPayments - newTotalPaymentsCalc
        },
        totalInterest: {
          current: currentTotalPayments - inputs.currentLoanBalance,
          new: newTotalPaymentsCalc - inputs.currentLoanBalance,
          difference: totalInterestSavings
        }
      },
      breakEvenAnalysis: {
        monthsToBreakEven: breakEvenPeriod,
        yearsToBreakEven: breakEvenPeriod / 12,
        totalSavingsAfterBreakEven: Math.max(0, (inputs.expectedStayDuration - breakEvenPeriod) * monthlySavings)
      }
    }
  };
}