/**
 * Property Tax Proration Calculator Formulas
 * Comprehensive property tax calculations for ownership changes during tax year
 */

/**
 * Calculate property tax proration for ownership change
 */
export function calculatePropertyTaxProration(
  annualPropertyTax: number,
  salePrice: number,
  closingDate: Date,
  taxYearStart: Date,
  taxYearEnd: Date,
  prorationMethod: '365_day' | '366_day' | 'actual_days' = '365_day',
  sellerPaysTax: boolean = true
): {
  annualPropertyTax: number;
  salePrice: number;
  daysOwnedBySeller: number;
  daysOwnedByBuyer: number;
  totalDaysInPeriod: number;
  sellerTaxResponsibility: number;
  buyerTaxResponsibility: number;
  prorationDate: Date;
  taxYearStart: Date;
  taxYearEnd: Date;
  prorationMethod: string;
  sellerPaysTax: boolean;
  adjustmentAmount: number;
} {
  if (annualPropertyTax < 0) {
    throw new Error('Annual property tax cannot be negative');
  }
  if (salePrice <= 0) {
    throw new Error('Sale price must be positive');
  }
  if (closingDate < taxYearStart || closingDate > taxYearEnd) {
    throw new Error('Closing date must be within the tax year period');
  }

  // Calculate total days in the period
  let totalDaysInPeriod: number;
  switch (prorationMethod) {
    case '365_day':
      totalDaysInPeriod = 365;
      break;
    case '366_day':
      totalDaysInPeriod = 366;
      break;
    case 'actual_days':
      totalDaysInPeriod = Math.ceil((taxYearEnd.getTime() - taxYearStart.getTime()) / (1000 * 60 * 60 * 24));
      break;
    default:
      totalDaysInPeriod = 365;
  }

  // Calculate days owned by each party
  const daysFromStartToClosing = Math.ceil((closingDate.getTime() - taxYearStart.getTime()) / (1000 * 60 * 60 * 24));
  const daysFromClosingToEnd = Math.ceil((taxYearEnd.getTime() - closingDate.getTime()) / (1000 * 60 * 60 * 24));

  const daysOwnedBySeller = daysFromStartToClosing;
  const daysOwnedByBuyer = daysFromClosingToEnd;

  // Calculate prorated amounts
  const dailyTaxRate = annualPropertyTax / totalDaysInPeriod;
  const sellerTaxResponsibility = daysOwnedBySeller * dailyTaxRate;
  const buyerTaxResponsibility = daysOwnedByBuyer * dailyTaxRate;

  // Calculate adjustment amount
  const adjustmentAmount = sellerPaysTax ? sellerTaxResponsibility : buyerTaxResponsibility;

  return {
    annualPropertyTax: Math.round(annualPropertyTax * 100) / 100,
    salePrice: Math.round(salePrice * 100) / 100,
    daysOwnedBySeller,
    daysOwnedByBuyer,
    totalDaysInPeriod,
    sellerTaxResponsibility: Math.round(sellerTaxResponsibility * 100) / 100,
    buyerTaxResponsibility: Math.round(buyerTaxResponsibility * 100) / 100,
    prorationDate: closingDate,
    taxYearStart,
    taxYearEnd,
    prorationMethod,
    sellerPaysTax,
    adjustmentAmount: Math.round(adjustmentAmount * 100) / 100
  };
}

/**
 * Calculate property tax based on assessed value and millage rate
 */
export function calculatePropertyTaxFromAssessedValue(
  assessedValue: number,
  millageRate: number,
  exemptions: number = 0,
  specialAssessments: number = 0
): {
  assessedValue: number;
  millageRate: number;
  exemptions: number;
  taxableValue: number;
  annualPropertyTax: number;
  specialAssessments: number;
  totalTaxAmount: number;
  taxRatePercentage: number;
} {
  if (assessedValue < 0) {
    throw new Error('Assessed value cannot be negative');
  }
  if (millageRate < 0) {
    throw new Error('Millage rate cannot be negative');
  }
  if (exemptions < 0) {
    throw new Error('Exemptions cannot be negative');
  }
  if (specialAssessments < 0) {
    throw new Error('Special assessments cannot be negative');
  }

  const taxableValue = Math.max(0, assessedValue - exemptions);
  const annualPropertyTax = (taxableValue * millageRate) / 1000; // Millage rate is per $1000
  const totalTaxAmount = annualPropertyTax + specialAssessments;
  const taxRatePercentage = (annualPropertyTax / assessedValue) * 100;

  return {
    assessedValue: Math.round(assessedValue * 100) / 100,
    millageRate: Math.round(millageRate * 100) / 100,
    exemptions: Math.round(exemptions * 100) / 100,
    taxableValue: Math.round(taxableValue * 100) / 100,
    annualPropertyTax: Math.round(annualPropertyTax * 100) / 100,
    specialAssessments: Math.round(specialAssessments * 100) / 100,
    totalTaxAmount: Math.round(totalTaxAmount * 100) / 100,
    taxRatePercentage: Math.round(taxRatePercentage * 100) / 100
  };
}

/**
 * Calculate property tax appeal savings
 */
export function calculatePropertyTaxAppealSavings(
  currentAssessedValue: number,
  appealedAssessedValue: number,
  millageRate: number,
  appealCost: number = 0,
  successProbability: number = 100
): {
  currentAssessedValue: number;
  appealedAssessedValue: number;
  millageRate: number;
  currentAnnualTax: number;
  appealedAnnualTax: number;
  annualSavings: number;
  appealCost: number;
  netAnnualSavings: number;
  successProbability: number;
  expectedValue: number;
  paybackPeriod: number;
} {
  if (currentAssessedValue < 0 || appealedAssessedValue < 0) {
    throw new Error('Assessed values cannot be negative');
  }
  if (millageRate < 0) {
    throw new Error('Millage rate cannot be negative');
  }
  if (appealCost < 0) {
    throw new Error('Appeal cost cannot be negative');
  }
  if (successProbability < 0 || successProbability > 100) {
    throw new Error('Success probability must be between 0 and 100');
  }

  const currentAnnualTax = (currentAssessedValue * millageRate) / 1000;
  const appealedAnnualTax = (appealedAssessedValue * millageRate) / 1000;
  const annualSavings = currentAnnualTax - appealedAnnualTax;
  const netAnnualSavings = annualSavings - appealCost;
  const expectedValue = (annualSavings * successProbability / 100) - appealCost;
  const paybackPeriod = appealCost > 0 ? appealCost / annualSavings : 0;

  return {
    currentAssessedValue: Math.round(currentAssessedValue * 100) / 100,
    appealedAssessedValue: Math.round(appealedAssessedValue * 100) / 100,
    millageRate: Math.round(millageRate * 100) / 100,
    currentAnnualTax: Math.round(currentAnnualTax * 100) / 100,
    appealedAnnualTax: Math.round(appealedAnnualTax * 100) / 100,
    annualSavings: Math.round(annualSavings * 100) / 100,
    appealCost: Math.round(appealCost * 100) / 100,
    netAnnualSavings: Math.round(netAnnualSavings * 100) / 100,
    successProbability,
    expectedValue: Math.round(expectedValue * 100) / 100,
    paybackPeriod: Math.round(paybackPeriod * 100) / 100
  };
}

/**
 * Calculate property tax escrow and impound calculations
 */
export function calculatePropertyTaxEscrow(
  annualPropertyTax: number,
  escrowMonths: number = 12,
  currentBalance: number = 0,
  monthlyPayment: number = 0,
  cushionAmount: number = 0
): {
  annualPropertyTax: number;
  escrowMonths: number;
  monthlyEscrowPayment: number;
  annualEscrowPayment: number;
  currentBalance: number;
  monthlyPayment: number;
  cushionAmount: number;
  totalEscrowRequirement: number;
  escrowShortage: number;
  escrowSurplus: number;
} {
  if (annualPropertyTax < 0) {
    throw new Error('Annual property tax cannot be negative');
  }
  if (escrowMonths <= 0) {
    throw new Error('Escrow months must be positive');
  }
  if (currentBalance < 0) {
    throw new Error('Current balance cannot be negative');
  }
  if (monthlyPayment < 0) {
    throw new Error('Monthly payment cannot be negative');
  }
  if (cushionAmount < 0) {
    throw new Error('Cushion amount cannot be negative');
  }

  const monthlyEscrowPayment = annualPropertyTax / escrowMonths;
  const annualEscrowPayment = monthlyEscrowPayment * 12;
  const totalEscrowRequirement = annualPropertyTax + cushionAmount;
  const escrowShortage = Math.max(0, totalEscrowRequirement - currentBalance);
  const escrowSurplus = Math.max(0, currentBalance - totalEscrowRequirement);

  return {
    annualPropertyTax: Math.round(annualPropertyTax * 100) / 100,
    escrowMonths,
    monthlyEscrowPayment: Math.round(monthlyEscrowPayment * 100) / 100,
    annualEscrowPayment: Math.round(annualEscrowPayment * 100) / 100,
    currentBalance: Math.round(currentBalance * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    cushionAmount: Math.round(cushionAmount * 100) / 100,
    totalEscrowRequirement: Math.round(totalEscrowRequirement * 100) / 100,
    escrowShortage: Math.round(escrowShortage * 100) / 100,
    escrowSurplus: Math.round(escrowSurplus * 100) / 100
  };
}

/**
 * Calculate property tax assessment changes and adjustments
 */
export function calculatePropertyTaxAssessmentChange(
  previousAssessedValue: number,
  newAssessedValue: number,
  millageRate: number,
  assessmentYear: number,
  homesteadExemption: number = 0,
  portabilityAmount: number = 0
): {
  previousAssessedValue: number;
  newAssessedValue: number;
  millageRate: number;
  assessmentYear: number;
  valueChange: number;
  percentageChange: number;
  previousTax: number;
  newTax: number;
  taxChange: number;
  homesteadExemption: number;
  portabilityAmount: number;
  taxableValueChange: number;
  effectiveTaxRate: number;
} {
  if (previousAssessedValue < 0 || newAssessedValue < 0) {
    throw new Error('Assessed values cannot be negative');
  }
  if (millageRate < 0) {
    throw new Error('Millage rate cannot be negative');
  }
  if (homesteadExemption < 0) {
    throw new Error('Homestead exemption cannot be negative');
  }
  if (portabilityAmount < 0) {
    throw new Error('Portability amount cannot be negative');
  }

  const valueChange = newAssessedValue - previousAssessedValue;
  const percentageChange = previousAssessedValue > 0 ? (valueChange / previousAssessedValue) * 100 : 0;

  const previousTaxableValue = Math.max(0, previousAssessedValue - homesteadExemption);
  const newTaxableValue = Math.max(0, newAssessedValue - homesteadExemption - portabilityAmount);

  const previousTax = (previousTaxableValue * millageRate) / 1000;
  const newTax = (newTaxableValue * millageRate) / 1000;
  const taxChange = newTax - previousTax;
  const taxableValueChange = newTaxableValue - previousTaxableValue;
  const effectiveTaxRate = newAssessedValue > 0 ? (newTax / newAssessedValue) * 100 : 0;

  return {
    previousAssessedValue: Math.round(previousAssessedValue * 100) / 100,
    newAssessedValue: Math.round(newAssessedValue * 100) / 100,
    millageRate: Math.round(millageRate * 100) / 100,
    assessmentYear,
    valueChange: Math.round(valueChange * 100) / 100,
    percentageChange: Math.round(percentageChange * 100) / 100,
    previousTax: Math.round(previousTax * 100) / 100,
    newTax: Math.round(newTax * 100) / 100,
    taxChange: Math.round(taxChange * 100) / 100,
    homesteadExemption: Math.round(homesteadExemption * 100) / 100,
    portabilityAmount: Math.round(portabilityAmount * 100) / 100,
    taxableValueChange: Math.round(taxableValueChange * 100) / 100,
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100
  };
}

/**
 * Calculate property tax cap and limitation adjustments
 */
export function calculatePropertyTaxCap(
  assessedValue: number,
  previousYearTax: number,
  taxCapPercentage: number = 10,
  millageRate: number,
  capType: 'hard_cap' | 'soft_cap' | 'no_cap' = 'soft_cap'
): {
  assessedValue: number;
  previousYearTax: number;
  taxCapPercentage: number;
  millageRate: number;
  capType: string;
  calculatedTax: number;
  cappedTax: number;
  taxIncrease: number;
  capApplied: boolean;
  capAmount: number;
} {
  if (assessedValue < 0) {
    throw new Error('Assessed value cannot be negative');
  }
  if (previousYearTax < 0) {
    throw new Error('Previous year tax cannot be negative');
  }
  if (taxCapPercentage < 0) {
    throw new Error('Tax cap percentage cannot be negative');
  }
  if (millageRate < 0) {
    throw new Error('Millage rate cannot be negative');
  }

  const calculatedTax = (assessedValue * millageRate) / 1000;
  const maxTaxIncrease = previousYearTax * (taxCapPercentage / 100);
  const maxAllowedTax = previousYearTax + maxTaxIncrease;
  const taxIncrease = calculatedTax - previousYearTax;

  let cappedTax = calculatedTax;
  let capApplied = false;
  let capAmount = 0;

  switch (capType) {
    case 'hard_cap':
      if (calculatedTax > maxAllowedTax) {
        cappedTax = maxAllowedTax;
        capApplied = true;
        capAmount = calculatedTax - maxAllowedTax;
      }
      break;
    case 'soft_cap':
      // Soft cap allows some increase but limits excessive growth
      if (taxIncrease > maxTaxIncrease) {
        cappedTax = maxAllowedTax;
        capApplied = true;
        capAmount = taxIncrease - maxTaxIncrease;
      }
      break;
    case 'no_cap':
    default:
      // No cap applied
      break;
  }

  return {
    assessedValue: Math.round(assessedValue * 100) / 100,
    previousYearTax: Math.round(previousYearTax * 100) / 100,
    taxCapPercentage,
    millageRate: Math.round(millageRate * 100) / 100,
    capType,
    calculatedTax: Math.round(calculatedTax * 100) / 100,
    cappedTax: Math.round(cappedTax * 100) / 100,
    taxIncrease: Math.round(taxIncrease * 100) / 100,
    capApplied,
    capAmount: Math.round(capAmount * 100) / 100
  };
}

/**
 * Main property tax proration calculation function
 */
export function calculatePropertyTax(inputs: any): any {
  const {
    calculationType,
    annualPropertyTax, salePrice, closingDate, taxYearStart, taxYearEnd,
    prorationMethod, sellerPaysTax,
    assessedValue, millageRate, exemptions, specialAssessments,
    currentAssessedValue, appealedAssessedValue, appealCost, successProbability,
    escrowMonths, currentBalance, monthlyPayment, cushionAmount,
    previousAssessedValue, newAssessedValue, assessmentYear, homesteadExemption, portabilityAmount,
    previousYearTax, taxCapPercentage, capType
  } = inputs;

  switch (calculationType) {
    case 'proration':
      return calculatePropertyTaxProration(
        annualPropertyTax,
        salePrice,
        new Date(closingDate),
        new Date(taxYearStart),
        new Date(taxYearEnd),
        prorationMethod,
        sellerPaysTax
      );

    case 'from_assessed_value':
      return calculatePropertyTaxFromAssessedValue(
        assessedValue,
        millageRate,
        exemptions,
        specialAssessments
      );

    case 'appeal_savings':
      return calculatePropertyTaxAppealSavings(
        currentAssessedValue,
        appealedAssessedValue,
        millageRate,
        appealCost,
        successProbability
      );

    case 'escrow':
      return calculatePropertyTaxEscrow(
        annualPropertyTax,
        escrowMonths,
        currentBalance,
        monthlyPayment,
        cushionAmount
      );

    case 'assessment_change':
      return calculatePropertyTaxAssessmentChange(
        previousAssessedValue,
        newAssessedValue,
        millageRate,
        assessmentYear,
        homesteadExemption,
        portabilityAmount
      );

    case 'tax_cap':
      return calculatePropertyTaxCap(
        assessedValue,
        previousYearTax,
        taxCapPercentage,
        millageRate,
        capType
      );

    case 'comprehensive':
      // Calculate multiple aspects for comprehensive property tax analysis
      const proration = calculatePropertyTaxProration(
        annualPropertyTax || 3000,
        salePrice || 250000,
        new Date(closingDate || '2024-06-15'),
        new Date(taxYearStart || '2024-01-01'),
        new Date(taxYearEnd || '2024-12-31'),
        prorationMethod || '365_day',
        sellerPaysTax !== false
      );

      const assessment = calculatePropertyTaxFromAssessedValue(
        assessedValue || 200000,
        millageRate || 25,
        exemptions || 0,
        specialAssessments || 0
      );

      const escrow = calculatePropertyTaxEscrow(
        annualPropertyTax || 3000,
        escrowMonths || 12,
        currentBalance || 0,
        monthlyPayment || 0,
        cushionAmount || 0
      );

      return {
        proration,
        assessment,
        escrow,
        summary: {
          annualPropertyTax: annualPropertyTax || 3000,
          assessedValue: assessedValue || 200000,
          millageRate: millageRate || 25,
          sellerProrationAmount: proration.sellerTaxResponsibility,
          buyerProrationAmount: proration.buyerTaxResponsibility,
          monthlyEscrowPayment: escrow.monthlyEscrowPayment,
          totalTaxAmount: assessment.totalTaxAmount
        }
      };

    default:
      throw new Error('Unknown property tax calculation type');
  }
}