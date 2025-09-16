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

/**
 * Main function to calculate mortgage APR comparison for three offers
 */
export function calculateMortgageAPRComparison(inputs: any): any {
  const {
    homePrice,
    downPayment,
    loanTerm,
    interestRate1,
    interestRate2,
    interestRate3,
    closingCosts1 = 0,
    closingCosts2 = 0,
    closingCosts3 = 0,
    points1 = 0,
    points2 = 0,
    points3 = 0,
    lenderCredits1 = 0,
    lenderCredits2 = 0,
    lenderCredits3 = 0,
    otherFees1 = 0,
    otherFees2 = 0,
    otherFees3 = 0
  } = inputs;

  const loanAmount = homePrice - downPayment;
  const numPayments = loanTerm * 12;

  // Calculate for each offer
  const results = [1, 2, 3].map(offerNum => {
    const interestRate = inputs[`interestRate${offerNum}`];
    const closingCosts = inputs[`closingCosts${offerNum}`] || 0;
    const points = inputs[`points${offerNum}`] || 0;
    const lenderCredits = inputs[`lenderCredits${offerNum}`] || 0;
    const otherFees = inputs[`otherFees${offerNum}`] || 0;

    const totalUpfrontCosts = closingCosts + points + otherFees - lenderCredits;
    const monthlyRate = interestRate / 100 / 12;

    const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyRate, numPayments);
    const apr = calculateAPR(loanAmount, interestRate / 100, numPayments, totalUpfrontCosts);
    const totalCost = calculateTotalCost(monthlyPayment, numPayments, totalUpfrontCosts);
    const totalInterest = totalCost - loanAmount;

    return {
      monthlyPayment,
      apr: apr * 100, // Convert to percentage
      totalCost,
      totalInterest,
      totalUpfrontCosts
    };
  });

  return {
    monthlyPayment1: results[0].monthlyPayment,
    monthlyPayment2: results[1].monthlyPayment,
    monthlyPayment3: results[2].monthlyPayment,
    apr1: results[0].apr,
    apr2: results[1].apr,
    apr3: results[2].apr,
    totalCost1: results[0].totalCost,
    totalCost2: results[1].totalCost,
    totalCost3: results[2].totalCost,
    totalInterest1: results[0].totalInterest,
    totalInterest2: results[1].totalInterest,
    totalInterest3: results[2].totalInterest,
    upfrontCosts1: results[0].totalUpfrontCosts,
    upfrontCosts2: results[1].totalUpfrontCosts,
    upfrontCosts3: results[2].totalUpfrontCosts
  };
}

/**
 * Generate comprehensive analysis report for mortgage APR comparison
 */
export function generateMortgageAPRComparisonAnalysis(inputs: any, outputs: any): any {
  const { homePrice, downPayment, loanTerm } = inputs;
  const loanAmount = homePrice - downPayment;

  // Find the best offer based on APR
  const aprs = [outputs.apr1, outputs.apr2, outputs.apr3];
  const bestOfferIndex = aprs.indexOf(Math.min(...aprs)) + 1;

  // Calculate savings
  const monthlyPayments = [outputs.monthlyPayment1, outputs.monthlyPayment2, outputs.monthlyPayment3];
  const bestMonthlyPayment = monthlyPayments[bestOfferIndex - 1];
  const worstMonthlyPayment = Math.max(...monthlyPayments);

  const monthlySavings = worstMonthlyPayment - bestMonthlyPayment;
  const totalSavings = monthlySavings * loanTerm * 12;

  // APR differences
  const aprDifferences = aprs.map(apr => apr - aprs[bestOfferIndex - 1]);

  return {
    summary: {
      loanAmount,
      loanTerm,
      bestOffer: bestOfferIndex,
      monthlySavings,
      totalSavings,
      aprDifferences
    },
    recommendations: [
      `Choose Offer ${bestOfferIndex} for the lowest APR of ${aprs[bestOfferIndex - 1].toFixed(3)}%`,
      `Monthly savings: $${monthlySavings.toFixed(2)}`,
      `Total savings over ${loanTerm} years: $${totalSavings.toLocaleString()}`
    ],
    breakdown: {
      offer1: {
        apr: outputs.apr1,
        monthlyPayment: outputs.monthlyPayment1,
        totalCost: outputs.totalCost1,
        totalInterest: outputs.totalInterest1
      },
      offer2: {
        apr: outputs.apr2,
        monthlyPayment: outputs.monthlyPayment2,
        totalCost: outputs.totalCost2,
        totalInterest: outputs.totalInterest2
      },
      offer3: {
        apr: outputs.apr3,
        monthlyPayment: outputs.monthlyPayment3,
        totalCost: outputs.totalCost3,
        totalInterest: outputs.totalInterest3
      }
    }
  };
}
