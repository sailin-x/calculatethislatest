export interface PropertyTaxInputs {
  propertyValue: number;
  assessedValue?: number;
  taxRate: number;
  propertyType: 'residential' | 'commercial' | 'industrial' | 'agricultural' | 'vacant_land';
  homesteadExemption?: number;
  seniorExemption?: number;
  veteranExemption?: number;
  disabilityExemption?: number;
  greenEnergyExemption?: number;
  assessmentRatio?: number;
  paymentFrequency: 'annual' | 'semi_annual' | 'quarterly' | 'monthly';
  escrowIncluded: 'yes' | 'no';
  latePaymentPenalty?: number;
  earlyPaymentDiscount?: number;
  specialAssessments?: number;
  taxYear?: number;
}

export interface PropertyTaxOutputs {
  taxableValue: number;
  annualTaxAmount: number;
  monthlyTaxPayment: number;
  quarterlyTaxPayment: number;
  semiAnnualTaxPayment: number;
  totalExemptions: number;
  exemptionSavings: number;
  effectiveTaxRate: number;
  taxToValueRatio: number;
  latePaymentAmount: number;
  earlyPaymentSavings: number;
  totalAnnualCost: number;
  paymentSchedule: string;
}

/**
 * Calculate property taxes with exemptions and payment schedules
 */
export function calculatePropertyTax(inputs: PropertyTaxInputs): PropertyTaxOutputs {
  const {
    propertyValue,
    assessedValue = propertyValue,
    taxRate,
    propertyType,
    homesteadExemption = 0,
    seniorExemption = 0,
    veteranExemption = 0,
    disabilityExemption = 0,
    greenEnergyExemption = 0,
    assessmentRatio = 100,
    paymentFrequency,
    escrowIncluded,
    latePaymentPenalty = 0,
    earlyPaymentDiscount = 0,
    specialAssessments = 0,
    taxYear = new Date().getFullYear()
  } = inputs;

  // Calculate total exemptions
  const totalExemptions = homesteadExemption + seniorExemption + veteranExemption + 
    disabilityExemption + greenEnergyExemption;

  // Calculate taxable value (assessed value minus exemptions)
  const taxableValue = Math.max(0, assessedValue - totalExemptions);

  // Calculate annual tax amount
  const annualTaxAmount = (taxableValue * (taxRate / 100));

  // Calculate payment amounts based on frequency
  const monthlyTaxPayment = annualTaxAmount / 12;
  const quarterlyTaxPayment = annualTaxAmount / 4;
  const semiAnnualTaxPayment = annualTaxAmount / 2;

  // Calculate exemption savings
  const exemptionSavings = totalExemptions * (taxRate / 100);

  // Calculate effective tax rate (after exemptions)
  const effectiveTaxRate = taxableValue > 0 ? (annualTaxAmount / propertyValue) * 100 : 0;

  // Calculate tax-to-value ratio
  const taxToValueRatio = (annualTaxAmount / propertyValue) * 100;

  // Calculate late payment penalty
  const latePaymentAmount = annualTaxAmount * (latePaymentPenalty / 100);

  // Calculate early payment savings
  const earlyPaymentSavings = annualTaxAmount * (earlyPaymentDiscount / 100);

  // Calculate total annual cost
  const totalAnnualCost = annualTaxAmount + specialAssessments;

  // Generate payment schedule
  const paymentSchedule = generatePaymentSchedule(
    paymentFrequency,
    annualTaxAmount,
    specialAssessments,
    taxYear
  );

  return {
    taxableValue,
    annualTaxAmount,
    monthlyTaxPayment,
    quarterlyTaxPayment,
    semiAnnualTaxPayment,
    totalExemptions,
    exemptionSavings,
    effectiveTaxRate,
    taxToValueRatio,
    latePaymentAmount,
    earlyPaymentSavings,
    totalAnnualCost,
    paymentSchedule
  };
}

/**
 * Generate payment schedule based on frequency
 */
function generatePaymentSchedule(
  frequency: string,
  annualTaxAmount: number,
  specialAssessments: number,
  taxYear: number
): string {
  const totalAmount = annualTaxAmount + specialAssessments;
  
  switch (frequency) {
    case 'annual':
      return `Annual payment of $${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} due by December 31st, ${taxYear}`;
    
    case 'semi_annual':
      const semiAmount = totalAmount / 2;
      return `Semi-annual payments of $${semiAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} due June 30th and December 31st, ${taxYear}`;
    
    case 'quarterly':
      const quarterAmount = totalAmount / 4;
      return `Quarterly payments of $${quarterAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} due March 31st, June 30th, September 30th, December 31st, ${taxYear}`;
    
    case 'monthly':
      const monthlyAmount = totalAmount / 12;
      return `Monthly payments of $${monthlyAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} due by the 1st of each month in ${taxYear}`;
    
    default:
      return `Payment schedule for ${frequency} frequency`;
  }
}

/**
 * Calculate years between two dates
 */
export function calculateYearsBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
}

/**
 * Calculate months between two dates
 */
export function calculateMonthsBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

/**
 * Generate analysis of property tax calculation
 */
export function generateAnalysis(
  inputs: PropertyTaxInputs,
  outputs: PropertyTaxOutputs
): string {
  const {
    propertyValue,
    taxRate,
    propertyType,
    paymentFrequency,
    escrowIncluded
  } = inputs;

  const {
    annualTaxAmount,
    exemptionSavings,
    effectiveTaxRate,
    taxToValueRatio,
    totalExemptions
  } = outputs;

  let analysis = `## Property Tax Analysis for ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} Property\n\n`;
  
  analysis += `**Property Value:** $${propertyValue.toLocaleString()}\n`;
  analysis += `**Tax Rate:** ${taxRate}%\n`;
  analysis += `**Annual Tax:** $${annualTaxAmount.toLocaleString()}\n\n`;

  if (totalExemptions > 0) {
    analysis += `**Exemptions Applied:** $${totalExemptions.toLocaleString()}\n`;
    analysis += `**Tax Savings:** $${exemptionSavings.toLocaleString()}\n`;
    analysis += `**Effective Tax Rate:** ${effectiveTaxRate.toFixed(2)}%\n\n`;
  }

  analysis += `**Tax-to-Value Ratio:** ${taxToValueRatio.toFixed(2)}%\n`;
  analysis += `**Payment Frequency:** ${paymentFrequency.replace('_', ' ')}\n`;
  analysis += `**Escrow:** ${escrowIncluded === 'yes' ? 'Included' : 'Not included'}\n\n`;

  // Add recommendations
  analysis += `## Recommendations\n\n`;
  
  if (effectiveTaxRate > taxRate) {
    analysis += `- Consider applying for additional exemptions to reduce your effective tax rate\n`;
  }
  
  if (taxToValueRatio > 2) {
    analysis += `- Your tax-to-value ratio is high. Consider appealing your property assessment\n`;
  }
  
  if (escrowIncluded === 'no') {
    analysis += `- Consider setting up escrow to avoid late payment penalties\n`;
  }

  return analysis;
}