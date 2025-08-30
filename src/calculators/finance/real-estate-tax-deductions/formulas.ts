import { RealEstateTaxDeductionsInputs, RealEstateTaxDeductionsOutputs, RealEstateTaxDeductionsMetrics, TaxAnalysis, DeductionBreakdown, DepreciationSchedule, TaxSchedule } from './types';

export function calculateRealEstateTaxDeductions(inputs: RealEstateTaxDeductionsInputs): RealEstateTaxDeductionsOutputs {
  // Calculate key metrics
  const metrics = calculateRealEstateTaxDeductionsMetrics(inputs);

  // Generate deduction breakdown
  const deductionBreakdown = generateDeductionBreakdown(inputs, metrics);

  // Generate depreciation schedule
  const depreciationSchedule = generateDepreciationSchedule(inputs);

  // Generate tax schedules
  const taxSchedules = generateTaxSchedules(inputs, metrics);

  // Generate analysis
  const analysis = generateTaxAnalysis(inputs, metrics);

  return {
    metrics,
    deductionBreakdown,
    depreciationSchedule,
    taxSchedules,
    analysis
  };
}

export function calculateRealEstateTaxDeductionsMetrics(inputs: RealEstateTaxDeductionsInputs): RealEstateTaxDeductionsMetrics {
  // Calculate total income
  const totalIncome = inputs.rentalIncome + inputs.otherIncome;
  const rentalIncome = inputs.rentalIncome;

  // Calculate total expenses
  const totalExpenses = inputs.mortgageInterest + inputs.propertyTaxes + inputs.insurance + 
                       inputs.utilities + inputs.maintenance + inputs.repairs + 
                       inputs.propertyManagement + inputs.advertising + inputs.legalFees + 
                       inputs.accountingFees + inputs.travelExpenses + inputs.homeOfficeExpenses + 
                       inputs.otherExpenses;

  // Calculate depreciation
  const depreciation = calculateAnnualDepreciation(inputs);

  // Calculate net rental income/loss
  const netRentalIncome = rentalIncome - totalExpenses - depreciation;

  // Calculate adjusted gross income
  const adjustedGrossIncome = totalIncome - depreciation;

  // Calculate deductions
  const itemizedDeductions = calculateItemizedDeductions(inputs);
  const standardDeduction = getStandardDeduction(inputs.filingStatus, inputs.taxYear);
  const usedDeduction = itemizedDeductions > standardDeduction ? 'itemized' : 'standard';
  const totalDeductions = Math.max(itemizedDeductions, standardDeduction);

  // Calculate taxable income
  const taxableIncome = Math.max(0, adjustedGrossIncome - totalDeductions);

  // Calculate tax liability
  const federalTaxLiability = calculateFederalTax(taxableIncome, inputs.filingStatus, inputs.taxYear);
  const stateTaxLiability = calculateStateTax(taxableIncome, inputs.stateTaxRate);
  const localTaxLiability = calculateLocalTax(taxableIncome, inputs.localTaxRate);
  const totalTaxLiability = federalTaxLiability + stateTaxLiability + localTaxLiability;

  // Calculate tax savings
  const taxWithoutDeductions = calculateFederalTax(totalIncome, inputs.filingStatus, inputs.taxYear) + 
                              calculateStateTax(totalIncome, inputs.stateTaxRate) + 
                              calculateLocalTax(totalIncome, inputs.localTaxRate);
  const taxSavings = taxWithoutDeductions - totalTaxLiability;

  // Calculate effective tax rate
  const effectiveTaxRate = totalIncome > 0 ? (totalTaxLiability / totalIncome) * 100 : 0;

  // Calculate after-tax cash flow
  const afterTaxCashFlow = netRentalIncome - totalTaxLiability;

  // Calculate passive activity losses
  const passiveLoss = inputs.isPassiveActivity ? Math.max(0, -netRentalIncome) : 0;
  const suspendedLoss = calculateSuspendedLosses(inputs, passiveLoss);
  const activeLoss = inputs.isPassiveActivity ? 0 : Math.max(0, -netRentalIncome);

  // Calculate credits
  const totalCredits = inputs.energyEfficientImprovements + inputs.renewableEnergyCredits + 
                      inputs.lowIncomeHousingCredits + inputs.historicRehabilitationCredits;
  const refundableCredits = inputs.renewableEnergyCredits;
  const nonRefundableCredits = totalCredits - refundableCredits;

  return {
    taxSavings,
    totalDeductions,
    effectiveTaxRate,
    afterTaxCashFlow,
    federalTaxLiability,
    stateTaxLiability,
    localTaxLiability,
    totalTaxLiability,
    totalIncome,
    rentalIncome,
    taxableIncome,
    adjustedGrossIncome,
    itemizedDeductions,
    standardDeduction,
    usedDeduction,
    mortgageInterestDeduction: inputs.mortgageInterest,
    propertyTaxDeduction: inputs.propertyTaxes,
    depreciationDeduction: depreciation,
    operatingExpenseDeduction: totalExpenses - inputs.mortgageInterest - inputs.propertyTaxes,
    passiveLoss,
    suspendedLoss,
    activeLoss,
    totalCredits,
    refundableCredits,
    nonRefundableCredits
  };
}

function generateDeductionBreakdown(inputs: RealEstateTaxDeductionsInputs, metrics: RealEstateTaxDeductionsMetrics): DeductionBreakdown[] {
  const breakdown: DeductionBreakdown[] = [];

  // Mortgage Interest
  if (inputs.mortgageInterest > 0) {
    breakdown.push({
      category: 'Mortgage Interest',
      amount: inputs.mortgageInterest,
      percentage: (inputs.mortgageInterest / metrics.totalDeductions) * 100,
      form: 'Schedule A',
      line: '8a',
      description: 'Home mortgage interest and points',
      isDeductible: true,
      limitation: 'Limited to $750,000 of acquisition debt'
    });
  }

  // Property Taxes
  if (inputs.propertyTaxes > 0) {
    breakdown.push({
      category: 'Property Taxes',
      amount: inputs.propertyTaxes,
      percentage: (inputs.propertyTaxes / metrics.totalDeductions) * 100,
      form: 'Schedule A',
      line: '5a',
      description: 'State and local taxes',
      isDeductible: true,
      limitation: 'Limited to $10,000 total SALT deduction'
    });
  }

  // Depreciation
  if (metrics.depreciationDeduction > 0) {
    breakdown.push({
      category: 'Depreciation',
      amount: metrics.depreciationDeduction,
      percentage: (metrics.depreciationDeduction / metrics.totalDeductions) * 100,
      form: 'Schedule E',
      line: '18',
      description: 'Depreciation expense',
      isDeductible: true
    });
  }

  // Operating Expenses
  const operatingExpenses = inputs.insurance + inputs.utilities + inputs.maintenance + 
                           inputs.repairs + inputs.propertyManagement + inputs.advertising + 
                           inputs.legalFees + inputs.accountingFees + inputs.travelExpenses + 
                           inputs.otherExpenses;

  if (operatingExpenses > 0) {
    breakdown.push({
      category: 'Operating Expenses',
      amount: operatingExpenses,
      percentage: (operatingExpenses / metrics.totalDeductions) * 100,
      form: 'Schedule E',
      line: '14',
      description: 'Other expenses',
      isDeductible: true
    });
  }

  // Home Office
  if (inputs.homeOfficeExpenses > 0) {
    breakdown.push({
      category: 'Home Office',
      amount: inputs.homeOfficeExpenses,
      percentage: (inputs.homeOfficeExpenses / metrics.totalDeductions) * 100,
      form: 'Schedule C',
      line: '30',
      description: 'Home office deduction',
      isDeductible: true,
      limitation: 'Must be used regularly and exclusively for business'
    });
  }

  return breakdown;
}

function generateDepreciationSchedule(inputs: RealEstateTaxDeductionsInputs): DepreciationSchedule[] {
  const schedule: DepreciationSchedule[] = [];
  const depreciableBasis = inputs.buildingValue + inputs.improvementsValue;
  let remainingBasis = depreciableBasis;
  let accumulatedDepreciation = 0;

  // Apply bonus depreciation if eligible
  let bonusDepreciation = 0;
  if (inputs.bonusDepreciationEligible && inputs.bonusDepreciationPercentage > 0) {
    bonusDepreciation = depreciableBasis * (inputs.bonusDepreciationPercentage / 100);
    remainingBasis -= bonusDepreciation;
    accumulatedDepreciation += bonusDepreciation;
  }

  // Apply Section 179 if eligible
  let section179 = 0;
  if (inputs.section179Eligible && inputs.section179Amount > 0) {
    section179 = Math.min(inputs.section179Amount, remainingBasis);
    remainingBasis -= section179;
    accumulatedDepreciation += section179;
  }

  // Calculate annual depreciation
  const annualDepreciation = remainingBasis / inputs.recoveryPeriod;

  for (let year = 1; year <= inputs.recoveryPeriod; year++) {
    const depreciation = year === 1 ? annualDepreciation : annualDepreciation;
    accumulatedDepreciation += depreciation;
    remainingBasis -= depreciation;

    schedule.push({
      year,
      beginningBasis: year === 1 ? depreciableBasis : schedule[year - 2].endingBasis,
      depreciation,
      bonusDepreciation: year === 1 ? bonusDepreciation : 0,
      section179: year === 1 ? section179 : 0,
      endingBasis: remainingBasis,
      accumulatedDepreciation,
      remainingLife: inputs.recoveryPeriod - year
    });
  }

  return schedule;
}

function generateTaxSchedules(inputs: RealEstateTaxDeductionsInputs, metrics: RealEstateTaxDeductionsMetrics): TaxSchedule[] {
  const schedules: TaxSchedule[] = [];

  // Schedule E - Rental Income
  if (inputs.rentalIncome > 0 || inputs.mortgageInterest > 0 || inputs.propertyTaxes > 0) {
    schedules.push({
      schedule: 'Schedule E',
      form: 'Form 1040',
      description: 'Supplemental Income and Loss',
      amount: metrics.rentalIncome - metrics.depreciationDeduction - metrics.operatingExpenseDeduction,
      line: '1',
      isRequired: true,
      instructions: 'Report rental income and expenses'
    });
  }

  // Form 4562 - Depreciation
  if (metrics.depreciationDeduction > 0) {
    schedules.push({
      schedule: 'Form 4562',
      form: 'Form 4562',
      description: 'Depreciation and Amortization',
      amount: metrics.depreciationDeduction,
      line: '19',
      isRequired: true,
      instructions: 'Report depreciation expense'
    });
  }

  // Schedule A - Itemized Deductions
  if (metrics.usedDeduction === 'itemized') {
    schedules.push({
      schedule: 'Schedule A',
      form: 'Form 1040',
      description: 'Itemized Deductions',
      amount: metrics.itemizedDeductions,
      line: '17',
      isRequired: true,
      instructions: 'Report itemized deductions'
    });
  }

  // Form 8582 - Passive Activity Loss Limitations
  if (metrics.passiveLoss > 0) {
    schedules.push({
      schedule: 'Form 8582',
      form: 'Form 8582',
      description: 'Passive Activity Loss Limitations',
      amount: metrics.suspendedLoss,
      line: '1a',
      isRequired: true,
      instructions: 'Report passive activity losses'
    });
  }

  return schedules;
}

function generateTaxAnalysis(inputs: RealEstateTaxDeductionsInputs, metrics: RealEstateTaxDeductionsMetrics): TaxAnalysis {
  // Calculate audit risk
  const auditRisk = calculateAuditRisk(inputs, metrics);

  // Generate risk factors
  const riskFactors = generateRiskFactors(inputs, metrics);

  // Generate key deductions
  const keyDeductions = generateKeyDeductions(inputs, metrics);

  // Generate tax savings opportunities
  const taxSavingsOpportunities = generateTaxSavingsOpportunities(inputs, metrics);

  // Generate recommendations
  const recommendations = generateRecommendations(inputs, metrics);

  // Generate compliance notes
  const complianceNotes = generateComplianceNotes(inputs, metrics);

  // Generate documentation requirements
  const documentationRequirements = generateDocumentationRequirements(inputs, metrics);

  return {
    auditRisk,
    riskFactors,
    keyDeductions,
    taxSavingsOpportunities,
    recommendations,
    complianceNotes,
    documentationRequirements
  };
}

// Helper functions
function calculateAnnualDepreciation(inputs: RealEstateTaxDeductionsInputs): number {
  const depreciableBasis = inputs.buildingValue + inputs.improvementsValue;
  
  if (inputs.recoveryPeriod <= 0) {
    return 0;
  }

  return depreciableBasis / inputs.recoveryPeriod;
}

function calculateItemizedDeductions(inputs: RealEstateTaxDeductionsInputs): number {
  const stateLocalTaxes = Math.min(inputs.propertyTaxes, 10000); // SALT limitation
  const mortgageInterest = Math.min(inputs.mortgageInterest, 750000 * 0.05); // Simplified calculation
  
  return stateLocalTaxes + mortgageInterest;
}

function getStandardDeduction(filingStatus: string, taxYear: number): number {
  // Simplified standard deduction amounts for 2024
  const standardDeductions: Record<string, number> = {
    'single': 14600,
    'married-filing-jointly': 29200,
    'married-filing-separately': 14600,
    'head-of-household': 21900,
    'qualifying-widow': 29200
  };

  return standardDeductions[filingStatus] || 14600;
}

function calculateFederalTax(taxableIncome: number, filingStatus: string, taxYear: number): number {
  // Simplified tax calculation for 2024
  const brackets = {
    'single': [
      { rate: 0.10, max: 11600 },
      { rate: 0.12, max: 47150 },
      { rate: 0.22, max: 100525 },
      { rate: 0.24, max: 191950 },
      { rate: 0.32, max: 243725 },
      { rate: 0.35, max: 609350 },
      { rate: 0.37, max: Infinity }
    ],
    'married-filing-jointly': [
      { rate: 0.10, max: 23200 },
      { rate: 0.12, max: 94300 },
      { rate: 0.22, max: 201050 },
      { rate: 0.24, max: 383900 },
      { rate: 0.32, max: 487450 },
      { rate: 0.35, max: 731200 },
      { rate: 0.37, max: Infinity }
    ]
  };

  const bracket = brackets[filingStatus] || brackets['single'];
  let tax = 0;
  let remainingIncome = taxableIncome;

  for (let i = 0; i < bracket.length; i++) {
    const currentBracket = bracket[i];
    const previousMax = i > 0 ? bracket[i - 1].max : 0;
    const bracketAmount = Math.min(remainingIncome, currentBracket.max - previousMax);
    
    if (bracketAmount > 0) {
      tax += bracketAmount * currentBracket.rate;
      remainingIncome -= bracketAmount;
    }
    
    if (remainingIncome <= 0) break;
  }

  return tax;
}

function calculateStateTax(taxableIncome: number, stateTaxRate: number): number {
  return taxableIncome * (stateTaxRate / 100);
}

function calculateLocalTax(taxableIncome: number, localTaxRate: number): number {
  return taxableIncome * (localTaxRate / 100);
}

function calculateSuspendedLosses(inputs: RealEstateTaxDeductionsInputs, passiveLoss: number): number {
  if (!inputs.isPassiveActivity) {
    return 0;
  }

  // Simplified calculation - in reality, this would be more complex
  return passiveLoss;
}

function calculateAuditRisk(inputs: RealEstateTaxDeductionsInputs, metrics: RealEstateTaxDeductionsMetrics): 'low' | 'medium' | 'high' {
  let riskScore = 0;

  // High income increases risk
  if (metrics.totalIncome > 200000) riskScore += 3;
  else if (metrics.totalIncome > 100000) riskScore += 2;
  else if (metrics.totalIncome > 50000) riskScore += 1;

  // Large deductions increase risk
  if (metrics.totalDeductions > 50000) riskScore += 3;
  else if (metrics.totalDeductions > 25000) riskScore += 2;
  else if (metrics.totalDeductions > 10000) riskScore += 1;

  // Passive losses increase risk
  if (metrics.passiveLoss > 10000) riskScore += 2;
  else if (metrics.passiveLoss > 5000) riskScore += 1;

  // Real estate professional status affects risk
  if (inputs.realEstateProfessional) riskScore -= 1;

  if (riskScore <= 2) return 'low';
  if (riskScore <= 5) return 'medium';
  return 'high';
}

function generateRiskFactors(inputs: RealEstateTaxDeductionsInputs, metrics: RealEstateTaxDeductionsMetrics): string[] {
  const factors: string[] = [];

  if (metrics.totalIncome > 200000) {
    factors.push('High income level increases audit risk');
  }

  if (metrics.totalDeductions > 50000) {
    factors.push('Large deductions may trigger review');
  }

  if (metrics.passiveLoss > 10000) {
    factors.push('Significant passive losses require documentation');
  }

  if (inputs.personalUsePercentage > 0) {
    factors.push('Mixed personal/business use requires allocation');
  }

  if (inputs.bonusDepreciationEligible) {
    factors.push('Bonus depreciation requires proper documentation');
  }

  return factors;
}

function generateKeyDeductions(inputs: RealEstateTaxDeductionsInputs, metrics: RealEstateTaxDeductionsMetrics): string[] {
  const deductions: string[] = [];

  if (metrics.mortgageInterestDeduction > 0) {
    deductions.push(`Mortgage interest deduction: ${metrics.mortgageInterestDeduction.toLocaleString()}`);
  }

  if (metrics.propertyTaxDeduction > 0) {
    deductions.push(`Property tax deduction: ${metrics.propertyTaxDeduction.toLocaleString()}`);
  }

  if (metrics.depreciationDeduction > 0) {
    deductions.push(`Depreciation deduction: ${metrics.depreciationDeduction.toLocaleString()}`);
  }

  if (metrics.operatingExpenseDeduction > 0) {
    deductions.push(`Operating expense deductions: ${metrics.operatingExpenseDeduction.toLocaleString()}`);
  }

  return deductions;
}

function generateTaxSavingsOpportunities(inputs: RealEstateTaxDeductionsInputs, metrics: RealEstateTaxDeductionsMetrics): string[] {
  const opportunities: string[] = [];

  if (!inputs.bonusDepreciationEligible && inputs.improvementsValue > 0) {
    opportunities.push('Consider bonus depreciation for qualifying improvements');
  }

  if (!inputs.section179Eligible && inputs.improvementsValue > 0) {
    opportunities.push('Consider Section 179 deduction for qualifying property');
  }

  if (inputs.personalUsePercentage > 0) {
    opportunities.push('Optimize personal vs. business use allocation');
  }

  if (metrics.passiveLoss > 0) {
    opportunities.push('Consider real estate professional status to avoid passive loss limitations');
  }

  return opportunities;
}

function generateRecommendations(inputs: RealEstateTaxDeductionsInputs, metrics: RealEstateTaxDeductionsMetrics): string[] {
  const recommendations: string[] = [];

  recommendations.push('Maintain detailed records of all expenses');
  recommendations.push('Keep receipts and documentation for all deductions');
  recommendations.push('Consider consulting with a tax professional');
  recommendations.push('Review depreciation methods annually');
  recommendations.push('Monitor passive activity loss limitations');

  if (metrics.auditRisk === 'high') {
    recommendations.push('Consider professional tax preparation');
  }

  return recommendations;
}

function generateComplianceNotes(inputs: RealEstateTaxDeductionsInputs, metrics: RealEstateTaxDeductionsMetrics): string[] {
  const notes: string[] = [];

  notes.push('Ensure all deductions are ordinary and necessary');
  notes.push('Maintain proper documentation for all expenses');
  notes.push('Follow IRS guidelines for depreciation methods');
  notes.push('Comply with passive activity loss rules');

  return notes;
}

function generateDocumentationRequirements(inputs: RealEstateTaxDeductionsInputs, metrics: RealEstateTaxDeductionsMetrics): string[] {
  const requirements: string[] = [];

  requirements.push('Receipts for all expenses');
  requirements.push('Mortgage interest statements (Form 1098)');
  requirements.push('Property tax bills and payment records');
  requirements.push('Depreciation schedules and calculations');
  requirements.push('Records of personal vs. business use');

  if (inputs.bonusDepreciationEligible) {
    requirements.push('Documentation of qualifying property');
  }

  if (inputs.section179Eligible) {
    requirements.push('Section 179 election documentation');
  }

  return requirements;
}