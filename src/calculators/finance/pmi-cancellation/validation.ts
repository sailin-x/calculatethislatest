import { PMICancellationInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validatePMICancellationInputs(inputs: PMICancellationInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Loan Information Validation
  if (!inputs.originalLoanAmount || inputs.originalLoanAmount <= 0) {
    errors.push('Original loan amount must be greater than 0');
  }

  if (!inputs.currentLoanBalance || inputs.currentLoanBalance <= 0) {
    errors.push('Current loan balance must be greater than 0');
  }

  if (inputs.currentLoanBalance > inputs.originalLoanAmount) {
    errors.push('Current loan balance cannot exceed original loan amount');
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 1) {
    errors.push('Interest rate must be between 0 and 1');
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.push('Loan term must be greater than 0');
  }

  if (!inputs.loanType || !['conventional', 'fha', 'va', 'usda', 'jumbo'].includes(inputs.loanType)) {
    errors.push('Loan type must be one of: conventional, fha, va, usda, jumbo');
  }

  if (!inputs.paymentType || !['principal_interest', 'interest_only', 'balloon', 'arm'].includes(inputs.paymentType)) {
    errors.push('Payment type must be one of: principal_interest, interest_only, balloon, arm');
  }

  // Property Information Validation
  if (!inputs.originalPropertyValue || inputs.originalPropertyValue <= 0) {
    errors.push('Original property value must be greater than 0');
  }

  if (!inputs.currentPropertyValue || inputs.currentPropertyValue <= 0) {
    errors.push('Current property value must be greater than 0');
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.push('Property address is required');
  }

  if (!inputs.propertyType || !['single_family', 'multi_family', 'condo', 'townhouse', 'commercial'].includes(inputs.propertyType)) {
    errors.push('Property type must be one of: single_family, multi_family, condo, townhouse, commercial');
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.push('Property size must be greater than 0');
  }

  if (inputs.propertyAge < 0) {
    errors.push('Property age cannot be negative');
  }

  // PMI Information Validation
  if (inputs.pmiRate < 0 || inputs.pmiRate > 1) {
    errors.push('PMI rate must be between 0 and 1');
  }

  if (inputs.pmiMonthlyPayment < 0) {
    errors.push('PMI monthly payment cannot be negative');
  }

  if (!inputs.pmiStartDate) {
    errors.push('PMI start date is required');
  } else {
    const pmiStartDate = new Date(inputs.pmiStartDate);
    if (isNaN(pmiStartDate.getTime())) {
      errors.push('PMI start date must be a valid date');
    }
  }

  if (!inputs.pmiCancellationDate) {
    errors.push('PMI cancellation date is required');
  } else {
    const pmiCancellationDate = new Date(inputs.pmiCancellationDate);
    if (isNaN(pmiCancellationDate.getTime())) {
      errors.push('PMI cancellation date must be a valid date');
    }
  }

  if (!inputs.pmiCancellationMethod || !['automatic', 'request', 'refinance', 'appraisal'].includes(inputs.pmiCancellationMethod)) {
    errors.push('PMI cancellation method must be one of: automatic, request, refinance, appraisal');
  }

  // Loan History Validation
  if (!inputs.loanStartDate) {
    errors.push('Loan start date is required');
  } else {
    const loanStartDate = new Date(inputs.loanStartDate);
    if (isNaN(loanStartDate.getTime())) {
      errors.push('Loan start date must be a valid date');
    }
  }

  if (inputs.originalDownPayment < 0) {
    errors.push('Original down payment cannot be negative');
  }

  if (inputs.originalDownPaymentPercentage < 0 || inputs.originalDownPaymentPercentage > 1) {
    errors.push('Original down payment percentage must be between 0 and 1');
  }

  if (inputs.paymentsMade < 0) {
    errors.push('Payments made cannot be negative');
  }

  if (inputs.monthsSinceLoanStart < 0) {
    errors.push('Months since loan start cannot be negative');
  }

  // Appraisal Information Validation
  if (inputs.appraisalValue < 0) {
    errors.push('Appraisal value cannot be negative');
  }

  if (!inputs.appraisalDate) {
    errors.push('Appraisal date is required');
  } else {
    const appraisalDate = new Date(inputs.appraisalDate);
    if (isNaN(appraisalDate.getTime())) {
      errors.push('Appraisal date must be a valid date');
    }
  }

  if (inputs.appraisalCost < 0) {
    errors.push('Appraisal cost cannot be negative');
  }

  // Market Information Validation
  if (!inputs.marketLocation || inputs.marketLocation.trim().length === 0) {
    errors.push('Market location is required');
  }

  if (!inputs.marketCondition || !['declining', 'stable', 'growing', 'hot'].includes(inputs.marketCondition)) {
    errors.push('Market condition must be one of: declining, stable, growing, hot');
  }

  if (inputs.marketGrowthRate < 0) {
    errors.push('Market growth rate cannot be negative');
  }

  if (!inputs.comparableSales || !Array.isArray(inputs.comparableSales)) {
    errors.push('Comparable sales must be an array');
  } else {
    inputs.comparableSales.forEach((sale, index) => {
      if (!sale.address || sale.address.trim().length === 0) {
        errors.push(`Comparable sale ${index + 1}: address is required`);
      }
      if (sale.salePrice <= 0) {
        errors.push(`Comparable sale ${index + 1}: sale price must be greater than 0`);
      }
      if (!sale.saleDate) {
        errors.push(`Comparable sale ${index + 1}: sale date is required`);
      } else {
        const saleDate = new Date(sale.saleDate);
        if (isNaN(saleDate.getTime())) {
          errors.push(`Comparable sale ${index + 1}: sale date must be a valid date`);
        }
      }
    });
  }

  // Borrower Information Validation
  if (inputs.borrowerIncome < 0) {
    errors.push('Borrower income cannot be negative');
  }

  if (inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
    errors.push('Borrower credit score must be between 300 and 850');
  }

  if (inputs.borrowerDebtToIncomeRatio < 0 || inputs.borrowerDebtToIncomeRatio > 1) {
    errors.push('Borrower debt-to-income ratio must be between 0 and 1');
  }

  if (!inputs.borrowerEmploymentType || !['employed', 'self_employed', 'retired', 'business_owner'].includes(inputs.borrowerEmploymentType)) {
    errors.push('Borrower employment type must be one of: employed, self_employed, retired, business_owner');
  }

  // Cancellation Requirements Validation
  if (inputs.ltvThreshold < 0 || inputs.ltvThreshold > 1) {
    errors.push('LTV threshold must be between 0 and 1');
  }

  if (!inputs.paymentHistory || !Array.isArray(inputs.paymentHistory)) {
    errors.push('Payment history must be an array');
  } else {
    inputs.paymentHistory.forEach((payment, index) => {
      if (!payment.paymentNumber || payment.paymentNumber <= 0) {
        errors.push(`Payment ${index + 1}: payment number must be greater than 0`);
      }
      if (!payment.paymentDate) {
        errors.push(`Payment ${index + 1}: payment date is required`);
      } else {
        const paymentDate = new Date(payment.paymentDate);
        if (isNaN(paymentDate.getTime())) {
          errors.push(`Payment ${index + 1}: payment date must be a valid date`);
        }
      }
      if (payment.paymentAmount < 0) {
        errors.push(`Payment ${index + 1}: payment amount cannot be negative`);
      }
      if (payment.principal < 0) {
        errors.push(`Payment ${index + 1}: principal cannot be negative`);
      }
      if (payment.interest < 0) {
        errors.push(`Payment ${index + 1}: interest cannot be negative`);
      }
      if (payment.balance < 0) {
        errors.push(`Payment ${index + 1}: balance cannot be negative`);
      }
    });
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  }

  if (inputs.inflationRate < 0) {
    errors.push('Inflation rate cannot be negative');
  }

  if (inputs.propertyAppreciationRate < 0) {
    errors.push('Property appreciation rate cannot be negative');
  }

  if (inputs.discountRate < 0) {
    errors.push('Discount rate cannot be negative');
  }

  // Reporting Preferences Validation
  if (!inputs.currency || !['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.push('Currency must be one of: USD, EUR, GBP, CAD, AUD');
  }

  if (!inputs.displayFormat || !['percentage', 'decimal', 'currency'].includes(inputs.displayFormat)) {
    errors.push('Display format must be one of: percentage, decimal, currency');
  }

  // Cross-field Validation
  if (inputs.originalDownPayment + inputs.originalLoanAmount !== inputs.originalPropertyValue) {
    warnings.push('Original down payment plus loan amount does not equal original property value');
  }

  if (inputs.currentLoanBalance > inputs.currentPropertyValue) {
    warnings.push('Current loan balance exceeds current property value (underwater loan)');
  }

  if (inputs.pmiMonthlyPayment > inputs.originalLoanAmount * 0.01) {
    warnings.push('PMI monthly payment seems unusually high');
  }

  // Date Validation
  if (inputs.loanStartDate && inputs.pmiStartDate) {
    const loanStartDate = new Date(inputs.loanStartDate);
    const pmiStartDate = new Date(inputs.pmiStartDate);
    
    if (pmiStartDate < loanStartDate) {
      errors.push('PMI start date cannot be before loan start date');
    }
  }

  if (inputs.pmiStartDate && inputs.pmiCancellationDate) {
    const pmiStartDate = new Date(inputs.pmiStartDate);
    const pmiCancellationDate = new Date(inputs.pmiCancellationDate);
    
    if (pmiCancellationDate <= pmiStartDate) {
      errors.push('PMI cancellation date must be after PMI start date');
    }
  }

  // LTV Validation
  const currentLtv = inputs.currentLoanBalance / inputs.currentPropertyValue;
  if (currentLtv > 1) {
    errors.push('Current LTV ratio cannot exceed 100%');
  }

  if (currentLtv < 0.2) {
    warnings.push('Current LTV ratio is very low, PMI may not be applicable');
  }

  // PMI Rate Validation
  if (inputs.pmiRate > 0.05) {
    warnings.push('PMI rate is unusually high');
  }

  if (inputs.pmiRate < 0.001) {
    warnings.push('PMI rate is unusually low');
  }

  // Property Value Validation
  if (inputs.currentPropertyValue < inputs.originalPropertyValue * 0.5) {
    warnings.push('Current property value is significantly lower than original value');
  }

  if (inputs.currentPropertyValue > inputs.originalPropertyValue * 2) {
    warnings.push('Current property value is significantly higher than original value');
  }

  // Market Growth Rate Validation
  if (inputs.marketGrowthRate > 0.2) {
    warnings.push('Market growth rate is very high, may be unrealistic');
  }

  if (inputs.marketGrowthRate < 0 && inputs.marketCondition !== 'declining') {
    warnings.push('Negative market growth rate may not align with market condition');
  }

  // Property Appreciation Rate Validation
  if (inputs.propertyAppreciationRate > 0.15) {
    warnings.push('Property appreciation rate is very high, may be unrealistic');
  }

  if (inputs.propertyAppreciationRate < 0) {
    warnings.push('Negative property appreciation rate indicates declining property value');
  }

  // Credit Score Validation
  if (inputs.borrowerCreditScore < 620) {
    warnings.push('Low credit score may impact PMI cancellation eligibility');
  }

  if (inputs.borrowerCreditScore > 750) {
    warnings.push('High credit score may provide better PMI cancellation options');
  }

  // Debt-to-Income Ratio Validation
  if (inputs.borrowerDebtToIncomeRatio > 0.5) {
    warnings.push('High debt-to-income ratio may impact PMI cancellation eligibility');
  }

  // Loan Type Specific Validation
  if (inputs.loanType === 'fha') {
    warnings.push('FHA loans typically do not allow PMI cancellation');
  }

  if (inputs.loanType === 'va') {
    warnings.push('VA loans typically do not require PMI');
  }

  if (inputs.loanType === 'usda') {
    warnings.push('USDA loans have different PMI cancellation requirements');
  }

  // Payment History Validation
  if (inputs.paymentHistory && inputs.paymentHistory.length > 0) {
    const latePayments = inputs.paymentHistory.filter(payment => !payment.onTime).length;
    const totalPayments = inputs.paymentHistory.length;
    const latePaymentRate = latePayments / totalPayments;
    
    if (latePaymentRate > 0.1) {
      warnings.push('High late payment rate may impact PMI cancellation eligibility');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}