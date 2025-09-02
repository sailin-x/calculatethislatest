import { PrivateMortgageInsuranceInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validatePrivateMortgageInsuranceInputs(inputs: PrivateMortgageInsuranceInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Loan Information Validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.loanAmount = 'Loan amount must be greater than 0';
  }
  if (inputs.loanAmount > 10000000) {
    errors.loanAmount = 'Loan amount cannot exceed $10 million';
  }

  if (!inputs.interestRate || inputs.interestRate <= 0) {
    errors.interestRate = 'Interest rate must be greater than 0';
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
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be greater than 0';
  }
  if (inputs.propertyValue > 10000000) {
    errors.propertyValue = 'Property value cannot exceed $10 million';
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.propertyAddress = 'Property address is required';
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

  // Down Payment Information Validation
  if (!inputs.downPayment || inputs.downPayment < 0) {
    errors.downPayment = 'Down payment must be 0 or greater';
  }
  if (inputs.downPayment > inputs.propertyValue) {
    errors.downPayment = 'Down payment cannot exceed property value';
  }

  if (!inputs.downPaymentPercentage || inputs.downPaymentPercentage < 0) {
    errors.downPaymentPercentage = 'Down payment percentage must be 0 or greater';
  }
  if (inputs.downPaymentPercentage > 100) {
    errors.downPaymentPercentage = 'Down payment percentage cannot exceed 100%';
  }

  if (!inputs.downPaymentSource || !['savings', 'investment_sale', 'gift', 'inheritance', 'other'].includes(inputs.downPaymentSource)) {
    errors.downPaymentSource = 'Valid down payment source is required';
  }

  // PMI Information Validation
  if (typeof inputs.pmiRequired !== 'boolean') {
    errors.pmiRequired = 'PMI required must be true or false';
  }

  if (!inputs.pmiRate || inputs.pmiRate < 0) {
    errors.pmiRate = 'PMI rate must be 0 or greater';
  }
  if (inputs.pmiRate > 5) {
    errors.pmiRate = 'PMI rate cannot exceed 5%';
  }

  if (!inputs.pmiType || !['monthly', 'single_premium', 'split_premium', 'lender_paid'].includes(inputs.pmiType)) {
    errors.pmiType = 'Valid PMI type is required';
  }

  if (!inputs.pmiCancellationMethod || !['automatic', 'request', 'refinance'].includes(inputs.pmiCancellationMethod)) {
    errors.pmiCancellationMethod = 'Valid PMI cancellation method is required';
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

  if (!inputs.borrowerTaxRate || inputs.borrowerTaxRate < 0) {
    errors.borrowerTaxRate = 'Tax rate must be 0 or greater';
  }
  if (inputs.borrowerTaxRate > 50) {
    errors.borrowerTaxRate = 'Tax rate cannot exceed 50%';
  }

  // Loan History Validation
  if (!inputs.loanStartDate || inputs.loanStartDate.trim().length === 0) {
    errors.loanStartDate = 'Loan start date is required';
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

  if (!inputs.currentPrincipalBalance || inputs.currentPrincipalBalance <= 0) {
    errors.currentPrincipalBalance = 'Current principal balance must be greater than 0';
  }
  if (inputs.currentPrincipalBalance > inputs.loanAmount) {
    errors.currentPrincipalBalance = 'Current principal balance cannot exceed original loan amount';
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

  if (!inputs.propertyAppreciationRate || inputs.propertyAppreciationRate < -50) {
    errors.propertyAppreciationRate = 'Property appreciation rate must be -50% or greater';
  }
  if (inputs.propertyAppreciationRate > 100) {
    errors.propertyAppreciationRate = 'Property appreciation rate cannot exceed 100%';
  }

  // PMI Requirements Validation
  if (!inputs.ltvThreshold || inputs.ltvThreshold <= 0) {
    errors.ltvThreshold = 'LTV threshold must be greater than 0';
  }
  if (inputs.ltvThreshold > 100) {
    errors.ltvThreshold = 'LTV threshold cannot exceed 100%';
  }

  if (!inputs.paymentHistory || !Array.isArray(inputs.paymentHistory)) {
    errors.paymentHistory = 'Payment history must be an array';
  } else {
    inputs.paymentHistory.forEach((payment, index) => {
      if (!payment.paymentNumber || payment.paymentNumber <= 0) {
        errors[`paymentHistory.${index}.paymentNumber`] = 'Payment number must be greater than 0';
      }
      if (!payment.paymentDate || payment.paymentDate.trim().length === 0) {
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
        errors[`paymentHistory.${index}.onTime`] = 'On time status must be true or false';
      }
    });
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.analysisPeriod = 'Analysis period must be greater than 0';
  }
  if (inputs.analysisPeriod > 360) {
    errors.analysisPeriod = 'Analysis period cannot exceed 360 months';
  }

  if (!inputs.inflationRate || inputs.inflationRate < -50) {
    errors.inflationRate = 'Inflation rate must be -50% or greater';
  }
  if (inputs.inflationRate > 100) {
    errors.inflationRate = 'Inflation rate cannot exceed 100%';
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
  // Check if loan amount is reasonable relative to property value
  const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
  if (ltvRatio > 100) {
    errors.loanAmount = 'Loan amount cannot exceed property value';
  }
  if (ltvRatio < 10) {
    errors.loanAmount = 'Loan amount seems unusually low relative to property value';
  }

  // Check if down payment is consistent with loan amount
  const calculatedDownPayment = inputs.propertyValue - inputs.loanAmount;
  if (Math.abs(inputs.downPayment - calculatedDownPayment) > 1000) {
    errors.downPayment = 'Down payment should equal property value minus loan amount';
  }

  // Check if down payment percentage is consistent
  const calculatedDownPaymentPercentage = (inputs.downPayment / inputs.propertyValue) * 100;
  if (Math.abs(inputs.downPaymentPercentage - calculatedDownPaymentPercentage) > 1) {
    errors.downPaymentPercentage = 'Down payment percentage should match down payment amount';
  }

  // Check if current principal balance is reasonable
  const maxPossibleBalance = inputs.loanAmount;
  if (inputs.currentPrincipalBalance > maxPossibleBalance) {
    errors.currentPrincipalBalance = 'Current principal balance cannot exceed original loan amount';
  }

  // Check if payments made is consistent with months since loan start
  if (inputs.paymentsMade > inputs.monthsSinceLoanStart) {
    errors.paymentsMade = 'Payments made cannot exceed months since loan start';
  }

  // Check if PMI rate is reasonable for loan type
  if (inputs.loanType === 'conventional' && inputs.pmiRate > 1.5) {
    errors.pmiRate = 'PMI rate seems unusually high for conventional loan';
  }
  if (inputs.loanType === 'fha' && inputs.pmiRate > 1.75) {
    errors.pmiRate = 'PMI rate seems unusually high for FHA loan';
  }

  // Check if credit score is reasonable for loan type
  if (inputs.loanType === 'conventional' && inputs.borrowerCreditScore < 620) {
    errors.borrowerCreditScore = 'Credit score seems low for conventional loan';
  }
  if (inputs.loanType === 'fha' && inputs.borrowerCreditScore < 580) {
    errors.borrowerCreditScore = 'Credit score seems low for FHA loan';
  }

  // Check if DTI is reasonable
  if (inputs.borrowerDebtToIncomeRatio > 50) {
    errors.borrowerDebtToIncomeRatio = 'Debt-to-income ratio seems unusually high';
  }

  // Check if property size is reasonable for property type
  if (inputs.propertyType === 'single_family' && inputs.propertySize > 10000) {
    errors.propertySize = 'Property size seems unusually large for single family home';
  }
  if (inputs.propertyType === 'condo' && inputs.propertySize > 5000) {
    errors.propertySize = 'Property size seems unusually large for condominium';
  }

  // Check if property age is reasonable for property type
  if (inputs.propertyType === 'new_construction' && inputs.propertyAge > 5) {
    errors.propertyAge = 'Property age seems inconsistent with new construction';
  }

  // Check if LTV threshold is reasonable
  if (inputs.ltvThreshold < 70 || inputs.ltvThreshold > 95) {
    errors.ltvThreshold = 'LTV threshold should typically be between 70% and 95%';
  }

  // Check if analysis period is reasonable
  if (inputs.analysisPeriod > inputs.loanTerm * 12) {
    errors.analysisPeriod = 'Analysis period should not exceed loan term';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

export function validatePrivateMortgageInsuranceOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate that all required output fields are present and have reasonable values
  if (typeof outputs.pmiRequired !== 'boolean') {
    errors.pmiRequired = 'PMI required must be a boolean';
  }

  if (typeof outputs.pmiMonthlyPayment !== 'number' || isNaN(outputs.pmiMonthlyPayment)) {
    errors.pmiMonthlyPayment = 'PMI monthly payment must be a valid number';
  }

  if (typeof outputs.pmiAnnualCost !== 'number' || isNaN(outputs.pmiAnnualCost)) {
    errors.pmiAnnualCost = 'PMI annual cost must be a valid number';
  }

  if (typeof outputs.loanToValueRatio !== 'number' || isNaN(outputs.loanToValueRatio)) {
    errors.loanToValueRatio = 'Loan-to-value ratio must be a valid number';
  }

  if (typeof outputs.cancellationEligibility !== 'boolean') {
    errors.cancellationEligibility = 'Cancellation eligibility must be a boolean';
  }

  if (typeof outputs.breakEvenMonths !== 'number' || isNaN(outputs.breakEvenMonths)) {
    errors.breakEvenMonths = 'Break-even months must be a valid number';
  }

  if (typeof outputs.riskScore !== 'number' || isNaN(outputs.riskScore)) {
    errors.riskScore = 'Risk score must be a valid number';
  }

  if (typeof outputs.totalPMICost !== 'number' || isNaN(outputs.totalPMICost)) {
    errors.totalPMICost = 'Total PMI cost must be a valid number';
  }

  // Validate analysis object
  if (!outputs.analysis || typeof outputs.analysis !== 'object') {
    errors.analysis = 'Analysis object is required';
  } else {
    if (!outputs.analysis.pmiRating || typeof outputs.analysis.pmiRating !== 'string') {
      errors.analysis = 'PMI rating is required';
    }
    if (!outputs.analysis.costRating || typeof outputs.analysis.costRating !== 'string') {
      errors.analysis = 'Cost rating is required';
    }
    if (!outputs.analysis.recommendation || typeof outputs.analysis.recommendation !== 'string') {
      errors.analysis = 'Recommendation is required';
    }
  }

  // Validate additional metrics
  if (typeof outputs.pmiRate !== 'number' || isNaN(outputs.pmiRate)) {
    errors.pmiRate = 'PMI rate must be a valid number';
  }

  if (typeof outputs.pmiTotalCost !== 'number' || isNaN(outputs.pmiTotalCost)) {
    errors.pmiTotalCost = 'PMI total cost must be a valid number';
  }

  if (typeof outputs.currentLtvRatio !== 'number' || isNaN(outputs.currentLtvRatio)) {
    errors.currentLtvRatio = 'Current LTV ratio must be a valid number';
  }

  if (typeof outputs.ltvGap !== 'number' || isNaN(outputs.ltvGap)) {
    errors.ltvGap = 'LTV gap must be a valid number';
  }

  if (typeof outputs.equityPosition !== 'number' || isNaN(outputs.equityPosition)) {
    errors.equityPosition = 'Equity position must be a valid number';
  }

  if (typeof outputs.equityPercentage !== 'number' || isNaN(outputs.equityPercentage)) {
    errors.equityPercentage = 'Equity percentage must be a valid number';
  }

  if (typeof outputs.monthlyPayment !== 'number' || isNaN(outputs.monthlyPayment)) {
    errors.monthlyPayment = 'Monthly payment must be a valid number';
  }

  if (typeof outputs.monthlyPaymentWithoutPMI !== 'number' || isNaN(outputs.monthlyPaymentWithoutPMI)) {
    errors.monthlyPaymentWithoutPMI = 'Monthly payment without PMI must be a valid number';
  }

  if (typeof outputs.paymentIncrease !== 'number' || isNaN(outputs.paymentIncrease)) {
    errors.paymentIncrease = 'Payment increase must be a valid number';
  }

  if (typeof outputs.paymentIncreasePercentage !== 'number' || isNaN(outputs.paymentIncreasePercentage)) {
    errors.paymentIncreasePercentage = 'Payment increase percentage must be a valid number';
  }

  if (typeof outputs.pmiSavings !== 'number' || isNaN(outputs.pmiSavings)) {
    errors.pmiSavings = 'PMI savings must be a valid number';
  }

  if (typeof outputs.effectiveInterestRate !== 'number' || isNaN(outputs.effectiveInterestRate)) {
    errors.effectiveInterestRate = 'Effective interest rate must be a valid number';
  }

  if (typeof outputs.totalLoanCost !== 'number' || isNaN(outputs.totalLoanCost)) {
    errors.totalLoanCost = 'Total loan cost must be a valid number';
  }

  if (!outputs.automaticCancellationDate || typeof outputs.automaticCancellationDate !== 'string') {
    errors.automaticCancellationDate = 'Automatic cancellation date is required';
  }

  if (!outputs.requestCancellationDate || typeof outputs.requestCancellationDate !== 'string') {
    errors.requestCancellationDate = 'Request cancellation date is required';
  }

  if (typeof outputs.monthsToAutomaticCancellation !== 'number' || isNaN(outputs.monthsToAutomaticCancellation)) {
    errors.monthsToAutomaticCancellation = 'Months to automatic cancellation must be a valid number';
  }

  if (typeof outputs.monthsToRequestCancellation !== 'number' || isNaN(outputs.monthsToRequestCancellation)) {
    errors.monthsToRequestCancellation = 'Months to request cancellation must be a valid number';
  }

  if (typeof outputs.breakEvenPoint !== 'number' || isNaN(outputs.breakEvenPoint)) {
    errors.breakEvenPoint = 'Break-even point must be a valid number';
  }

  if (typeof outputs.breakEvenCost !== 'number' || isNaN(outputs.breakEvenCost)) {
    errors.breakEvenCost = 'Break-even cost must be a valid number';
  }

  if (typeof outputs.netSavings !== 'number' || isNaN(outputs.netSavings)) {
    errors.netSavings = 'Net savings must be a valid number';
  }

  // Validate arrays
  if (!outputs.timelineAnalysis || !Array.isArray(outputs.timelineAnalysis)) {
    errors.timelineAnalysis = 'Timeline analysis array is required';
  }

  if (!outputs.sensitivityMatrix || !Array.isArray(outputs.sensitivityMatrix)) {
    errors.sensitivityMatrix = 'Sensitivity matrix array is required';
  }

  if (!outputs.scenarios || !Array.isArray(outputs.scenarios)) {
    errors.scenarios = 'Scenarios array is required';
  }

  if (!outputs.comparisonAnalysis || !Array.isArray(outputs.comparisonAnalysis)) {
    errors.comparisonAnalysis = 'Comparison analysis array is required';
  }

  if (typeof outputs.probabilityOfCancellation !== 'number' || isNaN(outputs.probabilityOfCancellation)) {
    errors.probabilityOfCancellation = 'Probability of cancellation must be a valid number';
  }

  if (typeof outputs.worstCaseScenario !== 'number' || isNaN(outputs.worstCaseScenario)) {
    errors.worstCaseScenario = 'Worst case scenario must be a valid number';
  }

  if (typeof outputs.bestCaseScenario !== 'number' || isNaN(outputs.bestCaseScenario)) {
    errors.bestCaseScenario = 'Best case scenario must be a valid number';
  }

  if (typeof outputs.taxDeduction !== 'number' || isNaN(outputs.taxDeduction)) {
    errors.taxDeduction = 'Tax deduction must be a valid number';
  }

  if (typeof outputs.afterTaxCost !== 'number' || isNaN(outputs.afterTaxCost)) {
    errors.afterTaxCost = 'After tax cost must be a valid number';
  }

  if (typeof outputs.taxBenefit !== 'number' || isNaN(outputs.taxBenefit)) {
    errors.taxBenefit = 'Tax benefit must be a valid number';
  }

  if (!outputs.marketAnalysis || !Array.isArray(outputs.marketAnalysis)) {
    errors.marketAnalysis = 'Market analysis array is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}