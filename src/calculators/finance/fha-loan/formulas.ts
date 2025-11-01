import { FHALoanInputs, FHALoanOutputs } from './types';

/**
 * Calculate FHA upfront Mortgage Insurance Premium (MIP)
 * FHA requires 1.75% of the loan amount as upfront MIP
 */
export function calculateUpfrontMIP(loanAmount: number): number {
  return loanAmount * 0.0175;
}

/**
 * Calculate FHA monthly Mortgage Insurance Premium (MIP)
 * Annual MIP rate depends on loan term and LTV ratio
 */
export function calculateMonthlyMIP(loanAmount: number, loanTerm: number, ltvRatio: number): number {
  let annualMipRate: number;

  if (loanTerm <= 15) {
    // 15-year FHA loans
    annualMipRate = ltvRatio > 95 ? 0.0055 : 0.0050;
  } else {
    // 30-year FHA loans
    annualMipRate = ltvRatio > 95 ? 0.0080 : 0.0055;
  }

  return (loanAmount * annualMipRate) / 12;
}

/**
 * Calculate FHA loan-to-value ratio
 */
export function calculateLTVRatio(loanAmount: number, propertyValue: number): number {
  return (loanAmount / propertyValue) * 100;
}

/**
 * Calculate FHA debt-to-income ratio
 */
export function calculateDTIRatio(
  monthlyHousingPayment: number,
  monthlyDebt: number,
  annualIncome: number
): number {
  const totalMonthlyDebt = monthlyHousingPayment + monthlyDebt;
  const monthlyIncome = annualIncome / 12;
  return (totalMonthlyDebt / monthlyIncome) * 100;
}

/**
 * Check FHA eligibility based on credit score and LTV
 */
export function checkFHAEligibility(creditScore: number, ltvRatio: number, occupancyType: string): {
  eligible: boolean;
  reason: string;
} {
  if (creditScore < 500) {
    return { eligible: false, reason: 'Credit score too low. FHA requires minimum 500.' };
  }

  if (ltvRatio > 96.5 && occupancyType === 'primary_residence') {
    return { eligible: false, reason: 'LTV ratio too high for primary residence. Maximum 96.5%.' };
  }

  if (ltvRatio > 90 && occupancyType === 'second_home') {
    return { eligible: false, reason: 'LTV ratio too high for second home. Maximum 90%.' };
  }

  return { eligible: true, reason: 'Eligible for FHA loan.' };
}

/**
 * Calculate FHA closing costs estimate
 */
export function calculateClosingCosts(loanAmount: number, propertyValue: number): number {
  // FHA closing costs typically 2-5% of loan amount
  const baseClosingCosts = loanAmount * 0.03;

  // FHA-specific fees
  const appraisalFee = 300;
  const creditReportFee = 50;
  const floodCertificationFee = 15;
  const taxServiceFee = 75;

  return baseClosingCosts + appraisalFee + creditReportFee + floodCertificationFee + taxServiceFee;
}

/**
 * Calculate FHA monthly housing payment
 */
export function calculateMonthlyHousingPayment(
  principalAndInterest: number,
  monthlyMIP: number,
  propertyTaxes: number,
  homeownersInsurance: number,
  hoaFees: number = 0
): number {
  return principalAndInterest + monthlyMIP + (propertyTaxes / 12) + (homeownersInsurance / 12) + hoaFees;
}

/**
 * Main FHA loan calculation function
 */
export function calculateFHA(inputs: FHALoanInputs): FHALoanOutputs {
  const ltvRatio = calculateLTVRatio(inputs.loanAmount, inputs.propertyValue);
  const upfrontMIP = calculateUpfrontMIP(inputs.loanAmount);
  const monthlyMIP = calculateMonthlyMIP(inputs.loanAmount, inputs.loanTerm, ltvRatio);

  // Calculate principal and interest using standard mortgage formula
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.loanTerm * 12;
  const principalAndInterest = inputs.loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  const totalMonthlyHousing = calculateMonthlyHousingPayment(
    principalAndInterest,
    monthlyMIP,
    inputs.propertyTaxes,
    inputs.homeownersInsurance,
    inputs.hoaFees
  );

  const dtiRatio = calculateDTIRatio(
    totalMonthlyHousing,
    inputs.monthlyDebt,
    inputs.borrowerIncome + (inputs.coBorrowerIncome || 0)
  );

  const eligibility = checkFHAEligibility(inputs.creditScore, ltvRatio, inputs.occupancyType);
  const closingCosts = calculateClosingCosts(inputs.loanAmount, inputs.propertyValue);
  const cashToClose = upfrontMIP + closingCosts - inputs.downPayment;

  return {
    monthlyPayment: Math.round(principalAndInterest * 100) / 100,
    upfrontMIP: Math.round(upfrontMIP * 100) / 100,
    monthlyMIP: Math.round(monthlyMIP * 100) / 100,
    totalMonthlyPayment: Math.round(totalMonthlyHousing * 100) / 100,
    loanToValueRatio: Math.round(ltvRatio * 100) / 100,
    debtToIncomeRatio: Math.round(dtiRatio * 100) / 100,
    fhaEligibility: eligibility.reason,
    totalClosingCosts: Math.round(closingCosts * 100) / 100,
    cashToClose: Math.round(cashToClose * 100) / 100
  };
}
