import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateRentalPropertyROIInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  if (!inputs.purchasePrice || inputs.purchasePrice <= 0) {
    errors.push('Purchase price is required and must be greater than 0');
  }

  if (!inputs.downPayment || inputs.downPayment <= 0) {
    errors.push('Down payment is required and must be greater than 0');
  }

  if (!inputs.closingCosts || inputs.closingCosts < 0) {
    errors.push('Closing costs are required and must be non-negative');
  }

  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount is required and must be greater than 0');
  }

  if (!inputs.interestRate || inputs.interestRate < 0) {
    errors.push('Interest rate is required and must be non-negative');
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.push('Loan term is required and must be greater than 0');
  }

  if (!inputs.monthlyRent || inputs.monthlyRent <= 0) {
    errors.push('Monthly rent is required and must be greater than 0');
  }

  // Data type validation
  if (typeof inputs.purchasePrice !== 'number') {
    errors.push('Purchase price must be a number');
  }

  if (typeof inputs.downPayment !== 'number') {
    errors.push('Down payment must be a number');
  }

  if (typeof inputs.closingCosts !== 'number') {
    errors.push('Closing costs must be a number');
  }

  if (typeof inputs.loanAmount !== 'number') {
    errors.push('Loan amount must be a number');
  }

  if (typeof inputs.interestRate !== 'number') {
    errors.push('Interest rate must be a number');
  }

  if (typeof inputs.loanTerm !== 'number') {
    errors.push('Loan term must be a number');
  }

  if (typeof inputs.monthlyRent !== 'number') {
    errors.push('Monthly rent must be a number');
  }

  // Range validation
  if (inputs.purchasePrice && (inputs.purchasePrice < 0 || inputs.purchasePrice > 10000000)) {
    errors.push('Purchase price must be between $0 and $10,000,000');
  }

  if (inputs.downPayment && (inputs.downPayment < 0 || inputs.downPayment > 10000000)) {
    errors.push('Down payment must be between $0 and $10,000,000');
  }

  if (inputs.closingCosts && (inputs.closingCosts < 0 || inputs.closingCosts > 100000)) {
    errors.push('Closing costs must be between $0 and $100,000');
  }

  if (inputs.renovationCosts && (inputs.renovationCosts < 0 || inputs.renovationCosts > 500000)) {
    errors.push('Renovation costs must be between $0 and $500,000');
  }

  if (inputs.loanAmount && (inputs.loanAmount < 0 || inputs.loanAmount > 10000000)) {
    errors.push('Loan amount must be between $0 and $10,000,000');
  }

  if (inputs.interestRate && (inputs.interestRate < 0 || inputs.interestRate > 20)) {
    errors.push('Interest rate must be between 0% and 20%');
  }

  if (inputs.loanTerm && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  if (inputs.pmi && (inputs.pmi < 0 || inputs.pmi > 1000)) {
    errors.push('PMI must be between $0 and $1,000');
  }

  if (inputs.monthlyRent && (inputs.monthlyRent < 0 || inputs.monthlyRent > 50000)) {
    errors.push('Monthly rent must be between $0 and $50,000');
  }

  if (inputs.vacancyRate && (inputs.vacancyRate < 0 || inputs.vacancyRate > 50)) {
    errors.push('Vacancy rate must be between 0% and 50%');
  }

  if (inputs.rentGrowthRate && (inputs.rentGrowthRate < -10 || inputs.rentGrowthRate > 20)) {
    errors.push('Rent growth rate must be between -10% and 20%');
  }

  if (inputs.otherIncome && (inputs.otherIncome < 0 || inputs.otherIncome > 5000)) {
    errors.push('Other income must be between $0 and $5,000');
  }

  if (inputs.propertyTaxes && (inputs.propertyTaxes < 0 || inputs.propertyTaxes > 50000)) {
    errors.push('Property taxes must be between $0 and $50,000');
  }

  if (inputs.insurance && (inputs.insurance < 0 || inputs.insurance > 10000)) {
    errors.push('Insurance must be between $0 and $10,000');
  }

  if (inputs.hoaFees && (inputs.hoaFees < 0 || inputs.hoaFees > 2000)) {
    errors.push('HOA fees must be between $0 and $2,000');
  }

  if (inputs.utilities && (inputs.utilities < 0 || inputs.utilities > 2000)) {
    errors.push('Utilities must be between $0 and $2,000');
  }

  if (inputs.maintenance && (inputs.maintenance < 0 || inputs.maintenance > 5000)) {
    errors.push('Maintenance must be between $0 and $5,000');
  }

  if (inputs.propertyManagement && (inputs.propertyManagement < 0 || inputs.propertyManagement > 20)) {
    errors.push('Property management must be between 0% and 20%');
  }

  if (inputs.repairs && (inputs.repairs < 0 || inputs.repairs > 3000)) {
    errors.push('Repairs must be between $0 and $3,000');
  }

  if (inputs.landscaping && (inputs.landscaping < 0 || inputs.landscaping > 1000)) {
    errors.push('Landscaping must be between $0 and $1,000');
  }

  if (inputs.pestControl && (inputs.pestControl < 0 || inputs.pestControl > 500)) {
    errors.push('Pest control must be between $0 and $500');
  }

  if (inputs.squareFootage && (inputs.squareFootage < 0 || inputs.squareFootage > 100000)) {
    errors.push('Square footage must be between 0 and 100,000');
  }

  if (inputs.bedrooms && (inputs.bedrooms < 0 || inputs.bedrooms > 20)) {
    errors.push('Bedrooms must be between 0 and 20');
  }

  if (inputs.bathrooms && (inputs.bathrooms < 0 || inputs.bathrooms > 20)) {
    errors.push('Bathrooms must be between 0 and 20');
  }

  if (inputs.yearBuilt && (inputs.yearBuilt < 1800 || inputs.yearBuilt > 2030)) {
    errors.push('Year built must be between 1800 and 2030');
  }

  if (inputs.appreciationRate && (inputs.appreciationRate < -20 || inputs.appreciationRate > 20)) {
    errors.push('Appreciation rate must be between -20% and 20%');
  }

  if (inputs.inflationRate && (inputs.inflationRate < 0 || inputs.inflationRate > 10)) {
    errors.push('Inflation rate must be between 0% and 10%');
  }

  if (inputs.holdingPeriod && (inputs.holdingPeriod < 1 || inputs.holdingPeriod > 50)) {
    errors.push('Holding period must be between 1 and 50 years');
  }

  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  if (inputs.depreciationPeriod && (inputs.depreciationPeriod < 0 || inputs.depreciationPeriod > 50)) {
    errors.push('Depreciation period must be between 0 and 50 years');
  }

  if (inputs.sellingCosts && (inputs.sellingCosts < 0 || inputs.sellingCosts > 20)) {
    errors.push('Selling costs must be between 0% and 20%');
  }

  // Logical validation
  if (inputs.purchasePrice && inputs.downPayment && inputs.downPayment > inputs.purchasePrice) {
    errors.push('Down payment cannot exceed purchase price');
  }

  if (inputs.purchasePrice && inputs.loanAmount && inputs.downPayment) {
    const expectedLoanAmount = inputs.purchasePrice - inputs.downPayment;
    if (Math.abs(inputs.loanAmount - expectedLoanAmount) > 1000) {
      warnings.push('Loan amount should equal purchase price minus down payment');
    }
  }

  if (inputs.monthlyRent && inputs.purchasePrice) {
    const rentToPriceRatio = (inputs.monthlyRent * 12) / inputs.purchasePrice;
    if (rentToPriceRatio < 0.06) {
      warnings.push('RentToPrice ratio is low - may indicate poor cash flow');
    } else if (rentToPriceRatio > 0.15) {
      warnings.push('RentToPrice ratio is high - verify rent is realistic');
    }
  }

  if (inputs.vacancyRate && inputs.vacancyRate > 10) {
    warnings.push('High vacancy rate may indicate market issues');
  }

  if (inputs.appreciationRate && inputs.appreciationRate < 0) {
    warnings.push('Negative appreciation rate indicates declining market');
  }

  // Enum validation
  const validLoanTypes = ['conventional', 'fha', 'va', 'usda'];
  if (inputs.loanType && !validLoanTypes.includes(inputs.loanType)) {
    errors.push('Loan type must be one of: conventional, fha, va, usda');
  }

  const validPropertyTypes = ['single-family', 'condo', 'townhouse', 'duplex', 'triplex', 'fourplex', 'apartment', 'commercial'];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Property type must be one of: single-family, condo, townhouse, duplex, triplex, fourplex, apartment, commercial');
  }

  const validLocations = ['urban', 'suburban', 'rural'];
  if (inputs.location && !validLocations.includes(inputs.location)) {
    errors.push('Location must be one of: urban, suburban, rural');
  }

  const validMarketConditions = ['hot', 'stable', 'cooling', 'declining'];
  if (inputs.marketConditions && !validMarketConditions.includes(inputs.marketConditions)) {
    errors.push('Market conditions must be one of: hot, stable, cooling, declining');
  }

  const validExitStrategies = ['sell', 'refinance', '1031-exchange', 'HoldLongTerm'];
  if (inputs.exitStrategy && !validExitStrategies.includes(inputs.exitStrategy)) {
    errors.push('Exit strategy must be one of: sell, refinance, 1031-exchange, HoldLongTerm');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
