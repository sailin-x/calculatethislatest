import { PMICancellationInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validatePMICancellationInputs(inputs: PMICancellationInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Loan Information Validation
  if (!inputs.originalLoanAmount || inputs.originalLoanAmount <= 0) {
    errors.originalLoanAmount = 'Original loan amount must be greater than 0';
  }
  if (inputs.originalLoanAmount > 10000000) {
    errors.originalLoanAmount = 'Original loan amount cannot exceed $10 million';
  }

  if (!inputs.currentLoanBalance || inputs.currentLoanBalance <= 0) {
    errors.currentLoanBalance = 'Current loan balance must be greater than 0';
  }
  if (inputs.currentLoanBalance > inputs.originalLoanAmount) {
    errors.currentLoanBalance = 'Current loan balance cannot exceed original loan amount';
  }

  if (!inputs.interestRate || inputs.interestRate < 0) {
    errors.interestRate = 'Interest rate must be 0 or greater';
  }
  if (inputs.interestRate > 20) {
    errors.interestRate = 'Interest rate cannot exceed 20%';
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.loanTerm = 'Loan term must be greater than 0';
  }
  if (inputs.loanTerm > 50) {
    errors.loanTerm = 'Loan term cannot exceed 50 years';
  }

  if (!inputs.loanType || !['conventional', 'fha', 'va', 'usda', 'jumbo'].includes(inputs.loanType)) {
    errors.loanType = 'Valid loan type is required';
  }

  if (!inputs.paymentType || !['principal_interest', 'interest_only', 'balloon', 'arm'].includes(inputs.paymentType)) {
    errors.paymentType = 'Valid payment type is required';
  }

  // Property Information Validation
  if (!inputs.originalPropertyValue || inputs.originalPropertyValue <= 0) {
    errors.originalPropertyValue = 'Original property value must be greater than 0';
  }
  if (inputs.originalPropertyValue > 10000000) {
    errors.originalPropertyValue = 'Original property value cannot exceed $10 million';
  }

  if (!inputs.currentPropertyValue || inputs.currentPropertyValue <= 0) {
    errors.currentPropertyValue = 'Current property value must be greater than 0';
  }
  if (inputs.currentPropertyValue > 10000000) {
    errors.currentPropertyValue = 'Current property value cannot exceed $10 million';
  }

  if (!inputs.propertyType || !['single_family', 'multi_family', 'condo', 'townhouse', 'commercial'].includes(inputs.propertyType)) {
    errors.propertyType = 'Valid property type is required';
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.propertySize = 'Property size must be greater than 0';
  }
  if (inputs.propertySize > 100000) {
    errors.propertySize = 'Property size cannot exceed 100,000 sq ft';
  }

  if (!inputs.propertyAge || inputs.propertyAge < 0) {
    errors.propertyAge = 'Property age must be 0 or greater';
  }
  if (inputs.propertyAge > 200) {
    errors.propertyAge = 'Property age cannot exceed 200 years';
  }

  // PMI Information Validation
  if (!inputs.pmiRate || inputs.pmiRate < 0) {
    errors.pmiRate = 'PMI rate must be 0 or greater';
  }
  if (inputs.pmiRate > 5) {
    errors.pmiRate = 'PMI rate cannot exceed 5%';
  }

  if (!inputs.pmiMonthlyPayment || inputs.pmiMonthlyPayment < 0) {
    errors.pmiMonthlyPayment = 'PMI monthly payment must be 0 or greater';
  }
  if (inputs.pmiMonthlyPayment > 1000) {
    errors.pmiMonthlyPayment = 'PMI monthly payment cannot exceed $1,000';
  }

  if (!inputs.pmiStartDate) {
    errors.pmiStartDate = 'PMI start date is required';
  }

  if (!inputs.pmiCancellationMethod || !['automatic', 'request', 'refinance', 'appraisal'].includes(inputs.pmiCancellationMethod)) {
    errors.pmiCancellationMethod = 'Valid cancellation method is required';
  }

  // Loan History Validation
  if (!inputs.loanStartDate) {
    errors.loanStartDate = 'Loan start date is required';
  }

  if (!inputs.originalDownPayment || inputs.originalDownPayment < 0) {
    errors.originalDownPayment = 'Original down payment must be 0 or greater';
  }
  if (inputs.originalDownPayment > inputs.originalPropertyValue) {
    errors.originalDownPayment = 'Original down payment cannot exceed original property value';
  }

  if (!inputs.originalDownPaymentPercentage || inputs.originalDownPaymentPercentage < 0) {
    errors.originalDownPaymentPercentage = 'Original down payment percentage must be 0 or greater';
  }
  if (inputs.originalDownPaymentPercentage > 100) {
    errors.originalDownPaymentPercentage = 'Original down payment percentage cannot exceed 100%';
  }

  if (!inputs.paymentsMade || inputs.paymentsMade < 0) {
    errors.paymentsMade = 'Payments made must be 0 or greater';
  }
  if (inputs.paymentsMade > inputs.loanTerm * 12) {
    errors.paymentsMade = 'Payments made cannot exceed total loan term';
  }

  if (!inputs.monthsSinceLoanStart || inputs.monthsSinceLoanStart < 0) {
    errors.monthsSinceLoanStart = 'Months since loan start must be 0 or greater';
  }
  if (inputs.monthsSinceLoanStart > inputs.loanTerm * 12) {
    errors.monthsSinceLoanStart = 'Months since loan start cannot exceed total loan term';
  }

  // Appraisal Information Validation
  if (!inputs.appraisalValue || inputs.appraisalValue < 0) {
    errors.appraisalValue = 'Appraisal value must be 0 or greater';
  }
  if (inputs.appraisalValue > 10000000) {
    errors.appraisalValue = 'Appraisal value cannot exceed $10 million';
  }

  if (!inputs.appraisalCost || inputs.appraisalCost < 0) {
    errors.appraisalCost = 'Appraisal cost must be 0 or greater';
  }
  if (inputs.appraisalCost > 2000) {
    errors.appraisalCost = 'Appraisal cost cannot exceed $2,000';
  }

  if (typeof inputs.appraisalRequired !== 'boolean') {
    errors.appraisalRequired = 'Appraisal required must be true or false';
  }

  // Market Information Validation
  if (!inputs.marketLocation || inputs.marketLocation.trim().length === 0) {
    errors.marketLocation = 'Market location is required';
  }

  if (!inputs.marketCondition || !['declining', 'stable', 'growing', 'hot'].includes(inputs.marketCondition)) {
    errors.marketCondition = 'Valid market condition is required';
  }

  if (!inputs.marketGrowthRate || inputs.marketGrowthRate < -50) {
    errors.marketGrowthRate = 'Market growth rate must be -50% or greater';
  }
  if (inputs.marketGrowthRate > 100) {
    errors.marketGrowthRate = 'Market growth rate cannot exceed 100%';
  }

  if (!inputs.comparableSales || inputs.comparableSales.length === 0) {
    errors.comparableSales = 'At least one comparable sale is required';
  } else {
    inputs.comparableSales.forEach((sale, index) => {
      if (!sale.address || sale.address.trim().length === 0) {
        errors[`comparableSales.${index}.address`] = 'Sale address is required';
      }
      if (!sale.salePrice || sale.salePrice <= 0) {
        errors[`comparableSales.${index}.salePrice`] = 'Sale price must be greater than 0';
      }
      if (!sale.saleDate) {
        errors[`comparableSales.${index}.saleDate`] = 'Sale date is required';
      }
      if (!sale.condition || sale.condition.trim().length === 0) {
        errors[`comparableSales.${index}.condition`] = 'Sale condition is required';
      }
    });
  }

  // Borrower Information Validation
  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.borrowerIncome = 'Borrower income must be greater than 0';
  }
  if (inputs.borrowerIncome > 10000000) {
    errors.borrowerIncome = 'Borrower income cannot exceed $10 million';
  }

  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300) {
    errors.borrowerCreditScore = 'Credit score must be 300 or greater';
  }
  if (inputs.borrowerCreditScore > 850) {
    errors.borrowerCreditScore = 'Credit score cannot exceed 850';
  }

  if (!inputs.borrowerDebtToIncomeRatio || inputs.borrowerDebtToIncomeRatio < 0) {
    errors.borrowerDebtToIncomeRatio = 'Debt-to-income ratio must be 0 or greater';
  }
  if (inputs.borrowerDebtToIncomeRatio > 100) {
    errors.borrowerDebtToIncomeRatio = 'Debt-to-income ratio cannot exceed 100%';
  }

  if (!inputs.borrowerEmploymentType || !['employed', 'self_employed', 'retired', 'business_owner'].includes(inputs.borrowerEmploymentType)) {
    errors.borrowerEmploymentType = 'Valid employment type is required';
  }

  // Cancellation Requirements Validation
  if (!inputs.ltvThreshold || inputs.ltvThreshold < 0) {
    errors.ltvThreshold = 'LTV threshold must be 0 or greater';
  }
  if (inputs.ltvThreshold > 100) {
    errors.ltvThreshold = 'LTV threshold cannot exceed 100%';
  }

  if (!inputs.paymentHistory || inputs.paymentHistory.length === 0) {
    errors.paymentHistory = 'Payment history is required';
  } else {
    inputs.paymentHistory.forEach((payment, index) => {
      if (!payment.paymentNumber || payment.paymentNumber <= 0) {
        errors[`paymentHistory.${index}.paymentNumber`] = 'Payment number must be greater than 0';
      }
      if (!payment.paymentDate) {
        errors[`paymentHistory.${index}.paymentDate`] = 'Payment date is required';
      }
      if (!payment.paymentAmount || payment.paymentAmount <= 0) {
        errors[`paymentHistory.${index}.paymentAmount`] = 'Payment amount must be greater than 0';
      }
      if (!payment.principal || payment.principal < 0) {
        errors[`paymentHistory.${index}.principal`] = 'Principal must be 0 or greater';
      }
      if (!payment.interest || payment.interest < 0) {
        errors[`paymentHistory.${index}.interest`] = 'Interest must be 0 or greater';
      }
      if (!payment.balance || payment.balance < 0) {
        errors[`paymentHistory.${index}.balance`] = 'Balance must be 0 or greater';
      }
      if (typeof payment.onTime !== 'boolean') {
        errors[`paymentHistory.${index}.onTime`] = 'On-time status must be true or false';
      }
    });
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.analysisPeriod = 'Analysis period must be greater than 0';
  }
  if (inputs.analysisPeriod > 120) {
    errors.analysisPeriod = 'Analysis period cannot exceed 120 months';
  }

  if (!inputs.inflationRate || inputs.inflationRate < -50) {
    errors.inflationRate = 'Inflation rate must be -50% or greater';
  }
  if (inputs.inflationRate > 100) {
    errors.inflationRate = 'Inflation rate cannot exceed 100%';
  }

  if (!inputs.propertyAppreciationRate || inputs.propertyAppreciationRate < -50) {
    errors.propertyAppreciationRate = 'Property appreciation rate must be -50% or greater';
  }
  if (inputs.propertyAppreciationRate > 100) {
    errors.propertyAppreciationRate = 'Property appreciation rate cannot exceed 100%';
  }

  if (!inputs.discountRate || inputs.discountRate < -100) {
    errors.discountRate = 'Discount rate must be -100% or greater';
  }
  if (inputs.discountRate > 1000) {
    errors.discountRate = 'Discount rate cannot exceed 1000%';
  }

  // Reporting Preferences Validation
  if (!inputs.currency || !['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Valid currency is required';
  }

  if (!inputs.displayFormat || !['percentage', 'decimal', 'currency'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Valid display format is required';
  }

  if (typeof inputs.includeCharts !== 'boolean') {
    errors.includeCharts = 'Include charts must be true or false';
  }

  // Business Logic Validations
  // Check if current loan balance is reasonable relative to original loan amount
  if (inputs.currentLoanBalance > inputs.originalLoanAmount * 1.1) {
    errors.currentLoanBalance = 'Current loan balance seems unusually high relative to original loan amount';
  }

  // Check if current property value is reasonable relative to original property value
  if (inputs.currentPropertyValue < inputs.originalPropertyValue * 0.5) {
    errors.currentPropertyValue = 'Current property value seems unusually low relative to original property value';
  }
  if (inputs.currentPropertyValue > inputs.originalPropertyValue * 3) {
    errors.currentPropertyValue = 'Current property value seems unusually high relative to original property value';
  }

  // Check if PMI rate is reasonable for the loan type
  if (inputs.loanType === 'conventional' && inputs.pmiRate > 1.5) {
    errors.pmiRate = 'PMI rate seems unusually high for conventional loans';
  }

  // Check if down payment percentage matches down payment amount
  const calculatedDownPaymentPercentage = (inputs.originalDownPayment / inputs.originalPropertyValue) * 100;
  if (Math.abs(calculatedDownPaymentPercentage - inputs.originalDownPaymentPercentage) > 5) {
    errors.originalDownPaymentPercentage = 'Down payment percentage does not match down payment amount';
  }

  // Check if payments made matches months since loan start
  if (Math.abs(inputs.paymentsMade - inputs.monthsSinceLoanStart) > 2) {
    errors.paymentsMade = 'Payments made should closely match months since loan start';
  }

  // Check if PMI payment is reasonable for the loan amount
  const expectedPMIPayment = (inputs.originalLoanAmount * inputs.pmiRate / 100) / 12;
  if (Math.abs(expectedPMIPayment - inputs.pmiMonthlyPayment) > expectedPMIPayment * 0.5) {
    errors.pmiMonthlyPayment = 'PMI monthly payment seems inconsistent with PMI rate and loan amount';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

export function validatePMICancellationOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate that all required output fields are present and have reasonable values
  if (typeof outputs.pmiEligibility !== 'boolean') {
    errors.pmiEligibility = 'PMI eligibility must be a boolean';
  }

  if (typeof outputs.currentLtvRatio !== 'number' || isNaN(outputs.currentLtvRatio)) {
    errors.currentLtvRatio = 'Current LTV ratio must be a valid number';
  }

  if (typeof outputs.monthlyPMISavings !== 'number' || isNaN(outputs.monthlyPMISavings)) {
    errors.monthlyPMISavings = 'Monthly PMI savings must be a valid number';
  }

  if (typeof outputs.totalPMISavings !== 'number' || isNaN(outputs.totalPMISavings)) {
    errors.totalPMISavings = 'Total PMI savings must be a valid number';
  }

  if (typeof outputs.breakEvenMonths !== 'number' || isNaN(outputs.breakEvenMonths)) {
    errors.breakEvenMonths = 'Break-even months must be a valid number';
  }

  if (!outputs.automaticCancellationDate || typeof outputs.automaticCancellationDate !== 'string') {
    errors.automaticCancellationDate = 'Automatic cancellation date is required';
  }

  if (!outputs.requestCancellationDate || typeof outputs.requestCancellationDate !== 'string') {
    errors.requestCancellationDate = 'Request cancellation date is required';
  }

  if (typeof outputs.riskScore !== 'number' || isNaN(outputs.riskScore)) {
    errors.riskScore = 'Risk score must be a valid number';
  }

  // Validate analysis object
  if (!outputs.analysis || typeof outputs.analysis !== 'object') {
    errors.analysis = 'Analysis object is required';
  } else {
    if (!outputs.analysis.cancellationRating || typeof outputs.analysis.cancellationRating !== 'string') {
      errors.analysis = 'Cancellation rating is required';
    }
    if (!outputs.analysis.recommendation || typeof outputs.analysis.recommendation !== 'string') {
      errors.analysis = 'Recommendation is required';
    }
  }

  // Validate timeline analysis
  if (!outputs.timelineAnalysis || !Array.isArray(outputs.timelineAnalysis)) {
    errors.timelineAnalysis = 'Timeline analysis array is required';
  }

  // Validate comparison analysis
  if (!outputs.comparisonAnalysis || !Array.isArray(outputs.comparisonAnalysis)) {
    errors.comparisonAnalysis = 'Comparison analysis array is required';
  }

  // Validate metrics object
  if (!outputs.metrics || typeof outputs.metrics !== 'object') {
    errors.metrics = 'Metrics object is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}