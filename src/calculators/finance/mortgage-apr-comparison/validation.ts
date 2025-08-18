import { ValidationRuleFactory } from '../../../utils/validation';
import { MortgageAPRComparisonInputs, MortgageOffer } from './formulas';

export function validateMortgageAPRComparisonInputs(inputs: MortgageAPRComparisonInputs): string[] {
  const errors: string[] = [];

  // Required validations
  const loanAmountRule = ValidationRuleFactory.required('loanAmount', 'Loan amount is required');
  if (!loanAmountRule.validator(inputs.loanAmount)) {
    errors.push(loanAmountRule.message);
  }

  const loanAmountPositiveRule = ValidationRuleFactory.positive('loanAmount', 'Loan amount must be positive');
  if (!loanAmountPositiveRule.validator(inputs.loanAmount)) {
    errors.push(loanAmountPositiveRule.message);
  }

  const loanAmountRangeRule = ValidationRuleFactory.range('loanAmount', 10000, 10000000, 'Loan amount must be between $10,000 and $10,000,000');
  if (!loanAmountRangeRule.validator(inputs.loanAmount)) {
    errors.push(loanAmountRangeRule.message);
  }

  const loanTermRule = ValidationRuleFactory.required('loanTerm', 'Loan term is required');
  if (!loanTermRule.validator(inputs.loanTerm)) {
    errors.push(loanTermRule.message);
  }

  const loanTermPositiveRule = ValidationRuleFactory.positive('loanTerm', 'Loan term must be positive');
  if (!loanTermPositiveRule.validator(inputs.loanTerm)) {
    errors.push(loanTermPositiveRule.message);
  }

  const loanTermRangeRule = ValidationRuleFactory.range('loanTerm', 1, 50, 'Loan term must be between 1 and 50 years');
  if (!loanTermRangeRule.validator(inputs.loanTerm)) {
    errors.push(loanTermRangeRule.message);
  }

  if (!inputs.offers || inputs.offers.length === 0) {
    errors.push('At least one mortgage offer is required');
  }

  // Validate offers array
  if (inputs.offers && Array.isArray(inputs.offers)) {
    if (inputs.offers.length === 0) {
      errors.push('At least one mortgage offer is required');
    } else if (inputs.offers.length > 10) {
      errors.push('Maximum 10 mortgage offers can be compared at once');
    } else {
      inputs.offers.forEach((offer, index) => {
        const offerErrors = validateMortgageOffer(offer, index);
        errors.push(...offerErrors);
      });
    }
  }

  // Optional field validations
  if (inputs.propertyValue !== undefined) {
    const propertyValueRule = ValidationRuleFactory.positive('propertyValue', 'Property value must be positive');
    if (!propertyValueRule.validator(inputs.propertyValue)) {
      errors.push(propertyValueRule.message);
    }
    
    const propertyValueRangeRule = ValidationRuleFactory.range('propertyValue', 10000, 10000000, 'Property value must be between $10,000 and $10,000,000');
    if (!propertyValueRangeRule.validator(inputs.propertyValue)) {
      errors.push(propertyValueRangeRule.message);
    }
  }

  if (inputs.downPayment !== undefined) {
    const downPaymentRule = ValidationRuleFactory.nonNegative('downPayment', 'Down payment cannot be negative');
    if (!downPaymentRule.validator(inputs.downPayment)) {
      errors.push(downPaymentRule.message);
    }
    
    const downPaymentRangeRule = ValidationRuleFactory.range('downPayment', 0, 5000000, 'Down payment must be between $0 and $5,000,000');
    if (!downPaymentRangeRule.validator(inputs.downPayment)) {
      errors.push(downPaymentRangeRule.message);
    }
  }

  if (inputs.propertyTax !== undefined) {
    const propertyTaxRule = ValidationRuleFactory.nonNegative('propertyTax', 'Property tax cannot be negative');
    if (!propertyTaxRule.validator(inputs.propertyTax)) {
      errors.push(propertyTaxRule.message);
    }
    
    const propertyTaxRangeRule = ValidationRuleFactory.range('propertyTax', 0, 100000, 'Property tax must be between $0 and $100,000');
    if (!propertyTaxRangeRule.validator(inputs.propertyTax)) {
      errors.push(propertyTaxRangeRule.message);
    }
  }

  if (inputs.homeInsurance !== undefined) {
    const homeInsuranceRule = ValidationRuleFactory.nonNegative('homeInsurance', 'Home insurance cannot be negative');
    if (!homeInsuranceRule.validator(inputs.homeInsurance)) {
      errors.push(homeInsuranceRule.message);
    }
    
    const homeInsuranceRangeRule = ValidationRuleFactory.range('homeInsurance', 0, 10000, 'Home insurance must be between $0 and $10,000');
    if (!homeInsuranceRangeRule.validator(inputs.homeInsurance)) {
      errors.push(homeInsuranceRangeRule.message);
    }
  }

  if (inputs.pmiRate !== undefined) {
    const pmiRateRule = ValidationRuleFactory.nonNegative('pmiRate', 'PMI rate cannot be negative');
    if (!pmiRateRule.validator(inputs.pmiRate)) {
      errors.push(pmiRateRule.message);
    }
    
    const pmiRateRangeRule = ValidationRuleFactory.range('pmiRate', 0, 5, 'PMI rate must be between 0% and 5%');
    if (!pmiRateRangeRule.validator(inputs.pmiRate)) {
      errors.push(pmiRateRangeRule.message);
    }
  }

  if (inputs.hoaFees !== undefined) {
    const hoaFeesRule = ValidationRuleFactory.nonNegative('hoaFees', 'HOA fees cannot be negative');
    if (!hoaFeesRule.validator(inputs.hoaFees)) {
      errors.push(hoaFeesRule.message);
    }
    
    const hoaFeesRangeRule = ValidationRuleFactory.range('hoaFees', 0, 2000, 'HOA fees must be between $0 and $2,000');
    if (!hoaFeesRangeRule.validator(inputs.hoaFees)) {
      errors.push(hoaFeesRangeRule.message);
    }
  }

  if (inputs.creditScore !== undefined) {
    const creditScoreRule = ValidationRuleFactory.range('creditScore', 300, 850, 'Credit score must be between 300 and 850');
    if (!creditScoreRule.validator(inputs.creditScore)) {
      errors.push(creditScoreRule.message);
    }
  }

  if (inputs.debtToIncomeRatio !== undefined) {
    const dtiRule = ValidationRuleFactory.percentage('debtToIncomeRatio', 'Debt-to-income ratio must be between 0% and 100%');
    if (!dtiRule.validator(inputs.debtToIncomeRatio)) {
      errors.push(dtiRule.message);
    }
  }

  if (inputs.lenderFees !== undefined) {
    const lenderFeesRule = ValidationRuleFactory.nonNegative('lenderFees', 'Lender fees cannot be negative');
    if (!lenderFeesRule.validator(inputs.lenderFees)) {
      errors.push(lenderFeesRule.message);
    }
    
    const lenderFeesRangeRule = ValidationRuleFactory.range('lenderFees', 0, 10000, 'Lender fees must be between $0 and $10,000');
    if (!lenderFeesRangeRule.validator(inputs.lenderFees)) {
      errors.push(lenderFeesRangeRule.message);
    }
  }

  if (inputs.thirdPartyFees !== undefined) {
    const thirdPartyFeesRule = ValidationRuleFactory.nonNegative('thirdPartyFees', 'Third-party fees cannot be negative');
    if (!thirdPartyFeesRule.validator(inputs.thirdPartyFees)) {
      errors.push(thirdPartyFeesRule.message);
    }
    
    const thirdPartyFeesRangeRule = ValidationRuleFactory.range('thirdPartyFees', 0, 10000, 'Third-party fees must be between $0 and $10,000');
    if (!thirdPartyFeesRangeRule.validator(inputs.thirdPartyFees)) {
      errors.push(thirdPartyFeesRangeRule.message);
    }
  }

  if (inputs.prepaidItems !== undefined) {
    const prepaidItemsRule = ValidationRuleFactory.nonNegative('prepaidItems', 'Prepaid items cannot be negative');
    if (!prepaidItemsRule.validator(inputs.prepaidItems)) {
      errors.push(prepaidItemsRule.message);
    }
    
    const prepaidItemsRangeRule = ValidationRuleFactory.range('prepaidItems', 0, 20000, 'Prepaid items must be between $0 and $20,000');
    if (!prepaidItemsRangeRule.validator(inputs.prepaidItems)) {
      errors.push(prepaidItemsRangeRule.message);
    }
  }

  if (inputs.comparisonPeriod !== undefined) {
    const comparisonPeriodRule = ValidationRuleFactory.positive('comparisonPeriod', 'Comparison period must be positive');
    if (!comparisonPeriodRule.validator(inputs.comparisonPeriod)) {
      errors.push(comparisonPeriodRule.message);
    }
    
    const comparisonPeriodRangeRule = ValidationRuleFactory.range('comparisonPeriod', 1, 50, 'Comparison period must be between 1 and 50 years');
    if (!comparisonPeriodRangeRule.validator(inputs.comparisonPeriod)) {
      errors.push(comparisonPeriodRangeRule.message);
    }
  }

  // Business logic validations
  if (inputs.loanAmount && inputs.propertyValue && inputs.downPayment) {
    const ltvRatio = ((inputs.loanAmount - inputs.downPayment) / inputs.propertyValue) * 100;
    if (ltvRatio > 100) {
      errors.push('Loan amount minus down payment cannot exceed property value');
    }
  }

  if (inputs.loanAmount && inputs.downPayment) {
    if (inputs.downPayment >= inputs.loanAmount) {
      errors.push('Down payment cannot be greater than or equal to loan amount');
    }
  }

  if (inputs.propertyValue && inputs.loanAmount) {
    const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
    if (ltvRatio > 100) {
      const loanType = inputs.loanType || 'Conventional';
      if (loanType !== 'VA' && loanType !== 'USDA') {
        errors.push('Loan-to-value ratio cannot exceed 100% for conventional loans');
      }
    }
  }

  if (inputs.creditScore && inputs.debtToIncomeRatio) {
    if (inputs.creditScore < 620 && inputs.debtToIncomeRatio > 43) {
      errors.push('Low credit score combined with high debt-to-income ratio may limit loan options');
    }
  }

  // Validate loan type specific requirements
  if (inputs.loanType) {
    const loanTypeErrors = validateLoanTypeRequirements(inputs);
    errors.push(...loanTypeErrors);
  }

  // Validate purchase type specific requirements
  if (inputs.purchaseType) {
    const purchaseTypeErrors = validatePurchaseTypeRequirements(inputs);
    errors.push(...purchaseTypeErrors);
  }

  // Validate state-specific requirements
  if (inputs.state) {
    const stateErrors = validateStateRequirements(inputs);
    errors.push(...stateErrors);
  }

  return errors;
}

function validateMortgageOffer(offer: MortgageOffer, index: number): string[] {
  const errors: string[] = [];

  // Required offer fields
  const lenderRule = ValidationRuleFactory.required('lender', `Lender name is required for offer ${index + 1}`);
  if (!lenderRule.validator(offer.lender)) {
    errors.push(lenderRule.message);
  }

  const interestRateRequiredRule = ValidationRuleFactory.required('interestRate', `Interest rate is required for offer ${index + 1}`);
  if (!interestRateRequiredRule.validator(offer.interestRate)) {
    errors.push(interestRateRequiredRule.message);
  }

  const interestRatePositiveRule = ValidationRuleFactory.positive('interestRate', `Interest rate must be positive for offer ${index + 1}`);
  if (!interestRatePositiveRule.validator(offer.interestRate)) {
    errors.push(interestRatePositiveRule.message);
  }

  const interestRateRangeRule = ValidationRuleFactory.range('interestRate', 0.1, 25, `Interest rate must be between 0.1% and 25% for offer ${index + 1}`);
  if (!interestRateRangeRule.validator(offer.interestRate)) {
    errors.push(interestRateRangeRule.message);
  }

  // Optional offer fields with validation
  if (offer.points !== undefined) {
    const pointsRule = ValidationRuleFactory.nonNegative('points', `Points cannot be negative for offer ${index + 1}`);
    if (!pointsRule.validator(offer.points)) {
      errors.push(pointsRule.message);
    }
    
    const pointsRangeRule = ValidationRuleFactory.range('points', 0, 10, `Points must be between 0 and 10 for offer ${index + 1}`);
    if (!pointsRangeRule.validator(offer.points)) {
      errors.push(pointsRangeRule.message);
    }
  }

  if (offer.originationFee !== undefined) {
    const originationFeeRule = ValidationRuleFactory.nonNegative('originationFee', `Origination fee cannot be negative for offer ${index + 1}`);
    if (!originationFeeRule.validator(offer.originationFee)) {
      errors.push(originationFeeRule.message);
    }
    
    const originationFeeRangeRule = ValidationRuleFactory.range('originationFee', 0, 10000, `Origination fee must be between $0 and $10,000 for offer ${index + 1}`);
    if (!originationFeeRangeRule.validator(offer.originationFee)) {
      errors.push(originationFeeRangeRule.message);
    }
  }

  if (offer.processingFee !== undefined) {
    const processingFeeRule = ValidationRuleFactory.nonNegative('processingFee', `Processing fee cannot be negative for offer ${index + 1}`);
    if (!processingFeeRule.validator(offer.processingFee)) {
      errors.push(processingFeeRule.message);
    }
    
    const processingFeeRangeRule = ValidationRuleFactory.range('processingFee', 0, 2000, `Processing fee must be between $0 and $2,000 for offer ${index + 1}`);
    if (!processingFeeRangeRule.validator(offer.processingFee)) {
      errors.push(processingFeeRangeRule.message);
    }
  }

  if (offer.underwritingFee !== undefined) {
    const underwritingFeeRule = ValidationRuleFactory.nonNegative('underwritingFee', `Underwriting fee cannot be negative for offer ${index + 1}`);
    if (!underwritingFeeRule.validator(offer.underwritingFee)) {
      errors.push(underwritingFeeRule.message);
    }
    
    const underwritingFeeRangeRule = ValidationRuleFactory.range('underwritingFee', 0, 2000, `Underwriting fee must be between $0 and $2,000 for offer ${index + 1}`);
    if (!underwritingFeeRangeRule.validator(offer.underwritingFee)) {
      errors.push(underwritingFeeRangeRule.message);
    }
  }

  if (offer.appraisalFee !== undefined) {
    const appraisalFeeRule = ValidationRuleFactory.nonNegative('appraisalFee', `Appraisal fee cannot be negative for offer ${index + 1}`);
    if (!appraisalFeeRule.validator(offer.appraisalFee)) {
      errors.push(appraisalFeeRule.message);
    }
    
    const appraisalFeeRangeRule = ValidationRuleFactory.range('appraisalFee', 0, 1000, `Appraisal fee must be between $0 and $1,000 for offer ${index + 1}`);
    if (!appraisalFeeRangeRule.validator(offer.appraisalFee)) {
      errors.push(appraisalFeeRangeRule.message);
    }
  }

  if (offer.titleInsurance !== undefined) {
    const titleInsuranceRule = ValidationRuleFactory.nonNegative('titleInsurance', `Title insurance cannot be negative for offer ${index + 1}`);
    if (!titleInsuranceRule.validator(offer.titleInsurance)) {
      errors.push(titleInsuranceRule.message);
    }
    
    const titleInsuranceRangeRule = ValidationRuleFactory.range('titleInsurance', 0, 5000, `Title insurance must be between $0 and $5,000 for offer ${index + 1}`);
    if (!titleInsuranceRangeRule.validator(offer.titleInsurance)) {
      errors.push(titleInsuranceRangeRule.message);
    }
  }

  if (offer.recordingFee !== undefined) {
    const recordingFeeRule = ValidationRuleFactory.nonNegative('recordingFee', `Recording fee cannot be negative for offer ${index + 1}`);
    if (!recordingFeeRule.validator(offer.recordingFee)) {
      errors.push(recordingFeeRule.message);
    }
    
    const recordingFeeRangeRule = ValidationRuleFactory.range('recordingFee', 0, 500, `Recording fee must be between $0 and $500 for offer ${index + 1}`);
    if (!recordingFeeRangeRule.validator(offer.recordingFee)) {
      errors.push(recordingFeeRangeRule.message);
    }
  }

  if (offer.creditReport !== undefined) {
    const creditReportRule = ValidationRuleFactory.nonNegative('creditReport', `Credit report fee cannot be negative for offer ${index + 1}`);
    if (!creditReportRule.validator(offer.creditReport)) {
      errors.push(creditReportRule.message);
    }
    
    const creditReportRangeRule = ValidationRuleFactory.range('creditReport', 0, 100, `Credit report fee must be between $0 and $100 for offer ${index + 1}`);
    if (!creditReportRangeRule.validator(offer.creditReport)) {
      errors.push(creditReportRangeRule.message);
    }
  }

  if (offer.floodCert !== undefined) {
    const floodCertRule = ValidationRuleFactory.nonNegative('floodCert', `Flood certification fee cannot be negative for offer ${index + 1}`);
    if (!floodCertRule.validator(offer.floodCert)) {
      errors.push(floodCertRule.message);
    }
    
    const floodCertRangeRule = ValidationRuleFactory.range('floodCert', 0, 50, `Flood certification fee must be between $0 and $50 for offer ${index + 1}`);
    if (!floodCertRangeRule.validator(offer.floodCert)) {
      errors.push(floodCertRangeRule.message);
    }
  }

  if (offer.taxService !== undefined) {
    const taxServiceRule = ValidationRuleFactory.nonNegative('taxService', `Tax service fee cannot be negative for offer ${index + 1}`);
    if (!taxServiceRule.validator(offer.taxService)) {
      errors.push(taxServiceRule.message);
    }
    
    const taxServiceRangeRule = ValidationRuleFactory.range('taxService', 0, 150, `Tax service fee must be between $0 and $150 for offer ${index + 1}`);
    if (!taxServiceRangeRule.validator(offer.taxService)) {
      errors.push(taxServiceRangeRule.message);
    }
  }

  if (offer.wireFee !== undefined) {
    const wireFeeRule = ValidationRuleFactory.nonNegative('wireFee', `Wire fee cannot be negative for offer ${index + 1}`);
    if (!wireFeeRule.validator(offer.wireFee)) {
      errors.push(wireFeeRule.message);
    }
    
    const wireFeeRangeRule = ValidationRuleFactory.range('wireFee', 0, 50, `Wire fee must be between $0 and $50 for offer ${index + 1}`);
    if (!wireFeeRangeRule.validator(offer.wireFee)) {
      errors.push(wireFeeRangeRule.message);
    }
  }

  if (offer.otherFees !== undefined) {
    const otherFeesRule = ValidationRuleFactory.nonNegative('otherFees', `Other fees cannot be negative for offer ${index + 1}`);
    if (!otherFeesRule.validator(offer.otherFees)) {
      errors.push(otherFeesRule.message);
    }
    
    const otherFeesRangeRule = ValidationRuleFactory.range('otherFees', 0, 2000, `Other fees must be between $0 and $2,000 for offer ${index + 1}`);
    if (!otherFeesRangeRule.validator(offer.otherFees)) {
      errors.push(otherFeesRangeRule.message);
    }
  }

  return errors;
}

function validateLoanTypeRequirements(inputs: MortgageAPRComparisonInputs): string[] {
  const errors: string[] = [];
  const { loanType, loanAmount, creditScore, debtToIncomeRatio, occupancyType } = inputs;

  switch (loanType) {
    case 'FHA':
      if (loanAmount && loanAmount > 472030) {
        errors.push('FHA loan amount exceeds the 2024 limit of $472,030 for most areas');
      }
      if (creditScore && creditScore < 580) {
        errors.push('FHA requires minimum 580 credit score for 3.5% down payment');
      }
      if (debtToIncomeRatio && debtToIncomeRatio > 43) {
        errors.push('FHA debt-to-income ratio should not exceed 43%');
      }
      break;

    case 'VA':
      if (occupancyType && occupancyType !== 'Primary Residence') {
        errors.push('VA loans are only available for primary residences');
      }
      if (loanAmount && loanAmount > 766550) {
        errors.push('VA loan amount exceeds the 2024 limit of $766,550 for most areas');
      }
      break;

    case 'USDA':
      if (occupancyType && occupancyType !== 'Primary Residence') {
        errors.push('USDA loans are only available for primary residences');
      }
      if (loanAmount && loanAmount > 379500) {
        errors.push('USDA loan amount exceeds the 2024 limit of $379,500 for most areas');
      }
      break;

    case 'Jumbo':
      if (loanAmount && loanAmount < 766550) {
        errors.push('Jumbo loans typically start at $766,550 (2024 conventional limit)');
      }
      if (creditScore && creditScore < 700) {
        errors.push('Jumbo loans typically require credit score of 700 or higher');
      }
      if (debtToIncomeRatio && debtToIncomeRatio > 43) {
        errors.push('Jumbo loans typically require debt-to-income ratio below 43%');
      }
      break;

    case 'ARM':
      if (loanAmount && loanAmount > 766550) {
        errors.push('ARM loans may have different limits for jumbo amounts');
      }
      break;
  }

  return errors;
}

function validatePurchaseTypeRequirements(inputs: MortgageAPRComparisonInputs): string[] {
  const errors: string[] = [];
  const { purchaseType, loanAmount, propertyValue, downPayment } = inputs;

  switch (purchaseType) {
    case 'Refinance':
    case 'Rate and Term Refinance':
      if (loanAmount && propertyValue) {
        const ltvRatio = (loanAmount / propertyValue) * 100;
        if (ltvRatio > 97) {
          errors.push('Refinance loans typically require LTV ratio below 97%');
        }
      }
      break;

    case 'Cash-Out Refinance':
      if (loanAmount && propertyValue) {
        const ltvRatio = (loanAmount / propertyValue) * 100;
        if (ltvRatio > 80) {
          errors.push('Cash-out refinance typically requires LTV ratio below 80%');
        }
      }
      break;

    case 'Purchase':
      if (loanAmount && propertyValue && downPayment) {
        const ltvRatio = ((loanAmount - downPayment) / propertyValue) * 100;
        if (ltvRatio > 100) {
          errors.push('Purchase loan amount minus down payment cannot exceed property value');
        }
      }
      break;
  }

  return errors;
}

function validateStateRequirements(inputs: MortgageAPRComparisonInputs): string[] {
  const errors: string[] = [];
  const { state, loanAmount } = inputs;

  // State-specific loan limits and requirements
  const stateLimits: { [key: string]: number } = {
    'AK': 1149000,
    'HI': 1149000,
    'CA': 1149000,
    'NY': 1149000,
    'DC': 1149000
  };

  if (state && stateLimits[state] && loanAmount && loanAmount > stateLimits[state]) {
    errors.push(`Loan amount exceeds the ${state} high-cost area limit of $${stateLimits[state].toLocaleString()}`);
  }

  return errors;
}

export function validateAPRComparisonForRefinance(inputs: MortgageAPRComparisonInputs): string[] {
  const errors: string[] = [];
  const { purchaseType, offers } = inputs;

  if (purchaseType === 'Refinance' || purchaseType === 'Cash-Out Refinance' || purchaseType === 'Rate and Term Refinance') {
    if (!offers || offers.length < 2) {
      errors.push('Refinance comparison requires at least 2 offers (current loan + new options)');
    }

    // Check if current loan is included
    const hasCurrentLoan = offers?.some(offer => 
      offer.lender.toLowerCase().includes('current') || 
      offer.lender.toLowerCase().includes('existing')
    );

    if (!hasCurrentLoan) {
      errors.push('Refinance comparison should include current loan terms for accurate comparison');
    }
  }

  return errors;
}

export function validateAPRComparisonForPurchase(inputs: MortgageAPRComparisonInputs): string[] {
  const errors: string[] = [];
  const { purchaseType, offers, propertyValue, downPayment } = inputs;

  if (purchaseType === 'Purchase') {
    if (!offers || offers.length < 2) {
      errors.push('Purchase comparison requires at least 2 lender offers');
    }

    if (propertyValue && downPayment && offers) {
      const ltvRatio = ((propertyValue - downPayment) / propertyValue) * 100;
      
      offers.forEach((offer, index) => {
        if (offer.interestRate > 8 && ltvRatio > 80) {
          errors.push(`Offer ${index + 1} has high interest rate for high LTV ratio`);
        }
      });
    }
  }

  return errors;
}

export function validateAPRComparisonForInvestment(inputs: MortgageAPRComparisonInputs): string[] {
  const errors: string[] = [];
  const { occupancyType, offers, downPayment, propertyValue } = inputs;

  if (occupancyType === 'Investment Property') {
    if (!offers || offers.length < 2) {
      errors.push('Investment property comparison requires at least 2 lender offers');
    }

    if (downPayment && propertyValue) {
      const downPaymentPercentage = (downPayment / propertyValue) * 100;
      if (downPaymentPercentage < 20) {
        errors.push('Investment properties typically require 20% or higher down payment');
      }
    }

    if (offers) {
      offers.forEach((offer, index) => {
        if (offer.interestRate < 5) {
          errors.push(`Offer ${index + 1} has unusually low rate for investment property`);
        }
      });
    }
  }

  return errors;
}