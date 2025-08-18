import { ValidationRuleFactory } from '../../../utils/validation';
import { MezzanineFinancingInputs } from './formulas';

export function validateMezzanineFinancingInputs(inputs: MezzanineFinancingInputs): string[] {
  const errors: string[] = [];
  const ruleFactory = new ValidationRuleFactory();

  // Required field validations
  ruleFactory
    .required('projectValue', inputs.projectValue, 'Project value is required')
    .required('seniorDebt', inputs.seniorDebt, 'Senior debt amount is required')
    .required('equityInvestment', inputs.equityInvestment, 'Equity investment is required')
    .required('mezzanineAmount', inputs.mezzanineAmount, 'Mezzanine amount is required')
    .required('seniorInterestRate', inputs.seniorInterestRate, 'Senior interest rate is required')
    .required('mezzanineInterestRate', inputs.mezzanineInterestRate, 'Mezzanine interest rate is required')
    .required('mezzanineTerm', inputs.mezzanineTerm, 'Mezzanine term is required')
    .validate(errors);

  // Numeric validations
  ruleFactory
    .positive('projectValue', inputs.projectValue, 'Project value must be positive')
    .positive('seniorDebt', inputs.seniorDebt, 'Senior debt must be positive')
    .positive('equityInvestment', inputs.equityInvestment, 'Equity investment must be positive')
    .positive('mezzanineAmount', inputs.mezzanineAmount, 'Mezzanine amount must be positive')
    .positive('seniorInterestRate', inputs.seniorInterestRate, 'Senior interest rate must be positive')
    .positive('mezzanineInterestRate', inputs.mezzanineInterestRate, 'Mezzanine interest rate must be positive')
    .positive('mezzanineTerm', inputs.mezzanineTerm, 'Mezzanine term must be positive')
    .positive('originationFee', inputs.originationFee, 'Origination fee must be positive')
    .positive('exitFee', inputs.exitFee, 'Exit fee must be positive')
    .positive('warrantCoverage', inputs.warrantCoverage, 'Warrant coverage must be positive')
    .positive('preLeasingPercentage', inputs.preLeasingPercentage, 'Pre-leasing percentage must be positive')
    .positive('exitTimeline', inputs.exitTimeline, 'Exit timeline must be positive')
    .positive('projectedNOI', inputs.projectedNOI, 'Projected NOI must be positive')
    .positive('projectedCapRate', inputs.projectedCapRate, 'Projected cap rate must be positive')
    .validate(errors);

  // Range validations
  ruleFactory
    .range('projectValue', inputs.projectValue, 1000000, 100000000, 'Project value must be between $1,000,000 and $100,000,000')
    .range('seniorDebt', inputs.seniorDebt, 100000, 80000000, 'Senior debt must be between $100,000 and $80,000,000')
    .range('equityInvestment', inputs.equityInvestment, 100000, 50000000, 'Equity investment must be between $100,000 and $50,000,000')
    .range('mezzanineAmount', inputs.mezzanineAmount, 100000, 30000000, 'Mezzanine amount must be between $100,000 and $30,000,000')
    .range('seniorInterestRate', inputs.seniorInterestRate, 3, 15, 'Senior interest rate must be between 3% and 15%')
    .range('mezzanineInterestRate', inputs.mezzanineInterestRate, 8, 25, 'Mezzanine interest rate must be between 8% and 25%')
    .range('mezzanineTerm', inputs.mezzanineTerm, 1, 10, 'Mezzanine term must be between 1 and 10 years')
    .range('originationFee', inputs.originationFee, 0, 5, 'Origination fee must be between 0% and 5%')
    .range('exitFee', inputs.exitFee, 0, 3, 'Exit fee must be between 0% and 3%')
    .range('warrantCoverage', inputs.warrantCoverage, 0, 25, 'Warrant coverage must be between 0% and 25%')
    .range('preLeasingPercentage', inputs.preLeasingPercentage, 0, 100, 'Pre-leasing percentage must be between 0% and 100%')
    .range('exitTimeline', inputs.exitTimeline, 1, 15, 'Exit timeline must be between 1 and 15 years')
    .range('projectedNOI', inputs.projectedNOI, 0, 10000000, 'Projected NOI must be between $0 and $10,000,000')
    .range('projectedCapRate', inputs.projectedCapRate, 3, 12, 'Projected cap rate must be between 3% and 12%')
    .validate(errors);

  // Business logic validations
  if (inputs.projectValue && inputs.seniorDebt && inputs.equityInvestment && inputs.mezzanineAmount) {
    // Capital stack validation
    const totalCapitalization = inputs.seniorDebt + inputs.mezzanineAmount + inputs.equityInvestment;
    const difference = Math.abs(totalCapitalization - inputs.projectValue);
    
    if (difference > 100000) {
      errors.push('Total capitalization should equal project value (within $100,000 tolerance)');
    }

    // Senior debt validation
    const seniorLeverage = (inputs.seniorDebt / inputs.projectValue) * 100;
    if (seniorLeverage > 75) {
      errors.push('Senior debt leverage should not exceed 75% of project value');
    }

    // Mezzanine debt validation
    const mezzanineLeverage = (inputs.mezzanineAmount / inputs.projectValue) * 100;
    if (mezzanineLeverage > 25) {
      errors.push('Mezzanine debt leverage should not exceed 25% of project value');
    }

    // Total leverage validation
    const totalLeverage = seniorLeverage + mezzanineLeverage;
    if (totalLeverage > 90) {
      errors.push('Total leverage should not exceed 90% of project value');
    }

    // Equity validation
    const equityPercentage = (inputs.equityInvestment / inputs.projectValue) * 100;
    if (equityPercentage < 10) {
      errors.push('Equity should be at least 10% of project value');
    }
  }

  // Interest rate validation
  if (inputs.seniorInterestRate && inputs.mezzanineInterestRate) {
    if (inputs.mezzanineInterestRate <= inputs.seniorInterestRate) {
      errors.push('Mezzanine interest rate should be higher than senior debt interest rate');
    }

    const spread = inputs.mezzanineInterestRate - inputs.seniorInterestRate;
    if (spread < 3) {
      errors.push('Mezzanine interest rate should be at least 3% higher than senior debt rate');
    }

    if (spread > 15) {
      errors.push('Mezzanine interest rate spread should not exceed 15% over senior debt rate');
    }
  }

  // Term validation
  if (inputs.mezzanineTerm && inputs.exitTimeline) {
    if (inputs.mezzanineTerm > inputs.exitTimeline) {
      errors.push('Mezzanine term should not exceed exit timeline');
    }
  }

  // Project stage and risk validation
  if (inputs.projectStage && inputs.constructionRisk) {
    if (inputs.projectStage === 'Pre-Development' && inputs.constructionRisk === 'Low') {
      errors.push('Pre-development projects typically have higher construction risk');
    }
  }

  // Location and market risk validation
  if (inputs.location && inputs.marketRisk) {
    if (inputs.location === 'Tertiary Market' && inputs.marketRisk === 'Low') {
      errors.push('Tertiary markets typically have higher market risk');
    }
  }

  // Pre-leasing validation
  if (inputs.preLeasing && inputs.preLeasingPercentage) {
    if (inputs.preLeasing === 'None' && inputs.preLeasingPercentage > 0) {
      errors.push('Pre-leasing percentage should be 0% when pre-leasing status is None');
    }
    
    if (inputs.preLeasing === 'Fully Leased' && inputs.preLeasingPercentage < 100) {
      errors.push('Pre-leasing percentage should be 100% when pre-leasing status is Fully Leased');
    }
  }

  // Sponsor track record validation
  if (inputs.sponsorTrackRecord && inputs.projectStage) {
    if (inputs.sponsorTrackRecord === 'First-Time' && inputs.projectStage === 'Pre-Development') {
      errors.push('First-time sponsors may face challenges with pre-development projects');
    }
  }

  // Market condition validation
  if (inputs.marketCondition && inputs.mezzanineInterestRate) {
    if (inputs.marketCondition === 'Weak' && inputs.mezzanineInterestRate < 15) {
      errors.push('Weak market conditions typically require higher mezzanine interest rates');
    }
  }

  // Exit strategy validation
  if (inputs.exitStrategy && inputs.exitTimeline) {
    if (inputs.exitStrategy === 'Sale' && inputs.exitTimeline > 10) {
      errors.push('Sale exit strategies typically have shorter timelines');
    }
    
    if (inputs.exitStrategy === 'Hold' && inputs.exitTimeline < 5) {
      errors.push('Hold exit strategies typically have longer timelines');
    }
  }

  // NOI and cap rate validation
  if (inputs.projectedNOI && inputs.projectedCapRate && inputs.projectValue) {
    const calculatedValue = inputs.projectedNOI / (inputs.projectedCapRate / 100);
    const difference = Math.abs(calculatedValue - inputs.projectValue);
    
    if (difference > inputs.projectValue * 0.2) {
      errors.push('Projected NOI and cap rate should be consistent with project value');
    }
  }

  // Fee validation
  if (inputs.originationFee && inputs.exitFee) {
    if (inputs.originationFee + inputs.exitFee > 6) {
      errors.push('Total fees should not exceed 6% of mezzanine amount');
    }
  }

  // Warrant coverage validation
  if (inputs.warrantCoverage && inputs.mezzanineAmount && inputs.projectValue) {
    const warrantEquity = inputs.mezzanineAmount * (inputs.warrantCoverage / 100);
    const warrantPercentage = (warrantEquity / inputs.projectValue) * 100;
    
    if (warrantPercentage > 5) {
      errors.push('Warrant coverage should not exceed 5% of project value');
    }
  }

  return errors;
}

// Additional validation functions for specific scenarios
export function validateMezzanineForPreDevelopment(inputs: MezzanineFinancingInputs): string[] {
  const errors: string[] = [];
  
  if (inputs.projectStage === 'Pre-Development') {
    // Pre-development projects have stricter requirements
    if (inputs.totalLeverage && inputs.totalLeverage > 80) {
      errors.push('Pre-development projects typically have maximum total leverage of 80%');
    }
    
    if (inputs.sponsorTrackRecord && inputs.sponsorTrackRecord === 'First-Time') {
      errors.push('First-time sponsors may face challenges securing mezzanine financing for pre-development projects');
    }
    
    if (inputs.preLeasing && inputs.preLeasing === 'None') {
      errors.push('Pre-development projects typically require some pre-leasing commitments');
    }
  }
  
  return errors;
}

export function validateMezzanineForTertiaryMarkets(inputs: MezzanineFinancingInputs): string[] {
  const errors: string[] = [];
  
  if (inputs.location === 'Tertiary Market') {
    // Tertiary markets have stricter requirements
    if (inputs.totalLeverage && inputs.totalLeverage > 75) {
      errors.push('Tertiary market projects typically have maximum total leverage of 75%');
    }
    
    if (inputs.mezzanineInterestRate && inputs.mezzanineInterestRate < 15) {
      errors.push('Tertiary market projects typically require higher mezzanine interest rates');
    }
    
    if (inputs.sponsorTrackRecord && inputs.sponsorTrackRecord !== 'Top-Tier' && inputs.sponsorTrackRecord !== 'Institutional') {
      errors.push('Tertiary market projects typically require top-tier or institutional sponsors');
    }
  }
  
  return errors;
}

export function validateMezzanineForHighLeverage(inputs: MezzanineFinancingInputs): string[] {
  const errors: string[] = [];
  
  if (inputs.seniorDebt && inputs.mezzanineAmount && inputs.projectValue) {
    const totalLeverage = ((inputs.seniorDebt + inputs.mezzanineAmount) / inputs.projectValue) * 100;
    
    if (totalLeverage > 85) {
      // High leverage projects have stricter requirements
      if (inputs.debtServiceCoverage && inputs.debtServiceCoverage < 1.3) {
        errors.push('High leverage projects typically require DSCR of 1.3 or higher');
      }
      
      if (inputs.sponsorTrackRecord && inputs.sponsorTrackRecord === 'First-Time') {
        errors.push('High leverage projects typically require experienced sponsors');
      }
      
      if (inputs.preLeasing && inputs.preLeasing === 'None') {
        errors.push('High leverage projects typically require substantial pre-leasing');
      }
    }
  }
  
  return errors;
}