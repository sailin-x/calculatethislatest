import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateInterestOnlyMortgageInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.loanAmount) {
    errors.push('Loan amount is required');
  } else if (typeof inputs.loanAmount !== 'number' || inputs.loanAmount <= 0) {
    errors.push('Loan amount must be a positive number');
  } else if (inputs.loanAmount < 10000 || inputs.loanAmount > 10000000) {
    errors.push('Loan amount must be between $10,000 and $10,000,000');
  }

  if (!inputs.interestRate) {
    errors.push('Interest rate is required');
  } else if (typeof inputs.interestRate !== 'number' || inputs.interestRate <= 0) {
    errors.push('Interest rate must be a positive number');
  } else if (inputs.interestRate < 0.1 || inputs.interestRate > 20) {
    errors.push('Interest rate must be between 0.1% and 20%');
  }

  if (!inputs.interestOnlyPeriod) {
    errors.push('Interest-only period is required');
  } else if (typeof inputs.interestOnlyPeriod !== 'number' || inputs.interestOnlyPeriod <= 0) {
    errors.push('Interest-only period must be a positive number');
  } else if (inputs.interestOnlyPeriod < 1 || inputs.interestOnlyPeriod > 30) {
    errors.push('Interest-only period must be between 1 and 30 years');
  }

  if (!inputs.totalLoanTerm) {
    errors.push('Total loan term is required');
  } else if (typeof inputs.totalLoanTerm !== 'number' || inputs.totalLoanTerm <= 0) {
    errors.push('Total loan term must be a positive number');
  } else if (inputs.totalLoanTerm < 5 || inputs.totalLoanTerm > 50) {
    errors.push('Total loan term must be between 5 and 50 years');
  }

  // Property value validation
  if (inputs.propertyValue !== undefined) {
    if (typeof inputs.propertyValue !== 'number' || inputs.propertyValue <= 0) {
      errors.push('Property value must be a positive number');
    } else if (inputs.propertyValue < 10000 || inputs.propertyValue > 20000000) {
      errors.push('Property value must be between $10,000 and $20,000,000');
    }
  }

  // Down payment validation
  if (inputs.downPayment !== undefined) {
    if (typeof inputs.downPayment !== 'number' || inputs.downPayment < 0) {
      errors.push('Down payment must be a non-negative number');
    } else if (inputs.downPayment > 10000000) {
      errors.push('Down payment must be $10,000,000 or less');
    }
  }

  // Down payment percentage validation
  if (inputs.downPaymentPercentage !== undefined) {
    if (typeof inputs.downPaymentPercentage !== 'number' || inputs.downPaymentPercentage < 0) {
      errors.push('Down payment percentage must be a non-negative number');
    } else if (inputs.downPaymentPercentage > 100) {
      errors.push('Down payment percentage must be 100% or less');
    }
  }

  // Property taxes validation
  if (inputs.propertyTaxes !== undefined) {
    if (typeof inputs.propertyTaxes !== 'number' || inputs.propertyTaxes < 0) {
      errors.push('Property taxes must be a non-negative number');
    } else if (inputs.propertyTaxes > 100000) {
      errors.push('Property taxes must be $100,000 or less');
    }
  }

  // Property tax rate validation
  if (inputs.propertyTaxRate !== undefined) {
    if (typeof inputs.propertyTaxRate !== 'number' || inputs.propertyTaxRate < 0) {
      errors.push('Property tax rate must be a non-negative number');
    } else if (inputs.propertyTaxRate > 10) {
      errors.push('Property tax rate must be 10% or less');
    }
  }

  // Homeowners insurance validation
  if (inputs.homeownersInsurance !== undefined) {
    if (typeof inputs.homeownersInsurance !== 'number' || inputs.homeownersInsurance < 0) {
      errors.push('Homeowners insurance must be a non-negative number');
    } else if (inputs.homeownersInsurance > 50000) {
      errors.push('Homeowners insurance must be $50,000 or less');
    }
  }

  // Insurance rate validation
  if (inputs.insuranceRate !== undefined) {
    if (typeof inputs.insuranceRate !== 'number' || inputs.insuranceRate < 0) {
      errors.push('Insurance rate must be a non-negative number');
    } else if (inputs.insuranceRate > 5) {
      errors.push('Insurance rate must be 5% or less');
    }
  }

  // PMI validation
  if (inputs.pmi !== undefined) {
    if (typeof inputs.pmi !== 'number' || inputs.pmi < 0) {
      errors.push('PMI must be a non-negative number');
    } else if (inputs.pmi > 10000) {
      errors.push('PMI must be $10,000 or less');
    }
  }

  // PMI rate validation
  if (inputs.pmiRate !== undefined) {
    if (typeof inputs.pmiRate !== 'number' || inputs.pmiRate < 0) {
      errors.push('PMI rate must be a non-negative number');
    } else if (inputs.pmiRate > 5) {
      errors.push('PMI rate must be 5% or less');
    }
  }

  // HOA fees validation
  if (inputs.hoaFees !== undefined) {
    if (typeof inputs.hoaFees !== 'number' || inputs.hoaFees < 0) {
      errors.push('HOA fees must be a non-negative number');
    } else if (inputs.hoaFees > 5000) {
      errors.push('HOA fees must be $5,000 or less');
    }
  }

  // Utilities validation
  if (inputs.utilities !== undefined) {
    if (typeof inputs.utilities !== 'number' || inputs.utilities < 0) {
      errors.push('Utilities must be a non-negative number');
    } else if (inputs.utilities > 2000) {
      errors.push('Utilities must be $2,000 or less');
    }
  }

  // Maintenance validation
  if (inputs.maintenance !== undefined) {
    if (typeof inputs.maintenance !== 'number' || inputs.maintenance < 0) {
      errors.push('Maintenance must be a non-negative number');
    } else if (inputs.maintenance > 5000) {
      errors.push('Maintenance must be $5,000 or less');
    }
  }

  // Appreciation rate validation
  if (inputs.appreciationRate !== undefined) {
    if (typeof inputs.appreciationRate !== 'number') {
      errors.push('Appreciation rate must be a number');
    } else if (inputs.appreciationRate < -10 || inputs.appreciationRate > 20) {
      errors.push('Appreciation rate must be between -10% and 20%');
    }
  }

  // Inflation rate validation
  if (inputs.inflationRate !== undefined) {
    if (typeof inputs.inflationRate !== 'number' || inputs.inflationRate < 0) {
      errors.push('Inflation rate must be a non-negative number');
    } else if (inputs.inflationRate > 20) {
      errors.push('Inflation rate must be 20% or less');
    }
  }

  // Income tax rate validation
  if (inputs.incomeTaxRate !== undefined) {
    if (typeof inputs.incomeTaxRate !== 'number' || inputs.incomeTaxRate < 0) {
      errors.push('Income tax rate must be a non-negative number');
    } else if (inputs.incomeTaxRate > 50) {
      errors.push('Income tax rate must be 50% or less');
    }
  }

  // Alternative investment return validation
  if (inputs.alternativeInvestmentReturn !== undefined) {
    if (typeof inputs.alternativeInvestmentReturn !== 'number' || inputs.alternativeInvestmentReturn < 0) {
      errors.push('Alternative investment return must be a non-negative number');
    } else if (inputs.alternativeInvestmentReturn > 20) {
      errors.push('Alternative investment return must be 20% or less');
    }
  }

  // Refinance rate validation
  if (inputs.refinanceRate !== undefined) {
    if (typeof inputs.refinanceRate !== 'number' || inputs.refinanceRate <= 0) {
      errors.push('Refinance rate must be a positive number');
    } else if (inputs.refinanceRate < 0.1 || inputs.refinanceRate > 20) {
      errors.push('Refinance rate must be between 0.1% and 20%');
    }
  }

  // Refinance costs validation
  if (inputs.refinanceCosts !== undefined) {
    if (typeof inputs.refinanceCosts !== 'number' || inputs.refinanceCosts < 0) {
      errors.push('Refinance costs must be a non-negative number');
    } else if (inputs.refinanceCosts > 50000) {
      errors.push('Refinance costs must be $50,000 or less');
    }
  }

  // Selling costs validation
  if (inputs.sellingCosts !== undefined) {
    if (typeof inputs.sellingCosts !== 'number' || inputs.sellingCosts < 0) {
      errors.push('Selling costs must be a non-negative number');
    } else if (inputs.sellingCosts > 15) {
      errors.push('Selling costs must be 15% or less');
    }
  }

  // Exit strategy validation
  if (inputs.exitStrategy) {
    const validExitStrategies = ['refinance', 'sell', 'pay-off', 'extend'];
    if (!validExitStrategies.includes(inputs.exitStrategy)) {
      errors.push('Invalid exit strategy');
    }
  }

  // Risk tolerance validation
  if (inputs.riskTolerance) {
    const validRiskTolerances = ['conservative', 'moderate', 'aggressive'];
    if (!validRiskTolerances.includes(inputs.riskTolerance)) {
      errors.push('Invalid risk tolerance');
    }
  }

  // Investment horizon validation
  if (inputs.investmentHorizon !== undefined) {
    if (typeof inputs.investmentHorizon !== 'number' || inputs.investmentHorizon <= 0) {
      errors.push('Investment horizon must be a positive number');
    } else if (inputs.investmentHorizon < 1 || inputs.investmentHorizon > 50) {
      errors.push('Investment horizon must be between 1 and 50 years');
    }
  }

  // Monthly income validation
  if (inputs.monthlyIncome !== undefined) {
    if (typeof inputs.monthlyIncome !== 'number' || inputs.monthlyIncome <= 0) {
      errors.push('Monthly income must be a positive number');
    } else if (inputs.monthlyIncome < 1000 || inputs.monthlyIncome > 1000000) {
      errors.push('Monthly income must be between $1,000 and $1,000,000');
    }
  }

  // Monthly debts validation
  if (inputs.monthlyDebts !== undefined) {
    if (typeof inputs.monthlyDebts !== 'number' || inputs.monthlyDebts < 0) {
      errors.push('Monthly debts must be a non-negative number');
    } else if (inputs.monthlyDebts > 100000) {
      errors.push('Monthly debts must be $100,000 or less');
    }
  }

  // Emergency fund validation
  if (inputs.emergencyFund !== undefined) {
    if (typeof inputs.emergencyFund !== 'number' || inputs.emergencyFund < 0) {
      errors.push('Emergency fund must be a non-negative number');
    } else if (inputs.emergencyFund > 1000000) {
      errors.push('Emergency fund must be $1,000,000 or less');
    }
  }

  // Credit score validation
  if (inputs.creditScore !== undefined) {
    if (typeof inputs.creditScore !== 'number' || inputs.creditScore <= 0) {
      errors.push('Credit score must be a positive number');
    } else if (inputs.creditScore < 300 || inputs.creditScore > 850) {
      errors.push('Credit score must be between 300 and 850');
    }
  }

  // Loan type validation
  if (inputs.loanType) {
    const validLoanTypes = ['fixed-rate', 'adjustable-rate', 'hybrid-arm'];
    if (!validLoanTypes.includes(inputs.loanType)) {
      errors.push('Invalid loan type');
    }
  }

  // ARM index validation
  if (inputs.armIndex !== undefined) {
    if (typeof inputs.armIndex !== 'number' || inputs.armIndex < 0) {
      errors.push('ARM index must be a non-negative number');
    } else if (inputs.armIndex > 20) {
      errors.push('ARM index must be 20% or less');
    }
  }

  // ARM margin validation
  if (inputs.armMargin !== undefined) {
    if (typeof inputs.armMargin !== 'number' || inputs.armMargin < 0) {
      errors.push('ARM margin must be a non-negative number');
    } else if (inputs.armMargin > 10) {
      errors.push('ARM margin must be 10% or less');
    }
  }

  // ARM adjustment period validation
  if (inputs.armAdjustmentPeriod !== undefined) {
    if (typeof inputs.armAdjustmentPeriod !== 'number' || inputs.armAdjustmentPeriod <= 0) {
      errors.push('ARM adjustment period must be a positive number');
    } else if (inputs.armAdjustmentPeriod < 1 || inputs.armAdjustmentPeriod > 60) {
      errors.push('ARM adjustment period must be between 1 and 60 months');
    }
  }

  // ARM caps validation
  if (inputs.armCaps) {
    const validARMCaps = ['115', '225', '525', 'no-caps'];
    if (!validARMCaps.includes(inputs.armCaps)) {
      errors.push('Invalid ARM caps');
    }
  }

  // Prepayment penalty validation
  if (inputs.prepaymentPenalty !== undefined) {
    if (typeof inputs.prepaymentPenalty !== 'number' || inputs.prepaymentPenalty < 0) {
      errors.push('Prepayment penalty must be a non-negative number');
    } else if (inputs.prepaymentPenalty > 10) {
      errors.push('Prepayment penalty must be 10% or less');
    }
  }

  // Prepayment penalty period validation
  if (inputs.prepaymentPenaltyPeriod !== undefined) {
    if (typeof inputs.prepaymentPenaltyPeriod !== 'number' || inputs.prepaymentPenaltyPeriod < 0) {
      errors.push('Prepayment penalty period must be a non-negative number');
    } else if (inputs.prepaymentPenaltyPeriod > 10) {
      errors.push('Prepayment penalty period must be 10 years or less');
    }
  }

  // Lender fees validation
  if (inputs.lenderFees !== undefined) {
    if (typeof inputs.lenderFees !== 'number' || inputs.lenderFees < 0) {
      errors.push('Lender fees must be a non-negative number');
    } else if (inputs.lenderFees > 50000) {
      errors.push('Lender fees must be $50,000 or less');
    }
  }

  // Title insurance validation
  if (inputs.titleInsurance !== undefined) {
    if (typeof inputs.titleInsurance !== 'number' || inputs.titleInsurance < 0) {
      errors.push('Title insurance must be a non-negative number');
    } else if (inputs.titleInsurance > 10000) {
      errors.push('Title insurance must be $10,000 or less');
    }
  }

  // Appraisal fee validation
  if (inputs.appraisalFee !== undefined) {
    if (typeof inputs.appraisalFee !== 'number' || inputs.appraisalFee < 0) {
      errors.push('Appraisal fee must be a non-negative number');
    } else if (inputs.appraisalFee > 5000) {
      errors.push('Appraisal fee must be $5,000 or less');
    }
  }

  // Escrow account validation
  if (inputs.escrowAccount) {
    const validEscrowAccounts = ['yes', 'no', 'optional'];
    if (!validEscrowAccounts.includes(inputs.escrowAccount)) {
      errors.push('Invalid escrow account option');
    }
  }

  // Escrow amount validation
  if (inputs.escrowAmount !== undefined) {
    if (typeof inputs.escrowAmount !== 'number' || inputs.escrowAmount < 0) {
      errors.push('Escrow amount must be a non-negative number');
    } else if (inputs.escrowAmount > 50000) {
      errors.push('Escrow amount must be $50,000 or less');
    }
  }

  // Logical validation
  if (inputs.interestOnlyPeriod && inputs.totalLoanTerm && inputs.interestOnlyPeriod >= inputs.totalLoanTerm) {
    errors.push('Interest-only period must be less than total loan term');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateInterestOnlyMortgageInput(field: string, value: any): string | null {
  switch (field) {
    case 'loanAmount':
      if (!value) return 'Loan amount is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 10000 || value > 10000000) return 'Must be between $10,000 and $10,000,000';
      break;
    case 'interestRate':
      if (!value) return 'Interest rate is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 0.1 || value > 20) return 'Must be between 0.1% and 20%';
      break;
    case 'interestOnlyPeriod':
      if (!value) return 'Interest-only period is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 1 || value > 30) return 'Must be between 1 and 30 years';
      break;
    case 'totalLoanTerm':
      if (!value) return 'Total loan term is required';
      if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
      if (value < 5 || value > 50) return 'Must be between 5 and 50 years';
      break;
    case 'propertyValue':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 10000 || value > 20000000) return 'Must be between $10,000 and $20,000,000';
      }
      break;
    case 'downPayment':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 10000000) return 'Must be $10,000,000 or less';
      }
      break;
    case 'downPaymentPercentage':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 100) return 'Must be 100% or less';
      }
      break;
    case 'propertyTaxes':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 100000) return 'Must be $100,000 or less';
      }
      break;
    case 'propertyTaxRate':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 10) return 'Must be 10% or less';
      }
      break;
    case 'homeownersInsurance':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 50000) return 'Must be $50,000 or less';
      }
      break;
    case 'insuranceRate':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 5) return 'Must be 5% or less';
      }
      break;
    case 'pmi':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 10000) return 'Must be $10,000 or less';
      }
      break;
    case 'pmiRate':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 5) return 'Must be 5% or less';
      }
      break;
    case 'hoaFees':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 5000) return 'Must be $5,000 or less';
      }
      break;
    case 'utilities':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 2000) return 'Must be $2,000 or less';
      }
      break;
    case 'maintenance':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 5000) return 'Must be $5,000 or less';
      }
      break;
    case 'appreciationRate':
      if (value !== undefined) {
        if (typeof value !== 'number') return 'Must be a number';
        if (value < -10 || value > 20) return 'Must be between -10% and 20%';
      }
      break;
    case 'inflationRate':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 20) return 'Must be 20% or less';
      }
      break;
    case 'incomeTaxRate':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 50) return 'Must be 50% or less';
      }
      break;
    case 'alternativeInvestmentReturn':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 20) return 'Must be 20% or less';
      }
      break;
    case 'refinanceRate':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 0.1 || value > 20) return 'Must be between 0.1% and 20%';
      }
      break;
    case 'refinanceCosts':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 50000) return 'Must be $50,000 or less';
      }
      break;
    case 'sellingCosts':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 15) return 'Must be 15% or less';
      }
      break;
    case 'exitStrategy':
      if (value) {
        const validStrategies = ['refinance', 'sell', 'pay-off', 'extend'];
        if (!validStrategies.includes(value)) return 'Invalid exit strategy';
      }
      break;
    case 'riskTolerance':
      if (value) {
        const validTolerances = ['conservative', 'moderate', 'aggressive'];
        if (!validTolerances.includes(value)) return 'Invalid risk tolerance';
      }
      break;
    case 'investmentHorizon':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 1 || value > 50) return 'Must be between 1 and 50 years';
      }
      break;
    case 'monthlyIncome':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 1000 || value > 1000000) return 'Must be between $1,000 and $1,000,000';
      }
      break;
    case 'monthlyDebts':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 100000) return 'Must be $100,000 or less';
      }
      break;
    case 'emergencyFund':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 1000000) return 'Must be $1,000,000 or less';
      }
      break;
    case 'creditScore':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 300 || value > 850) return 'Must be between 300 and 850';
      }
      break;
    case 'loanType':
      if (value) {
        const validTypes = ['fixed-rate', 'adjustable-rate', 'hybrid-arm'];
        if (!validTypes.includes(value)) return 'Invalid loan type';
      }
      break;
    case 'armIndex':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 20) return 'Must be 20% or less';
      }
      break;
    case 'armMargin':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 10) return 'Must be 10% or less';
      }
      break;
    case 'armAdjustmentPeriod':
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) return 'Must be a positive number';
        if (value < 1 || value > 60) return 'Must be between 1 and 60 months';
      }
      break;
    case 'armCaps':
      if (value) {
        const validCaps = ['115', '225', '525', 'no-caps'];
        if (!validCaps.includes(value)) return 'Invalid ARM caps';
      }
      break;
    case 'prepaymentPenalty':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 10) return 'Must be 10% or less';
      }
      break;
    case 'prepaymentPenaltyPeriod':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 10) return 'Must be 10 years or less';
      }
      break;
    case 'lenderFees':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 50000) return 'Must be $50,000 or less';
      }
      break;
    case 'titleInsurance':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 10000) return 'Must be $10,000 or less';
      }
      break;
    case 'appraisalFee':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 5000) return 'Must be $5,000 or less';
      }
      break;
    case 'escrowAccount':
      if (value) {
        const validAccounts = ['yes', 'no', 'optional'];
        if (!validAccounts.includes(value)) return 'Invalid escrow account option';
      }
      break;
    case 'escrowAmount':
      if (value !== undefined) {
        if (typeof value !== 'number' || value < 0) return 'Must be a non-negative number';
        if (value > 50000) return 'Must be $50,000 or less';
      }
      break;
  }
  return null;
}
