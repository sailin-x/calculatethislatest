export interface MortgagePaymentInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: string;
  propertyTax?: number;
  homeInsurance?: number;
  pmiRate?: number;
  downPayment?: number;
  loanType: string;
  paymentFrequency: string;
}

export interface PaymentBreakdown {
  principalAndInterest: number;
  propertyTaxMonthly: number;
  homeInsuranceMonthly: number;
  pmiMonthly: number;
  totalMonthlyPayment: number;
}

export interface AmortizationYear {
  year: number;
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  endingBalance: number;
  totalPaid: number;
  totalInterest: number;
}

export interface MortgagePaymentOutputs {
  monthlyPayment: number;
  principalAndInterest: number;
  propertyTaxMonthly: number;
  insuranceMonthly: number;
  totalInterest: number;
  totalPayments: number;
  amortizationSchedule: AmortizationYear[];
  paymentBreakdown: PaymentBreakdown;
}

/**
 * Calculate monthly mortgage payment using the standard formula
 */
export function calculateMortgagePayment(inputs: MortgagePaymentInputs): MortgagePaymentOutputs {
  const {
    loanAmount,
    interestRate,
    loanTerm,
    propertyTax = 0,
    homeInsurance = 0,
    pmiRate = 0,
    downPayment = 0,
    paymentFrequency
  } = inputs;

  // Convert loan term to number
  const termYears = parseInt(loanTerm);
  
  // Calculate monthly interest rate
  const monthlyRate = (interestRate / 100) / 12;
  
  // Calculate total number of payments
  const totalPayments = termYears * 12;
  
  // Calculate monthly principal and interest payment
  let principalAndInterest: number;
  if (monthlyRate === 0) {
    principalAndInterest = loanAmount / totalPayments;
  } else {
    principalAndInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }

  // Calculate monthly property tax
  const propertyTaxMonthly = propertyTax / 12;
  
  // Calculate monthly home insurance
  const homeInsuranceMonthly = homeInsurance / 12;
  
  // Calculate PMI if applicable
  const downPaymentPercent = downPayment > 0 ? (downPayment / (loanAmount + downPayment)) * 100 : 0;
  const pmiMonthly = downPaymentPercent < 20 && pmiRate > 0 ? 
    (loanAmount * (pmiRate / 100)) / 12 : 0;
  
  // Calculate total monthly payment
  const totalMonthlyPayment = principalAndInterest + propertyTaxMonthly + homeInsuranceMonthly + pmiMonthly;
  
  // Calculate total interest and payments over life of loan
  const totalInterest = (principalAndInterest * totalPayments) - loanAmount;
  const totalPaymentsAmount = principalAndInterest * totalPayments + (propertyTaxMonthly + homeInsuranceMonthly + pmiMonthly) * totalPayments;
  
  // Generate amortization schedule
  const amortizationSchedule = generateAmortizationSchedule(inputs);
  
  // Generate payment breakdown
  const paymentBreakdown: PaymentBreakdown = {
    principalAndInterest,
    propertyTaxMonthly,
    homeInsuranceMonthly,
    pmiMonthly,
    totalMonthlyPayment
  };

  // Adjust for payment frequency
  let adjustedMonthlyPayment = totalMonthlyPayment;
  let adjustedPrincipalAndInterest = principalAndInterest;
  
  switch (paymentFrequency) {
    case 'biweekly':
      adjustedMonthlyPayment = totalMonthlyPayment * 12 / 26;
      adjustedPrincipalAndInterest = principalAndInterest * 12 / 26;
      break;
    case 'weekly':
      adjustedMonthlyPayment = totalMonthlyPayment * 12 / 52;
      adjustedPrincipalAndInterest = principalAndInterest * 12 / 52;
      break;
  }

  return {
    monthlyPayment: adjustedMonthlyPayment,
    principalAndInterest: adjustedPrincipalAndInterest,
    propertyTaxMonthly,
    insuranceMonthly: homeInsuranceMonthly + pmiMonthly,
    totalInterest,
    totalPayments: totalPaymentsAmount,
    amortizationSchedule,
    paymentBreakdown
  };
}

/**
 * Generate complete amortization schedule
 */
export function generateAmortizationSchedule(inputs: MortgagePaymentInputs): AmortizationYear[] {
  const { loanAmount, interestRate, loanTerm } = inputs;
  
  const termYears = parseInt(loanTerm);
  const monthlyRate = (interestRate / 100) / 12;
  const totalPayments = termYears * 12;
  
  // Calculate monthly payment
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / totalPayments;
  } else {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }
  
  const schedule: AmortizationYear[] = [];
  let balance = loanAmount;
  let totalPaid = 0;
  let totalInterestPaid = 0;
  
  for (let year = 1; year <= termYears; year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;
    
    // Calculate for each month in the year
    for (let month = 1; month <= 12; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      yearPrincipal += principalPayment;
      yearInterest += interestPayment;
      balance -= principalPayment;
      totalPaid += monthlyPayment;
      totalInterestPaid += interestPayment;
      
      // Ensure balance doesn't go negative due to rounding
      if (balance < 0) balance = 0;
    }
    
    schedule.push({
      year,
      beginningBalance: balance + yearPrincipal,
      payment: monthlyPayment * 12,
      principal: yearPrincipal,
      interest: yearInterest,
      endingBalance: balance,
      totalPaid,
      totalInterest: totalInterestPaid
    });
  }
  
  return schedule;
}

/**
 * Calculate payment breakdown into components
 */
export function calculatePaymentBreakdown(inputs: MortgagePaymentInputs): PaymentBreakdown {
  const {
    loanAmount,
    interestRate,
    loanTerm,
    propertyTax = 0,
    homeInsurance = 0,
    pmiRate = 0,
    downPayment = 0
  } = inputs;

  const termYears = parseInt(loanTerm);
  const monthlyRate = (interestRate / 100) / 12;
  const totalPayments = termYears * 12;
  
  // Calculate monthly principal and interest payment
  let principalAndInterest: number;
  if (monthlyRate === 0) {
    principalAndInterest = loanAmount / totalPayments;
  } else {
    principalAndInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }

  // Calculate monthly property tax
  const propertyTaxMonthly = propertyTax / 12;
  
  // Calculate monthly home insurance
  const homeInsuranceMonthly = homeInsurance / 12;
  
  // Calculate PMI if applicable
  const downPaymentPercent = downPayment > 0 ? (downPayment / (loanAmount + downPayment)) * 100 : 0;
  const pmiMonthly = downPaymentPercent < 20 && pmiRate > 0 ? 
    (loanAmount * (pmiRate / 100)) / 12 : 0;
  
  // Calculate total monthly payment
  const totalMonthlyPayment = principalAndInterest + propertyTaxMonthly + homeInsuranceMonthly + pmiMonthly;

  return {
    principalAndInterest,
    propertyTaxMonthly,
    homeInsuranceMonthly,
    pmiMonthly,
    totalMonthlyPayment
  };
}

/**
 * Calculate loan-to-value ratio
 */
export function calculateLTV(loanAmount: number, propertyValue: number): number {
  return (loanAmount / propertyValue) * 100;
}

/**
 * Calculate debt-to-income ratio
 */
export function calculateDTI(monthlyDebtPayments: number, monthlyIncome: number): number {
  return (monthlyDebtPayments / monthlyIncome) * 100;
}

/**
 * Calculate total cost of loan
 */
export function calculateTotalLoanCost(
  loanAmount: number,
  totalPayments: number,
  closingCosts: number = 0
): number {
  return totalPayments + closingCosts - loanAmount;
}

/**
 * Calculate effective interest rate including fees
 */
export function calculateEffectiveRate(
  loanAmount: number,
  totalPayments: number,
  termYears: number,
  fees: number = 0
): number {
  const totalCost = totalPayments + fees - loanAmount;
  const totalCostPercent = (totalCost / loanAmount) * 100;
  return totalCostPercent / termYears;
}

/**
 * Generate recommendations based on loan parameters
 */
export function generateRecommendations(inputs: MortgagePaymentInputs): string[] {
  const recommendations: string[] = [];
  const { loanAmount, interestRate, loanTerm, downPayment = 0, pmiRate = 0 } = inputs;
  
  const downPaymentPercent = downPayment > 0 ? (downPayment / (loanAmount + downPayment)) * 100 : 0;
  
  if (downPaymentPercent < 20) {
    recommendations.push('Consider a 20% down payment to avoid PMI and reduce monthly payments.');
  }
  
  if (interestRate > 6) {
    recommendations.push('Current interest rates are high. Consider waiting for rates to improve or shopping around for better rates.');
  }
  
  if (parseInt(loanTerm) === 30) {
    recommendations.push('A 15-year loan would save significant interest but increase monthly payments.');
  }
  
  if (pmiRate > 0) {
    recommendations.push('PMI increases your monthly payment. Consider paying down the loan to 80% LTV to remove PMI.');
  }
  
  return recommendations;
}

/**
 * Calculate bi-weekly payment savings
 */
export function calculateBiweeklySavings(inputs: MortgagePaymentInputs): {
  monthlyPayment: number;
  biweeklyPayment: number;
  annualSavings: number;
  yearsSaved: number;
} {
  const monthlyResult = calculateMortgagePayment({ ...inputs, paymentFrequency: 'monthly' });
  const biweeklyResult = calculateMortgagePayment({ ...inputs, paymentFrequency: 'biweekly' });
  
  const monthlyPayment = monthlyResult.monthlyPayment;
  const biweeklyPayment = biweeklyResult.monthlyPayment;
  const annualSavings = (monthlyPayment * 12) - (biweeklyPayment * 26);
  
  // Calculate years saved (simplified calculation)
  const totalPayments = parseInt(inputs.loanTerm) * 12;
  const yearsSaved = (annualSavings * parseInt(inputs.loanTerm)) / (monthlyPayment * 12);
  
  return {
    monthlyPayment,
    biweeklyPayment,
    annualSavings,
    yearsSaved
  };
}