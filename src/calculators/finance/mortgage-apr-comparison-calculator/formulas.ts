import { MortgageAprComparisonInputs, MortgageAprComparisonOutputs } from './types';

// APR calculation formula
export function calculateAPR(loanAmount: number, monthlyPayment: number, loanTermYears: number, totalFees: number): number {
  const monthlyRate = 0.01; // Starting guess for monthly rate
  const numPayments = loanTermYears * 12;
  const presentValue = loanAmount - totalFees;

  // Use Newton-Raphson method to solve for APR
  let rate = monthlyRate;
  for (let i = 0; i < 100; i++) {
    const f = presentValue - (monthlyPayment * (1 - Math.pow(1 + rate, -numPayments)) / rate);
    const fPrime = monthlyPayment * (numPayments * Math.pow(1 + rate, -numPayments - 1) - (1 - Math.pow(1 + rate, -numPayments)) / rate) / rate;
    rate = rate - f / fPrime;
    if (Math.abs(f) < 0.01) break;
  }

  return rate * 12 * 100; // Convert to annual percentage
}

// Monthly payment calculation
export function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1);
}

// Total cost calculation
export function calculateTotalCost(monthlyPayment: number, loanTermYears: number, totalFees: number): number {
  return (monthlyPayment * loanTermYears * 12) + totalFees;
}

// Break-even point calculation
export function calculateBreakEvenPoint(inputs: MortgageAprComparisonInputs, monthlyPayment: number, rate: number): number {
  const totalFees = Object.values(inputs.closingCosts).reduce((sum, fee) => sum + fee, 0) +
                   (inputs.discountPoints * inputs.loanAmount * 0.0025) -
                   inputs.lenderCredits;

  const monthlySavings = calculateMonthlyPayment(inputs.loanAmount, inputs.currentMarketRates['30_year_fixed'], inputs.loanTerm) - monthlyPayment;
  if (monthlySavings <= 0) return Infinity;

  return totalFees / monthlySavings;
}

// APR comparison calculation
export function calculateAprComparison(inputs: MortgageAprComparisonInputs): MortgageAprComparisonOutputs['aprComparison'] {
  const loanTypes = [
    { name: '30 Year Fixed', rate: inputs.currentMarketRates['30_year_fixed'], term: 30 },
    { name: '15 Year Fixed', rate: inputs.currentMarketRates['15_year_fixed'], term: 15 },
    { name: '5/1 ARM', rate: inputs.currentMarketRates['5_1_arm'], term: 30 },
    { name: '7/1 ARM', rate: inputs.currentMarketRates['7_1_arm'], term: 30 },
    { name: '10/1 ARM', rate: inputs.currentMarketRates['10_1_arm'], term: 30 }
  ];

  const totalFees = Object.values(inputs.closingCosts).reduce((sum, fee) => sum + fee, 0) +
                   (inputs.discountPoints * inputs.loanAmount * 0.0025) -
                   inputs.lenderCredits;

  return loanTypes.map(loanType => {
    const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, loanType.rate, loanType.term);
    const apr = calculateAPR(inputs.loanAmount, monthlyPayment, loanType.term, totalFees);
    const totalPayments = monthlyPayment * loanType.term * 12;
    const totalInterest = totalPayments - inputs.loanAmount;
    const totalCost = totalPayments + totalFees;
    const breakEvenPoint = calculateBreakEvenPoint(inputs, monthlyPayment, loanType.rate);

    return {
      loanType: loanType.name,
      interestRate: loanType.rate,
      apr,
      monthlyPayment,
      totalPayments,
      totalInterest,
      totalCost,
      breakEvenPoint
    };
  });
}

// Recommended loan calculation
export function calculateRecommendedLoan(comparison: MortgageAprComparisonOutputs['aprComparison']): MortgageAprComparisonOutputs['recommendedLoan'] {
  // Find loan with lowest total cost
  const bestLoan = comparison.reduce((best, current) =>
    current.totalCost < best.totalCost ? current : best
  );

  const savings = Math.max(...comparison.map(loan => loan.totalCost)) - bestLoan.totalCost;

  return {
    loanType: bestLoan.loanType,
    reason: `Lowest total cost over ${bestLoan.loanType.includes('Year') ? bestLoan.loanType.split(' ')[0] : '30'} years`,
    savings
  };
}

// Cost breakdown calculation
export function calculateCostBreakdown(inputs: MortgageAprComparisonInputs, monthlyPayment: number, loanTerm: number): MortgageAprComparisonOutputs['costBreakdown'] {
  const totalPayments = monthlyPayment * loanTerm * 12;
  const totalFees = Object.values(inputs.closingCosts).reduce((sum, fee) => sum + fee, 0) +
                   (inputs.discountPoints * inputs.loanAmount * 0.0025) -
                   inputs.lenderCredits;

  return {
    principal: inputs.loanAmount,
    interest: totalPayments - inputs.loanAmount,
    fees: totalFees,
    total: totalPayments + totalFees
  };
}

// Sensitivity analysis
export function calculateSensitivityAnalysis(inputs: MortgageAprComparisonInputs): MortgageAprComparisonOutputs['sensitivityAnalysis'] {
  const basePayment = calculateMonthlyPayment(inputs.loanAmount, inputs.currentMarketRates['30_year_fixed'], 30);
  const baseTotalCost = calculateTotalCost(basePayment, 30, Object.values(inputs.closingCosts).reduce((sum, fee) => sum + fee, 0));

  return [
    {
      rateIncrease: 0.25,
      paymentImpact: calculateMonthlyPayment(inputs.loanAmount, inputs.currentMarketRates['30_year_fixed'] + 0.25, 30) - basePayment,
      totalCostImpact: calculateTotalCost(
        calculateMonthlyPayment(inputs.loanAmount, inputs.currentMarketRates['30_year_fixed'] + 0.25, 30),
        30,
        Object.values(inputs.closingCosts).reduce((sum, fee) => sum + fee, 0)
      ) - baseTotalCost
    },
    {
      rateIncrease: 0.5,
      paymentImpact: calculateMonthlyPayment(inputs.loanAmount, inputs.currentMarketRates['30_year_fixed'] + 0.5, 30) - basePayment,
      totalCostImpact: calculateTotalCost(
        calculateMonthlyPayment(inputs.loanAmount, inputs.currentMarketRates['30_year_fixed'] + 0.5, 30),
        30,
        Object.values(inputs.closingCosts).reduce((sum, fee) => sum + fee, 0)
      ) - baseTotalCost
    },
    {
      rateIncrease: 1.0,
      paymentImpact: calculateMonthlyPayment(inputs.loanAmount, inputs.currentMarketRates['30_year_fixed'] + 1.0, 30) - basePayment,
      totalCostImpact: calculateTotalCost(
        calculateMonthlyPayment(inputs.loanAmount, inputs.currentMarketRates['30_year_fixed'] + 1.0, 30),
        30,
        Object.values(inputs.closingCosts).reduce((sum, fee) => sum + fee, 0)
      ) - baseTotalCost
    }
  ];
}

// Main calculation function
export function calculateMortgageAprComparison(inputs: MortgageAprComparisonInputs): MortgageAprComparisonOutputs {
  const aprComparison = calculateAprComparison(inputs);
  const recommendedLoan = calculateRecommendedLoan(aprComparison);
  const costBreakdown = calculateCostBreakdown(inputs, aprComparison[0].monthlyPayment, 30);
  const sensitivityAnalysis = calculateSensitivityAnalysis(inputs);

  return {
    aprComparison,
    recommendedLoan,
    costBreakdown,
    sensitivityAnalysis
  };
}