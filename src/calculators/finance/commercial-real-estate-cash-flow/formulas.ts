import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Calculate monthly mortgage payment
function calculateMonthlyMortgagePayment(loanAmount: number, interestRate: number, loanTerm: number): number {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  if (monthlyRate === 0) {
    return loanAmount / numberOfPayments;
  }
  
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

// Calculate gross rental income
function calculateGrossRentalIncome(occupiedUnits: number, averageRent: number): number {
  return occupiedUnits * averageRent;
}

// Calculate effective gross income
function calculateEffectiveGrossIncome(grossRentalIncome: number, otherIncome: number): number {
  return grossRentalIncome + otherIncome;
}

// Calculate total operating expenses
function calculateTotalOperatingExpenses(
  propertyTax: number,
  insurance: number,
  utilities: number,
  maintenance: number,
  propertyManagement: number,
  hoaFees: number,
  otherExpenses: number,
  effectiveGrossIncome: number
): number {
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyInsurance = insurance / 12;
  const managementFee = (effectiveGrossIncome * propertyManagement / 100);
  
  return monthlyPropertyTax + monthlyInsurance + utilities + maintenance + 
         managementFee + hoaFees + otherExpenses;
}

// Calculate net operating income
function calculateNetOperatingIncome(effectiveGrossIncome: number, totalOperatingExpenses: number): number {
  return effectiveGrossIncome - totalOperatingExpenses;
}

// Calculate total cash invested
function calculateTotalCashInvested(downPayment: number, closingCosts: number, renovationCosts: number): number {
  return downPayment + closingCosts + renovationCosts;
}

// Calculate cash-on-cash return
function calculateCashOnCashReturn(annualCashFlow: number, totalCashInvested: number): number {
  if (totalCashInvested === 0) return 0;
  return (annualCashFlow / totalCashInvested) * 100;
}

// Calculate cap rate
function calculateCapRate(annualNOI: number, purchasePrice: number): number {
  if (purchasePrice === 0) return 0;
  return (annualNOI / purchasePrice) * 100;
}

// Calculate debt service coverage ratio
function calculateDebtServiceCoverage(annualNOI: number, annualMortgagePayment: number): number {
  if (annualMortgagePayment === 0) return 0;
  return annualNOI / annualMortgagePayment;
}

// Calculate operating expense ratio
function calculateOperatingExpenseRatio(totalOperatingExpenses: number, effectiveGrossIncome: number): number {
  if (effectiveGrossIncome === 0) return 0;
  return (totalOperatingExpenses / effectiveGrossIncome) * 100;
}

// Calculate vacancy rate
function calculateVacancyRate(totalUnits: number, occupiedUnits: number): number {
  if (totalUnits === 0) return 0;
  return ((totalUnits - occupiedUnits) / totalUnits) * 100;
}

// Calculate break-even occupancy
function calculateBreakEvenOccupancy(totalOperatingExpenses: number, monthlyMortgagePayment: number, averageRent: number, totalUnits: number): number {
  const totalMonthlyExpenses = totalOperatingExpenses + monthlyMortgagePayment;
  if (averageRent === 0 || totalUnits === 0) return 0;
  return (totalMonthlyExpenses / (averageRent * totalUnits)) * 100;
}

// Calculate total return including appreciation
function calculateTotalReturn(cashOnCashReturn: number, appreciationRate: number, leverageRatio: number): number {
  const appreciationReturn = appreciationRate * leverageRatio;
  return cashOnCashReturn + appreciationReturn;
}

// Generate cash flow projection
function generateCashFlowProjection(monthlyCashFlow: number, appreciationRate: number, inflationRate: number): string {
  if (monthlyCashFlow > 0) {
    if (appreciationRate > inflationRate) {
      return 'Strong cash flow growth projected over 5 years';
    } else if (appreciationRate === inflationRate) {
      return 'Stable cash flow with moderate growth potential';
    } else {
      return 'Positive cash flow with potential for improvement';
    }
  } else {
    return 'Negative cash flow - consider improving occupancy or reducing expenses';
  }
}

// Generate investment analysis
function generateInvestmentAnalysis(
  cashOnCashReturn: number,
  debtServiceCoverage: number,
  vacancyRate: number,
  monthlyCashFlow: number
): string {
  const analysis = [];
  
  if (cashOnCashReturn >= 8) {
    analysis.push('Excellent cash-on-cash return');
  } else if (cashOnCashReturn >= 6) {
    analysis.push('Good cash-on-cash return');
  } else if (cashOnCashReturn >= 4) {
    analysis.push('Moderate cash-on-cash return');
  } else {
    analysis.push('Low cash-on-cash return');
  }
  
  if (debtServiceCoverage >= 2.0) {
    analysis.push('Strong debt service coverage');
  } else if (debtServiceCoverage >= 1.25) {
    analysis.push('Adequate debt service coverage');
  } else {
    analysis.push('Weak debt service coverage');
  }
  
  if (vacancyRate <= 5) {
    analysis.push('Excellent occupancy rate');
  } else if (vacancyRate <= 10) {
    analysis.push('Good occupancy rate');
  } else {
    analysis.push('Room for improvement in occupancy');
  }
  
  if (monthlyCashFlow > 0) {
    analysis.push('Positive monthly cash flow');
  } else {
    analysis.push('Negative cash flow requires attention');
  }
  
  return analysis.join(', ');
}

export function calculateCashFlow(inputs: CalculatorInputs): CalculatorOutputs {
  const totalUnits = inputs.totalUnits as number;
  const occupiedUnits = inputs.occupiedUnits as number;
  const averageRent = inputs.averageRent as number;
  const otherIncome = inputs.otherIncome as number;
  const propertyTax = inputs.propertyTax as number;
  const insurance = inputs.insurance as number;
  const utilities = inputs.utilities as number;
  const maintenance = inputs.maintenance as number;
  const propertyManagement = inputs.propertyManagement as number;
  const hoaFees = inputs.hoaFees as number;
  const otherExpenses = inputs.otherExpenses as number;
  const purchasePrice = inputs.purchasePrice as number;
  const downPayment = inputs.downPayment as number;
  const loanAmount = inputs.loanAmount as number;
  const interestRate = inputs.interestRate as number;
  const loanTerm = inputs.loanTerm as number;
  const closingCosts = inputs.closingCosts as number;
  const renovationCosts = inputs.renovationCosts as number;
  const appreciationRate = inputs.appreciationRate as number;
  const inflationRate = inputs.inflationRate as number;
  const taxRate = inputs.taxRate as number;
  const depreciationPeriod = inputs.depreciationPeriod as number;
  
  // Calculate income
  const grossRentalIncome = calculateGrossRentalIncome(occupiedUnits, averageRent);
  const effectiveGrossIncome = calculateEffectiveGrossIncome(grossRentalIncome, otherIncome);
  
  // Calculate expenses
  const totalOperatingExpenses = calculateTotalOperatingExpenses(
    propertyTax, insurance, utilities, maintenance, propertyManagement,
    hoaFees, otherExpenses, effectiveGrossIncome
  );
  
  // Calculate NOI
  const netOperatingIncome = calculateNetOperatingIncome(effectiveGrossIncome, totalOperatingExpenses);
  const annualNOI = netOperatingIncome * 12;
  
  // Calculate mortgage payment
  const monthlyMortgagePayment = calculateMonthlyMortgagePayment(loanAmount, interestRate, loanTerm);
  const annualMortgagePayment = monthlyMortgagePayment * 12;
  
  // Calculate cash flow
  const monthlyCashFlow = netOperatingIncome - monthlyMortgagePayment;
  const annualCashFlow = monthlyCashFlow * 12;
  
  // Calculate investment metrics
  const totalCashInvested = calculateTotalCashInvested(downPayment, closingCosts, renovationCosts);
  const cashOnCashReturn = calculateCashOnCashReturn(annualCashFlow, totalCashInvested);
  const capRate = calculateCapRate(annualNOI, purchasePrice);
  const debtServiceCoverage = calculateDebtServiceCoverage(annualNOI, annualMortgagePayment);
  const operatingExpenseRatio = calculateOperatingExpenseRatio(totalOperatingExpenses, effectiveGrossIncome);
  const vacancyRate = calculateVacancyRate(totalUnits, occupiedUnits);
  const breakEvenOccupancy = calculateBreakEvenOccupancy(totalOperatingExpenses, monthlyMortgagePayment, averageRent, totalUnits);
  
  // Calculate leverage ratio for total return
  const leverageRatio = purchasePrice / totalCashInvested;
  const totalReturn = calculateTotalReturn(cashOnCashReturn, appreciationRate, leverageRatio);
  
  // Generate analysis
  const cashFlowProjection = generateCashFlowProjection(monthlyCashFlow, appreciationRate, inflationRate);
  const investmentAnalysis = generateInvestmentAnalysis(cashOnCashReturn, debtServiceCoverage, vacancyRate, monthlyCashFlow);
  
  return {
    grossRentalIncome: Math.round(grossRentalIncome),
    effectiveGrossIncome: Math.round(effectiveGrossIncome),
    totalOperatingExpenses: Math.round(totalOperatingExpenses),
    netOperatingIncome: Math.round(netOperatingIncome),
    annualNOI: Math.round(annualNOI),
    monthlyMortgagePayment: Math.round(monthlyMortgagePayment),
    monthlyCashFlow: Math.round(monthlyCashFlow),
    annualCashFlow: Math.round(annualCashFlow),
    cashOnCashReturn: Math.round(cashOnCashReturn * 10) / 10,
    capRate: Math.round(capRate * 10) / 10,
    totalCashInvested: Math.round(totalCashInvested),
    debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,
    operatingExpenseRatio: Math.round(operatingExpenseRatio * 10) / 10,
    vacancyRate: Math.round(vacancyRate * 10) / 10,
    breakEvenOccupancy: Math.round(breakEvenOccupancy * 10) / 10,
    totalReturn: Math.round(totalReturn * 10) / 10,
    cashFlowProjection,
    investmentAnalysis
  };
}

export function generateCashFlowAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const propertyType = inputs.propertyType as string;
  const totalUnits = inputs.totalUnits as number;
  const occupiedUnits = inputs.occupiedUnits as number;
  const monthlyCashFlow = outputs.monthlyCashFlow as number;
  const annualCashFlow = outputs.annualCashFlow as number;
  const cashOnCashReturn = outputs.cashOnCashReturn as number;
  const capRate = outputs.capRate as number;
  const debtServiceCoverage = outputs.debtServiceCoverage as number;
  const vacancyRate = outputs.vacancyRate as number;
  
  let analysis = `## Commercial Real Estate Cash Flow Analysis\n\n`;
  
  analysis += `### Property Overview\n`;
  analysis += `- **Property Type**: ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}\n`;
  analysis += `- **Total Units**: ${totalUnits}\n`;
  analysis += `- **Occupied Units**: ${occupiedUnits}\n`;
  analysis += `- **Occupancy Rate**: ${100 - vacancyRate}%\n\n`;
  
  analysis += `### Cash Flow Summary\n`;
  analysis += `- **Monthly Cash Flow**: $${monthlyCashFlow.toLocaleString()}\n`;
  analysis += `- **Annual Cash Flow**: $${annualCashFlow.toLocaleString()}\n`;
  analysis += `- **Cash-on-Cash Return**: ${cashOnCashReturn}%\n`;
  analysis += `- **Cap Rate**: ${capRate}%\n\n`;
  
  analysis += `### Investment Metrics\n`;
  analysis += `- **Debt Service Coverage**: ${debtServiceCoverage}\n`;
  analysis += `- **Vacancy Rate**: ${vacancyRate}%\n`;
  analysis += `- **Operating Expense Ratio**: ${outputs.operatingExpenseRatio as number}%\n`;
  analysis += `- **Break-Even Occupancy**: ${outputs.breakEvenOccupancy as number}%\n\n`;
  
  analysis += `### Performance Assessment\n`;
  if (monthlyCashFlow > 0) {
    analysis += `**Positive Cash Flow**: The property generates positive monthly cash flow.\n`;
  } else {
    analysis += `**Negative Cash Flow**: The property currently has negative cash flow.\n`;
  }
  
  if (cashOnCashReturn >= 8) {
    analysis += `**Excellent Return**: Cash-on-cash return exceeds 8%.\n`;
  } else if (cashOnCashReturn >= 6) {
    analysis += `**Good Return**: Cash-on-cash return is above 6%.\n`;
  } else {
    analysis += `**Moderate Return**: Consider strategies to improve returns.\n`;
  }
  
  if (debtServiceCoverage >= 2.0) {
    analysis += `**Strong Coverage**: Excellent debt service coverage ratio.\n`;
  } else if (debtServiceCoverage >= 1.25) {
    analysis += `**Adequate Coverage**: Debt service coverage is acceptable.\n`;
  } else {
    analysis += `**Weak Coverage**: Debt service coverage needs improvement.\n`;
  }
  
  analysis += `\n### Recommendations\n`;
  analysis += `${outputs.investmentAnalysis as string}\n\n`;
  analysis += `### Projection\n`;
  analysis += `${outputs.cashFlowProjection as string}\n`;
  
  return analysis;
}
