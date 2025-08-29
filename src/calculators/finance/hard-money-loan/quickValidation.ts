import { HardMoneyLoanInputs } from './types';

export function validateLoanAmount(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Loan amount must be greater than 0';
  }
  if (value > 10000000) {
    return 'Loan amount cannot exceed $10,000,000';
  }
  if (allInputs.propertyValue && value > allInputs.propertyValue) {
    return 'Loan amount cannot exceed property value';
  }
  return null;
}

export function validateLoanTerm(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Loan term must be greater than 0';
  }
  if (value > 36) {
    return 'Loan term cannot exceed 36 months';
  }
  if (allInputs.projectTimeline && value < allInputs.projectTimeline) {
    return 'Loan term should be at least as long as project timeline';
  }
  return null;
}

export function validateInterestRate(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Interest rate must be greater than 0';
  }
  if (value > 25) {
    return 'Interest rate cannot exceed 25%';
  }
  if (value < 5) {
    return 'Interest rate seems unusually low for hard money lending';
  }
  return null;
}

export function validatePoints(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Points must be 0 or greater';
  }
  if (value > 10) {
    return 'Points cannot exceed 10%';
  }
  return null;
}

export function validatePropertyValue(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Property value must be greater than 0';
  }
  if (allInputs.loanAmount && value < allInputs.loanAmount) {
    return 'Property value must be greater than loan amount';
  }
  return null;
}

export function validatePropertyType(value: string, allInputs: HardMoneyLoanInputs): string | null {
  if (!value) {
    return 'Property type is required';
  }
  const validTypes = ['residential', 'commercial', 'industrial', 'land', 'mixed_use'];
  if (!validTypes.includes(value)) {
    return 'Invalid property type';
  }
  return null;
}

export function validatePropertyCondition(value: string, allInputs: HardMoneyLoanInputs): string | null {
  if (!value) {
    return 'Property condition is required';
  }
  const validConditions = ['excellent', 'good', 'fair', 'poor', 'needs_renovation'];
  if (!validConditions.includes(value)) {
    return 'Invalid property condition';
  }
  return null;
}

export function validatePropertyAddress(value: string, allInputs: HardMoneyLoanInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'Property address is required';
  }
  if (value.trim().length < 10) {
    return 'Property address seems too short';
  }
  return null;
}

export function validatePropertySize(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Property size must be greater than 0';
  }
  if (value > 100000) {
    return 'Property size seems unusually large';
  }
  return null;
}

export function validatePropertyAge(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Property age must be 0 or greater';
  }
  if (value > 100) {
    return 'Property age cannot exceed 100 years';
  }
  return null;
}

export function validateBorrowerCreditScore(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (!value || value < 300 || value > 850) {
    return 'Borrower credit score must be between 300 and 850';
  }
  if (value < 600) {
    return 'Poor credit score may affect loan approval';
  }
  return null;
}

export function validateBorrowerIncome(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Borrower income must be greater than 0';
  }
  if (value < 20000) {
    return 'Borrower income seems unusually low';
  }
  return null;
}

export function validateBorrowerDebtToIncomeRatio(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Debt-to-income ratio must be 0 or greater';
  }
  if (value > 100) {
    return 'Debt-to-income ratio cannot exceed 100%';
  }
  if (value > 50) {
    return 'High debt-to-income ratio may affect loan approval';
  }
  return null;
}

export function validateBorrowerLiquidity(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Borrower liquidity must be 0 or greater';
  }
  if (allInputs.loanAmount && value < allInputs.loanAmount * 0.1) {
    return 'Low liquidity may indicate limited financial reserves';
  }
  return null;
}

export function validateBorrowerExperience(value: string, allInputs: HardMoneyLoanInputs): string | null {
  if (!value) {
    return 'Borrower experience is required';
  }
  const validExperiences = ['none', 'beginner', 'intermediate', 'experienced', 'expert'];
  if (!validExperiences.includes(value)) {
    return 'Invalid borrower experience level';
  }
  return null;
}

export function validateProjectType(value: string, allInputs: HardMoneyLoanInputs): string | null {
  if (!value) {
    return 'Project type is required';
  }
  const validTypes = ['fix_and_flip', 'buy_and_hold', 'construction', 'land_development', 'refinance'];
  if (!validTypes.includes(value)) {
    return 'Invalid project type';
  }
  return null;
}

export function validateProjectTimeline(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Project timeline must be greater than 0';
  }
  if (value > 36) {
    return 'Project timeline cannot exceed 36 months';
  }
  if (allInputs.loanTerm && value > allInputs.loanTerm) {
    return 'Project timeline exceeds loan term';
  }
  return null;
}

export function validateRenovationBudget(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Renovation budget must be 0 or greater';
  }
  if (allInputs.propertyValue && value > allInputs.propertyValue * 0.5) {
    return 'Renovation budget exceeds 50% of property value';
  }
  return null;
}

export function validateExpectedARV(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Expected ARV must be greater than 0';
  }
  if (allInputs.propertyValue && value < allInputs.propertyValue) {
    return 'Expected ARV should be greater than current property value';
  }
  if (allInputs.propertyValue && allInputs.renovationBudget) {
    const totalInvestment = allInputs.propertyValue + allInputs.renovationBudget;
    const profitMargin = ((value - totalInvestment) / totalInvestment) * 100;
    if (profitMargin < 10) {
      return 'Low profit margin may not provide adequate return';
    }
  }
  return null;
}

export function validateExitStrategy(value: string, allInputs: HardMoneyLoanInputs): string | null {
  if (!value) {
    return 'Exit strategy is required';
  }
  const validStrategies = ['sale', 'refinance', 'rental', 'mixed'];
  if (!validStrategies.includes(value)) {
    return 'Invalid exit strategy';
  }
  return null;
}

export function validateMarketCondition(value: string, allInputs: HardMoneyLoanInputs): string | null {
  if (!value) {
    return 'Market condition is required';
  }
  const validConditions = ['hot', 'stable', 'declining', 'recovering'];
  if (!validConditions.includes(value)) {
    return 'Invalid market condition';
  }
  return null;
}

export function validateMarketGrowthRate(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (value === undefined) {
    return 'Market growth rate is required';
  }
  if (value < -10 || value > 20) {
    return 'Market growth rate must be between -10% and 20%';
  }
  return null;
}

export function validateMarketRisk(value: string, allInputs: HardMoneyLoanInputs): string | null {
  if (!value) {
    return 'Market risk is required';
  }
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return 'Invalid market risk level';
  }
  return null;
}

export function validatePropertyRisk(value: string, allInputs: HardMoneyLoanInputs): string | null {
  if (!value) {
    return 'Property risk is required';
  }
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return 'Invalid property risk level';
  }
  return null;
}

export function validateBorrowerRisk(value: string, allInputs: HardMoneyLoanInputs): string | null {
  if (!value) {
    return 'Borrower risk is required';
  }
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return 'Invalid borrower risk level';
  }
  return null;
}

export function validateProjectRisk(value: string, allInputs: HardMoneyLoanInputs): string | null {
  if (!value) {
    return 'Project risk is required';
  }
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return 'Invalid project risk level';
  }
  return null;
}

export function validateZoningCompliance(value: boolean, allInputs: HardMoneyLoanInputs): string | null {
  if (value === undefined) {
    return 'Zoning compliance field is required';
  }
  return null;
}

export function validateEnvironmentalIssues(value: boolean, allInputs: HardMoneyLoanInputs): string | null {
  if (value === undefined) {
    return 'Environmental issues field is required';
  }
  return null;
}

export function validateTitleIssues(value: boolean, allInputs: HardMoneyLoanInputs): string | null {
  if (value === undefined) {
    return 'Title issues field is required';
  }
  return null;
}

export function validatePermitIssues(value: boolean, allInputs: HardMoneyLoanInputs): string | null {
  if (value === undefined) {
    return 'Permit issues field is required';
  }
  return null;
}

export function validateAnalysisPeriod(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Analysis period must be greater than 0';
  }
  if (value > 60) {
    return 'Analysis period cannot exceed 60 months';
  }
  return null;
}

export function validateDiscountRate(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (!value || value <= 0) {
    return 'Discount rate must be greater than 0';
  }
  if (value > 30) {
    return 'Discount rate cannot exceed 30%';
  }
  return null;
}

export function validateInflationRate(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (value === undefined) {
    return 'Inflation rate is required';
  }
  if (value < -5 || value > 15) {
    return 'Inflation rate must be between -5% and 15%';
  }
  return null;
}

export function validateTaxRate(value: number, allInputs: HardMoneyLoanInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Tax rate must be 0 or greater';
  }
  if (value > 50) {
    return 'Tax rate cannot exceed 50%';
  }
  return null;
}

export function validateCurrency(value: string, allInputs: HardMoneyLoanInputs): string | null {
  if (!value) {
    return 'Currency is required';
  }
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return 'Invalid currency';
  }
  return null;
}

export function validateDisplayFormat(value: string, allInputs: HardMoneyLoanInputs): string | null {
  if (!value) {
    return 'Display format is required';
  }
  const validFormats = ['percentage', 'decimal', 'currency'];
  if (!validFormats.includes(value)) {
    return 'Invalid display format';
  }
  return null;
}

export function validateIncludeCharts(value: boolean, allInputs: HardMoneyLoanInputs): string | null {
  if (value === undefined) {
    return 'Include charts field is required';
  }
  return null;
}
