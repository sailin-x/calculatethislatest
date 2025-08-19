export interface RealEstateDevelopmentProFormaInputs {
  projectType: string;
  totalUnits: number;
  landAcquisitionCost: number;
  hardCosts: number;
  softCosts: number;
  contingency: number;
  carryingCosts: number;
  developmentTimeline: number;
  salesPricePerUnit: number;
  rentalIncomePerUnit?: number;
  vacancyRate?: number;
  operatingExpenses?: number;
  financingAmount: number;
  interestRate: number;
  equityContribution: number;
  exitStrategy: string;
  marketAppreciation: number;
  salesCommission?: number;
  taxRate: number;
}

export interface RealEstateDevelopmentProFormaOutputs {
  totalProjectCost: number;
  totalRevenue: number;
  grossProfit: number;
  netProfit: number;
  roi: number;
  irr: number;
  profitMargin: number;
  breakEvenPrice: number;
  cashFlow: number;
  debtServiceCoverage: number;
  paybackPeriod: number;
  feasibilityScore: number;
}

// Constants for different project types
const PROJECT_TYPE_MULTIPLIERS = {
  residential: 1.0,
  commercial: 1.2,
  mixed_use: 1.15,
  industrial: 0.9,
  retail: 1.1,
  office: 1.25,
  hotel: 1.3,
  land_development: 0.8
};

const EXIT_STRATEGY_MULTIPLIERS = {
  sell_all: 1.0,
  sell_partial: 0.8,
  hold_all: 0.6,
  refinance: 0.7
};

export function calculateRealEstateDevelopmentProForma(inputs: RealEstateDevelopmentProFormaInputs): RealEstateDevelopmentProFormaOutputs {
  // Calculate total project cost
  const baseCosts = inputs.landAcquisitionCost + inputs.hardCosts + inputs.softCosts;
  const contingencyAmount = baseCosts * (inputs.contingency / 100);
  const totalProjectCost = baseCosts + contingencyAmount;

  // Calculate total carrying costs
  const totalCarryingCosts = inputs.carryingCosts * inputs.developmentTimeline;

  // Calculate total revenue based on exit strategy
  let totalRevenue = 0;
  if (inputs.exitStrategy === 'sell_all' || inputs.exitStrategy === 'sell_partial') {
    const salesMultiplier = EXIT_STRATEGY_MULTIPLIERS[inputs.exitStrategy as keyof typeof EXIT_STRATEGY_MULTIPLIERS] || 1.0;
    const unitsToSell = inputs.totalUnits * salesMultiplier;
    const salesCommissionAmount = (inputs.salesCommission || 0) / 100;
    totalRevenue = unitsToSell * inputs.salesPricePerUnit * (1 - salesCommissionAmount);
  }

  // Calculate rental income for hold strategies
  if (inputs.exitStrategy === 'hold_all' || inputs.exitStrategy === 'sell_partial') {
    const holdMultiplier = inputs.exitStrategy === 'hold_all' ? 1.0 : 0.2;
    const unitsToHold = inputs.totalUnits * holdMultiplier;
    const annualRentalIncome = unitsToHold * (inputs.rentalIncomePerUnit || 0) * 12;
    const vacancyLoss = annualRentalIncome * ((inputs.vacancyRate || 0) / 100);
    const operatingExpenseAmount = (annualRentalIncome - vacancyLoss) * ((inputs.operatingExpenses || 0) / 100);
    const netOperatingIncome = annualRentalIncome - vacancyLoss - operatingExpenseAmount;
    totalRevenue += netOperatingIncome;
  }

  // Calculate gross profit
  const grossProfit = totalRevenue - totalProjectCost - totalCarryingCosts;

  // Calculate financing costs
  const monthlyInterestRate = inputs.interestRate / 100 / 12;
  const totalInterestCost = inputs.financingAmount * monthlyInterestRate * inputs.developmentTimeline;

  // Calculate net profit
  const preTaxProfit = grossProfit - totalInterestCost;
  const taxes = Math.max(0, preTaxProfit * (inputs.taxRate / 100));
  const netProfit = preTaxProfit - taxes;

  // Calculate ROI
  const roi = inputs.equityContribution > 0 ? (netProfit / inputs.equityContribution) * 100 : 0;

  // Calculate IRR (simplified)
  const irr = calculateIRR(inputs.equityContribution, netProfit, inputs.developmentTimeline / 12);

  // Calculate profit margin
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  // Calculate break-even price
  const breakEvenPrice = inputs.totalUnits > 0 ? totalProjectCost / inputs.totalUnits : 0;

  // Calculate monthly cash flow
  let cashFlow = 0;
  if (inputs.exitStrategy === 'hold_all' || inputs.exitStrategy === 'sell_partial') {
    const holdMultiplier = inputs.exitStrategy === 'hold_all' ? 1.0 : 0.2;
    const unitsToHold = inputs.totalUnits * holdMultiplier;
    const monthlyRentalIncome = unitsToHold * (inputs.rentalIncomePerUnit || 0);
    const vacancyLoss = monthlyRentalIncome * ((inputs.vacancyRate || 0) / 100);
    const operatingExpenseAmount = (monthlyRentalIncome - vacancyLoss) * ((inputs.operatingExpenses || 0) / 100);
    const monthlyDebtService = calculateMonthlyDebtService(inputs.financingAmount, inputs.interestRate, inputs.developmentTimeline);
    cashFlow = monthlyRentalIncome - vacancyLoss - operatingExpenseAmount - monthlyDebtService;
  }

  // Calculate debt service coverage ratio
  const debtServiceCoverage = calculateDebtServiceCoverage(inputs, cashFlow);

  // Calculate payback period
  const paybackPeriod = calculatePaybackPeriod(inputs.equityContribution, netProfit, inputs.developmentTimeline / 12);

  // Calculate feasibility score
  const feasibilityScore = calculateFeasibilityScore(inputs, roi, irr, profitMargin, debtServiceCoverage);

  return {
    totalProjectCost,
    totalRevenue,
    grossProfit,
    netProfit,
    roi,
    irr,
    profitMargin,
    breakEvenPrice,
    cashFlow,
    debtServiceCoverage,
    paybackPeriod,
    feasibilityScore
  };
}

function calculateIRR(initialInvestment: number, finalValue: number, years: number): number {
  if (years <= 0 || initialInvestment <= 0) return 0;
  
  // Simplified IRR calculation using the formula: (finalValue/initialInvestment)^(1/years) - 1
  const totalReturn = finalValue / initialInvestment;
  if (totalReturn <= 0) return -100;
  
  const irr = Math.pow(totalReturn, 1 / years) - 1;
  return irr * 100;
}

function calculateMonthlyDebtService(principal: number, annualRate: number, months: number): number {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

function calculateDebtServiceCoverage(inputs: RealEstateDevelopmentProFormaInputs, monthlyCashFlow: number): number {
  const monthlyDebtService = calculateMonthlyDebtService(inputs.financingAmount, inputs.interestRate, inputs.developmentTimeline);
  if (monthlyDebtService <= 0) return 0;
  
  return monthlyCashFlow / monthlyDebtService;
}

function calculatePaybackPeriod(initialInvestment: number, netProfit: number, years: number): number {
  if (netProfit <= 0) return Infinity;
  
  const annualProfit = netProfit / years;
  if (annualProfit <= 0) return Infinity;
  
  return initialInvestment / annualProfit;
}

function calculateFeasibilityScore(
  inputs: RealEstateDevelopmentProFormaInputs,
  roi: number,
  irr: number,
  profitMargin: number,
  debtServiceCoverage: number
): number {
  let score = 0;
  
  // ROI scoring (0-25 points)
  if (roi >= 20) score += 25;
  else if (roi >= 15) score += 20;
  else if (roi >= 10) score += 15;
  else if (roi >= 5) score += 10;
  else if (roi >= 0) score += 5;
  
  // IRR scoring (0-25 points)
  if (irr >= 15) score += 25;
  else if (irr >= 10) score += 20;
  else if (irr >= 5) score += 15;
  else if (irr >= 0) score += 10;
  else if (irr >= -10) score += 5;
  
  // Profit margin scoring (0-20 points)
  if (profitMargin >= 20) score += 20;
  else if (profitMargin >= 15) score += 15;
  else if (profitMargin >= 10) score += 10;
  else if (profitMargin >= 5) score += 5;
  else if (profitMargin >= 0) score += 2;
  
  // Debt service coverage scoring (0-15 points)
  if (debtServiceCoverage >= 1.5) score += 15;
  else if (debtServiceCoverage >= 1.25) score += 12;
  else if (debtServiceCoverage >= 1.0) score += 8;
  else if (debtServiceCoverage >= 0.75) score += 4;
  
  // Project type and market conditions (0-15 points)
  const projectTypeMultiplier = PROJECT_TYPE_MULTIPLIERS[inputs.projectType as keyof typeof PROJECT_TYPE_MULTIPLIERS] || 1.0;
  const marketScore = Math.max(0, 15 - Math.abs(inputs.marketAppreciation - 3) * 2);
  score += marketScore * projectTypeMultiplier;
  
  return Math.min(100, Math.max(0, score));
}

export function calculateYearsBetween(startDate: Date, endDate: Date): number {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return timeDiff / (1000 * 3600 * 24 * 365.25);
}

export function calculateMonthsBetween(startDate: Date, endDate: Date): number {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return timeDiff / (1000 * 3600 * 24 * 30.44);
}

export function generateDevelopmentAnalysis(inputs: RealEstateDevelopmentProFormaInputs, outputs: RealEstateDevelopmentProFormaOutputs): string {
  const analysis = [];
  
  analysis.push(`## Real Estate Development Pro-Forma Analysis`);
  analysis.push(``);
  analysis.push(`### Project Overview`);
  analysis.push(`- **Project Type**: ${inputs.projectType.charAt(0).toUpperCase() + inputs.projectType.slice(1)}`);
  analysis.push(`- **Total Units**: ${inputs.totalUnits.toLocaleString()}`);
  analysis.push(`- **Development Timeline**: ${inputs.developmentTimeline} months`);
  analysis.push(`- **Exit Strategy**: ${inputs.exitStrategy.replace('_', ' ').toUpperCase()}`);
  analysis.push(``);
  
  analysis.push(`### Financial Summary`);
  analysis.push(`- **Total Project Cost**: $${outputs.totalProjectCost.toLocaleString()}`);
  analysis.push(`- **Total Revenue**: $${outputs.totalRevenue.toLocaleString()}`);
  analysis.push(`- **Gross Profit**: $${outputs.grossProfit.toLocaleString()}`);
  analysis.push(`- **Net Profit**: $${outputs.netProfit.toLocaleString()}`);
  analysis.push(``);
  
  analysis.push(`### Investment Metrics`);
  analysis.push(`- **ROI**: ${outputs.roi.toFixed(2)}%`);
  analysis.push(`- **IRR**: ${outputs.irr.toFixed(2)}%`);
  analysis.push(`- **Profit Margin**: ${outputs.profitMargin.toFixed(2)}%`);
  analysis.push(`- **Payback Period**: ${outputs.paybackPeriod === Infinity ? 'Never' : outputs.paybackPeriod.toFixed(2) + ' years'}`);
  analysis.push(``);
  
  analysis.push(`### Feasibility Assessment`);
  analysis.push(`- **Feasibility Score**: ${outputs.feasibilityScore.toFixed(1)}/100`);
  
  if (outputs.feasibilityScore >= 80) {
    analysis.push(`- **Recommendation**: Highly feasible project with strong returns`);
  } else if (outputs.feasibilityScore >= 60) {
    analysis.push(`- **Recommendation**: Feasible project with moderate returns`);
  } else if (outputs.feasibilityScore >= 40) {
    analysis.push(`- **Recommendation**: Marginal project, consider modifications`);
  } else {
    analysis.push(`- **Recommendation**: High-risk project, not recommended`);
  }
  
  return analysis.join('\n');
}