import { CalculatorInputs } from '../../../types/calculator';

export interface MortgageInsuranceInputs extends CalculatorInputs {
  loanAmount: number;
  propertyValue: number;
  downPayment?: number;
  downPaymentPercentage?: number;
  loanType: string;
  creditScore?: number;
  debtToIncomeRatio?: number;
  propertyType?: string;
  occupancyType?: string;
  loanTerm?: number;
  interestRate?: number;
  monthlyPayment?: number;
  fhaUpfrontMIP?: number;
  fhaAnnualMIP?: number;
  vaFundingFee?: number;
  usdaGuaranteeFee?: number;
  pmiRate?: number;
  pmiCancellationThreshold?: number;
  propertyAppreciationRate?: number;
  additionalPrincipalPayment?: number;
  refinanceOption?: string;
  refinanceRate?: number;
  refinanceClosingCosts?: number;
  timeHorizon?: number;
}

export const validateMortgageInsuranceInputs = (inputs: Partial<MortgageInsuranceInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount is required and must be greater than 0');
  }

  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value is required and must be greater than 0');
  }

  if (!inputs.loanType) {
    errors.push('Loan type is required');
  }

  // Range validation
  if (inputs.loanAmount && (inputs.loanAmount < 10000 || inputs.loanAmount > 5000000)) {
    errors.push('Loan amount must be between $10,000 and $5,000,000');
  }

  if (inputs.propertyValue && (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000)) {
    errors.push('Property value must be between $10,000 and $10,000,000');
  }

  if (inputs.downPayment && inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }

  if (inputs.downPaymentPercentage && (inputs.downPaymentPercentage < 0 || inputs.downPaymentPercentage > 100)) {
    errors.push('Down payment percentage must be between 0% and 100%');
  }

  if (inputs.creditScore && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    errors.push('Credit score must be between 300 and 850');
  }

  if (inputs.debtToIncomeRatio && (inputs.debtToIncomeRatio < 0 || inputs.debtToIncomeRatio > 100)) {
    errors.push('Debt-to-income ratio must be between 0% and 100%');
  }

  if (inputs.loanTerm && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  if (inputs.interestRate && (inputs.interestRate < 0 || inputs.interestRate > 25)) {
    errors.push('Interest rate must be between 0% and 25%');
  }

  if (inputs.monthlyPayment && (inputs.monthlyPayment < 0 || inputs.monthlyPayment > 50000)) {
    errors.push('Monthly payment must be between $0 and $50,000');
  }

  // Loan type specific validation
  if (inputs.loanType) {
    switch (inputs.loanType) {
      case 'FHA':
        if (inputs.fhaUpfrontMIP && (inputs.fhaUpfrontMIP < 0 || inputs.fhaUpfrontMIP > 10)) {
          errors.push('FHA upfront MIP must be between 0% and 10%');
        }
        if (inputs.fhaAnnualMIP && (inputs.fhaAnnualMIP < 0 || inputs.fhaAnnualMIP > 5)) {
          errors.push('FHA annual MIP must be between 0% and 5%');
        }
        break;
      case 'VA':
        if (inputs.vaFundingFee && (inputs.vaFundingFee < 0 || inputs.vaFundingFee > 10)) {
          errors.push('VA funding fee must be between 0% and 10%');
        }
        break;
      case 'USDA':
        if (inputs.usdaGuaranteeFee && (inputs.usdaGuaranteeFee < 0 || inputs.usdaGuaranteeFee > 5)) {
          errors.push('USDA guarantee fee must be between 0% and 5%');
        }
        break;
      case 'Conventional':
      case 'Jumbo':
        if (inputs.pmiRate && (inputs.pmiRate < 0 || inputs.pmiRate > 2)) {
          errors.push('PMI rate must be between 0% and 2%');
        }
        break;
    }
  }

  // PMI cancellation threshold validation
  if (inputs.pmiCancellationThreshold && (inputs.pmiCancellationThreshold < 70 || inputs.pmiCancellationThreshold > 85)) {
    errors.push('PMI cancellation threshold must be between 70% and 85%');
  }

  // Property appreciation rate validation
  if (inputs.propertyAppreciationRate && (inputs.propertyAppreciationRate < -10 || inputs.propertyAppreciationRate > 20)) {
    errors.push('Property appreciation rate must be between -10% and 20%');
  }

  // Additional principal payment validation
  if (inputs.additionalPrincipalPayment && (inputs.additionalPrincipalPayment < 0 || inputs.additionalPrincipalPayment > 10000)) {
    errors.push('Additional principal payment must be between $0 and $10,000 per month');
  }

  // Refinance validation
  if (inputs.refinanceRate && (inputs.refinanceRate < 0 || inputs.refinanceRate > 25)) {
    errors.push('Refinance rate must be between 0% and 25%');
  }

  if (inputs.refinanceClosingCosts && (inputs.refinanceClosingCosts < 0 || inputs.refinanceClosingCosts > 50000)) {
    errors.push('Refinance closing costs must be between $0 and $50,000');
  }

  // Time horizon validation
  if (inputs.timeHorizon && (inputs.timeHorizon < 1 || inputs.timeHorizon > 30)) {
    errors.push('Time horizon must be between 1 and 30 years');
  }

  // Logical validation
  if (inputs.loanAmount && inputs.propertyValue && inputs.loanAmount > inputs.propertyValue) {
    errors.push('Loan amount cannot exceed property value');
  }

  if (inputs.downPayment && inputs.propertyValue && inputs.downPayment > inputs.propertyValue) {
    errors.push('Down payment cannot exceed property value');
  }

  if (inputs.downPayment && inputs.downPaymentPercentage && inputs.propertyValue) {
    const calculatedDownPayment = inputs.propertyValue * (inputs.downPaymentPercentage / 100);
    const difference = Math.abs(inputs.downPayment - calculatedDownPayment);
    if (difference > 1000) {
      errors.push('Down payment amount and percentage are inconsistent');
    }
  }

  // Loan type and property type compatibility
  if (inputs.loanType && inputs.propertyType) {
    const incompatibleCombinations = [
      { loanType: 'VA', propertyType: 'Investment Property' },
      { loanType: 'USDA', propertyType: 'Investment Property' },
      { loanType: 'FHA', propertyType: 'Commercial' }
    ];

    const isIncompatible = incompatibleCombinations.some(combo => 
      combo.loanType === inputs.loanType && combo.propertyType === inputs.propertyType
    );

    if (isIncompatible) {
      errors.push(`${inputs.loanType} loans are not available for ${inputs.propertyType}`);
    }
  }

  // Occupancy type validation
  if (inputs.occupancyType && inputs.loanType) {
    if (inputs.loanType === 'VA' && inputs.occupancyType === 'Investment') {
      errors.push('VA loans are not available for investment properties');
    }
    if (inputs.loanType === 'USDA' && inputs.occupancyType === 'Investment') {
      errors.push('USDA loans are not available for investment properties');
    }
  }

  // Credit score and loan type compatibility
  if (inputs.creditScore && inputs.loanType) {
    if (inputs.loanType === 'Conventional' && inputs.creditScore < 620) {
      errors.push('Conventional loans typically require a credit score of 620 or higher');
    }
    if (inputs.loanType === 'FHA' && inputs.creditScore < 500) {
      errors.push('FHA loans typically require a credit score of 500 or higher');
    }
  }

  // Debt-to-income ratio validation
  if (inputs.debtToIncomeRatio && inputs.loanType) {
    const maxDTI = {
      'Conventional': 43,
      'FHA': 43,
      'VA': 41,
      'USDA': 41,
      'Jumbo': 45
    };

    const maxAllowed = maxDTI[inputs.loanType as keyof typeof maxDTI];
    if (maxAllowed && inputs.debtToIncomeRatio > maxAllowed) {
      errors.push(`${inputs.loanType} loans typically require a debt-to-income ratio of ${maxAllowed}% or less`);
    }
  }

  // Loan amount limits by loan type
  if (inputs.loanAmount && inputs.loanType) {
    const loanLimits = {
      'Conventional': 647200,
      'FHA': 970800,
      'VA': 970800,
      'USDA': 970800
    };

    const limit = loanLimits[inputs.loanType as keyof typeof loanLimits];
    if (limit && inputs.loanAmount > limit) {
      errors.push(`${inputs.loanType} loan amount exceeds the maximum limit of $${limit.toLocaleString()}`);
    }
  }

  // Refinance option validation
  if (inputs.refinanceOption && inputs.refinanceOption !== 'No Refinance') {
    if (inputs.refinanceOption === 'FHA Streamline' && inputs.loanType !== 'FHA') {
      errors.push('FHA Streamline refinancing is only available for existing FHA loans');
    }
    if (inputs.refinanceOption === 'VA IRRRL' && inputs.loanType !== 'VA') {
      errors.push('VA IRRRL refinancing is only available for existing VA loans');
    }
    if (inputs.refinanceOption === 'USDA Streamline' && inputs.loanType !== 'USDA') {
      errors.push('USDA Streamline refinancing is only available for existing USDA loans');
    }
  }

  return { isValid: errors.length === 0, errors };
};