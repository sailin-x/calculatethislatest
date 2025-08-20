export interface RealEstateTaxDeductionsInputs {
  propertyType: string;
  purchasePrice: number;
  landValue: number;
  improvements: number;
  acquisitionDate: string;
  placedInServiceDate: string;
  annualRentalIncome: number;
  operatingExpenses: number;
  propertyTaxes: number;
  insurance: number;
  mortgageInterest: number;
  managementFees: number;
  repairs: number;
  utilities: number;
  advertising: number;
  legalFees: number;
  travelExpenses: number;
  otherExpenses: number;
  personalUseDays: number;
  rentalDays: number;
  taxYear: number;
  filingStatus: string;
  adjustedGrossIncome: number;
  otherPassiveIncome: number;
  materialParticipation: string;
  realEstateProfessional: string;
}

export interface RealEstateTaxDeductionsOutputs {
  depreciableBasis: number;
  annualDepreciation: number;
  totalExpenses: number;
  netRentalIncome: number;
  passiveLoss: number;
  deductibleLoss: number;
  suspendedLoss: number;
  taxSavings: number;
  effectiveTaxRate: number;
  cashFlowAfterTax: number;
  depreciationRecapture: number;
  section179Deduction: number;
}

export function calculateRealEstateTaxDeductions(inputs: RealEstateTaxDeductionsInputs): RealEstateTaxDeductionsOutputs {
  // Calculate depreciable basis
  const depreciableBasis = inputs.purchasePrice - inputs.landValue + inputs.improvements;
  
  // Calculate annual depreciation
  const annualDepreciation = calculateDepreciation(depreciableBasis, inputs.propertyType, inputs.placedInServiceDate, inputs.taxYear);
  
  // Calculate total expenses
  const totalExpenses = calculateTotalExpenses(inputs);
  
  // Calculate rental use percentage
  const totalDays = inputs.personalUseDays + inputs.rentalDays;
  const rentalUsePercentage = totalDays > 0 ? inputs.rentalDays / totalDays : 1;
  
  // Calculate net rental income
  const netRentalIncome = (inputs.annualRentalIncome - totalExpenses - annualDepreciation) * rentalUsePercentage;
  
  // Calculate passive activity loss
  const passiveLoss = calculatePassiveLoss(netRentalIncome, inputs);
  
  // Calculate deductible and suspended losses
  const { deductibleLoss, suspendedLoss } = calculateLossLimitations(passiveLoss, inputs);
  
  // Calculate tax savings
  const taxSavings = calculateTaxSavings(deductibleLoss, inputs);
  
  // Calculate effective tax rate
  const effectiveTaxRate = calculateEffectiveTaxRate(inputs, deductibleLoss);
  
  // Calculate cash flow after tax
  const cashFlowAfterTax = netRentalIncome + taxSavings;
  
  // Calculate depreciation recapture
  const depreciationRecapture = calculateDepreciationRecapture(annualDepreciation, inputs.propertyType);
  
  // Calculate Section 179 deduction
  const section179Deduction = calculateSection179Deduction(inputs.improvements, inputs.propertyType);
  
  return {
    depreciableBasis,
    annualDepreciation,
    totalExpenses,
    netRentalIncome,
    passiveLoss,
    deductibleLoss,
    suspendedLoss,
    taxSavings,
    effectiveTaxRate,
    cashFlowAfterTax,
    depreciationRecapture,
    section179Deduction
  };
}

function calculateDepreciation(basis: number, propertyType: string, placedInServiceDate: string, taxYear: number): number {
  let recoveryPeriod = 27.5; // Default for residential
  let convention = 'mid_month';
  
  // Set recovery period based on property type
  switch (propertyType) {
    case 'residential':
      recoveryPeriod = 27.5;
      break;
    case 'commercial':
      recoveryPeriod = 39;
      break;
    case 'mixed_use':
      recoveryPeriod = 27.5; // Assume residential portion
      break;
    case 'vacation_rental':
      recoveryPeriod = 27.5;
      break;
    case 'short_term_rental':
      recoveryPeriod = 27.5;
      break;
    case 'land':
      return 0; // Land is not depreciable
    default:
      recoveryPeriod = 27.5;
  }
  
  // Calculate first year convention
  const placedInService = new Date(placedInServiceDate);
  const placedInServiceYear = placedInService.getFullYear();
  const placedInServiceMonth = placedInService.getMonth() + 1; // 1-based month
  
  let conventionMultiplier = 1;
  
  if (convention === 'mid_month') {
    // Mid-month convention: property placed in service in middle of month
    if (placedInServiceYear === taxYear) {
      conventionMultiplier = (12.5 - placedInServiceMonth) / 12;
    }
  }
  
  // Calculate annual depreciation
  const annualDepreciation = (basis / recoveryPeriod) * conventionMultiplier;
  
  return Math.max(0, annualDepreciation);
}

function calculateTotalExpenses(inputs: RealEstateTaxDeductionsInputs): number {
  return inputs.operatingExpenses +
         inputs.propertyTaxes +
         inputs.insurance +
         inputs.mortgageInterest +
         inputs.managementFees +
         inputs.repairs +
         inputs.utilities +
         inputs.advertising +
         inputs.legalFees +
         inputs.travelExpenses +
         inputs.otherExpenses;
}

function calculatePassiveLoss(netRentalIncome: number, inputs: RealEstateTaxDeductionsInputs): number {
  // If materially participating or real estate professional, not passive
  if (inputs.materialParticipation === 'yes' || inputs.realEstateProfessional === 'yes') {
    return 0; // Not a passive activity
  }
  
  // If net rental income is positive, no passive loss
  if (netRentalIncome >= 0) {
    return 0;
  }
  
  // Net rental income is negative, so it's a passive loss
  return netRentalIncome;
}

function calculateLossLimitations(passiveLoss: number, inputs: RealEstateTaxDeductionsInputs): { deductibleLoss: number; suspendedLoss: number } {
  // If materially participating or real estate professional, losses are deductible
  if (inputs.materialParticipation === 'yes' || inputs.realEstateProfessional === 'yes') {
    return {
      deductibleLoss: Math.min(0, passiveLoss), // Loss is deductible
      suspendedLoss: 0
    };
  }
  
  // For passive activities, losses are generally suspended
  if (passiveLoss < 0) {
    return {
      deductibleLoss: 0,
      suspendedLoss: Math.abs(passiveLoss)
    };
  }
  
  return {
    deductibleLoss: 0,
    suspendedLoss: 0
  };
}

function calculateTaxSavings(deductibleLoss: number, inputs: RealEstateTaxDeductionsInputs): number {
  if (deductibleLoss >= 0) {
    return 0; // No loss to deduct
  }
  
  // Calculate marginal tax rate based on filing status and income
  const marginalTaxRate = calculateMarginalTaxRate(inputs.filingStatus, inputs.adjustedGrossIncome);
  
  // Tax savings = loss amount * marginal tax rate
  return Math.abs(deductibleLoss) * marginalTaxRate;
}

function calculateMarginalTaxRate(filingStatus: string, adjustedGrossIncome: number): number {
  // 2024 tax brackets (simplified)
  const brackets = {
    single: [
      { threshold: 0, rate: 0.10 },
      { threshold: 11600, rate: 0.12 },
      { threshold: 47150, rate: 0.22 },
      { threshold: 100525, rate: 0.24 },
      { threshold: 191950, rate: 0.32 },
      { threshold: 243725, rate: 0.35 },
      { threshold: 609350, rate: 0.37 }
    ],
    married_joint: [
      { threshold: 0, rate: 0.10 },
      { threshold: 23200, rate: 0.12 },
      { threshold: 94300, rate: 0.22 },
      { threshold: 201050, rate: 0.24 },
      { threshold: 383900, rate: 0.32 },
      { threshold: 487450, rate: 0.35 },
      { threshold: 731200, rate: 0.37 }
    ],
    married_separate: [
      { threshold: 0, rate: 0.10 },
      { threshold: 11600, rate: 0.12 },
      { threshold: 47150, rate: 0.22 },
      { threshold: 100525, rate: 0.24 },
      { threshold: 191950, rate: 0.32 },
      { threshold: 243725, rate: 0.35 },
      { threshold: 365600, rate: 0.37 }
    ],
    head_of_household: [
      { threshold: 0, rate: 0.10 },
      { threshold: 16550, rate: 0.12 },
      { threshold: 63100, rate: 0.22 },
      { threshold: 100500, rate: 0.24 },
      { threshold: 191950, rate: 0.32 },
      { threshold: 243700, rate: 0.35 },
      { threshold: 609350, rate: 0.37 }
    ],
    qualifying_widow: [
      { threshold: 0, rate: 0.10 },
      { threshold: 23200, rate: 0.12 },
      { threshold: 94300, rate: 0.22 },
      { threshold: 201050, rate: 0.24 },
      { threshold: 383900, rate: 0.32 },
      { threshold: 487450, rate: 0.35 },
      { threshold: 731200, rate: 0.37 }
    ]
  };
  
  const statusBrackets = brackets[filingStatus as keyof typeof brackets] || brackets.single;
  
  // Find the applicable bracket
  for (let i = statusBrackets.length - 1; i >= 0; i--) {
    if (adjustedGrossIncome >= statusBrackets[i].threshold) {
      return statusBrackets[i].rate;
    }
  }
  
  return 0.10; // Default to lowest bracket
}

function calculateEffectiveTaxRate(inputs: RealEstateTaxDeductionsInputs, deductibleLoss: number): number {
  const originalTax = inputs.adjustedGrossIncome * calculateMarginalTaxRate(inputs.filingStatus, inputs.adjustedGrossIncome);
  const newTaxableIncome = Math.max(0, inputs.adjustedGrossIncome + deductibleLoss);
  const newTax = newTaxableIncome * calculateMarginalTaxRate(inputs.filingStatus, newTaxableIncome);
  
  if (inputs.adjustedGrossIncome <= 0) {
    return 0;
  }
  
  return newTax / inputs.adjustedGrossIncome;
}

function calculateDepreciationRecapture(annualDepreciation: number, propertyType: string): number {
  // For residential rental property, depreciation recapture is taxed at 25%
  // For commercial property, it's also 25%
  // This is a simplified calculation - actual recapture depends on sale price and basis
  return annualDepreciation;
}

function calculateSection179Deduction(improvements: number, propertyType: string): number {
  // Section 179 deduction is generally not available for real estate
  // However, certain improvements may qualify (e.g., HVAC, security systems)
  // This is a simplified calculation
  if (propertyType === 'commercial' && improvements > 0) {
    // Assume 10% of improvements qualify for Section 179
    return Math.min(improvements * 0.1, 1000000); // 2024 limit is $1,000,000
  }
  
  return 0;
}

export function calculateYearsBetween(startDate: Date, endDate: Date): number {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return timeDiff / (1000 * 3600 * 24 * 365.25);
}

export function calculateMonthsBetween(startDate: Date, endDate: Date): number {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return timeDiff / (1000 * 3600 * 24 * 30.44);
}

export function generateTaxDeductionAnalysis(inputs: RealEstateTaxDeductionsInputs, outputs: RealEstateTaxDeductionsOutputs): string {
  const analysis = [];
  
  analysis.push(`## Real Estate Tax Deduction Analysis`);
  analysis.push(``);
  analysis.push(`### Property Overview`);
  analysis.push(`- **Property Type**: ${inputs.propertyType.replace('_', ' ').toUpperCase()}`);
  analysis.push(`- **Purchase Price**: $${inputs.purchasePrice.toLocaleString()}`);
  analysis.push(`- **Depreciable Basis**: $${outputs.depreciableBasis.toLocaleString()}`);
  analysis.push(`- **Annual Depreciation**: $${outputs.annualDepreciation.toLocaleString()}`);
  analysis.push(``);
  
  analysis.push(`### Income & Expenses`);
  analysis.push(`- **Annual Rental Income**: $${inputs.annualRentalIncome.toLocaleString()}`);
  analysis.push(`- **Total Expenses**: $${outputs.totalExpenses.toLocaleString()}`);
  analysis.push(`- **Net Rental Income**: $${outputs.netRentalIncome.toLocaleString()}`);
  analysis.push(``);
  
  analysis.push(`### Tax Treatment`);
  analysis.push(`- **Passive Activity**: ${inputs.materialParticipation === 'yes' ? 'No' : 'Yes'}`);
  analysis.push(`- **Real Estate Professional**: ${inputs.realEstateProfessional === 'yes' ? 'Yes' : 'No'}`);
  analysis.push(`- **Passive Loss**: $${outputs.passiveLoss.toLocaleString()}`);
  analysis.push(`- **Deductible Loss**: $${outputs.deductibleLoss.toLocaleString()}`);
  analysis.push(`- **Suspended Loss**: $${outputs.suspendedLoss.toLocaleString()}`);
  analysis.push(``);
  
  analysis.push(`### Tax Benefits`);
  analysis.push(`- **Tax Savings**: $${outputs.taxSavings.toLocaleString()}`);
  analysis.push(`- **Effective Tax Rate**: ${(outputs.effectiveTaxRate * 100).toFixed(1)}%`);
  analysis.push(`- **Cash Flow After Tax**: $${outputs.cashFlowAfterTax.toLocaleString()}`);
  analysis.push(`- **Section 179 Deduction**: $${outputs.section179Deduction.toLocaleString()}`);
  
  return analysis.join('\n');
}