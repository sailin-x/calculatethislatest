import { MortgageAPRComparisonInputs, MortgageOffer } from './formulas';

export interface QuickValidationResult {
  isValid: boolean;
  message?: string;
  severity: 'error' | 'warning' | 'info';
}

export function quickValidateLoanAmount(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan amount must be greater than 0', severity: 'error' };
  }
  if (value < 10000) {
    return { isValid: false, message: 'Loan amount should be at least $10,000', severity: 'warning' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Loan amount should not exceed $10,000,000', severity: 'warning' };
  }
  if (value > 766550) {
    return { isValid: true, message: 'Loan amount exceeds conventional limits - may require jumbo loan', severity: 'info' };
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidateLoanTerm(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan term must be greater than 0', severity: 'error' };
  }
  if (value < 1) {
    return { isValid: false, message: 'Loan term should be at least 1 year', severity: 'warning' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Loan term should not exceed 50 years', severity: 'warning' };
  }
  if (value > 30) {
    return { isValid: true, message: 'Extended loan term will increase total interest paid', severity: 'info' };
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidatePropertyValue(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0', severity: 'error' };
  }
  if (value < 10000) {
    return { isValid: false, message: 'Property value should be at least $10,000', severity: 'warning' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Property value should not exceed $10,000,000', severity: 'warning' };
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidateDownPayment(value: number, loanAmount?: number, propertyValue?: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Down payment cannot be negative', severity: 'error' };
  }
  if (loanAmount && value >= loanAmount) {
    return { isValid: false, message: 'Down payment cannot be greater than or equal to loan amount', severity: 'error' };
  }
  if (propertyValue && value > propertyValue) {
    return { isValid: false, message: 'Down payment cannot exceed property value', severity: 'error' };
  }
  if (propertyValue && loanAmount) {
    const ltvRatio = ((loanAmount - value) / propertyValue) * 100;
    if (ltvRatio > 100) {
      return { isValid: false, message: 'Loan-to-value ratio cannot exceed 100%', severity: 'error' };
    }
    if (ltvRatio > 80) {
      return { isValid: true, message: 'LTV > 80% may require PMI', severity: 'warning' };
    }
    if (ltvRatio < 20) {
      return { isValid: true, message: 'Large down payment reduces monthly payments and interest', severity: 'info' };
    }
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidatePropertyTax(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Property tax cannot be negative', severity: 'error' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Property tax should not exceed $100,000', severity: 'warning' };
  }
  if (value > 20000) {
    return { isValid: true, message: 'High property tax area - consider tax implications', severity: 'info' };
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidateHomeInsurance(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Home insurance cannot be negative', severity: 'error' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Home insurance should not exceed $10,000', severity: 'warning' };
  }
  if (value > 3000) {
    return { isValid: true, message: 'High insurance cost - consider shopping around', severity: 'info' };
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidatePMIRate(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'PMI rate cannot be negative', severity: 'error' };
  }
  if (value > 5) {
    return { isValid: false, message: 'PMI rate should not exceed 5%', severity: 'warning' };
  }
  if (value > 1) {
    return { isValid: true, message: 'High PMI rate - consider larger down payment', severity: 'warning' };
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidateHOAFees(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'HOA fees cannot be negative', severity: 'error' };
  }
  if (value > 2000) {
    return { isValid: false, message: 'HOA fees should not exceed $2,000', severity: 'warning' };
  }
  if (value > 500) {
    return { isValid: true, message: 'High HOA fees - factor into total monthly cost', severity: 'info' };
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidateCreditScore(value: number): QuickValidationResult {
  if (!value || value < 300) {
    return { isValid: false, message: 'Credit score must be at least 300', severity: 'error' };
  }
  if (value > 850) {
    return { isValid: false, message: 'Credit score cannot exceed 850', severity: 'error' };
  }
  if (value < 580) {
    return { isValid: false, message: 'Credit score below 580 may limit loan options', severity: 'warning' };
  }
  if (value < 620) {
    return { isValid: true, message: 'Fair credit - may qualify for FHA loans', severity: 'warning' };
  }
  if (value < 700) {
    return { isValid: true, message: 'Good credit - may qualify for conventional loans', severity: 'info' };
  }
  if (value >= 740) {
    return { isValid: true, message: 'Excellent credit - qualifies for best rates', severity: 'info' };
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidateDebtToIncomeRatio(value: number): QuickValidationResult {
  if (!value || value < 0) {
    return { isValid: false, message: 'Debt-to-income ratio must be at least 0%', severity: 'error' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Debt-to-income ratio cannot exceed 100%', severity: 'error' };
  }
  if (value > 50) {
    return { isValid: false, message: 'DTI > 50% may disqualify from most loans', severity: 'warning' };
  }
  if (value > 43) {
    return { isValid: true, message: 'DTI > 43% may limit loan options', severity: 'warning' };
  }
  if (value > 36) {
    return { isValid: true, message: 'DTI > 36% - consider debt reduction', severity: 'info' };
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidateComparisonPeriod(value: number, loanTerm?: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Comparison period must be greater than 0', severity: 'error' };
  }
  if (value < 1) {
    return { isValid: false, message: 'Comparison period should be at least 1 year', severity: 'warning' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Comparison period should not exceed 50 years', severity: 'warning' };
  }
  if (loanTerm && value > loanTerm) {
    return { isValid: true, message: 'Comparison period exceeds loan term - will use loan term', severity: 'info' };
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidateLenderFees(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Lender fees cannot be negative', severity: 'error' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Lender fees should not exceed $10,000', severity: 'warning' };
  }
  if (value > 3000) {
    return { isValid: true, message: 'High lender fees - consider negotiating or shopping around', severity: 'info' };
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidateThirdPartyFees(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Third-party fees cannot be negative', severity: 'error' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Third-party fees should not exceed $10,000', severity: 'warning' };
  }
  if (value > 3000) {
    return { isValid: true, message: 'High third-party fees - review for unnecessary charges', severity: 'info' };
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidatePrepaidItems(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Prepaid items cannot be negative', severity: 'error' };
  }
  if (value > 20000) {
    return { isValid: false, message: 'Prepaid items should not exceed $20,000', severity: 'warning' };
  }
  if (value > 5000) {
    return { isValid: true, message: 'High prepaid items - includes escrow deposits', severity: 'info' };
  }
  return { isValid: true, severity: 'info' };
}

export function quickValidateMortgageOffer(offer: Partial<MortgageOffer>, index: number): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];

  // Validate lender name
  if (offer.lender !== undefined) {
    if (!offer.lender.trim()) {
      results.push({ isValid: false, message: `Lender name is required for offer ${index + 1}`, severity: 'error' });
    } else if (offer.lender.length < 2) {
      results.push({ isValid: false, message: `Lender name should be at least 2 characters for offer ${index + 1}`, severity: 'warning' });
    } else {
      results.push({ isValid: true, severity: 'info' });
    }
  }

  // Validate interest rate
  if (offer.interestRate !== undefined) {
    if (offer.interestRate <= 0) {
      results.push({ isValid: false, message: `Interest rate must be positive for offer ${index + 1}`, severity: 'error' });
    } else if (offer.interestRate < 0.1) {
      results.push({ isValid: false, message: `Interest rate should be at least 0.1% for offer ${index + 1}`, severity: 'warning' });
    } else if (offer.interestRate > 25) {
      results.push({ isValid: false, message: `Interest rate should not exceed 25% for offer ${index + 1}`, severity: 'warning' });
    } else if (offer.interestRate > 10) {
      results.push({ isValid: true, message: `High interest rate for offer ${index + 1} - consider alternatives`, severity: 'warning' });
    } else {
      results.push({ isValid: true, severity: 'info' });
    }
  }

  // Validate points
  if (offer.points !== undefined) {
    if (offer.points < 0) {
      results.push({ isValid: false, message: `Points cannot be negative for offer ${index + 1}`, severity: 'error' });
    } else if (offer.points > 10) {
      results.push({ isValid: false, message: `Points should not exceed 10 for offer ${index + 1}`, severity: 'warning' });
    } else if (offer.points > 3) {
      results.push({ isValid: true, message: `High points cost for offer ${index + 1} - consider impact on APR`, severity: 'info' });
    } else {
      results.push({ isValid: true, severity: 'info' });
    }
  }

  // Validate fees
  const feeFields = [
    { field: 'originationFee', name: 'Origination Fee', max: 10000 },
    { field: 'processingFee', name: 'Processing Fee', max: 2000 },
    { field: 'underwritingFee', name: 'Underwriting Fee', max: 2000 },
    { field: 'appraisalFee', name: 'Appraisal Fee', max: 1000 },
    { field: 'titleInsurance', name: 'Title Insurance', max: 5000 },
    { field: 'recordingFee', name: 'Recording Fee', max: 500 },
    { field: 'creditReport', name: 'Credit Report', max: 100 },
    { field: 'floodCert', name: 'Flood Certification', max: 50 },
    { field: 'taxService', name: 'Tax Service', max: 150 },
    { field: 'wireFee', name: 'Wire Fee', max: 50 },
    { field: 'otherFees', name: 'Other Fees', max: 2000 }
  ];

  feeFields.forEach(({ field, name, max }) => {
    const value = offer[field as keyof MortgageOffer] as number;
    if (value !== undefined) {
      if (value < 0) {
        results.push({ isValid: false, message: `${name} cannot be negative for offer ${index + 1}`, severity: 'error' });
      } else if (value > max) {
        results.push({ isValid: false, message: `${name} should not exceed $${max.toLocaleString()} for offer ${index + 1}`, severity: 'warning' });
      } else {
        results.push({ isValid: true, severity: 'info' });
      }
    }
  });

  return results;
}

export function quickValidateOffers(offers: Partial<MortgageOffer>[]): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];

  if (!offers || offers.length === 0) {
    results.push({ isValid: false, message: 'At least one mortgage offer is required', severity: 'error' });
    return results;
  }

  if (offers.length > 10) {
    results.push({ isValid: false, message: 'Maximum 10 mortgage offers can be compared at once', severity: 'warning' });
  }

  if (offers.length < 2) {
    results.push({ isValid: true, message: 'Consider adding more offers for better comparison', severity: 'info' });
  }

  // Validate each offer
  offers.forEach((offer, index) => {
    const offerResults = quickValidateMortgageOffer(offer, index);
    results.push(...offerResults);
  });

  // Check for duplicate lenders
  const lenderNames = offers.map(offer => offer.lender?.toLowerCase().trim()).filter(Boolean);
  const uniqueLenders = new Set(lenderNames);
  if (uniqueLenders.size < lenderNames.length) {
    results.push({ isValid: true, message: 'Duplicate lender names detected - ensure offers are from different lenders', severity: 'warning' });
  }

  return results;
}

export function quickValidateAllInputs(inputs: Partial<MortgageAPRComparisonInputs>): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];

  // Validate basic inputs
  if (inputs.loanAmount !== undefined) {
    results.push(quickValidateLoanAmount(inputs.loanAmount));
  }

  if (inputs.loanTerm !== undefined) {
    results.push(quickValidateLoanTerm(inputs.loanTerm));
  }

  if (inputs.propertyValue !== undefined) {
    results.push(quickValidatePropertyValue(inputs.propertyValue));
  }

  if (inputs.downPayment !== undefined) {
    results.push(quickValidateDownPayment(inputs.downPayment, inputs.loanAmount, inputs.propertyValue));
  }

  if (inputs.propertyTax !== undefined) {
    results.push(quickValidatePropertyTax(inputs.propertyTax));
  }

  if (inputs.homeInsurance !== undefined) {
    results.push(quickValidateHomeInsurance(inputs.homeInsurance));
  }

  if (inputs.pmiRate !== undefined) {
    results.push(quickValidatePMIRate(inputs.pmiRate));
  }

  if (inputs.hoaFees !== undefined) {
    results.push(quickValidateHOAFees(inputs.hoaFees));
  }

  if (inputs.creditScore !== undefined) {
    results.push(quickValidateCreditScore(inputs.creditScore));
  }

  if (inputs.debtToIncomeRatio !== undefined) {
    results.push(quickValidateDebtToIncomeRatio(inputs.debtToIncomeRatio));
  }

  if (inputs.comparisonPeriod !== undefined) {
    results.push(quickValidateComparisonPeriod(inputs.comparisonPeriod, inputs.loanTerm));
  }

  if (inputs.lenderFees !== undefined) {
    results.push(quickValidateLenderFees(inputs.lenderFees));
  }

  if (inputs.thirdPartyFees !== undefined) {
    results.push(quickValidateThirdPartyFees(inputs.thirdPartyFees));
  }

  if (inputs.prepaidItems !== undefined) {
    results.push(quickValidatePrepaidItems(inputs.prepaidItems));
  }

  // Validate offers
  if (inputs.offers !== undefined) {
    const offerResults = quickValidateOffers(inputs.offers);
    results.push(...offerResults);
  }

  // Cross-field validations
  if (inputs.loanAmount && inputs.propertyValue && inputs.downPayment) {
    const ltvRatio = ((inputs.loanAmount - inputs.downPayment) / inputs.propertyValue) * 100;
    if (ltvRatio > 100) {
      results.push({ isValid: false, message: 'Loan amount minus down payment cannot exceed property value', severity: 'error' });
    } else if (ltvRatio > 80) {
      results.push({ isValid: true, message: 'LTV > 80% - PMI may be required', severity: 'warning' });
    }
  }

  if (inputs.creditScore && inputs.debtToIncomeRatio) {
    if (inputs.creditScore < 620 && inputs.debtToIncomeRatio > 43) {
      results.push({ isValid: true, message: 'Low credit score with high DTI may limit loan options', severity: 'warning' });
    }
  }

  return results;
}