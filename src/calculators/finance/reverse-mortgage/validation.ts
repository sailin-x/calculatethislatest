import { ValidationRuleFactory } from '../../../utils/validation/ValidationRuleFactory';
import { ReverseMortgageInputs } from './formulas';

export function validateReverseMortgageInputs(inputs: ReverseMortgageInputs): string[] {
  const errors: string[] = [];
  const ruleFactory = new ValidationRuleFactory();

  // Required field validations
  if (!inputs.homeValue) {
    errors.push('Home value is required');
  } else {
    ruleFactory
      .createRule('homeValue')
      .isNumber()
      .min(100000, 'Home value must be at least $100,000')
      .max(10000000, 'Home value cannot exceed $10,000,000')
      .validate(inputs.homeValue, errors);
  }

  if (!inputs.borrowerAge) {
    errors.push('Borrower age is required');
  } else {
    ruleFactory
      .createRule('borrowerAge')
      .isNumber()
      .min(62, 'Borrower must be at least 62 years old')
      .max(100, 'Borrower age cannot exceed 100 years')
      .validate(inputs.borrowerAge, errors);
  }

  // Existing mortgage validation
  if (inputs.existingMortgage) {
    ruleFactory
      .createRule('existingMortgage')
      .isNumber()
      .min(0, 'Existing mortgage cannot be negative')
      .max(10000000, 'Existing mortgage cannot exceed $10,000,000')
      .validate(inputs.existingMortgage, errors);
  }

  // Co-borrower age validation
  if (inputs.coBorrowerAge) {
    ruleFactory
      .createRule('coBorrowerAge')
      .isNumber()
      .min(62, 'Co-borrower must be at least 62 years old')
      .max(100, 'Co-borrower age cannot exceed 100 years')
      .validate(inputs.coBorrowerAge, errors);
  }

  // Interest rate validation
  if (inputs.interestRate) {
    ruleFactory
      .createRule('interestRate')
      .isNumber()
      .min(0.1, 'Interest rate must be at least 0.1%')
      .max(15, 'Interest rate cannot exceed 15%')
      .validate(inputs.interestRate, errors);
  }

  // Payment type validation
  if (inputs.paymentType) {
    const validPaymentTypes = ['line-of-credit', 'monthly-payment', 'lump-sum', 'tenure-payment', 'term-payment'];
    if (!validPaymentTypes.includes(inputs.paymentType)) {
      errors.push('Invalid payment type selected');
    }
  }

  // Loan term validation
  if (inputs.loanTerm) {
    ruleFactory
      .createRule('loanTerm')
      .isNumber()
      .min(1, 'Loan term must be at least 1 year')
      .max(30, 'Loan term cannot exceed 30 years')
      .validate(inputs.loanTerm, errors);
  }

  // Monthly payment validation
  if (inputs.monthlyPayment) {
    ruleFactory
      .createRule('monthlyPayment')
      .isNumber()
      .min(100, 'Monthly payment must be at least $100')
      .max(50000, 'Monthly payment cannot exceed $50,000')
      .validate(inputs.monthlyPayment, errors);
  }

  // Lump sum amount validation
  if (inputs.lumpSumAmount) {
    ruleFactory
      .createRule('lumpSumAmount')
      .isNumber()
      .min(1000, 'Lump sum amount must be at least $1,000')
      .max(1000000, 'Lump sum amount cannot exceed $1,000,000')
      .validate(inputs.lumpSumAmount, errors);
  }

  // Property type validation
  if (inputs.propertyType) {
    const validPropertyTypes = ['single-family', 'condo', 'townhouse', 'duplex', 'multi-family', 'manufactured'];
    if (!validPropertyTypes.includes(inputs.propertyType)) {
      errors.push('Invalid property type selected');
    }
  }

  // Occupancy type validation
  if (inputs.occupancyType) {
    const validOccupancyTypes = ['primary-residence', 'second-home', 'investment'];
    if (!validOccupancyTypes.includes(inputs.occupancyType)) {
      errors.push('Invalid occupancy type selected');
    }
  }

  // Property location validation
  if (inputs.propertyLocation) {
    const validLocations = ['urban', 'suburban', 'rural'];
    if (!validLocations.includes(inputs.propertyLocation)) {
      errors.push('Invalid property location selected');
    }
  }

  // State validation
  if (inputs.state) {
    const validStates = ['california', 'florida', 'texas', 'new-york', 'illinois', 'pennsylvania', 'ohio', 'georgia', 'north-carolina', 'michigan'];
    if (!validStates.includes(inputs.state)) {
      errors.push('Invalid state selected');
    }
  }

  // Zip code validation
  if (inputs.zipCode) {
    ruleFactory
      .createRule('zipCode')
      .isString()
      .pattern(/^\d{5}(-\d{4})?$/, 'Invalid zip code format')
      .validate(inputs.zipCode, errors);
  }

  // Home appreciation rate validation
  if (inputs.homeAppreciationRate) {
    ruleFactory
      .createRule('homeAppreciationRate')
      .isNumber()
      .min(-50, 'Home appreciation rate cannot be less than -50%')
      .max(50, 'Home appreciation rate cannot exceed 50%')
      .validate(inputs.homeAppreciationRate, errors);
  }

  // Inflation rate validation
  if (inputs.inflationRate) {
    ruleFactory
      .createRule('inflationRate')
      .isNumber()
      .min(-50, 'Inflation rate cannot be less than -50%')
      .max(50, 'Inflation rate cannot exceed 50%')
      .validate(inputs.inflationRate, errors);
  }

  // Life expectancy validation
  if (inputs.lifeExpectancy) {
    ruleFactory
      .createRule('lifeExpectancy')
      .isNumber()
      .min(70, 'Life expectancy must be at least 70 years')
      .max(120, 'Life expectancy cannot exceed 120 years')
      .validate(inputs.lifeExpectancy, errors);
  }

  // Closing costs validation
  if (inputs.closingCosts) {
    ruleFactory
      .createRule('closingCosts')
      .isNumber()
      .min(0, 'Closing costs cannot be negative')
      .max(50000, 'Closing costs cannot exceed $50,000')
      .validate(inputs.closingCosts, errors);
  }

  // Servicing fees validation
  if (inputs.servicingFees) {
    ruleFactory
      .createRule('servicingFees')
      .isNumber()
      .min(0, 'Servicing fees cannot be negative')
      .max(1000, 'Servicing fees cannot exceed $1,000/month')
      .validate(inputs.servicingFees, errors);
  }

  // Mortgage insurance validation
  if (inputs.mortgageInsurance) {
    ruleFactory
      .createRule('mortgageInsurance')
      .isNumber()
      .min(0, 'Mortgage insurance rate cannot be negative')
      .max(5, 'Mortgage insurance rate cannot exceed 5%')
      .validate(inputs.mortgageInsurance, errors);
  }

  // Property tax rate validation
  if (inputs.propertyTaxRate) {
    ruleFactory
      .createRule('propertyTaxRate')
      .isNumber()
      .min(0, 'Property tax rate cannot be negative')
      .max(10, 'Property tax rate cannot exceed 10%')
      .validate(inputs.propertyTaxRate, errors);
  }

  // Home insurance rate validation
  if (inputs.homeInsuranceRate) {
    ruleFactory
      .createRule('homeInsuranceRate')
      .isNumber()
      .min(0, 'Home insurance rate cannot be negative')
      .max(5, 'Home insurance rate cannot exceed 5%')
      .validate(inputs.homeInsuranceRate, errors);
  }

  // Maintenance rate validation
  if (inputs.maintenanceRate) {
    ruleFactory
      .createRule('maintenanceRate')
      .isNumber()
      .min(0, 'Maintenance rate cannot be negative')
      .max(10, 'Maintenance rate cannot exceed 10%')
      .validate(inputs.maintenanceRate, errors);
  }

  // HOA fees validation
  if (inputs.hoaFees) {
    ruleFactory
      .createRule('hoaFees')
      .isNumber()
      .min(0, 'HOA fees cannot be negative')
      .max(5000, 'HOA fees cannot exceed $5,000/month')
      .validate(inputs.hoaFees, errors);
  }

  // Credit score validation
  if (inputs.creditScore) {
    ruleFactory
      .createRule('creditScore')
      .isNumber()
      .min(300, 'Credit score must be at least 300')
      .max(850, 'Credit score cannot exceed 850')
      .validate(inputs.creditScore, errors);
  }

  // Income validation
  if (inputs.income) {
    ruleFactory
      .createRule('income')
      .isNumber()
      .min(0, 'Income cannot be negative')
      .max(100000, 'Income cannot exceed $100,000/month')
      .validate(inputs.income, errors);
  }

  // Expenses validation
  if (inputs.expenses) {
    ruleFactory
      .createRule('expenses')
      .isNumber()
      .min(0, 'Expenses cannot be negative')
      .max(100000, 'Expenses cannot exceed $100,000/month')
      .validate(inputs.expenses, errors);
  }

  // Other assets validation
  if (inputs.otherAssets) {
    ruleFactory
      .createRule('otherAssets')
      .isNumber()
      .min(0, 'Other assets cannot be negative')
      .max(10000000, 'Other assets cannot exceed $10,000,000')
      .validate(inputs.otherAssets, errors);
  }

  // Other debts validation
  if (inputs.otherDebts) {
    ruleFactory
      .createRule('otherDebts')
      .isNumber()
      .min(0, 'Other debts cannot be negative')
      .max(1000000, 'Other debts cannot exceed $1,000,000')
      .validate(inputs.otherDebts, errors);
  }

  // Health status validation
  if (inputs.healthStatus) {
    const validHealthStatuses = ['excellent', 'good', 'fair', 'poor'];
    if (!validHealthStatuses.includes(inputs.healthStatus)) {
      errors.push('Invalid health status selected');
    }
  }

  // Family history validation
  if (inputs.familyHistory) {
    const validFamilyHistories = ['excellent', 'good', 'average', 'poor'];
    if (!validFamilyHistories.includes(inputs.familyHistory)) {
      errors.push('Invalid family history selected');
    }
  }

  // Market conditions validation
  if (inputs.marketConditions) {
    const validMarketConditions = ['buyers-market', 'normal', 'sellers-market', 'hot-market'];
    if (!validMarketConditions.includes(inputs.marketConditions)) {
      errors.push('Invalid market conditions selected');
    }
  }

  // Loan purpose validation
  if (inputs.loanPurpose) {
    const validLoanPurposes = ['supplement-income', 'pay-off-debts', 'home-improvements', 'medical-expenses', 'travel', 'emergency-fund', 'other'];
    if (!validLoanPurposes.includes(inputs.loanPurpose)) {
      errors.push('Invalid loan purpose selected');
    }
  }

  // Business logic validations
  if (inputs.homeValue && inputs.existingMortgage) {
    if (inputs.existingMortgage > inputs.homeValue * 0.8) {
      errors.push('Existing mortgage should not exceed 80% of home value');
    }
  }

  if (inputs.borrowerAge && inputs.coBorrowerAge) {
    if (Math.min(inputs.borrowerAge, inputs.coBorrowerAge) < 62) {
      errors.push('Youngest borrower must be at least 62 years old');
    }
  }

  if (inputs.paymentType === 'lump-sum' && inputs.lumpSumAmount) {
    if (inputs.lumpSumAmount > (inputs.homeValue || 0) * 0.6) {
      errors.push('Lump sum amount should not exceed 60% of home value');
    }
  }

  if (inputs.paymentType === 'monthly-payment' && inputs.monthlyPayment && inputs.loanTerm) {
    const maxMonthlyPayment = (inputs.homeValue || 0) * 0.01 / inputs.loanTerm;
    if (inputs.monthlyPayment > maxMonthlyPayment) {
      errors.push('Monthly payment amount appears too high for the loan term');
    }
  }

  if (inputs.occupancyType === 'investment') {
    errors.push('Investment properties are not eligible for reverse mortgages');
  }

  if (inputs.homeValue && inputs.homeValue < 100000) {
    errors.push('Home value must be at least $100,000 for reverse mortgage eligibility');
  }

  if (inputs.income && inputs.expenses && inputs.income < inputs.expenses * 0.5) {
    errors.push('Income appears insufficient to maintain property and living expenses');
  }

  if (inputs.otherDebts && inputs.otherDebts > (inputs.homeValue || 0) * 0.5) {
    errors.push('Other debts should not exceed 50% of home value');
  }

  return errors;
}