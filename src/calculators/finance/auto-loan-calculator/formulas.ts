/**
 * Auto Loan Calculator Formulas
 * Industry-standard automotive financing calculations
 */

/**
 * Calculate monthly auto loan payment using standard loan formula
 */
export function calculateMonthlyPayment(
  loanAmount: number,
  annualInterestRate: number,
  loanTermMonths: number
): number {
  const monthlyRate = annualInterestRate / 100 / 12;

  if (monthlyRate === 0) {
    return loanAmount / loanTermMonths;
  }

  const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths);
  const denominator = Math.pow(1 + monthlyRate, loanTermMonths) - 1;

  return numerator / denominator;
}

/**
 * Calculate total loan cost (principal + interest)
 */
export function calculateTotalLoanCost(
  monthlyPayment: number,
  loanTermMonths: number
): number {
  return monthlyPayment * loanTermMonths;
}

/**
 * Calculate total interest paid over loan term
 */
export function calculateTotalInterest(
  totalLoanCost: number,
  loanAmount: number
): number {
  return totalLoanCost - loanAmount;
}

/**
 * Calculate loan-to-value ratio
 */
export function calculateLoanToValueRatio(
  loanAmount: number,
  vehicleValue: number
): number {
  return (loanAmount / vehicleValue) * 100;
}

/**
 * Calculate debt-to-income ratio for auto loan qualification
 */
export function calculateDebtToIncomeRatio(
  monthlyPayment: number,
  monthlyIncome: number,
  otherMonthlyDebts: number = 0
): number {
  const totalMonthlyDebts = monthlyPayment + otherMonthlyDebts;
  return (totalMonthlyDebts / monthlyIncome) * 100;
}

/**
 * Calculate affordable loan amount based on income
 */
export function calculateAffordableLoanAmount(
  monthlyIncome: number,
  annualInterestRate: number,
  loanTermMonths: number,
  maxDTIRatio: number = 36,
  otherMonthlyDebts: number = 0
): number {
  const monthlyRate = annualInterestRate / 100 / 12;
  const maxMonthlyPayment = (monthlyIncome * maxDTIRatio / 100) - otherMonthlyDebts;

  if (maxMonthlyPayment <= 0) {
    return 0;
  }

  if (monthlyRate === 0) {
    return maxMonthlyPayment * loanTermMonths;
  }

  // Solve for loan amount using loan formula
  const numerator = maxMonthlyPayment * (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
  const denominator = monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths);

  return numerator / denominator;
}

/**
 * Calculate auto loan amortization schedule
 */
export function calculateAmortizationSchedule(
  loanAmount: number,
  annualInterestRate: number,
  loanTermMonths: number
): Array<{
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}> {
  const monthlyRate = annualInterestRate / 100 / 12;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, annualInterestRate, loanTermMonths);

  const schedule = [];
  let balance = loanAmount;

  for (let month = 1; month <= loanTermMonths; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;

    // Ensure balance doesn't go negative due to rounding
    if (balance < 0) {
      balance = 0;
    }

    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance
    });
  }

  return schedule;
}

/**
 * Calculate early payoff savings
 */
export function calculateEarlyPayoffSavings(
  loanAmount: number,
  annualInterestRate: number,
  loanTermMonths: number,
  payoffMonth: number,
  extraPayment: number = 0
): {
  originalTotalCost: number;
  actualTotalCost: number;
  totalSavings: number;
  interestSaved: number;
  timeSavedMonths: number;
} {
  const monthlyPayment = calculateMonthlyPayment(loanAmount, annualInterestRate, loanTermMonths);
  const originalTotalCost = monthlyPayment * loanTermMonths;

  // Calculate actual payoff with extra payment
  const schedule = calculateAmortizationSchedule(loanAmount, annualInterestRate, loanTermMonths);
  let actualTotalCost = 0;
  let balance = loanAmount;
  let months = 0;

  for (let i = 0; i < schedule.length && balance > 0; i++) {
    months++;
    const entry = schedule[i];
    let payment = entry.payment;

    if (i + 1 === payoffMonth && extraPayment > 0) {
      payment += extraPayment;
    }

    actualTotalCost += payment;
    balance = entry.balance;

    if (balance <= payment) {
      actualTotalCost -= (payment - balance);
      break;
    }
  }

  const totalSavings = originalTotalCost - actualTotalCost;
  const interestSaved = calculateTotalInterest(originalTotalCost, loanAmount) -
                       calculateTotalInterest(actualTotalCost, loanAmount);
  const timeSavedMonths = loanTermMonths - months;

  return {
    originalTotalCost,
    actualTotalCost,
    totalSavings,
    interestSaved,
    timeSavedMonths
  };
}

/**
 * Calculate trade-in value impact on loan
 */
export function calculateTradeInImpact(
  vehiclePrice: number,
  tradeInValue: number,
  downPayment: number,
  loanAmount: number
): {
  adjustedLoanAmount: number;
  equityFromTradeIn: number;
  totalDownPayment: number;
} {
  const totalDownPayment = downPayment + tradeInValue;
  const adjustedLoanAmount = vehiclePrice - totalDownPayment;
  const equityFromTradeIn = tradeInValue;

  return {
    adjustedLoanAmount,
    equityFromTradeIn,
    totalDownPayment
  };
}

/**
 * Calculate negative equity (underwater) amount
 */
export function calculateNegativeEquity(
  currentLoanBalance: number,
  currentVehicleValue: number
): number {
  return Math.max(0, currentLoanBalance - currentVehicleValue);
}

/**
 * Calculate auto loan qualification based on credit score
 */
export function calculateLoanQualification(
  creditScore: number,
  loanAmount: number,
  debtToIncomeRatio: number
): {
  qualificationLevel: 'excellent' | 'good' | 'fair' | 'poor' | 'denied';
  estimatedInterestRate: number;
  maxLoanAmount: number;
  approvalProbability: number;
} {
  let qualificationLevel: 'excellent' | 'good' | 'fair' | 'poor' | 'denied';
  let estimatedInterestRate: number;
  let maxLoanAmount: number;
  let approvalProbability: number;

  if (creditScore >= 800) {
    qualificationLevel = 'excellent';
    estimatedInterestRate = 3.5;
    maxLoanAmount = loanAmount * 1.2;
    approvalProbability = 95;
  } else if (creditScore >= 740) {
    qualificationLevel = 'good';
    estimatedInterestRate = 4.5;
    maxLoanAmount = loanAmount * 1.1;
    approvalProbability = 85;
  } else if (creditScore >= 670) {
    qualificationLevel = 'fair';
    estimatedInterestRate = 6.5;
    maxLoanAmount = loanAmount * 0.9;
    approvalProbability = 70;
  } else if (creditScore >= 580) {
    qualificationLevel = 'poor';
    estimatedInterestRate = 9.5;
    maxLoanAmount = loanAmount * 0.7;
    approvalProbability = 40;
  } else {
    qualificationLevel = 'denied';
    estimatedInterestRate = 15.0;
    maxLoanAmount = 0;
    approvalProbability = 10;
  }

  // Adjust for DTI ratio
  if (debtToIncomeRatio > 43) {
    approvalProbability -= 20;
    maxLoanAmount *= 0.8;
  }

  return {
    qualificationLevel,
    estimatedInterestRate,
    maxLoanAmount,
    approvalProbability
  };
}

/**
 * Calculate lease vs buy comparison
 */
export function calculateLeaseVsBuy(
  vehiclePrice: number,
  loanTermMonths: number,
  annualInterestRate: number,
  residualValuePercentage: number,
  monthlyLeasePayment: number,
  downPayment: number = 0
): {
  buyTotalCost: number;
  leaseTotalCost: number;
  buyVsLeaseSavings: number;
  depreciation: number;
  leaseMileageLimit: number;
  excessMileageCost: number;
} {
  // Calculate buy scenario
  const loanAmount = vehiclePrice - downPayment;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, annualInterestRate, loanTermMonths);
  const buyTotalCost = (monthlyPayment * loanTermMonths) + downPayment;

  // Calculate lease scenario
  const leaseTotalCost = monthlyLeasePayment * loanTermMonths;

  // Calculate depreciation
  const residualValue = vehiclePrice * (residualValuePercentage / 100);
  const depreciation = vehiclePrice - residualValue;

  // Estimate lease terms
  const leaseMileageLimit = 12000; // Typical annual mileage
  const excessMileageCost = 0.25; // Cost per excess mile

  const buyVsLeaseSavings = leaseTotalCost - buyTotalCost;

  return {
    buyTotalCost,
    leaseTotalCost,
    buyVsLeaseSavings,
    depreciation,
    leaseMileageLimit: leaseMileageLimit * (loanTermMonths / 12),
    excessMileageCost
  };
}

/**
 * Calculate fuel cost savings with different vehicles
 */
export function calculateFuelSavings(
  currentMPG: number,
  newMPG: number,
  annualMiles: number,
  fuelPricePerGallon: number
): {
  annualFuelSavings: number;
  monthlyFuelSavings: number;
  gallonsSavedPerYear: number;
  paybackPeriodMonths: number;
  environmentalImpact: {
    co2Reduction: number;
    gasolineSaved: number;
  };
} {
  const gallonsPerYearCurrent = annualMiles / currentMPG;
  const gallonsPerYearNew = annualMiles / newMPG;
  const gallonsSavedPerYear = gallonsPerYearCurrent - gallonsPerYearNew;

  const annualFuelSavings = gallonsSavedPerYear * fuelPricePerGallon;
  const monthlyFuelSavings = annualFuelSavings / 12;

  // Estimate payback period (simplified)
  const paybackPeriodMonths = 60; // Assume 5-year payback for fuel efficiency upgrade

  // Environmental impact (simplified)
  const co2Reduction = gallonsSavedPerYear * 19.6; // lbs of CO2 per gallon
  const environmentalImpact = {
    co2Reduction,
    gasolineSaved: gallonsSavedPerYear
  };

  return {
    annualFuelSavings,
    monthlyFuelSavings,
    gallonsSavedPerYear,
    paybackPeriodMonths,
    environmentalImpact
  };
}

/**
 * Main auto loan calculation function
 */
export function calculateAutoLoan(inputs: any): any {
  const {
    calculationType,
    loanAmount,
    vehicleValue,
    annualInterestRate,
    loanTermMonths,
    monthlyIncome,
    otherMonthlyDebts,
    maxDTIRatio,
    payoffMonth,
    extraPayment,
    tradeInValue,
    downPayment,
    currentLoanBalance,
    creditScore,
    residualValuePercentage,
    monthlyLeasePayment,
    currentMPG,
    newMPG,
    annualMiles,
    fuelPricePerGallon
  } = inputs;

  switch (calculationType) {
    case 'monthly_payment': {
      const monthlyPayment = calculateMonthlyPayment(loanAmount, annualInterestRate, loanTermMonths);
      const totalLoanCost = calculateTotalLoanCost(monthlyPayment, loanTermMonths);
      const totalInterest = calculateTotalInterest(totalLoanCost, loanAmount);
      const ltvRatio = calculateLoanToValueRatio(loanAmount, vehicleValue);

      return {
        monthlyPayment,
        totalLoanCost,
        totalInterest,
        ltvRatio
      };
    }

    case 'affordability': {
      const affordableAmount = calculateAffordableLoanAmount(
        monthlyIncome,
        annualInterestRate,
        loanTermMonths,
        maxDTIRatio,
        otherMonthlyDebts
      );

      const monthlyPayment = calculateMonthlyPayment(affordableAmount, annualInterestRate, loanTermMonths);
      const dtiRatio = calculateDebtToIncomeRatio(monthlyPayment, monthlyIncome, otherMonthlyDebts);

      return {
        affordableLoanAmount: affordableAmount,
        monthlyPayment,
        debtToIncomeRatio: dtiRatio
      };
    }

    case 'amortization': {
      const schedule = calculateAmortizationSchedule(loanAmount, annualInterestRate, loanTermMonths);
      return { amortizationSchedule: schedule };
    }

    case 'early_payoff': {
      const savings = calculateEarlyPayoffSavings(
        loanAmount,
        annualInterestRate,
        loanTermMonths,
        payoffMonth,
        extraPayment
      );
      return savings;
    }

    case 'trade_in': {
      const impact = calculateTradeInImpact(vehicleValue, tradeInValue, downPayment, loanAmount);
      return impact;
    }

    case 'negative_equity': {
      const negativeEquity = calculateNegativeEquity(currentLoanBalance, vehicleValue);
      return { negativeEquity };
    }

    case 'qualification': {
      const monthlyPayment = calculateMonthlyPayment(loanAmount, annualInterestRate, loanTermMonths);
      const dtiRatio = calculateDebtToIncomeRatio(monthlyPayment, monthlyIncome, otherMonthlyDebts);

      const qualification = calculateLoanQualification(creditScore, loanAmount, dtiRatio);
      return {
        ...qualification,
        currentDTIRatio: dtiRatio,
        monthlyPayment
      };
    }

    case 'lease_vs_buy': {
      const comparison = calculateLeaseVsBuy(
        vehicleValue,
        loanTermMonths,
        annualInterestRate,
        residualValuePercentage,
        monthlyLeasePayment,
        downPayment
      );
      return comparison;
    }

    case 'fuel_savings': {
      const savings = calculateFuelSavings(currentMPG, newMPG, annualMiles, fuelPricePerGallon);
      return savings;
    }

    default:
      throw new Error('Unknown auto loan calculation type');
  }
}