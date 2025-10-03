import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateTitleInsuranceInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  if (!inputs.propertyValue) {
    errors.push('Property value is required');
  } else {
    if (inputs.propertyValue < 0) {
      errors.push('Property value cannot be negative');
    } else if (inputs.propertyValue > 10000000) {
      errors.push('Property value cannot exceed $10,000,000');
    }
  }

  if (!inputs.transactionType) {
    errors.push('Transaction type is required');
  } else {
    const validTypes = ['purchase', 'refinance', 'construction', 'equity-line'];
    if (!validTypes.includes(inputs.transactionType)) {
      errors.push('Transaction type must be one of: purchase, refinance, construction, equity-line');
    }
  }

  if (!inputs.coverageType) {
    errors.push('Coverage type is required');
  } else {
    const validTypes = ['owners-policy', 'lenders-policy', 'both'];
    if (!validTypes.includes(inputs.coverageType)) {
      errors.push('Coverage type must be one of: owners-policy, lenders-policy, both');
    }
  }

  // Optional field validations
  if (inputs.purchasePrice !== undefined) {
    if (inputs.purchasePrice < 0) {
      errors.push('Purchase price cannot be negative');
    } else if (inputs.purchasePrice > 10000000) {
      errors.push('Purchase price cannot exceed $10,000,000');
    }
  }

  if (inputs.loanAmount !== undefined) {
    if (inputs.loanAmount < 0) {
      errors.push('Loan amount cannot be negative');
    } else if (inputs.loanAmount > 10000000) {
      errors.push('Loan amount cannot exceed $10,000,000');
    }
  }

  if (inputs.propertyType !== undefined) {
    const validTypes = ['single-family', 'condo', 'townhouse', 'multi-family', 'commercial', 'land'];
    if (!validTypes.includes(inputs.propertyType)) {
      errors.push('Property type must be one of: single-family, condo, townhouse, multi-family, commercial, land');
    }
  }

  if (inputs.propertyAge !== undefined) {
    if (inputs.propertyAge < 0) {
      errors.push('Property age cannot be negative');
    } else if (inputs.propertyAge > 200) {
      errors.push('Property age cannot exceed 200 years');
    }
  }

  if (inputs.buyerType !== undefined) {
    const validTypes = ['individual', 'married-couple', 'trust', 'llc', 'corporation', 'partnership'];
    if (!validTypes.includes(inputs.buyerType)) {
      errors.push('Buyer type must be one of: individual, married-couple, trust, llc, corporation, partnership');
    }
  }

  if (inputs.occupancyType !== undefined) {
    const validTypes = ['primary-residence', 'secondary-residence', 'investment', 'commercial'];
    if (!validTypes.includes(inputs.occupancyType)) {
      errors.push('Occupancy type must be one of: primary-residence, secondary-residence, investment, commercial');
    }
  }

  if (inputs.coverageAmount !== undefined) {
    if (inputs.coverageAmount < 0) {
      errors.push('Coverage amount cannot be negative');
    } else if (inputs.coverageAmount > 10000000) {
      errors.push('Coverage amount cannot exceed $10,000,000');
    }
  }

  if (inputs.endorsements !== undefined) {
    const validEndorsements = ['none', 'survey', 'access', 'zoning', 'condo', 'multiple'];
    if (!validEndorsements.includes(inputs.endorsements)) {
      errors.push('Endorsements must be one of: none, survey, access, zoning, condo, multiple');
    }
  }

  if (inputs.extendedCoverage !== undefined) {
    const validCoverage = ['none', 'basic', 'enhanced', 'premium'];
    if (!validCoverage.includes(inputs.extendedCoverage)) {
      errors.push('Extended coverage must be one of: none, basic, enhanced, premium');
    }
  }

  if (inputs.state !== undefined) {
    const validStates = ['al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga', 'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj', 'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'tn', 'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy'];
    if (!validStates.includes(inputs.state)) {
      errors.push('Invalid state selection');
    }
  }

  if (inputs.marketType !== undefined) {
    const validTypes = ['urban', 'suburban', 'rural', 'resort'];
    if (!validTypes.includes(inputs.marketType)) {
      errors.push('Market type must be one of: urban, suburban, rural, resort');
    }
  }

  if (inputs.titleSearchDepth !== undefined) {
    const validDepths = ['standard', 'extended', 'comprehensive'];
    if (!validDepths.includes(inputs.titleSearchDepth)) {
      errors.push('Title search depth must be one of: standard, extended, comprehensive');
    }
  }

  if (inputs.knownIssues !== undefined) {
    const validIssues = ['none', 'easements', 'liens', 'encroachments', 'boundary-disputes', 'multiple'];
    if (!validIssues.includes(inputs.knownIssues)) {
      errors.push('Known issues must be one of: none, easements, liens, encroachments, boundary-disputes, multiple');
    }
  }

  if (inputs.previousClaims !== undefined) {
    const validClaims = ['none', 'one', 'multiple'];
    if (!validClaims.includes(inputs.previousClaims)) {
      errors.push('Previous claims must be one of: none, one, multiple');
    }
  }

  if (inputs.chainOfTitle !== undefined) {
    const validChain = ['simple', 'moderate', 'complex', 'very-complex'];
    if (!validChain.includes(inputs.chainOfTitle)) {
      errors.push('Chain of title must be one of: simple, moderate, complex, very-complex');
    }
  }

  if (inputs.surveyRequired !== undefined) {
    const validSurvey = ['no', 'yes', 'maybe'];
    if (!validSurvey.includes(inputs.surveyRequired)) {
      errors.push('Survey required must be one of: no, yes, maybe');
    }
  }

  if (inputs.abstractRequired !== undefined) {
    const validAbstract = ['no', 'yes', 'maybe'];
    if (!validAbstract.includes(inputs.abstractRequired)) {
      errors.push('Abstract required must be one of: no, yes, maybe');
    }
  }

  if (inputs.escrowServices !== undefined) {
    const validEscrow = ['none', 'basic', 'full', 'custom'];
    if (!validEscrow.includes(inputs.escrowServices)) {
      errors.push('Escrow services must be one of: none, basic, full, custom');
    }
  }

  if (inputs.closingCosts !== undefined) {
    if (inputs.closingCosts < 0) {
      errors.push('Closing costs cannot be negative');
    } else if (inputs.closingCosts > 100000) {
      errors.push('Closing costs cannot exceed $100,000');
    }
  }

  if (inputs.discountRate !== undefined) {
    if (inputs.discountRate < 0) {
      errors.push('Discount rate cannot be negative');
    } else if (inputs.discountRate > 15) {
      errors.push('Discount rate cannot exceed 15%');
    }
  }

  if (inputs.inflationRate !== undefined) {
    if (inputs.inflationRate < 0) {
      errors.push('Inflation rate cannot be negative');
    } else if (inputs.inflationRate > 10) {
      errors.push('Inflation rate cannot exceed 10%');
    }
  }

  if (inputs.analysisType !== undefined) {
    const validTypes = ['basic', 'detailed', 'comparison', 'risk-assessment'];
    if (!validTypes.includes(inputs.analysisType)) {
      errors.push('Analysis type must be one of: basic, detailed, comparison, risk-assessment');
    }
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
