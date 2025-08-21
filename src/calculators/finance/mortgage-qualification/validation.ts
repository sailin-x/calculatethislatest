import { CalculatorInputs } from '../../../types/calculator';

export interface MortgageQualificationInputs extends CalculatorInputs {
  // Income
  annualIncome?: number;
  monthlyIncome?: number;
  
  // Property
  downPayment: number;
  propertyPrice: number;
  
  // Loan Terms
  interestRate: number;
  loanTerm: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda';
  
  // Credit & Debt
  creditScore: number;
  monthlyDebts: number;
  
  // Property Costs
  propertyTax: number;
  homeInsurance: number;
  hoa: number;
  pmi: number;
  closingCosts: number;
  
  // Financial Position
  cashReserves: number;
  
  // Employment
  employmentType: 'full-time' | 'part-time' | 'self-employed' | 'retired' | 'unemployed';
  employmentLength: number;
  
  // Debt Details
  debtTypes: string[];
  
  // Credit History
  bankruptcyHistory: boolean;
  foreclosureHistory: boolean;
  
  // Co-Borrower (optional)
  coBorrowerIncome?: number;
  coBorrowerDebts?: number;
  coBorrowerCreditScore?: number;
  
  // Inclusion Flags
  includePropertyTax: boolean;
  includeHomeInsurance: boolean;
  includeHOA: boolean;
  includePMI: boolean;
  includeClosingCosts: boolean;
  
  // Qualification Method
  qualificationMethod: 'standard' | 'custom';
  customFrontEndRatio?: number;
  customBackEndRatio?: number;
}

export const validateMortgageQualificationInputs = (inputs: Partial<MortgageQualificationInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields
  if (!inputs.downPayment && inputs.downPayment !== 0) {
    errors.push('Down payment is required');
  }
  if (!inputs.propertyPrice && inputs.propertyPrice !== 0) {
    errors.push('Property price is required');
  }
  if (!inputs.interestRate && inputs.interestRate !== 0) {
    errors.push('Interest rate is required');
  }
  if (!inputs.loanTerm && inputs.loanTerm !== 0) {
    errors.push('Loan term is required');
  }
  if (!inputs.loanType) {
    errors.push('Loan type is required');
  }
  if (!inputs.creditScore && inputs.creditScore !== 0) {
    errors.push('Credit score is required');
  }
  if (!inputs.monthlyDebts && inputs.monthlyDebts !== 0) {
    errors.push('Monthly debts are required');
  }
  if (!inputs.propertyTax && inputs.propertyTax !== 0) {
    errors.push('Property tax is required');
  }
  if (!inputs.homeInsurance && inputs.homeInsurance !== 0) {
    errors.push('Home insurance is required');
  }
  if (!inputs.hoa && inputs.hoa !== 0) {
    errors.push('HOA fees are required');
  }
  if (!inputs.pmi && inputs.pmi !== 0) {
    errors.push('PMI is required');
  }
  if (!inputs.closingCosts && inputs.closingCosts !== 0) {
    errors.push('Closing costs are required');
  }
  if (!inputs.cashReserves && inputs.cashReserves !== 0) {
    errors.push('Cash reserves are required');
  }
  if (!inputs.employmentType) {
    errors.push('Employment type is required');
  }
  if (!inputs.employmentLength && inputs.employmentLength !== 0) {
    errors.push('Employment length is required');
  }
  if (!inputs.debtTypes) {
    errors.push('Debt types are required');
  }
  if (inputs.bankruptcyHistory === undefined) {
    errors.push('Bankruptcy history is required');
  }
  if (inputs.foreclosureHistory === undefined) {
    errors.push('Foreclosure history is required');
  }
  if (!inputs.includePropertyTax === undefined) {
    errors.push('Include property tax flag is required');
  }
  if (!inputs.includeHomeInsurance === undefined) {
    errors.push('Include home insurance flag is required');
  }
  if (!inputs.includeHOA === undefined) {
    errors.push('Include HOA flag is required');
  }
  if (!inputs.includePMI === undefined) {
    errors.push('Include PMI flag is required');
  }
  if (!inputs.includeClosingCosts === undefined) {
    errors.push('Include closing costs flag is required');
  }
  if (!inputs.qualificationMethod) {
    errors.push('Qualification method is required');
  }

  // Income validation
  if (inputs.annualIncome !== undefined && inputs.annualIncome < 0) {
    errors.push('Annual income cannot be negative');
  }
  if (inputs.monthlyIncome !== undefined && inputs.monthlyIncome < 0) {
    errors.push('Monthly income cannot be negative');
  }
  if (!inputs.annualIncome && !inputs.monthlyIncome) {
    errors.push('Either annual income or monthly income is required');
  }

  // Property validation
  if (inputs.downPayment !== undefined && inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }
  if (inputs.propertyPrice !== undefined && inputs.propertyPrice <= 0) {
    errors.push('Property price must be greater than 0');
  }
  if (inputs.downPayment !== undefined && inputs.propertyPrice !== undefined && inputs.downPayment > inputs.propertyPrice) {
    errors.push('Down payment cannot exceed property price');
  }

  // Loan terms validation
  if (inputs.interestRate !== undefined && (inputs.interestRate < 0 || inputs.interestRate > 25)) {
    errors.push('Interest rate must be between 0% and 25%');
  }
  if (inputs.loanTerm !== undefined && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) {
    errors.push('Loan term must be between 1 and 50 years');
  }
  if (inputs.loanType && !['conventional', 'fha', 'va', 'usda'].includes(inputs.loanType)) {
    errors.push('Loan type must be conventional, fha, va, or usda');
  }

  // Credit score validation
  if (inputs.creditScore !== undefined && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    errors.push('Credit score must be between 300 and 850');
  }

  // Debt validation
  if (inputs.monthlyDebts !== undefined && inputs.monthlyDebts < 0) {
    errors.push('Monthly debts cannot be negative');
  }

  // Property costs validation
  if (inputs.propertyTax !== undefined && inputs.propertyTax < 0) {
    errors.push('Property tax cannot be negative');
  }
  if (inputs.homeInsurance !== undefined && inputs.homeInsurance < 0) {
    errors.push('Home insurance cannot be negative');
  }
  if (inputs.hoa !== undefined && inputs.hoa < 0) {
    errors.push('HOA fees cannot be negative');
  }
  if (inputs.pmi !== undefined && inputs.pmi < 0) {
    errors.push('PMI cannot be negative');
  }
  if (inputs.closingCosts !== undefined && inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  }

  // Financial position validation
  if (inputs.cashReserves !== undefined && inputs.cashReserves < 0) {
    errors.push('Cash reserves cannot be negative');
  }

  // Employment validation
  if (inputs.employmentType && !['full-time', 'part-time', 'self-employed', 'retired', 'unemployed'].includes(inputs.employmentType)) {
    errors.push('Employment type must be full-time, part-time, self-employed, retired, or unemployed');
  }
  if (inputs.employmentLength !== undefined && inputs.employmentLength < 0) {
    errors.push('Employment length cannot be negative');
  }

  // Debt types validation
  if (inputs.debtTypes && !Array.isArray(inputs.debtTypes)) {
    errors.push('Debt types must be an array');
  }

  // Co-borrower validation
  if (inputs.coBorrowerIncome !== undefined && inputs.coBorrowerIncome < 0) {
    errors.push('Co-borrower income cannot be negative');
  }
  if (inputs.coBorrowerDebts !== undefined && inputs.coBorrowerDebts < 0) {
    errors.push('Co-borrower debts cannot be negative');
  }
  if (inputs.coBorrowerCreditScore !== undefined && (inputs.coBorrowerCreditScore < 300 || inputs.coBorrowerCreditScore > 850)) {
    errors.push('Co-borrower credit score must be between 300 and 850');
  }

  // Qualification method validation
  if (inputs.qualificationMethod && !['standard', 'custom'].includes(inputs.qualificationMethod)) {
    errors.push('Qualification method must be standard or custom');
  }
  if (inputs.qualificationMethod === 'custom') {
    if (inputs.customFrontEndRatio === undefined || inputs.customFrontEndRatio < 0 || inputs.customFrontEndRatio > 100) {
      errors.push('Custom front-end ratio must be between 0% and 100%');
    }
    if (inputs.customBackEndRatio === undefined || inputs.customBackEndRatio < 0 || inputs.customBackEndRatio > 100) {
      errors.push('Custom back-end ratio must be between 0% and 100%');
    }
  }

  // Logical consistency checks
  if (inputs.downPayment !== undefined && inputs.propertyPrice !== undefined && inputs.loanType) {
    const downPaymentPercent = (inputs.downPayment / inputs.propertyPrice) * 100;
    
    switch (inputs.loanType) {
      case 'conventional':
        if (downPaymentPercent < 5) {
          errors.push('Conventional loans require at least 5% down payment');
        }
        break;
      case 'fha':
        if (downPaymentPercent < 3.5) {
          errors.push('FHA loans require at least 3.5% down payment');
        }
        break;
      case 'va':
        if (downPaymentPercent > 0) {
          errors.push('VA loans typically require 0% down payment');
        }
        break;
      case 'usda':
        if (downPaymentPercent > 0) {
          errors.push('USDA loans typically require 0% down payment');
        }
        break;
    }
  }

  if (inputs.creditScore !== undefined && inputs.loanType) {
    switch (inputs.loanType) {
      case 'conventional':
        if (inputs.creditScore < 620) {
          errors.push('Conventional loans typically require a credit score of at least 620');
        }
        break;
      case 'fha':
        if (inputs.creditScore < 580) {
          errors.push('FHA loans typically require a credit score of at least 580');
        }
        break;
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};