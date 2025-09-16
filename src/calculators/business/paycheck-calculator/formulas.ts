/**
 * Paycheck Calculator Formulas
 * Industry-standard payroll calculations with tax withholding
 */

/**
 * Calculate federal income tax using 2024 tax brackets
 */
export function calculateFederalIncomeTax(
  annualGrossIncome: number,
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household',
  dependents: number = 0
): number {
  // 2024 Federal Income Tax Brackets
  const taxBrackets = {
    single: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 }
    ],
    married_filing_jointly: [
      { min: 0, max: 23200, rate: 0.10 },
      { min: 23200, max: 94300, rate: 0.12 },
      { min: 94300, max: 201050, rate: 0.22 },
      { min: 201050, max: 383900, rate: 0.24 },
      { min: 383900, max: 487450, rate: 0.32 },
      { min: 487450, max: 731200, rate: 0.35 },
      { min: 731200, max: Infinity, rate: 0.37 }
    ],
    married_filing_separately: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 365600, rate: 0.35 },
      { min: 365600, max: Infinity, rate: 0.37 }
    ],
    head_of_household: [
      { min: 0, max: 16550, rate: 0.10 },
      { min: 16550, max: 63100, rate: 0.12 },
      { min: 63100, max: 100500, rate: 0.22 },
      { min: 100500, max: 191650, rate: 0.24 },
      { min: 191650, max: 243700, rate: 0.32 },
      { min: 243700, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 }
    ]
  };

  const brackets = taxBrackets[filingStatus];
  let tax = 0;
  let remainingIncome = annualGrossIncome;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;

    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
    tax += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
  }

  return tax;
}

/**
 * Calculate Social Security tax (6.2% employee portion)
 */
export function calculateSocialSecurityTax(annualGrossIncome: number): number {
  const socialSecurityRate = 0.062;
  const wageBaseLimit = 168600; // 2024 limit

  const taxableAmount = Math.min(annualGrossIncome, wageBaseLimit);
  return taxableAmount * socialSecurityRate;
}

/**
 * Calculate Medicare tax (1.45% employee portion)
 */
export function calculateMedicareTax(annualGrossIncome: number): number {
  const medicareRate = 0.0145;
  return annualGrossIncome * medicareRate;
}

/**
 * Calculate additional Medicare tax for high earners (0.9% on wages over $200,000)
 */
export function calculateAdditionalMedicareTax(
  annualGrossIncome: number,
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household'
): number {
  const additionalMedicareRate = 0.009;
  const threshold = filingStatus === 'married_filing_jointly' ? 250000 : 200000;

  if (annualGrossIncome > threshold) {
    return (annualGrossIncome - threshold) * additionalMedicareRate;
  }

  return 0;
}

/**
 * Calculate state income tax (simplified - varies by state)
 */
export function calculateStateIncomeTax(
  annualGrossIncome: number,
  state: string = 'california'
): number {
  // Simplified state tax rates (2024)
  const stateTaxRates: Record<string, number> = {
    'california': 0.133,
    'new_york': 0.109,
    'texas': 0, // No state income tax
    'florida': 0, // No state income tax
    'illinois': 0.0495,
    'pennsylvania': 0.0307,
    'ohio': 0.0399,
    'georgia': 0.0575,
    'north_carolina': 0.0525,
    'michigan': 0.0425,
    'new_jersey': 0.1075,
    'virginia': 0.0575,
    'washington': 0, // No state income tax
    'arizona': 0.025,
    'massachusetts': 0.05,
    'tennessee': 0, // No state income tax
    'indiana': 0.0323,
    'missouri': 0.054,
    'maryland': 0.05,
    'wisconsin': 0.0765,
    'colorado': 0.0455,
    'minnesota': 0.0985,
    'south_carolina': 0.07,
    'alabama': 0.05,
    'louisiana': 0.0425,
    'kentucky': 0.045,
    'oregon': 0.099,
    'oklahoma': 0.0475,
    'connecticut': 0.0699,
    'utah': 0.0486,
    'iowa': 0.0482,
    'nevada': 0, // No state income tax
    'arkansas': 0.037,
    'mississippi': 0.05,
    'kansas': 0.057,
    'new_mexico': 0.059,
    'nebraska': 0.0664,
    'west_virginia': 0.065,
    'idaho': 0.058,
    'hawaii': 0.11,
    'new_hampshire': 0, // No state income tax
    'maine': 0.0715,
    'rhode_island': 0.0599,
    'montana': 0.069,
    'delaware': 0.066,
    'south_dakota': 0, // No state income tax
    'north_dakota': 0.029,
    'alaska': 0, // No state income tax
    'vermont': 0.0875,
    'wyoming': 0, // No state income tax
    'district_of_columbia': 0.1065
  };

  const rate = stateTaxRates[state.toLowerCase()] || 0.05; // Default 5% for unknown states
  return annualGrossIncome * rate;
}

/**
 * Calculate FICA taxes (Social Security + Medicare)
 */
export function calculateFICATaxes(annualGrossIncome: number): {
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  totalFICA: number;
} {
  const socialSecurity = calculateSocialSecurityTax(annualGrossIncome);
  const medicare = calculateMedicareTax(annualGrossIncome);
  const additionalMedicare = calculateAdditionalMedicareTax(annualGrossIncome, 'single');
  const totalFICA = socialSecurity + medicare + additionalMedicare;

  return {
    socialSecurity,
    medicare,
    additionalMedicare,
    totalFICA
  };
}

/**
 * Calculate pre-tax deductions
 */
export function calculatePreTaxDeductions(
  annualGrossIncome: number,
  deductions: {
    retirement401k?: number;
    hsa?: number;
    fsa?: number;
    commuterBenefits?: number;
    otherPreTax?: number;
  }
): number {
  const {
    retirement401k = 0,
    hsa = 0,
    fsa = 0,
    commuterBenefits = 0,
    otherPreTax = 0
  } = deductions;

  return retirement401k + hsa + fsa + commuterBenefits + otherPreTax;
}

/**
 * Calculate taxable income after pre-tax deductions
 */
export function calculateTaxableIncome(
  annualGrossIncome: number,
  preTaxDeductions: number,
  standardDeduction: number = 14600 // 2024 single filer standard deduction
): number {
  return Math.max(0, annualGrossIncome - preTaxDeductions - standardDeduction);
}

/**
 * Calculate total federal tax withholding
 */
export function calculateFederalTaxWithholding(
  taxableIncome: number,
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household',
  dependents: number = 0,
  payPeriod: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'quarterly' | 'annually' = 'biweekly'
): number {
  const annualFederalTax = calculateFederalIncomeTax(taxableIncome, filingStatus, dependents);

  // Convert to pay period
  const payPeriodMultipliers = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
    quarterly: 4,
    annually: 1
  };

  return annualFederalTax / payPeriodMultipliers[payPeriod];
}

/**
 * Calculate total state tax withholding
 */
export function calculateStateTaxWithholding(
  taxableIncome: number,
  state: string,
  payPeriod: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'quarterly' | 'annually' = 'biweekly'
): number {
  const annualStateTax = calculateStateIncomeTax(taxableIncome, state);

  const payPeriodMultipliers = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
    quarterly: 4,
    annually: 1
  };

  return annualStateTax / payPeriodMultipliers[payPeriod];
}

/**
 * Calculate FICA withholding per pay period
 */
export function calculateFICAWithholding(
  grossPay: number,
  payPeriod: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'quarterly' | 'annually' = 'biweekly'
): {
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  totalFICA: number;
} {
  // Calculate annual equivalent
  const payPeriodMultipliers = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
    quarterly: 4,
    annually: 1
  };

  const annualGross = grossPay * payPeriodMultipliers[payPeriod];
  const ficaTaxes = calculateFICATaxes(annualGross);

  // Convert back to pay period amounts
  const periodMultiplier = 1 / payPeriodMultipliers[payPeriod];

  return {
    socialSecurity: ficaTaxes.socialSecurity * periodMultiplier,
    medicare: ficaTaxes.medicare * periodMultiplier,
    additionalMedicare: ficaTaxes.additionalMedicare * periodMultiplier,
    totalFICA: ficaTaxes.totalFICA * periodMultiplier
  };
}

/**
 * Calculate post-tax deductions
 */
export function calculatePostTaxDeductions(
  grossPay: number,
  deductions: {
    healthInsurance?: number;
    dentalInsurance?: number;
    visionInsurance?: number;
    lifeInsurance?: number;
    retirementRoth?: number;
    otherPostTax?: number;
  }
): number {
  const {
    healthInsurance = 0,
    dentalInsurance = 0,
    visionInsurance = 0,
    lifeInsurance = 0,
    retirementRoth = 0,
    otherPostTax = 0
  } = deductions;

  return healthInsurance + dentalInsurance + visionInsurance +
         lifeInsurance + retirementRoth + otherPostTax;
}

/**
 * Calculate net pay (take-home pay)
 */
export function calculateNetPay(
  grossPay: number,
  federalTax: number,
  stateTax: number,
  ficaTax: number,
  postTaxDeductions: number
): number {
  return grossPay - federalTax - stateTax - ficaTax - postTaxDeductions;
}

/**
 * Calculate annual salary breakdown
 */
export function calculateAnnualSalaryBreakdown(
  annualGrossIncome: number,
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household',
  dependents: number,
  state: string,
  preTaxDeductions: number,
  postTaxDeductions: number
): {
  grossIncome: number;
  preTaxDeductions: number;
  taxableIncome: number;
  federalIncomeTax: number;
  stateIncomeTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  totalTaxes: number;
  postTaxDeductions: number;
  netIncome: number;
  effectiveTaxRate: number;
  takeHomePercentage: number;
} {
  const ficaTaxes = calculateFICATaxes(annualGrossIncome);
  const taxableIncome = calculateTaxableIncome(annualGrossIncome, preTaxDeductions);
  const federalIncomeTax = calculateFederalIncomeTax(taxableIncome, filingStatus, dependents);
  const stateIncomeTax = calculateStateIncomeTax(taxableIncome, state);

  const totalTaxes = federalIncomeTax + stateIncomeTax + ficaTaxes.totalFICA;
  const netIncome = annualGrossIncome - preTaxDeductions - totalTaxes - postTaxDeductions;
  const effectiveTaxRate = (totalTaxes / annualGrossIncome) * 100;
  const takeHomePercentage = (netIncome / annualGrossIncome) * 100;

  return {
    grossIncome: annualGrossIncome,
    preTaxDeductions,
    taxableIncome,
    federalIncomeTax,
    stateIncomeTax,
    socialSecurityTax: ficaTaxes.socialSecurity,
    medicareTax: ficaTaxes.medicare,
    additionalMedicareTax: ficaTaxes.additionalMedicare,
    totalTaxes,
    postTaxDeductions,
    netIncome,
    effectiveTaxRate,
    takeHomePercentage
  };
}

/**
 * Calculate paycheck breakdown for specific pay period
 */
export function calculatePaycheckBreakdown(
  grossPay: number,
  payPeriod: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'quarterly' | 'annually',
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household',
  dependents: number,
  state: string,
  preTaxDeductions: number,
  postTaxDeductions: number
): {
  grossPay: number;
  preTaxDeductions: number;
  federalTax: number;
  stateTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  totalFICA: number;
  totalTaxes: number;
  postTaxDeductions: number;
  netPay: number;
  taxPercentage: number;
} {
  // Convert to annual for tax calculations
  const payPeriodMultipliers = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
    quarterly: 4,
    annually: 1
  };

  const annualGross = grossPay * payPeriodMultipliers[payPeriod];
  const annualPreTax = preTaxDeductions * payPeriodMultipliers[payPeriod];
  const annualPostTax = postTaxDeductions * payPeriodMultipliers[payPeriod];

  const breakdown = calculateAnnualSalaryBreakdown(
    annualGross,
    filingStatus,
    dependents,
    state,
    annualPreTax,
    annualPostTax
  );

  // Convert back to pay period amounts
  const periodMultiplier = 1 / payPeriodMultipliers[payPeriod];

  return {
    grossPay,
    preTaxDeductions: preTaxDeductions,
    federalTax: breakdown.federalIncomeTax * periodMultiplier,
    stateTax: breakdown.stateIncomeTax * periodMultiplier,
    socialSecurityTax: breakdown.socialSecurityTax * periodMultiplier,
    medicareTax: breakdown.medicareTax * periodMultiplier,
    additionalMedicareTax: breakdown.additionalMedicareTax * periodMultiplier,
    totalFICA: breakdown.socialSecurityTax * periodMultiplier +
               breakdown.medicareTax * periodMultiplier +
               breakdown.additionalMedicareTax * periodMultiplier,
    totalTaxes: (breakdown.federalIncomeTax + breakdown.stateIncomeTax + breakdown.socialSecurityTax +
                 breakdown.medicareTax + breakdown.additionalMedicareTax) * periodMultiplier,
    postTaxDeductions,
    netPay: grossPay - (breakdown.federalIncomeTax * periodMultiplier) -
            (breakdown.stateIncomeTax * periodMultiplier) -
            (breakdown.socialSecurityTax * periodMultiplier) -
            (breakdown.medicareTax * periodMultiplier) -
            (breakdown.additionalMedicareTax * periodMultiplier) -
            postTaxDeductions,
    taxPercentage: ((breakdown.federalIncomeTax + breakdown.stateIncomeTax + breakdown.socialSecurityTax +
                     breakdown.medicareTax + breakdown.additionalMedicareTax) / annualGross) * 100
  };
}


/**
 * Calculate marginal tax rate
 */
export function calculateMarginalTaxRate(
  annualIncome: number,
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household'
): number {
  const brackets = {
    single: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 }
    ],
    married_filing_jointly: [
      { min: 0, max: 23200, rate: 0.10 },
      { min: 23200, max: 94300, rate: 0.12 },
      { min: 94300, max: 201050, rate: 0.22 },
      { min: 201050, max: 383900, rate: 0.24 },
      { min: 383900, max: 487450, rate: 0.32 },
      { min: 487450, max: 731200, rate: 0.35 },
      { min: 731200, max: Infinity, rate: 0.37 }
    ],
    married_filing_separately: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 365600, rate: 0.35 },
      { min: 365600, max: Infinity, rate: 0.37 }
    ],
    head_of_household: [
      { min: 0, max: 16550, rate: 0.10 },
      { min: 16550, max: 63100, rate: 0.12 },
      { min: 63100, max: 100500, rate: 0.22 },
      { min: 100500, max: 191650, rate: 0.24 },
      { min: 191650, max: 243700, rate: 0.32 },
      { min: 243700, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 }
    ]
  };

  const filingBrackets = brackets[filingStatus];

  for (const bracket of filingBrackets) {
    if (annualIncome >= bracket.min && annualIncome <= bracket.max) {
      return bracket.rate * 100;
    }
  }

  return 37; // Top bracket
}

/**
 * Calculate tax savings from deductions
 */
export function calculateTaxSavings(
  annualIncome: number,
  deductions: number,
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household',
  dependents: number,
  state: string
): number {
  const withoutDeductions = calculateAnnualSalaryBreakdown(
    annualIncome,
    filingStatus,
    dependents,
    state,
    0,
    0
  );

  const withDeductions = calculateAnnualSalaryBreakdown(
    annualIncome,
    filingStatus,
    dependents,
    state,
    deductions,
    0
  );

  return withoutDeductions.totalTaxes - withDeductions.totalTaxes;
}

/**
 * Calculate hourly gross pay with overtime
 */
export function calculateHourlyGrossPay(
  hourlyRate: number,
  regularHours: number,
  overtimeHours: number
): number {
  const regularPay = hourlyRate * regularHours;
  const overtimePay = hourlyRate * overtimeHours * 1.5; // Standard overtime rate
  return regularPay + overtimePay;
}

/**
 * Calculate salary gross pay for different pay periods
 */
export function calculateSalaryGrossPay(
  annualSalary: number,
  payPeriod: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'quarterly' | 'annually'
): number {
  const payPeriodMultipliers = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
    quarterly: 4,
    annually: 1
  };

  return annualSalary / payPeriodMultipliers[payPeriod];
}

/**
 * Calculate total deductions (alias for post-tax deductions)
 */
export function calculateTotalDeductions(
  federalTax: number,
  socialSecurityTax: number,
  medicareTax: number,
  stateTax: number,
  otherDeductions: number
): number {
  return federalTax + socialSecurityTax + medicareTax + stateTax + otherDeductions;
}

/**
 * Calculate paycheck (main function for test compatibility)
 */
export function calculatePaycheck(inputs: any): any {
  const {
    payType,
    hourlyRate,
    hoursWorked,
    overtimeHours,
    annualSalary,
    payPeriod = 'biweekly',
    filingStatus = 'single',
    dependents = 0,
    additionalWithholding = 0,
    additionalMedicareTax = 0,
    stateTaxRate = 5,
    otherDeductions = 0
  } = inputs;

  // Calculate gross pay
  let grossPay: number;
  if (payType === 'hourly') {
    grossPay = calculateHourlyGrossPay(hourlyRate, hoursWorked, overtimeHours || 0);
  } else {
    grossPay = calculateSalaryGrossPay(annualSalary, payPeriod);
  }

  // Calculate taxes
  const federalTax = calculateFederalIncomeTax(grossPay * getPayPeriodMultiplier(payPeriod), filingStatus, dependents) / getPayPeriodMultiplier(payPeriod) + additionalWithholding;
  const socialSecurityTax = calculateSocialSecurityTax(grossPay * getPayPeriodMultiplier(payPeriod)) / getPayPeriodMultiplier(payPeriod);
  const medicareTax = calculateMedicareTax(grossPay * getPayPeriodMultiplier(payPeriod)) / getPayPeriodMultiplier(payPeriod) + additionalMedicareTax;
  const stateTax = (grossPay * stateTaxRate) / 100;

  // Calculate total deductions
  const totalDeductions = calculateTotalDeductions(
    federalTax,
    socialSecurityTax,
    medicareTax,
    stateTax,
    otherDeductions
  );

  // Calculate net pay
  const netPay = calculateNetPay(grossPay, federalTax, stateTax, socialSecurityTax + medicareTax, otherDeductions);

  return {
    grossPay,
    federalTax,
    socialSecurityTax,
    medicareTax,
    stateTax,
    totalDeductions,
    netPay
  };
}

/**
 * Helper function to get pay period multiplier
 */
function getPayPeriodMultiplier(payPeriod: string): number {
  const multipliers = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
    quarterly: 4,
    annually: 1
  };
  return multipliers[payPeriod as keyof typeof multipliers] || 26;
}