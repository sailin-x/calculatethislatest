import { CashFlowInputs, CashFlowOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateCashFlowInputs(inputs: CashFlowInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Property Information validation
  if (inputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be greater than 0';
  }

  if (inputs.purchasePrice <= 0) {
    errors.purchasePrice = 'Purchase price must be greater than 0';
  }

  if (inputs.downPayment < 0) {
    errors.downPayment = 'Down payment cannot be negative';
  }

  if (inputs.loanAmount < 0) {
    errors.loanAmount = 'Loan amount cannot be negative';
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 20) {
    errors.interestRate = 'Interest rate must be between 0% and 20%';
  }

  if (![15, 20, 30].includes(inputs.loanTerm)) {
    errors.loanTerm = 'Loan term must be 15, 20, or 30 years';
  }

  if (!['residential', 'commercial', 'mixed-use', 'industrial'].includes(inputs.propertyType)) {
    errors.propertyType = 'Invalid property type';
  }

  if (inputs.propertyAge < 0) {
    errors.propertyAge = 'Property age cannot be negative';
  }

  if (inputs.squareFootage <= 0) {
    errors.squareFootage = 'Square footage must be greater than 0';
  }

  if (inputs.bedrooms < 0) {
    errors.bedrooms = 'Number of bedrooms cannot be negative';
  }

  if (inputs.bathrooms < 0) {
    errors.bathrooms = 'Number of bathrooms cannot be negative';
  }

  // Income Information validation
  if (inputs.monthlyRent < 0) {
    errors.monthlyRent = 'Monthly rent cannot be negative';
  }

  if (inputs.otherIncome < 0) {
    errors.otherIncome = 'Other income cannot be negative';
  }

  if (inputs.rentGrowthRate < -10 || inputs.rentGrowthRate > 20) {
    errors.rentGrowthRate = 'Rent growth rate must be between -10% and 20%';
  }

  if (inputs.vacancyRate < 0 || inputs.vacancyRate > 50) {
    errors.vacancyRate = 'Vacancy rate must be between 0% and 50%';
  }

  // Operating Expenses validation
  if (inputs.propertyTaxes < 0) {
    errors.propertyTaxes = 'Property taxes cannot be negative';
  }

  if (inputs.insurance < 0) {
    errors.insurance = 'Insurance cannot be negative';
  }

  if (inputs.maintenance < 0) {
    errors.maintenance = 'Maintenance cannot be negative';
  }

  if (inputs.propertyManagement < 0) {
    errors.propertyManagement = 'Property management cannot be negative';
  }

  if (inputs.utilities < 0) {
    errors.utilities = 'Utilities cannot be negative';
  }

  if (inputs.hoaFees < 0) {
    errors.hoaFees = 'HOA fees cannot be negative';
  }

  if (inputs.landscaping < 0) {
    errors.landscaping = 'Landscaping cannot be negative';
  }

  if (inputs.pestControl < 0) {
    errors.pestControl = 'Pest control cannot be negative';
  }

  if (inputs.advertising < 0) {
    errors.advertising = 'Advertising cannot be negative';
  }

  if (inputs.legalFees < 0) {
    errors.legalFees = 'Legal fees cannot be negative';
  }

  if (inputs.accountingFees < 0) {
    errors.accountingFees = 'Accounting fees cannot be negative';
  }

  if (inputs.otherExpenses < 0) {
    errors.otherExpenses = 'Other expenses cannot be negative';
  }

  // Financing Information validation
  if (inputs.closingCosts < 0) {
    errors.closingCosts = 'Closing costs cannot be negative';
  }

  if (inputs.points < 0) {
    errors.points = 'Points cannot be negative';
  }

  if (inputs.escrowAccount < 0) {
    errors.escrowAccount = 'Escrow account cannot be negative';
  }

  if (inputs.prepaidItems < 0) {
    errors.prepaidItems = 'Prepaid items cannot be negative';
  }

  // Market Information validation
  if (inputs.marketRent < 0) {
    errors.marketRent = 'Market rent cannot be negative';
  }

  if (inputs.marketVacancy < 0 || inputs.marketVacancy > 50) {
    errors.marketVacancy = 'Market vacancy must be between 0% and 50%';
  }

  if (inputs.marketExpenses < 0 || inputs.marketExpenses > 100) {
    errors.marketExpenses = 'Market expenses must be between 0% and 100%';
  }

  if (inputs.marketCapRate < 0 || inputs.marketCapRate > 20) {
    errors.marketCapRate = 'Market cap rate must be between 0% and 20%';
  }

  // Analysis Parameters validation
  if (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 30) {
    errors.analysisPeriod = 'Analysis period must be between 1 and 30 years';
  }

  if (inputs.inflationRate < -5 || inputs.inflationRate > 15) {
    errors.inflationRate = 'Inflation rate must be between -5% and 15%';
  }

  if (inputs.appreciationRate < -10 || inputs.appreciationRate > 20) {
    errors.appreciationRate = 'Appreciation rate must be between -10% and 20%';
  }

  if (inputs.taxRate < 0 || inputs.taxRate > 50) {
    errors.taxRate = 'Tax rate must be between 0% and 50%';
  }

  if (inputs.depreciationPeriod <= 0) {
    errors.depreciationPeriod = 'Depreciation period must be greater than 0';
  }

  // Additional Information validation
  if (inputs.personalUsePercentage < 0 || inputs.personalUsePercentage > 100) {
    errors.personalUsePercentage = 'Personal use percentage must be between 0% and 100%';
  }

  if (inputs.leaseTerm < 0) {
    errors.leaseTerm = 'Lease term cannot be negative';
  }

  if (inputs.rentEscalation < 0 || inputs.rentEscalation > 20) {
    errors.rentEscalation = 'Rent escalation must be between 0% and 20%';
  }

  // Reporting Preferences validation
  if (!['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Invalid currency';
  }

  if (!['currency', 'percentage', 'decimal'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Invalid display format';
  }

  // Business logic validations
  if (inputs.downPayment + inputs.loanAmount !== inputs.purchasePrice) {
    errors.downPayment = 'Down payment plus loan amount must equal purchase price';
  }

  if (inputs.monthlyRent > inputs.marketRent * 2) {
    errors.monthlyRent = 'Monthly rent seems unusually high compared to market rent';
  }

  if (inputs.vacancyRate > inputs.marketVacancy * 2) {
    errors.vacancyRate = 'Vacancy rate seems unusually high compared to market vacancy';
  }

  const totalOperatingExpenses = inputs.propertyTaxes + inputs.insurance + inputs.maintenance + 
                                 inputs.propertyManagement + inputs.utilities + inputs.hoaFees + 
                                 inputs.landscaping + inputs.pestControl + inputs.advertising + 
                                 inputs.legalFees + inputs.accountingFees + inputs.otherExpenses;
  const grossRentalIncome = inputs.monthlyRent * 12;
  
  if (totalOperatingExpenses > grossRentalIncome) {
    errors.propertyTaxes = 'Total operating expenses cannot exceed gross rental income';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateCashFlowOutputs(outputs: CashFlowOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate metrics
  if (outputs.metrics.monthlyCashFlow === undefined || isNaN(outputs.metrics.monthlyCashFlow)) {
    errors.monthlyCashFlow = 'Monthly cash flow must be a valid number';
  }

  if (outputs.metrics.annualCashFlow === undefined || isNaN(outputs.metrics.annualCashFlow)) {
    errors.annualCashFlow = 'Annual cash flow must be a valid number';
  }

  if (outputs.metrics.cashOnCashReturn < 0 || outputs.metrics.cashOnCashReturn > 100) {
    errors.cashOnCashReturn = 'Cash on cash return must be between 0% and 100%';
  }

  if (outputs.metrics.capRate < 0 || outputs.metrics.capRate > 20) {
    errors.capRate = 'Cap rate must be between 0% and 20%';
  }

  if (outputs.metrics.roi < -100 || outputs.metrics.roi > 1000) {
    errors.roi = 'ROI must be between -100% and 1000%';
  }

  if (outputs.metrics.grossRentalIncome < 0) {
    errors.grossRentalIncome = 'Gross rental income cannot be negative';
  }

  if (outputs.metrics.vacancyLoss < 0) {
    errors.vacancyLoss = 'Vacancy loss cannot be negative';
  }

  if (outputs.metrics.otherIncome < 0) {
    errors.otherIncome = 'Other income cannot be negative';
  }

  if (outputs.metrics.effectiveGrossIncome < 0) {
    errors.effectiveGrossIncome = 'Effective gross income cannot be negative';
  }

  if (outputs.metrics.totalOperatingExpenses < 0) {
    errors.totalOperatingExpenses = 'Total operating expenses cannot be negative';
  }

  if (outputs.metrics.netOperatingIncome < 0) {
    errors.netOperatingIncome = 'Net operating income cannot be negative';
  }

  if (outputs.metrics.debtService < 0) {
    errors.debtService = 'Debt service cannot be negative';
  }

  if (outputs.metrics.expenseRatio < 0 || outputs.metrics.expenseRatio > 100) {
    errors.expenseRatio = 'Expense ratio must be between 0% and 100%';
  }

  if (outputs.metrics.vacancyRisk < 0 || outputs.metrics.vacancyRisk > 100) {
    errors.vacancyRisk = 'Vacancy risk must be between 0% and 100%';
  }

  if (outputs.metrics.marketRisk < 0 || outputs.metrics.marketRisk > 10) {
    errors.marketRisk = 'Market risk must be between 0 and 10';
  }

  // Validate cash flow projections
  if (!outputs.cashFlowProjections || outputs.cashFlowProjections.length === 0) {
    errors.cashFlowProjections = 'Cash flow projections are required';
  } else {
    outputs.cashFlowProjections.forEach((projection, index) => {
      if (projection.year < 1) {
        errors[`cashFlowProjections[${index}].year`] = 'Year must be greater than 0';
      }
      if (projection.rentalIncome < 0) {
        errors[`cashFlowProjections[${index}].rentalIncome`] = 'Rental income cannot be negative';
      }
      if (projection.vacancyLoss < 0) {
        errors[`cashFlowProjections[${index}].vacancyLoss`] = 'Vacancy loss cannot be negative';
      }
      if (projection.otherIncome < 0) {
        errors[`cashFlowProjections[${index}].otherIncome`] = 'Other income cannot be negative';
      }
      if (projection.operatingExpenses < 0) {
        errors[`cashFlowProjections[${index}].operatingExpenses`] = 'Operating expenses cannot be negative';
      }
      if (projection.netOperatingIncome < 0) {
        errors[`cashFlowProjections[${index}].netOperatingIncome`] = 'Net operating income cannot be negative';
      }
      if (projection.debtService < 0) {
        errors[`cashFlowProjections[${index}].debtService`] = 'Debt service cannot be negative';
      }
    });
  }

  // Validate expense breakdown
  if (!outputs.expenseBreakdown || outputs.expenseBreakdown.length === 0) {
    errors.expenseBreakdown = 'Expense breakdown is required';
  } else {
    outputs.expenseBreakdown.forEach((expense, index) => {
      if (!expense.category || expense.category.trim().length === 0) {
        errors[`expenseBreakdown[${index}].category`] = 'Category is required';
      }
      if (expense.amount < 0) {
        errors[`expenseBreakdown[${index}].amount`] = 'Amount cannot be negative';
      }
      if (expense.percentage < 0 || expense.percentage > 100) {
        errors[`expenseBreakdown[${index}].percentage`] = 'Percentage must be between 0% and 100%';
      }
      if (!expense.description || expense.description.trim().length === 0) {
        errors[`expenseBreakdown[${index}].description`] = 'Description is required';
      }
      if (expense.annualGrowth < -20 || expense.annualGrowth > 30) {
        errors[`expenseBreakdown[${index}].annualGrowth`] = 'Annual growth must be between -20% and 30%';
      }
    });
  }

  // Validate investment analysis
  if (!outputs.investmentAnalysis) {
    errors.investmentAnalysis = 'Investment analysis is required';
  } else {
    if (outputs.investmentAnalysis.cashOnCashReturn < 0 || outputs.investmentAnalysis.cashOnCashReturn > 100) {
      errors.investmentAnalysisCashOnCashReturn = 'Cash on cash return must be between 0% and 100%';
    }
    if (outputs.investmentAnalysis.totalReturn < -100 || outputs.investmentAnalysis.totalReturn > 1000) {
      errors.investmentAnalysisTotalReturn = 'Total return must be between -100% and 1000%';
    }
    if (outputs.investmentAnalysis.breakEvenCapRate < 0 || outputs.investmentAnalysis.breakEvenCapRate > 20) {
      errors.investmentAnalysisBreakEvenCapRate = 'Break-even cap rate must be between 0% and 20%';
    }
    if (!['low', 'medium', 'high'].includes(outputs.investmentAnalysis.riskLevel)) {
      errors.investmentAnalysisRiskLevel = 'Risk level must be low, medium, or high';
    }
    if (!['A', 'B', 'C', 'D'].includes(outputs.investmentAnalysis.investmentGrade)) {
      errors.investmentAnalysisInvestmentGrade = 'Investment grade must be A, B, C, or D';
    }
    if (!outputs.investmentAnalysis.recommendations || outputs.investmentAnalysis.recommendations.length === 0) {
      errors.investmentAnalysisRecommendations = 'Recommendations are required';
    }
    if (!outputs.investmentAnalysis.riskFactors || outputs.investmentAnalysis.riskFactors.length === 0) {
      errors.investmentAnalysisRiskFactors = 'Risk factors are required';
    }
  }

  // Validate market analysis
  if (!outputs.marketAnalysis) {
    errors.marketAnalysis = 'Market analysis is required';
  } else {
    if (outputs.marketAnalysis.marketCapRate < 0 || outputs.marketAnalysis.marketCapRate > 20) {
      errors.marketAnalysisMarketCapRate = 'Market cap rate must be between 0% and 20%';
    }
    if (outputs.marketAnalysis.comparableCount < 0) {
      errors.marketAnalysisComparableCount = 'Comparable count cannot be negative';
    }
    if (!['increasing', 'decreasing', 'stable'].includes(outputs.marketAnalysis.marketTrend)) {
      errors.marketAnalysisMarketTrend = 'Market trend must be increasing, decreasing, or stable';
    }
    if (!['above', 'below', 'at'].includes(outputs.marketAnalysis.marketPosition)) {
      errors.marketAnalysisMarketPosition = 'Market position must be above, below, or at';
    }
    if (outputs.marketAnalysis.capRateSpread < -10 || outputs.marketAnalysis.capRateSpread > 10) {
      errors.marketAnalysisCapRateSpread = 'Cap rate spread must be between -10% and 10%';
    }
    if (!['low', 'medium', 'high'].includes(outputs.marketAnalysis.marketRisk)) {
      errors.marketAnalysisMarketRisk = 'Market risk must be low, medium, or high';
    }
    if (!outputs.marketAnalysis.recommendations || outputs.marketAnalysis.recommendations.length === 0) {
      errors.marketAnalysisRecommendations = 'Market recommendations are required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}