import { ValidationRuleFactory } from '../../../utils/validation';
import { LoanToValueRatioInputs } from './formulas';

export function validateLoanToValueRatioInputs(inputs: LoanToValueRatioInputs): string[] {
  const errors: string[] = [];
  const ruleFactory = new ValidationRuleFactory();

  // Required field validations
  ruleFactory
    .required('propertyValue', inputs.propertyValue, 'Property value is required')
    .required('loanAmount', inputs.loanAmount, 'Loan amount is required')
    .validate(errors);

  // Numeric validations
  ruleFactory
    .positive('propertyValue', inputs.propertyValue, 'Property value must be positive')
    .positive('loanAmount', inputs.loanAmount, 'Loan amount must be positive')
    .positive('downPayment', inputs.downPayment, 'Down payment must be positive')
    .positive('creditScore', inputs.creditScore, 'Credit score must be positive')
    .positive('debtToIncomeRatio', inputs.debtToIncomeRatio, 'Debt-to-income ratio must be positive')
    .positive('reserves', inputs.reserves, 'Reserves must be positive')
    .positive('propertyAge', inputs.propertyAge, 'Property age must be positive')
    .positive('loanTerm', inputs.loanTerm, 'Loan term must be positive')
    .positive('interestRate', inputs.interestRate, 'Interest rate must be positive')
    .positive('points', inputs.points, 'Points must be positive')
    .positive('closingCosts', inputs.closingCosts, 'Closing costs must be positive')
    .validate(errors);

  // Range validations
  ruleFactory
    .range('propertyValue', inputs.propertyValue, 10000, 10000000, 'Property value must be between $10,000 and $10,000,000')
    .range('loanAmount', inputs.loanAmount, 1000, 10000000, 'Loan amount must be between $1,000 and $10,000,000')
    .range('downPayment', inputs.downPayment, 0, 5000000, 'Down payment must be between $0 and $5,000,000')
    .range('creditScore', inputs.creditScore, 300, 850, 'Credit score must be between 300 and 850')
    .range('debtToIncomeRatio', inputs.debtToIncomeRatio, 0, 100, 'Debt-to-income ratio must be between 0% and 100%')
    .range('reserves', inputs.reserves, 0, 60, 'Reserves must be between 0 and 60 months')
    .range('propertyAge', inputs.propertyAge, 0, 200, 'Property age must be between 0 and 200 years')
    .range('loanTerm', inputs.loanTerm, 1, 50, 'Loan term must be between 1 and 50 years')
    .range('interestRate', inputs.interestRate, 0, 25, 'Interest rate must be between 0% and 25%')
    .range('points', inputs.points, 0, 10, 'Points must be between 0 and 10')
    .range('closingCosts', inputs.closingCosts, 0, 50000, 'Closing costs must be between $0 and $50,000')
    .validate(errors);

  // Business logic validations
  if (inputs.propertyValue && inputs.loanAmount) {
    // Loan amount cannot exceed property value (except for VA/USDA loans)
    if (inputs.loanAmount > inputs.propertyValue) {
      const loanType = inputs.loanType || 'Conventional';
      if (loanType !== 'VA' && loanType !== 'USDA') {
        errors.push('Loan amount cannot exceed property value for conventional loans');
      }
    }

    // LTV ratio validation
    const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
    
    if (ltvRatio > 100) {
      const loanType = inputs.loanType || 'Conventional';
      if (loanType !== 'VA' && loanType !== 'USDA') {
        errors.push('LTV ratio cannot exceed 100% for conventional loans');
      }
    }

    // LTV limits by loan type
    const loanType = inputs.loanType || 'Conventional';
    const occupancyType = inputs.occupancyType || 'Primary Residence';
    
    if (loanType === 'Conventional') {
      if (occupancyType === 'Investment Property' && ltvRatio > 75) {
        errors.push('Investment properties typically have a maximum LTV ratio of 75%');
      } else if (occupancyType === 'Secondary Home' && ltvRatio > 85) {
        errors.push('Secondary homes typically have a maximum LTV ratio of 85%');
      } else if (ltvRatio > 95) {
        errors.push('Conventional loans typically have a maximum LTV ratio of 95%');
      }
    } else if (loanType === 'FHA') {
      if (ltvRatio > 96.5) {
        errors.push('FHA loans have a maximum LTV ratio of 96.5%');
      }
    } else if (loanType === 'Hard Money') {
      if (ltvRatio > 70) {
        errors.push('Hard money loans typically have a maximum LTV ratio of 70%');
      }
    }
  }

  // Down payment validation
  if (inputs.downPayment && inputs.propertyValue && inputs.loanAmount) {
    const calculatedDownPayment = inputs.propertyValue - inputs.loanAmount;
    const downPaymentDifference = Math.abs(inputs.downPayment - calculatedDownPayment);
    
    if (downPaymentDifference > 1000) {
      errors.push('Down payment should equal property value minus loan amount (within $1,000 tolerance)');
    }
  }

  // Credit score and DTI relationship validation
  if (inputs.creditScore && inputs.debtToIncomeRatio) {
    if (inputs.creditScore < 620 && inputs.debtToIncomeRatio > 43) {
      errors.push('Low credit score combined with high debt-to-income ratio may limit loan options');
    }
  }

  // Property age and condition validation
  if (inputs.propertyAge && inputs.propertyCondition) {
    if (inputs.propertyAge > 50 && inputs.propertyCondition === 'Excellent') {
      errors.push('Property age and condition may need verification');
    }
  }

  // Loan term validation
  if (inputs.loanTerm && inputs.loanType) {
    const loanType = inputs.loanType;
    
    if (loanType === 'ARM' && inputs.loanTerm > 30) {
      errors.push('ARM loans typically have terms of 30 years or less');
    }
    
    if (loanType === 'Interest-Only' && inputs.loanTerm > 10) {
      errors.push('Interest-only loans typically have terms of 10 years or less');
    }
  }

  // Interest rate validation
  if (inputs.interestRate && inputs.loanType) {
    const loanType = inputs.loanType;
    
    if (loanType === 'Hard Money' && inputs.interestRate < 8) {
      errors.push('Hard money loans typically have interest rates of 8% or higher');
    }
    
    if (loanType === 'VA' && inputs.interestRate > 12) {
      errors.push('VA loans typically have interest rates below 12%');
    }
  }

  // Reserves validation
  if (inputs.reserves && inputs.occupancyType) {
    const occupancyType = inputs.occupancyType;
    
    if (occupancyType === 'Investment Property' && inputs.reserves < 6) {
      errors.push('Investment properties typically require 6+ months of reserves');
    }
    
    if (occupancyType === 'Secondary Home' && inputs.reserves < 3) {
      errors.push('Secondary homes typically require 3+ months of reserves');
    }
  }

  // Market condition validation
  if (inputs.marketCondition && inputs.loanType) {
    const marketCondition = inputs.marketCondition;
    const loanType = inputs.loanType;
    
    if (marketCondition === 'Declining' && loanType === 'Conventional') {
      errors.push('Declining market conditions may affect conventional loan availability');
    }
  }

  // Appraisal type validation
  if (inputs.appraisalType && inputs.loanAmount) {
    const appraisalType = inputs.appraisalType;
    const loanAmount = inputs.loanAmount;
    
    if (appraisalType === 'Desktop Appraisal' && loanAmount > 400000) {
      errors.push('Desktop appraisals are typically not used for loans over $400,000');
    }
    
    if (appraisalType === 'Broker Price Opinion' && loanAmount > 250000) {
      errors.push('Broker Price Opinions are typically not used for loans over $250,000');
    }
  }

  // Points validation
  if (inputs.points && inputs.loanAmount) {
    const points = inputs.points;
    const loanAmount = inputs.loanAmount;
    
    if (points > 3 && loanAmount < 200000) {
      errors.push('High points are typically not cost-effective for smaller loan amounts');
    }
  }

  return errors;
}

// Additional validation functions for specific scenarios
export function validateLTVForRefinance(inputs: LoanToValueRatioInputs): string[] {
  const errors: string[] = [];
  
  if (inputs.loanPurpose === 'Refinance' || inputs.loanPurpose === 'Cash-Out Refinance') {
    // For refinances, property should have some equity
    if (inputs.propertyValue && inputs.loanAmount) {
      const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
      
      if (ltvRatio > 95) {
        errors.push('Cash-out refinances typically require LTV ratio below 95%');
      }
      
      if (inputs.loanPurpose === 'Cash-Out Refinance' && ltvRatio > 80) {
        errors.push('Cash-out refinances typically require LTV ratio below 80% for best terms');
      }
    }
  }
  
  return errors;
}

export function validateLTVForInvestment(inputs: LoanToValueRatioInputs): string[] {
  const errors: string[] = [];
  
  if (inputs.occupancyType === 'Investment Property') {
    // Investment properties have stricter requirements
    if (inputs.propertyValue && inputs.loanAmount) {
      const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
      
      if (ltvRatio > 75) {
        errors.push('Investment properties typically have maximum LTV ratio of 75%');
      }
    }
    
    if (inputs.reserves && inputs.reserves < 6) {
      errors.push('Investment properties typically require 6+ months of reserves');
    }
    
    if (inputs.creditScore && inputs.creditScore < 720) {
      errors.push('Investment properties typically require credit score of 720 or higher');
    }
  }
  
  return errors;
}

export function validateLTVForJumbo(inputs: LoanToValueRatioInputs): string[] {
  const errors: string[] = [];
  
  if (inputs.loanType === 'Jumbo') {
    // Jumbo loans have stricter requirements
    if (inputs.propertyValue && inputs.loanAmount) {
      const ltvRatio = (inputs.loanAmount / inputs.propertyValue) * 100;
      
      if (ltvRatio > 80) {
        errors.push('Jumbo loans typically have maximum LTV ratio of 80%');
      }
    }
    
    if (inputs.creditScore && inputs.creditScore < 740) {
      errors.push('Jumbo loans typically require credit score of 740 or higher');
    }
    
    if (inputs.debtToIncomeRatio && inputs.debtToIncomeRatio > 36) {
      errors.push('Jumbo loans typically require debt-to-income ratio below 36%');
    }
    
    if (inputs.reserves && inputs.reserves < 12) {
      errors.push('Jumbo loans typically require 12+ months of reserves');
    }
  }
  
  return errors;
}