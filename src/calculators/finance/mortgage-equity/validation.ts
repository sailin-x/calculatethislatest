import { CalculatorInputs } from '../../../types/calculator';

export interface MortgageEquityInputs extends CalculatorInputs {
  propertyValue: number;
  originalPurchasePrice?: number;
  purchaseDate?: string;
  currentMortgageBalance: number;
  originalLoanAmount?: number;
  loanStartDate?: string;
  interestRate?: number;
  loanTerm?: number;
  monthlyPayment?: number;
  propertyTaxAnnual?: number;
  homeownersInsuranceAnnual?: number;
  pmiAnnual?: number;
  appreciationRate?: number;
  marketCondition?: string;
  propertyType?: string;
  location?: string;
  creditScore?: number;
  debtToIncomeRatio?: number;
  income?: number;
  existingHELOC?: number;
  existingHomeEquityLoan?: number;
  otherLiens?: number;
  plannedImprovements?: number;
  timeHorizon?: number;
}

export const validateMortgageEquityInputs = (inputs: Partial<MortgageEquityInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (!inputs.currentMortgageBalance || inputs.currentMortgageBalance < 0) {
    errors.push('Current mortgage balance cannot be negative');
  }

  // Range validation
  if (inputs.propertyValue && (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000)) {
    errors.push('Property value should be between $10,000 and $10,000,000');
  }

  if (inputs.originalPurchasePrice && (inputs.originalPurchasePrice < 10000 || inputs.originalPurchasePrice > 10000000)) {
    errors.push('Original purchase price should be between $10,000 and $10,000,000');
  }

  if (inputs.currentMortgageBalance && inputs.currentMortgageBalance > 10000000) {
    errors.push('Current mortgage balance should not exceed $10,000,000');
  }

  if (inputs.originalLoanAmount && (inputs.originalLoanAmount < 0 || inputs.originalLoanAmount > 10000000)) {
    errors.push('Original loan amount should be between $0 and $10,000,000');
  }

  if (inputs.interestRate && (inputs.interestRate < 0 || inputs.interestRate > 25)) {
    errors.push('Interest rate should be between 0% and 25%');
  }

  if (inputs.loanTerm && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) {
    errors.push('Loan term should be between 1 and 50 years');
  }

  if (inputs.monthlyPayment && (inputs.monthlyPayment < 0 || inputs.monthlyPayment > 50000)) {
    errors.push('Monthly payment should be between $0 and $50,000');
  }

  if (inputs.propertyTaxAnnual && (inputs.propertyTaxAnnual < 0 || inputs.propertyTaxAnnual > 100000)) {
    errors.push('Annual property tax should be between $0 and $100,000');
  }

  if (inputs.homeownersInsuranceAnnual && (inputs.homeownersInsuranceAnnual < 0 || inputs.homeownersInsuranceAnnual > 20000)) {
    errors.push('Annual homeowners insurance should be between $0 and $20,000');
  }

  if (inputs.pmiAnnual && (inputs.pmiAnnual < 0 || inputs.pmiAnnual > 10000)) {
    errors.push('Annual PMI should be between $0 and $10,000');
  }

  if (inputs.appreciationRate && (inputs.appreciationRate < -10 || inputs.appreciationRate > 20)) {
    errors.push('Annual appreciation rate should be between -10% and 20%');
  }

  if (inputs.creditScore && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    errors.push('Credit score should be between 300 and 850');
  }

  if (inputs.debtToIncomeRatio && (inputs.debtToIncomeRatio < 0 || inputs.debtToIncomeRatio > 100)) {
    errors.push('Debt-to-income ratio should be between 0% and 100%');
  }

  if (inputs.income && (inputs.income < 0 || inputs.income > 10000000)) {
    errors.push('Annual income should be between $0 and $10,000,000');
  }

  if (inputs.existingHELOC && (inputs.existingHELOC < 0 || inputs.existingHELOC > 1000000)) {
    errors.push('Existing HELOC balance should be between $0 and $1,000,000');
  }

  if (inputs.existingHomeEquityLoan && (inputs.existingHomeEquityLoan < 0 || inputs.existingHomeEquityLoan > 1000000)) {
    errors.push('Existing home equity loan balance should be between $0 and $1,000,000');
  }

  if (inputs.otherLiens && (inputs.otherLiens < 0 || inputs.otherLiens > 1000000)) {
    errors.push('Other liens should be between $0 and $1,000,000');
  }

  if (inputs.plannedImprovements && (inputs.plannedImprovements < 0 || inputs.plannedImprovements > 500000)) {
    errors.push('Planned improvements value should be between $0 and $500,000');
  }

  if (inputs.timeHorizon && (inputs.timeHorizon < 1 || inputs.timeHorizon > 30)) {
    errors.push('Time horizon should be between 1 and 30 years');
  }

  // Logical validation
  if (inputs.propertyValue && inputs.currentMortgageBalance && inputs.currentMortgageBalance > inputs.propertyValue) {
    errors.push('Current mortgage balance cannot exceed property value');
  }

  if (inputs.originalPurchasePrice && inputs.originalLoanAmount && inputs.originalLoanAmount > inputs.originalPurchasePrice) {
    errors.push('Original loan amount cannot exceed original purchase price');
  }

  if (inputs.propertyValue && inputs.originalPurchasePrice && inputs.originalPurchasePrice > inputs.propertyValue * 2) {
    errors.push('Original purchase price seems unusually high compared to current property value');
  }

  if (inputs.propertyValue && inputs.originalPurchasePrice && inputs.propertyValue > inputs.originalPurchasePrice * 5) {
    errors.push('Current property value seems unusually high compared to original purchase price');
  }

  // Date validation
  if (inputs.purchaseDate) {
    const purchaseDate = new Date(inputs.purchaseDate);
    const currentDate = new Date();
    if (isNaN(purchaseDate.getTime())) {
      errors.push('Invalid purchase date format');
    } else if (purchaseDate > currentDate) {
      errors.push('Purchase date cannot be in the future');
    }
  }

  if (inputs.loanStartDate) {
    const loanStartDate = new Date(inputs.loanStartDate);
    const currentDate = new Date();
    if (isNaN(loanStartDate.getTime())) {
      errors.push('Invalid loan start date format');
    } else if (loanStartDate > currentDate) {
      errors.push('Loan start date cannot be in the future');
    }
  }

  // Combined debt validation
  if (inputs.propertyValue && inputs.currentMortgageBalance && inputs.existingHELOC && inputs.existingHomeEquityLoan && inputs.otherLiens) {
    const totalDebt = inputs.currentMortgageBalance + inputs.existingHELOC + inputs.existingHomeEquityLoan + inputs.otherLiens;
    if (totalDebt > inputs.propertyValue) {
      errors.push('Total debt (mortgage + HELOC + home equity loan + other liens) cannot exceed property value');
    }
  }

  // Income and debt validation
  if (inputs.income && inputs.debtToIncomeRatio && inputs.monthlyPayment) {
    const annualDebt = inputs.monthlyPayment * 12;
    const calculatedDTI = (annualDebt / inputs.income) * 100;
    if (Math.abs(calculatedDTI - inputs.debtToIncomeRatio) > 10) {
      errors.push('Debt-to-income ratio seems inconsistent with income and monthly payment');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};