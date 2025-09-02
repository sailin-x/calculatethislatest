import { RetirementPlanningCalculatorInputs, RetirementPlanningCalculatorOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateRetirementPlanningCalculatorInputs(inputs: RetirementPlanningCalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate personal information
  validatePersonalInfo(inputs.personalInfo, errors);
  
  // Validate income information
  validateIncomeInfo(inputs.incomeInfo, errors);
  
  // Validate assets information
  validateAssetsInfo(inputs.assetsInfo, errors);
  
  // Validate expenses information
  validateExpensesInfo(inputs.expensesInfo, errors);
  
  // Validate goals information
  validateGoalsInfo(inputs.goalsInfo, errors);
  
  // Validate risk information
  validateRiskInfo(inputs.riskInfo, errors);
  
  // Validate strategy information
  validateStrategyInfo(inputs.strategyInfo, errors);

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateRetirementPlanningCalculatorOutputs(outputs: RetirementPlanningCalculatorOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate core retirement planning results
  if (outputs.retirementReadinessScore < 0 || outputs.retirementReadinessScore > 1) {
    errors.retirementReadinessScore = 'Retirement readiness score must be between 0 and 1';
  }

  if (outputs.retirementIncomeGap < 0) {
    errors.retirementIncomeGap = 'Retirement income gap cannot be negative';
  }

  if (outputs.requiredRetirementSavings < 0) {
    errors.requiredRetirementSavings = 'Required retirement savings cannot be negative';
  }

  if (outputs.retirementIncomeReplacement < 0) {
    errors.retirementIncomeReplacement = 'Retirement income replacement rate cannot be negative';
  }

  if (outputs.retirementSuccessProbability < 0 || outputs.retirementSuccessProbability > 1) {
    errors.retirementSuccessProbability = 'Retirement success probability must be between 0 and 1';
  }

  // Validate financial projections
  if (outputs.projectedRetirementAssets < 0) {
    errors.projectedRetirementAssets = 'Projected retirement assets cannot be negative';
  }

  if (outputs.projectedRetirementIncome < 0) {
    errors.projectedRetirementIncome = 'Projected retirement income cannot be negative';
  }

  if (outputs.projectedRetirementExpenses < 0) {
    errors.projectedRetirementExpenses = 'Projected retirement expenses cannot be negative';
  }

  // Validate savings analysis
  if (outputs.currentSavingsRate < 0 || outputs.currentSavingsRate > 1) {
    errors.currentSavingsRate = 'Current savings rate must be between 0 and 1';
  }

  if (outputs.targetSavingsRate < 0 || outputs.targetSavingsRate > 1) {
    errors.targetSavingsRate = 'Target savings rate must be between 0 and 1';
  }

  if (outputs.yearsToRetirement < 0) {
    errors.yearsToRetirement = 'Years to retirement cannot be negative';
  }

  // Validate investment analysis
  if (outputs.expectedInvestmentReturn < -1 || outputs.expectedInvestmentReturn > 1) {
    errors.expectedInvestmentReturn = 'Expected investment return must be between -100% and 100%';
  }

  if (outputs.inflationAdjustedReturn < -1 || outputs.inflationAdjustedReturn > 1) {
    errors.inflationAdjustedReturn = 'Inflation adjusted return must be between -100% and 100%';
  }

  if (outputs.portfolioGrowth < -1) {
    errors.portfolioGrowth = 'Portfolio growth cannot be less than -100%';
  }

  // Validate risk assessment
  if (outputs.riskAssessment.inflationRisk < 0 || outputs.riskAssessment.inflationRisk > 1) {
    errors.inflationRisk = 'Inflation risk must be between 0 and 1';
  }

  if (outputs.riskAssessment.marketRisk < 0 || outputs.riskAssessment.marketRisk > 1) {
    errors.marketRisk = 'Market risk must be between 0 and 1';
  }

  if (outputs.riskAssessment.longevityRisk < 0 || outputs.riskAssessment.longevityRisk > 1) {
    errors.longevityRisk = 'Longevity risk must be between 0 and 1';
  }

  if (outputs.riskAssessment.healthcareRisk < 0 || outputs.riskAssessment.healthcareRisk > 1) {
    errors.healthcareRisk = 'Healthcare risk must be between 0 and 1';
  }

  if (outputs.riskAssessment.totalRisk < 0 || outputs.riskAssessment.totalRisk > 1) {
    errors.totalRisk = 'Total risk must be between 0 and 1';
  }

  // Validate Monte Carlo results
  if (outputs.monteCarloResults.meanRetirementReadiness < 0 || outputs.monteCarloResults.meanRetirementReadiness > 1) {
    errors.meanRetirementReadiness = 'Mean retirement readiness must be between 0 and 1';
  }

  if (outputs.monteCarloResults.medianRetirementReadiness < 0 || outputs.monteCarloResults.medianRetirementReadiness > 1) {
    errors.medianRetirementReadiness = 'Median retirement readiness must be between 0 and 1';
  }

  if (outputs.monteCarloResults.standardDeviation < 0) {
    errors.standardDeviation = 'Standard deviation cannot be negative';
  }

  if (outputs.monteCarloResults.successProbability < 0 || outputs.monteCarloResults.successProbability > 1) {
    errors.successProbability = 'Success probability must be between 0 and 1';
  }

  // Validate key metrics
  if (outputs.keyMetrics.savingsRate < 0 || outputs.keyMetrics.savingsRate > 1) {
    errors.savingsRate = 'Savings rate must be between 0 and 1';
  }

  if (outputs.keyMetrics.investmentReturn < -1 || outputs.keyMetrics.investmentReturn > 1) {
    errors.investmentReturn = 'Investment return must be between -100% and 100%';
  }

  if (outputs.keyMetrics.expenseRatio < 0) {
    errors.expenseRatio = 'Expense ratio cannot be negative';
  }

  if (outputs.keyMetrics.debtToIncome < 0) {
    errors.debtToIncome = 'Debt to income ratio cannot be negative';
  }

  if (outputs.keyMetrics.emergencyFund < 0) {
    errors.emergencyFund = 'Emergency fund cannot be negative';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

function validatePersonalInfo(personalInfo: any, errors: Record<string, string>): void {
  // Validate basic info
  if (!personalInfo.basicInfo.firstName || personalInfo.basicInfo.firstName.trim().length === 0) {
    errors.firstName = 'First name is required';
  }

  if (personalInfo.basicInfo.firstName && personalInfo.basicInfo.firstName.length > 50) {
    errors.firstName = 'First name cannot exceed 50 characters';
  }

  if (!personalInfo.basicInfo.lastName || personalInfo.basicInfo.lastName.trim().length === 0) {
    errors.lastName = 'Last name is required';
  }

  if (personalInfo.basicInfo.lastName && personalInfo.basicInfo.lastName.length > 50) {
    errors.lastName = 'Last name cannot exceed 50 characters';
  }

  if (!personalInfo.basicInfo.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  }

  if (personalInfo.basicInfo.age < 18) {
    errors.age = 'Age must be at least 18';
  }

  if (personalInfo.basicInfo.age > 120) {
    errors.age = 'Age cannot exceed 120';
  }

  if (!personalInfo.basicInfo.gender) {
    errors.gender = 'Gender is required';
  }

  const validGenders = ['male', 'female', 'other'];
  if (personalInfo.basicInfo.gender && !validGenders.includes(personalInfo.basicInfo.gender)) {
    errors.gender = 'Invalid gender';
  }

  if (!personalInfo.basicInfo.maritalStatus) {
    errors.maritalStatus = 'Marital status is required';
  }

  const validMaritalStatuses = ['single', 'married', 'divorced', 'widowed'];
  if (personalInfo.basicInfo.maritalStatus && !validMaritalStatuses.includes(personalInfo.basicInfo.maritalStatus)) {
    errors.maritalStatus = 'Invalid marital status';
  }

  if (personalInfo.basicInfo.dependents < 0) {
    errors.dependents = 'Number of dependents cannot be negative';
  }

  if (personalInfo.basicInfo.dependents > 20) {
    errors.dependents = 'Number of dependents cannot exceed 20';
  }

  if (personalInfo.basicInfo.lifeExpectancy < 50) {
    errors.lifeExpectancy = 'Life expectancy must be at least 50 years';
  }

  if (personalInfo.basicInfo.lifeExpectancy > 120) {
    errors.lifeExpectancy = 'Life expectancy cannot exceed 120 years';
  }

  if (personalInfo.basicInfo.expectedRetirementAge < 50) {
    errors.expectedRetirementAge = 'Expected retirement age must be at least 50';
  }

  if (personalInfo.basicInfo.expectedRetirementAge > 85) {
    errors.expectedRetirementAge = 'Expected retirement age cannot exceed 85';
  }

  if (personalInfo.basicInfo.yearsToRetirement < 0) {
    errors.yearsToRetirement = 'Years to retirement cannot be negative';
  }

  // Validate tax info
  if (!personalInfo.taxInfo.taxFilingStatus) {
    errors.taxFilingStatus = 'Tax filing status is required';
  }

  const validTaxFilingStatuses = ['single', 'married_filing_jointly', 'married_filing_separately', 'head_of_household', 'qualifying_widow'];
  if (personalInfo.taxInfo.taxFilingStatus && !validTaxFilingStatuses.includes(personalInfo.taxInfo.taxFilingStatus)) {
    errors.taxFilingStatus = 'Invalid tax filing status';
  }

  if (personalInfo.taxInfo.taxBracket < 0 || personalInfo.taxInfo.taxBracket > 1) {
    errors.taxBracket = 'Tax bracket must be between 0% and 100%';
  }

  if (personalInfo.taxInfo.stateTaxRate < 0 || personalInfo.taxInfo.stateTaxRate > 1) {
    errors.stateTaxRate = 'State tax rate must be between 0% and 100%';
  }

  if (personalInfo.taxInfo.localTaxRate < 0 || personalInfo.taxInfo.localTaxRate > 1) {
    errors.localTaxRate = 'Local tax rate must be between 0% and 100%';
  }

  if (personalInfo.taxInfo.taxDeductions < 0) {
    errors.taxDeductions = 'Tax deductions cannot be negative';
  }

  if (personalInfo.taxInfo.taxCredits < 0) {
    errors.taxCredits = 'Tax credits cannot be negative';
  }
}

function validateIncomeInfo(incomeInfo: any, errors: Record<string, string>): void {
  // Validate employment income
  if (incomeInfo.employmentIncome.length > 0) {
    incomeInfo.employmentIncome.forEach((income: any, index: number) => {
      if (!income.source || income.source.trim().length === 0) {
        errors[`employmentIncome[${index}].source`] = 'Income source is required';
      }

      if (income.amount < 0) {
        errors[`employmentIncome[${index}].amount`] = 'Income amount cannot be negative';
      }

      if (income.amount > 10000000) {
        errors[`employmentIncome[${index}].amount`] = 'Income amount cannot exceed $10 million';
      }

      if (!income.frequency) {
        errors[`employmentIncome[${index}].frequency`] = 'Income frequency is required';
      }

      const validFrequencies = ['weekly', 'bi_weekly', 'monthly', 'quarterly', 'annually'];
      if (income.frequency && !validFrequencies.includes(income.frequency)) {
        errors[`employmentIncome[${index}].frequency`] = 'Invalid income frequency';
      }

      if (income.growthRate < -1 || income.growthRate > 1) {
        errors[`employmentIncome[${index}].growthRate`] = 'Growth rate must be between -100% and 100%';
      }

      if (income.expectedRetirementAge < 50 || income.expectedRetirementAge > 85) {
        errors[`employmentIncome[${index}].expectedRetirementAge`] = 'Expected retirement age must be between 50 and 85';
      }
    });
  }

  // Validate self-employment income
  if (incomeInfo.selfEmploymentIncome.length > 0) {
    incomeInfo.selfEmploymentIncome.forEach((income: any, index: number) => {
      if (!income.source || income.source.trim().length === 0) {
        errors[`selfEmploymentIncome[${index}].source`] = 'Income source is required';
      }

      if (income.amount < 0) {
        errors[`selfEmploymentIncome[${index}].amount`] = 'Income amount cannot be negative';
      }

      if (income.amount > 10000000) {
        errors[`selfEmploymentIncome[${index}].amount`] = 'Income amount cannot exceed $10 million';
      }
    });
  }

  // Validate investment income
  if (incomeInfo.investmentIncome.length > 0) {
    incomeInfo.investmentIncome.forEach((income: any, index: number) => {
      if (!income.source || income.source.trim().length === 0) {
        errors[`investmentIncome[${index}].source`] = 'Income source is required';
      }

      if (income.amount < 0) {
        errors[`investmentIncome[${index}].amount`] = 'Income amount cannot be negative';
      }

      if (income.amount > 10000000) {
        errors[`investmentIncome[${index}].amount`] = 'Income amount cannot exceed $10 million';
      }
    });
  }

  // Validate other income
  if (incomeInfo.otherIncome.length > 0) {
    incomeInfo.otherIncome.forEach((income: any, index: number) => {
      if (!income.source || income.source.trim().length === 0) {
        errors[`otherIncome[${index}].source`] = 'Income source is required';
      }

      if (income.amount < 0) {
        errors[`otherIncome[${index}].amount`] = 'Income amount cannot be negative';
      }

      if (income.amount > 10000000) {
        errors[`otherIncome[${index}].amount`] = 'Income amount cannot exceed $10 million';
      }
    });
  }

  if (incomeInfo.totalIncome < 0) {
    errors.totalIncome = 'Total income cannot be negative';
  }
}

function validateAssetsInfo(assetsInfo: any, errors: Record<string, string>): void {
  // Validate retirement accounts
  if (assetsInfo.retirementAccounts.length > 0) {
    assetsInfo.retirementAccounts.forEach((account: any, index: number) => {
      if (!account.type || account.type.trim().length === 0) {
        errors[`retirementAccounts[${index}].type`] = 'Account type is required';
      }

      if (account.balance < 0) {
        errors[`retirementAccounts[${index}].balance`] = 'Account balance cannot be negative';
      }

      if (account.balance > 100000000) {
        errors[`retirementAccounts[${index}].balance`] = 'Account balance cannot exceed $100 million';
      }

      if (account.contribution < 0) {
        errors[`retirementAccounts[${index}].contribution`] = 'Contribution cannot be negative';
      }

      if (account.employerMatch < 0 || account.employerMatch > 1) {
        errors[`retirementAccounts[${index}].employerMatch`] = 'Employer match must be between 0% and 100%';
      }

      if (account.expectedReturn < -1 || account.expectedReturn > 1) {
        errors[`retirementAccounts[${index}].expectedReturn`] = 'Expected return must be between -100% and 100%';
      }

      if (account.withdrawalAge < 50 || account.withdrawalAge > 85) {
        errors[`retirementAccounts[${index}].withdrawalAge`] = 'Withdrawal age must be between 50 and 85';
      }
    });
  }

  // Validate investment accounts
  if (assetsInfo.investmentAccounts.length > 0) {
    assetsInfo.investmentAccounts.forEach((account: any, index: number) => {
      if (!account.type || account.type.trim().length === 0) {
        errors[`investmentAccounts[${index}].type`] = 'Account type is required';
      }

      if (account.balance < 0) {
        errors[`investmentAccounts[${index}].balance`] = 'Account balance cannot be negative';
      }

      if (account.balance > 100000000) {
        errors[`investmentAccounts[${index}].balance`] = 'Account balance cannot exceed $100 million';
      }

      if (account.contribution < 0) {
        errors[`investmentAccounts[${index}].contribution`] = 'Contribution cannot be negative';
      }

      if (account.expectedReturn < -1 || account.expectedReturn > 1) {
        errors[`investmentAccounts[${index}].expectedReturn`] = 'Expected return must be between -100% and 100%';
      }

      if (account.taxEfficiency < 0 || account.taxEfficiency > 1) {
        errors[`investmentAccounts[${index}].taxEfficiency`] = 'Tax efficiency must be between 0 and 1';
      }
    });
  }

  // Validate real estate
  if (assetsInfo.realEstate.length > 0) {
    assetsInfo.realEstate.forEach((property: any, index: number) => {
      if (!property.type || property.type.trim().length === 0) {
        errors[`realEstate[${index}].type`] = 'Property type is required';
      }

      if (property.currentValue < 0) {
        errors[`realEstate[${index}].currentValue`] = 'Property value cannot be negative';
      }

      if (property.currentValue > 100000000) {
        errors[`realEstate[${index}].currentValue`] = 'Property value cannot exceed $100 million';
      }

      if (property.mortgageBalance < 0) {
        errors[`realEstate[${index}].mortgageBalance`] = 'Mortgage balance cannot be negative';
      }

      if (property.mortgageBalance > property.currentValue) {
        errors[`realEstate[${index}].mortgageBalance`] = 'Mortgage balance cannot exceed property value';
      }

      if (property.rentalIncome && property.rentalIncome < 0) {
        errors[`realEstate[${index}].rentalIncome`] = 'Rental income cannot be negative';
      }
    });
  }

  // Validate business interests
  if (assetsInfo.businessInterests.length > 0) {
    assetsInfo.businessInterests.forEach((business: any, index: number) => {
      if (!business.type || business.type.trim().length === 0) {
        errors[`businessInterests[${index}].type`] = 'Business type is required';
      }

      if (business.currentValue < 0) {
        errors[`businessInterests[${index}].currentValue`] = 'Business value cannot be negative';
      }

      if (business.currentValue > 100000000) {
        errors[`businessInterests[${index}].currentValue`] = 'Business value cannot exceed $100 million';
      }

      if (business.annualIncome && business.annualIncome < 0) {
        errors[`businessInterests[${index}].annualIncome`] = 'Annual income cannot be negative';
      }
    });
  }

  // Validate other assets
  if (assetsInfo.otherAssets.length > 0) {
    assetsInfo.otherAssets.forEach((asset: any, index: number) => {
      if (!asset.type || asset.type.trim().length === 0) {
        errors[`otherAssets[${index}].type`] = 'Asset type is required';
      }

      if (asset.currentValue < 0) {
        errors[`otherAssets[${index}].currentValue`] = 'Asset value cannot be negative';
      }

      if (asset.currentValue > 100000000) {
        errors[`otherAssets[${index}].currentValue`] = 'Asset value cannot exceed $100 million';
      }
    });
  }

  if (assetsInfo.totalAssets < 0) {
    errors.totalAssets = 'Total assets cannot be negative';
  }
}

function validateExpensesInfo(expensesInfo: any, errors: Record<string, string>): void {
  // Validate current expenses
  const currentExpenses = expensesInfo.currentExpenses;
  if (currentExpenses.housing < 0) {
    errors.housing = 'Housing expenses cannot be negative';
  }

  if (currentExpenses.transportation < 0) {
    errors.transportation = 'Transportation expenses cannot be negative';
  }

  if (currentExpenses.food < 0) {
    errors.food = 'Food expenses cannot be negative';
  }

  if (currentExpenses.healthcare < 0) {
    errors.healthcare = 'Healthcare expenses cannot be negative';
  }

  if (currentExpenses.insurance < 0) {
    errors.insurance = 'Insurance expenses cannot be negative';
  }

  if (currentExpenses.utilities < 0) {
    errors.utilities = 'Utilities expenses cannot be negative';
  }

  if (currentExpenses.entertainment < 0) {
    errors.entertainment = 'Entertainment expenses cannot be negative';
  }

  if (currentExpenses.debtPayments < 0) {
    errors.debtPayments = 'Debt payments cannot be negative';
  }

  if (currentExpenses.otherExpenses < 0) {
    errors.otherExpenses = 'Other expenses cannot be negative';
  }

  if (currentExpenses.totalExpenses < 0) {
    errors.totalExpenses = 'Total expenses cannot be negative';
  }

  // Validate retirement expenses
  const retirementExpenses = expensesInfo.retirementExpenses;
  if (retirementExpenses.housing < 0) {
    errors.retirementHousing = 'Retirement housing expenses cannot be negative';
  }

  if (retirementExpenses.transportation < 0) {
    errors.retirementTransportation = 'Retirement transportation expenses cannot be negative';
  }

  if (retirementExpenses.food < 0) {
    errors.retirementFood = 'Retirement food expenses cannot be negative';
  }

  if (retirementExpenses.healthcare < 0) {
    errors.retirementHealthcare = 'Retirement healthcare expenses cannot be negative';
  }

  if (retirementExpenses.insurance < 0) {
    errors.retirementInsurance = 'Retirement insurance expenses cannot be negative';
  }

  if (retirementExpenses.utilities < 0) {
    errors.retirementUtilities = 'Retirement utilities expenses cannot be negative';
  }

  if (retirementExpenses.entertainment < 0) {
    errors.retirementEntertainment = 'Retirement entertainment expenses cannot be negative';
  }

  if (retirementExpenses.travel < 0) {
    errors.retirementTravel = 'Retirement travel expenses cannot be negative';
  }

  if (retirementExpenses.otherExpenses < 0) {
    errors.retirementOtherExpenses = 'Retirement other expenses cannot be negative';
  }

  if (retirementExpenses.totalExpenses < 0) {
    errors.retirementTotalExpenses = 'Retirement total expenses cannot be negative';
  }

  // Validate inflation rate
  if (expensesInfo.inflationRate < -0.5 || expensesInfo.inflationRate > 1) {
    errors.inflationRate = 'Inflation rate must be between -50% and 100%';
  }
}

function validateGoalsInfo(goalsInfo: any, errors: Record<string, string>): void {
  if (goalsInfo.retirementIncomeNeeds < 0) {
    errors.retirementIncomeNeeds = 'Retirement income needs cannot be negative';
  }

  if (goalsInfo.retirementIncomeNeeds > 10000000) {
    errors.retirementIncomeNeeds = 'Retirement income needs cannot exceed $10 million';
  }

  if (!goalsInfo.retirementLifestyle) {
    errors.retirementLifestyle = 'Retirement lifestyle is required';
  }

  const validLifestyles = ['modest', 'comfortable', 'luxury'];
  if (goalsInfo.retirementLifestyle && !validLifestyles.includes(goalsInfo.retirementLifestyle)) {
    errors.retirementLifestyle = 'Invalid retirement lifestyle';
  }

  if (goalsInfo.retirementAge < 50) {
    errors.retirementAge = 'Retirement age must be at least 50';
  }

  if (goalsInfo.retirementAge > 85) {
    errors.retirementAge = 'Retirement age cannot exceed 85';
  }

  if (goalsInfo.retirementDuration < 1) {
    errors.retirementDuration = 'Retirement duration must be at least 1 year';
  }

  if (goalsInfo.retirementDuration > 50) {
    errors.retirementDuration = 'Retirement duration cannot exceed 50 years';
  }

  if (goalsInfo.legacyGoals < 0) {
    errors.legacyGoals = 'Legacy goals cannot be negative';
  }

  if (goalsInfo.legacyGoals > 10000000) {
    errors.legacyGoals = 'Legacy goals cannot exceed $10 million';
  }
}

function validateRiskInfo(riskInfo: any, errors: Record<string, string>): void {
  if (!riskInfo.riskTolerance) {
    errors.riskTolerance = 'Risk tolerance is required';
  }

  const validRiskTolerances = ['conservative', 'moderate', 'aggressive'];
  if (riskInfo.riskTolerance && !validRiskTolerances.includes(riskInfo.riskTolerance)) {
    errors.riskTolerance = 'Invalid risk tolerance';
  }

  if (riskInfo.investmentHorizon < 1) {
    errors.investmentHorizon = 'Investment horizon must be at least 1 year';
  }

  if (riskInfo.investmentHorizon > 50) {
    errors.investmentHorizon = 'Investment horizon cannot exceed 50 years';
  }

  if (!riskInfo.liquidityNeeds) {
    errors.liquidityNeeds = 'Liquidity needs is required';
  }

  const validLiquidityNeeds = ['low', 'medium', 'high'];
  if (riskInfo.liquidityNeeds && !validLiquidityNeeds.includes(riskInfo.liquidityNeeds)) {
    errors.liquidityNeeds = 'Invalid liquidity needs';
  }

  if (riskInfo.inflationRisk < 0 || riskInfo.inflationRisk > 1) {
    errors.inflationRisk = 'Inflation risk must be between 0 and 1';
  }

  if (riskInfo.marketRisk < 0 || riskInfo.marketRisk > 1) {
    errors.marketRisk = 'Market risk must be between 0 and 1';
  }

  if (riskInfo.longevityRisk < 0 || riskInfo.longevityRisk > 1) {
    errors.longevityRisk = 'Longevity risk must be between 0 and 1';
  }

  if (riskInfo.healthcareRisk < 0 || riskInfo.healthcareRisk > 1) {
    errors.healthcareRisk = 'Healthcare risk must be between 0 and 1';
  }
}

function validateStrategyInfo(strategyInfo: any, errors: Record<string, string>): void {
  // Validate savings strategy
  if (strategyInfo.savingsStrategy.currentSavingsRate < 0 || strategyInfo.savingsStrategy.currentSavingsRate > 1) {
    errors.currentSavingsRate = 'Current savings rate must be between 0% and 100%';
  }

  if (strategyInfo.savingsStrategy.targetSavingsRate < 0 || strategyInfo.savingsStrategy.targetSavingsRate > 1) {
    errors.targetSavingsRate = 'Target savings rate must be between 0% and 100%';
  }

  if (strategyInfo.savingsStrategy.employerMatch < 0 || strategyInfo.savingsStrategy.employerMatch > 1) {
    errors.employerMatch = 'Employer match must be between 0% and 100%';
  }

  // Validate investment strategy
  if (!strategyInfo.investmentStrategy.assetAllocation) {
    errors.assetAllocation = 'Asset allocation is required';
  }

  const validAssetAllocations = ['conservative', 'moderate', 'aggressive'];
  if (strategyInfo.investmentStrategy.assetAllocation && !validAssetAllocations.includes(strategyInfo.investmentStrategy.assetAllocation)) {
    errors.assetAllocation = 'Invalid asset allocation';
  }

  if (strategyInfo.investmentStrategy.targetReturn < -1 || strategyInfo.investmentStrategy.targetReturn > 1) {
    errors.targetReturn = 'Target return must be between -100% and 100%';
  }

  if (!strategyInfo.investmentStrategy.rebalancingFrequency) {
    errors.rebalancingFrequency = 'Rebalancing frequency is required';
  }

  const validRebalancingFrequencies = ['monthly', 'quarterly', 'semi_annually', 'annually'];
  if (strategyInfo.investmentStrategy.rebalancingFrequency && !validRebalancingFrequencies.includes(strategyInfo.investmentStrategy.rebalancingFrequency)) {
    errors.rebalancingFrequency = 'Invalid rebalancing frequency';
  }

  // Validate withdrawal strategy
  if (strategyInfo.withdrawalStrategy.withdrawalRate < 0 || strategyInfo.withdrawalStrategy.withdrawalRate > 1) {
    errors.withdrawalRate = 'Withdrawal rate must be between 0% and 100%';
  }

  if (!strategyInfo.withdrawalStrategy.withdrawalMethod) {
    errors.withdrawalMethod = 'Withdrawal method is required';
  }

  const validWithdrawalMethods = ['systematic', 'percentage', 'fixed_amount'];
  if (strategyInfo.withdrawalStrategy.withdrawalMethod && !validWithdrawalMethods.includes(strategyInfo.withdrawalStrategy.withdrawalMethod)) {
    errors.withdrawalMethod = 'Invalid withdrawal method';
  }
}