export interface OpportunityZoneInvestmentInputs {
  initialInvestment: number;
  investmentDate: string;
  propertyValue: number;
  annualRentalIncome: number;
  annualOperatingExpenses: number;
  annualAppreciation: number;
  holdingPeriod: number;
  originalCapitalGain: number;
  originalGainDate: string;
  taxBracket: number;
  stateTaxRate?: number;
  exitStrategy: 'sale' | 'refinance' | 'exchange' | 'hold';
  managementFees?: number;
  financingCosts?: number;
  renovationCosts?: number;
  inflationRate?: number;
}

export interface OpportunityZoneInvestmentOutputs {
  totalInvestment: number;
  annualCashFlow: number;
  totalCashFlow: number;
  propertyValueAtExit: number;
  totalReturn: number;
  totalROI: number;
  annualizedROI: number;
  taxDeferralBenefit: number;
  taxExclusionBenefit: number;
  totalTaxBenefits: number;
  afterTaxReturn: number;
  afterTaxROI: number;
  analysis: string;
}

/**
 * Calculate Opportunity Zone Investment ROI
 */
export function calculateOpportunityZoneROI(inputs: OpportunityZoneInvestmentInputs): OpportunityZoneInvestmentOutputs {
  const {
    initialInvestment,
    investmentDate,
    propertyValue,
    annualRentalIncome,
    annualOperatingExpenses,
    annualAppreciation,
    holdingPeriod,
    originalCapitalGain,
    originalGainDate,
    taxBracket,
    stateTaxRate = 0,
    exitStrategy,
    managementFees = 0,
    financingCosts = 0,
    renovationCosts = 0,
    inflationRate = 2.5
  } = inputs;

  // Calculate total investment including all costs
  const managementFeesAmount = annualRentalIncome * (managementFees / 100);
  const totalInvestment = initialInvestment + financingCosts + renovationCosts;

  // Calculate annual cash flow
  const netRentalIncome = annualRentalIncome - managementFeesAmount;
  const annualCashFlow = netRentalIncome - annualOperatingExpenses;

  // Calculate total cash flow over holding period
  const totalCashFlow = annualCashFlow * holdingPeriod;

  // Calculate property value at exit with appreciation
  const propertyValueAtExit = propertyValue * Math.pow(1 + annualAppreciation / 100, holdingPeriod);

  // Calculate total return
  const appreciationGain = propertyValueAtExit - propertyValue;
  const totalReturn = totalCashFlow + appreciationGain;

  // Calculate ROI metrics
  const totalROI = (totalReturn / totalInvestment) * 100;
  const annualizedROI = Math.pow(1 + totalROI / 100, 1 / holdingPeriod) - 1;
  const annualizedROIPercentage = annualizedROI * 100;

  // Calculate tax benefits
  const taxDeferralBenefit = calculateTaxDeferralBenefit(
    originalCapitalGain,
    originalGainDate,
    investmentDate,
    taxBracket,
    stateTaxRate,
    holdingPeriod
  );

  const taxExclusionBenefit = calculateTaxExclusionBenefit(
    appreciationGain,
    holdingPeriod,
    taxBracket,
    stateTaxRate
  );

  const totalTaxBenefits = taxDeferralBenefit + taxExclusionBenefit;

  // Calculate after-tax returns
  const afterTaxReturn = totalReturn + totalTaxBenefits;
  const afterTaxROI = (afterTaxReturn / totalInvestment) * 100;

  // Generate analysis
  const analysis = generateAnalysis(
    inputs,
    totalInvestment,
    annualCashFlow,
    totalCashFlow,
    propertyValueAtExit,
    totalReturn,
    totalROI,
    annualizedROIPercentage,
    taxDeferralBenefit,
    taxExclusionBenefit,
    totalTaxBenefits,
    afterTaxReturn,
    afterTaxROI
  );

  return {
    totalInvestment,
    annualCashFlow,
    totalCashFlow,
    propertyValueAtExit,
    totalReturn,
    totalROI,
    annualizedROI: annualizedROIPercentage,
    taxDeferralBenefit,
    taxExclusionBenefit,
    totalTaxBenefits,
    afterTaxReturn,
    afterTaxROI,
    analysis
  };
}

/**
 * Calculate tax deferral benefit
 */
function calculateTaxDeferralBenefit(
  originalCapitalGain: number,
  originalGainDate: string,
  investmentDate: string,
  taxBracket: number,
  stateTaxRate: number,
  holdingPeriod: number
): number {
  // Calculate deferral period
  const originalDate = new Date(originalGainDate);
  const investmentDateObj = new Date(investmentDate);
  const deferralYears = (investmentDateObj.getTime() - originalDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

  // Tax deferral benefit is the time value of money on deferred taxes
  const federalTaxRate = taxBracket / 100;
  const totalTaxRate = federalTaxRate + (stateTaxRate / 100);
  const deferredTaxAmount = originalCapitalGain * totalTaxRate;
  
  // Calculate present value of deferred tax payment
  const discountRate = 0.05; // 5% discount rate for time value of money
  const presentValueOfDeferredTax = deferredTaxAmount / Math.pow(1 + discountRate, deferralYears + holdingPeriod);
  
  return deferredTaxAmount - presentValueOfDeferredTax;
}

/**
 * Calculate tax exclusion benefit
 */
function calculateTaxExclusionBenefit(
  appreciationGain: number,
  holdingPeriod: number,
  taxBracket: number,
  stateTaxRate: number
): number {
  // Opportunity Zone tax benefits:
  // - 10% exclusion after 5 years
  // - 15% exclusion after 7 years
  // - 100% exclusion after 10 years (for gains on the investment itself)
  
  let exclusionPercentage = 0;
  
  if (holdingPeriod >= 10) {
    // 100% exclusion for gains on the investment after 10 years
    exclusionPercentage = 100;
  } else if (holdingPeriod >= 7) {
    // 15% exclusion for original gain after 7 years
    exclusionPercentage = 15;
  } else if (holdingPeriod >= 5) {
    // 10% exclusion for original gain after 5 years
    exclusionPercentage = 10;
  }

  const federalTaxRate = taxBracket / 100;
  const totalTaxRate = federalTaxRate + (stateTaxRate / 100);
  
  return (appreciationGain * exclusionPercentage / 100) * totalTaxRate;
}

/**
 * Generate detailed investment analysis
 */
function generateAnalysis(
  inputs: OpportunityZoneInvestmentInputs,
  totalInvestment: number,
  annualCashFlow: number,
  totalCashFlow: number,
  propertyValueAtExit: number,
  totalReturn: number,
  totalROI: number,
  annualizedROI: number,
  taxDeferralBenefit: number,
  taxExclusionBenefit: number,
  totalTaxBenefits: number,
  afterTaxReturn: number,
  afterTaxROI: number
): string {
  const {
    initialInvestment,
    propertyValue,
    annualRentalIncome,
    annualOperatingExpenses,
    annualAppreciation,
    holdingPeriod,
    originalCapitalGain,
    taxBracket,
    stateTaxRate = 0,
    exitStrategy,
    managementFees = 0,
    financingCosts = 0,
    renovationCosts = 0
  } = inputs;

  let analysis = `# Opportunity Zone Investment Analysis\n\n`;

  // Investment summary
  analysis += `## Investment Summary\n`;
  analysis += `- **Initial Investment:** $${initialInvestment.toLocaleString()}\n`;
  analysis += `- **Additional Costs:** $${(financingCosts + renovationCosts).toLocaleString()}\n`;
  analysis += `- **Total Investment:** $${totalInvestment.toLocaleString()}\n`;
  analysis += `- **Property Value:** $${propertyValue.toLocaleString()}\n`;
  analysis += `- **Holding Period:** ${holdingPeriod} years\n`;
  analysis += `- **Exit Strategy:** ${exitStrategy.charAt(0).toUpperCase() + exitStrategy.slice(1)}\n\n`;

  // Cash flow analysis
  analysis += `## Cash Flow Analysis\n`;
  analysis += `- **Annual Rental Income:** $${annualRentalIncome.toLocaleString()}\n`;
  analysis += `- **Annual Operating Expenses:** $${annualOperatingExpenses.toLocaleString()}\n`;
  if (managementFees > 0) {
    analysis += `- **Management Fees (${managementFees}%):** $${(annualRentalIncome * managementFees / 100).toLocaleString()}\n`;
  }
  analysis += `- **Annual Cash Flow:** $${annualCashFlow.toLocaleString()}\n`;
  analysis += `- **Total Cash Flow:** $${totalCashFlow.toLocaleString()}\n`;
  analysis += `- **Cash-on-Cash Return:** ${((annualCashFlow / totalInvestment) * 100).toFixed(1)}%\n\n`;

  // Appreciation analysis
  analysis += `## Appreciation Analysis\n`;
  analysis += `- **Annual Appreciation Rate:** ${annualAppreciation}%\n`;
  analysis += `- **Property Value at Exit:** $${propertyValueAtExit.toLocaleString()}\n`;
  analysis += `- **Appreciation Gain:** $${(propertyValueAtExit - propertyValue).toLocaleString()}\n`;
  analysis += `- **Total Appreciation:** ${(((propertyValueAtExit - propertyValue) / propertyValue) * 100).toFixed(1)}%\n\n`;

  // Return analysis
  analysis += `## Return Analysis\n`;
  analysis += `- **Total Return:** $${totalReturn.toLocaleString()}\n`;
  analysis += `- **Total ROI:** ${totalROI.toFixed(1)}%\n`;
  analysis += `- **Annualized ROI:** ${annualizedROI.toFixed(1)}%\n\n`;

  // Tax benefits analysis
  analysis += `## Opportunity Zone Tax Benefits\n`;
  analysis += `- **Original Capital Gain:** $${originalCapitalGain.toLocaleString()}\n`;
  analysis += `- **Tax Bracket:** ${taxBracket}% (Federal) + ${stateTaxRate}% (State)\n`;
  analysis += `- **Tax Deferral Benefit:** $${taxDeferralBenefit.toLocaleString()}\n`;
  analysis += `- **Tax Exclusion Benefit:** $${taxExclusionBenefit.toLocaleString()}\n`;
  analysis += `- **Total Tax Benefits:** $${totalTaxBenefits.toLocaleString()}\n\n`;

  // After-tax analysis
  analysis += `## After-Tax Analysis\n`;
  analysis += `- **After-Tax Return:** $${afterTaxReturn.toLocaleString()}\n`;
  analysis += `- **After-Tax ROI:** ${afterTaxROI.toFixed(1)}%\n`;
  analysis += `- **Tax Benefit Impact:** ${((afterTaxROI - totalROI) / totalROI * 100).toFixed(1)}% increase in ROI\n\n`;

  // Opportunity Zone specific analysis
  analysis += `## Opportunity Zone Benefits Breakdown\n`;
  
  if (holdingPeriod >= 10) {
    analysis += `- **✅ 10+ Year Hold:** Maximum tax benefits achieved\n`;
    analysis += `- **✅ 100% Exclusion:** All gains on the investment are tax-free\n`;
    analysis += `- **✅ Deferral:** Original capital gain taxes deferred until 2026\n`;
  } else if (holdingPeriod >= 7) {
    analysis += `- **✅ 7+ Year Hold:** 15% exclusion on original gain\n`;
    analysis += `- **⚠️ Consider:** Holding 3 more years for 100% exclusion on investment gains\n`;
  } else if (holdingPeriod >= 5) {
    analysis += `- **✅ 5+ Year Hold:** 10% exclusion on original gain\n`;
    analysis += `- **⚠️ Consider:** Holding 2 more years for 15% exclusion, 5 more for 100%\n`;
  } else {
    analysis += `- **⚠️ Short Hold:** No exclusion benefits yet\n`;
    analysis += `- **💡 Recommendation:** Hold at least 5 years for tax benefits\n`;
  }

  // Risk and recommendations
  analysis += `\n## Risk Analysis & Recommendations\n`;
  
  if (annualizedROI > 10) {
    analysis += `- **✅ Strong Returns:** Above-average annualized ROI\n`;
  } else if (annualizedROI > 7) {
    analysis += `- **📊 Good Returns:** Competitive annualized ROI\n`;
  } else {
    analysis += `- **⚠️ Lower Returns:** Below-average annualized ROI\n`;
  }

  if (annualCashFlow > 0) {
    analysis += `- **✅ Positive Cash Flow:** Investment generates positive monthly income\n`;
  } else {
    analysis += `- **⚠️ Negative Cash Flow:** Investment requires monthly cash infusion\n`;
  }

  if (holdingPeriod >= 10) {
    analysis += `- **✅ Optimal Strategy:** Long-term hold maximizes tax benefits\n`;
  } else {
    analysis += `- **💡 Strategy:** Consider extending hold period for maximum tax benefits\n`;
  }

  // Market considerations
  analysis += `\n## Market Considerations\n`;
  analysis += `- **Appreciation Assumption:** ${annualAppreciation}% annual appreciation\n`;
  analysis += `- **Rental Market:** ${annualRentalIncome > 0 ? 'Positive rental income' : 'No rental income'}\n`;
  analysis += `- **Exit Strategy:** ${exitStrategy.charAt(0).toUpperCase() + exitStrategy.slice(1)} planned\n`;
  
  if (exitStrategy === 'sale') {
    analysis += `- **Market Risk:** Property value dependent on market conditions at exit\n`;
  } else if (exitStrategy === 'refinance') {
    analysis += `- **Refinance Risk:** Interest rate environment affects refinancing terms\n`;
  } else if (exitStrategy === 'exchange') {
    analysis += `- **Exchange Risk:** Requires finding suitable replacement property\n`;
  }

  return analysis;
}

/**
 * Calculate years between two dates
 */
export function calculateYearsBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
}

/**
 * Calculate present value
 */
export function calculatePresentValue(futureValue: number, rate: number, years: number): number {
  return futureValue / Math.pow(1 + rate, years);
}

/**
 * Calculate future value
 */
export function calculateFutureValue(presentValue: number, rate: number, years: number): number {
  return presentValue * Math.pow(1 + rate, years);
}