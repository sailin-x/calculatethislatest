import { BudgetOptimizationInputs } from './types';

export function quickValidateTotalBudget(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1000) return 'Total budget must be at least $1,000';
  if (value > 1000000000) return 'Total budget cannot exceed $1 billion';
  
  if (allInputs?.expenses) {
    const totalExpenses = calculateTotalExpenses(allInputs.expenses);
    if (value < totalExpenses * 0.8) {
      return 'Total budget should be at least 80% of total expenses';
    }
  }
  
  return null;
}

export function quickValidateBudgetPeriod(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Budget period must be at least 1 month';
  if (value > 60) return 'Budget period cannot exceed 60 months';
  return null;
}

export function quickValidateBudgetYear(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 2020) return 'Budget year must be 2020 or later';
  if (value > 2030) return 'Budget year cannot exceed 2030';
  return null;
}

export function quickValidateTotalRevenue(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1000) return 'Total revenue must be at least $1,000';
  if (value > 1000000000) return 'Total revenue cannot exceed $1 billion';
  
  if (allInputs?.budgetInfo?.totalBudget) {
    const totalBudget = allInputs.budgetInfo.totalBudget;
    if (value < totalBudget * 0.5) {
      return 'Total revenue should be at least 50% of total budget';
    }
  }
  
  return null;
}

export function quickValidateRevenueGrowth(value: number, allInputs?: Record<string, any>): string | null {
  if (value < -50) return 'Revenue growth cannot be less than -50%';
  if (value > 200) return 'Revenue growth cannot exceed 200%';
  return null;
}

export function quickValidateRevenueVolatility(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Revenue volatility cannot be negative';
  if (value > 100) return 'Revenue volatility cannot exceed 100%';
  return null;
}

export function quickValidateTargetSavings(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Target savings cannot be negative';
  if (value > 100) return 'Target savings cannot exceed 100%';
  
  if (allInputs?.budgetInfo?.totalBudget) {
    const totalBudget = allInputs.budgetInfo.totalBudget;
    if (value > totalBudget * 0.3) {
      return 'Target savings should not exceed 30% of total budget';
    }
  }
  
  return null;
}

export function quickValidateTargetROI(value: number, allInputs?: Record<string, any>): string | null {
  if (value < -100) return 'Target ROI cannot be less than -100%';
  if (value > 1000) return 'Target ROI cannot exceed 1000%';
  return null;
}

export function quickValidateTargetEfficiency(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Target efficiency cannot be negative';
  if (value > 100) return 'Target efficiency cannot exceed 100%';
  
  if (allInputs?.performanceMetrics?.currentEfficiency) {
    const currentEfficiency = allInputs.performanceMetrics.currentEfficiency;
    if (value < currentEfficiency) {
      return 'Target efficiency should be achievable based on current efficiency';
    }
  }
  
  return null;
}

export function quickValidateRiskTolerance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Risk tolerance must be at least 1';
  if (value > 10) return 'Risk tolerance cannot exceed 10';
  
  if (allInputs?.objectives?.primaryObjective) {
    const primaryObjective = allInputs.objectives.primaryObjective;
    if (primaryObjective === 'risk-minimization' && value > 5) {
      return 'Risk tolerance should be low (1-5) for risk-minimization objective';
    }
    if (primaryObjective === 'profit-maximization' && value < 6) {
      return 'Risk tolerance should be higher (6-10) for profit-maximization objective';
    }
  }
  
  return null;
}

export function quickValidateCurrentEfficiency(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Current efficiency cannot be negative';
  if (value > 100) return 'Current efficiency cannot exceed 100%';
  
  if (allInputs?.objectives?.targetEfficiency) {
    const targetEfficiency = allInputs.objectives.targetEfficiency;
    if (value > targetEfficiency) {
      return 'Current efficiency should not exceed target efficiency';
    }
  }
  
  return null;
}

export function quickValidateCostEffectiveness(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Cost effectiveness cannot be negative';
  if (value > 100) return 'Cost effectiveness cannot exceed 100%';
  return null;
}

export function quickValidateRevenueImpact(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Revenue impact cannot be negative';
  if (value > 100) return 'Revenue impact cannot exceed 100%';
  return null;
}

export function quickValidateQualityMetrics(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Quality metrics cannot be negative';
  if (value > 100) return 'Quality metrics cannot exceed 100%';
  return null;
}

export function quickValidateCustomerSatisfaction(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Customer satisfaction cannot be negative';
  if (value > 100) return 'Customer satisfaction cannot exceed 100%';
  return null;
}

export function quickValidateEmployeeSatisfaction(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Employee satisfaction cannot be negative';
  if (value > 100) return 'Employee satisfaction cannot exceed 100%';
  return null;
}

export function quickValidateInflationRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < -10) return 'Inflation rate cannot be less than -10%';
  if (value > 50) return 'Inflation rate cannot exceed 50%';
  
  if (allInputs?.marketConditions?.interestRate) {
    const interestRate = allInputs.marketConditions.interestRate;
    if (value > interestRate) {
      return 'Inflation rate should not exceed interest rate';
    }
  }
  
  return null;
}

export function quickValidateInterestRate(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Interest rate cannot be negative';
  if (value > 30) return 'Interest rate cannot exceed 30%';
  return null;
}

export function quickValidateMarketVolatility(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Market volatility cannot be negative';
  if (value > 100) return 'Market volatility cannot exceed 100%';
  return null;
}

export function quickValidateCompetitivePressure(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Competitive pressure must be at least 1';
  if (value > 10) return 'Competitive pressure cannot exceed 10';
  return null;
}

export function quickValidateRevenueRisk(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Revenue risk must be at least 1';
  if (value > 10) return 'Revenue risk cannot exceed 10';
  
  if (allInputs?.objectives?.riskTolerance) {
    const riskTolerance = allInputs.objectives.riskTolerance;
    if (riskTolerance < 5 && value > 7) {
      return 'Revenue risk should be low for conservative risk tolerance';
    }
  }
  
  return null;
}

export function quickValidateCostRisk(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Cost risk must be at least 1';
  if (value > 10) return 'Cost risk cannot exceed 10';
  return null;
}

export function quickValidateOperationalRisk(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Operational risk must be at least 1';
  if (value > 10) return 'Operational risk cannot exceed 10';
  return null;
}

export function quickValidateMarketRisk(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Market risk must be at least 1';
  if (value > 10) return 'Market risk cannot exceed 10';
  return null;
}

export function quickValidateRegulatoryRisk(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Regulatory risk must be at least 1';
  if (value > 10) return 'Regulatory risk cannot exceed 10';
  return null;
}

export function quickValidateTechnologyRisk(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 1) return 'Technology risk must be at least 1';
  if (value > 10) return 'Technology risk cannot exceed 10';
  return null;
}

// Personnel expense validations
export function quickValidateSalaries(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Salaries cannot be negative';
  if (value > 100000000) return 'Salaries cannot exceed $100 million';
  return null;
}

export function quickValidateBenefits(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Benefits cannot be negative';
  if (value > 50000000) return 'Benefits cannot exceed $50 million';
  return null;
}

export function quickValidateTraining(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Training cannot be negative';
  if (value > 10000000) return 'Training cannot exceed $10 million';
  return null;
}

export function quickValidateRecruitment(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Recruitment cannot be negative';
  if (value > 5000000) return 'Recruitment cannot exceed $5 million';
  return null;
}

export function quickValidateOvertime(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Overtime cannot be negative';
  if (value > 20000000) return 'Overtime cannot exceed $20 million';
  return null;
}

export function quickValidateContractors(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Contractors cannot be negative';
  if (value > 30000000) return 'Contractors cannot exceed $30 million';
  return null;
}

// Operations expense validations
export function quickValidateRent(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Rent cannot be negative';
  if (value > 50000000) return 'Rent cannot exceed $50 million';
  return null;
}

export function quickValidateUtilities(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Utilities cannot be negative';
  if (value > 20000000) return 'Utilities cannot exceed $20 million';
  return null;
}

export function quickValidateMaintenance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Maintenance cannot be negative';
  if (value > 15000000) return 'Maintenance cannot exceed $15 million';
  return null;
}

export function quickValidateSupplies(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Supplies cannot be negative';
  if (value > 10000000) return 'Supplies cannot exceed $10 million';
  return null;
}

export function quickValidateEquipment(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Equipment cannot be negative';
  if (value > 25000000) return 'Equipment cannot exceed $25 million';
  return null;
}

export function quickValidateInsurance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Insurance cannot be negative';
  if (value > 10000000) return 'Insurance cannot exceed $10 million';
  return null;
}

// Marketing expense validations
export function quickValidateAdvertising(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Advertising cannot be negative';
  if (value > 50000000) return 'Advertising cannot exceed $50 million';
  return null;
}

export function quickValidatePromotions(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Promotions cannot be negative';
  if (value > 20000000) return 'Promotions cannot exceed $20 million';
  return null;
}

export function quickValidateEvents(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Events cannot be negative';
  if (value > 15000000) return 'Events cannot exceed $15 million';
  return null;
}

export function quickValidateDigitalMarketing(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Digital marketing cannot be negative';
  if (value > 30000000) return 'Digital marketing cannot exceed $30 million';
  return null;
}

export function quickValidatePublicRelations(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Public relations cannot be negative';
  if (value > 10000000) return 'Public relations cannot exceed $10 million';
  return null;
}

export function quickValidateMarketResearch(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Market research cannot be negative';
  if (value > 8000000) return 'Market research cannot exceed $8 million';
  return null;
}

// Technology expense validations
export function quickValidateSoftware(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Software cannot be negative';
  if (value > 40000000) return 'Software cannot exceed $40 million';
  return null;
}

export function quickValidateHardware(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Hardware cannot be negative';
  if (value > 30000000) return 'Hardware cannot exceed $30 million';
  return null;
}

export function quickValidateITservices(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'IT services cannot be negative';
  if (value > 25000000) return 'IT services cannot exceed $25 million';
  return null;
}

export function quickValidateCybersecurity(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Cybersecurity cannot be negative';
  if (value > 15000000) return 'Cybersecurity cannot exceed $15 million';
  return null;
}

export function quickValidateDataStorage(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Data storage cannot be negative';
  if (value > 12000000) return 'Data storage cannot exceed $12 million';
  return null;
}

export function quickValidateSystemMaintenance(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'System maintenance cannot be negative';
  if (value > 18000000) return 'System maintenance cannot exceed $18 million';
  return null;
}

// Sales expense validations
export function quickValidateCommissions(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Commissions cannot be negative';
  if (value > 40000000) return 'Commissions cannot exceed $40 million';
  return null;
}

export function quickValidateTravel(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Travel cannot be negative';
  if (value > 15000000) return 'Travel cannot exceed $15 million';
  return null;
}

export function quickValidateEntertainment(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Entertainment cannot be negative';
  if (value > 8000000) return 'Entertainment cannot exceed $8 million';
  return null;
}

export function quickValidateSalesTools(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Sales tools cannot be negative';
  if (value > 12000000) return 'Sales tools cannot exceed $12 million';
  return null;
}

export function quickValidateLeadGeneration(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Lead generation cannot be negative';
  if (value > 20000000) return 'Lead generation cannot exceed $20 million';
  return null;
}

export function quickValidateCustomerSupport(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Customer support cannot be negative';
  if (value > 18000000) return 'Customer support cannot exceed $18 million';
  return null;
}

// Administration expense validations
export function quickValidateLegal(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Legal cannot be negative';
  if (value > 15000000) return 'Legal cannot exceed $15 million';
  return null;
}

export function quickValidateAccounting(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Accounting cannot be negative';
  if (value > 12000000) return 'Accounting cannot exceed $12 million';
  return null;
}

export function quickValidateConsulting(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Consulting cannot be negative';
  if (value > 20000000) return 'Consulting cannot exceed $20 million';
  return null;
}

export function quickValidateOfficeSupplies(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Office supplies cannot be negative';
  if (value > 5000000) return 'Office supplies cannot exceed $5 million';
  return null;
}

export function quickValidateCommunication(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Communication cannot be negative';
  if (value > 8000000) return 'Communication cannot exceed $8 million';
  return null;
}

export function quickValidateMiscellaneous(value: number, allInputs?: Record<string, any>): string | null {
  if (value < 0) return 'Miscellaneous cannot be negative';
  if (value > 10000000) return 'Miscellaneous cannot exceed $10 million';
  return null;
}

// Helper function to calculate total expenses
function calculateTotalExpenses(expenses: any): number {
  const personnel = Object.values(expenses.personnel || {}).reduce((sum: number, val: any) => sum + (val || 0), 0);
  const operations = Object.values(expenses.operations || {}).reduce((sum: number, val: any) => sum + (val || 0), 0);
  const marketing = Object.values(expenses.marketing || {}).reduce((sum: number, val: any) => sum + (val || 0), 0);
  const technology = Object.values(expenses.technology || {}).reduce((sum: number, val: any) => sum + (val || 0), 0);
  const sales = Object.values(expenses.sales || {}).reduce((sum: number, val: any) => sum + (val || 0), 0);
  const administration = Object.values(expenses.administration || {}).reduce((sum: number, val: any) => sum + (val || 0), 0);
  
  return personnel + operations + marketing + technology + sales + administration;
}
