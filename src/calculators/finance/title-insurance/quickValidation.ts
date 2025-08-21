import { CalculatorInputs } from '../../../types/calculator';

// Individual field validation functions
export function validatePropertyValue(value: number): string | null {
  if (!value) return 'Property value is required';
  if (value < 0) return 'Property value cannot be negative';
  if (value > 10000000) return 'Property value cannot exceed $10,000,000';
  return null;
}

export function validateTransactionType(value: string): string | null {
  if (!value) return 'Transaction type is required';
  if (!['purchase', 'refinance', 'construction', 'equity-line'].includes(value)) {
    return 'Transaction type must be one of: purchase, refinance, construction, equity-line';
  }
  return null;
}

export function validateCoverageType(value: string): string | null {
  if (!value) return 'Coverage type is required';
  if (!['owners-policy', 'lenders-policy', 'both'].includes(value)) {
    return 'Coverage type must be one of: owners-policy, lenders-policy, both';
  }
  return null;
}

export function validatePurchasePrice(value: number): string | null {
  if (value < 0) return 'Purchase price cannot be negative';
  if (value > 10000000) return 'Purchase price cannot exceed $10,000,000';
  return null;
}

export function validateLoanAmount(value: number): string | null {
  if (value < 0) return 'Loan amount cannot be negative';
  if (value > 10000000) return 'Loan amount cannot exceed $10,000,000';
  return null;
}

export function validatePropertyType(value: string): string | null {
  if (value && !['single-family', 'condo', 'townhouse', 'multi-family', 'commercial', 'land'].includes(value)) {
    return 'Property type must be one of: single-family, condo, townhouse, multi-family, commercial, land';
  }
  return null;
}

export function validatePropertyAge(value: number): string | null {
  if (value < 0) return 'Property age cannot be negative';
  if (value > 200) return 'Property age cannot exceed 200 years';
  return null;
}

export function validateBuyerType(value: string): string | null {
  if (value && !['individual', 'married-couple', 'trust', 'llc', 'corporation', 'partnership'].includes(value)) {
    return 'Buyer type must be one of: individual, married-couple, trust, llc, corporation, partnership';
  }
  return null;
}

export function validateOccupancyType(value: string): string | null {
  if (value && !['primary-residence', 'secondary-residence', 'investment', 'commercial'].includes(value)) {
    return 'Occupancy type must be one of: primary-residence, secondary-residence, investment, commercial';
  }
  return null;
}

export function validateCoverageAmount(value: number): string | null {
  if (value < 0) return 'Coverage amount cannot be negative';
  if (value > 10000000) return 'Coverage amount cannot exceed $10,000,000';
  return null;
}

export function validateEndorsements(value: string): string | null {
  if (value && !['none', 'survey', 'access', 'zoning', 'condo', 'multiple'].includes(value)) {
    return 'Endorsements must be one of: none, survey, access, zoning, condo, multiple';
  }
  return null;
}

export function validateExtendedCoverage(value: string): string | null {
  if (value && !['none', 'basic', 'enhanced', 'premium'].includes(value)) {
    return 'Extended coverage must be one of: none, basic, enhanced, premium';
  }
  return null;
}

export function validateState(value: string): string | null {
  if (value) {
    const validStates = ['al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga', 'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj', 'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'tn', 'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy'];
    if (!validStates.includes(value)) {
      return 'Invalid state selection';
    }
  }
  return null;
}

export function validateMarketType(value: string): string | null {
  if (value && !['urban', 'suburban', 'rural', 'resort'].includes(value)) {
    return 'Market type must be one of: urban, suburban, rural, resort';
  }
  return null;
}

export function validateTitleSearchDepth(value: string): string | null {
  if (value && !['standard', 'extended', 'comprehensive'].includes(value)) {
    return 'Title search depth must be one of: standard, extended, comprehensive';
  }
  return null;
}

export function validateKnownIssues(value: string): string | null {
  if (value && !['none', 'easements', 'liens', 'encroachments', 'boundary-disputes', 'multiple'].includes(value)) {
    return 'Known issues must be one of: none, easements, liens, encroachments, boundary-disputes, multiple';
  }
  return null;
}

export function validatePreviousClaims(value: string): string | null {
  if (value && !['none', 'one', 'multiple'].includes(value)) {
    return 'Previous claims must be one of: none, one, multiple';
  }
  return null;
}

export function validateChainOfTitle(value: string): string | null {
  if (value && !['simple', 'moderate', 'complex', 'very-complex'].includes(value)) {
    return 'Chain of title must be one of: simple, moderate, complex, very-complex';
  }
  return null;
}

export function validateSurveyRequired(value: string): string | null {
  if (value && !['no', 'yes', 'maybe'].includes(value)) {
    return 'Survey required must be one of: no, yes, maybe';
  }
  return null;
}

export function validateAbstractRequired(value: string): string | null {
  if (value && !['no', 'yes', 'maybe'].includes(value)) {
    return 'Abstract required must be one of: no, yes, maybe';
  }
  return null;
}

export function validateEscrowServices(value: string): string | null {
  if (value && !['none', 'basic', 'full', 'custom'].includes(value)) {
    return 'Escrow services must be one of: none, basic, full, custom';
  }
  return null;
}

export function validateClosingCosts(value: number): string | null {
  if (value < 0) return 'Closing costs cannot be negative';
  if (value > 100000) return 'Closing costs cannot exceed $100,000';
  return null;
}

export function validateDiscountRate(value: number): string | null {
  if (value < 0) return 'Discount rate cannot be negative';
  if (value > 15) return 'Discount rate cannot exceed 15%';
  return null;
}

export function validateInflationRate(value: number): string | null {
  if (value < 0) return 'Inflation rate cannot be negative';
  if (value > 10) return 'Inflation rate cannot exceed 10%';
  return null;
}

export function validateAnalysisType(value: string): string | null {
  if (value && !['basic', 'detailed', 'comparison', 'risk-assessment'].includes(value)) {
    return 'Analysis type must be one of: basic, detailed, comparison, risk-assessment';
  }
  return null;
}

// Consolidated validation function
export function validateAllTitleInsuranceInputs(inputs: CalculatorInputs): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  const propertyValueError = validatePropertyValue(inputs.propertyValue);
  if (propertyValueError) errors.push(propertyValueError);

  const transactionTypeError = validateTransactionType(inputs.transactionType);
  if (transactionTypeError) errors.push(transactionTypeError);

  const coverageTypeError = validateCoverageType(inputs.coverageType);
  if (coverageTypeError) errors.push(coverageTypeError);

  // Optional fields
  if (inputs.purchasePrice !== undefined) {
    const purchasePriceError = validatePurchasePrice(inputs.purchasePrice);
    if (purchasePriceError) errors.push(purchasePriceError);
  }

  if (inputs.loanAmount !== undefined) {
    const loanAmountError = validateLoanAmount(inputs.loanAmount);
    if (loanAmountError) errors.push(loanAmountError);
  }

  if (inputs.propertyType !== undefined) {
    const propertyTypeError = validatePropertyType(inputs.propertyType);
    if (propertyTypeError) errors.push(propertyTypeError);
  }

  if (inputs.propertyAge !== undefined) {
    const propertyAgeError = validatePropertyAge(inputs.propertyAge);
    if (propertyAgeError) errors.push(propertyAgeError);
  }

  if (inputs.buyerType !== undefined) {
    const buyerTypeError = validateBuyerType(inputs.buyerType);
    if (buyerTypeError) errors.push(buyerTypeError);
  }

  if (inputs.occupancyType !== undefined) {
    const occupancyTypeError = validateOccupancyType(inputs.occupancyType);
    if (occupancyTypeError) errors.push(occupancyTypeError);
  }

  if (inputs.coverageAmount !== undefined) {
    const coverageAmountError = validateCoverageAmount(inputs.coverageAmount);
    if (coverageAmountError) errors.push(coverageAmountError);
  }

  if (inputs.endorsements !== undefined) {
    const endorsementsError = validateEndorsements(inputs.endorsements);
    if (endorsementsError) errors.push(endorsementsError);
  }

  if (inputs.extendedCoverage !== undefined) {
    const extendedCoverageError = validateExtendedCoverage(inputs.extendedCoverage);
    if (extendedCoverageError) errors.push(extendedCoverageError);
  }

  if (inputs.state !== undefined) {
    const stateError = validateState(inputs.state);
    if (stateError) errors.push(stateError);
  }

  if (inputs.marketType !== undefined) {
    const marketTypeError = validateMarketType(inputs.marketType);
    if (marketTypeError) errors.push(marketTypeError);
  }

  if (inputs.titleSearchDepth !== undefined) {
    const titleSearchDepthError = validateTitleSearchDepth(inputs.titleSearchDepth);
    if (titleSearchDepthError) errors.push(titleSearchDepthError);
  }

  if (inputs.knownIssues !== undefined) {
    const knownIssuesError = validateKnownIssues(inputs.knownIssues);
    if (knownIssuesError) errors.push(knownIssuesError);
  }

  if (inputs.previousClaims !== undefined) {
    const previousClaimsError = validatePreviousClaims(inputs.previousClaims);
    if (previousClaimsError) errors.push(previousClaimsError);
  }

  if (inputs.chainOfTitle !== undefined) {
    const chainOfTitleError = validateChainOfTitle(inputs.chainOfTitle);
    if (chainOfTitleError) errors.push(chainOfTitleError);
  }

  if (inputs.surveyRequired !== undefined) {
    const surveyRequiredError = validateSurveyRequired(inputs.surveyRequired);
    if (surveyRequiredError) errors.push(surveyRequiredError);
  }

  if (inputs.abstractRequired !== undefined) {
    const abstractRequiredError = validateAbstractRequired(inputs.abstractRequired);
    if (abstractRequiredError) errors.push(abstractRequiredError);
  }

  if (inputs.escrowServices !== undefined) {
    const escrowServicesError = validateEscrowServices(inputs.escrowServices);
    if (escrowServicesError) errors.push(escrowServicesError);
  }

  if (inputs.closingCosts !== undefined) {
    const closingCostsError = validateClosingCosts(inputs.closingCosts);
    if (closingCostsError) errors.push(closingCostsError);
  }

  if (inputs.discountRate !== undefined) {
    const discountRateError = validateDiscountRate(inputs.discountRate);
    if (discountRateError) errors.push(discountRateError);
  }

  if (inputs.inflationRate !== undefined) {
    const inflationRateError = validateInflationRate(inputs.inflationRate);
    if (inflationRateError) errors.push(inflationRateError);
  }

  if (inputs.analysisType !== undefined) {
    const analysisTypeError = validateAnalysisType(inputs.analysisType);
    if (analysisTypeError) errors.push(analysisTypeError);
  }

  // Logical validation warnings
  if (inputs.propertyValue && inputs.purchasePrice) {
    if (inputs.purchasePrice > inputs.propertyValue * 1.2) {
      warnings.push('Purchase price significantly exceeds property value');
    }
  }

  if (inputs.loanAmount && inputs.propertyValue) {
    if (inputs.loanAmount > inputs.propertyValue) {
      warnings.push('Loan amount exceeds property value');
    }
  }

  if (inputs.coverageAmount && inputs.propertyValue) {
    if (inputs.coverageAmount < inputs.propertyValue * 0.5) {
      warnings.push('Coverage amount may be insufficient relative to property value');
    }
  }

  if (inputs.propertyAge && inputs.propertyAge > 100) {
    warnings.push('Very old property may have complex title history and higher risk');
  }

  if (inputs.knownIssues && inputs.knownIssues !== 'none') {
    warnings.push('Known title issues may affect insurability and increase costs');
  }

  if (inputs.previousClaims && inputs.previousClaims !== 'none') {
    warnings.push('Previous claims may indicate ongoing title issues');
  }

  if (inputs.chainOfTitle && (inputs.chainOfTitle === 'complex' || inputs.chainOfTitle === 'very-complex')) {
    warnings.push('Complex chain of title increases risk and may require additional search');
  }

  if (inputs.propertyType === 'commercial' || inputs.propertyType === 'multi-family') {
    warnings.push('Commercial properties typically have higher title insurance costs');
  }

  if (inputs.state === 'ca' || inputs.state === 'ny') {
    warnings.push('California and New York typically have higher title insurance rates');
  }

  if (inputs.endorsements === 'multiple') {
    warnings.push('Multiple endorsements will increase total costs');
  }

  if (inputs.extendedCoverage === 'premium') {
    warnings.push('Premium extended coverage significantly increases costs');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
