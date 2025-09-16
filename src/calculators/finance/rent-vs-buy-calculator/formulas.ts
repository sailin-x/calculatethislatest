import { RentVsBuyInputs, RentVsBuyResults } from './types';

/**
 * Calculate rent vs. buy analysis
 */
export function calculateRentVsBuy(inputs: RentVsBuyInputs): RentVsBuyResults {
  const {
    monthlyRent,
    annualRentIncrease,
    rentersInsurance,
    securityDeposit,
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxes,
    homeownersInsurance,
    hoaFees,
    maintenanceCost,
    closingCosts,
    expectedAppreciation,
    investmentReturn,
    analysisPeriod,
    marginalTaxRate
  } = inputs;

  // Calculate renting costs
  const rentingCosts = calculateRentingCosts(inputs);
  const totalRentingCost = rentingCosts.totalCost;
  const monthlyRentingCost = rentingCosts.monthlyCost;
  const annualRentingCost = rentingCosts.annualCost;

  // Calculate buying costs
  const buyingCosts = calculateBuyingCosts(inputs);
  const totalBuyingCost = buyingCosts.totalCost;
  const monthlyBuyingCost = buyingCosts.monthlyCost;
  const annualBuyingCost = buyingCosts.annualCost;
  const totalMortgagePayment = buyingCosts.totalMortgagePayment;
  const totalEquityBuilt = buyingCosts.totalEquityBuilt;
  const totalAppreciation = buyingCosts.totalAppreciation;

  // Calculate comparison metrics
  const costDifference = totalRentingCost - totalBuyingCost;
  const breakEvenYears = calculateBreakEvenYears(inputs);
  const rentVsBuyRatio = totalRentingCost > 0 ? totalBuyingCost / totalRentingCost : 0;

  // Determine net advantage
  const netAdvantage = costDifference > 0 ? 'Buying' : costDifference < 0 ? 'Renting' : 'Neutral';
  const recommendation = generateRecommendation(inputs, costDifference, breakEvenYears);

  // Calculate investment analysis
  const opportunityCost = calculateOpportunityCost(inputs);
  const netWorthDifference = totalEquityBuilt + totalAppreciation - opportunityCost;
  const roiDifference = calculateROIDifference(inputs, costDifference);

  return {
    totalRentingCost,
    monthlyRentingCost,
    annualRentingCost,
    totalBuyingCost,
    monthlyBuyingCost,
    annualBuyingCost,
    totalMortgagePayment,
    totalEquityBuilt,
    totalAppreciation,
    costDifference,
    breakEvenYears,
    rentVsBuyRatio,
    netAdvantage,
    recommendation,
    opportunityCost,
    netWorthDifference,
    roiDifference
  };
}

/**
 * Calculate renting scenario costs
 */
function calculateRentingCosts(inputs: RentVsBuyInputs) {
  const {
    monthlyRent,
    annualRentIncrease,
    rentersInsurance,
    securityDeposit,
    analysisPeriod
  } = inputs;

  let totalCost = securityDeposit; // Include security deposit
  let currentRent = monthlyRent;
  let monthlyCost = 0;
  let annualCost = 0;

  for (let year = 0; year < analysisPeriod; year++) {
    const yearlyRent = currentRent * 12;
    const yearlyInsurance = rentersInsurance;
    const yearlyCost = yearlyRent + yearlyInsurance;

    totalCost += yearlyCost;
    annualCost += yearlyCost;

    // Increase rent for next year
    currentRent *= (1 + annualRentIncrease / 100);
  }

  monthlyCost = annualCost / (analysisPeriod * 12);

  return {
    totalCost,
    monthlyCost,
    annualCost
  };
}

/**
 * Calculate buying scenario costs
 */
function calculateBuyingCosts(inputs: RentVsBuyInputs) {
  const {
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxes,
    homeownersInsurance,
    hoaFees,
    maintenanceCost,
    closingCosts,
    expectedAppreciation,
    analysisPeriod
  } = inputs;

  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  // Calculate monthly mortgage payment
  const monthlyMortgagePayment = loanAmount > 0 ?
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1) : 0;

  // Calculate total costs
  let totalCost = downPayment + closingCosts;
  let totalMortgagePayment = 0;
  let totalEquityBuilt = 0;
  let currentLoanBalance = loanAmount;
  let currentHomeValue = homePrice;

  for (let year = 0; year < analysisPeriod; year++) {
    // Annual costs
    const yearlyMortgage = monthlyMortgagePayment * 12;
    const yearlyTaxes = propertyTaxes;
    const yearlyInsurance = homeownersInsurance;
    const yearlyHoa = hoaFees;
    const yearlyMaintenance = maintenanceCost;

    const yearlyCost = yearlyMortgage + yearlyTaxes + yearlyInsurance + yearlyHoa + yearlyMaintenance;
    totalCost += yearlyCost;
    totalMortgagePayment += yearlyMortgage;

    // Calculate equity build-up (principal reduction)
    const yearlyPrincipalReduction = calculatePrincipalReduction(currentLoanBalance, monthlyRate, 12);
    totalEquityBuilt += yearlyPrincipalReduction;
    currentLoanBalance -= yearlyPrincipalReduction;

    // Calculate appreciation
    currentHomeValue *= (1 + expectedAppreciation / 100);
  }

  const totalAppreciation = currentHomeValue - homePrice;
  const monthlyCost = totalCost / (analysisPeriod * 12);
  const annualCost = totalCost / analysisPeriod;

  return {
    totalCost,
    monthlyCost,
    annualCost,
    totalMortgagePayment,
    totalEquityBuilt,
    totalAppreciation
  };
}

/**
 * Calculate principal reduction for a year
 */
function calculatePrincipalReduction(loanBalance: number, monthlyRate: number, paymentsPerYear: number): number {
  if (loanBalance <= 0) return 0;

  const monthlyPayment = (loanBalance * monthlyRate * Math.pow(1 + monthlyRate, paymentsPerYear)) /
                        (Math.pow(1 + monthlyRate, paymentsPerYear) - 1);

  let principalReduction = 0;
  let currentBalance = loanBalance;

  for (let i = 0; i < paymentsPerYear; i++) {
    const interestPayment = currentBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    principalReduction += principalPayment;
    currentBalance -= principalPayment;
  }

  return principalReduction;
}

/**
 * Calculate break-even years
 */
function calculateBreakEvenYears(inputs: RentVsBuyInputs): number {
  const {
    monthlyRent,
    annualRentIncrease,
    rentersInsurance,
    securityDeposit,
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxes,
    homeownersInsurance,
    hoaFees,
    maintenanceCost,
    closingCosts
  } = inputs;

  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  const monthlyMortgagePayment = loanAmount > 0 ?
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1) : 0;

  let rentingCost = securityDeposit;
  let buyingCost = downPayment + closingCosts;
  let currentRent = monthlyRent;
  let years = 0;

  while (years < 50) { // Max 50 years
    const yearlyRent = currentRent * 12;
    const yearlyInsurance = rentersInsurance;
    const yearlyRentingCost = yearlyRent + yearlyInsurance;

    const yearlyMortgage = monthlyMortgagePayment * 12;
    const yearlyTaxes = propertyTaxes;
    const yearlyInsuranceBuying = homeownersInsurance;
    const yearlyHoa = hoaFees;
    const yearlyMaintenance = maintenanceCost;
    const yearlyBuyingCost = yearlyMortgage + yearlyTaxes + yearlyInsuranceBuying + yearlyHoa + yearlyMaintenance;

    rentingCost += yearlyRentingCost;
    buyingCost += yearlyBuyingCost;

    if (buyingCost >= rentingCost) {
      return years + 1;
    }

    currentRent *= (1 + annualRentIncrease / 100);
    years++;
  }

  return 50; // No break-even within 50 years
}

/**
 * Calculate opportunity cost of down payment
 */
function calculateOpportunityCost(inputs: RentVsBuyInputs): number {
  const { downPayment, investmentReturn, analysisPeriod } = inputs;

  if (investmentReturn <= 0) return 0;

  const monthlyRate = investmentReturn / 100 / 12;
  return downPayment * (Math.pow(1 + monthlyRate, analysisPeriod * 12) - 1) / monthlyRate;
}

/**
 * Calculate ROI difference
 */
function calculateROIDifference(inputs: RentVsBuyInputs, costDifference: number): number {
  const { downPayment, analysisPeriod } = inputs;

  if (downPayment <= 0 || analysisPeriod <= 0) return 0;

  const totalReturn = -costDifference; // Positive if buying is better
  return (totalReturn / downPayment) * (1 / analysisPeriod) * 100;
}

/**
 * Generate recommendation based on analysis
 */
function generateRecommendation(
  inputs: RentVsBuyInputs,
  costDifference: number,
  breakEvenYears: number
): string {
  const { analysisPeriod } = inputs;

  if (Math.abs(costDifference) < 1000) {
    return 'Costs are very similar. Consider personal preferences and lifestyle factors.';
  }

  if (costDifference > 0) {
    if (breakEvenYears <= analysisPeriod / 2) {
      return `Buying is financially advantageous. Break-even in ${breakEvenYears} years.`;
    } else {
      return `Buying has long-term advantages but consider if you'll stay long enough to benefit.`;
    }
  } else {
    if (breakEvenYears > analysisPeriod) {
      return `Renting is more cost-effective for your time horizon.`;
    } else {
      return `Renting is currently more cost-effective, but buying becomes advantageous after ${breakEvenYears} years.`;
    }
  }
}

/**
 * Validate rent vs. buy inputs
 */
export function validateRentVsBuyInputs(inputs: RentVsBuyInputs): string[] {
  const errors: string[] = [];

  if (inputs.monthlyRent <= 0) {
    errors.push('Monthly rent must be greater than 0');
  }

  if (inputs.homePrice <= 0) {
    errors.push('Home price must be greater than 0');
  }

  if (inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }

  if (inputs.downPayment >= inputs.homePrice) {
    errors.push('Down payment cannot be greater than or equal to home price');
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 20) {
    errors.push('Interest rate must be between 0% and 20%');
  }

  if (inputs.loanTerm < 0 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 0 and 50 years');
  }

  if (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  if (inputs.expectedAppreciation < -10 || inputs.expectedAppreciation > 20) {
    errors.push('Expected appreciation must be between -10% and 20%');
  }

  if (inputs.investmentReturn < 0 || inputs.investmentReturn > 20) {
    errors.push('Investment return must be between 0% and 20%');
  }

  if (inputs.marginalTaxRate < 0 || inputs.marginalTaxRate > 50) {
    errors.push('Marginal tax rate must be between 0% and 50%');
  }

  return errors;
}