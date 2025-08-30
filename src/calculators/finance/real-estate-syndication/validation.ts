import { RealEstateSyndicationInputs, RealEstateSyndicationOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateRealEstateSyndicationInputs(inputs: RealEstateSyndicationInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Project Information validation
  if (!inputs.projectName || inputs.projectName.trim().length === 0) {
    errors.projectName = 'Project name is required';
  } else if (inputs.projectName.length > 100) {
    errors.projectName = 'Project name must be 100 characters or less';
  }

  if (!['residential', 'commercial', 'mixed-use', 'industrial', 'retail', 'office', 'hotel', 'multifamily', 'single-family', 'land-development'].includes(inputs.projectType)) {
    errors.projectType = 'Invalid project type';
  }

  if (!inputs.projectAddress || inputs.projectAddress.trim().length === 0) {
    errors.projectAddress = 'Project address is required';
  }

  if (!inputs.acquisitionDate) {
    errors.acquisitionDate = 'Acquisition date is required';
  } else {
    const acquisitionDate = new Date(inputs.acquisitionDate);
    const today = new Date();
    if (acquisitionDate > today) {
      errors.acquisitionDate = 'Acquisition date cannot be in the future';
    }
  }

  if (inputs.projectedHoldPeriod < 1 || inputs.projectedHoldPeriod > 30) {
    errors.projectedHoldPeriod = 'Projected hold period must be between 1 and 30 years';
  }

  if (!['sale', 'refinance', '1031-exchange', 'hold', 'partial-sale'].includes(inputs.exitStrategy)) {
    errors.exitStrategy = 'Invalid exit strategy';
  }

  // Property Details validation
  if (inputs.totalAcquisitionCost <= 0) {
    errors.totalAcquisitionCost = 'Total acquisition cost must be greater than 0';
  }

  if (inputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be greater than 0';
  }

  if (inputs.landValue < 0) {
    errors.landValue = 'Land value cannot be negative';
  }

  if (inputs.buildingValue < 0) {
    errors.buildingValue = 'Building value cannot be negative';
  }

  // Validate property value components
  if (inputs.landValue + inputs.buildingValue > inputs.propertyValue * 1.1) {
    errors.buildingValue = 'Land value + Building value cannot exceed property value by more than 10%';
  }

  if (inputs.squareFootage <= 0) {
    errors.squareFootage = 'Square footage must be greater than 0';
  }

  if (inputs.numberOfUnits <= 0) {
    errors.numberOfUnits = 'Number of units must be greater than 0';
  }

  if (inputs.occupancyRate < 0 || inputs.occupancyRate > 100) {
    errors.occupancyRate = 'Occupancy rate must be between 0 and 100%';
  }

  if (inputs.currentRentRoll <= 0) {
    errors.currentRentRoll = 'Current rent roll must be greater than 0';
  }

  if (inputs.projectedRentGrowth < -10 || inputs.projectedRentGrowth > 20) {
    errors.projectedRentGrowth = 'Projected rent growth must be between -10% and 20%';
  }

  if (inputs.operatingExpenses < 0) {
    errors.operatingExpenses = 'Operating expenses cannot be negative';
  }

  if (inputs.operatingExpenseRatio < 0 || inputs.operatingExpenseRatio > 100) {
    errors.operatingExpenseRatio = 'Operating expense ratio must be between 0 and 100%';
  }

  // Financing Structure validation
  if (inputs.totalEquityNeeded <= 0) {
    errors.totalEquityNeeded = 'Total equity needed must be greater than 0';
  }

  if (inputs.sponsorEquity < 0) {
    errors.sponsorEquity = 'Sponsor equity cannot be negative';
  }

  if (inputs.investorEquity < 0) {
    errors.investorEquity = 'Investor equity cannot be negative';
  }

  if (inputs.debtFinancing < 0) {
    errors.debtFinancing = 'Debt financing cannot be negative';
  }

  // Validate equity structure
  if (Math.abs((inputs.sponsorEquity + inputs.investorEquity) - inputs.totalEquityNeeded) > 1) {
    errors.sponsorEquity = 'Sponsor equity + Investor equity must equal Total equity needed';
  }

  // Validate financing structure
  if (Math.abs((inputs.totalEquityNeeded + inputs.debtFinancing) - inputs.totalAcquisitionCost) > 1) {
    errors.debtFinancing = 'Total equity + Debt financing must equal Total acquisition cost';
  }

  if (!['conventional', 'fha', 'usda', 'va', 'hard-money', 'bridge', 'construction', 'permanent'].includes(inputs.loanType)) {
    errors.loanType = 'Invalid loan type';
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 25) {
    errors.interestRate = 'Interest rate must be between 0% and 25%';
  }

  if (inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    errors.loanTerm = 'Loan term must be between 1 and 50 years';
  }

  if (inputs.amortizationPeriod < 1 || inputs.amortizationPeriod > 50) {
    errors.amortizationPeriod = 'Amortization period must be between 1 and 50 years';
  }

  if (inputs.loanPoints < 0 || inputs.loanPoints > 10) {
    errors.loanPoints = 'Loan points must be between 0% and 10%';
  }

  if (inputs.loanFees < 0) {
    errors.loanFees = 'Loan fees cannot be negative';
  }

  // Syndication Structure validation
  if (!['506(b)', '506(c)', 'crowdfunding', 'private-placement', 'reit', 'direct-investment'].includes(inputs.syndicationType)) {
    errors.syndicationType = 'Invalid syndication type';
  }

  if (inputs.minimumInvestment <= 0) {
    errors.minimumInvestment = 'Minimum investment must be greater than 0';
  }

  if (inputs.maximumInvestors < 1 || inputs.maximumInvestors > 2000) {
    errors.maximumInvestors = 'Maximum investors must be between 1 and 2000';
  }

  if (inputs.sponsorPromote < 0 || inputs.sponsorPromote > 50) {
    errors.sponsorPromote = 'Sponsor promote must be between 0% and 50%';
  }

  if (inputs.managementFee < 0 || inputs.managementFee > 20) {
    errors.managementFee = 'Management fee must be between 0% and 20%';
  }

  if (inputs.acquisitionFee < 0 || inputs.acquisitionFee > 10) {
    errors.acquisitionFee = 'Acquisition fee must be between 0% and 10%';
  }

  if (inputs.dispositionFee < 0 || inputs.dispositionFee > 10) {
    errors.dispositionFee = 'Disposition fee must be between 0% and 10%';
  }

  if (inputs.refinanceFee < 0 || inputs.refinanceFee > 5) {
    errors.refinanceFee = 'Refinance fee must be between 0% and 5%';
  }

  // Waterfall Structure validation
  if (inputs.preferredReturn < 0 || inputs.preferredReturn > 20) {
    errors.preferredReturn = 'Preferred return must be between 0% and 20%';
  }

  if (inputs.catchUpPercentage < 0 || inputs.catchUpPercentage > 100) {
    errors.catchUpPercentage = 'Catch-up percentage must be between 0% and 100%';
  }

  if (inputs.promoteTier1 < 0 || inputs.promoteTier1 > 50) {
    errors.promoteTier1 = 'First promote tier must be between 0% and 50%';
  }

  if (inputs.promoteTier2 < 0 || inputs.promoteTier2 > 50) {
    errors.promoteTier2 = 'Second promote tier must be between 0% and 50%';
  }

  if (inputs.promoteTier3 < 0 || inputs.promoteTier3 > 50) {
    errors.promoteTier3 = 'Third promote tier must be between 0% and 50%';
  }

  if (inputs.tier1Threshold < 0 || inputs.tier1Threshold > 30) {
    errors.tier1Threshold = 'First tier threshold must be between 0% and 30%';
  }

  if (inputs.tier2Threshold < 0 || inputs.tier2Threshold > 30) {
    errors.tier2Threshold = 'Second tier threshold must be between 0% and 30%';
  }

  if (inputs.tier3Threshold < 0 || inputs.tier3Threshold > 30) {
    errors.tier3Threshold = 'Third tier threshold must be between 0% and 30%';
  }

  // Validate tier thresholds are in ascending order
  if (inputs.tier1Threshold >= inputs.tier2Threshold) {
    errors.tier2Threshold = 'Second tier threshold must be higher than first tier threshold';
  }

  if (inputs.tier2Threshold >= inputs.tier3Threshold) {
    errors.tier3Threshold = 'Third tier threshold must be higher than second tier threshold';
  }

  // Operating Assumptions validation
  if (inputs.grossRentMultiplier < 1 || inputs.grossRentMultiplier > 50) {
    errors.grossRentMultiplier = 'Gross rent multiplier must be between 1 and 50';
  }

  if (inputs.capRate < 1 || inputs.capRate > 20) {
    errors.capRate = 'Cap rate must be between 1% and 20%';
  }

  if (inputs.exitCapRate < 1 || inputs.exitCapRate > 20) {
    errors.exitCapRate = 'Exit cap rate must be between 1% and 20%';
  }

  if (inputs.appreciationRate < -10 || inputs.appreciationRate > 20) {
    errors.appreciationRate = 'Appreciation rate must be between -10% and 20%';
  }

  if (inputs.inflationRate < -5 || inputs.inflationRate > 15) {
    errors.inflationRate = 'Inflation rate must be between -5% and 15%';
  }

  if (inputs.vacancyRate < 0 || inputs.vacancyRate > 50) {
    errors.vacancyRate = 'Vacancy rate must be between 0% and 50%';
  }

  if (inputs.collectionLossRate < 0 || inputs.collectionLossRate > 20) {
    errors.collectionLossRate = 'Collection loss rate must be between 0% and 20%';
  }

  if (inputs.maintenanceReserve < 0 || inputs.maintenanceReserve > 1000) {
    errors.maintenanceReserve = 'Maintenance reserve must be between $0 and $1,000 per unit';
  }

  if (inputs.capitalExpenditureReserve < 0 || inputs.capitalExpenditureReserve > 20) {
    errors.capitalExpenditureReserve = 'Capital expenditure reserve must be between 0% and 20%';
  }

  // Tax Information validation
  if (inputs.taxRate < 0 || inputs.taxRate > 50) {
    errors.taxRate = 'Tax rate must be between 0% and 50%';
  }

  if (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 15) {
    errors.stateTaxRate = 'State tax rate must be between 0% and 15%';
  }

  if (inputs.localTaxRate < 0 || inputs.localTaxRate > 10) {
    errors.localTaxRate = 'Local tax rate must be between 0% and 10%';
  }

  // Validate combined tax rate
  const combinedTaxRate = inputs.taxRate + inputs.stateTaxRate + inputs.localTaxRate;
  if (combinedTaxRate > 60) {
    errors.taxRate = 'Combined tax rate cannot exceed 60%';
  }

  if (!['straight-line', 'declining-balance', 'sum-of-years-digits', 'units-of-production'].includes(inputs.depreciationMethod)) {
    errors.depreciationMethod = 'Invalid depreciation method';
  }

  if (inputs.recoveryPeriod < 1 || inputs.recoveryPeriod > 50) {
    errors.recoveryPeriod = 'Recovery period must be between 1 and 50 years';
  }

  if (inputs.bonusDepreciationPercentage < 0 || inputs.bonusDepreciationPercentage > 100) {
    errors.bonusDepreciationPercentage = 'Bonus depreciation percentage must be between 0% and 100%';
  }

  // Exit Assumptions validation
  if (inputs.exitYear < 1 || inputs.exitYear > 30) {
    errors.exitYear = 'Exit year must be between 1 and 30';
  }

  if (inputs.exitValue <= 0) {
    errors.exitValue = 'Exit value must be greater than 0';
  }

  if (inputs.sellingCosts < 0 || inputs.sellingCosts > 20) {
    errors.sellingCosts = 'Selling costs must be between 0% and 20%';
  }

  if (inputs.refinanceAmount < 0) {
    errors.refinanceAmount = 'Refinance amount cannot be negative';
  }

  if (inputs.refinanceCosts < 0 || inputs.refinanceCosts > 10) {
    errors.refinanceCosts = 'Refinance costs must be between 0% and 10%';
  }

  // Investor Information validation
  if (inputs.investorCount < 1 || inputs.investorCount > 2000) {
    errors.investorCount = 'Investor count must be between 1 and 2000';
  }

  if (inputs.averageInvestment <= 0) {
    errors.averageInvestment = 'Average investment must be greater than 0';
  }

  // Compliance & Legal validation
  if (inputs.legalFees < 0) {
    errors.legalFees = 'Legal fees cannot be negative';
  }

  if (inputs.accountingFees < 0) {
    errors.accountingFees = 'Accounting fees cannot be negative';
  }

  if (inputs.complianceFees < 0) {
    errors.complianceFees = 'Compliance fees cannot be negative';
  }

  // Reporting Preferences validation
  if (!['detailed', 'summary', 'executive'].includes(inputs.reportFormat)) {
    errors.reportFormat = 'Invalid report format';
  }

  if (!['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Invalid currency';
  }

  if (!['currency', 'percentage', 'decimal'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Invalid display format';
  }

  // Business logic validations
  if (inputs.currentRentRoll <= inputs.operatingExpenses) {
    errors.operatingExpenses = 'Operating expenses cannot exceed current rent roll';
  }

  if (inputs.minimumInvestment > inputs.investorEquity) {
    errors.minimumInvestment = 'Minimum investment cannot exceed total investor equity';
  }

  if (inputs.investorCount > inputs.maximumInvestors) {
    errors.investorCount = 'Investor count cannot exceed maximum investors';
  }

  if (inputs.exitYear > inputs.projectedHoldPeriod) {
    errors.exitYear = 'Exit year cannot exceed projected hold period';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateRealEstateSyndicationOutputs(outputs: RealEstateSyndicationOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate metrics
  if (outputs.metrics.projectedIRR < -50 || outputs.metrics.projectedIRR > 100) {
    errors.projectedIRR = 'Projected IRR must be between -50% and 100%';
  }

  if (outputs.metrics.projectedEquityMultiple < 0 || outputs.metrics.projectedEquityMultiple > 10) {
    errors.projectedEquityMultiple = 'Projected equity multiple must be between 0 and 10';
  }

  if (outputs.metrics.cashOnCashReturn < -20 || outputs.metrics.cashOnCashReturn > 50) {
    errors.cashOnCashReturn = 'Cash-on-cash return must be between -20% and 50%';
  }

  if (outputs.metrics.capRate < 0 || outputs.metrics.capRate > 30) {
    errors.capRate = 'Cap rate must be between 0% and 30%';
  }

  if (outputs.metrics.loanToValueRatio < 0 || outputs.metrics.loanToValueRatio > 100) {
    errors.loanToValueRatio = 'Loan-to-value ratio must be between 0% and 100%';
  }

  if (outputs.metrics.netOperatingIncome < 0) {
    errors.netOperatingIncome = 'Net operating income cannot be negative';
  }

  if (outputs.metrics.debtService < 0) {
    errors.debtService = 'Debt service cannot be negative';
  }

  // Validate cash flow projections
  if (!outputs.cashFlowProjections || outputs.cashFlowProjections.length === 0) {
    errors.cashFlowProjections = 'Cash flow projections are required';
  } else {
    outputs.cashFlowProjections.forEach((projection, index) => {
      if (projection.year < 1) {
        errors[`cashFlowProjections[${index}].year`] = 'Year must be greater than 0';
      }
      if (projection.grossIncome < 0) {
        errors[`cashFlowProjections[${index}].grossIncome`] = 'Gross income cannot be negative';
      }
      if (projection.netOperatingIncome < 0) {
        errors[`cashFlowProjections[${index}].netOperatingIncome`] = 'Net operating income cannot be negative';
      }
      if (projection.debtService < 0) {
        errors[`cashFlowProjections[${index}].debtService`] = 'Debt service cannot be negative';
      }
    });
  }

  // Validate waterfall calculations
  if (!outputs.waterfallCalculations || outputs.waterfallCalculations.length === 0) {
    errors.waterfallCalculations = 'Waterfall calculations are required';
  } else {
    outputs.waterfallCalculations.forEach((waterfall, index) => {
      if (waterfall.irrThreshold < 0) {
        errors[`waterfallCalculations[${index}].irrThreshold`] = 'IRR threshold cannot be negative';
      }
      if (waterfall.promotePercentage < 0 || waterfall.promotePercentage > 100) {
        errors[`waterfallCalculations[${index}].promotePercentage`] = 'Promote percentage must be between 0% and 100%';
      }
      if (waterfall.investorShare < 0 || waterfall.investorShare > 100) {
        errors[`waterfallCalculations[${index}].investorShare`] = 'Investor share must be between 0% and 100%';
      }
      if (waterfall.sponsorShare < 0 || waterfall.sponsorShare > 100) {
        errors[`waterfallCalculations[${index}].sponsorShare`] = 'Sponsor share must be between 0% and 100%';
      }
    });
  }

  // Validate analysis
  if (!outputs.analysis) {
    errors.analysis = 'Analysis is required';
  } else {
    if (!outputs.analysis.riskAssessment) {
      errors.riskAssessment = 'Risk assessment is required';
    } else {
      if (!['low', 'medium', 'high'].includes(outputs.analysis.riskAssessment.overallRisk)) {
        errors.overallRisk = 'Overall risk must be low, medium, or high';
      }
      if (outputs.analysis.riskAssessment.riskScore < 0 || outputs.analysis.riskAssessment.riskScore > 100) {
        errors.riskScore = 'Risk score must be between 0 and 100';
      }
    }

    if (!outputs.analysis.keyBenefits || outputs.analysis.keyBenefits.length === 0) {
      errors.keyBenefits = 'Key benefits are required';
    }

    if (!outputs.analysis.keyRisks || outputs.analysis.keyRisks.length === 0) {
      errors.keyRisks = 'Key risks are required';
    }

    if (!outputs.analysis.recommendations || outputs.analysis.recommendations.length === 0) {
      errors.recommendations = 'Recommendations are required';
    }
  }

  // Validate investor summary
  if (!outputs.investorSummary) {
    errors.investorSummary = 'Investor summary is required';
  } else {
    if (outputs.investorSummary.totalInvestors < 1) {
      errors.totalInvestors = 'Total investors must be greater than 0';
    }
    if (outputs.investorSummary.averageInvestment <= 0) {
      errors.averageInvestment = 'Average investment must be greater than 0';
    }
    if (outputs.investorSummary.projectedIRR < -50 || outputs.investorSummary.projectedIRR > 100) {
      errors.investorProjectedIRR = 'Investor projected IRR must be between -50% and 100%';
    }
  }

  // Validate sponsor summary
  if (!outputs.sponsorSummary) {
    errors.sponsorSummary = 'Sponsor summary is required';
  } else {
    if (outputs.sponsorSummary.equityContribution < 0) {
      errors.equityContribution = 'Equity contribution cannot be negative';
    }
    if (outputs.sponsorSummary.promoteValue < 0) {
      errors.promoteValue = 'Promote value cannot be negative';
    }
    if (outputs.sponsorSummary.projectedIRR < -50 || outputs.sponsorSummary.projectedIRR > 100) {
      errors.sponsorProjectedIRR = 'Sponsor projected IRR must be between -50% and 100%';
    }
    if (outputs.sponsorSummary.totalCompensation < 0) {
      errors.totalCompensation = 'Total compensation cannot be negative';
    }
  }

  // Validate tax analysis
  if (!outputs.taxAnalysis) {
    errors.taxAnalysis = 'Tax analysis is required';
  } else {
    if (outputs.taxAnalysis.depreciationExpense < 0) {
      errors.depreciationExpense = 'Depreciation expense cannot be negative';
    }
    if (outputs.taxAnalysis.taxLiability < 0) {
      errors.taxLiability = 'Tax liability cannot be negative';
    }
    if (outputs.taxAnalysis.effectiveTaxRate < 0 || outputs.taxAnalysis.effectiveTaxRate > 100) {
      errors.effectiveTaxRate = 'Effective tax rate must be between 0% and 100%';
    }
  }

  // Validate sensitivity analysis
  if (!outputs.sensitivityAnalysis) {
    errors.sensitivityAnalysis = 'Sensitivity analysis is required';
  } else {
    if (!outputs.sensitivityAnalysis.scenarios || outputs.sensitivityAnalysis.scenarios.length === 0) {
      errors.sensitivityScenarios = 'Sensitivity scenarios are required';
    }
    if (!outputs.sensitivityAnalysis.keyVariables || outputs.sensitivityAnalysis.keyVariables.length === 0) {
      errors.keyVariables = 'Key variables are required';
    }
  }

  // Validate stress test results
  if (!outputs.stressTestResults || outputs.stressTestResults.length === 0) {
    errors.stressTestResults = 'Stress test results are required';
  } else {
    outputs.stressTestResults.forEach((stressTest, index) => {
      if (!stressTest.testName || stressTest.testName.trim().length === 0) {
        errors[`stressTestResults[${index}].testName`] = 'Test name is required';
      }
      if (!stressTest.scenario || stressTest.scenario.trim().length === 0) {
        errors[`stressTestResults[${index}].scenario`] = 'Scenario is required';
      }
      if (!['Low', 'Medium', 'High'].includes(stressTest.impact)) {
        errors[`stressTestResults[${index}].impact`] = 'Impact must be Low, Medium, or High';
      }
      if (!stressTest.recommendation || stressTest.recommendation.trim().length === 0) {
        errors[`stressTestResults[${index}].recommendation`] = 'Recommendation is required';
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}