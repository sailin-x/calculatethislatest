import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Calculate Net Operating Income (NOI)
function calculateNOI(
  grossRentalIncome: number,
  otherIncome: number,
  vacancyRate: number,
  operatingExpenses: number,
  propertyManagementFee: number,
  maintenanceCosts: number,
  insuranceCosts: number,
  propertyTaxes: number,
  utilities: number,
  repairs: number,
  landscaping: number,
  security: number,
  advertising: number,
  legalFees: number,
  accountingFees: number
): number {
  const totalIncome = grossRentalIncome + otherIncome;
  const vacancyLoss = totalIncome * (vacancyRate / 100);
  const effectiveGrossIncome = totalIncome - vacancyLoss;
  
  const totalOperatingExpenses = operatingExpenses + propertyManagementFee + 
    maintenanceCosts + insuranceCosts + propertyTaxes + utilities + repairs + 
    landscaping + security + advertising + legalFees + accountingFees;
  
  return effectiveGrossIncome - totalOperatingExpenses;
}

// Calculate annual debt service
function calculateAnnualDebtService(
  loanAmount: number,
  interestRate: number,
  amortizationPeriod: number
): number {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = amortizationPeriod * 12;
  
  if (monthlyRate === 0) {
    return loanAmount / amortizationPeriod;
  }
  
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return monthlyPayment * 12;
}

// Calculate debt yield ratio
function calculateDebtYieldRatio(noi: number, loanAmount: number): number {
  if (loanAmount === 0) return 0;
  return (noi / loanAmount) * 100;
}

// Calculate maximum loan amount based on debt yield requirements
function calculateMaxLoanAmount(noi: number, requiredDebtYield: number): number {
  if (requiredDebtYield === 0) return 0;
  return noi / (requiredDebtYield / 100);
}

// Calculate loan-to-value ratio
function calculateLoanToValueRatio(loanAmount: number, propertyValue: number): number {
  if (propertyValue === 0) return 0;
  return (loanAmount / propertyValue) * 100;
}

// Calculate cap rate
function calculateCapRate(noi: number, propertyValue: number): number {
  if (propertyValue === 0) return 0;
  return (noi / propertyValue) * 100;
}

// Calculate debt service coverage ratio
function calculateDSCR(noi: number, annualDebtService: number): number {
  if (annualDebtService === 0) return 0;
  return noi / annualDebtService;
}

// Calculate cash flow after debt service
function calculateCashFlowAfterDebtService(noi: number, annualDebtService: number): number {
  return noi - annualDebtService;
}

// Assess debt yield risk level
function assessDebtYieldRisk(debtYield: number, requiredDebtYield: number): { risk: string; color: string; description: string } {
  const buffer = debtYield - requiredDebtYield;
  
  if (buffer >= 2) {
    return {
      risk: 'Low Risk',
      color: 'green',
      description: 'Excellent debt yield with significant buffer above requirements'
    };
  } else if (buffer >= 0.5) {
    return {
      risk: 'Moderate Risk',
      color: 'yellow',
      description: 'Good debt yield with adequate buffer above requirements'
    };
  } else if (buffer >= 0) {
    return {
      risk: 'High Risk',
      color: 'orange',
      description: 'Minimum debt yield with limited buffer above requirements'
    };
  } else {
    return {
      risk: 'Critical Risk',
      color: 'red',
      description: 'Debt yield below required minimum - loan may not qualify'
    };
  }
}

// Generate sensitivity analysis
function generateSensitivityAnalysis(
  noi: number,
  loanAmount: number,
  requiredDebtYield: number
): Array<{ scenario: string; noi: number; debtYield: number; maxLoan: number }> {
  const scenarios = [
    { name: 'Current', noiChange: 0 },
    { name: '10% NOI Decrease', noiChange: -0.1 },
    { name: '20% NOI Decrease', noiChange: -0.2 },
    { name: '10% NOI Increase', noiChange: 0.1 },
    { name: '20% NOI Increase', noiChange: 0.2 }
  ];
  
  return scenarios.map(scenario => {
    const adjustedNOI = noi * (1 + scenario.noiChange);
    const debtYield = calculateDebtYieldRatio(adjustedNOI, loanAmount);
    const maxLoan = calculateMaxLoanAmount(adjustedNOI, requiredDebtYield);
    
    return {
      scenario: scenario.name,
      noi: Math.round(adjustedNOI),
      debtYield: Math.round(debtYield * 10) / 10,
      maxLoan: Math.round(maxLoan)
    };
  });
}

// Calculate lender requirements analysis
function calculateLenderRequirements(
  noi: number,
  loanAmount: number,
  propertyValue: number,
  requiredDebtYield: number,
  tenantCreditRating: string,
  marketConditions: string
): {
  minRequiredNOI: number;
  maxLoanAmount: number;
  maxLTV: number;
  minDebtYield: number;
  lenderRiskScore: number;
  creditAdjustment: number;
  marketAdjustment: number;
} {
  const minDebtYield = requiredDebtYield;
  const maxLTV = 75; // Typical maximum LTV for commercial properties
  
  // Credit rating adjustments
  const creditAdjustments = {
    'investment-grade': 0,
    'non-investment-grade': 1,
    'speculative': 2,
    'unrated': 1.5
  };
  
  // Market condition adjustments
  const marketAdjustments = {
    'strong': -0.5,
    'stable': 0,
    'weak': 1,
    'declining': 2
  };
  
  const creditAdjustment = creditAdjustments[tenantCreditRating] || 0;
  const marketAdjustment = marketAdjustments[marketConditions] || 0;
  const totalAdjustment = creditAdjustment + marketAdjustment;
  
  const adjustedRequiredDebtYield = minDebtYield + totalAdjustment;
  const minRequiredNOI = loanAmount * (adjustedRequiredDebtYield / 100);
  const maxLoanAmount = noi / (adjustedRequiredDebtYield / 100);
  
  const currentLTV = (loanAmount / propertyValue) * 100;
  const lenderRiskScore = Math.min(100, 
    (noi / minRequiredNOI) * 40 + 
    (maxLTV - currentLTV) * 0.6 + 
    (100 - totalAdjustment * 10)
  );
  
  return {
    minRequiredNOI: Math.round(minRequiredNOI),
    maxLoanAmount: Math.round(maxLoanAmount),
    maxLTV: maxLTV,
    minDebtYield: Math.round(adjustedRequiredDebtYield * 10) / 10,
    lenderRiskScore: Math.round(lenderRiskScore),
    creditAdjustment: creditAdjustment,
    marketAdjustment: marketAdjustment
  };
}

// Calculate property performance metrics
function calculatePerformanceMetrics(
  noi: number,
  grossRentalIncome: number,
  otherIncome: number,
  propertyValue: number,
  operatingExpenses: number,
  propertyManagementFee: number,
  maintenanceCosts: number,
  insuranceCosts: number,
  propertyTaxes: number,
  utilities: number,
  repairs: number,
  landscaping: number,
  security: number,
  advertising: number,
  legalFees: number,
  accountingFees: number
): {
  grossRentMultiplier: number;
  netRentMultiplier: number;
  expenseRatio: number;
  vacancyLoss: number;
  effectiveGrossIncome: number;
  operatingExpenseRatio: number;
  noiMargin: number;
} {
  const totalIncome = grossRentalIncome + otherIncome;
  const vacancyLoss = totalIncome * 0.05; // Assuming 5% vacancy for metrics
  const effectiveGrossIncome = totalIncome - vacancyLoss;
  
  const totalOperatingExpenses = operatingExpenses + propertyManagementFee + 
    maintenanceCosts + insuranceCosts + propertyTaxes + utilities + repairs + 
    landscaping + security + advertising + legalFees + accountingFees;
  
  const grossRentMultiplier = propertyValue / totalIncome;
  const netRentMultiplier = propertyValue / noi;
  const expenseRatio = (totalOperatingExpenses / totalIncome) * 100;
  const operatingExpenseRatio = (totalOperatingExpenses / effectiveGrossIncome) * 100;
  const noiMargin = (noi / effectiveGrossIncome) * 100;
  
  return {
    grossRentMultiplier: Math.round(grossRentMultiplier * 10) / 10,
    netRentMultiplier: Math.round(netRentMultiplier * 10) / 10,
    expenseRatio: Math.round(expenseRatio * 10) / 10,
    vacancyLoss: Math.round(vacancyLoss),
    effectiveGrossIncome: Math.round(effectiveGrossIncome),
    operatingExpenseRatio: Math.round(operatingExpenseRatio * 10) / 10,
    noiMargin: Math.round(noiMargin * 10) / 10
  };
}

export function calculateDebtYield(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    propertyType,
    grossRentalIncome,
    otherIncome,
    vacancyRate,
    operatingExpenses,
    propertyManagementFee,
    maintenanceCosts,
    insuranceCosts,
    propertyTaxes,
    utilities,
    repairs,
    landscaping,
    security,
    advertising,
    legalFees,
    accountingFees,
    loanAmount,
    propertyValue,
    requiredDebtYield,
    marketCapRate,
    propertyAge,
    occupancyRate,
    leaseType,
    tenantCreditRating,
    marketConditions,
    loanTerm,
    interestRate,
    amortizationPeriod,
    loanToValue,
    debtServiceCoverageRatio
  } = inputs;

  // Calculate NOI
  const noi = calculateNOI(
    grossRentalIncome,
    otherIncome,
    vacancyRate,
    operatingExpenses,
    propertyManagementFee,
    maintenanceCosts,
    insuranceCosts,
    propertyTaxes,
    utilities,
    repairs,
    landscaping,
    security,
    advertising,
    legalFees,
    accountingFees
  );

  // Calculate debt yield ratio
  const debtYieldRatio = calculateDebtYieldRatio(noi, loanAmount);

  // Calculate maximum loan amount
  const maxLoanAmount = calculateMaxLoanAmount(noi, requiredDebtYield);

  // Calculate additional metrics
  const loanToValueRatio = calculateLoanToValueRatio(loanAmount, propertyValue);
  const capRate = calculateCapRate(noi, propertyValue);
  const annualDebtService = calculateAnnualDebtService(loanAmount, interestRate, amortizationPeriod);
  const calculatedDSCR = calculateDSCR(noi, annualDebtService);
  const cashFlowAfterDebtService = calculateCashFlowAfterDebtService(noi, annualDebtService);

  // Risk assessment
  const riskAssessment = assessDebtYieldRisk(debtYieldRatio, requiredDebtYield);

  // Sensitivity analysis
  const sensitivityAnalysis = generateSensitivityAnalysis(
    noi,
    loanAmount,
    requiredDebtYield
  );

  // Lender requirements
  const lenderRequirements = calculateLenderRequirements(
    noi,
    loanAmount,
    propertyValue,
    requiredDebtYield,
    tenantCreditRating,
    marketConditions
  );

  // Cash flow analysis
  const cashFlowAnalysis = {
    monthlyNOI: Math.round(noi / 12),
    monthlyDebtService: Math.round(annualDebtService / 12),
    monthlyCashFlow: Math.round(cashFlowAfterDebtService / 12),
    annualCashFlow: Math.round(cashFlowAfterDebtService),
    cashOnCashReturn: Math.round((cashFlowAfterDebtService / (propertyValue * 0.25)) * 1000) / 10,
    debtYieldBuffer: Math.round((debtYieldRatio - requiredDebtYield) * 10) / 10
  };

  // Performance metrics
  const performanceMetrics = calculatePerformanceMetrics(
    noi,
    grossRentalIncome,
    otherIncome,
    propertyValue,
    operatingExpenses,
    propertyManagementFee,
    maintenanceCosts,
    insuranceCosts,
    propertyTaxes,
    utilities,
    repairs,
    landscaping,
    security,
    advertising,
    legalFees,
    accountingFees
  );

  return {
    noi: Math.round(noi),
    debtYieldRatio: Math.round(debtYieldRatio * 10) / 10,
    maxLoanAmount: Math.round(maxLoanAmount),
    loanToValueRatio: Math.round(loanToValueRatio * 10) / 10,
    capRate: Math.round(capRate * 10) / 10,
    debtServiceCoverageRatio: Math.round(calculatedDSCR * 100) / 100,
    annualDebtService: Math.round(annualDebtService),
    cashFlowAfterDebtService: Math.round(cashFlowAfterDebtService),
    riskAssessment,
    sensitivityAnalysis,
    lenderRequirements,
    cashFlowAnalysis,
    performanceMetrics,
    debtYieldAnalysis: 'Comprehensive debt yield analysis completed'
  };
}

export function generateDebtYieldAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const {
    propertyType,
    grossRentalIncome,
    otherIncome,
    vacancyRate,
    loanAmount,
    propertyValue,
    requiredDebtYield,
    tenantCreditRating,
    marketConditions
  } = inputs;

  const {
    noi,
    debtYieldRatio,
    maxLoanAmount,
    loanToValueRatio,
    capRate,
    debtServiceCoverageRatio,
    annualDebtService,
    cashFlowAfterDebtService,
    riskAssessment,
    sensitivityAnalysis,
    lenderRequirements,
    cashFlowAnalysis,
    performanceMetrics
  } = outputs;

  let analysis = `# Debt Yield Ratio Analysis\n\n`;
  
  analysis += `## Property Overview\n`;
  analysis += `- **Property Type:** ${propertyType}\n`;
  analysis += `- **Property Value:** $${propertyValue.toLocaleString()}\n`;
  analysis += `- **Loan Amount:** $${loanAmount.toLocaleString()}\n`;
  analysis += `- **Required Debt Yield:** ${requiredDebtYield}%\n`;
  analysis += `- **Tenant Credit Rating:** ${tenantCreditRating}\n`;
  analysis += `- **Market Conditions:** ${marketConditions}\n\n`;

  analysis += `## Income Analysis\n`;
  analysis += `- **Gross Rental Income:** $${grossRentalIncome.toLocaleString()}\n`;
  analysis += `- **Other Income:** $${otherIncome.toLocaleString()}\n`;
  analysis += `- **Vacancy Rate:** ${vacancyRate}%\n`;
  analysis += `- **Effective Gross Income:** $${performanceMetrics.effectiveGrossIncome.toLocaleString()}\n`;
  analysis += `- **Net Operating Income (NOI):** $${noi.toLocaleString()}\n\n`;

  analysis += `## Debt Yield Analysis\n`;
  analysis += `- **Debt Yield Ratio:** ${debtYieldRatio}%\n`;
  analysis += `- **Required Debt Yield:** ${requiredDebtYield}%\n`;
  analysis += `- **Debt Yield Buffer:** ${cashFlowAnalysis.debtYieldBuffer}%\n`;
  analysis += `- **Risk Level:** ${riskAssessment.risk} (${riskAssessment.description})\n\n`;

  analysis += `## Loan Analysis\n`;
  analysis += `- **Maximum Loan Amount:** $${maxLoanAmount.toLocaleString()}\n`;
  analysis += `- **Current Loan Amount:** $${loanAmount.toLocaleString()}\n`;
  analysis += `- **Loan-to-Value Ratio:** ${loanToValueRatio}%\n`;
  analysis += `- **Debt Service Coverage Ratio:** ${debtServiceCoverageRatio}\n`;
  analysis += `- **Annual Debt Service:** $${annualDebtService.toLocaleString()}\n\n`;

  analysis += `## Cash Flow Analysis\n`;
  analysis += `- **Annual Cash Flow:** $${cashFlowAfterDebtService.toLocaleString()}\n`;
  analysis += `- **Monthly Cash Flow:** $${cashFlowAnalysis.monthlyCashFlow.toLocaleString()}\n`;
  analysis += `- **Cash-on-Cash Return:** ${cashFlowAnalysis.cashOnCashReturn}%\n\n`;

  analysis += `## Key Metrics\n`;
  analysis += `- **Cap Rate:** ${capRate}%\n`;
  analysis += `- **Gross Rent Multiplier:** ${performanceMetrics.grossRentMultiplier}\n`;
  analysis += `- **Net Rent Multiplier:** ${performanceMetrics.netRentMultiplier}\n`;
  analysis += `- **Expense Ratio:** ${performanceMetrics.expenseRatio}%\n`;
  analysis += `- **NOI Margin:** ${performanceMetrics.noiMargin}%\n\n`;

  analysis += `## Lender Requirements Analysis\n`;
  analysis += `- **Minimum Required NOI:** $${lenderRequirements.minRequiredNOI.toLocaleString()}\n`;
  analysis += `- **Maximum Loan Amount:** $${lenderRequirements.maxLoanAmount.toLocaleString()}\n`;
  analysis += `- **Maximum LTV:** ${lenderRequirements.maxLTV}%\n`;
  analysis += `- **Adjusted Required Debt Yield:** ${lenderRequirements.minDebtYield}%\n`;
  analysis += `- **Credit Adjustment:** +${lenderRequirements.creditAdjustment}%\n`;
  analysis += `- **Market Adjustment:** +${lenderRequirements.marketAdjustment}%\n`;
  analysis += `- **Lender Risk Score:** ${lenderRequirements.lenderRiskScore}/100\n\n`;

  analysis += `## Sensitivity Analysis\n`;
  sensitivityAnalysis.forEach(scenario => {
    analysis += `- **${scenario.scenario}:** Debt Yield ${scenario.debtYield}%, Max Loan $${scenario.maxLoan.toLocaleString()}\n`;
  });
  analysis += `\n`;

  analysis += `## Performance Metrics\n`;
  analysis += `- **Operating Expense Ratio:** ${performanceMetrics.operatingExpenseRatio}%\n`;
  analysis += `- **Vacancy Loss:** $${performanceMetrics.vacancyLoss.toLocaleString()}\n`;
  analysis += `- **Effective Gross Income:** $${performanceMetrics.effectiveGrossIncome.toLocaleString()}\n\n`;

  analysis += `## Recommendations\n`;
  if (debtYieldRatio < requiredDebtYield) {
    analysis += `⚠️ **Critical:** Debt yield below required minimum. Consider:\n`;
    analysis += `- Increasing rental rates\n`;
    analysis += `- Reducing operating expenses\n`;
    analysis += `- Reducing loan amount\n`;
    analysis += `- Improving property operations\n\n`;
  } else if (cashFlowAnalysis.debtYieldBuffer < 1) {
    analysis += `⚠️ **Caution:** Limited debt yield buffer. Consider:\n`;
    analysis += `- Optimizing property operations\n`;
    analysis += `- Reducing vacancy rates\n`;
    analysis += `- Negotiating better loan terms\n\n`;
  } else {
    analysis += `✅ **Strong:** Debt yield above requirements with adequate buffer.\n`;
    analysis += `- Property meets lender requirements\n`;
    analysis += `- Good debt yield buffer\n`;
    analysis += `- Consider opportunities for value-add improvements\n\n`;
  }

  return analysis;
}
