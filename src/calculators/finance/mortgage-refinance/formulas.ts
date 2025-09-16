import { MortgageRefinanceInputs, MortgageRefinanceResults } from './types';

export function calculateMortgageRefinance(inputs: MortgageRefinanceInputs): MortgageRefinanceResults {
  const {
    currentLoanBalance,
    currentRate,
    currentTermRemaining,
    newLoanAmount,
    newRate,
    newTerm,
    closingCosts,
    originationFee,
    appraisalFee,
    titleInsurance,
    cashOut,
    points,
    pointCost,
    homeValue,
    yearsToStay
  } = inputs;

  // Calculate current monthly payment
  const currentMonthlyRate = currentRate / 100 / 12;
  const currentNumPayments = currentTermRemaining * 12;
  const currentMonthlyPayment = currentLoanBalance *
    (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentNumPayments)) /
    (Math.pow(1 + currentMonthlyRate, currentNumPayments) - 1);

  // Calculate new monthly payment
  const newMonthlyRate = newRate / 100 / 12;
  const newNumPayments = newTerm * 12;
  const newMonthlyPayment = newLoanAmount *
    (newMonthlyRate * Math.pow(1 + newMonthlyRate, newNumPayments)) /
    (Math.pow(1 + newMonthlyRate, newNumPayments) - 1);

  // Calculate monthly savings
  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;

  // Calculate total refinance costs
  const totalRefinanceCosts = closingCosts + originationFee + appraisalFee + titleInsurance +
                             (points * pointCost) + cashOut;

  // Calculate break-even period
  const breakEvenMonths = monthlySavings > 0 ? totalRefinanceCosts / monthlySavings : Infinity;
  const breakEvenYears = breakEvenMonths / 12;

  // Calculate savings over different periods
  const totalSavings5Years = monthlySavings * 12 * 5 - totalRefinanceCosts;
  const totalSavings10Years = monthlySavings * 12 * 10 - totalRefinanceCosts;

  // Calculate remaining term savings
  const remainingMonths = Math.min(currentTermRemaining * 12, yearsToStay * 12);
  const totalSavingsRemaining = monthlySavings * remainingMonths - totalRefinanceCosts;

  // Calculate ROI
  const roiPercentage = totalRefinanceCosts > 0 ? (totalSavingsRemaining / totalRefinanceCosts) * 100 : 0;

  // Calculate new LTV ratio
  const newLoanToValue = homeValue > 0 ? (newLoanAmount / homeValue) * 100 : 0;

  // Generate recommendation
  let recommendation = 'Not recommended';
  if (monthlySavings > 0 && breakEvenMonths < remainingMonths) {
    if (breakEvenMonths < 12) {
      recommendation = 'Strongly recommended - excellent break-even period';
    } else if (breakEvenMonths < 24) {
      recommendation = 'Recommended - good break-even period';
    } else {
      recommendation = 'Consider carefully - longer break-even period';
    }
  } else if (monthlySavings <= 0) {
    recommendation = 'Not recommended - no monthly savings';
  }

  return {
    currentMonthlyPayment,
    newMonthlyPayment,
    monthlySavings,
    totalRefinanceCosts,
    breakEvenMonths,
    breakEvenYears,
    totalSavings5Years,
    totalSavings10Years,
    totalSavingsRemaining,
    roiPercentage,
    newLoanToValue,
    recommendation
  };
}

export function validateMortgageRefinanceInputs(inputs: MortgageRefinanceInputs): string[] {
  const errors: string[] = [];

  if (inputs.currentLoanBalance <= 0) {
    errors.push('Current loan balance must be greater than 0');
  }

  if (inputs.currentRate <= 0 || inputs.currentRate > 20) {
    errors.push('Current interest rate must be between 0% and 20%');
  }

  if (inputs.currentTermRemaining <= 0 || inputs.currentTermRemaining > 50) {
    errors.push('Current term remaining must be between 1 and 50 years');
  }

  if (inputs.newLoanAmount <= 0) {
    errors.push('New loan amount must be greater than 0');
  }

  if (inputs.newRate <= 0 || inputs.newRate > 20) {
    errors.push('New interest rate must be between 0% and 20%');
  }

  if (inputs.newTerm <= 0 || inputs.newTerm > 50) {
    errors.push('New loan term must be between 1 and 50 years');
  }

  if (inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  }

  if (inputs.homeValue > 0 && inputs.newLoanAmount > inputs.homeValue) {
    errors.push('New loan amount cannot exceed home value');
  }

  return errors;
}