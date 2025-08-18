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
  loanTerm: number,
  paymentFrequency: string
): number {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  if (monthlyRate === 0) {
    const annualPayment = loanAmount / loanTerm;
    return paymentFrequency === 'monthly' ? annualPayment * 12 : annualPayment;
  }
  
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return monthlyPayment * 12;
}

// Calculate DSCR
function calculateDSCR(noi: number, annualDebtService: number): number {
  if (annualDebtService === 0) return 0;
  return noi / annualDebtService;
}

// Calculate break-even occupancy
function calculateBreakEvenOccupancy(
  noi: number,
  grossRentalIncome: number,
  otherIncome: number,
  vacancyRate: number
): number {
  const totalIncome = grossRentalIncome + otherIncome;
  const currentVacancyLoss = totalIncome * (vacancyRate / 100);
  const currentEffectiveIncome = totalIncome - currentVacancyLoss;
  
  if (currentEffectiveIncome === 0) return 0;
  
  return ((currentEffectiveIncome - noi) / totalIncome) * 100;
}

// Calculate maximum loan amount based on DSCR requirements
function calculateMaxLoanAmount(
  noi: number,
  requiredDSCR: number,
  interestRate: number,
  loanTerm: number
): number {
  const maxAnnualDebtService = noi / requiredDSCR;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  if (monthlyRate === 0) {
    return maxAnnualDebtService * loanTerm;
  }
  
  const monthlyPayment = maxAnnualDebtService / 12;
  return monthlyPayment * (Math.pow(1 + monthlyRate, numberOfPayments) - 1) /
         (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
}

// Calculate cash flow after debt service
function calculateCashFlowAfterDebtService(noi: number, annualDebtService: number): number {
  return noi - annualDebtService;
}

// Calculate debt yield ratio
function calculateDebtYieldRatio(noi: number, loanAmount: number): number {
  if (loanAmount === 0) return 0;
  return (noi / loanAmount) * 100;
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

// Assess DSCR risk level
function assessDSCRRisk(dscr: number): { risk: string; color: string; description: string } {
  if (dscr >= 1.5) {
    return {
      risk: 'Low Risk',
      color: 'green',
      description: 'Excellent debt service coverage with significant cash flow buffer'
    };
  } else if (dscr >= 1.25) {
    return {
      risk: 'Moderate Risk',
      color: 'yellow',
      description: 'Good debt service coverage with adequate cash flow'
    };
  } else if (dscr >= 1.0) {
    return {
      risk: 'High Risk',
      color: 'orange',
      description: 'Minimum debt service coverage with limited cash flow buffer'
    };
  } else {
    return {
      risk: 'Critical Risk',
      color: 'red',
      description: 'Insufficient debt service coverage - cash flow negative'
    };
  }
}

// Generate sensitivity analysis
function generateSensitivityAnalysis(
  noi: number,
  annualDebtService: number,
  grossRentalIncome: number,
  otherIncome: number
): Array<{ scenario: string; noi: number; dscr: number; cashFlow: number }> {
  const scenarios = [
    { name: 'Current', noiChange: 0 },
    { name: '10% NOI Decrease', noiChange: -0.1 },
    { name: '20% NOI Decrease', noiChange: -0.2 },
    { name: '10% NOI Increase', noiChange: 0.1 },
    { name: '20% NOI Increase', noiChange: 0.2 }
  ];
  
  return scenarios.map(scenario => {
    const adjustedNOI = noi * (1 + scenario.noiChange);
    const dscr = calculateDSCR(adjustedNOI, annualDebtService);
    const cashFlow = calculateCashFlowAfterDebtService(adjustedNOI, annualDebtService);
    
    return {
      scenario: scenario.name,
      noi: Math.round(adjustedNOI),
      dscr: Math.round(dscr * 100) / 100,
      cashFlow: Math.round(cashFlow)
    };
  });
}

// Calculate lender requirements analysis
function calculateLenderRequirements(
  noi: number,
  annualDebtService: number,
  propertyValue: number,
  loanAmount: number
): {
  minRequiredNOI: number;
  maxLoanAmount: number;
  maxLTV: number;
  minDSCR: number;
  lenderRiskScore: number;
} {
  const minDSCR = 1.25; // Typical lender requirement
  const maxLTV = 75; // Typical maximum LTV for commercial properties
  
  const minRequiredNOI = annualDebtService * minDSCR;
  const maxLoanAmount = noi / minDSCR * (1 / (minDSCR * 0.08 / 12)) * 
                       (1 - Math.pow(1 + 0.08 / 12, -360)) / (0.08 / 12);
  const currentLTV = (loanAmount / propertyValue) * 100;
  const lenderRiskScore = Math.min(100, (noi / minRequiredNOI) * 50 + (maxLTV - currentLTV) * 0.5);
  
  return {
    minRequiredNOI: Math.round(minRequiredNOI),
    maxLoanAmount: Math.round(maxLoanAmount),
    maxLTV: maxLTV,
    minDSCR: minDSCR,
    lenderRiskScore: Math.round(lenderRiskScore)
  };
}

export function calculateDSCR(inputs: CalculatorInputs): CalculatorOutputs {
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
    interestRate,
    loanTerm,
    paymentFrequency,
    propertyValue,
    requiredDSCR,
    marketCapRate,
    propertyAge,
    occupancyRate,
    leaseType,
    tenantCreditRating,
    marketConditions
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

  // Calculate annual debt service
  const annualDebtService = calculateAnnualDebtService(
    loanAmount,
    interestRate,
    loanTerm,
    paymentFrequency
  );

  // Calculate DSCR
  const dscr = calculateDSCR(noi, annualDebtService);

  // Calculate additional metrics
  const cashFlowAfterDebtService = calculateCashFlowAfterDebtService(noi, annualDebtService);
  const debtYieldRatio = calculateDebtYieldRatio(noi, loanAmount);
  const loanToValueRatio = calculateLoanToValueRatio(loanAmount, propertyValue);
  const capRate = calculateCapRate(noi, propertyValue);
  const breakEvenOccupancy = calculateBreakEvenOccupancy(noi, grossRentalIncome, otherIncome, vacancyRate);
  const maxLoanAmount = calculateMaxLoanAmount(noi, requiredDSCR, interestRate, loanTerm);

  // Risk assessment
  const riskAssessment = assessDSCRRisk(dscr);

  // Sensitivity analysis
  const sensitivityAnalysis = generateSensitivityAnalysis(
    noi,
    annualDebtService,
    grossRentalIncome,
    otherIncome
  );

  // Lender requirements
  const lenderRequirements = calculateLenderRequirements(
    noi,
    annualDebtService,
    propertyValue,
    loanAmount
  );

  // Cash flow analysis
  const cashFlowAnalysis = {
    monthlyNOI: Math.round(noi / 12),
    monthlyDebtService: Math.round(annualDebtService / 12),
    monthlyCashFlow: Math.round(cashFlowAfterDebtService / 12),
    annualCashFlow: Math.round(cashFlowAfterDebtService),
    cashOnCashReturn: Math.round((cashFlowAfterDebtService / (propertyValue * 0.25)) * 1000) / 10
  };

  // Property performance metrics
  const performanceMetrics = {
    grossRentMultiplier: Math.round((propertyValue / (grossRentalIncome + otherIncome)) * 10) / 10,
    netRentMultiplier: Math.round((propertyValue / noi) * 10) / 10,
    expenseRatio: Math.round(((operatingExpenses + propertyManagementFee + maintenanceCosts + 
                              insuranceCosts + propertyTaxes + utilities + repairs + landscaping + 
                              security + advertising + legalFees + accountingFees) / 
                             (grossRentalIncome + otherIncome)) * 1000) / 10,
    vacancyLoss: Math.round((grossRentalIncome + otherIncome) * (vacancyRate / 100)),
    effectiveGrossIncome: Math.round((grossRentalIncome + otherIncome) * (1 - vacancyRate / 100))
  };

  return {
    noi: Math.round(noi),
    annualDebtService: Math.round(annualDebtService),
    dscr: Math.round(dscr * 100) / 100,
    cashFlowAfterDebtService: Math.round(cashFlowAfterDebtService),
    debtYieldRatio: Math.round(debtYieldRatio * 10) / 10,
    loanToValueRatio: Math.round(loanToValueRatio * 10) / 10,
    capRate: Math.round(capRate * 10) / 10,
    breakEvenOccupancy: Math.round(breakEvenOccupancy * 10) / 10,
    maxLoanAmount: Math.round(maxLoanAmount),
    riskAssessment,
    sensitivityAnalysis,
    lenderRequirements,
    cashFlowAnalysis,
    performanceMetrics,
    dscRAnalysis: 'Comprehensive DSCR analysis completed'
  };
}

export function generateDSCRAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const {
    propertyType,
    grossRentalIncome,
    otherIncome,
    vacancyRate,
    loanAmount,
    interestRate,
    loanTerm,
    propertyValue
  } = inputs;

  const {
    noi,
    annualDebtService,
    dscr,
    cashFlowAfterDebtService,
    debtYieldRatio,
    loanToValueRatio,
    capRate,
    breakEvenOccupancy,
    maxLoanAmount,
    riskAssessment,
    sensitivityAnalysis,
    lenderRequirements,
    cashFlowAnalysis,
    performanceMetrics
  } = outputs;

  let analysis = `# Debt Service Coverage Ratio (DSCR) Analysis\n\n`;
  
  analysis += `## Property Overview\n`;
  analysis += `- **Property Type:** ${propertyType}\n`;
  analysis += `- **Property Value:** $${propertyValue.toLocaleString()}\n`;
  analysis += `- **Loan Amount:** $${loanAmount.toLocaleString()}\n`;
  analysis += `- **Interest Rate:** ${interestRate}%\n`;
  analysis += `- **Loan Term:** ${loanTerm} years\n\n`;

  analysis += `## Income Analysis\n`;
  analysis += `- **Gross Rental Income:** $${grossRentalIncome.toLocaleString()}\n`;
  analysis += `- **Other Income:** $${otherIncome.toLocaleString()}\n`;
  analysis += `- **Vacancy Rate:** ${vacancyRate}%\n`;
  analysis += `- **Effective Gross Income:** $${performanceMetrics.effectiveGrossIncome.toLocaleString()}\n`;
  analysis += `- **Net Operating Income (NOI):** $${noi.toLocaleString()}\n\n`;

  analysis += `## Debt Service Analysis\n`;
  analysis += `- **Annual Debt Service:** $${annualDebtService.toLocaleString()}\n`;
  analysis += `- **Monthly Debt Service:** $${cashFlowAnalysis.monthlyDebtService.toLocaleString()}\n`;
  analysis += `- **DSCR:** ${dscr}\n`;
  analysis += `- **Risk Level:** ${riskAssessment.risk} (${riskAssessment.description})\n\n`;

  analysis += `## Cash Flow Analysis\n`;
  analysis += `- **Annual Cash Flow:** $${cashFlowAfterDebtService.toLocaleString()}\n`;
  analysis += `- **Monthly Cash Flow:** $${cashFlowAnalysis.monthlyCashFlow.toLocaleString()}\n`;
  analysis += `- **Cash-on-Cash Return:** ${cashFlowAnalysis.cashOnCashReturn}%\n\n`;

  analysis += `## Key Metrics\n`;
  analysis += `- **Debt Yield Ratio:** ${debtYieldRatio}%\n`;
  analysis += `- **Loan-to-Value Ratio:** ${loanToValueRatio}%\n`;
  analysis += `- **Cap Rate:** ${capRate}%\n`;
  analysis += `- **Break-even Occupancy:** ${breakEvenOccupancy}%\n`;
  analysis += `- **Maximum Loan Amount:** $${maxLoanAmount.toLocaleString()}\n\n`;

  analysis += `## Lender Requirements Analysis\n`;
  analysis += `- **Minimum Required NOI:** $${lenderRequirements.minRequiredNOI.toLocaleString()}\n`;
  analysis += `- **Maximum Loan Amount:** $${lenderRequirements.maxLoanAmount.toLocaleString()}\n`;
  analysis += `- **Maximum LTV:** ${lenderRequirements.maxLTV}%\n`;
  analysis += `- **Minimum DSCR:** ${lenderRequirements.minDSCR}\n`;
  analysis += `- **Lender Risk Score:** ${lenderRequirements.lenderRiskScore}/100\n\n`;

  analysis += `## Sensitivity Analysis\n`;
  sensitivityAnalysis.forEach(scenario => {
    analysis += `- **${scenario.scenario}:** DSCR ${scenario.dscr}, Cash Flow $${scenario.cashFlow.toLocaleString()}\n`;
  });
  analysis += `\n`;

  analysis += `## Performance Metrics\n`;
  analysis += `- **Gross Rent Multiplier:** ${performanceMetrics.grossRentMultiplier}\n`;
  analysis += `- **Net Rent Multiplier:** ${performanceMetrics.netRentMultiplier}\n`;
  analysis += `- **Expense Ratio:** ${performanceMetrics.expenseRatio}%\n`;
  analysis += `- **Vacancy Loss:** $${performanceMetrics.vacancyLoss.toLocaleString()}\n\n`;

  analysis += `## Recommendations\n`;
  if (dscr < 1.0) {
    analysis += `⚠️ **Critical:** DSCR below 1.0 indicates negative cash flow. Consider:\n`;
    analysis += `- Increasing rental rates\n`;
    analysis += `- Reducing operating expenses\n`;
    analysis += `- Refinancing with lower interest rate\n`;
    analysis += `- Increasing down payment\n\n`;
  } else if (dscr < 1.25) {
    analysis += `⚠️ **Caution:** DSCR below 1.25 may not meet lender requirements. Consider:\n`;
    analysis += `- Optimizing property operations\n`;
    analysis += `- Reducing vacancy rates\n`;
    analysis += `- Negotiating better loan terms\n\n`;
  } else {
    analysis += `✅ **Strong:** DSCR above 1.25 indicates good debt service coverage.\n`;
    analysis += `- Property has adequate cash flow buffer\n`;
    analysis += `- Meets most lender requirements\n`;
    analysis += `- Consider opportunities for value-add improvements\n\n`;
  }

  return analysis;
}
