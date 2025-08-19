import { ValidationRuleFactory } from '../../../utils/validation';
import { MortgageEquityInputs } from './formulas';

export function validateMortgageEquityInputs(inputs: MortgageEquityInputs): string[] {
  const errors: string[] = [];

  // Required validations
  const currentPropertyValueRule = ValidationRuleFactory.required('currentPropertyValue', 'Current property value is required');
  if (!currentPropertyValueRule.validator(inputs.currentPropertyValue)) {
    errors.push(currentPropertyValueRule.message);
  }

  const currentPropertyValuePositiveRule = ValidationRuleFactory.positive('currentPropertyValue', 'Current property value must be positive');
  if (!currentPropertyValuePositiveRule.validator(inputs.currentPropertyValue)) {
    errors.push(currentPropertyValuePositiveRule.message);
  }

  const currentPropertyValueRangeRule = ValidationRuleFactory.range('currentPropertyValue', 10000, 10000000, 'Current property value must be between $10,000 and $10,000,000');
  if (!currentPropertyValueRangeRule.validator(inputs.currentPropertyValue)) {
    errors.push(currentPropertyValueRangeRule.message);
  }

  const originalPurchasePriceRule = ValidationRuleFactory.required('originalPurchasePrice', 'Original purchase price is required');
  if (!originalPurchasePriceRule.validator(inputs.originalPurchasePrice)) {
    errors.push(originalPurchasePriceRule.message);
  }

  const originalPurchasePricePositiveRule = ValidationRuleFactory.positive('originalPurchasePrice', 'Original purchase price must be positive');
  if (!originalPurchasePricePositiveRule.validator(inputs.originalPurchasePrice)) {
    errors.push(originalPurchasePricePositiveRule.message);
  }

  const originalPurchasePriceRangeRule = ValidationRuleFactory.range('originalPurchasePrice', 10000, 10000000, 'Original purchase price must be between $10,000 and $10,000,000');
  if (!originalPurchasePriceRangeRule.validator(inputs.originalPurchasePrice)) {
    errors.push(originalPurchasePriceRangeRule.message);
  }

  const originalDownPaymentRule = ValidationRuleFactory.required('originalDownPayment', 'Original down payment is required');
  if (!originalDownPaymentRule.validator(inputs.originalDownPayment)) {
    errors.push(originalDownPaymentRule.message);
  }

  const originalDownPaymentNonNegativeRule = ValidationRuleFactory.nonNegative('originalDownPayment', 'Original down payment cannot be negative');
  if (!originalDownPaymentNonNegativeRule.validator(inputs.originalDownPayment)) {
    errors.push(originalDownPaymentNonNegativeRule.message);
  }

  const originalDownPaymentRangeRule = ValidationRuleFactory.range('originalDownPayment', 0, 5000000, 'Original down payment must be between $0 and $5,000,000');
  if (!originalDownPaymentRangeRule.validator(inputs.originalDownPayment)) {
    errors.push(originalDownPaymentRangeRule.message);
  }

  const currentMortgageBalanceRule = ValidationRuleFactory.required('currentMortgageBalance', 'Current mortgage balance is required');
  if (!currentMortgageBalanceRule.validator(inputs.currentMortgageBalance)) {
    errors.push(currentMortgageBalanceRule.message);
  }

  const currentMortgageBalanceNonNegativeRule = ValidationRuleFactory.nonNegative('currentMortgageBalance', 'Current mortgage balance cannot be negative');
  if (!currentMortgageBalanceNonNegativeRule.validator(inputs.currentMortgageBalance)) {
    errors.push(currentMortgageBalanceNonNegativeRule.message);
  }

  const currentMortgageBalanceRangeRule = ValidationRuleFactory.range('currentMortgageBalance', 0, 10000000, 'Current mortgage balance must be between $0 and $10,000,000');
  if (!currentMortgageBalanceRangeRule.validator(inputs.currentMortgageBalance)) {
    errors.push(currentMortgageBalanceRangeRule.message);
  }

  // Optional field validations
  if (inputs.propertyImprovements !== undefined) {
    const propertyImprovementsRule = ValidationRuleFactory.nonNegative('propertyImprovements', 'Property improvements cannot be negative');
    if (!propertyImprovementsRule.validator(inputs.propertyImprovements)) {
      errors.push(propertyImprovementsRule.message);
    }

    const propertyImprovementsRangeRule = ValidationRuleFactory.range('propertyImprovements', 0, 2000000, 'Property improvements must be between $0 and $2,000,000');
    if (!propertyImprovementsRangeRule.validator(inputs.propertyImprovements)) {
      errors.push(propertyImprovementsRangeRule.message);
    }
  }

  if (inputs.marketAppreciation !== undefined) {
    const marketAppreciationRangeRule = ValidationRuleFactory.range('marketAppreciation', -50, 200, 'Market appreciation must be between -50% and 200%');
    if (!marketAppreciationRangeRule.validator(inputs.marketAppreciation)) {
      errors.push(marketAppreciationRangeRule.message);
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

  if (inputs.remainingLoanTerm !== undefined) {
    const remainingLoanTermRule = ValidationRuleFactory.positive('remainingLoanTerm', 'Remaining loan term must be positive');
    if (!remainingLoanTermRule.validator(inputs.remainingLoanTerm)) {
      errors.push(remainingLoanTermRule.message);
    }

    const remainingLoanTermRangeRule = ValidationRuleFactory.range('remainingLoanTerm', 1, 50, 'Remaining loan term must be between 1 and 50 years');
    if (!remainingLoanTermRangeRule.validator(inputs.remainingLoanTerm)) {
      errors.push(remainingLoanTermRangeRule.message);
    }
  }

  if (inputs.creditScore !== undefined) {
    const creditScoreRangeRule = ValidationRuleFactory.range('creditScore', 300, 850, 'Credit score must be between 300 and 850');
    if (!creditScoreRangeRule.validator(inputs.creditScore)) {
      errors.push(creditScoreRangeRule.message);
    }
  }

  if (inputs.debtToIncomeRatio !== undefined) {
    const debtToIncomeRatioRule = ValidationRuleFactory.nonNegative('debtToIncomeRatio', 'Debt-to-income ratio cannot be negative');
    if (!debtToIncomeRatioRule.validator(inputs.debtToIncomeRatio)) {
      errors.push(debtToIncomeRatioRule.message);
    }

    const debtToIncomeRatioRangeRule = ValidationRuleFactory.range('debtToIncomeRatio', 0, 100, 'Debt-to-income ratio must be between 0% and 100%');
    if (!debtToIncomeRatioRangeRule.validator(inputs.debtToIncomeRatio)) {
      errors.push(debtToIncomeRatioRangeRule.message);
    }
  }

  // Fee validations
  const feeFields = [
    'propertyTaxes', 'homeInsurance', 'hoaFees', 'maintenanceCosts', 'rentalIncome', 'monthlyPayment'
  ];

  feeFields.forEach(field => {
    const value = inputs[field as keyof MortgageEquityInputs];
    if (value !== undefined) {
      const nonNegativeRule = ValidationRuleFactory.nonNegative(field, `${field} cannot be negative`);
      if (!nonNegativeRule.validator(value)) {
        errors.push(nonNegativeRule.message);
      }
    }
  });

  // Business logic validations
  if (inputs.currentPropertyValue && inputs.currentMortgageBalance) {
    if (inputs.currentMortgageBalance > inputs.currentPropertyValue) {
      errors.push('Current mortgage balance cannot exceed current property value');
    }
  }

  if (inputs.originalPurchasePrice && inputs.originalDownPayment) {
    if (inputs.originalDownPayment >= inputs.originalPurchasePrice) {
      errors.push('Original down payment cannot be greater than or equal to original purchase price');
    }
  }

  if (inputs.currentPropertyValue && inputs.originalPurchasePrice && inputs.propertyImprovements) {
    const totalInvestment = inputs.originalPurchasePrice + inputs.propertyImprovements;
    if (inputs.currentPropertyValue < totalInvestment * 0.5) {
      errors.push('Current property value seems unusually low compared to purchase price and improvements');
    }
  }

  if (inputs.currentPropertyValue && inputs.originalPurchasePrice) {
    const appreciationRate = ((inputs.currentPropertyValue - inputs.originalPurchasePrice) / inputs.originalPurchasePrice) * 100;
    if (appreciationRate > 500) {
      errors.push('Property appreciation rate seems unusually high - please verify current property value');
    }
    if (appreciationRate < -80) {
      errors.push('Property depreciation rate seems unusually high - please verify current property value');
    }
  }

  if (inputs.currentMortgageBalance && inputs.originalPurchasePrice && inputs.originalDownPayment) {
    const originalLoan = inputs.originalPurchasePrice - inputs.originalDownPayment;
    if (inputs.currentMortgageBalance > originalLoan) {
      errors.push('Current mortgage balance cannot exceed original loan amount');
    }
  }

  // Occupancy type validations
  if (inputs.occupancyType) {
    const occupancyTypeErrors = validateOccupancyTypeRequirements(inputs);
    errors.push(...occupancyTypeErrors);
  }

  // Loan type validations
  if (inputs.loanType) {
    const loanTypeErrors = validateLoanTypeRequirements(inputs);
    errors.push(...loanTypeErrors);
  }

  // Property type validations
  if (inputs.propertyType) {
    const propertyTypeErrors = validatePropertyTypeRequirements(inputs);
    errors.push(...propertyTypeErrors);
  }

  // State-specific validations
  if (inputs.state) {
    const stateErrors = validateStateRequirements(inputs);
    errors.push(...stateErrors);
  }

  return errors;
}

function validateOccupancyTypeRequirements(inputs: MortgageEquityInputs): string[] {
  const errors: string[] = [];
  const { occupancyType, rentalIncome, creditScore, debtToIncomeRatio } = inputs;

  switch (occupancyType) {
    case 'Investment Property':
      if (rentalIncome === 0 || rentalIncome === undefined) {
        errors.push('Investment properties should have rental income for accurate equity analysis');
      }
      if (creditScore && creditScore < 700) {
        errors.push('Investment properties typically require higher credit scores');
      }
      if (debtToIncomeRatio && debtToIncomeRatio > 45) {
        errors.push('Investment properties typically require lower DTI ratios');
      }
      break;

    case 'Secondary Home':
      if (rentalIncome && rentalIncome > 0) {
        errors.push('Secondary homes typically do not generate rental income');
      }
      if (creditScore && creditScore < 680) {
        errors.push('Secondary homes typically require good credit scores');
      }
      break;

    case 'Primary Residence':
      // No specific validation rules for primary residence
      break;
  }

  return errors;
}

function validateLoanTypeRequirements(inputs: MortgageEquityInputs): string[] {
  const errors: string[] = [];
  const { loanType, currentPropertyValue, occupancyType, creditScore } = inputs;

  switch (loanType) {
    case 'FHA':
      if (occupancyType && occupancyType !== 'Primary Residence') {
        errors.push('FHA loans are only available for primary residences');
      }
      if (currentPropertyValue && currentPropertyValue > 472030) {
        errors.push('FHA loan amount exceeds the 2024 limit of $472,030 for most areas');
      }
      break;

    case 'VA':
      if (occupancyType && occupancyType !== 'Primary Residence') {
        errors.push('VA loans are only available for primary residences');
      }
      if (currentPropertyValue && currentPropertyValue > 766550) {
        errors.push('VA loan amount exceeds the 2024 limit of $766,550 for most areas');
      }
      break;

    case 'USDA':
      if (occupancyType && occupancyType !== 'Primary Residence') {
        errors.push('USDA loans are only available for primary residences');
      }
      if (currentPropertyValue && currentPropertyValue > 379500) {
        errors.push('USDA loan amount exceeds the 2024 limit of $379,500 for most areas');
      }
      break;

    case 'Jumbo':
      if (currentPropertyValue && currentPropertyValue < 766550) {
        errors.push('Jumbo loans typically start at $766,550 (2024 conventional limit)');
      }
      if (creditScore && creditScore < 700) {
        errors.push('Jumbo loans typically require credit score of 700 or higher');
      }
      break;
  }

  return errors;
}

function validatePropertyTypeRequirements(inputs: MortgageEquityInputs): string[] {
  const errors: string[] = [];
  const { propertyType, hoaFees, rentalIncome } = inputs;

  switch (propertyType) {
    case 'Condo':
      if (hoaFees === 0 || hoaFees === undefined) {
        errors.push('Condos typically have HOA fees');
      }
      break;

    case 'Multi-Family':
      if (rentalIncome === 0 || rentalIncome === undefined) {
        errors.push('Multi-family properties typically generate rental income');
      }
      break;

    case 'Land':
      if (rentalIncome && rentalIncome > 0) {
        errors.push('Land typically does not generate rental income');
      }
      if (hoaFees && hoaFees > 0) {
        errors.push('Land typically does not have HOA fees');
      }
      break;
  }

  return errors;
}

function validateStateRequirements(inputs: MortgageEquityInputs): string[] {
  const errors: string[] = [];
  const { state, currentPropertyValue, propertyTaxes } = inputs;

  // State-specific loan limits and requirements
  const stateLimits: { [key: string]: number } = {
    'AK': 1149000,
    'HI': 1149000,
    'CA': 1149000,
    'NY': 1149000,
    'DC': 1149000
  };

  if (state && stateLimits[state] && currentPropertyValue && currentPropertyValue > stateLimits[state]) {
    errors.push(`Property value exceeds the ${state} high-cost area limit of $${stateLimits[state].toLocaleString()}`);
  }

  // State-specific property tax validations
  if (state && propertyTaxes) {
    const stateTaxRates: { [key: string]: { min: number; max: number } } = {
      'NJ': { min: 1000, max: 50000 },
      'TX': { min: 500, max: 30000 },
      'CA': { min: 800, max: 25000 },
      'NY': { min: 1200, max: 40000 }
    };

    if (stateTaxRates[state]) {
      const { min, max } = stateTaxRates[state];
      if (propertyTaxes < min || propertyTaxes > max) {
        errors.push(`${state} property taxes should typically be between $${min.toLocaleString()} and $${max.toLocaleString()}`);
      }
    }
  }

  return errors;
}

export function validateEquityReasonableness(inputs: MortgageEquityInputs): string[] {
  const errors: string[] = [];
  const { currentPropertyValue, currentMortgageBalance, originalPurchasePrice, originalDownPayment } = inputs;

  // Calculate equity
  const totalEquity = currentPropertyValue - currentMortgageBalance;
  const equityPercentage = (totalEquity / currentPropertyValue) * 100;

  // Reasonableness checks
  if (equityPercentage > 95) {
    errors.push('Equity percentage seems unusually high - please verify property value and mortgage balance');
  }

  if (equityPercentage < 5) {
    errors.push('Very low equity - consider building equity before additional borrowing');
  }

  // Check for reasonable property value changes
  if (currentPropertyValue && originalPurchasePrice) {
    const valueChange = ((currentPropertyValue - originalPurchasePrice) / originalPurchasePrice) * 100;
    if (valueChange > 300) {
      errors.push('Property value increase seems unusually high - please verify current value');
    }
    if (valueChange < -50) {
      errors.push('Property value decrease seems unusually high - please verify current value');
    }
  }

  // Check for reasonable mortgage balance
  if (currentMortgageBalance && originalPurchasePrice && originalDownPayment) {
    const originalLoan = originalPurchasePrice - originalDownPayment;
    if (currentMortgageBalance > originalLoan) {
      errors.push('Current mortgage balance cannot exceed original loan amount');
    }
  }

  return errors;
}

export function validateRefinancingEligibility(inputs: MortgageEquityInputs): string[] {
  const errors: string[] = [];
  const { currentPropertyValue, currentMortgageBalance, creditScore, debtToIncomeRatio, occupancyType } = inputs;

  const totalEquity = currentPropertyValue - currentMortgageBalance;
  const equityPercentage = (totalEquity / currentPropertyValue) * 100;
  const ltvRatio = (currentMortgageBalance / currentPropertyValue) * 100;

  // Refinancing eligibility checks
  if (equityPercentage < 20) {
    errors.push('Insufficient equity for most refinancing options - need at least 20% equity');
  }

  if (ltvRatio > 80) {
    errors.push('High LTV ratio - may need to pay PMI or consider FHA refinancing');
  }

  if (creditScore && creditScore < 620) {
    errors.push('Low credit score - may not qualify for refinancing');
  }

  if (debtToIncomeRatio && debtToIncomeRatio > 43) {
    errors.push('High DTI ratio - may not qualify for refinancing');
  }

  if (occupancyType === 'Investment Property' && equityPercentage < 25) {
    errors.push('Investment properties typically need at least 25% equity for refinancing');
  }

  return errors;
}

export function validateEquityUtilization(inputs: MortgageEquityInputs): string[] {
  const errors: string[] = [];
  const { totalEquity, borrowableEquity, occupancyType, creditScore, debtToIncomeRatio } = inputs;

  // Equity utilization checks
  if (borrowableEquity > totalEquity * 0.9) {
    errors.push('Borrowable equity exceeds 90% of total equity - consider more conservative approach');
  }

  if (occupancyType === 'Investment Property' && borrowableEquity > totalEquity * 0.75) {
    errors.push('Investment property borrowable equity should not exceed 75% of total equity');
  }

  if (creditScore && creditScore < 680 && borrowableEquity > totalEquity * 0.8) {
    errors.push('Lower credit scores typically result in reduced borrowable equity');
  }

  if (debtToIncomeRatio && debtToIncomeRatio > 43 && borrowableEquity > totalEquity * 0.8) {
    errors.push('Higher DTI ratios typically result in reduced borrowable equity');
  }

  return errors;
}