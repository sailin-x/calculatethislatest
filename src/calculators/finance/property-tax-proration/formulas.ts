import { PropertyTaxProrationInputs, PropertyTaxProrationResults } from './types';

export function calculatePropertyTaxProration(inputs: PropertyTaxProrationInputs): PropertyTaxProrationResults {
  const {
    annualPropertyTax,
    taxYearStart,
    taxYearEnd,
    closingDate,
    prorationMethod,
    includeInterest,
    interestAmount,
    buyerPaysClosingCosts
  } = inputs;

  // Parse dates
  const taxStart = new Date(taxYearStart);
  const taxEnd = new Date(taxYearEnd);
  const closing = new Date(closingDate);

  // Calculate days in tax year based on proration method
  let daysInTaxYear: number;
  switch (prorationMethod) {
    case '365-day':
      daysInTaxYear = 365;
      break;
    case '366-day':
      daysInTaxYear = 366;
      break;
    case '360-day':
      daysInTaxYear = 360;
      break;
    case 'actual-days':
    default:
      daysInTaxYear = Math.ceil((taxEnd.getTime() - taxStart.getTime()) / (1000 * 60 * 60 * 24));
      break;
  }

  // Calculate daily tax rate
  const dailyTaxRate = annualPropertyTax / daysInTaxYear;

  // Calculate days each party owns the property
  const daysOwnedBySeller = Math.max(0, Math.ceil((closing.getTime() - taxStart.getTime()) / (1000 * 60 * 60 * 24)));
  const daysOwnedByBuyer = Math.max(0, Math.ceil((taxEnd.getTime() - closing.getTime()) / (1000 * 60 * 60 * 24)));

  // Calculate tax portions
  const sellerTaxPortion = daysOwnedBySeller * dailyTaxRate;
  const buyerTaxPortion = daysOwnedByBuyer * dailyTaxRate;

  // Calculate interest portions if applicable
  const sellerInterestPortion = includeInterest ? (interestAmount || 0) * (daysOwnedBySeller / daysInTaxYear) : 0;
  const buyerInterestPortion = includeInterest ? (interestAmount || 0) * (daysOwnedByBuyer / daysInTaxYear) : 0;

  // Calculate total responsibilities
  const totalSellerResponsibility = sellerTaxPortion + sellerInterestPortion;
  const totalBuyerResponsibility = buyerTaxPortion + buyerInterestPortion;

  // Calculate adjustment amount (positive = seller pays buyer, negative = buyer pays seller)
  let adjustmentAmount = 0;
  if (buyerPaysClosingCosts) {
    // Buyer pays all closing costs, so seller gets credit for buyer's portion
    adjustmentAmount = -(buyerTaxPortion + buyerInterestPortion);
  } else {
    // Standard proration - seller pays their portion, buyer pays theirs
    adjustmentAmount = sellerTaxPortion + sellerInterestPortion;
  }

  // Proration date is typically the closing date
  const prorationDate = closingDate;

  return {
    daysInTaxYear,
    daysOwnedBySeller,
    daysOwnedByBuyer,
    sellerTaxPortion,
    buyerTaxPortion,
    dailyTaxRate,
    sellerInterestPortion,
    buyerInterestPortion,
    totalSellerResponsibility,
    totalBuyerResponsibility,
    prorationDate,
    adjustmentAmount
  };
}

export function validatePropertyTaxInputs(inputs: PropertyTaxProrationInputs): string[] {
  const errors: string[] = [];

  if (inputs.annualPropertyTax <= 0) {
    errors.push('Annual property tax must be greater than 0');
  }

  if (inputs.includeInterest && (!inputs.interestAmount || inputs.interestAmount < 0)) {
    errors.push('Interest amount must be provided and greater than or equal to 0 when including interest');
  }

  const taxStart = new Date(inputs.taxYearStart);
  const taxEnd = new Date(inputs.taxYearEnd);
  const closing = new Date(inputs.closingDate);

  if (taxEnd <= taxStart) {
    errors.push('Tax year end must be after tax year start');
  }

  if (closing < taxStart || closing > taxEnd) {
    errors.push('Closing date must be within the tax year');
  }

  return errors;
}