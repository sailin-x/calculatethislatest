/**
 * Real Estate Tax Deductions Calculator Formulas
 * Comprehensive tax deduction calculations for real estate investments
 */

/**
 * Calculate mortgage interest deduction
 */
export function calculateMortgageInterestDeduction(
  loanAmount: number,
  interestRate: number,
  loanTermYears: number,
  taxRate: number = 37,
  currentYear: number = 1
): {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  taxRate: number;
  currentYear: number;
  annualInterestPayment: number;
  taxDeduction: number;
  taxSavings: number;
  cumulativeInterestPaid: number;
  remainingLoanBalance: number;
  interestSchedule: Array<{
    year: number;
    beginningBalance: number;
    interestPayment: number;
    principalPayment: number;
    endingBalance: number;
    taxDeduction: number;
    taxSavings: number;
  }>;
} {
  if (loanAmount <= 0) {
    throw new Error('Loan amount must be positive');
  }
  if (interestRate < 0 || interestRate > 50) {
    throw new Error('Interest rate must be between 0 and 50');
  }
  if (loanTermYears <= 0) {
    throw new Error('Loan term must be positive');
  }
  if (taxRate < 0 || taxRate > 100) {
    throw new Error('Tax rate must be between 0 and 100');
  }
  if (currentYear < 1) {
    throw new Error('Current year must be at least 1');
  }

  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const annualInterestPayment = monthlyPayment * 12 - (loanAmount / loanTermYears);
  const taxDeduction = annualInterestPayment;
  const taxSavings = taxDeduction * (taxRate / 100);

  // Generate amortization schedule
  const interestSchedule = [];
  let balance = loanAmount;
  let cumulativeInterest = 0;

  for (let year = 1; year <= loanTermYears; year++) {
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;

    for (let month = 1; month <= 12; month++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;

      yearlyInterest += interest;
      yearlyPrincipal += principal;
      balance -= principal;

      if (balance < 0) balance = 0;
    }

    const yearTaxDeduction = yearlyInterest;
    const yearTaxSavings = yearTaxDeduction * (taxRate / 100);
    cumulativeInterest += yearlyInterest;

    interestSchedule.push({
      year,
      beginningBalance: Math.round((balance + yearlyPrincipal) * 100) / 100,
      interestPayment: Math.round(yearlyInterest * 100) / 100,
      principalPayment: Math.round(yearlyPrincipal * 100) / 100,
      endingBalance: Math.round(balance * 100) / 100,
      taxDeduction: Math.round(yearTaxDeduction * 100) / 100,
      taxSavings: Math.round(yearTaxSavings * 100) / 100
    });

    if (year === currentYear) {
      return {
        loanAmount: Math.round(loanAmount * 100) / 100,
        interestRate,
        loanTermYears,
        taxRate,
        currentYear,
        annualInterestPayment: Math.round(yearlyInterest * 100) / 100,
        taxDeduction: Math.round(yearTaxDeduction * 100) / 100,
        taxSavings: Math.round(yearTaxSavings * 100) / 100,
        cumulativeInterestPaid: Math.round(cumulativeInterest * 100) / 100,
        remainingLoanBalance: Math.round(balance * 100) / 100,
        interestSchedule
      };
    }
  }

  // Fallback for years beyond loan term
  return {
    loanAmount: Math.round(loanAmount * 100) / 100,
    interestRate,
    loanTermYears,
    taxRate,
    currentYear,
    annualInterestPayment: 0,
    taxDeduction: 0,
    taxSavings: 0,
    cumulativeInterestPaid: Math.round(cumulativeInterest * 100) / 100,
    remainingLoanBalance: 0,
    interestSchedule
  };
}

/**
 * Calculate property tax deduction
 */
export function calculatePropertyTaxDeduction(
  propertyValue: number,
  taxRate: number,
  incomeTaxRate: number = 37,
  stateAndLocalTaxLimit: number = 10000
): {
  propertyValue: number;
  taxRate: number;
  incomeTaxRate: number;
  stateAndLocalTaxLimit: number;
  annualPropertyTax: number;
  deductibleAmount: number;
  taxSavings: number;
  effectiveTaxRate: number;
  limitationApplied: boolean;
} {
  if (propertyValue < 0) {
    throw new Error('Property value cannot be negative');
  }
  if (taxRate < 0) {
    throw new Error('Tax rate cannot be negative');
  }
  if (incomeTaxRate < 0 || incomeTaxRate > 100) {
    throw new Error('Income tax rate must be between 0 and 100');
  }

  const annualPropertyTax = propertyValue * (taxRate / 100);
  const deductibleAmount = Math.min(annualPropertyTax, stateAndLocalTaxLimit);
  const taxSavings = deductibleAmount * (incomeTaxRate / 100);
  const effectiveTaxRate = (annualPropertyTax - taxSavings) / propertyValue * 100;
  const limitationApplied = annualPropertyTax > stateAndLocalTaxLimit;

  return {
    propertyValue: Math.round(propertyValue * 100) / 100,
    taxRate,
    incomeTaxRate,
    stateAndLocalTaxLimit: Math.round(stateAndLocalTaxLimit * 100) / 100,
    annualPropertyTax: Math.round(annualPropertyTax * 100) / 100,
    deductibleAmount: Math.round(deductibleAmount * 100) / 100,
    taxSavings: Math.round(taxSavings * 100) / 100,
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
    limitationApplied
  };
}

/**
 * Calculate depreciation deduction
 */
export function calculateDepreciationDeduction(
  propertyCost: number,
  landValue: number,
  usefulLife: number = 27.5,
  taxRate: number = 37,
  currentYear: number = 1
): {
  propertyCost: number;
  landValue: number;
  usefulLife: number;
  taxRate: number;
  currentYear: number;
  depreciableBasis: number;
  annualDepreciation: number;
  accumulatedDepreciation: number;
  taxDeduction: number;
  taxSavings: number;
  remainingBasis: number;
} {
  if (propertyCost < 0) {
    throw new Error('Property cost cannot be negative');
  }
  if (landValue < 0) {
    throw new Error('Land value cannot be negative');
  }
  if (landValue > propertyCost) {
    throw new Error('Land value cannot exceed property cost');
  }
  if (usefulLife <= 0) {
    throw new Error('Useful life must be positive');
  }
  if (taxRate < 0 || taxRate > 100) {
    throw new Error('Tax rate must be between 0 and 100');
  }
  if (currentYear < 1) {
    throw new Error('Current year must be at least 1');
  }

  const depreciableBasis = propertyCost - landValue;
  const annualDepreciation = depreciableBasis / usefulLife;
  const accumulatedDepreciation = Math.min(depreciableBasis, annualDepreciation * (currentYear - 1));
  const remainingBasis = depreciableBasis - accumulatedDepreciation;

  return {
    propertyCost: Math.round(propertyCost * 100) / 100,
    landValue: Math.round(landValue * 100) / 100,
    usefulLife,
    taxRate,
    currentYear,
    depreciableBasis: Math.round(depreciableBasis * 100) / 100,
    annualDepreciation: Math.round(annualDepreciation * 100) / 100,
    accumulatedDepreciation: Math.round(accumulatedDepreciation * 100) / 100,
    taxDeduction: Math.round(annualDepreciation * 100) / 100,
    taxSavings: Math.round(annualDepreciation * (taxRate / 100) * 100) / 100,
    remainingBasis: Math.round(remainingBasis * 100) / 100
  };
}

/**
 * Calculate operating expense deductions
 */
export function calculateOperatingExpenseDeductions(
  propertyManagementFees: number,
  maintenanceRepairs: number,
  insurance: number,
  utilities: number,
  advertising: number,
  legalProfessionalFees: number,
  otherExpenses: number,
  taxRate: number = 37
): {
  propertyManagementFees: number;
  maintenanceRepairs: number;
  insurance: number;
  utilities: number;
  advertising: number;
  legalProfessionalFees: number;
  otherExpenses: number;
  taxRate: number;
  totalOperatingExpenses: number;
  totalTaxDeduction: number;
  totalTaxSavings: number;
  expenseBreakdown: {
    management: number;
    maintenance: number;
    insurance: number;
    utilities: number;
    advertising: number;
    legal: number;
    other: number;
  };
} {
  if (propertyManagementFees < 0 || maintenanceRepairs < 0 || insurance < 0 ||
      utilities < 0 || advertising < 0 || legalProfessionalFees < 0 || otherExpenses < 0) {
    throw new Error('Expense amounts cannot be negative');
  }
  if (taxRate < 0 || taxRate > 100) {
    throw new Error('Tax rate must be between 0 and 100');
  }

  const totalOperatingExpenses = propertyManagementFees + maintenanceRepairs + insurance +
                                utilities + advertising + legalProfessionalFees + otherExpenses;

  const expenseBreakdown = {
    management: Math.round(propertyManagementFees * (taxRate / 100) * 100) / 100,
    maintenance: Math.round(maintenanceRepairs * (taxRate / 100) * 100) / 100,
    insurance: Math.round(insurance * (taxRate / 100) * 100) / 100,
    utilities: Math.round(utilities * (taxRate / 100) * 100) / 100,
    advertising: Math.round(advertising * (taxRate / 100) * 100) / 100,
    legal: Math.round(legalProfessionalFees * (taxRate / 100) * 100) / 100,
    other: Math.round(otherExpenses * (taxRate / 100) * 100) / 100
  };

  const totalTaxSavings = Object.values(expenseBreakdown).reduce((sum, savings) => sum + savings, 0);

  return {
    propertyManagementFees: Math.round(propertyManagementFees * 100) / 100,
    maintenanceRepairs: Math.round(maintenanceRepairs * 100) / 100,
    insurance: Math.round(insurance * 100) / 100,
    utilities: Math.round(utilities * 100) / 100,
    advertising: Math.round(advertising * 100) / 100,
    legalProfessionalFees: Math.round(legalProfessionalFees * 100) / 100,
    otherExpenses: Math.round(otherExpenses * 100) / 100,
    taxRate,
    totalOperatingExpenses: Math.round(totalOperatingExpenses * 100) / 100,
    totalTaxDeduction: Math.round(totalOperatingExpenses * 100) / 100,
    totalTaxSavings: Math.round(totalTaxSavings * 100) / 100,
    expenseBreakdown
  };
}

/**
 * Calculate 1031 exchange tax deferral
 */
export function calculate1031ExchangeDeferral(
  relinquishedPropertyCost: number,
  relinquishedPropertyValue: number,
  replacementPropertyCost: number,
  taxRate: number = 37
): {
  relinquishedPropertyCost: number;
  relinquishedPropertyValue: number;
  replacementPropertyCost: number;
  taxRate: number;
  recognizedGain: number;
  deferredGain: number;
  taxLiability: number;
  taxSavings: number;
  netProceeds: number;
  exchangeEfficiency: number;
} {
  if (relinquishedPropertyCost < 0 || relinquishedPropertyValue < 0 || replacementPropertyCost < 0) {
    throw new Error('Property values cannot be negative');
  }
  if (taxRate < 0 || taxRate > 100) {
    throw new Error('Tax rate must be between 0 and 100');
  }

  const gain = relinquishedPropertyValue - relinquishedPropertyCost;
  const recognizedGain = Math.max(0, gain - (replacementPropertyCost - relinquishedPropertyCost));
  const deferredGain = Math.max(0, gain - recognizedGain);
  const taxLiability = recognizedGain * (taxRate / 100);
  const taxSavings = deferredGain * (taxRate / 100);
  const netProceeds = relinquishedPropertyValue - taxLiability;
  const exchangeEfficiency = replacementPropertyCost > 0 ? (deferredGain / gain) * 100 : 0;

  return {
    relinquishedPropertyCost: Math.round(relinquishedPropertyCost * 100) / 100,
    relinquishedPropertyValue: Math.round(relinquishedPropertyValue * 100) / 100,
    replacementPropertyCost: Math.round(replacementPropertyCost * 100) / 100,
    taxRate,
    recognizedGain: Math.round(recognizedGain * 100) / 100,
    deferredGain: Math.round(deferredGain * 100) / 100,
    taxLiability: Math.round(taxLiability * 100) / 100,
    taxSavings: Math.round(taxSavings * 100) / 100,
    netProceeds: Math.round(netProceeds * 100) / 100,
    exchangeEfficiency: Math.round(exchangeEfficiency * 100) / 100
  };
}

/**
 * Calculate passive loss limitations
 */
export function calculatePassiveLossLimitations(
  rentalIncome: number,
  operatingExpenses: number,
  depreciation: number,
  interestExpense: number,
  otherPassiveIncome: number,
  otherPassiveLosses: number,
  taxRate: number = 37,
  filingStatus: 'single' | 'married_joint' | 'married_separate' | 'head_household' = 'single'
): {
  rentalIncome: number;
  operatingExpenses: number;
  depreciation: number;
  interestExpense: number;
  otherPassiveIncome: number;
  otherPassiveLosses: number;
  taxRate: number;
  filingStatus: string;
  totalPassiveIncome: number;
  totalPassiveLosses: number;
  netPassiveIncome: number;
  netPassiveLoss: number;
  passiveLossLimitation: number;
  deductibleLoss: number;
  suspendedLoss: number;
  taxSavings: number;
} {
  if (rentalIncome < 0 || operatingExpenses < 0 || depreciation < 0 || interestExpense < 0) {
    throw new Error('Income and expense amounts cannot be negative');
  }
  if (taxRate < 0 || taxRate > 100) {
    throw new Error('Tax rate must be between 0 and 100');
  }

  const totalPassiveIncome = rentalIncome + otherPassiveIncome;
  const totalPassiveLosses = operatingExpenses + depreciation + interestExpense + otherPassiveLosses;

  const netPassiveIncome = totalPassiveIncome - totalPassiveLosses;
  const netPassiveLoss = totalPassiveLosses - totalPassiveIncome;

  // Passive loss limitation based on filing status (simplified)
  const passiveLossLimitations = {
    single: 25000,
    married_joint: 50000,
    married_separate: 25000,
    head_household: 25000
  };

  const passiveLossLimitation = passiveLossLimitations[filingStatus];
  const deductibleLoss = Math.min(netPassiveLoss, passiveLossLimitation);
  const suspendedLoss = Math.max(0, netPassiveLoss - passiveLossLimitation);
  const taxSavings = deductibleLoss * (taxRate / 100);

  return {
    rentalIncome: Math.round(rentalIncome * 100) / 100,
    operatingExpenses: Math.round(operatingExpenses * 100) / 100,
    depreciation: Math.round(depreciation * 100) / 100,
    interestExpense: Math.round(interestExpense * 100) / 100,
    otherPassiveIncome: Math.round(otherPassiveIncome * 100) / 100,
    otherPassiveLosses: Math.round(otherPassiveLosses * 100) / 100,
    taxRate,
    filingStatus,
    totalPassiveIncome: Math.round(totalPassiveIncome * 100) / 100,
    totalPassiveLosses: Math.round(totalPassiveLosses * 100) / 100,
    netPassiveIncome: Math.round(netPassiveIncome * 100) / 100,
    netPassiveLoss: Math.round(netPassiveLoss * 100) / 100,
    passiveLossLimitation,
    deductibleLoss: Math.round(deductibleLoss * 100) / 100,
    suspendedLoss: Math.round(suspendedLoss * 100) / 100,
    taxSavings: Math.round(taxSavings * 100) / 100
  };
}

/**
 * Calculate real estate professional status
 */
export function calculateRealEstateProfessionalStatus(
  realEstateHours: number,
  totalHours: number,
  realEstateIncome: number,
  totalIncome: number,
  moreThan750Hours: boolean = false,
  moreThanHalfTime: boolean = false
): {
  realEstateHours: number;
  totalHours: number;
  realEstateIncome: number;
  totalIncome: number;
  moreThan750Hours: boolean;
  moreThanHalfTime: boolean;
  hoursTestPassed: boolean;
  materialParticipationTestPassed: boolean;
  realEstateProfessionalStatus: boolean;
  taxBenefits: {
    passiveLossDeduction: string;
    selfEmploymentTax: string;
    depreciation: string;
  };
} {
  if (realEstateHours < 0 || totalHours <= 0) {
    throw new Error('Hours must be non-negative and total hours must be positive');
  }
  if (realEstateIncome < 0 || totalIncome < 0) {
    throw new Error('Income amounts cannot be negative');
  }

  const hoursTestPassed = realEstateHours >= 750 || moreThan750Hours;
  const materialParticipationTestPassed = (realEstateHours >= totalHours * 0.5) || moreThanHalfTime;
  const realEstateProfessionalStatus = hoursTestPassed && materialParticipationTestPassed;

  const taxBenefits = {
    passiveLossDeduction: realEstateProfessionalStatus ? 'Unlimited' : 'Limited to $25,000',
    selfEmploymentTax: realEstateProfessionalStatus ? 'Deductible' : 'Not deductible',
    depreciation: realEstateProfessionalStatus ? 'Fully deductible' : 'Limited'
  };

  return {
    realEstateHours,
    totalHours,
    realEstateIncome: Math.round(realEstateIncome * 100) / 100,
    totalIncome: Math.round(totalIncome * 100) / 100,
    moreThan750Hours,
    moreThanHalfTime,
    hoursTestPassed,
    materialParticipationTestPassed,
    realEstateProfessionalStatus,
    taxBenefits
  };
}

/**
 * Main real estate tax deductions calculation function
 */
export function calculateRealEstateTaxDeductions(inputs: any): any {
  const {
    calculationType,
    loanAmount, interestRate, loanTermYears, taxRate, currentYear,
    propertyValue, propertyTaxRate, stateAndLocalTaxLimit,
    propertyCost, landValue, usefulLife,
    propertyManagementFees, maintenanceRepairs, insurance, utilities, advertising, legalProfessionalFees, otherExpenses,
    relinquishedPropertyCost, relinquishedPropertyValue, replacementPropertyCost,
    rentalIncome, operatingExpenses, depreciation, interestExpense, otherPassiveIncome, otherPassiveLosses, filingStatus,
    realEstateHours, totalHours, realEstateIncome, totalIncome, moreThan750Hours, moreThanHalfTime
  } = inputs;

  switch (calculationType) {
    case 'mortgage_interest':
      return calculateMortgageInterestDeduction(
        loanAmount,
        interestRate,
        loanTermYears,
        taxRate,
        currentYear
      );

    case 'property_tax':
      return calculatePropertyTaxDeduction(
        propertyValue,
        propertyTaxRate,
        taxRate,
        stateAndLocalTaxLimit
      );

    case 'depreciation':
      return calculateDepreciationDeduction(
        propertyCost,
        landValue,
        usefulLife,
        taxRate,
        currentYear
      );

    case 'operating_expenses':
      return calculateOperatingExpenseDeductions(
        propertyManagementFees,
        maintenanceRepairs,
        insurance,
        utilities,
        advertising,
        legalProfessionalFees,
        otherExpenses,
        taxRate
      );

    case '1031_exchange':
      return calculate1031ExchangeDeferral(
        relinquishedPropertyCost,
        relinquishedPropertyValue,
        replacementPropertyCost,
        taxRate
      );

    case 'passive_losses':
      return calculatePassiveLossLimitations(
        rentalIncome,
        operatingExpenses,
        depreciation,
        interestExpense,
        otherPassiveIncome,
        otherPassiveLosses,
        taxRate,
        filingStatus
      );

    case 'professional_status':
      return calculateRealEstateProfessionalStatus(
        realEstateHours,
        totalHours,
        realEstateIncome,
        totalIncome,
        moreThan750Hours,
        moreThanHalfTime
      );

    case 'comprehensive':
      // Calculate comprehensive tax deductions analysis
      const mortgageInterest = calculateMortgageInterestDeduction(
        loanAmount || 300000,
        interestRate || 4.5,
        loanTermYears || 30,
        taxRate || 37,
        currentYear || 1
      );

      const propertyTax = calculatePropertyTaxDeduction(
        propertyValue || 400000,
        propertyTaxRate || 1.2,
        taxRate || 37,
        stateAndLocalTaxLimit || 10000
      );

      const depreciation = calculateDepreciationDeduction(
        propertyCost || 400000,
        landValue || 80000,
        usefulLife || 27.5,
        taxRate || 37,
        currentYear || 1
      );

      const operatingExp = calculateOperatingExpenseDeductions(
        propertyManagementFees || 5000,
        maintenanceRepairs || 3000,
        insurance || 2000,
        utilities || 1500,
        advertising || 1000,
        legalProfessionalFees || 800,
        otherExpenses || 500,
        taxRate || 37
      );

      const totalDeductions = mortgageInterest.taxDeduction + propertyTax.deductibleAmount +
                             depreciation.taxDeduction + operatingExp.totalTaxDeduction;

      const totalTaxSavings = mortgageInterest.taxSavings + propertyTax.taxSavings +
                             depreciation.taxSavings + operatingExp.totalTaxSavings;

      return {
        mortgageInterest,
        propertyTax,
        depreciation,
        operatingExpenses: operatingExp,
        summary: {
          totalDeductions: Math.round(totalDeductions * 100) / 100,
          totalTaxSavings: Math.round(totalTaxSavings * 100) / 100,
          effectiveTaxRate: Math.round((totalTaxSavings / totalDeductions) * 100 * 100) / 100,
          cashFlowImprovement: Math.round(totalTaxSavings * 100) / 100
        }
      };

    default:
      throw new Error('Unknown real estate tax deduction calculation type');
  }
}