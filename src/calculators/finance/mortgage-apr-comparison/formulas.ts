/**
 * Calculate the Annual Percentage Rate (APR) for a mortgage
 * APR includes the interest rate plus closing costs and points
 *
 * @param loanAmount - The principal loan amount
 * @param nominalRate - The nominal annual interest rate (as decimal)
 * @param numPayments - Total number of payments
 * @param upfrontCosts - Total upfront costs (closing costs + points)
 * @returns The APR as a decimal
 */
export function calculateAPR(
  loanAmount: number,
  nominalRate: number,
  numPayments: number,
  upfrontCosts: number
): number {
  // For APR calculation, we need to find the rate that makes the present value
  // of all payments equal to the loan amount minus upfront costs
  // (since upfront costs are paid immediately)

  const monthlyRate = nominalRate / 12;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyRate, numPayments);

  // The APR is the rate that makes:
  // loanAmount = monthlyPayment * (1 - (1+aprRate)^(-numPayments)) / aprRate
  // But we need to account for upfront costs

  // For APR calculation, the effective loan amount is the amount borrowed
  // and the upfront costs are financed into the loan
  const effectiveLoanAmount = loanAmount + upfrontCosts;

  // Use numerical method to solve for APR
  return solveForAPR(effectiveLoanAmount, monthlyPayment, numPayments);
}

/**
 * Calculate monthly mortgage payment using standard formula
 */
export function calculateMonthlyPayment(
  loanAmount: number,
  monthlyRate: number,
  numPayments: number
): number {
  if (monthlyRate === 0) {
    return loanAmount / numPayments;
  }

  const payment = loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  return payment;
}

/**
 * Solve for APR using numerical method (Newton-Raphson)
 */
function solveForAPR(
  loanAmount: number,
  monthlyPayment: number,
  numPayments: number,
  tolerance: number = 0.000001,
  maxIterations: number = 100
): number {
  // Initial guess for monthly APR rate
  let aprRate = 0.01; // Start with 1% monthly

  for (let i = 0; i < maxIterations; i++) {
    const presentValue = calculatePresentValue(monthlyPayment, aprRate, numPayments);
    const derivative = calculatePresentValueDerivative(monthlyPayment, aprRate, numPayments);

    if (Math.abs(derivative) < tolerance) {
      break; // Avoid division by zero
    }

    const newAprRate = aprRate - (presentValue - loanAmount) / derivative;

    if (Math.abs(newAprRate - aprRate) < tolerance) {
      return newAprRate * 12; // Convert to annual rate
    }

    aprRate = Math.max(0.0001, newAprRate); // Ensure positive rate
  }

  return aprRate * 12; // Convert to annual rate
}

/**
 * Calculate present value of an annuity
 */
function calculatePresentValue(
  payment: number,
  monthlyRate: number,
  numPayments: number
): number {
  if (monthlyRate === 0) {
    return payment * numPayments;
  }

  return payment * (1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate;
}

/**
 * Calculate derivative of present value with respect to rate
 * Used in Newton-Raphson method
 */
function calculatePresentValueDerivative(
  payment: number,
  monthlyRate: number,
  numPayments: number
): number {
  if (monthlyRate === 0) {
    return -numPayments * numPayments / 2; // Approximation for zero rate
  }

  const term1 = (1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate;
  const term2 = numPayments * Math.pow(1 + monthlyRate, -numPayments - 1);

  return payment * (term2 - term1) / monthlyRate;
}

/**
 * Calculate total cost of a mortgage
 */
export function calculateTotalCost(
  monthlyPayment: number,
  numPayments: number,
  upfrontCosts: number
): number {
  return (monthlyPayment * numPayments) + upfrontCosts;
}

/**
 * Calculate the difference between two APRs
 */
export function calculateAPRDifference(apr1: number, apr2: number): number {
  return apr1 - apr2;
}

/**
 * Calculate potential savings from choosing lower APR
 */
export function calculatePotentialSavings(
  lowerMonthlyPayment: number,
  higherMonthlyPayment: number,
  numPayments: number
): number {
  return (higherMonthlyPayment - lowerMonthlyPayment) * numPayments;
}
