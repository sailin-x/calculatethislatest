import { HomeEquityLoanInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateHomeEquityLoanInputs(inputs: HomeEquityLoanInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Property Information Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.push('Property address is required');
  }

  if (!inputs.propertyType) {
    errors.push('Property type is required');
  }

  if (inputs.propertyAge === undefined || inputs.propertyAge < 0) {
    errors.push('Property age must be 0 or greater');
  }

  if (inputs.propertyAge > 100) {
    errors.push('Property age cannot exceed 100 years');
  }

  if (!inputs.propertyCondition) {
    errors.push('Property condition is required');
  }

  // Current Mortgage Information Validation
  if (inputs.currentMortgageBalance === undefined || inputs.currentMortgageBalance < 0) {
    errors.push('Current mortgage balance must be 0 or greater');
  }

  if (inputs.currentMortgageBalance > inputs.propertyValue) {
    errors.push('Current mortgage balance cannot exceed property value');
  }

  if (!inputs.currentMortgageRate || inputs.currentMortgageRate <= 0) {
    errors.push('Current mortgage rate must be greater than 0');
  }

  if (inputs.currentMortgageRate > 20) {
    errors.push('Current mortgage rate cannot exceed 20%');
  }

  if (inputs.currentMortgagePayment === undefined || inputs.currentMortgagePayment < 0) {
    errors.push('Current mortgage payment must be 0 or greater');
  }

  if (!inputs.mortgageType) {
    errors.push('Mortgage type is required');
  }

  // Home Equity Loan Information Validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount must be greater than 0');
  }

  if (inputs.loanAmount > 1000000) {
    errors.push('Loan amount cannot exceed $1,000,000');
  }

  if (!inputs.interestRate || inputs.interestRate <= 0) {
    errors.push('Interest rate must be greater than 0');
  }

  if (inputs.interestRate > 15) {
    errors.push('Interest rate cannot exceed 15%');
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.push('Loan term must be greater than 0');
  }

  if (inputs.loanTerm > 30) {
    errors.push('Loan term cannot exceed 30 years');
  }

  if (!inputs.paymentType) {
    errors.push('Payment type is required');
  }

  if (!inputs.paymentFrequency) {
    errors.push('Payment frequency is required');
  }

  // Borrower Information Validation
  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
    errors.push('Borrower credit score must be between 300 and 850');
  }

  if (!inputs.borrowerIncome || inputs.borrowerIncome <= 0) {
    errors.push('Borrower income must be greater than 0');
  }

  if (inputs.borrowerDebtToIncomeRatio === undefined || inputs.borrowerDebtToIncomeRatio < 0) {
    errors.push('DebtToIncome ratio must be 0 or greater');
  }

  if (inputs.borrowerDebtToIncomeRatio > 100) {
    errors.push('DebtToIncome ratio cannot exceed 100%');
  }

  if (!inputs.borrowerEmploymentType) {
    errors.push('Employment type is required');
  }

  if (inputs.borrowerEmploymentLength === undefined || inputs.borrowerEmploymentLength < 0) {
    errors.push('Employment length must be 0 or greater');
  }

  if (inputs.borrowerEmploymentLength > 50) {
    errors.push('Employment length cannot exceed 50 years');
  }

  // Fees and Costs Validation
  if (inputs.originationFee === undefined || inputs.originationFee < 0) {
    errors.push('Origination fee must be 0 or greater');
  }

  if (inputs.appraisalFee === undefined || inputs.appraisalFee < 0) {
    errors.push('Appraisal fee must be 0 or greater');
  }

  if (inputs.titleInsuranceFee === undefined || inputs.titleInsuranceFee < 0) {
    errors.push('Title insurance fee must be 0 or greater');
  }

  if (inputs.recordingFee === undefined || inputs.recordingFee < 0) {
    errors.push('Recording fee must be 0 or greater');
  }

  if (inputs.attorneyFee === undefined || inputs.attorneyFee < 0) {
    errors.push('Attorney fee must be 0 or greater');
  }

  if (inputs.creditReportFee === undefined || inputs.creditReportFee < 0) {
    errors.push('Credit report fee must be 0 or greater');
  }

  if (inputs.floodCertificationFee === undefined || inputs.floodCertificationFee < 0) {
    errors.push('Flood certification fee must be 0 or greater');
  }

  if (inputs.taxServiceFee === undefined || inputs.taxServiceFee < 0) {
    errors.push('Tax service fee must be 0 or greater');
  }

  if (inputs.otherFees === undefined || inputs.otherFees < 0) {
    errors.push('Other fees must be 0 or greater');
  }

  // Loan Purpose Validation
  if (!inputs.loanPurpose) {
    errors.push('Loan purpose is required');
  }

  if (!inputs.purposeDescription || inputs.purposeDescription.trim().length === 0) {
    errors.push('Purpose description is required');
  }

  // Market Information Validation
  if (!inputs.marketCondition) {
    errors.push('Market condition is required');
  }

  if (inputs.marketGrowthRate === undefined) {
    errors.push('Market growth rate is required');
  }

  if (inputs.marketGrowthRate < -10 || inputs.marketGrowthRate > 20) {
    errors.push('Market growth rate must be between -10% and 20%');
  }

  // Risk Factors Validation
  if (!inputs.marketRisk) {
    errors.push('Market risk is required');
  }

  if (!inputs.propertyRisk) {
    errors.push('Property risk is required');
  }

  if (!inputs.borrowerRisk) {
    errors.push('Borrower risk is required');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  }

  if (inputs.analysisPeriod > 30) {
    errors.push('Analysis period cannot exceed 30 years');
  }

  if (inputs.inflationRate === undefined) {
    errors.push('Inflation rate is required');
  }

  if (inputs.inflationRate < -5 || inputs.inflationRate > 15) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  if (inputs.taxRate === undefined || inputs.taxRate < 0) {
    errors.push('Tax rate must be 0 or greater');
  }

  if (inputs.taxRate > 50) {
    errors.push('Tax rate cannot exceed 50%');
  }

  // Reporting Preferences Validation
  if (!inputs.currency) {
    errors.push('Currency is required');
  }

  if (!inputs.displayFormat) {
    errors.push('Display format is required');
  }

  if (inputs.includeCharts === undefined) {
    errors.push('Include charts field is required');
  }

  // Business Logic Validation
  const totalEquity = inputs.propertyValue - inputs.currentMortgageBalance;
  const combinedLTV = ((inputs.currentMortgageBalance + inputs.loanAmount) / inputs.propertyValue) * 100;

  if (combinedLTV > 95) {
    errors.push('Combined LTV cannot exceed 95%');
  }

  if (inputs.loanAmount > totalEquity * 0.9) {
    errors.push('Loan amount cannot exceed 90% of available equity');
  }

  if (inputs.borrowerCreditScore < 620) {
    warnings.push('Credit score below 620 may affect loan approval');
  }

  if (inputs.borrowerDebtToIncomeRatio > 50) {
    warnings.push('High DebtToIncome ratio may affect loan approval');
  }

  if (inputs.borrowerEmploymentType === 'unemployed') {
    warnings.push('Unemployment may affect loan approval');
  }

  if (inputs.borrowerEmploymentLength < 2) {
    warnings.push('Short employment history may affect loan approval');
  }

  if (inputs.propertyCondition === 'poor') {
    warnings.push('Poor property condition may affect loan approval');
  }

  if (inputs.propertyAge > 50) {
    warnings.push('Older property may affect loan terms');
  }

  if (inputs.interestRate > 10) {
    warnings.push('High interest rate may indicate risk');
  }

  if (inputs.paymentType === 'balloon') {
    warnings.push('Balloon payment structure increases risk');
  }

  if (inputs.paymentType === 'interest_only') {
    warnings.push('Interest-only payments may increase long-term risk');
  }

  if (inputs.marketCondition === 'declining') {
    warnings.push('Declining market conditions increase risk');
  }

  if (combinedLTV > 85) {
    warnings.push('High combined LTV increases risk');
  }

  if (inputs.loanAmount > 500000) {
    warnings.push('Large loan amount may require additional underwriting');
  }

  // Cross-field Validation
  if (inputs.currentMortgagePayment && inputs.borrowerIncome) {
    const monthlyIncome = inputs.borrowerIncome / 12;
    const housingRatio = (inputs.currentMortgagePayment / monthlyIncome) * 100;
    if (housingRatio > 50) {
      warnings.push('High housing expense ratio may affect affordability');
    }
  }

  if (inputs.loanAmount && inputs.borrowerIncome) {
    const annualIncome = inputs.borrowerIncome;
    const loanToIncomeRatio = (inputs.loanAmount / annualIncome) * 100;
    if (loanToIncomeRatio > 200) {
      warnings.push('High LoanToIncome ratio may affect approval');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
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
      if (value && typeof value !== 'number') return 'DebtToIncome ratio must be a number';
      if (value && (value < 0 || value > 100)) return 'DebtToIncome ratio must be between 0% and 100%';
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
