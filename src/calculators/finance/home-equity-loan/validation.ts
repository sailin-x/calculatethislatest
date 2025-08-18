import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateHomeEquityLoanInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.homeValue) {
    errors.push('Home value is required');
  }
  if (!inputs.currentMortgageBalance) {
    errors.push('Current mortgage balance is required');
  }
  if (!inputs.loanAmount) {
    errors.push('Loan amount is required');
  }
  if (!inputs.interestRate) {
    errors.push('Interest rate is required');
  }
  if (!inputs.loanTerm) {
    errors.push('Loan term is required');
  }

  // Numerical range validation
  if (inputs.homeValue && (inputs.homeValue < 10000 || inputs.homeValue > 10000000)) {
    errors.push('Home value must be between $10,000 and $10,000,000');
  }

  if (inputs.currentMortgageBalance && (inputs.currentMortgageBalance < 0 || inputs.currentMortgageBalance > 10000000)) {
    errors.push('Current mortgage balance must be between $0 and $10,000,000');
  }

  if (inputs.loanAmount && (inputs.loanAmount < 1000 || inputs.loanAmount > 1000000)) {
    errors.push('Loan amount must be between $1,000 and $1,000,000');
  }

  if (inputs.interestRate && (inputs.interestRate < 1 || inputs.interestRate > 20)) {
    errors.push('Interest rate must be between 1% and 20%');
  }

  if (inputs.loanTerm && (inputs.loanTerm < 1 || inputs.loanTerm > 30)) {
    errors.push('Loan term must be between 1 and 30 years');
  }

  if (inputs.maxLTV && (inputs.maxLTV < 50 || inputs.maxLTV > 95)) {
    errors.push('Maximum LTV must be between 50% and 95%');
  }

  if (inputs.maxCLTV && (inputs.maxCLTV < 50 || inputs.maxCLTV > 95)) {
    errors.push('Maximum CLTV must be between 50% and 95%');
  }

  if (inputs.originationFee && (inputs.originationFee < 0 || inputs.originationFee > 5000)) {
    errors.push('Origination fee must be between $0 and $5,000');
  }

  if (inputs.appraisalFee && (inputs.appraisalFee < 0 || inputs.appraisalFee > 1000)) {
    errors.push('Appraisal fee must be between $0 and $1,000');
  }

  if (inputs.titleFees && (inputs.titleFees < 0 || inputs.titleFees > 2000)) {
    errors.push('Title fees must be between $0 and $2,000');
  }

  if (inputs.closingCosts && (inputs.closingCosts < 0 || inputs.closingCosts > 5000)) {
    errors.push('Closing costs must be between $0 and $5,000');
  }

  if (inputs.creditScore && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    errors.push('Credit score must be between 300 and 850');
  }

  if (inputs.debtToIncomeRatio && (inputs.debtToIncomeRatio < 0 || inputs.debtToIncomeRatio > 100)) {
    errors.push('Debt-to-income ratio must be between 0% and 100%');
  }

  if (inputs.monthlyIncome && (inputs.monthlyIncome < 1000 || inputs.monthlyIncome > 1000000)) {
    errors.push('Monthly income must be between $1,000 and $1,000,000');
  }

  if (inputs.monthlyDebtPayments && (inputs.monthlyDebtPayments < 0 || inputs.monthlyDebtPayments > 100000)) {
    errors.push('Monthly debt payments must be between $0 and $100,000');
  }

  if (inputs.propertyTaxes && (inputs.propertyTaxes < 0 || inputs.propertyTaxes > 100000)) {
    errors.push('Annual property taxes must be between $0 and $100,000');
  }

  if (inputs.homeownersInsurance && (inputs.homeownersInsurance < 0 || inputs.homeownersInsurance > 50000)) {
    errors.push('Annual homeowners insurance must be between $0 and $50,000');
  }

  if (inputs.hoaFees && (inputs.hoaFees < 0 || inputs.hoaFees > 5000)) {
    errors.push('Monthly HOA fees must be between $0 and $5,000');
  }

  if (inputs.prepaymentPenalty && (inputs.prepaymentPenalty < 0 || inputs.prepaymentPenalty > 5)) {
    errors.push('Prepayment penalty must be between 0% and 5%');
  }

  if (inputs.lateFees && (inputs.lateFees < 0 || inputs.lateFees > 100)) {
    errors.push('Late fees must be between $0 and $100');
  }

  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  if (inputs.inflationRate && (inputs.inflationRate < 0 || inputs.inflationRate > 10)) {
    errors.push('Inflation rate must be between 0% and 10%');
  }

  // Logical relationship validation
  if (inputs.currentMortgageBalance && inputs.homeValue && inputs.currentMortgageBalance > inputs.homeValue) {
    errors.push('Current mortgage balance cannot exceed home value');
  }

  if (inputs.loanAmount && inputs.homeValue && inputs.currentMortgageBalance) {
    const availableEquity = inputs.homeValue - inputs.currentMortgageBalance;
    if (inputs.loanAmount > availableEquity) {
      errors.push('Loan amount cannot exceed available equity');
    }
  }

  if (inputs.maxLTV && inputs.maxCLTV && inputs.maxLTV > inputs.maxCLTV) {
    errors.push('Maximum LTV cannot exceed maximum CLTV');
  }

  if (inputs.monthlyIncome && inputs.monthlyDebtPayments && inputs.monthlyDebtPayments > inputs.monthlyIncome) {
    errors.push('Monthly debt payments cannot exceed monthly income');
  }

  // Enum validation
  const validPropertyTypes = ['single-family', 'condo', 'townhouse', 'multi-family'];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Invalid property type. Must be one of: single-family, condo, townhouse, multi-family');
  }

  const validOccupancyTypes = ['primary-residence', 'second-home', 'investment-property'];
  if (inputs.occupancyType && !validOccupancyTypes.includes(inputs.occupancyType)) {
    errors.push('Invalid occupancy type. Must be one of: primary-residence, second-home, investment-property');
  }

  const validPropertyLocations = ['urban', 'suburban', 'rural'];
  if (inputs.propertyLocation && !validPropertyLocations.includes(inputs.propertyLocation)) {
    errors.push('Invalid property location. Must be one of: urban, suburban, rural');
  }

  const validMarketTypes = ['hot', 'stable', 'declining'];
  if (inputs.marketType && !validMarketTypes.includes(inputs.marketType)) {
    errors.push('Invalid market type. Must be one of: hot, stable, declining');
  }

  const validLoanPurposes = ['home-improvement', 'debt-consolidation', 'education', 'emergency-fund', 'investment', 'other'];
  if (inputs.loanPurpose && !validLoanPurposes.includes(inputs.loanPurpose)) {
    errors.push('Invalid loan purpose. Must be one of: home-improvement, debt-consolidation, education, emergency-fund, investment, other');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateHomeEquityLoanInput(field: string, value: any): string | null {
  switch (field) {
    case 'homeValue':
      if (!value) return 'Home value is required';
      if (typeof value !== 'number') return 'Home value must be a number';
      if (value < 10000 || value > 10000000) return 'Home value must be between $10,000 and $10,000,000';
      break;

    case 'currentMortgageBalance':
      if (!value) return 'Current mortgage balance is required';
      if (typeof value !== 'number') return 'Current mortgage balance must be a number';
      if (value < 0 || value > 10000000) return 'Current mortgage balance must be between $0 and $10,000,000';
      break;

    case 'loanAmount':
      if (!value) return 'Loan amount is required';
      if (typeof value !== 'number') return 'Loan amount must be a number';
      if (value < 1000 || value > 1000000) return 'Loan amount must be between $1,000 and $1,000,000';
      break;

    case 'interestRate':
      if (!value) return 'Interest rate is required';
      if (typeof value !== 'number') return 'Interest rate must be a number';
      if (value < 1 || value > 20) return 'Interest rate must be between 1% and 20%';
      break;

    case 'loanTerm':
      if (!value) return 'Loan term is required';
      if (typeof value !== 'number') return 'Loan term must be a number';
      if (value < 1 || value > 30) return 'Loan term must be between 1 and 30 years';
      break;

    case 'maxLTV':
      if (value && typeof value !== 'number') return 'Maximum LTV must be a number';
      if (value && (value < 50 || value > 95)) return 'Maximum LTV must be between 50% and 95%';
      break;

    case 'maxCLTV':
      if (value && typeof value !== 'number') return 'Maximum CLTV must be a number';
      if (value && (value < 50 || value > 95)) return 'Maximum CLTV must be between 50% and 95%';
      break;

    case 'creditScore':
      if (value && typeof value !== 'number') return 'Credit score must be a number';
      if (value && (value < 300 || value > 850)) return 'Credit score must be between 300 and 850';
      break;

    case 'debtToIncomeRatio':
      if (value && typeof value !== 'number') return 'Debt-to-income ratio must be a number';
      if (value && (value < 0 || value > 100)) return 'Debt-to-income ratio must be between 0% and 100%';
      break;

    case 'monthlyIncome':
      if (value && typeof value !== 'number') return 'Monthly income must be a number';
      if (value && (value < 1000 || value > 1000000)) return 'Monthly income must be between $1,000 and $1,000,000';
      break;

    case 'propertyType':
      if (value) {
        const validPropertyTypes = ['single-family', 'condo', 'townhouse', 'multi-family'];
        if (!validPropertyTypes.includes(value)) return 'Invalid property type. Must be one of: single-family, condo, townhouse, multi-family';
      }
      break;

    case 'occupancyType':
      if (value) {
        const validOccupancyTypes = ['primary-residence', 'second-home', 'investment-property'];
        if (!validOccupancyTypes.includes(value)) return 'Invalid occupancy type. Must be one of: primary-residence, second-home, investment-property';
      }
      break;

    case 'propertyLocation':
      if (value) {
        const validPropertyLocations = ['urban', 'suburban', 'rural'];
        if (!validPropertyLocations.includes(value)) return 'Invalid property location. Must be one of: urban, suburban, rural';
      }
      break;

    case 'marketType':
      if (value) {
        const validMarketTypes = ['hot', 'stable', 'declining'];
        if (!validMarketTypes.includes(value)) return 'Invalid market type. Must be one of: hot, stable, declining';
      }
      break;

    case 'loanPurpose':
      if (value) {
        const validLoanPurposes = ['home-improvement', 'debt-consolidation', 'education', 'emergency-fund', 'investment', 'other'];
        if (!validLoanPurposes.includes(value)) return 'Invalid loan purpose. Must be one of: home-improvement, debt-consolidation, education, emergency-fund, investment, other';
      }
      break;
  }

  return null;
}
