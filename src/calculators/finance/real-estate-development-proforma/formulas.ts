import { RealEstateDevelopmentProformaInputs, RealEstateDevelopmentProformaOutputs } from './types';

export function calculateRealEstateDevelopmentProforma(inputs: RealEstateDevelopmentProformaInputs): RealEstateDevelopmentProformaOutputs {
  const {
    projectName,
    projectType,
    totalUnits,
    averageUnitSize,
    constructionCost,
    landCost,
    softCosts,
    financingCosts,
    contingency,
    developmentPeriod,
    stabilizationPeriod,
    averageRent,
    occupancyRate,
    operatingExpenses,
    managementFees,
    propertyTaxes,
    insurance,
    utilities,
    maintenance,
    marketing,
    otherExpenses,
    exitCapRate,
    appreciationRate,
    financingRate,
    loanToCostRatio,
    interestOnlyPeriod
  } = inputs;

  // Calculate total project cost
  const hardCosts = constructionCost + landCost;
  const totalProjectCost = hardCosts + softCosts + financingCosts + contingency;

  // Calculate financing
  const totalFinancing = totalProjectCost * (loanToCostRatio / 100);
  const equityRequired = totalProjectCost - totalFinancing;

  // Calculate construction costs breakdown
  const constructionCosts = {
    hardCosts,
    softCosts,
    financingCosts,
    contingency,
    total: totalProjectCost
  };

  // Calculate potential gross income
  const potentialGrossIncome = totalUnits * averageRent * 12;

  // Calculate revenue projection with occupancy and rent growth
  const revenueProjection = calculateRevenueProjection(
    potentialGrossIncome,
    occupancyRate,
    appreciationRate,
    5
  );

  // Calculate operating expenses
  const totalOperatingExpenses = managementFees + propertyTaxes + insurance + 
                                utilities + maintenance + marketing + otherExpenses;

  const operatingExpensesBreakdown = {
    management: managementFees,
    propertyTaxes,
    insurance,
    utilities,
    maintenance,
    marketing,
    other: otherExpenses,
    total: totalOperatingExpenses
  };

  // Calculate NOI projection
  const netOperatingIncome = calculateNOIProjection(
    revenueProjection,
    totalOperatingExpenses,
    appreciationRate,
    5
  );

  // Calculate debt service
  const annualDebtService = calculateDebtService(
    totalFinancing,
    financingRate,
    interestOnlyPeriod,
    developmentPeriod + stabilizationPeriod
  );

  // Calculate cash flow projection
  const cashFlow = calculateCashFlowProjection(
    netOperatingIncome,
    annualDebtService,
    5
  );

  // Calculate exit value
  const stabilizedNOI = netOperatingIncome.year5;
  const exitValue = stabilizedNOI / (exitCapRate / 100);

  // Calculate returns
  const totalReturn = calculateTotalReturn(
    cashFlow,
    exitValue,
    totalFinancing,
    equityRequired
  );

  const irr = calculateIRR(cashFlow, exitValue, equityRequired);
  const multiple = (exitValue + totalReturn) / equityRequired;

  // Calculate debt service coverage ratio
  const debtServiceCoverage = stabilizedNOI / annualDebtService;

  // Calculate break-even occupancy
  const breakEvenOccupancy = (totalOperatingExpenses + annualDebtService) / potentialGrossIncome;

  // Calculate sensitivity analysis
  const sensitivityAnalysis = calculateSensitivityAnalysis(
    potentialGrossIncome,
    totalOperatingExpenses,
    annualDebtService,
    exitCapRate
  );

  return {
    totalProjectCost,
    totalFinancing,
    equityRequired,
    constructionCosts,
    revenueProjection,
    operatingExpenses: operatingExpensesBreakdown,
    netOperatingIncome,
    cashFlow,
    exitValue,
    totalReturn,
    irr,
    multiple,
    debtServiceCoverage,
    breakEvenOccupancy,
    sensitivityAnalysis
  };
}

function calculateRevenueProjection(
  baseRevenue: number,
  occupancyRate: number,
  rentGrowth: number,
  years: number
): { year1: number; year2: number; year3: number; year4: number; year5: number } {
  const projection: any = {};
  
  for (let year = 1; year <= years; year++) {
    const growthFactor = Math.pow(1 + (rentGrowth / 100), year - 1);
    const occupancyFactor = year === 1 ? occupancyRate * 0.5 : occupancyRate; // Stabilization in year 1
    projection[`year${year}`] = baseRevenue * growthFactor * occupancyFactor;
  }
  
  return projection;
}

function calculateNOIProjection(
  revenue: { year1: number; year2: number; year3: number; year4: number; year5: number },
  baseExpenses: number,
  expenseGrowth: number,
  years: number
): { year1: number; year2: number; year3: number; year4: number; year5: number } {
  const projection: any = {};
  
  for (let year = 1; year <= years; year++) {
    const expenseGrowthFactor = Math.pow(1 + (expenseGrowth / 100), year - 1);
    const adjustedExpenses = baseExpenses * expenseGrowthFactor;
    projection[`year${year}`] = revenue[`year${year}` as keyof typeof revenue] - adjustedExpenses;
  }
  
  return projection;
}

function calculateDebtService(
  loanAmount: number,
  interestRate: number,
  interestOnlyPeriod: number,
  totalTerm: number
): number {
  if (interestOnlyPeriod > 0) {
    // Interest-only period
    const interestOnlyPayment = loanAmount * (interestRate / 100);
    
    // Amortizing period
    const remainingTerm = totalTerm - interestOnlyPeriod;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, remainingTerm * 12)) / 
                          (Math.pow(1 + monthlyRate, remainingTerm * 12) - 1);
    
    // Weighted average
    const weightedPayment = (interestOnlyPayment * interestOnlyPeriod + 
                           monthlyPayment * 12 * remainingTerm) / totalTerm;
    
    return weightedPayment;
  } else {
    // Full amortization
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalTerm * 12)) / 
                          (Math.pow(1 + monthlyRate, totalTerm * 12) - 1);
    
    return monthlyPayment * 12;
  }
}

function calculateCashFlowProjection(
  noi: { year1: number; year2: number; year3: number; year4: number; year5: number },
  debtService: number,
  years: number
): { year1: number; year2: number; year3: number; year4: number; year5: number } {
  const projection: any = {};
  
  for (let year = 1; year <= years; year++) {
    projection[`year${year}`] = noi[`year${year}` as keyof typeof noi] - debtService;
  }
  
  return projection;
}

function calculateTotalReturn(
  cashFlow: { year1: number; year2: number; year3: number; year4: number; year5: number },
  exitValue: number,
  loanAmount: number,
  equity: number
): number {
  const totalCashFlow = Object.values(cashFlow).reduce((sum, cf) => sum + cf, 0);
  const netExitValue = exitValue - loanAmount;
  return totalCashFlow + netExitValue - equity;
}

function calculateIRR(
  cashFlow: { year1: number; year2: number; year3: number; year4: number; year5: number },
  exitValue: number,
  equity: number
): number {
  // Simplified IRR calculation using Newton-Raphson method
  const cashFlows = [-equity, ...Object.values(cashFlow), exitValue];
  
  let rate = 0.1; // Initial guess
  let tolerance = 0.0001;
  let maxIterations = 100;
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let npvDerivative = 0;
    
    for (let j = 0; j < cashFlows.length; j++) {
      const discountFactor = Math.pow(1 + rate, j);
      npv += cashFlows[j] / discountFactor;
      npvDerivative -= (j * cashFlows[j]) / (discountFactor * (1 + rate));
    }
    
    if (Math.abs(npv) < tolerance) {
      break;
    }
    
    rate = rate - npv / npvDerivative;
  }
  
  return rate * 100;
}

function calculateSensitivityAnalysis(
  potentialRevenue: number,
  operatingExpenses: number,
  debtService: number,
  exitCapRate: number
): { optimistic: number; base: number; pessimistic: number } {
  const baseNOI = potentialRevenue - operatingExpenses;
  const baseExitValue = baseNOI / (exitCapRate / 100);
  const baseReturn = baseNOI - debtService;
  
  return {
    optimistic: baseReturn * 1.2, // 20% better
    base: baseReturn,
    pessimistic: baseReturn * 0.8  // 20% worse
  };
}