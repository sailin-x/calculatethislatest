import { CalculatorInputs } from '../../../types/calculator';

export function validatePropertyValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Property value is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 10000 || value > 10000000) return { isValid: false, message: 'Must be between $10,000 and $10,000,000' };
  return { isValid: true };
}

export function validateLoanAmount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Loan amount is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 1000 || value > 10000000) return { isValid: false, message: 'Must be between $1,000 and $10,000,000' };
  return { isValid: true };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 5000000) return { isValid: false, message: 'Must be $5,000,000 or less' };
  return { isValid: true };
}

export function validateMaxLtvRatio(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value !== undefined && (value < 50 || value > 100)) return { isValid: false, message: 'Must be between 50% and 100%' };
  return { isValid: true };
}

export function validateCreditScore(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value !== undefined && (value < 300 || value > 850)) return { isValid: false, message: 'Must be between 300 and 850' };
  return { isValid: true };
}

export function validateDebtToIncomeRatio(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 100) return { isValid: false, message: 'Must be 100% or less' };
  return { isValid: true };
}

export function validatePropertyAge(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value !== undefined && value > 200) return { isValid: false, message: 'Must be 200 years or less' };
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Single Family', 'Multi-Family', 'Condo', 'Townhouse', 'Commercial', 'Investment', 'Vacation Home', 'Manufactured Home', 'Land', 'Mixed-Use'].includes(value)) {
    return { isValid: false, message: 'Invalid property type' };
  }
  return { isValid: true };
}

export function validateOccupancyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Primary Residence', 'Secondary Home', 'Investment Property', 'Vacation Rental', 'Commercial Use'].includes(value)) {
    return { isValid: false, message: 'Invalid occupancy type' };
  }
  return { isValid: true };
}

export function validateLoanType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'Portfolio', 'Hard Money', 'Bridge Loan', 'Construction Loan', 'HELOC'].includes(value)) {
    return { isValid: false, message: 'Invalid loan type' };
  }
  return { isValid: true };
}

export function validateLoanPurpose(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Purchase', 'Refinance', 'Cash-Out Refinance', 'Construction', 'Renovation', 'Investment', 'Bridge Financing'].includes(value)) {
    return { isValid: false, message: 'Invalid loan purpose' };
  }
  return { isValid: true };
}

export function validatePropertyLocation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Urban', 'Suburban', 'Rural', 'Downtown', 'Residential Area', 'Commercial District', 'Industrial Zone', 'Coastal', 'Mountain', 'Desert'].includes(value)) {
    return { isValid: false, message: 'Invalid property location' };
  }
  return { isValid: true };
}

export function validateMarketCondition(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Strong', 'Stable', 'Weak', 'Recovering', 'Declining', 'Volatile'].includes(value)) {
    return { isValid: false, message: 'Invalid market condition' };
  }
  return { isValid: true };
}

export function validateLenderType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Commercial Bank', 'Credit Union', 'Mortgage Banker', 'Mortgage Broker', 'Private Lender', 'Hard Money Lender', 'Government Agency', 'Regional Bank', 'National Bank', 'Online Lender'].includes(value)) {
    return { isValid: false, message: 'Invalid lender type' };
  }
  return { isValid: true };
}

export function validateAppraisalType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Full Appraisal', 'Drive-By Appraisal', 'Desktop Appraisal', 'Automated Valuation Model (AVM)', 'Broker Price Opinion (BPO)', 'No Appraisal Required'].includes(value)) {
    return { isValid: false, message: 'Invalid appraisal type' };
  }
  return { isValid: true };
}

export function validatePropertyCondition(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Excellent', 'Good', 'Fair', 'Poor', 'Needs Renovation', 'New Construction'].includes(value)) {
    return { isValid: false, message: 'Invalid property condition' };
  }
  return { isValid: true };
}

export function validateZoningRestrictions(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['None', 'Minor', 'Moderate', 'Significant', 'Non-Conforming Use', 'Pending Zoning Change'].includes(value)) {
    return { isValid: false, message: 'Invalid zoning restrictions' };
  }
  return { isValid: true };
}

export function validateEnvironmentalIssues(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['None', 'Minor', 'Moderate', 'Significant', 'Unknown', 'Remediation Required'].includes(value)) {
    return { isValid: false, message: 'Invalid environmental issues' };
  }
  return { isValid: true };
}

export function validateTitleIssues(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Clear Title', 'Minor Issues', 'Moderate Issues', 'Significant Issues', 'Clouded Title', 'Pending Resolution'].includes(value)) {
    return { isValid: false, message: 'Invalid title issues' };
  }
  return { isValid: true };
}

export function validateInsuranceRequired(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['Standard', 'Flood Insurance Required', 'Earthquake Insurance Required', 'Wind Insurance Required', 'Additional Coverage Required', 'No Insurance Required'].includes(value)) {
    return { isValid: false, message: 'Invalid insurance required' };
  }
  return { isValid: true };
}

export function validateAllLoanToValueRatioInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const propertyValueResult = validatePropertyValue(inputs.propertyValue);
  if (!propertyValueResult.isValid) errors.push(propertyValueResult.message!);

  const loanAmountResult = validateLoanAmount(inputs.loanAmount);
  if (!loanAmountResult.isValid) errors.push(loanAmountResult.message!);

  const downPaymentResult = validateDownPayment(inputs.downPayment);
  if (!downPaymentResult.isValid) errors.push(downPaymentResult.message!);

  const maxLtvRatioResult = validateMaxLtvRatio(inputs.maxLtvRatio);
  if (!maxLtvRatioResult.isValid) errors.push(maxLtvRatioResult.message!);

  const creditScoreResult = validateCreditScore(inputs.creditScore);
  if (!creditScoreResult.isValid) errors.push(creditScoreResult.message!);

  const debtToIncomeRatioResult = validateDebtToIncomeRatio(inputs.debtToIncomeRatio);
  if (!debtToIncomeRatioResult.isValid) errors.push(debtToIncomeRatioResult.message!);

  const propertyAgeResult = validatePropertyAge(inputs.propertyAge);
  if (!propertyAgeResult.isValid) errors.push(propertyAgeResult.message!);

  const propertyTypeResult = validatePropertyType(inputs.propertyType);
  if (!propertyTypeResult.isValid) errors.push(propertyTypeResult.message!);

  const occupancyTypeResult = validateOccupancyType(inputs.occupancyType);
  if (!occupancyTypeResult.isValid) errors.push(occupancyTypeResult.message!);

  const loanTypeResult = validateLoanType(inputs.loanType);
  if (!loanTypeResult.isValid) errors.push(loanTypeResult.message!);

  const loanPurposeResult = validateLoanPurpose(inputs.loanPurpose);
  if (!loanPurposeResult.isValid) errors.push(loanPurposeResult.message!);

  const propertyLocationResult = validatePropertyLocation(inputs.propertyLocation);
  if (!propertyLocationResult.isValid) errors.push(propertyLocationResult.message!);

  const marketConditionResult = validateMarketCondition(inputs.marketCondition);
  if (!marketConditionResult.isValid) errors.push(marketConditionResult.message!);

  const lenderTypeResult = validateLenderType(inputs.lenderType);
  if (!lenderTypeResult.isValid) errors.push(lenderTypeResult.message!);

  const appraisalTypeResult = validateAppraisalType(inputs.appraisalType);
  if (!appraisalTypeResult.isValid) errors.push(appraisalTypeResult.message!);

  const propertyConditionResult = validatePropertyCondition(inputs.propertyCondition);
  if (!propertyConditionResult.isValid) errors.push(propertyConditionResult.message!);

  const zoningRestrictionsResult = validateZoningRestrictions(inputs.zoningRestrictions);
  if (!zoningRestrictionsResult.isValid) errors.push(zoningRestrictionsResult.message!);

  const environmentalIssuesResult = validateEnvironmentalIssues(inputs.environmentalIssues);
  if (!environmentalIssuesResult.isValid) errors.push(environmentalIssuesResult.message!);

  const titleIssuesResult = validateTitleIssues(inputs.titleIssues);
  if (!titleIssuesResult.isValid) errors.push(titleIssuesResult.message!);

  const insuranceRequiredResult = validateInsuranceRequired(inputs.insuranceRequired);
  if (!insuranceRequiredResult.isValid) errors.push(insuranceRequiredResult.message!);

  return {
    isValid: errors.length === 0,
    errors
  };
}
