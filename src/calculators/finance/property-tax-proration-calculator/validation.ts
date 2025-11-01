import { PropertyTaxProrationInputs } from './types';

export function validatePropertyTaxProrationInputs(inputs: PropertyTaxProrationInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Sale price validation
  if (!inputs.salePrice || inputs.salePrice <= 0) {
    errors.push({ field: 'salePrice', message: 'Sale price must be greater than 0' });
  }
  if (inputs.salePrice && inputs.salePrice > 100000000) {
    errors.push({ field: 'salePrice', message: 'Sale price cannot exceed $100,000,000' });
  }

  // Closing date validation
  if (!inputs.closingDate) {
    errors.push({ field: 'closingDate', message: 'Closing date is required' });
  } else {
    const closingDate = new Date(inputs.closingDate);
    const currentDate = new Date();
    if (closingDate > currentDate) {
      // Allow future dates for planning purposes
    }
  }

  // Tax year validation
  if (!inputs.taxYearStart) {
    errors.push({ field: 'taxYearStart', message: 'Tax year start date is required' });
  }
  if (!inputs.taxYearEnd) {
    errors.push({ field: 'taxYearEnd', message: 'Tax year end date is required' });
  }
  if (inputs.taxYearStart && inputs.taxYearEnd) {
    const startDate = new Date(inputs.taxYearStart);
    const endDate = new Date(inputs.taxYearEnd);
    if (endDate <= startDate) {
      errors.push({ field: 'taxYearEnd', message: 'Tax year end must be after tax year start' });
    }
  }

  // Tax amount validation
  if (!inputs.annualPropertyTax || inputs.annualPropertyTax < 0) {
    errors.push({ field: 'annualPropertyTax', message: 'Annual property tax must be 0 or greater' });
  }

  // Tax rate validation
  if (inputs.taxRate && inputs.taxRate < 0) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be 0 or greater' });
  }
  if (inputs.taxRate && inputs.taxRate > 20) {
    errors.push({ field: 'taxRate', message: 'Tax rate cannot exceed 20%' });
  }

  // Assessed value validation
  if (inputs.assessedValue && inputs.assessedValue < 0) {
    errors.push({ field: 'assessedValue', message: 'Assessed value cannot be negative' });
  }

  // Party information validation
  if (!inputs.buyerName.trim()) {
    errors.push({ field: 'buyerName', message: 'Buyer name is required' });
  }
  if (!inputs.sellerName.trim()) {
    errors.push({ field: 'sellerName', message: 'Seller name is required' });
  }

  // Property address validation
  if (!inputs.propertyAddress.trim()) {
    errors.push({ field: 'propertyAddress', message: 'Property address is required' });
  }
  if (!inputs.city.trim()) {
    errors.push({ field: 'city', message: 'City is required' });
  }
  if (!inputs.state.trim()) {
    errors.push({ field: 'state', message: 'State is required' });
  }

  // Special assessments and overrides validation
  if (inputs.specialAssessments < 0) {
    errors.push({ field: 'specialAssessments', message: 'Special assessments cannot be negative' });
  }
  if (inputs.taxOverrides < 0) {
    errors.push({ field: 'taxOverrides', message: 'Tax overrides cannot be negative' });
  }

  // Additional fees validation
  if (inputs.escrowFees < 0) {
    errors.push({ field: 'escrowFees', message: 'Escrow fees cannot be negative' });
  }
  if (inputs.titleFees < 0) {
    errors.push({ field: 'titleFees', message: 'Title fees cannot be negative' });
  }
  if (inputs.recordingFees < 0) {
    errors.push({ field: 'recordingFees', message: 'Recording fees cannot be negative' });
  }

  // Historical data validation
  if (inputs.previousYearTax < 0) {
    errors.push({ field: 'previousYearTax', message: 'Previous year tax cannot be negative' });
  }
  if (inputs.taxIncreasePercentage < -50 || inputs.taxIncreasePercentage > 100) {
    errors.push({ field: 'taxIncreasePercentage', message: 'Tax increase percentage must be between -50% and 100%' });
  }

  // Payment history validation
  if (inputs.lastTaxPaymentAmount < 0) {
    errors.push({ field: 'lastTaxPaymentAmount', message: 'Last tax payment amount cannot be negative' });
  }

  // Appeal validation
  if (inputs.appealFiled && !inputs.appealFiledDate) {
    errors.push({ field: 'appealFiledDate', message: 'Appeal filed date is required when appeal is filed' });
  }
  if (inputs.appealFiled && inputs.appraisedValueAppeal && inputs.appraisedValueAppeal <= 0) {
    errors.push({ field: 'appraisedValueAppeal', message: 'Appeal appraised value must be greater than 0' });
  }
  if (inputs.appealFiled && inputs.assessmentAppeal && inputs.assessmentAppeal <= 0) {
    errors.push({ field: 'assessmentAppeal', message: 'Appeal assessment value must be greater than 0' });
  }

  // Closing adjustment validation
  if (inputs.closingAdjustmentDays < 0) {
    errors.push({ field: 'closingAdjustmentDays', message: 'Closing adjustment days cannot be negative' });
  }

  return errors;
}

export function validatePropertyTaxProrationBusinessRules(inputs: PropertyTaxProrationInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Closing date within tax year validation
  if (inputs.closingDate && inputs.taxYearStart && inputs.taxYearEnd) {
    const closingDate = new Date(inputs.closingDate);
    const taxYearStart = new Date(inputs.taxYearStart);
    const taxYearEnd = new Date(inputs.taxYearEnd);

    if (closingDate < taxYearStart || closingDate > taxYearEnd) {
      warnings.push({ field: 'closingDate', message: 'Closing date should be within the tax year for accurate proration' });
    }
  }

  // Tax amount consistency check
  if (inputs.annualPropertyTax && inputs.assessedValue && inputs.taxRate) {
    const calculatedTax = inputs.assessedValue * (inputs.taxRate / 100);
    const difference = Math.abs(inputs.annualPropertyTax - calculatedTax);
    const tolerance = inputs.annualPropertyTax * 0.1; // 10% tolerance

    if (difference > tolerance) {
      warnings.push({ field: 'annualPropertyTax', message: 'Tax amount may not match assessed value and tax rate calculation' });
    }
  }

  // Proration method appropriateness
  if (inputs.prorationMethod === 'Actual Days' && (!inputs.taxYearStart || !inputs.taxYearEnd)) {
    warnings.push({ field: 'prorationMethod', message: 'Actual days method requires tax year start and end dates' });
  }

  // State-specific warnings
  switch (inputs.state.toUpperCase()) {
    case 'CA':
      if (inputs.prorationMethod !== 'Actual Days') {
        warnings.push({ field: 'prorationMethod', message: 'California typically uses actual days proration method' });
      }
      break;
    case 'TX':
      if (!inputs.buyerPaysProratedTax) {
        warnings.push({ field: 'buyerPaysProratedTax', message: 'Texas sellers may prefer to pay prorated taxes' });
      }
      break;
    case 'FL':
      if (inputs.prorationMethod !== 'Actual Days') {
        warnings.push({ field: 'prorationMethod', message: 'Florida typically requires actual days proration' });
      }
      break;
  }

  // Tax payment timing warnings
  if (inputs.lastTaxPaymentDate && inputs.closingDate) {
    const lastPayment = new Date(inputs.lastTaxPaymentDate);
    const closing = new Date(inputs.closingDate);
    const daysSincePayment = (closing.getTime() - lastPayment.getTime()) / (1000 * 3600 * 24);

    if (daysSincePayment > 365) {
      warnings.push({ field: 'lastTaxPaymentDate', message: 'Last tax payment is more than a year old - verify current status' });
    }
  }

  // Escrow considerations
  if (inputs.annualPropertyTax > 0 && inputs.escrowFees === 0) {
    warnings.push({ field: 'escrowFees', message: 'Consider escrow requirements for tax payments' });
  }

  // Special assessments warnings
  if (inputs.specialAssessments > inputs.annualPropertyTax * 0.2) {
    warnings.push({ field: 'specialAssessments', message: 'Special assessments are unusually high - verify amounts' });
  }

  // Tax increase warnings
  if (inputs.taxIncreasePercentage > 10) {
    warnings.push({ field: 'taxIncreasePercentage', message: 'High tax increase may affect proration calculations' });
  }

  // Appeal impact warnings
  if (inputs.appealFiled && inputs.appraisedValueAppeal && inputs.assessedValue) {
    const reduction = ((inputs.assessedValue - inputs.appraisedValueAppeal) / inputs.assessedValue) * 100;
    if (reduction > 20) {
      warnings.push({ field: 'appraisedValueAppeal', message: 'Large assessment reduction may affect closing negotiations' });
    }
  }

  // Seller credit warnings
  if (inputs.sellerCreditsTax && inputs.buyerPaysProratedTax) {
    warnings.push({ field: 'sellerCreditsTax', message: 'Seller tax credits may conflict with buyer payment responsibility' });
  }

  // Property type considerations
  if (inputs.propertyType === 'Commercial' && inputs.prorationMethod === 'Semi-Annual') {
    warnings.push({ field: 'prorationMethod', message: 'Commercial properties may require more precise proration methods' });
  }

  // Historical tax comparison
  if (inputs.previousYearTax && inputs.annualPropertyTax) {
    const change = ((inputs.annualPropertyTax - inputs.previousYearTax) / inputs.previousYearTax) * 100;
    if (Math.abs(change) > 15) {
      warnings.push({ field: 'annualPropertyTax', message: 'Tax amount changed significantly from previous year' });
    }
  }

  // Closing adjustment period warnings
  if (inputs.adjustmentPeriodStart && inputs.adjustmentPeriodEnd) {
    const start = new Date(inputs.adjustmentPeriodStart);
    const end = new Date(inputs.adjustmentPeriodEnd);
    const days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);

    if (days > 90) {
      warnings.push({ field: 'adjustmentPeriodEnd', message: 'Long adjustment period may complicate proration' });
    }
  }

  return warnings;
}