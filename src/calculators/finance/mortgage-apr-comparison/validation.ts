import { ValidationRuleFactory } from '../../../utils/validation';
import { MortgageAPRComparisonInputs, MortgageOffer } from './formulas';

export function validateMortgageAPRComparisonInputs(inputs: MortgageAPRComparisonInputs): string[] {
  const errors: string[] = [];
  const ruleFactory = new ValidationRuleFactory();

  // Required validations
  ruleFactory
    .required('loanAmount', inputs.loanAmount, 'Loan amount is required')
    .positive('loanAmount', inputs.loanAmount, 'Loan amount must be positive')
    .range('loanAmount', inputs.loanAmount, 10000, 10000000, 'Loan amount must be between $10,000 and $10,000,000')
    .validate(errors);

  ruleFactory
    .required('loanTerm', inputs.loanTerm, 'Loan term is required')
    .positive('loanTerm', inputs.loanTerm, 'Loan term must be positive')
    .range('loanTerm', inputs.loanTerm, 1, 50, 'Loan term must be between 1 and 50 years')
    .validate(errors);

  ruleFactory
    .required('offers', inputs.offers, 'At least one mortgage offer is required')
    .validate(errors);

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
    ruleFactory
      .positive('propertyValue', inputs.propertyValue, 'Property value must be positive')
      .range('propertyValue', inputs.propertyValue, 10000, 10000000, 'Property value must be between $10,000 and $10,000,000')
      .validate(errors);
  }

  if (inputs.downPayment !== undefined) {
    ruleFactory
      .positive('downPayment', inputs.downPayment, 'Down payment must be positive')
      .range('downPayment', inputs.downPayment, 0, 5000000, 'Down payment must be between $0 and $5,000,000')
      .validate(errors);
  }

  if (inputs.propertyTax !== undefined) {
    ruleFactory
      .positive('propertyTax', inputs.propertyTax, 'Property tax must be positive')
      .range('propertyTax', inputs.propertyTax, 0, 100000, 'Property tax must be between $0 and $100,000')
      .validate(errors);
  }

  if (inputs.homeInsurance !== undefined) {
    ruleFactory
      .positive('homeInsurance', inputs.homeInsurance, 'Home insurance must be positive')
      .range('homeInsurance', inputs.homeInsurance, 0, 10000, 'Home insurance must be between $0 and $10,000')
      .validate(errors);
  }

  if (inputs.pmiRate !== undefined) {
    ruleFactory
      .positive('pmiRate', inputs.pmiRate, 'PMI rate must be positive')
      .range('pmiRate', inputs.pmiRate, 0, 5, 'PMI rate must be between 0% and 5%')
      .validate(errors);
  }

  if (inputs.hoaFees !== undefined) {
    ruleFactory
      .positive('hoaFees', inputs.hoaFees, 'HOA fees must be positive')
      .range('hoaFees', inputs.hoaFees, 0, 2000, 'HOA fees must be between $0 and $2,000')
      .validate(errors);
  }

  if (inputs.creditScore !== undefined) {
    ruleFactory
      .positive('creditScore', inputs.creditScore, 'Credit score must be positive')
      .range('creditScore', inputs.creditScore, 300, 850, 'Credit score must be between 300 and 850')
      .validate(errors);
  }

  if (inputs.debtToIncomeRatio !== undefined) {
    ruleFactory
      .positive('debtToIncomeRatio', inputs.debtToIncomeRatio, 'Debt-to-income ratio must be positive')
      .range('debtToIncomeRatio', inputs.debtToIncomeRatio, 0, 100, 'Debt-to-income ratio must be between 0% and 100%')
      .validate(errors);
  }

  if (inputs.lenderFees !== undefined) {
    ruleFactory
      .positive('lenderFees', inputs.lenderFees, 'Lender fees must be positive')
      .range('lenderFees', inputs.lenderFees, 0, 10000, 'Lender fees must be between $0 and $10,000')
      .validate(errors);
  }

  if (inputs.thirdPartyFees !== undefined) {
    ruleFactory
      .positive('thirdPartyFees', inputs.thirdPartyFees, 'Third-party fees must be positive')
      .range('thirdPartyFees', inputs.thirdPartyFees, 0, 10000, 'Third-party fees must be between $0 and $10,000')
      .validate(errors);
  }

  if (inputs.prepaidItems !== undefined) {
    ruleFactory
      .positive('prepaidItems', inputs.prepaidItems, 'Prepaid items must be positive')
      .range('prepaidItems', inputs.prepaidItems, 0, 20000, 'Prepaid items must be between $0 and $20,000')
      .validate(errors);
  }

  if (inputs.comparisonPeriod !== undefined) {
    ruleFactory
      .positive('comparisonPeriod', inputs.comparisonPeriod, 'Comparison period must be positive')
      .range('comparisonPeriod', inputs.comparisonPeriod, 1, 50, 'Comparison period must be between 1 and 50 years')
      .validate(errors);
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
  const ruleFactory = new ValidationRuleFactory();

  // Required offer fields
  ruleFactory
    .required('lender', offer.lender, `Lender name is required for offer ${index + 1}`)
    .validate(errors);

  ruleFactory
    .required('interestRate', offer.interestRate, `Interest rate is required for offer ${index + 1}`)
    .positive('interestRate', offer.interestRate, `Interest rate must be positive for offer ${index + 1}`)
    .range('interestRate', offer.interestRate, 0.1, 25, `Interest rate must be between 0.1% and 25% for offer ${index + 1}`)
    .validate(errors);

  // Optional offer fields with validation
  if (offer.points !== undefined) {
    ruleFactory
      .positive('points', offer.points, `Points must be positive for offer ${index + 1}`)
      .range('points', offer.points, 0, 10, `Points must be between 0 and 10 for offer ${index + 1}`)
      .validate(errors);
  }

  if (offer.originationFee !== undefined) {
    ruleFactory
      .positive('originationFee', offer.originationFee, `Origination fee must be positive for offer ${index + 1}`)
      .range('originationFee', offer.originationFee, 0, 10000, `Origination fee must be between $0 and $10,000 for offer ${index + 1}`)
      .validate(errors);
  }

  if (offer.processingFee !== undefined) {
    ruleFactory
      .positive('processingFee', offer.processingFee, `Processing fee must be positive for offer ${index + 1}`)
      .range('processingFee', offer.processingFee, 0, 2000, `Processing fee must be between $0 and $2,000 for offer ${index + 1}`)
      .validate(errors);
  }

  if (offer.underwritingFee !== undefined) {
    ruleFactory
      .positive('underwritingFee', offer.underwritingFee, `Underwriting fee must be positive for offer ${index + 1}`)
      .range('underwritingFee', offer.underwritingFee, 0, 2000, `Underwriting fee must be between $0 and $2,000 for offer ${index + 1}`)
      .validate(errors);
  }

  if (offer.appraisalFee !== undefined) {
    ruleFactory
      .positive('appraisalFee', offer.appraisalFee, `Appraisal fee must be positive for offer ${index + 1}`)
      .range('appraisalFee', offer.appraisalFee, 0, 1000, `Appraisal fee must be between $0 and $1,000 for offer ${index + 1}`)
      .validate(errors);
  }

  if (offer.titleInsurance !== undefined) {
    ruleFactory
      .positive('titleInsurance', offer.titleInsurance, `Title insurance must be positive for offer ${index + 1}`)
      .range('titleInsurance', offer.titleInsurance, 0, 5000, `Title insurance must be between $0 and $5,000 for offer ${index + 1}`)
      .validate(errors);
  }

  if (offer.recordingFee !== undefined) {
    ruleFactory
      .positive('recordingFee', offer.recordingFee, `Recording fee must be positive for offer ${index + 1}`)
      .range('recordingFee', offer.recordingFee, 0, 500, `Recording fee must be between $0 and $500 for offer ${index + 1}`)
      .validate(errors);
  }

  if (offer.creditReport !== undefined) {
    ruleFactory
      .positive('creditReport', offer.creditReport, `Credit report fee must be positive for offer ${index + 1}`)
      .range('creditReport', offer.creditReport, 0, 100, `Credit report fee must be between $0 and $100 for offer ${index + 1}`)
      .validate(errors);
  }

  if (offer.floodCert !== undefined) {
    ruleFactory
      .positive('floodCert', offer.floodCert, `Flood certification fee must be positive for offer ${index + 1}`)
      .range('floodCert', offer.floodCert, 0, 50, `Flood certification fee must be between $0 and $50 for offer ${index + 1}`)
      .validate(errors);
  }

  if (offer.taxService !== undefined) {
    ruleFactory
      .positive('taxService', offer.taxService, `Tax service fee must be positive for offer ${index + 1}`)
      .range('taxService', offer.taxService, 0, 150, `Tax service fee must be between $0 and $150 for offer ${index + 1}`)
      .validate(errors);
  }

  if (offer.wireFee !== undefined) {
    ruleFactory
      .positive('wireFee', offer.wireFee, `Wire fee must be positive for offer ${index + 1}`)
      .range('wireFee', offer.wireFee, 0, 50, `Wire fee must be between $0 and $50 for offer ${index + 1}`)
      .validate(errors);
  }

  if (offer.otherFees !== undefined) {
    ruleFactory
      .positive('otherFees', offer.otherFees, `Other fees must be positive for offer ${index + 1}`)
      .range('otherFees', offer.otherFees, 0, 2000, `Other fees must be between $0 and $2,000 for offer ${index + 1}`)
      .validate(errors);
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