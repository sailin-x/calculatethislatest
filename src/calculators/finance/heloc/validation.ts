import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateHELOCInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.homeValue) {
    errors.push('Home value is required');
  }
  if (!inputs.currentMortgageBalance) {
    errors.push('Current mortgage balance is required');
  }
  if (!inputs.requestedCreditLimit) {
    errors.push('Requested credit limit is required');
  }
  if (!inputs.interestRate) {
    errors.push('Interest rate is required');
  }
  if (!inputs.drawPeriod) {
    errors.push('Draw period is required');
  }
  if (!inputs.repaymentPeriod) {
    errors.push('Repayment period is required');
  }
  if (!inputs.propertyType) {
    errors.push('Property type is required');
  }
  if (!inputs.occupancyType) {
    errors.push('Occupancy type is required');
  }
  if (!inputs.propertyLocation) {
    errors.push('Property location is required');
  }
  if (!inputs.marketType) {
    errors.push('Market type is required');
  }
  if (!inputs.purpose) {
    errors.push('Purpose is required');
  }

  // Data type validation
  if (inputs.homeValue && typeof inputs.homeValue !== 'number') {
    errors.push('Home value must be a number');
  }
  if (inputs.currentMortgageBalance && typeof inputs.currentMortgageBalance !== 'number') {
    errors.push('Current mortgage balance must be a number');
  }
  if (inputs.requestedCreditLimit && typeof inputs.requestedCreditLimit !== 'number') {
    errors.push('Requested credit limit must be a number');
  }
  if (inputs.interestRate && typeof inputs.interestRate !== 'number') {
    errors.push('Interest rate must be a number');
  }
  if (inputs.drawPeriod && typeof inputs.drawPeriod !== 'number') {
    errors.push('Draw period must be a number');
  }
  if (inputs.repaymentPeriod && typeof inputs.repaymentPeriod !== 'number') {
    errors.push('Repayment period must be a number');
  }
  if (inputs.maxLTV && typeof inputs.maxLTV !== 'number') {
    errors.push('Maximum LTV must be a number');
  }
  if (inputs.maxCLTV && typeof inputs.maxCLTV !== 'number') {
    errors.push('Maximum CLTV must be a number');
  }
  if (inputs.annualFee && typeof inputs.annualFee !== 'number') {
    errors.push('Annual fee must be a number');
  }
  if (inputs.originationFee && typeof inputs.originationFee !== 'number') {
    errors.push('Origination fee must be a number');
  }
  if (inputs.appraisalFee && typeof inputs.appraisalFee !== 'number') {
    errors.push('Appraisal fee must be a number');
  }
  if (inputs.titleFees && typeof inputs.titleFees !== 'number') {
    errors.push('Title fees must be a number');
  }
  if (inputs.closingCosts && typeof inputs.closingCosts !== 'number') {
    errors.push('Closing costs must be a number');
  }
  if (inputs.creditScore && typeof inputs.creditScore !== 'number') {
    errors.push('Credit score must be a number');
  }
  if (inputs.debtToIncomeRatio && typeof inputs.debtToIncomeRatio !== 'number') {
    errors.push('Debt-to-income ratio must be a number');
  }
  if (inputs.estimatedUsage && typeof inputs.estimatedUsage !== 'number') {
    errors.push('Estimated usage must be a number');
  }
  if (inputs.monthlyIncome && typeof inputs.monthlyIncome !== 'number') {
    errors.push('Monthly income must be a number');
  }
  if (inputs.monthlyDebtPayments && typeof inputs.monthlyDebtPayments !== 'number') {
    errors.push('Monthly debt payments must be a number');
  }
  if (inputs.propertyTaxes && typeof inputs.propertyTaxes !== 'number') {
    errors.push('Property taxes must be a number');
  }
  if (inputs.homeownersInsurance && typeof inputs.homeownersInsurance !== 'number') {
    errors.push('Homeowners insurance must be a number');
  }
  if (inputs.hoaFees && typeof inputs.hoaFees !== 'number') {
    errors.push('HOA fees must be a number');
  }
  if (inputs.minimumPayment && typeof inputs.minimumPayment !== 'number') {
    errors.push('Minimum payment must be a number');
  }
  if (inputs.prepaymentPenalty && typeof inputs.prepaymentPenalty !== 'number') {
    errors.push('Prepayment penalty must be a number');
  }
  if (inputs.lateFees && typeof inputs.lateFees !== 'number') {
    errors.push('Late fees must be a number');
  }
  if (inputs.inactivityFee && typeof inputs.inactivityFee !== 'number') {
    errors.push('Inactivity fee must be a number');
  }
  if (inputs.taxRate && typeof inputs.taxRate !== 'number') {
    errors.push('Tax rate must be a number');
  }
  if (inputs.inflationRate && typeof inputs.inflationRate !== 'number') {
    errors.push('Inflation rate must be a number');
  }

  // Range validation
  if (inputs.homeValue && (inputs.homeValue < 10000 || inputs.homeValue > 10000000)) {
    errors.push('Home value must be between $10,000 and $10,000,000');
  }
  if (inputs.currentMortgageBalance && (inputs.currentMortgageBalance < 0 || inputs.currentMortgageBalance > 10000000)) {
    errors.push('Current mortgage balance must be between $0 and $10,000,000');
  }
  if (inputs.requestedCreditLimit && (inputs.requestedCreditLimit < 1000 || inputs.requestedCreditLimit > 1000000)) {
    errors.push('Requested credit limit must be between $1,000 and $1,000,000');
  }
  if (inputs.interestRate && (inputs.interestRate < 1 || inputs.interestRate > 20)) {
    errors.push('Interest rate must be between 1% and 20%');
  }
  if (inputs.drawPeriod && (inputs.drawPeriod < 1 || inputs.drawPeriod > 30)) {
    errors.push('Draw period must be between 1 and 30 years');
  }
  if (inputs.repaymentPeriod && (inputs.repaymentPeriod < 1 || inputs.repaymentPeriod > 30)) {
    errors.push('Repayment period must be between 1 and 30 years');
  }
  if (inputs.maxLTV && (inputs.maxLTV < 50 || inputs.maxLTV > 95)) {
    errors.push('Maximum LTV must be between 50% and 95%');
  }
  if (inputs.maxCLTV && (inputs.maxCLTV < 50 || inputs.maxCLTV > 95)) {
    errors.push('Maximum CLTV must be between 50% and 95%');
  }
  if (inputs.annualFee && (inputs.annualFee < 0 || inputs.annualFee > 1000)) {
    errors.push('Annual fee must be between $0 and $1,000');
  }
  if (inputs.originationFee && (inputs.originationFee < 0 || inputs.originationFee > 10000)) {
    errors.push('Origination fee must be between $0 and $10,000');
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
  if (inputs.estimatedUsage && (inputs.estimatedUsage < 0 || inputs.estimatedUsage > 100)) {
    errors.push('Estimated usage must be between 0% and 100%');
  }
  if (inputs.monthlyIncome && (inputs.monthlyIncome < 1000 || inputs.monthlyIncome > 1000000)) {
    errors.push('Monthly income must be between $1,000 and $1,000,000');
  }
  if (inputs.monthlyDebtPayments && (inputs.monthlyDebtPayments < 0 || inputs.monthlyDebtPayments > 100000)) {
    errors.push('Monthly debt payments must be between $0 and $100,000');
  }
  if (inputs.propertyTaxes && (inputs.propertyTaxes < 0 || inputs.propertyTaxes > 100000)) {
    errors.push('Property taxes must be between $0 and $100,000');
  }
  if (inputs.homeownersInsurance && (inputs.homeownersInsurance < 0 || inputs.homeownersInsurance > 100000)) {
    errors.push('Homeowners insurance must be between $0 and $100,000');
  }
  if (inputs.hoaFees && (inputs.hoaFees < 0 || inputs.hoaFees > 10000)) {
    errors.push('HOA fees must be between $0 and $10,000');
  }
  if (inputs.minimumPayment && (inputs.minimumPayment < 0.5 || inputs.minimumPayment > 5)) {
    errors.push('Minimum payment must be between 0.5% and 5%');
  }
  if (inputs.prepaymentPenalty && (inputs.prepaymentPenalty < 0 || inputs.prepaymentPenalty > 5)) {
    errors.push('Prepayment penalty must be between 0% and 5%');
  }
  if (inputs.lateFees && (inputs.lateFees < 0 || inputs.lateFees > 100)) {
    errors.push('Late fees must be between $0 and $100');
  }
  if (inputs.inactivityFee && (inputs.inactivityFee < 0 || inputs.inactivityFee > 100)) {
    errors.push('Inactivity fee must be between $0 and $100');
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
  if (inputs.requestedCreditLimit && inputs.homeValue && inputs.currentMortgageBalance) {
    const availableEquity = inputs.homeValue - inputs.currentMortgageBalance;
    if (inputs.requestedCreditLimit > availableEquity) {
      errors.push('Requested credit limit cannot exceed available equity');
    }
  }
  if (inputs.maxLTV && inputs.maxCLTV && inputs.maxLTV > inputs.maxCLTV) {
    errors.push('Maximum LTV cannot exceed maximum CLTV');
  }
  if (inputs.monthlyIncome && inputs.monthlyDebtPayments && inputs.monthlyDebtPayments > inputs.monthlyIncome) {
    errors.push('Monthly debt payments cannot exceed monthly income');
  }

  // Enum validation
  const validPropertyTypes = ['primary-residence', 'second-home', 'investment-property'];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Invalid property type');
  }

  const validOccupancyTypes = ['owner-occupied', 'non-owner-occupied'];
  if (inputs.occupancyType && !validOccupancyTypes.includes(inputs.occupancyType)) {
    errors.push('Invalid occupancy type');
  }

  const validPropertyLocations = ['urban', 'suburban', 'rural'];
  if (inputs.propertyLocation && !validPropertyLocations.includes(inputs.propertyLocation)) {
    errors.push('Invalid property location');
  }

  const validMarketTypes = ['hot', 'stable', 'declining'];
  if (inputs.marketType && !validMarketTypes.includes(inputs.marketType)) {
    errors.push('Invalid market type');
  }

  const validPurposes = ['home-improvement', 'debt-consolidation', 'education', 'emergency-fund', 'investment', 'other'];
  if (inputs.purpose && !validPurposes.includes(inputs.purpose)) {
    errors.push('Invalid purpose');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateHELOCInput(field: string, value: any): string | null {
  switch (field) {
    case 'homeValue':
      if (!value) return 'Home value is required';
      if (typeof value !== 'number') return 'Home value must be a number';
      if (value < 10000 || value > 10000000) return 'Home value must be between $10,000 and $10,000,000';
      return null;

    case 'currentMortgageBalance':
      if (!value) return 'Current mortgage balance is required';
      if (typeof value !== 'number') return 'Current mortgage balance must be a number';
      if (value < 0 || value > 10000000) return 'Current mortgage balance must be between $0 and $10,000,000';
      return null;

    case 'requestedCreditLimit':
      if (!value) return 'Requested credit limit is required';
      if (typeof value !== 'number') return 'Requested credit limit must be a number';
      if (value < 1000 || value > 1000000) return 'Requested credit limit must be between $1,000 and $1,000,000';
      return null;

    case 'interestRate':
      if (!value) return 'Interest rate is required';
      if (typeof value !== 'number') return 'Interest rate must be a number';
      if (value < 1 || value > 20) return 'Interest rate must be between 1% and 20%';
      return null;

    case 'drawPeriod':
      if (!value) return 'Draw period is required';
      if (typeof value !== 'number') return 'Draw period must be a number';
      if (value < 1 || value > 30) return 'Draw period must be between 1 and 30 years';
      return null;

    case 'repaymentPeriod':
      if (!value) return 'Repayment period is required';
      if (typeof value !== 'number') return 'Repayment period must be a number';
      if (value < 1 || value > 30) return 'Repayment period must be between 1 and 30 years';
      return null;

    case 'maxLTV':
      if (value && typeof value !== 'number') return 'Maximum LTV must be a number';
      if (value && (value < 50 || value > 95)) return 'Maximum LTV must be between 50% and 95%';
      return null;

    case 'maxCLTV':
      if (value && typeof value !== 'number') return 'Maximum CLTV must be a number';
      if (value && (value < 50 || value > 95)) return 'Maximum CLTV must be between 50% and 95%';
      return null;

    case 'annualFee':
      if (value && typeof value !== 'number') return 'Annual fee must be a number';
      if (value && (value < 0 || value > 1000)) return 'Annual fee must be between $0 and $1,000';
      return null;

    case 'originationFee':
      if (value && typeof value !== 'number') return 'Origination fee must be a number';
      if (value && (value < 0 || value > 10000)) return 'Origination fee must be between $0 and $10,000';
      return null;

    case 'appraisalFee':
      if (value && typeof value !== 'number') return 'Appraisal fee must be a number';
      if (value && (value < 0 || value > 1000)) return 'Appraisal fee must be between $0 and $1,000';
      return null;

    case 'titleFees':
      if (value && typeof value !== 'number') return 'Title fees must be a number';
      if (value && (value < 0 || value > 2000)) return 'Title fees must be between $0 and $2,000';
      return null;

    case 'closingCosts':
      if (value && typeof value !== 'number') return 'Closing costs must be a number';
      if (value && (value < 0 || value > 5000)) return 'Closing costs must be between $0 and $5,000';
      return null;

    case 'creditScore':
      if (value && typeof value !== 'number') return 'Credit score must be a number';
      if (value && (value < 300 || value > 850)) return 'Credit score must be between 300 and 850';
      return null;

    case 'debtToIncomeRatio':
      if (value && typeof value !== 'number') return 'Debt-to-income ratio must be a number';
      if (value && (value < 0 || value > 100)) return 'Debt-to-income ratio must be between 0% and 100%';
      return null;

    case 'estimatedUsage':
      if (value && typeof value !== 'number') return 'Estimated usage must be a number';
      if (value && (value < 0 || value > 100)) return 'Estimated usage must be between 0% and 100%';
      return null;

    case 'monthlyIncome':
      if (value && typeof value !== 'number') return 'Monthly income must be a number';
      if (value && (value < 1000 || value > 1000000)) return 'Monthly income must be between $1,000 and $1,000,000';
      return null;

    case 'monthlyDebtPayments':
      if (value && typeof value !== 'number') return 'Monthly debt payments must be a number';
      if (value && (value < 0 || value > 100000)) return 'Monthly debt payments must be between $0 and $100,000';
      return null;

    case 'propertyTaxes':
      if (value && typeof value !== 'number') return 'Property taxes must be a number';
      if (value && (value < 0 || value > 100000)) return 'Property taxes must be between $0 and $100,000';
      return null;

    case 'homeownersInsurance':
      if (value && typeof value !== 'number') return 'Homeowners insurance must be a number';
      if (value && (value < 0 || value > 100000)) return 'Homeowners insurance must be between $0 and $100,000';
      return null;

    case 'hoaFees':
      if (value && typeof value !== 'number') return 'HOA fees must be a number';
      if (value && (value < 0 || value > 10000)) return 'HOA fees must be between $0 and $10,000';
      return null;

    case 'minimumPayment':
      if (value && typeof value !== 'number') return 'Minimum payment must be a number';
      if (value && (value < 0.5 || value > 5)) return 'Minimum payment must be between 0.5% and 5%';
      return null;

    case 'prepaymentPenalty':
      if (value && typeof value !== 'number') return 'Prepayment penalty must be a number';
      if (value && (value < 0 || value > 5)) return 'Prepayment penalty must be between 0% and 5%';
      return null;

    case 'lateFees':
      if (value && typeof value !== 'number') return 'Late fees must be a number';
      if (value && (value < 0 || value > 100)) return 'Late fees must be between $0 and $100';
      return null;

    case 'inactivityFee':
      if (value && typeof value !== 'number') return 'Inactivity fee must be a number';
      if (value && (value < 0 || value > 100)) return 'Inactivity fee must be between $0 and $100';
      return null;

    case 'taxRate':
      if (value && typeof value !== 'number') return 'Tax rate must be a number';
      if (value && (value < 0 || value > 50)) return 'Tax rate must be between 0% and 50%';
      return null;

    case 'inflationRate':
      if (value && typeof value !== 'number') return 'Inflation rate must be a number';
      if (value && (value < 0 || value > 10)) return 'Inflation rate must be between 0% and 10%';
      return null;

    case 'propertyType':
      if (!value) return 'Property type is required';
      const validPropertyTypes = ['primary-residence', 'second-home', 'investment-property'];
      if (!validPropertyTypes.includes(value)) return 'Invalid property type';
      return null;

    case 'occupancyType':
      if (!value) return 'Occupancy type is required';
      const validOccupancyTypes = ['owner-occupied', 'non-owner-occupied'];
      if (!validOccupancyTypes.includes(value)) return 'Invalid occupancy type';
      return null;

    case 'propertyLocation':
      if (!value) return 'Property location is required';
      const validPropertyLocations = ['urban', 'suburban', 'rural'];
      if (!validPropertyLocations.includes(value)) return 'Invalid property location';
      return null;

    case 'marketType':
      if (!value) return 'Market type is required';
      const validMarketTypes = ['hot', 'stable', 'declining'];
      if (!validMarketTypes.includes(value)) return 'Invalid market type';
      return null;

    case 'purpose':
      if (!value) return 'Purpose is required';
      const validPurposes = ['home-improvement', 'debt-consolidation', 'education', 'emergency-fund', 'investment', 'other'];
      if (!validPurposes.includes(value)) return 'Invalid purpose';
      return null;

    default:
      return null;
  }
}
