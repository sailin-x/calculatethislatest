import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateTermLifeInsuranceInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  if (!inputs.age) {
    errors.push('Age is required');
  } else {
    if (inputs.age < 18) {
      errors.push('Age must be at least 18');
    } else if (inputs.age > 85) {
      errors.push('Age cannot exceed 85');
    }
  }

  if (!inputs.gender) {
    errors.push('Gender is required');
  } else {
    const validGenders = ['male', 'female'];
    if (!validGenders.includes(inputs.gender)) {
      errors.push('Gender must be one of: male, female');
    }
  }

  if (!inputs.coverageAmount) {
    errors.push('Coverage amount is required');
  } else {
    if (inputs.coverageAmount < 10000) {
      errors.push('Coverage amount must be at least $10,000');
    } else if (inputs.coverageAmount > 10000000) {
      errors.push('Coverage amount cannot exceed $10,000,000');
    }
  }

  if (!inputs.termLength) {
    errors.push('Term length is required');
  } else {
    if (inputs.termLength < 1) {
      errors.push('Term length must be at least 1 year');
    } else if (inputs.termLength > 40) {
      errors.push('Term length cannot exceed 40 years');
    }
  }

  // Optional field validations
  if (inputs.filingStatus !== undefined) {
    const validStatuses = ['non-smoker', 'smoker', 'former-smoker'];
    if (!validStatuses.includes(inputs.filingStatus)) {
      errors.push('Filing status must be one of: non-smoker, smoker, former-smoker');
    }
  }

  if (inputs.height !== undefined) {
    if (inputs.height < 48) {
      errors.push('Height must be at least 48 inches');
    } else if (inputs.height > 84) {
      errors.push('Height cannot exceed 84 inches');
    }
  }

  if (inputs.weight !== undefined) {
    if (inputs.weight < 80) {
      errors.push('Weight must be at least 80 pounds');
    } else if (inputs.weight > 400) {
      errors.push('Weight cannot exceed 400 pounds');
    }
  }

  if (inputs.policyType !== undefined) {
    const validTypes = ['level-term', 'decreasing-term', 'increasing-term', 'ReturnOfPremium'];
    if (!validTypes.includes(inputs.policyType)) {
      errors.push('Policy type must be one of: level-term, decreasing-term, increasing-term, ReturnOfPremium');
    }
  }

  if (inputs.riders !== undefined) {
    const validRiders = ['none', 'WaiverOfPremium', 'AcceleratedDeathBenefit', 'child-rider', 'spouse-rider', 'multiple'];
    if (!validRiders.includes(inputs.riders)) {
      errors.push('Riders must be one of: none, WaiverOfPremium, AcceleratedDeathBenefit, child-rider, spouse-rider, multiple');
    }
  }

  // Financial validations
  if (inputs.annualIncome !== undefined) {
    if (inputs.annualIncome < 0) {
      errors.push('Annual income cannot be negative');
    } else if (inputs.annualIncome > 10000000) {
      errors.push('Annual income cannot exceed $10,000,000');
    }
  }

  if (inputs.debts !== undefined) {
    if (inputs.debts < 0) {
      errors.push('Debts cannot be negative');
    } else if (inputs.debts > 10000000) {
      errors.push('Debts cannot exceed $10,000,000');
    }
  }

  if (inputs.savings !== undefined) {
    if (inputs.savings < 0) {
      errors.push('Savings cannot be negative');
    } else if (inputs.savings > 10000000) {
      errors.push('Savings cannot exceed $10,000,000');
    }
  }

  if (inputs.existingLifeInsurance !== undefined) {
    if (inputs.existingLifeInsurance < 0) {
      errors.push('Existing life insurance cannot be negative');
    } else if (inputs.existingLifeInsurance > 10000000) {
      errors.push('Existing life insurance cannot exceed $10,000,000');
    }
  }

  if (inputs.funeralExpenses !== undefined) {
    if (inputs.funeralExpenses < 0) {
      errors.push('Funeral expenses cannot be negative');
    } else if (inputs.funeralExpenses > 100000) {
      errors.push('Funeral expenses cannot exceed $100,000');
    }
  }

  // Family validations
  if (inputs.dependents !== undefined) {
    if (inputs.dependents < 0) {
      errors.push('Number of dependents cannot be negative');
    } else if (inputs.dependents > 10) {
      errors.push('Number of dependents cannot exceed 10');
    }
  }

  if (inputs.childrenAge !== undefined) {
    if (inputs.childrenAge < 0) {
      errors.push('Children age cannot be negative');
    } else if (inputs.childrenAge > 25) {
      errors.push('Children age cannot exceed 25');
    }
  }

  if (inputs.spouseIncome !== undefined) {
    if (inputs.spouseIncome < 0) {
      errors.push('Spouse income cannot be negative');
    } else if (inputs.spouseIncome > 10000000) {
      errors.push('Spouse income cannot exceed $10,000,000');
    }
  }

  if (inputs.collegeCosts !== undefined) {
    if (inputs.collegeCosts < 0) {
      errors.push('College costs cannot be negative');
    } else if (inputs.collegeCosts > 1000000) {
      errors.push('College costs cannot exceed $1,000,000');
    }
  }

  // Health validations
  if (inputs.healthRating !== undefined) {
    const validRatings = ['preferred-plus', 'preferred', 'standard-plus', 'standard', 'substandard'];
    if (!validRatings.includes(inputs.healthRating)) {
      errors.push('Health rating must be one of: preferred-plus, preferred, standard-plus, standard, substandard');
    }
  }

  if (inputs.medicalConditions !== undefined) {
    const validConditions = ['none', 'diabetes', 'heart-disease', 'cancer', 'HighBloodPressure', 'multiple'];
    if (!validConditions.includes(inputs.medicalConditions)) {
      errors.push('Medical conditions must be one of: none, diabetes, heart-disease, cancer, HighBloodPressure, multiple');
    }
  }

  if (inputs.familyHistory !== undefined) {
    const validHistory = ['none', 'heart-disease', 'cancer', 'diabetes', 'multiple'];
    if (!validHistory.includes(inputs.familyHistory)) {
      errors.push('Family history must be one of: none, heart-disease, cancer, diabetes, multiple');
    }
  }

  if (inputs.occupation !== undefined) {
    const validOccupations = ['office', 'manual-labor', 'hazardous', 'military', 'aviation'];
    if (!validOccupations.includes(inputs.occupation)) {
      errors.push('Occupation must be one of: office, manual-labor, hazardous, military, aviation');
    }
  }

  if (inputs.hobbies !== undefined) {
    const validHobbies = ['none', 'scuba-diving', 'skydiving', 'rock-climbing', 'racing', 'multiple'];
    if (!validHobbies.includes(inputs.hobbies)) {
      errors.push('Hobbies must be one of: none, scuba-diving, skydiving, rock-climbing, racing, multiple');
    }
  }

  // Market factor validations
  if (inputs.inflationRate !== undefined) {
    if (inputs.inflationRate < 0) {
      errors.push('Inflation rate cannot be negative');
    } else if (inputs.inflationRate > 10) {
      errors.push('Inflation rate cannot exceed 10%');
    }
  }

  if (inputs.investmentReturn !== undefined) {
    if (inputs.investmentReturn < 0) {
      errors.push('Investment return cannot be negative');
    } else if (inputs.investmentReturn > 20) {
      errors.push('Investment return cannot exceed 20%');
    }
  }

  if (inputs.discountRate !== undefined) {
    if (inputs.discountRate < 0) {
      errors.push('Discount rate cannot be negative');
    } else if (inputs.discountRate > 15) {
      errors.push('Discount rate cannot exceed 15%');
    }
  }

  // Analysis option validations
  if (inputs.analysisType !== undefined) {
    const validTypes = ['basic', 'detailed', 'comparison', 'needs-analysis'];
    if (!validTypes.includes(inputs.analysisType)) {
      errors.push('Analysis type must be one of: basic, detailed, comparison, needs-analysis');
    }
  }

  if (inputs.comparisonTerms !== undefined) {
    const validTerms = ['102030', '15-25', '20-30', 'custom'];
    if (!validTerms.includes(inputs.comparisonTerms)) {
      errors.push('Comparison terms must be one of: 102030, 15-25, 20-30, custom');
    }
  }

  // Logical validation warnings
  if (inputs.age && inputs.termLength) {
    if (inputs.age + inputs.termLength > 85) {
      warnings.push('Policy term extends beyond typical maximum age for term life insurance');
    }
  }

  if (inputs.coverageAmount && inputs.annualIncome) {
    const coverageRatio = inputs.coverageAmount / inputs.annualIncome;
    if (coverageRatio < 5) {
      warnings.push('Coverage amount may be insufficient relative to income');
    } else if (coverageRatio > 20) {
      warnings.push('Coverage amount may be excessive relative to income');
    }
  }

  if (inputs.filingStatus === 'smoker') {
    warnings.push('Smoking significantly increases premiums - consider quitting for better rates');
  }

  if (inputs.healthRating === 'substandard') {
    warnings.push('Substandard health rating will result in significantly higher premiums');
  }

  if (inputs.occupation === 'hazardous' || inputs.occupation === 'aviation') {
    warnings.push('Hazardous occupation may limit available policies and increase premiums');
  }

  if (inputs.hobbies === 'skydiving' || inputs.hobbies === 'racing') {
    warnings.push('High-risk hobbies may significantly increase premiums or limit coverage');
  }

  if (inputs.riders === 'multiple') {
    warnings.push('Multiple riders will increase premium costs');
  }

  if (inputs.policyType === 'ReturnOfPremium') {
    warnings.push('Return of premium policies have significantly higher premiums');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
