export interface RealEstateSyndicationInputs {
  propertyType: string;
  totalProjectCost: number;
  sponsorEquity: number;
  investorEquity: number;
  debtAmount: number;
  debtRate: number;
  debtTerm: number;
  holdingPeriod: number;
  annualNOI: number;
  noiGrowthRate: number;
  exitCapRate: number;
  sponsorPromote: number;
  investorPreferredReturn: number;
  sponsorManagementFee: number;
  acquisitionFee: number;
  dispositionFee: number;
  operatingExpenses: number;
  taxRate: number;
}

export interface RealEstateSyndicationOutputs {
  totalEquity: number;
  leverageRatio: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
  totalReturn: number;
  irr: number;
  sponsorIrr: number;
  equityMultiple: number;
  exitValue: number;
  totalProfit: number;
  investorProfit: number;
  sponsorProfit: number;
}

export function calculateRealEstateSyndication(inputs: RealEstateSyndicationInputs): RealEstateSyndicationOutputs {
  // Calculate basic metrics
  const totalEquity = inputs.sponsorEquity + inputs.investorEquity;
  const leverageRatio = inputs.debtAmount / inputs.totalProjectCost;

  // Calculate fees
  const acquisitionFeeAmount = inputs.totalProjectCost * (inputs.acquisitionFee / 100);
  const totalInitialInvestment = inputs.totalProjectCost + acquisitionFeeAmount;

  // Calculate debt service
  const monthlyDebtRate = inputs.debtRate / 100 / 12;
  const numberOfPayments = inputs.debtTerm * 12;
  const monthlyDebtPayment = calculateMonthlyPayment(inputs.debtAmount, monthlyDebtRate, numberOfPayments);
  const annualDebtService = monthlyDebtPayment * 12;

  // Calculate annual cash flows
  const annualCashFlows = [];
  let currentNOI = inputs.annualNOI;
  
  for (let year = 1; year <= inputs.holdingPeriod; year++) {
    // Calculate NOI for this year
    const yearNOI = currentNOI * Math.pow(1 + inputs.noiGrowthRate / 100, year - 1);
    
    // Calculate management fee
    const managementFee = totalEquity * (inputs.sponsorManagementFee / 100);
    
    // Calculate net cash flow before debt service
    const netCashFlowBeforeDebt = yearNOI - managementFee;
    
    // Calculate cash flow after debt service
    const cashFlowAfterDebt = netCashFlowBeforeDebt - annualDebtService;
    
    annualCashFlows.push({
      year,
      noi: yearNOI,
      managementFee,
      debtService: annualDebtService,
      cashFlow: cashFlowAfterDebt
    });
    
    currentNOI = yearNOI;
  }

  // Calculate exit value
  const finalNOI = inputs.annualNOI * Math.pow(1 + inputs.noiGrowthRate / 100, inputs.holdingPeriod);
  const exitValue = finalNOI / (inputs.exitCapRate / 100);
  
  // Calculate disposition fee
  const dispositionFeeAmount = exitValue * (inputs.dispositionFee / 100);
  const netExitValue = exitValue - dispositionFeeAmount;

  // Calculate remaining debt at exit
  const remainingDebt = calculateRemainingDebt(inputs.debtAmount, inputs.debtRate, inputs.debtTerm, inputs.holdingPeriod);
  
  // Calculate net proceeds from sale
  const netProceedsFromSale = netExitValue - remainingDebt;

  // Calculate total cash flow to equity
  const totalCashFlowToEquity = annualCashFlows.reduce((sum, year) => sum + year.cashFlow, 0) + netProceedsFromSale;

  // Calculate waterfall distribution
  const waterfallResult = calculateWaterfall(
    totalEquity,
    inputs.investorEquity,
    inputs.sponsorEquity,
    inputs.investorPreferredReturn,
    inputs.sponsorPromote,
    totalCashFlowToEquity,
    inputs.holdingPeriod
  );

  // Calculate returns
  const annualCashFlow = annualCashFlows.reduce((sum, year) => sum + year.cashFlow, 0) / inputs.holdingPeriod;
  const cashOnCashReturn = annualCashFlow / inputs.investorEquity;
  const totalReturn = (totalCashFlowToEquity - totalEquity) / totalEquity;
  const equityMultiple = totalCashFlowToEquity / totalEquity;

  // Calculate IRR
  const irr = calculateIRR(inputs.investorEquity, annualCashFlows, netProceedsFromSale, inputs.holdingPeriod);
  const sponsorIrr = calculateSponsorIRR(inputs.sponsorEquity, waterfallResult.sponsorProfit, inputs.holdingPeriod);

  return {
    totalEquity,
    leverageRatio,
    annualCashFlow,
    cashOnCashReturn,
    totalReturn,
    irr,
    sponsorIrr,
    equityMultiple,
    exitValue,
    totalProfit: totalCashFlowToEquity - totalEquity,
    investorProfit: waterfallResult.investorProfit,
    sponsorProfit: waterfallResult.sponsorProfit
  };
}

function calculateMonthlyPayment(principal: number, monthlyRate: number, numberOfPayments: number): number {
  if (monthlyRate === 0) return principal / numberOfPayments;
  
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  return monthlyPayment;
}

function calculateRemainingDebt(originalDebt: number, annualRate: number, term: number, yearsElapsed: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = term * 12;
  const paymentsMade = yearsElapsed * 12;
  
  if (paymentsMade >= totalPayments) return 0;
  
  const monthlyPayment = calculateMonthlyPayment(originalDebt, monthlyRate, totalPayments);
  const remainingPayments = totalPayments - paymentsMade;
  
  const remainingDebt = monthlyPayment * (1 - Math.pow(1 + monthlyRate, -remainingPayments)) / monthlyRate;
  return remainingDebt;
}

function calculateWaterfall(
  totalEquity: number,
  investorEquity: number,
  sponsorEquity: number,
  preferredReturn: number,
  sponsorPromote: number,
  totalCashFlow: number,
  holdingPeriod: number
): { investorProfit: number; sponsorProfit: number } {
  // Calculate preferred return amount
  const preferredReturnAmount = investorEquity * (preferredReturn / 100) * holdingPeriod;
  
  // Calculate remaining profit after preferred return
  const remainingProfit = totalCashFlow - totalEquity - preferredReturnAmount;
  
  if (remainingProfit <= 0) {
    // No promote if no excess profit
    return {
      investorProfit: Math.max(0, totalCashFlow - totalEquity),
      sponsorProfit: 0
    };
  }
  
  // Calculate sponsor promote
  const sponsorPromoteAmount = remainingProfit * (sponsorPromote / 100);
  const investorExcessProfit = remainingProfit - sponsorPromoteAmount;
  
  return {
    investorProfit: preferredReturnAmount + investorExcessProfit,
    sponsorProfit: sponsorPromoteAmount
  };
}

function calculateIRR(
  initialInvestment: number,
  annualCashFlows: Array<{ year: number; cashFlow: number }>,
  exitProceeds: number,
  holdingPeriod: number
): number {
  // Create cash flow array for IRR calculation
  const cashFlows = [-initialInvestment];
  
  // Add annual cash flows
  for (let year = 1; year <= holdingPeriod; year++) {
    const yearCashFlow = annualCashFlows.find(cf => cf.year === year)?.cashFlow || 0;
    cashFlows.push(yearCashFlow);
  }
  
  // Add exit proceeds to final year
  cashFlows[cashFlows.length - 1] += exitProceeds;
  
  // Calculate IRR using Newton-Raphson method
  return calculateIRRNewtonRaphson(cashFlows);
}

function calculateIRRNewtonRaphson(cashFlows: number[]): number {
  let guess = 0.1; // Start with 10%
  const maxIterations = 100;
  const tolerance = 0.0001;
  
  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPV(cashFlows, guess);
    const derivative = calculateNPVDerivative(cashFlows, guess);
    
    if (Math.abs(derivative) < tolerance) break;
    
    const newGuess = guess - npv / derivative;
    
    if (Math.abs(newGuess - guess) < tolerance) {
      return newGuess;
    }
    
    guess = newGuess;
  }
  
  return guess;
}

function calculateNPV(cashFlows: number[], rate: number): number {
  return cashFlows.reduce((npv, cashFlow, index) => {
    return npv + cashFlow / Math.pow(1 + rate, index);
  }, 0);
}

function calculateNPVDerivative(cashFlows: number[], rate: number): number {
  return cashFlows.reduce((derivative, cashFlow, index) => {
    if (index === 0) return derivative;
    return derivative - (index * cashFlow) / Math.pow(1 + rate, index + 1);
  }, 0);
}

function calculateSponsorIRR(sponsorEquity: number, sponsorProfit: number, holdingPeriod: number): number {
  if (sponsorEquity <= 0) return 0;
  
  // Simplified IRR calculation for sponsor
  const totalReturn = sponsorProfit / sponsorEquity;
  const annualizedReturn = Math.pow(1 + totalReturn, 1 / holdingPeriod) - 1;
  
  return Math.max(0, annualizedReturn);
}

export function calculateYearsBetween(startDate: Date, endDate: Date): number {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return timeDiff / (1000 * 3600 * 24 * 365.25);
}

export function calculateMonthsBetween(startDate: Date, endDate: Date): number {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return timeDiff / (1000 * 3600 * 24 * 30.44);
}

export function generateSyndicationAnalysis(inputs: RealEstateSyndicationInputs, outputs: RealEstateSyndicationOutputs): string {
  const analysis = [];
  
  analysis.push(`## Real Estate Syndication Analysis`);
  analysis.push(``);
  analysis.push(`### Investment Overview`);
  analysis.push(`- **Property Type**: ${inputs.propertyType.replace('_', ' ').toUpperCase()}`);
  analysis.push(`- **Total Project Cost**: $${inputs.totalProjectCost.toLocaleString()}`);
  analysis.push(`- **Total Equity**: $${outputs.totalEquity.toLocaleString()}`);
  analysis.push(`- **Leverage Ratio**: ${(outputs.leverageRatio * 100).toFixed(1)}%`);
  analysis.push(``);
  
  analysis.push(`### Capital Structure`);
  analysis.push(`- **Sponsor Equity**: $${inputs.sponsorEquity.toLocaleString()} (${((inputs.sponsorEquity / outputs.totalEquity) * 100).toFixed(1)}%)`);
  analysis.push(`- **Investor Equity**: $${inputs.investorEquity.toLocaleString()} (${((inputs.investorEquity / outputs.totalEquity) * 100).toFixed(1)}%)`);
  analysis.push(`- **Debt**: $${inputs.debtAmount.toLocaleString()} (${((inputs.debtAmount / inputs.totalProjectCost) * 100).toFixed(1)}%)`);
  analysis.push(``);
  
  analysis.push(`### Returns Analysis`);
  analysis.push(`- **Annual Cash Flow**: $${outputs.annualCashFlow.toLocaleString()}`);
  analysis.push(`- **Cash-on-Cash Return**: ${(outputs.cashOnCashReturn * 100).toFixed(2)}%`);
  analysis.push(`- **Total Return**: ${(outputs.totalReturn * 100).toFixed(2)}%`);
  analysis.push(`- **Equity Multiple**: ${outputs.equityMultiple.toFixed(2)}x`);
  analysis.push(``);
  
  analysis.push(`### IRR Analysis`);
  analysis.push(`- **Investor IRR**: ${(outputs.irr * 100).toFixed(2)}%`);
  analysis.push(`- **Sponsor IRR**: ${(outputs.sponsorIrr * 100).toFixed(2)}%`);
  analysis.push(``);
  
  analysis.push(`### Exit Analysis`);
  analysis.push(`- **Exit Value**: $${outputs.exitValue.toLocaleString()}`);
  analysis.push(`- **Total Profit**: $${outputs.totalProfit.toLocaleString()}`);
  analysis.push(`- **Investor Profit**: $${outputs.investorProfit.toLocaleString()}`);
  analysis.push(`- **Sponsor Profit**: $${outputs.sponsorProfit.toLocaleString()}`);
  
  return analysis.join('\n');
}