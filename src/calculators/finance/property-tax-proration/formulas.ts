import { PropertyTaxProrationInputs, PropertyTaxProrationResults, PropertyTaxProrationMetrics } from './types';

export function calculatePropertyTaxProration(inputs: PropertyTaxProrationInputs): PropertyTaxProrationResults {
  const {
    propertyValue,
    annualTaxRate,
    closingDate,
    prorationDate,
    sellerPaysTaxes,
    buyerPaysTaxes,
    taxYearStart,
    taxYearEnd,
    prepaidTaxes,
    taxAssessment
  } = inputs;

  // Calculate annual property tax
  const annualPropertyTax = (taxAssessment || propertyValue) * (annualTaxRate / 100);

  // Parse dates
  const closing = new Date(closingDate);
  const proration = new Date(prorationDate);
  const taxStart = new Date(taxYearStart);
  const taxEnd = new Date(taxYearEnd);

  // Calculate days in tax year
  const daysInTaxYear = Math.ceil((taxEnd.getTime() - taxStart.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate daily tax rate
  const dailyTaxRate = annualPropertyTax / daysInTaxYear;

  // Calculate days each party owns the property
  const daysSellerOwns = Math.ceil((closing.getTime() - taxStart.getTime()) / (1000 * 60 * 60 * 24));
  const daysBuyerOwns = Math.ceil((taxEnd.getTime() - closing.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate prorations
  const sellerTaxProration = daysSellerOwns * dailyTaxRate;
  const buyerTaxProration = daysBuyerOwns * dailyTaxRate;

  // Calculate net proration amount
  const netProrationAmount = sellerTaxProration - buyerTaxProration;

  // Determine adjustments based on who pays taxes
  let adjustmentToSeller = 0;
  let adjustmentToBuyer = 0;

  if (sellerPaysTaxes && buyerPaysTaxes) {
    // Both pay their share
    adjustmentToSeller = sellerTaxProration;
    adjustmentToBuyer = buyerTaxProration;
  } else if (sellerPaysTaxes) {
    // Seller pays all, buyer gets credit
    adjustmentToSeller = sellerTaxProration + buyerTaxProration;
    adjustmentToBuyer = -buyerTaxProration;
  } else if (buyerPaysTaxes) {
    // Buyer pays all, seller gets credit
    adjustmentToSeller = -sellerTaxProration;
    adjustmentToBuyer = sellerTaxProration + buyerTaxProration;
  }

  // Calculate total tax due (including prepaid adjustments)
  const totalTaxDue = annualPropertyTax - (prepaidTaxes || 0);

  // Calculate prepaid tax adjustment
  const prepaidTaxAdjustment = prepaidTaxes ? prepaidTaxes - sellerTaxProration : 0;

  return {
    annualPropertyTax,
    dailyTaxRate,
    daysInTaxYear,
    daysSellerOwns,
    daysBuyerOwns,
    sellerTaxProration,
    buyerTaxProration,
    netProrationAmount,
    adjustmentToSeller,
    adjustmentToBuyer,
    totalTaxDue,
    prepaidTaxAdjustment
  };
}

export function calculatePropertyTaxMetrics(
  inputs: PropertyTaxProrationInputs,
  results: PropertyTaxProrationResults
): PropertyTaxProrationMetrics {
  const { closingDate, prorationDate, taxYearStart, taxYearEnd } = inputs;
  const { daysSellerOwns, daysBuyerOwns, daysInTaxYear } = results;

  // Calculate proration accuracy
  const prorationAccuracy = Math.abs(daysSellerOwns + daysBuyerOwns - daysInTaxYear) < 2 ? 100 : 95;

  // Calculate tax year progress
  const closing = new Date(closingDate);
  const taxStart = new Date(taxYearStart);
  const taxEnd = new Date(taxYearEnd);
  const taxYearProgress = ((closing.getTime() - taxStart.getTime()) / (taxEnd.getTime() - taxStart.getTime())) * 100;

  // Calculate portions
  const sellerPortion = (daysSellerOwns / daysInTaxYear) * 100;
  const buyerPortion = (daysBuyerOwns / daysInTaxYear) * 100;

  // Determine adjustment direction
  let adjustmentDirection: 'seller' | 'buyer' | 'neutral' = 'neutral';
  if (results.adjustmentToSeller > results.adjustmentToBuyer) {
    adjustmentDirection = 'seller';
  } else if (results.adjustmentToBuyer > results.adjustmentToSeller) {
    adjustmentDirection = 'buyer';
  }

  return {
    prorationAccuracy,
    taxYearProgress,
    sellerPortion,
    buyerPortion,
    adjustmentDirection
  };
}

export function validatePropertyTaxInputs(inputs: PropertyTaxProrationInputs): string[] {
  const errors: string[] = [];

  if (inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (inputs.annualTaxRate <= 0 || inputs.annualTaxRate > 100) {
    errors.push('Annual tax rate must be between 0 and 100');
  }

  if (inputs.taxAssessment && inputs.taxAssessment <= 0) {
    errors.push('Tax assessment must be greater than 0');
  }

  const closingDate = new Date(inputs.closingDate);
  const prorationDate = new Date(inputs.prorationDate);
  const taxStart = new Date(inputs.taxYearStart);
  const taxEnd = new Date(inputs.taxYearEnd);

  if (closingDate >= taxEnd || closingDate <= taxStart) {
    errors.push('Closing date must be within the tax year');
  }

  if (prorationDate < closingDate) {
    errors.push('Proration date cannot be before closing date');
  }

  if (taxEnd <= taxStart) {
    errors.push('Tax year end must be after tax year start');
  }

  return errors;
}