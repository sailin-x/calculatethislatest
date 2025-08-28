import { AngelInvestmentDilutionInputs } from './types';

export function validateAngelInvestmentDilutionInputs(inputs: AngelInvestmentDilutionInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Company Information Validation
  if (!inputs.companyName || inputs.companyName.trim().length === 0) {
    errors.push('Company name is required');
  }
  
  if (inputs.currentValuation <= 0) {
    errors.push('Pre-money valuation must be greater than zero');
  }
  if (inputs.currentValuation > 1000000000) {
    errors.push('Pre-money valuation over $1 billion seems unrealistic for angel investment');
  }
  
  if (inputs.totalSharesOutstanding <= 0) {
    errors.push('Total shares outstanding must be greater than zero');
  }
  if (inputs.totalSharesOutstanding > 1000000000) {
    errors.push('Total shares outstanding over 1 billion seems unrealistic');
  }

  // Investment Details Validation
  if (inputs.investmentAmount <= 0) {
    errors.push('Investment amount must be greater than zero');
  }
  if (inputs.investmentAmount > 10000000) {
    errors.push('Investment amount over $10 million seems high for angel investment');
  }
  
  if (inputs.investmentAmount > inputs.currentValuation * 0.5) {
    errors.push('Investment amount should not exceed 50% of pre-money valuation');
  }

  // Convertible Security Validation
  if (inputs.investmentType === 'convertible_note' || inputs.investmentType === 'safe') {
    if (inputs.conversionPrice && inputs.conversionPrice <= 0) {
      errors.push('Conversion price must be greater than zero');
    }
    
    if (inputs.discountRate !== undefined) {
      if (inputs.discountRate < 0) {
        errors.push('Discount rate cannot be negative');
      }
      if (inputs.discountRate > 50) {
        errors.push('Discount rate over 50% seems excessive');
      }
    }
    
    if (inputs.cap && inputs.cap <= 0) {
      errors.push('Valuation cap must be greater than zero');
    }
    
    if (inputs.cap && inputs.cap < inputs.currentValuation) {
      errors.push('Valuation cap should not be lower than current valuation');
    }
  }

  // Investment Terms Validation
  if (inputs.liquidationPreference < 1) {
    errors.push('Liquidation preference must be at least 1x');
  }
  if (inputs.liquidationPreference > 10) {
    errors.push('Liquidation preference over 10x seems excessive');
  }
  
  if (inputs.dividendRate !== undefined) {
    if (inputs.dividendRate < 0) {
      errors.push('Dividend rate cannot be negative');
    }
    if (inputs.dividendRate > 20) {
      errors.push('Dividend rate over 20% seems excessive');
    }
  }

  // Employee Stock Options Validation
  if (inputs.optionPoolSize < 0) {
    errors.push('Option pool size cannot be negative');
  }
  if (inputs.optionPoolSize > inputs.totalSharesOutstanding) {
    errors.push('Option pool size cannot exceed total shares outstanding');
  }
  
  if (inputs.optionPoolPercentage < 0) {
    errors.push('Option pool percentage cannot be negative');
  }
  if (inputs.optionPoolPercentage > 50) {
    errors.push('Option pool percentage over 50% seems excessive');
  }
  
  if (inputs.vestingPeriod < 12) {
    errors.push('Vesting period must be at least 12 months');
  }
  if (inputs.vestingPeriod > 120) {
    errors.push('Vesting period over 120 months seems excessive');
  }
  
  if (inputs.cliffPeriod < 0) {
    errors.push('Cliff period cannot be negative');
  }
  if (inputs.cliffPeriod > inputs.vestingPeriod) {
    errors.push('Cliff period cannot exceed vesting period');
  }

  // Analysis Parameters Validation
  if (inputs.analysisPeriod < 1) {
    errors.push('Analysis period must be at least 1 year');
  }
  if (inputs.analysisPeriod > 20) {
    errors.push('Analysis period over 20 years seems excessive');
  }
  
  if (inputs.discountRate < 5) {
    errors.push('Required rate of return below 5% seems too low for angel investment');
  }
  if (inputs.discountRate > 100) {
    errors.push('Required rate of return over 100% seems unrealistic');
  }
  
  if (inputs.numberOfSimulations !== undefined) {
    if (inputs.numberOfSimulations < 1000) {
      errors.push('Number of simulations must be at least 1,000');
    }
    if (inputs.numberOfSimulations > 100000) {
      errors.push('Number of simulations over 100,000 may be computationally intensive');
    }
  }

  // Business Logic Validation
  const pricePerShare = inputs.currentValuation / inputs.totalSharesOutstanding;
  if (pricePerShare < 0.01) {
    errors.push('Price per share below $0.01 seems unrealistic');
  }
  if (pricePerShare > 1000) {
    errors.push('Price per share over $1,000 seems unrealistic');
  }
  
  const postMoneyValuation = inputs.currentValuation + inputs.investmentAmount;
  const newSharesIssued = inputs.investmentAmount / pricePerShare;
  const totalSharesAfterInvestment = inputs.totalSharesOutstanding + newSharesIssued;
  const investorOwnership = (newSharesIssued / totalSharesAfterInvestment) * 100;
  
  if (investorOwnership > 50) {
    errors.push('Investor ownership over 50% may indicate control issues');
  }

  // Future Rounds Validation
  if (inputs.futureRounds && inputs.futureRounds.length > 0) {
    inputs.futureRounds.forEach((round, index) => {
      if (round.amount <= 0) {
        errors.push(`Future round ${index + 1} amount must be greater than zero`);
      }
      if (round.valuation <= 0) {
        errors.push(`Future round ${index + 1} valuation must be greater than zero`);
      }
      if (round.probability < 0 || round.probability > 100) {
        errors.push(`Future round ${index + 1} probability must be between 0% and 100%`);
      }
      if (round.monthsFromNow < 0) {
        errors.push(`Future round ${index + 1} timeline cannot be negative`);
      }
    });
  }

  // Exit Scenarios Validation
  if (inputs.exitScenarios && inputs.exitScenarios.length > 0) {
    inputs.exitScenarios.forEach((scenario, index) => {
      if (scenario.probability < 0 || scenario.probability > 100) {
        errors.push(`Exit scenario ${index + 1} probability must be between 0% and 100%`);
      }
      if (scenario.exitValue <= 0) {
        errors.push(`Exit scenario ${index + 1} exit value must be greater than zero`);
      }
      if (scenario.exitYear < 1) {
        errors.push(`Exit scenario ${index + 1} exit year must be at least 1`);
      }
    });
  }

  // Risk Factors Validation
  if (inputs.riskFactors && inputs.riskFactors.length > 0) {
    inputs.riskFactors.forEach((risk, index) => {
      if (risk.probability < 0 || risk.probability > 100) {
        errors.push(`Risk factor ${index + 1} probability must be between 0% and 100%`);
      }
    });
  }

  // Sector Multiples Validation
  if (inputs.sectorMultiples) {
    if (inputs.sectorMultiples.revenueMultiple < 0) {
      errors.push('Revenue multiple cannot be negative');
    }
    if (inputs.sectorMultiples.ebitdaMultiple < 0) {
      errors.push('EBITDA multiple cannot be negative');
    }
    if (inputs.sectorMultiples.bookValueMultiple < 0) {
      errors.push('Book value multiple cannot be negative');
    }
  }

  // Data Quality Checks
  if (inputs.currentValuation / inputs.totalSharesOutstanding > 1000) {
    errors.push('Price per share calculation suggests data quality issues');
  }
  
  if (inputs.investmentAmount / inputs.currentValuation > 0.5) {
    errors.push('Investment amount relative to valuation suggests potential data issues');
  }

  // Anti-Dilution Logic
  if (inputs.antiDilutionProtection && !inputs.antiDilutionType) {
    errors.push('Anti-dilution type must be specified when anti-dilution protection is enabled');
  }

  // Convertible Security Logic
  if (inputs.investmentType === 'convertible_note' || inputs.investmentType === 'safe') {
    if (!inputs.conversionPrice && !inputs.cap) {
      errors.push('Convertible securities require either conversion price or valuation cap');
    }
  }

  // Performance Fee Logic
  if (inputs.dividendRate !== undefined && inputs.dividendRate > 0) {
    if (inputs.investmentType === 'safe') {
      errors.push('SAFEs typically do not include dividend provisions');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
