import { MezzanineFinancingInputs } from './formulas';

export interface QuickValidationResult {
  isValid: boolean;
  message?: string;
  severity: 'error' | 'warning' | 'info';
}

export function quickValidateProjectValue(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Project value must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 1000000) {
    return {
      isValid: false,
      message: 'Project value should be at least $1,000,000 for mezzanine financing',
      severity: 'warning'
    };
  }
  
  if (value > 100000000) {
    return {
      isValid: false,
      message: 'Project value should not exceed $100,000,000',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateSeniorDebt(value: number, projectValue?: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Senior debt must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 100000) {
    return {
      isValid: false,
      message: 'Senior debt should be at least $100,000',
      severity: 'warning'
    };
  }
  
  if (projectValue && value > projectValue * 0.75) {
    return {
      isValid: false,
      message: 'Senior debt should not exceed 75% of project value',
      severity: 'error'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateMezzanineAmount(value: number, projectValue?: number, seniorDebt?: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Mezzanine amount must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 100000) {
    return {
      isValid: false,
      message: 'Mezzanine amount should be at least $100,000',
      severity: 'warning'
    };
  }
  
  if (projectValue && value > projectValue * 0.25) {
    return {
      isValid: false,
      message: 'Mezzanine amount should not exceed 25% of project value',
      severity: 'error'
    };
  }
  
  if (projectValue && seniorDebt) {
    const totalLeverage = ((seniorDebt + value) / projectValue) * 100;
    if (totalLeverage > 90) {
      return {
        isValid: false,
        message: 'Total leverage should not exceed 90% of project value',
        severity: 'error'
      };
    }
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateEquityInvestment(value: number, projectValue?: number): QuickValidationResult {
  if (!value || value <= 0) {
    return {
      isValid: false,
      message: 'Equity investment must be greater than 0',
      severity: 'error'
    };
  }
  
  if (value < 100000) {
    return {
      isValid: false,
      message: 'Equity investment should be at least $100,000',
      severity: 'warning'
    };
  }
  
  if (projectValue && value < projectValue * 0.1) {
    return {
      isValid: false,
      message: 'Equity should be at least 10% of project value',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateSeniorInterestRate(value: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 3 || value > 15) {
    return {
      isValid: false,
      message: 'Senior interest rate must be between 3% and 15%',
      severity: 'error'
    };
  }
  
  if (value > 12) {
    return {
      isValid: true,
      message: 'High senior interest rate - may indicate challenging market conditions',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateMezzanineInterestRate(value: number, seniorRate?: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 8 || value > 25) {
    return {
      isValid: false,
      message: 'Mezzanine interest rate must be between 8% and 25%',
      severity: 'error'
    };
  }
  
  if (seniorRate && value <= seniorRate) {
    return {
      isValid: false,
      message: 'Mezzanine interest rate should be higher than senior debt rate',
      severity: 'error'
    };
  }
  
  if (seniorRate) {
    const spread = value - seniorRate;
    if (spread < 3) {
      return {
        isValid: true,
        message: 'Narrow interest rate spread - consider higher mezzanine rate',
        severity: 'warning'
      };
    }
    
    if (spread > 15) {
      return {
        isValid: true,
        message: 'Very wide interest rate spread - may indicate high risk',
        severity: 'warning'
      };
    }
  }
  
  if (value > 20) {
    return {
      isValid: true,
      message: 'Very high mezzanine rate - may indicate elevated project risk',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateMezzanineTerm(value: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 1 || value > 10) {
    return {
      isValid: false,
      message: 'Mezzanine term must be between 1 and 10 years',
      severity: 'error'
    };
  }
  
  if (value > 7) {
    return {
      isValid: true,
      message: 'Long mezzanine term - consider shorter term for better flexibility',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateTotalLeverage(seniorDebt: number, mezzanineAmount: number, projectValue: number): QuickValidationResult {
  if (!seniorDebt || !mezzanineAmount || !projectValue) {
    return { isValid: true, severity: 'info' };
  }
  
  const totalLeverage = ((seniorDebt + mezzanineAmount) / projectValue) * 100;
  
  if (totalLeverage > 90) {
    return {
      isValid: false,
      message: 'Total leverage exceeds 90% - very high risk profile',
      severity: 'error'
    };
  }
  
  if (totalLeverage > 85) {
    return {
      isValid: true,
      message: 'High total leverage - requires strong project fundamentals',
      severity: 'warning'
    };
  }
  
  if (totalLeverage <= 70) {
    return {
      isValid: true,
      message: 'Conservative leverage structure - good risk profile',
      severity: 'info'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateCapitalStack(seniorDebt: number, mezzanineAmount: number, equityInvestment: number, projectValue: number): QuickValidationResult {
  if (!seniorDebt || !mezzanineAmount || !equityInvestment || !projectValue) {
    return { isValid: true, severity: 'info' };
  }
  
  const totalCapitalization = seniorDebt + mezzanineAmount + equityInvestment;
  const difference = Math.abs(totalCapitalization - projectValue);
  
  if (difference > 100000) {
    return {
      isValid: false,
      message: 'Capital stack should equal project value (within $100,000)',
      severity: 'error'
    };
  }
  
  if (difference > 50000) {
    return {
      isValid: true,
      message: 'Capital stack close to project value - verify amounts',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateOriginationFee(value: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 0 || value > 5) {
    return {
      isValid: false,
      message: 'Origination fee must be between 0% and 5%',
      severity: 'error'
    };
  }
  
  if (value > 3) {
    return {
      isValid: true,
      message: 'High origination fee - may indicate challenging financing terms',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateExitFee(value: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 0 || value > 3) {
    return {
      isValid: false,
      message: 'Exit fee must be between 0% and 3%',
      severity: 'error'
    };
  }
  
  if (value > 2) {
    return {
      isValid: true,
      message: 'High exit fee - consider impact on overall returns',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateWarrantCoverage(value: number, mezzanineAmount?: number, projectValue?: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 0 || value > 25) {
    return {
      isValid: false,
      message: 'Warrant coverage must be between 0% and 25%',
      severity: 'error'
    };
  }
  
  if (mezzanineAmount && projectValue) {
    const warrantEquity = mezzanineAmount * (value / 100);
    const warrantPercentage = (warrantEquity / projectValue) * 100;
    
    if (warrantPercentage > 5) {
      return {
        isValid: false,
        message: 'Warrant coverage should not exceed 5% of project value',
        severity: 'error'
      };
    }
  }
  
  if (value > 15) {
    return {
      isValid: true,
      message: 'High warrant coverage - significant equity participation',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidatePreLeasingPercentage(value: number, preLeasingStatus?: string): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 0 || value > 100) {
    return {
      isValid: false,
      message: 'Pre-leasing percentage must be between 0% and 100%',
      severity: 'error'
    };
  }
  
  if (preLeasingStatus === 'None' && value > 0) {
    return {
      isValid: false,
      message: 'Pre-leasing percentage should be 0% when status is None',
      severity: 'error'
    };
  }
  
  if (preLeasingStatus === 'Fully Leased' && value < 100) {
    return {
      isValid: false,
      message: 'Pre-leasing percentage should be 100% when status is Fully Leased',
      severity: 'error'
    };
  }
  
  if (value < 20) {
    return {
      isValid: true,
      message: 'Low pre-leasing - may increase financing risk',
      severity: 'warning'
    };
  }
  
  if (value >= 75) {
    return {
      isValid: true,
      message: 'Strong pre-leasing - favorable for financing terms',
      severity: 'info'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateExitTimeline(value: number, mezzanineTerm?: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 1 || value > 15) {
    return {
      isValid: false,
      message: 'Exit timeline must be between 1 and 15 years',
      severity: 'error'
    };
  }
  
  if (mezzanineTerm && value < mezzanineTerm) {
    return {
      isValid: false,
      message: 'Exit timeline should not be shorter than mezzanine term',
      severity: 'error'
    };
  }
  
  if (value > 10) {
    return {
      isValid: true,
      message: 'Long exit timeline - consider shorter-term strategies',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateProjectedNOI(value: number, projectValue?: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      message: 'Projected NOI cannot be negative',
      severity: 'error'
    };
  }
  
  if (projectValue) {
    const impliedCapRate = (value / projectValue) * 100;
    
    if (impliedCapRate < 3) {
      return {
        isValid: true,
        message: 'Very low implied cap rate - verify projections',
        severity: 'warning'
      };
    }
    
    if (impliedCapRate > 12) {
      return {
        isValid: true,
        message: 'Very high implied cap rate - verify projections',
        severity: 'warning'
      };
    }
  }
  
  return { isValid: true, severity: 'info' };
}

export function quickValidateProjectedCapRate(value: number): QuickValidationResult {
  if (!value) {
    return { isValid: true, severity: 'info' };
  }
  
  if (value < 3 || value > 12) {
    return {
      isValid: false,
      message: 'Projected cap rate must be between 3% and 12%',
      severity: 'error'
    };
  }
  
  if (value < 4) {
    return {
      isValid: true,
      message: 'Very low cap rate - premium property or market',
      severity: 'warning'
    };
  }
  
  if (value > 10) {
    return {
      isValid: true,
      message: 'Very high cap rate - may indicate higher risk',
      severity: 'warning'
    };
  }
  
  return { isValid: true, severity: 'info' };
}

// Comprehensive validation for all inputs
export function quickValidateAllInputs(inputs: Partial<MezzanineFinancingInputs>): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];
  
  if (inputs.projectValue !== undefined) {
    results.push(quickValidateProjectValue(inputs.projectValue));
  }
  
  if (inputs.seniorDebt !== undefined) {
    results.push(quickValidateSeniorDebt(inputs.seniorDebt, inputs.projectValue));
  }
  
  if (inputs.mezzanineAmount !== undefined) {
    results.push(quickValidateMezzanineAmount(inputs.mezzanineAmount, inputs.projectValue, inputs.seniorDebt));
  }
  
  if (inputs.equityInvestment !== undefined) {
    results.push(quickValidateEquityInvestment(inputs.equityInvestment, inputs.projectValue));
  }
  
  if (inputs.seniorInterestRate !== undefined) {
    results.push(quickValidateSeniorInterestRate(inputs.seniorInterestRate));
  }
  
  if (inputs.mezzanineInterestRate !== undefined) {
    results.push(quickValidateMezzanineInterestRate(inputs.mezzanineInterestRate, inputs.seniorInterestRate));
  }
  
  if (inputs.mezzanineTerm !== undefined) {
    results.push(quickValidateMezzanineTerm(inputs.mezzanineTerm));
  }
  
  if (inputs.seniorDebt !== undefined && inputs.mezzanineAmount !== undefined && inputs.projectValue !== undefined) {
    results.push(quickValidateTotalLeverage(inputs.seniorDebt, inputs.mezzanineAmount, inputs.projectValue));
  }
  
  if (inputs.seniorDebt !== undefined && inputs.mezzanineAmount !== undefined && inputs.equityInvestment !== undefined && inputs.projectValue !== undefined) {
    results.push(quickValidateCapitalStack(inputs.seniorDebt, inputs.mezzanineAmount, inputs.equityInvestment, inputs.projectValue));
  }
  
  if (inputs.originationFee !== undefined) {
    results.push(quickValidateOriginationFee(inputs.originationFee));
  }
  
  if (inputs.exitFee !== undefined) {
    results.push(quickValidateExitFee(inputs.exitFee));
  }
  
  if (inputs.warrantCoverage !== undefined) {
    results.push(quickValidateWarrantCoverage(inputs.warrantCoverage, inputs.mezzanineAmount, inputs.projectValue));
  }
  
  if (inputs.preLeasingPercentage !== undefined) {
    results.push(quickValidatePreLeasingPercentage(inputs.preLeasingPercentage, inputs.preLeasing));
  }
  
  if (inputs.exitTimeline !== undefined) {
    results.push(quickValidateExitTimeline(inputs.exitTimeline, inputs.mezzanineTerm));
  }
  
  if (inputs.projectedNOI !== undefined) {
    results.push(quickValidateProjectedNOI(inputs.projectedNOI, inputs.projectValue));
  }
  
  if (inputs.projectedCapRate !== undefined) {
    results.push(quickValidateProjectedCapRate(inputs.projectedCapRate));
  }
  
  return results;
}