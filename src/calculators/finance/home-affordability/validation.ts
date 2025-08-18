import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateHomeAffordabilityInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.annualIncome) {
    errors.push('Annual income is required');
  }
  if (!inputs.downPayment) {
    errors.push('Down payment is required');
  }
  if (!inputs.interestRate) {
    errors.push('Interest rate is required');
  }
  if (!inputs.loanTerm) {
    errors.push('Loan term is required');
  }
  if (!inputs.loanType) {
    errors.push('Loan type is required');
  }

  // Numerical range validation
  if (inputs.annualIncome && (inputs.annualIncome < 10000 || inputs.annualIncome > 10000000)) {
    errors.push('Annual income must be between $10,000 and $10,000,000');
  }

  if (inputs.monthlyIncome && (inputs.monthlyIncome < 833 || inputs.monthlyIncome > 833333)) {
    errors.push('Monthly income must be between $833 and $833,333');
  }

  if (inputs.downPayment && (inputs.downPayment < 0 || inputs.downPayment > 10000000)) {
    errors.push('Down payment must be between $0 and $10,000,000');
  }

  if (inputs.downPaymentPercent && (inputs.downPaymentPercent < 0 || inputs.downPaymentPercent > 100)) {
    errors.push('Down payment percentage must be between 0% and 100%');
  }

  if (inputs.interestRate && (inputs.interestRate < 1 || inputs.interestRate > 20)) {
    errors.push('Interest rate must be between 1% and 20%');
  }

  if (inputs.loanTerm && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  if (inputs.monthlyDebtPayments && (inputs.monthlyDebtPayments < 0 || inputs.monthlyDebtPayments > 100000)) {
    errors.push('Monthly debt payments must be between $0 and $100,000');
  }

  if (inputs.annualPropertyTaxes && (inputs.annualPropertyTaxes < 0 || inputs.annualPropertyTaxes > 100000)) {
    errors.push('Annual property taxes must be between $0 and $100,000');
  }

  if (inputs.annualHomeownersInsurance && (inputs.annualHomeownersInsurance < 0 || inputs.annualHomeownersInsurance > 50000)) {
    errors.push('Annual homeowners insurance must be between $0 and $50,000');
  }

  if (inputs.monthlyHoaFees && (inputs.monthlyHoaFees < 0 || inputs.monthlyHoaFees > 5000)) {
    errors.push('Monthly HOA fees must be between $0 and $5,000');
  }

  if (inputs.monthlyUtilities && (inputs.monthlyUtilities < 0 || inputs.monthlyUtilities > 2000)) {
    errors.push('Monthly utilities must be between $0 and $2,000');
  }

  if (inputs.monthlyMaintenance && (inputs.monthlyMaintenance < 0 || inputs.monthlyMaintenance > 5000)) {
    errors.push('Monthly maintenance must be between $0 and $5,000');
  }

  if (inputs.creditScore && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    errors.push('Credit score must be between 300 and 850');
  }

  if (inputs.debtToIncomeRatio && (inputs.debtToIncomeRatio < 20 || inputs.debtToIncomeRatio > 50)) {
    errors.push('Target DTI ratio must be between 20% and 50%');
  }

  if (inputs.frontEndDTI && (inputs.frontEndDTI < 20 || inputs.frontEndDTI > 40)) {
    errors.push('Front-end DTI must be between 20% and 40%');
  }

  if (inputs.backEndDTI && (inputs.backEndDTI < 25 || inputs.backEndDTI > 50)) {
    errors.push('Back-end DTI must be between 25% and 50%');
  }

  if (inputs.propertyTaxRate && (inputs.propertyTaxRate < 0 || inputs.propertyTaxRate > 5)) {
    errors.push('Property tax rate must be between 0% and 5%');
  }

  if (inputs.insuranceRate && (inputs.insuranceRate < 0 || inputs.insuranceRate > 2)) {
    errors.push('Insurance rate must be between 0% and 2%');
  }

  if (inputs.pmiRate && (inputs.pmiRate < 0 || inputs.pmiRate > 2)) {
    errors.push('PMI rate must be between 0% and 2%');
  }

  if (inputs.closingCosts && (inputs.closingCosts < 0 || inputs.closingCosts > 50000)) {
    errors.push('Closing costs must be between $0 and $50,000');
  }

  if (inputs.closingCostsPercent && (inputs.closingCostsPercent < 0 || inputs.closingCostsPercent > 10)) {
    errors.push('Closing costs percentage must be between 0% and 10%');
  }

  if (inputs.reserves && (inputs.reserves < 0 || inputs.reserves > 24)) {
    errors.push('Required reserves must be between 0 and 24 months');
  }

  if (inputs.emergencyFund && (inputs.emergencyFund < 0 || inputs.emergencyFund > 1000000)) {
    errors.push('Emergency fund must be between $0 and $1,000,000');
  }

  if (inputs.inflationRate && (inputs.inflationRate < 0 || inputs.inflationRate > 10)) {
    errors.push('Inflation rate must be between 0% and 10%');
  }

  if (inputs.incomeGrowthRate && (inputs.incomeGrowthRate < 0 || inputs.incomeGrowthRate > 20)) {
    errors.push('Income growth rate must be between 0% and 20%');
  }

  if (inputs.homeAppreciationRate && (inputs.homeAppreciationRate < 0 || inputs.homeAppreciationRate > 15)) {
    errors.push('Home appreciation rate must be between 0% and 15%');
  }

  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  // Logical relationship validation
  if (inputs.monthlyIncome && inputs.annualIncome) {
    const calculatedMonthlyIncome = inputs.annualIncome / 12;
    const difference = Math.abs(inputs.monthlyIncome - calculatedMonthlyIncome);
    if (difference > calculatedMonthlyIncome * 0.1) {
      errors.push('Monthly income should be approximately annual income divided by 12');
    }
  }

  if (inputs.downPayment && inputs.downPaymentPercent && inputs.maxHomePrice) {
    const calculatedDownPayment = inputs.maxHomePrice * (inputs.downPaymentPercent / 100);
    const difference = Math.abs(inputs.downPayment - calculatedDownPayment);
    if (difference > calculatedDownPayment * 0.1) {
      errors.push('Down payment should be approximately down payment percentage of home price');
    }
  }

  if (inputs.frontEndDTI && inputs.backEndDTI && inputs.frontEndDTI > inputs.backEndDTI) {
    errors.push('Front-end DTI cannot exceed back-end DTI');
  }

  if (inputs.monthlyIncome && inputs.monthlyDebtPayments && inputs.monthlyDebtPayments > inputs.monthlyIncome) {
    errors.push('Monthly debt payments cannot exceed monthly income');
  }

  // Enum validation
  const validLoanTypes = ['conventional', 'fha', 'va', 'usda'];
  if (inputs.loanType && !validLoanTypes.includes(inputs.loanType)) {
    errors.push('Invalid loan type. Must be one of: conventional, fha, va, usda');
  }

  const validPropertyTypes = ['single-family', 'condo', 'townhouse', 'multi-family', 'manufactured'];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Invalid property type. Must be one of: single-family, condo, townhouse, multi-family, manufactured');
  }

  const validOccupancyTypes = ['primary-residence', 'second-home', 'investment-property'];
  if (inputs.occupancyType && !validOccupancyTypes.includes(inputs.occupancyType)) {
    errors.push('Invalid occupancy type. Must be one of: primary-residence, second-home, investment-property');
  }

  const validLocations = ['urban', 'suburban', 'rural'];
  if (inputs.location && !validLocations.includes(inputs.location)) {
    errors.push('Invalid location. Must be one of: urban, suburban, rural');
  }

  const validMarketTypes = ['hot', 'stable', 'declining'];
  if (inputs.marketType && !validMarketTypes.includes(inputs.marketType)) {
    errors.push('Invalid market type. Must be one of: hot, stable, declining');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateHomeAffordabilityInput(field: string, value: any): string | null {
  switch (field) {
    case 'annualIncome':
      if (!value) return 'Annual income is required';
      if (typeof value !== 'number') return 'Annual income must be a number';
      if (value < 10000 || value > 10000000) return 'Annual income must be between $10,000 and $10,000,000';
      break;

    case 'monthlyIncome':
      if (value && typeof value !== 'number') return 'Monthly income must be a number';
      if (value && (value < 833 || value > 833333)) return 'Monthly income must be between $833 and $833,333';
      break;

    case 'downPayment':
      if (!value) return 'Down payment is required';
      if (typeof value !== 'number') return 'Down payment must be a number';
      if (value < 0 || value > 10000000) return 'Down payment must be between $0 and $10,000,000';
      break;

    case 'downPaymentPercent':
      if (value && typeof value !== 'number') return 'Down payment percentage must be a number';
      if (value && (value < 0 || value > 100)) return 'Down payment percentage must be between 0% and 100%';
      break;

    case 'interestRate':
      if (!value) return 'Interest rate is required';
      if (typeof value !== 'number') return 'Interest rate must be a number';
      if (value < 1 || value > 20) return 'Interest rate must be between 1% and 20%';
      break;

    case 'loanTerm':
      if (!value) return 'Loan term is required';
      if (typeof value !== 'number') return 'Loan term must be a number';
      if (value < 1 || value > 50) return 'Loan term must be between 1 and 50 years';
      break;

    case 'monthlyDebtPayments':
      if (value && typeof value !== 'number') return 'Monthly debt payments must be a number';
      if (value && (value < 0 || value > 100000)) return 'Monthly debt payments must be between $0 and $100,000';
      break;

    case 'creditScore':
      if (value && typeof value !== 'number') return 'Credit score must be a number';
      if (value && (value < 300 || value > 850)) return 'Credit score must be between 300 and 850';
      break;

    case 'loanType':
      if (!value) return 'Loan type is required';
      const validLoanTypes = ['conventional', 'fha', 'va', 'usda'];
      if (!validLoanTypes.includes(value)) return 'Invalid loan type. Must be one of: conventional, fha, va, usda';
      break;

    case 'propertyType':
      if (value) {
        const validPropertyTypes = ['single-family', 'condo', 'townhouse', 'multi-family', 'manufactured'];
        if (!validPropertyTypes.includes(value)) return 'Invalid property type. Must be one of: single-family, condo, townhouse, multi-family, manufactured';
      }
      break;

    case 'occupancyType':
      if (value) {
        const validOccupancyTypes = ['primary-residence', 'second-home', 'investment-property'];
        if (!validOccupancyTypes.includes(value)) return 'Invalid occupancy type. Must be one of: primary-residence, second-home, investment-property';
      }
      break;

    case 'location':
      if (value) {
        const validLocations = ['urban', 'suburban', 'rural'];
        if (!validLocations.includes(value)) return 'Invalid location. Must be one of: urban, suburban, rural';
      }
      break;

    case 'marketType':
      if (value) {
        const validMarketTypes = ['hot', 'stable', 'declining'];
        if (!validMarketTypes.includes(value)) return 'Invalid market type. Must be one of: hot, stable, declining';
      }
      break;
  }

  return null;
}
