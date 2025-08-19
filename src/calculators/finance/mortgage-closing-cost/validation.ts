import { ValidationRuleFactory } from '../../../utils/validation';
import { MortgageClosingCostInputs } from './formulas';

export function validateMortgageClosingCostInputs(inputs: MortgageClosingCostInputs): string[] {
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

  const propertyValueRule = ValidationRuleFactory.required('propertyValue', 'Property value is required');
  if (!propertyValueRule.validator(inputs.propertyValue)) {
    errors.push(propertyValueRule.message);
  }

  const propertyValuePositiveRule = ValidationRuleFactory.positive('propertyValue', 'Property value must be positive');
  if (!propertyValuePositiveRule.validator(inputs.propertyValue)) {
    errors.push(propertyValuePositiveRule.message);
  }

  const propertyValueRangeRule = ValidationRuleFactory.range('propertyValue', 10000, 10000000, 'Property value must be between $10,000 and $10,000,000');
  if (!propertyValueRangeRule.validator(inputs.propertyValue)) {
    errors.push(propertyValueRangeRule.message);
  }

  // Optional field validations
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

  if (inputs.interestRate !== undefined) {
    const interestRateRule = ValidationRuleFactory.positive('interestRate', 'Interest rate must be positive');
    if (!interestRateRule.validator(inputs.interestRate)) {
      errors.push(interestRateRule.message);
    }
    
    const interestRateRangeRule = ValidationRuleFactory.range('interestRate', 0.1, 20, 'Interest rate must be between 0.1% and 20%');
    if (!interestRateRangeRule.validator(inputs.interestRate)) {
      errors.push(interestRateRangeRule.message);
    }
  }

  if (inputs.loanTerm !== undefined) {
    const loanTermRule = ValidationRuleFactory.positive('loanTerm', 'Loan term must be positive');
    if (!loanTermRule.validator(inputs.loanTerm)) {
      errors.push(loanTermRule.message);
    }
    
    const loanTermRangeRule = ValidationRuleFactory.range('loanTerm', 1, 50, 'Loan term must be between 1 and 50 years');
    if (!loanTermRangeRule.validator(inputs.loanTerm)) {
      errors.push(loanTermRangeRule.message);
    }
  }

  if (inputs.points !== undefined) {
    const pointsRule = ValidationRuleFactory.nonNegative('points', 'Points cannot be negative');
    if (!pointsRule.validator(inputs.points)) {
      errors.push(pointsRule.message);
    }
    
    const pointsRangeRule = ValidationRuleFactory.range('points', 0, 10, 'Points must be between 0 and 10');
    if (!pointsRangeRule.validator(inputs.points)) {
      errors.push(pointsRangeRule.message);
    }
  }

  if (inputs.creditScore !== undefined) {
    const creditScoreRule = ValidationRuleFactory.range('creditScore', 300, 850, 'Credit score must be between 300 and 850');
    if (!creditScoreRule.validator(inputs.creditScore)) {
      errors.push(creditScoreRule.message);
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

  if (inputs.escrowMonths !== undefined) {
    const escrowMonthsRule = ValidationRuleFactory.nonNegative('escrowMonths', 'Escrow months cannot be negative');
    if (!escrowMonthsRule.validator(inputs.escrowMonths)) {
      errors.push(escrowMonthsRule.message);
    }
    
    const escrowMonthsRangeRule = ValidationRuleFactory.range('escrowMonths', 0, 12, 'Escrow months must be between 0 and 12');
    if (!escrowMonthsRangeRule.validator(inputs.escrowMonths)) {
      errors.push(escrowMonthsRangeRule.message);
    }
  }

  // Fee validations
  const feeFields = [
    'originationFee', 'processingFee', 'underwritingFee', 'applicationFee', 'commitmentFee',
    'appraisalFee', 'titleInsurance', 'titleSearch', 'recordingFee', 'creditReport',
    'floodCert', 'taxService', 'wireFee', 'surveyFee', 'homeInspection', 'pestInspection',
    'leadPaintInspection', 'radonInspection', 'septicInspection', 'wellInspection',
    'attorneyFee', 'notaryFee', 'escrowFee', 'courierFee', 'otherFees',
    'propertyTax', 'homeInsurance', 'hoaFees', 'prepaidInterest', 'prepaidInsurance', 'prepaidTaxes'
  ];

  feeFields.forEach(field => {
    const value = inputs[field as keyof MortgageClosingCostInputs];
    if (value !== undefined) {
      const nonNegativeRule = ValidationRuleFactory.nonNegative(field, `${field} cannot be negative`);
      if (!nonNegativeRule.validator(value)) {
        errors.push(nonNegativeRule.message);
      }
    }
  });

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

  // Loan type specific validations
  if (inputs.loanType) {
    const loanTypeErrors = validateLoanTypeRequirements(inputs);
    errors.push(...loanTypeErrors);
  }

  // Purchase type specific validations
  if (inputs.purchaseType) {
    const purchaseTypeErrors = validatePurchaseTypeRequirements(inputs);
    errors.push(...purchaseTypeErrors);
  }

  // State-specific validations
  if (inputs.state) {
    const stateErrors = validateStateRequirements(inputs);
    errors.push(...stateErrors);
  }

  return errors;
}

function validateLoanTypeRequirements(inputs: MortgageClosingCostInputs): string[] {
  const errors: string[] = [];
  const { loanType, loanAmount, creditScore, occupancyType } = inputs;

  switch (loanType) {
    case 'FHA':
      if (loanAmount && loanAmount > 472030) {
        errors.push('FHA loan amount exceeds the 2024 limit of $472,030 for most areas');
      }
      if (creditScore && creditScore < 580) {
        errors.push('FHA requires minimum 580 credit score for 3.5% down payment');
      }
      if (occupancyType && occupancyType !== 'Primary Residence') {
        errors.push('FHA loans are only available for primary residences');
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
      break;
  }

  return errors;
}

function validatePurchaseTypeRequirements(inputs: MortgageClosingCostInputs): string[] {
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

function validateStateRequirements(inputs: MortgageClosingCostInputs): string[] {
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

export function validateClosingCostReasonableness(inputs: MortgageClosingCostInputs): string[] {
  const errors: string[] = [];
  const { loanAmount, originationFee, titleInsurance, appraisalFee } = inputs;

  // Reasonableness checks for common fees
  if (originationFee && originationFee > loanAmount * 0.01) {
    errors.push('Origination fee should typically not exceed 1% of loan amount');
  }

  if (titleInsurance && titleInsurance > loanAmount * 0.005) {
    errors.push('Title insurance should typically not exceed 0.5% of loan amount');
  }

  if (appraisalFee && appraisalFee > 1000) {
    errors.push('Appraisal fee should typically not exceed $1,000 for residential properties');
  }

  return errors;
}

export function validateEscrowRequirements(inputs: MortgageClosingCostInputs): string[] {
  const errors: string[] = [];
  const { escrowMonths, propertyTax, homeInsurance, hoaFees } = inputs;

  if (escrowMonths && escrowMonths > 0) {
    if (!propertyTax && !homeInsurance && !hoaFees) {
      errors.push('Escrow account requires at least one of: property tax, home insurance, or HOA fees');
    }
  }

  return errors;
}

export function validateFeeConsistency(inputs: MortgageClosingCostInputs): string[] {
  const errors: string[] = [];
  const { loanType, originationFee, processingFee, underwritingFee } = inputs;

  // Check for fee consistency based on loan type
  if (loanType === 'VA') {
    if (originationFee && originationFee > 1000) {
      errors.push('VA loans typically have lower origination fees due to government backing');
    }
  }

  if (loanType === 'FHA') {
    const totalLenderFees = (originationFee || 0) + (processingFee || 0) + (underwritingFee || 0);
    if (totalLenderFees > 3000) {
      errors.push('FHA loans may have higher total lender fees but should be reasonable');
    }
  }

  return errors;
}