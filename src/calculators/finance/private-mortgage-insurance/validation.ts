import { PrivateMortgageInsuranceInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validatePrivateMortgageInsuranceInputs(inputs: PrivateMortgageInsuranceInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount must be greater than 0');
  }

  if (!inputs.interestRate || inputs.interestRate <= 0 || inputs.interestRate > 1) {
    errors.push('Interest rate must be between 0 and 1 (0% to 100%)');
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.push('Loan term must be greater than 0');
  }

  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim() === '') {
    errors.push('Property address is required');
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.push('Property size must be greater than 0');
  }

  if (!inputs.propertyAge || inputs.propertyAge < 0) {
    errors.push('Property age must be non-negative');
  }

  // Down payment validations
  if (!inputs.downPayment || inputs.downPayment < 0) {
    errors.push('Down payment must be non-negative');
  }

  if (!inputs.downPaymentPercentage || inputs.downPaymentPercentage < 0 || inputs.downPaymentPercentage > 1) {
    errors.push('Down payment percentage must be between 0 and 1 (0% to 100%)');
  }

  // PMI validations
  if (!inputs.pmiRate || inputs.pmiRate < 0 || inputs.pmiRate > 1) {
    errors.push('PMI rate must be between 0 and 1 (0% to 100%)');
  }

  if (!inputs.ltvThreshold || inputs.ltvThreshold <= 0 || inputs.ltvThreshold > 1) {
    errors.push('LTV threshold must be between 0 and 1 (0% to 100%)');
  }

  // Borrower validations
  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.push('Borrower income must be greater than 0');
  }

  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
    errors.push('Borrower credit score must be between 300 and 850');
  }

  if (!inputs.borrowerDebtToIncomeRatio || inputs.borrowerDebtToIncomeRatio < 0 || inputs.borrowerDebtToIncomeRatio > 1) {
    errors.push('Borrower debt-to-income ratio must be between 0 and 1 (0% to 100%)');
  }

  if (!inputs.borrowerTaxRate || inputs.borrowerTaxRate < 0 || inputs.borrowerTaxRate > 1) {
    errors.push('Borrower tax rate must be between 0 and 1 (0% to 100%)');
  }

  // Loan history validations
  if (!inputs.loanStartDate || inputs.loanStartDate.trim() === '') {
    errors.push('Loan start date is required');
  }

  if (!inputs.paymentsMade || inputs.paymentsMade < 0) {
    errors.push('Payments made must be non-negative');
  }

  if (!inputs.monthsSinceLoanStart || inputs.monthsSinceLoanStart < 0) {
    errors.push('Months since loan start must be non-negative');
  }

  if (!inputs.currentPrincipalBalance || inputs.currentPrincipalBalance <= 0) {
    errors.push('Current principal balance must be greater than 0');
  }

  // Market validations
  if (!inputs.marketLocation || inputs.marketLocation.trim() === '') {
    errors.push('Market location is required');
  }

  if (!inputs.marketGrowthRate || inputs.marketGrowthRate < -1 || inputs.marketGrowthRate > 1) {
    errors.push('Market growth rate must be between -100% and 100%');
  }

  if (!inputs.propertyAppreciationRate || inputs.propertyAppreciationRate < -1 || inputs.propertyAppreciationRate > 1) {
    errors.push('Property appreciation rate must be between -100% and 100%');
  }

  // Analysis parameters validations
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  }

  if (!inputs.inflationRate || inputs.inflationRate < -1 || inputs.inflationRate > 1) {
    errors.push('Inflation rate must be between -100% and 100%');
  }

  if (!inputs.discountRate || inputs.discountRate < 0 || inputs.discountRate > 1) {
    errors.push('Discount rate must be between 0 and 1 (0% to 100%)');
  }

  // Enum validations
  const validLoanTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo'];
  if (!validLoanTypes.includes(inputs.loanType)) {
    errors.push(`Loan type must be one of: ${validLoanTypes.join(', ')}`);
  }

  const validPaymentTypes = ['principal_interest', 'interest_only', 'balloon', 'arm'];
  if (!validPaymentTypes.includes(inputs.paymentType)) {
    errors.push(`Payment type must be one of: ${validPaymentTypes.join(', ')}`);
  }

  const validPropertyTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial'];
  if (!validPropertyTypes.includes(inputs.propertyType)) {
    errors.push(`Property type must be one of: ${validPropertyTypes.join(', ')}`);
  }

  const validDownPaymentSources = ['savings', 'investment_sale', 'gift', 'inheritance', 'other'];
  if (!validDownPaymentSources.includes(inputs.downPaymentSource)) {
    errors.push(`Down payment source must be one of: ${validDownPaymentSources.join(', ')}`);
  }

  const validPMITypes = ['monthly', 'single_premium', 'split_premium', 'lender_paid'];
  if (!validPMITypes.includes(inputs.pmiType)) {
    errors.push(`PMI type must be one of: ${validPMITypes.join(', ')}`);
  }

  const validCancellationMethods = ['automatic', 'request', 'refinance'];
  if (!validCancellationMethods.includes(inputs.pmiCancellationMethod)) {
    errors.push(`PMI cancellation method must be one of: ${validCancellationMethods.join(', ')}`);
  }

  const validEmploymentTypes = ['employed', 'self_employed', 'retired', 'business_owner'];
  if (!validEmploymentTypes.includes(inputs.borrowerEmploymentType)) {
    errors.push(`Borrower employment type must be one of: ${validEmploymentTypes.join(', ')}`);
  }

  const validMarketConditions = ['declining', 'stable', 'growing', 'hot'];
  if (!validMarketConditions.includes(inputs.marketCondition)) {
    errors.push(`Market condition must be one of: ${validMarketConditions.join(', ')}`);
  }

  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(inputs.currency)) {
    errors.push(`Currency must be one of: ${validCurrencies.join(', ')}`);
  }

  const validDisplayFormats = ['percentage', 'decimal', 'currency'];
  if (!validDisplayFormats.includes(inputs.displayFormat)) {
    errors.push(`Display format must be one of: ${validDisplayFormats.join(', ')}`);
  }

  // Business logic validations
  if (inputs.loanAmount > inputs.propertyValue) {
    errors.push('Loan amount cannot exceed property value');
  }

  if (inputs.downPayment + inputs.loanAmount !== inputs.propertyValue) {
    errors.push('Down payment plus loan amount must equal property value');
  }

  if (inputs.downPaymentPercentage !== inputs.downPayment / inputs.propertyValue) {
    errors.push('Down payment percentage must equal down payment divided by property value');
  }

  if (inputs.currentPrincipalBalance > inputs.loanAmount) {
    errors.push('Current principal balance cannot exceed original loan amount');
  }

  if (inputs.paymentsMade > inputs.loanTerm) {
    errors.push('Payments made cannot exceed loan term');
  }

  if (inputs.monthsSinceLoanStart > inputs.paymentsMade) {
    errors.push('Months since loan start cannot exceed payments made');
  }

  // Payment history validations
  if (!inputs.paymentHistory || inputs.paymentHistory.length === 0) {
    errors.push('Payment history is required');
  } else {
    for (let i = 0; i < inputs.paymentHistory.length; i++) {
      const payment = inputs.paymentHistory[i];
      
      if (!payment.paymentNumber || payment.paymentNumber <= 0) {
        errors.push(`Payment ${i + 1}: Payment number must be greater than 0`);
      }
      
      if (!payment.paymentDate || payment.paymentDate.trim() === '') {
        errors.push(`Payment ${i + 1}: Payment date is required`);
      }
      
      if (!payment.paymentAmount || payment.paymentAmount <= 0) {
        errors.push(`Payment ${i + 1}: Payment amount must be greater than 0`);
      }
      
      if (!payment.principal || payment.principal < 0) {
        errors.push(`Payment ${i + 1}: Principal must be non-negative`);
      }
      
      if (!payment.interest || payment.interest < 0) {
        errors.push(`Payment ${i + 1}: Interest must be non-negative`);
      }
      
      if (!payment.balance || payment.balance < 0) {
        errors.push(`Payment ${i + 1}: Balance must be non-negative`);
      }
      
      if (typeof payment.onTime !== 'boolean') {
        errors.push(`Payment ${i + 1}: On time status must be true or false`);
      }
      
      try {
        const paymentDate = new Date(payment.paymentDate);
        if (isNaN(paymentDate.getTime())) {
          errors.push(`Payment ${i + 1}: Payment date must be a valid date`);
        }
      } catch (error) {
        errors.push(`Payment ${i + 1}: Invalid payment date format`);
      }
    }
  }

  // Date validations
  try {
    const startDate = new Date(inputs.loanStartDate);
    if (isNaN(startDate.getTime())) {
      errors.push('Loan start date must be a valid date');
    }
    
    const today = new Date();
    if (startDate > today) {
      errors.push('Loan start date cannot be in the future');
    }
  } catch (error) {
    errors.push('Invalid loan start date format');
  }

  // Analysis period validation
  if (inputs.analysisPeriod > 60) {
    warnings.push('Analysis period longer than 5 years may have reduced accuracy');
  }

  // Property age validation
  if (inputs.propertyAge > 100) {
    warnings.push('Property age seems unusually high');
  }

  // Property size validation
  if (inputs.propertySize > 100000) {
    warnings.push('Property size seems unusually large');
  }

  // Income validation
  if (inputs.borrowerIncome > 10000000) {
    warnings.push('Borrower income seems unusually high');
  }

  // Credit score validation
  if (inputs.borrowerCreditScore < 500) {
    warnings.push('Borrower credit score is very low');
  }

  // Debt-to-income ratio validation
  if (inputs.borrowerDebtToIncomeRatio > 0.6) {
    warnings.push('Borrower debt-to-income ratio is very high');
  }

  // Market growth rate validation
  if (inputs.marketGrowthRate > 0.2) {
    warnings.push('Market growth rate above 20% is unusually high');
  }

  if (inputs.marketGrowthRate < -0.2) {
    warnings.push('Market growth rate below -20% indicates severe market decline');
  }

  // Property appreciation rate validation
  if (inputs.propertyAppreciationRate > 0.2) {
    warnings.push('Property appreciation rate above 20% is unusually high');
  }

  if (inputs.propertyAppreciationRate < -0.2) {
    warnings.push('Property appreciation rate below -20% indicates severe depreciation');
  }

  // Interest rate validation
  if (inputs.interestRate > 0.15) {
    warnings.push('Interest rate above 15% is unusually high');
  }

  // Loan term validation
  if (inputs.loanTerm > 480) {
    warnings.push('Loan term longer than 40 years is unusual');
  }

  // PMI rate validation
  if (inputs.pmiRate > 0.02) {
    warnings.push('PMI rate above 2% is unusually high');
  }

  // Tax rate validation
  if (inputs.borrowerTaxRate > 0.5) {
    warnings.push('Borrower tax rate above 50% is unusually high');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}