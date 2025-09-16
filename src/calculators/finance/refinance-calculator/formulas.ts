/**
 * Refinance Calculator Formulas
 * Comprehensive mortgage refinance calculations and analysis
 */

/**
 * Calculate refinance savings analysis
 */
export function calculateRefinanceSavings(
  currentLoanAmount: number,
  currentInterestRate: number,
  currentLoanTerm: number,
  newInterestRate: number,
  newLoanTerm: number,
  closingCosts: number,
  currentMonthsRemaining: number = 360
): {
  currentLoanAmount: number;
  currentInterestRate: number;
  currentLoanTerm: number;
  newInterestRate: number;
  newLoanTerm: number;
  closingCosts: number;
  currentMonthsRemaining: number;
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  totalSavingsFirstYear: number;
  totalSavingsFiveYears: number;
  totalCostSavings: number;
  netPresentValueSavings: number;
  savingsAnalysis: {
    monthlyPaymentReduction: number;
    totalInterestSavings: number;
    breakEvenPoint: number;
    netBenefit: number;
  };
} {
  if (currentLoanAmount <= 0) {
    throw new Error('Current loan amount must be positive');
  }
  if (currentInterestRate < 0 || currentInterestRate > 50) {
    throw new Error('Current interest rate must be between 0 and 50');
  }
  if (currentLoanTerm <= 0) {
    throw new Error('Current loan term must be positive');
  }
  if (newInterestRate < 0 || newInterestRate > 50) {
    throw new Error('New interest rate must be between 0 and 50');
  }
  if (newLoanTerm <= 0) {
    throw new Error('New loan term must be positive');
  }
  if (closingCosts < 0) {
    throw new Error('Closing costs cannot be negative');
  }
  if (currentMonthsRemaining <= 0) {
    throw new Error('Current months remaining must be positive');
  }

  // Calculate current monthly payment
  const currentMonthlyRate = currentInterestRate / 100 / 12;
  const currentMonthlyPayment = currentLoanAmount *
    (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentMonthsRemaining)) /
    (Math.pow(1 + currentMonthlyRate, currentMonthsRemaining) - 1);

  // Calculate new monthly payment
  const newMonthlyRate = newInterestRate / 100 / 12;
  const newMonthlyPayment = currentLoanAmount *
    (newMonthlyRate * Math.pow(1 + newMonthlyRate, newLoanTerm * 12)) /
    (Math.pow(1 + newMonthlyRate, newLoanTerm * 12) - 1);

  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
  const breakEvenMonths = monthlySavings > 0 ? closingCosts / monthlySavings : Infinity;
  const breakEvenYears = breakEvenMonths / 12;

  const totalSavingsFirstYear = monthlySavings * 12;
  const totalSavingsFiveYears = monthlySavings * 60;

  // Calculate total interest savings over remaining term
  const totalCurrentPayments = currentMonthlyPayment * currentMonthsRemaining;
  const totalNewPayments = newMonthlyPayment * Math.min(newLoanTerm * 12, currentMonthsRemaining);
  const totalCostSavings = totalCurrentPayments - totalNewPayments - closingCosts;

  // Calculate NPV of savings
  const discountRate = 0.05; // 5% annual discount rate
  let netPresentValueSavings = -closingCosts;

  for (let month = 1; month <= currentMonthsRemaining; month++) {
    if (month <= newLoanTerm * 12) {
      const monthlyNPV = monthlySavings / Math.pow(1 + discountRate / 12, month);
      netPresentValueSavings += monthlyNPV;
    }
  }

  return {
    currentLoanAmount: Math.round(currentLoanAmount * 100) / 100,
    currentInterestRate,
    currentLoanTerm,
    newInterestRate,
    newLoanTerm,
    closingCosts: Math.round(closingCosts * 100) / 100,
    currentMonthsRemaining,
    currentMonthlyPayment: Math.round(currentMonthlyPayment * 100) / 100,
    newMonthlyPayment: Math.round(newMonthlyPayment * 100) / 100,
    monthlySavings: Math.round(monthlySavings * 100) / 100,
    breakEvenMonths: Math.round(breakEvenMonths * 100) / 100,
    breakEvenYears: Math.round(breakEvenYears * 100) / 100,
    totalSavingsFirstYear: Math.round(totalSavingsFirstYear * 100) / 100,
    totalSavingsFiveYears: Math.round(totalSavingsFiveYears * 100) / 100,
    totalCostSavings: Math.round(totalCostSavings * 100) / 100,
    netPresentValueSavings: Math.round(netPresentValueSavings * 100) / 100,
    savingsAnalysis: {
      monthlyPaymentReduction: Math.round(monthlySavings * 100) / 100,
      totalInterestSavings: Math.round((totalCurrentPayments - totalNewPayments) * 100) / 100,
      breakEvenPoint: Math.round(breakEvenMonths * 100) / 100,
      netBenefit: Math.round(netPresentValueSavings * 100) / 100
    }
  };
}

/**
 * Calculate cash-out refinance analysis
 */
export function calculateCashOutRefinance(
  currentLoanAmount: number,
  currentPropertyValue: number,
  newLoanAmount: number,
  newInterestRate: number,
  newLoanTerm: number,
  closingCosts: number,
  cashOutAmount: number
): {
  currentLoanAmount: number;
  currentPropertyValue: number;
  newLoanAmount: number;
  newInterestRate: number;
  newLoanTerm: number;
  closingCosts: number;
  cashOutAmount: number;
  loanToValueRatio: number;
  newLoanToValueRatio: number;
  cashOutPercentage: number;
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlyPaymentIncrease: number;
  breakEvenMonths: number;
  totalCashOutCosts: number;
  netCashOutAmount: number;
  cashOutAnalysis: {
    equityAvailable: number;
    cashOutAmount: number;
    totalCosts: number;
    netProceeds: number;
    paymentImpact: number;
  };
} {
  if (currentLoanAmount < 0) {
    throw new Error('Current loan amount cannot be negative');
  }
  if (currentPropertyValue <= 0) {
    throw new Error('Current property value must be positive');
  }
  if (newLoanAmount < 0) {
    throw new Error('New loan amount cannot be negative');
  }
  if (newInterestRate < 0 || newInterestRate > 50) {
    throw new Error('New interest rate must be between 0 and 50');
  }
  if (newLoanTerm <= 0) {
    throw new Error('New loan term must be positive');
  }
  if (closingCosts < 0) {
    throw new Error('Closing costs cannot be negative');
  }
  if (cashOutAmount < 0) {
    throw new Error('Cash out amount cannot be negative');
  }

  const loanToValueRatio = (currentLoanAmount / currentPropertyValue) * 100;
  const newLoanToValueRatio = (newLoanAmount / currentPropertyValue) * 100;
  const cashOutPercentage = (cashOutAmount / currentPropertyValue) * 100;

  // Calculate current monthly payment (assume 30-year term remaining)
  const currentMonthlyRate = 0.045 / 12; // Assume 4.5% current rate
  const currentMonthsRemaining = 360;
  const currentMonthlyPayment = currentLoanAmount *
    (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentMonthsRemaining)) /
    (Math.pow(1 + currentMonthlyRate, currentMonthsRemaining) - 1);

  // Calculate new monthly payment
  const newMonthlyRate = newInterestRate / 100 / 12;
  const newMonthlyPayment = newLoanAmount *
    (newMonthlyRate * Math.pow(1 + newMonthlyRate, newLoanTerm * 12)) /
    (Math.pow(1 + newMonthlyRate, newLoanTerm * 12) - 1);

  const monthlyPaymentIncrease = newMonthlyPayment - currentMonthlyPayment;
  const breakEvenMonths = monthlyPaymentIncrease > 0 ? (closingCosts + cashOutAmount) / monthlyPaymentIncrease : 0;

  const equityAvailable = currentPropertyValue - currentLoanAmount;
  const totalCashOutCosts = closingCosts;
  const netCashOutAmount = cashOutAmount - totalCashOutCosts;

  return {
    currentLoanAmount: Math.round(currentLoanAmount * 100) / 100,
    currentPropertyValue: Math.round(currentPropertyValue * 100) / 100,
    newLoanAmount: Math.round(newLoanAmount * 100) / 100,
    newInterestRate,
    newLoanTerm,
    closingCosts: Math.round(closingCosts * 100) / 100,
    cashOutAmount: Math.round(cashOutAmount * 100) / 100,
    loanToValueRatio: Math.round(loanToValueRatio * 100) / 100,
    newLoanToValueRatio: Math.round(newLoanToValueRatio * 100) / 100,
    cashOutPercentage: Math.round(cashOutPercentage * 100) / 100,
    currentMonthlyPayment: Math.round(currentMonthlyPayment * 100) / 100,
    newMonthlyPayment: Math.round(newMonthlyPayment * 100) / 100,
    monthlyPaymentIncrease: Math.round(monthlyPaymentIncrease * 100) / 100,
    breakEvenMonths: Math.round(breakEvenMonths * 100) / 100,
    totalCashOutCosts: Math.round(totalCashOutCosts * 100) / 100,
    netCashOutAmount: Math.round(netCashOutAmount * 100) / 100,
    cashOutAnalysis: {
      equityAvailable: Math.round(equityAvailable * 100) / 100,
      cashOutAmount: Math.round(cashOutAmount * 100) / 100,
      totalCosts: Math.round(totalCashOutCosts * 100) / 100,
      netProceeds: Math.round(netCashOutAmount * 100) / 100,
      paymentImpact: Math.round(monthlyPaymentIncrease * 100) / 100
    }
  };
}

/**
 * Calculate rate and term refinance options
 */
export function calculateRateAndTermRefinance(
  currentLoanAmount: number,
  currentInterestRate: number,
  currentMonthsRemaining: number,
  newInterestRate: number,
  newLoanTerm: number,
  closingCosts: number,
  propertyValue: number
): {
  currentLoanAmount: number;
  currentInterestRate: number;
  currentMonthsRemaining: number;
  newInterestRate: number;
  newLoanTerm: number;
  closingCosts: number;
  propertyValue: number;
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  totalInterestCurrent: number;
  totalInterestNew: number;
  interestSavings: number;
  breakEvenAnalysis: {
    breakEvenMonths: number;
    breakEvenYears: number;
    totalSavingsAfterBreakEven: number;
  };
  loanComparison: {
    currentLoanToValue: number;
    newLoanToValue: number;
    currentTotalPayments: number;
    newTotalPayments: number;
    paymentDifference: number;
  };
} {
  if (currentLoanAmount <= 0) {
    throw new Error('Current loan amount must be positive');
  }
  if (currentInterestRate < 0 || currentInterestRate > 50) {
    throw new Error('Current interest rate must be between 0 and 50');
  }
  if (currentMonthsRemaining <= 0) {
    throw new Error('Current months remaining must be positive');
  }
  if (newInterestRate < 0 || newInterestRate > 50) {
    throw new Error('New interest rate must be between 0 and 50');
  }
  if (newLoanTerm <= 0) {
    throw new Error('New loan term must be positive');
  }
  if (closingCosts < 0) {
    throw new Error('Closing costs cannot be negative');
  }
  if (propertyValue <= 0) {
    throw new Error('Property value must be positive');
  }

  // Calculate current monthly payment
  const currentMonthlyRate = currentInterestRate / 100 / 12;
  const currentMonthlyPayment = currentLoanAmount *
    (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentMonthsRemaining)) /
    (Math.pow(1 + currentMonthlyRate, currentMonthsRemaining) - 1);

  // Calculate new monthly payment
  const newMonthlyRate = newInterestRate / 100 / 12;
  const newMonthlyPayment = currentLoanAmount *
    (newMonthlyRate * Math.pow(1 + newMonthlyRate, newLoanTerm * 12)) /
    (Math.pow(1 + newMonthlyRate, newLoanTerm * 12) - 1);

  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;

  // Calculate total interest
  const totalCurrentPayments = currentMonthlyPayment * currentMonthsRemaining;
  const totalNewPayments = newMonthlyPayment * newLoanTerm * 12;
  const totalInterestCurrent = totalCurrentPayments - currentLoanAmount;
  const totalInterestNew = totalNewPayments - currentLoanAmount;
  const interestSavings = totalInterestCurrent - totalInterestNew;

  const breakEvenMonths = monthlySavings > 0 ? closingCosts / monthlySavings : Infinity;
  const breakEvenYears = breakEvenMonths / 12;
  const totalSavingsAfterBreakEven = monthlySavings * (Math.min(currentMonthsRemaining, newLoanTerm * 12) - breakEvenMonths);

  const currentLoanToValue = (currentLoanAmount / propertyValue) * 100;
  const newLoanToValue = (currentLoanAmount / propertyValue) * 100; // Same LTV since loan amount unchanged

  return {
    currentLoanAmount: Math.round(currentLoanAmount * 100) / 100,
    currentInterestRate,
    currentMonthsRemaining,
    newInterestRate,
    newLoanTerm,
    closingCosts: Math.round(closingCosts * 100) / 100,
    propertyValue: Math.round(propertyValue * 100) / 100,
    currentMonthlyPayment: Math.round(currentMonthlyPayment * 100) / 100,
    newMonthlyPayment: Math.round(newMonthlyPayment * 100) / 100,
    monthlySavings: Math.round(monthlySavings * 100) / 100,
    totalInterestCurrent: Math.round(totalInterestCurrent * 100) / 100,
    totalInterestNew: Math.round(totalInterestNew * 100) / 100,
    interestSavings: Math.round(interestSavings * 100) / 100,
    breakEvenAnalysis: {
      breakEvenMonths: Math.round(breakEvenMonths * 100) / 100,
      breakEvenYears: Math.round(breakEvenYears * 100) / 100,
      totalSavingsAfterBreakEven: Math.round(totalSavingsAfterBreakEven * 100) / 100
    },
    loanComparison: {
      currentLoanToValue: Math.round(currentLoanToValue * 100) / 100,
      newLoanToValue: Math.round(newLoanToValue * 100) / 100,
      currentTotalPayments: Math.round(totalCurrentPayments * 100) / 100,
      newTotalPayments: Math.round(totalNewPayments * 100) / 100,
      paymentDifference: Math.round((totalNewPayments - totalCurrentPayments) * 100) / 100
    }
  };
}

/**
 * Calculate refinance with debt consolidation
 */
export function calculateRefinanceWithConsolidation(
  mortgageLoanAmount: number,
  mortgageInterestRate: number,
  mortgageMonthsRemaining: number,
  consolidationLoans: Array<{
    loanAmount: number;
    interestRate: number;
    monthsRemaining: number;
    description: string;
  }>,
  newMortgageRate: number,
  newMortgageTerm: number,
  closingCosts: number
): {
  mortgageLoanAmount: number;
  mortgageInterestRate: number;
  mortgageMonthsRemaining: number;
  consolidationLoans: any[];
  newMortgageRate: number;
  newMortgageTerm: number;
  closingCosts: number;
  totalCurrentDebt: number;
  totalNewMortgageAmount: number;
  currentTotalMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  totalInterestCurrent: number;
  totalInterestNew: number;
  interestSavings: number;
  consolidationAnalysis: {
    totalConsolidationAmount: number;
    currentConsolidationPayments: number;
    newMortgageIncrease: number;
    breakEvenMonths: number;
  };
} {
  if (mortgageLoanAmount < 0) {
    throw new Error('Mortgage loan amount cannot be negative');
  }
  if (mortgageInterestRate < 0 || mortgageInterestRate > 50) {
    throw new Error('Mortgage interest rate must be between 0 and 50');
  }
  if (mortgageMonthsRemaining <= 0) {
    throw new Error('Mortgage months remaining must be positive');
  }
  if (newMortgageRate < 0 || newMortgageRate > 50) {
    throw new Error('New mortgage rate must be between 0 and 50');
  }
  if (newMortgageTerm <= 0) {
    throw new Error('New mortgage term must be positive');
  }
  if (closingCosts < 0) {
    throw new Error('Closing costs cannot be negative');
  }

  // Calculate current mortgage payment
  const mortgageMonthlyRate = mortgageInterestRate / 100 / 12;
  const currentMortgagePayment = mortgageLoanAmount *
    (mortgageMonthlyRate * Math.pow(1 + mortgageMonthlyRate, mortgageMonthsRemaining)) /
    (Math.pow(1 + mortgageMonthlyRate, mortgageMonthsRemaining) - 1);

  // Calculate consolidation loans total
  let totalConsolidationAmount = 0;
  let currentConsolidationPayments = 0;

  for (const loan of consolidationLoans) {
    if (loan.loanAmount < 0) {
      throw new Error(`Loan amount cannot be negative for ${loan.description}`);
    }
    if (loan.interestRate < 0 || loan.interestRate > 50) {
      throw new Error(`Interest rate must be between 0 and 50 for ${loan.description}`);
    }
    if (loan.monthsRemaining <= 0) {
      throw new Error(`Months remaining must be positive for ${loan.description}`);
    }

    totalConsolidationAmount += loan.loanAmount;

    const loanMonthlyRate = loan.interestRate / 100 / 12;
    const loanMonthlyPayment = loan.loanAmount *
      (loanMonthlyRate * Math.pow(1 + loanMonthlyRate, loan.monthsRemaining)) /
      (Math.pow(1 + loanMonthlyRate, loan.monthsRemaining) - 1);

    currentConsolidationPayments += loanMonthlyPayment;
  }

  const totalCurrentDebt = mortgageLoanAmount + totalConsolidationAmount;
  const totalNewMortgageAmount = totalCurrentDebt;
  const currentTotalMonthlyPayment = currentMortgagePayment + currentConsolidationPayments;

  // Calculate new mortgage payment
  const newMortgageMonthlyRate = newMortgageRate / 100 / 12;
  const newMonthlyPayment = totalNewMortgageAmount *
    (newMortgageMonthlyRate * Math.pow(1 + newMortgageMonthlyRate, newMortgageTerm * 12)) /
    (Math.pow(1 + newMortgageMonthlyRate, newMortgageTerm * 12) - 1);

  const monthlySavings = currentTotalMonthlyPayment - newMonthlyPayment;

  // Calculate total interest
  const totalCurrentPayments = currentTotalMonthlyPayment * Math.min(mortgageMonthsRemaining, 360); // Assume max 30 years
  const totalNewPayments = newMonthlyPayment * newMortgageTerm * 12;
  const totalInterestCurrent = totalCurrentPayments - totalCurrentDebt;
  const totalInterestNew = totalNewPayments - totalNewMortgageAmount;
  const interestSavings = totalInterestCurrent - totalInterestNew;

  const newMortgageIncrease = totalNewMortgageAmount - mortgageLoanAmount;
  const breakEvenMonths = monthlySavings > 0 ? closingCosts / monthlySavings : Infinity;

  return {
    mortgageLoanAmount: Math.round(mortgageLoanAmount * 100) / 100,
    mortgageInterestRate,
    mortgageMonthsRemaining,
    consolidationLoans,
    newMortgageRate,
    newMortgageTerm,
    closingCosts: Math.round(closingCosts * 100) / 100,
    totalCurrentDebt: Math.round(totalCurrentDebt * 100) / 100,
    totalNewMortgageAmount: Math.round(totalNewMortgageAmount * 100) / 100,
    currentTotalMonthlyPayment: Math.round(currentTotalMonthlyPayment * 100) / 100,
    newMonthlyPayment: Math.round(newMonthlyPayment * 100) / 100,
    monthlySavings: Math.round(monthlySavings * 100) / 100,
    totalInterestCurrent: Math.round(totalInterestCurrent * 100) / 100,
    totalInterestNew: Math.round(totalInterestNew * 100) / 100,
    interestSavings: Math.round(interestSavings * 100) / 100,
    consolidationAnalysis: {
      totalConsolidationAmount: Math.round(totalConsolidationAmount * 100) / 100,
      currentConsolidationPayments: Math.round(currentConsolidationPayments * 100) / 100,
      newMortgageIncrease: Math.round(newMortgageIncrease * 100) / 100,
      breakEvenMonths: Math.round(breakEvenMonths * 100) / 100
    }
  };
}

/**
 * Calculate refinance timing optimization
 */
export function calculateRefinanceTimingOptimization(
  currentLoanAmount: number,
  currentInterestRate: number,
  currentMonthsRemaining: number,
  expectedNewRate: number,
  rateLockPeriod: number = 60,
  closingPeriod: number = 30,
  rateIncreasePerMonth: number = 0.01,
  closingCosts: number = 3000
): {
  currentLoanAmount: number;
  currentInterestRate: number;
  currentMonthsRemaining: number;
  expectedNewRate: number;
  rateLockPeriod: number;
  closingPeriod: number;
  rateIncreasePerMonth: number;
  closingCosts: number;
  optimalTiming: {
    immediateRefinance: boolean;
    waitMonths: number;
    breakEvenRate: number;
    expectedRateAtOptimalTime: number;
  };
  scenarioAnalysis: {
    refinanceNow: {
      monthlySavings: number;
      breakEvenMonths: number;
      netPresentValue: number;
    };
    waitAndRefinance: {
      expectedRate: number;
      monthlySavings: number;
      breakEvenMonths: number;
      netPresentValue: number;
    };
  };
} {
  if (currentLoanAmount <= 0) {
    throw new Error('Current loan amount must be positive');
  }
  if (currentInterestRate < 0 || currentInterestRate > 50) {
    throw new Error('Current interest rate must be between 0 and 50');
  }
  if (currentMonthsRemaining <= 0) {
    throw new Error('Current months remaining must be positive');
  }
  if (expectedNewRate < 0 || expectedNewRate > 50) {
    throw new Error('Expected new rate must be between 0 and 50');
  }
  if (rateLockPeriod < 0) {
    throw new Error('Rate lock period cannot be negative');
  }
  if (closingPeriod < 0) {
    throw new Error('Closing period cannot be negative');
  }
  if (rateIncreasePerMonth < 0) {
    throw new Error('Rate increase per month cannot be negative');
  }
  if (closingCosts < 0) {
    throw new Error('Closing costs cannot be negative');
  }

  // Calculate current monthly payment
  const currentMonthlyRate = currentInterestRate / 100 / 12;
  const currentMonthlyPayment = currentLoanAmount *
    (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentMonthsRemaining)) /
    (Math.pow(1 + currentMonthlyRate, currentMonthsRemaining) - 1);

  // Scenario 1: Refinance immediately
  const immediateNewRate = expectedNewRate;
  const immediateMonthlyRate = immediateNewRate / 100 / 12;
  const immediateMonthlyPayment = currentLoanAmount *
    (immediateMonthlyRate * Math.pow(1 + immediateMonthlyRate, currentMonthsRemaining)) /
    (Math.pow(1 + immediateMonthlyRate, currentMonthsRemaining) - 1);

  const immediateMonthlySavings = currentMonthlyPayment - immediateMonthlyPayment;
  const immediateBreakEvenMonths = immediateMonthlySavings > 0 ? closingCosts / immediateMonthlySavings : Infinity;

  // Calculate NPV for immediate refinance
  const discountRate = 0.05; // 5% annual discount rate
  let immediateNPV = -closingCosts;
  for (let month = 1; month <= currentMonthsRemaining; month++) {
    immediateNPV += immediateMonthlySavings / Math.pow(1 + discountRate / 12, month);
  }

  // Scenario 2: Wait for better rate
  const totalDelayMonths = rateLockPeriod + closingPeriod;
  const expectedRateIncrease = rateIncreasePerMonth * totalDelayMonths;
  const futureExpectedRate = expectedNewRate + expectedRateIncrease;

  const futureMonthlyRate = futureExpectedRate / 100 / 12;
  const futureMonthlyPayment = currentLoanAmount *
    (futureMonthlyRate * Math.pow(1 + futureMonthlyRate, currentMonthsRemaining - totalDelayMonths)) /
    (Math.pow(1 + futureMonthlyRate, currentMonthsRemaining - totalDelayMonths) - 1);

  const futureMonthlySavings = currentMonthlyPayment - futureMonthlyPayment;
  const futureBreakEvenMonths = futureMonthlySavings > 0 ? closingCosts / futureMonthlySavings : Infinity;

  // Calculate NPV for waiting
  let futureNPV = 0;
  // No savings during waiting period
  for (let month = totalDelayMonths + 1; month <= currentMonthsRemaining; month++) {
    futureNPV += futureMonthlySavings / Math.pow(1 + discountRate / 12, month);
  }
  futureNPV -= closingCosts / Math.pow(1 + discountRate / 12, totalDelayMonths);

  // Determine optimal timing
  const immediateRefinance = immediateNPV > futureNPV;
  const waitMonths = immediateRefinance ? 0 : totalDelayMonths;
  const breakEvenRate = currentInterestRate - (closingCosts / (currentMonthlyPayment * currentMonthsRemaining / 12));
  const expectedRateAtOptimalTime = immediateRefinance ? expectedNewRate : futureExpectedRate;

  return {
    currentLoanAmount: Math.round(currentLoanAmount * 100) / 100,
    currentInterestRate,
    currentMonthsRemaining,
    expectedNewRate,
    rateLockPeriod,
    closingPeriod,
    rateIncreasePerMonth,
    closingCosts: Math.round(closingCosts * 100) / 100,
    optimalTiming: {
      immediateRefinance,
      waitMonths,
      breakEvenRate: Math.round(breakEvenRate * 100) / 100,
      expectedRateAtOptimalTime: Math.round(expectedRateAtOptimalTime * 100) / 100
    },
    scenarioAnalysis: {
      refinanceNow: {
        monthlySavings: Math.round(immediateMonthlySavings * 100) / 100,
        breakEvenMonths: Math.round(immediateBreakEvenMonths * 100) / 100,
        netPresentValue: Math.round(immediateNPV * 100) / 100
      },
      waitAndRefinance: {
        expectedRate: Math.round(futureExpectedRate * 100) / 100,
        monthlySavings: Math.round(futureMonthlySavings * 100) / 100,
        breakEvenMonths: Math.round(futureBreakEvenMonths * 100) / 100,
        netPresentValue: Math.round(futureNPV * 100) / 100
      }
    }
  };
}

/**
 * Main refinance calculation function
 */
export function calculateRefinance(inputs: any): any {
  const {
    calculationType,
    currentLoanAmount, currentInterestRate, currentLoanTerm, newInterestRate, newLoanTerm,
    closingCosts, currentMonthsRemaining, currentPropertyValue, newLoanAmount, cashOutAmount,
    mortgageLoanAmount, mortgageInterestRate, mortgageMonthsRemaining, consolidationLoans,
    expectedNewRate, rateLockPeriod, closingPeriod, rateIncreasePerMonth
  } = inputs;

  switch (calculationType) {
    case 'savings_analysis':
      return calculateRefinanceSavings(
        currentLoanAmount,
        currentInterestRate,
        currentLoanTerm,
        newInterestRate,
        newLoanTerm,
        closingCosts,
        currentMonthsRemaining
      );

    case 'cash_out':
      return calculateCashOutRefinance(
        currentLoanAmount,
        currentPropertyValue,
        newLoanAmount,
        newInterestRate,
        newLoanTerm,
        closingCosts,
        cashOutAmount
      );

    case 'rate_and_term':
      return calculateRateAndTermRefinance(
        currentLoanAmount,
        currentInterestRate,
        currentMonthsRemaining,
        newInterestRate,
        newLoanTerm,
        closingCosts,
        currentPropertyValue
      );

    case 'debt_consolidation':
      return calculateRefinanceWithConsolidation(
        mortgageLoanAmount,
        mortgageInterestRate,
        mortgageMonthsRemaining,
        consolidationLoans,
        newInterestRate,
        newLoanTerm,
        closingCosts
      );

    case 'timing_optimization':
      return calculateRefinanceTimingOptimization(
        currentLoanAmount,
        currentInterestRate,
        currentMonthsRemaining,
        expectedNewRate,
        rateLockPeriod,
        closingPeriod,
        rateIncreasePerMonth,
        closingCosts
      );

    case 'comprehensive':
      // Calculate comprehensive refinance analysis
      const savings = calculateRefinanceSavings(
        currentLoanAmount || 300000,
        currentInterestRate || 4.5,
        currentLoanTerm || 30,
        newInterestRate || 3.5,
        newLoanTerm || 30,
        closingCosts || 5000,
        currentMonthsRemaining || 300
      );

      const cashOut = calculateCashOutRefinance(
        currentLoanAmount || 300000,
        currentPropertyValue || 400000,
        newLoanAmount || 320000,
        newInterestRate || 3.5,
        newLoanTerm || 30,
        closingCosts || 5000,
        cashOutAmount || 20000
      );

      const timing = calculateRefinanceTimingOptimization(
        currentLoanAmount || 300000,
        currentInterestRate || 4.5,
        currentMonthsRemaining || 300,
        expectedNewRate || 3.5,
        rateLockPeriod || 60,
        closingPeriod || 30,
        rateIncreasePerMonth || 0.01,
        closingCosts || 5000
      );

      return {
        savingsAnalysis: savings,
        cashOutAnalysis: cashOut,
        timingOptimization: timing,
        summary: {
          monthlySavings: savings.monthlySavings,
          breakEvenMonths: savings.breakEvenMonths,
          netCashOut: cashOut.netCashOutAmount,
          optimalTiming: timing.optimalTiming.immediateRefinance ? 'Refinance Now' : `Wait ${timing.optimalTiming.waitMonths} months`,
          totalNPVSavings: savings.netPresentValueSavings
        }
      };

    default:
      throw new Error('Unknown refinance calculation type');
  }
}