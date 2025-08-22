import { CalculatorInputs } from '../../../types/calculator';

export interface MortgageRefinanceInputs extends CalculatorInputs {
  // Current Loan Information
  currentLoanAmount: number;
  currentRate: number;
  currentTerm: number;
  currentMonthlyPayment: number;
  
  // New Loan Information
  newRate: number;
  newTerm: number;
  refinanceCosts: number;
  cashOutAmount?: number;
  
  // Property Information
  propertyValue: number;
  remainingPayments?: number;
  
  // Financial Information
  taxRate?: number;
  
  // Loan Details
  refinanceType: 'rate-term' | 'cash-out' | 'streamline' | 'fha-to-conventional' | 'va-irrrl';
  loanType: 'conventional' | 'fha' | 'va' | 'usda';
  creditScore?: number;
  debtToIncomeRatio?: number;
  
  // Insurance and Fees
  includePMI?: boolean;
  pmiRate?: number;
  includePropertyTax?: boolean;
  propertyTax?: number;
  includeHomeInsurance?: boolean;
  homeInsurance?: number;
  includeHOA?: boolean;
  hoaFees?: number;
  
  // Analysis Options
  breakEvenPeriod?: number;
  includeAmortization?: boolean;
  includeTaxSavings?: boolean;
  includeInvestmentComparison?: boolean;
  investmentReturn?: number;
}

export const validateMortgageRefinanceInputs = (inputs: Partial<MortgageRefinanceInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields
  if (!inputs.currentLoanAmount && inputs.currentLoanAmount !== 0) {
    errors.push('Current loan amount is required');
  }
  if (!inputs.currentRate && inputs.currentRate !== 0) {
    errors.push('Current interest rate is required');
  }
  if (!inputs.currentTerm && inputs.currentTerm !== 0) {
    errors.push('Current loan term is required');
  }
  if (!inputs.currentMonthlyPayment && inputs.currentMonthlyPayment !== 0) {
    errors.push('Current monthly payment is required');
  }
  if (!inputs.newRate && inputs.newRate !== 0) {
    errors.push('New interest rate is required');
  }
  if (!inputs.newTerm && inputs.newTerm !== 0) {
    errors.push('New loan term is required');
  }
  if (!inputs.refinanceCosts && inputs.refinanceCosts !== 0) {
    errors.push('Refinance costs are required');
  }
  if (!inputs.propertyValue && inputs.propertyValue !== 0) {
    errors.push('Property value is required');
  }
  if (!inputs.refinanceType) {
    errors.push('Refinance type is required');
  }
  if (!inputs.loanType) {
    errors.push('Loan type is required');
  }

  // Rate validation
  if (inputs.currentRate !== undefined && (inputs.currentRate < 0 || inputs.currentRate > 25)) {
    errors.push('Current rate must be between 0% and 25%');
  }
  if (inputs.newRate !== undefined && (inputs.newRate < 0 || inputs.newRate > 25)) {
    errors.push('New rate must be between 0% and 25%');
  }

  // Loan amount validation
  if (inputs.currentLoanAmount !== undefined && (inputs.currentLoanAmount < 1000 || inputs.currentLoanAmount > 10000000)) {
    errors.push('Current loan amount must be between $1,000 and $10,000,000');
  }
  if (inputs.propertyValue !== undefined && (inputs.propertyValue < 1000 || inputs.propertyValue > 10000000)) {
    errors.push('Property value must be between $1,000 and $10,000,000');
  }

  // Term validation
  if (inputs.currentTerm !== undefined && (inputs.currentTerm < 1 || inputs.currentTerm > 50)) {
    errors.push('Current loan term must be between 1 and 50 years');
  }
  if (inputs.newTerm !== undefined && (inputs.newTerm < 1 || inputs.newTerm > 50)) {
    errors.push('New loan term must be between 1 and 50 years');
  }

  // Payment validation
  if (inputs.currentMonthlyPayment !== undefined && (inputs.currentMonthlyPayment < 100 || inputs.currentMonthlyPayment > 50000)) {
    errors.push('Current monthly payment must be between $100 and $50,000');
  }

  // Cost validation
  if (inputs.refinanceCosts !== undefined && (inputs.refinanceCosts < 0 || inputs.refinanceCosts > 50000)) {
    errors.push('Refinance costs must be between $0 and $50,000');
  }

  // Cash-out validation
  if (inputs.cashOutAmount !== undefined && (inputs.cashOutAmount < 0 || inputs.cashOutAmount > 1000000)) {
    errors.push('Cash-out amount must be between $0 and $1,000,000');
  }

  // Remaining payments validation
  if (inputs.remainingPayments !== undefined && (inputs.remainingPayments < 1 || inputs.remainingPayments > 600)) {
    errors.push('Remaining payments must be between 1 and 600');
  }

  // Tax rate validation
  if (inputs.taxRate !== undefined && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  // Refinance type validation
  if (inputs.refinanceType && !['rate-term', 'cash-out', 'streamline', 'fha-to-conventional', 'va-irrrl'].includes(inputs.refinanceType)) {
    errors.push('Refinance type must be rate-term, cash-out, streamline, fha-to-conventional, or va-irrrl');
  }

  // Loan type validation
  if (inputs.loanType && !['conventional', 'fha', 'va', 'usda'].includes(inputs.loanType)) {
    errors.push('Loan type must be conventional, fha, va, or usda');
  }

  // Credit score validation
  if (inputs.creditScore !== undefined && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    errors.push('Credit score must be between 300 and 850');
  }

  // Debt-to-income ratio validation
  if (inputs.debtToIncomeRatio !== undefined && (inputs.debtToIncomeRatio < 0 || inputs.debtToIncomeRatio > 100)) {
    errors.push('Debt-to-income ratio must be between 0% and 100%');
  }

  // PMI rate validation
  if (inputs.pmiRate !== undefined && (inputs.pmiRate < 0 || inputs.pmiRate > 5)) {
    errors.push('PMI rate must be between 0% and 5%');
  }

  // Property tax validation
  if (inputs.propertyTax !== undefined && (inputs.propertyTax < 0 || inputs.propertyTax > 100000)) {
    errors.push('Property tax must be between $0 and $100,000');
  }

  // Home insurance validation
  if (inputs.homeInsurance !== undefined && (inputs.homeInsurance < 0 || inputs.homeInsurance > 10000)) {
    errors.push('Home insurance must be between $0 and $10,000');
  }

  // HOA fees validation
  if (inputs.hoaFees !== undefined && (inputs.hoaFees < 0 || inputs.hoaFees > 5000)) {
    errors.push('HOA fees must be between $0 and $5,000');
  }

  // Break-even period validation
  if (inputs.breakEvenPeriod !== undefined && (inputs.breakEvenPeriod < 1 || inputs.breakEvenPeriod > 30)) {
    errors.push('Break-even period must be between 1 and 30 years');
  }

  // Investment return validation
  if (inputs.investmentReturn !== undefined && (inputs.investmentReturn < 0 || inputs.investmentReturn > 20)) {
    errors.push('Investment return must be between 0% and 20%');
  }

  // Logical consistency checks
  if (inputs.currentLoanAmount !== undefined && inputs.propertyValue !== undefined) {
    if (inputs.currentLoanAmount > inputs.propertyValue) {
      errors.push('Current loan amount cannot exceed property value');
    }
  }

  if (inputs.currentLoanAmount !== undefined && inputs.cashOutAmount !== undefined && inputs.propertyValue !== undefined) {
    const newLoanAmount = inputs.currentLoanAmount + inputs.cashOutAmount;
    if (newLoanAmount > inputs.propertyValue * 0.95) {
      errors.push('New loan amount would exceed 95% of property value');
    }
  }

  if (inputs.currentRate !== undefined && inputs.newRate !== undefined) {
    const rateDifference = Math.abs(inputs.newRate - inputs.currentRate);
    if (rateDifference > 10) {
      errors.push('Rate difference between current and new rates is unusually large');
    }
  }

  if (inputs.currentTerm !== undefined && inputs.newTerm !== undefined) {
    if (inputs.newTerm > inputs.currentTerm * 1.5) {
      errors.push('New loan term should not exceed 150% of current term');
    }
  }

  // Cash-out specific validation
  if (inputs.refinanceType === 'cash-out' && inputs.cashOutAmount !== undefined && inputs.cashOutAmount <= 0) {
    errors.push('Cash-out amount must be greater than 0 for cash-out refinance');
  }

  // Streamline refinance validation
  if (inputs.refinanceType === 'streamline' && inputs.loanType !== 'fha' && inputs.loanType !== 'va') {
    errors.push('Streamline refinance is only available for FHA and VA loans');
  }

  // FHA to conventional validation
  if (inputs.refinanceType === 'fha-to-conventional' && inputs.loanType !== 'conventional') {
    errors.push('FHA to conventional refinance must use conventional loan type');
  }

  // VA IRRRL validation
  if (inputs.refinanceType === 'va-irrrl' && inputs.loanType !== 'va') {
    errors.push('VA IRRRL must use VA loan type');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};