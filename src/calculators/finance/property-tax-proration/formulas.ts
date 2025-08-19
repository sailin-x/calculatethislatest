export interface PropertyTaxProrationInputs {
  annualPropertyTax: number;
  closingDate: string;
  taxYear: number;
  taxPaymentSchedule: 'annual' | 'semi_annual' | 'quarterly' | 'monthly';
  prorationMethod: '365_day' | '360_day' | 'actual_days';
  sellerPaidTaxes?: number;
  taxPaymentDates?: string;
  assessmentDate?: string;
  propertyValue?: number;
  taxRate?: number;
  exemptions?: number;
  specialAssessments?: number;
  escrowAccount?: 'yes' | 'no';
  latePaymentPenalty?: number;
  calculationType: 'basic' | 'detailed' | 'escrow';
}

export interface PropertyTaxProrationOutputs {
  sellerCredit: number;
  buyerDebit: number;
  sellerDays: number;
  buyerDays: number;
  dailyTaxRate: number;
  sellerTaxObligation: number;
  buyerTaxObligation: number;
  netProration: number;
  nextTaxPayment: number;
  nextPaymentDate: string;
  escrowMonthlyPayment: number;
  prorationSummary: string;
}

/**
 * Calculate prorated property taxes for real estate transactions
 */
export function calculatePropertyTaxProration(inputs: PropertyTaxProrationInputs): PropertyTaxProrationOutputs {
  const {
    annualPropertyTax,
    closingDate,
    taxYear,
    taxPaymentSchedule,
    prorationMethod,
    sellerPaidTaxes = 0,
    taxPaymentDates = '',
    assessmentDate,
    propertyValue,
    taxRate,
    exemptions = 0,
    specialAssessments = 0,
    escrowAccount = 'yes',
    latePaymentPenalty = 0,
    calculationType
  } = inputs;

  // Calculate total days in the year based on proration method
  const totalDaysInYear = getTotalDaysInYear(prorationMethod, taxYear);

  // Calculate daily tax rate
  const dailyTaxRate = annualPropertyTax / totalDaysInYear;

  // Calculate seller and buyer days
  const sellerDays = calculateSellerDays(closingDate, taxYear, prorationMethod);
  const buyerDays = totalDaysInYear - sellerDays;

  // Calculate tax obligations
  const sellerTaxObligation = sellerDays * dailyTaxRate;
  const buyerTaxObligation = buyerDays * dailyTaxRate;

  // Calculate seller credit (amount seller should be credited)
  const sellerCredit = sellerTaxObligation - sellerPaidTaxes;

  // Calculate buyer debit (amount buyer should be debited)
  const buyerDebit = buyerTaxObligation;

  // Calculate net proration
  const netProration = sellerCredit;

  // Calculate next tax payment and date
  const { nextTaxPayment, nextPaymentDate } = calculateNextTaxPayment(
    annualPropertyTax,
    taxPaymentSchedule,
    closingDate,
    taxYear,
    taxPaymentDates
  );

  // Calculate monthly escrow payment
  const escrowMonthlyPayment = escrowAccount === 'yes' ? annualPropertyTax / 12 : 0;

  // Generate proration summary
  const prorationSummary = generateProrationSummary(
    sellerDays,
    buyerDays,
    dailyTaxRate,
    sellerCredit,
    buyerDebit,
    sellerPaidTaxes,
    escrowMonthlyPayment
  );

  return {
    sellerCredit,
    buyerDebit,
    sellerDays,
    buyerDays,
    dailyTaxRate,
    sellerTaxObligation,
    buyerTaxObligation,
    netProration,
    nextTaxPayment,
    nextPaymentDate,
    escrowMonthlyPayment,
    prorationSummary
  };
}

/**
 * Get total days in year based on proration method
 */
function getTotalDaysInYear(method: string, year: number): number {
  switch (method) {
    case '365_day':
      return 365;
    case '360_day':
      return 360;
    case 'actual_days':
      return isLeapYear(year) ? 366 : 365;
    default:
      return 365;
  }
}

/**
 * Check if year is a leap year
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Calculate seller days (days seller owned the property)
 */
function calculateSellerDays(closingDate: string, taxYear: number, prorationMethod: string): number {
  const closing = new Date(closingDate);
  const yearStart = new Date(taxYear, 0, 1); // January 1st of tax year
  
  // Calculate days from year start to closing date
  const timeDiff = closing.getTime() - yearStart.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  return Math.max(0, daysDiff);
}

/**
 * Calculate next tax payment amount and date
 */
function calculateNextTaxPayment(
  annualPropertyTax: number,
  taxPaymentSchedule: string,
  closingDate: string,
  taxYear: number,
  taxPaymentDates: string
): { nextTaxPayment: number; nextPaymentDate: string } {
  const closing = new Date(closingDate);
  
  // Parse tax payment dates if provided
  if (taxPaymentDates) {
    const dates = taxPaymentDates.split(',').map(date => date.trim());
    const paymentDates = dates.map(date => new Date(date));
    
    // Find the next payment date after closing
    const nextPayment = paymentDates.find(date => date > closing);
    if (nextPayment) {
      const paymentAmount = annualPropertyTax / paymentDates.length;
      return {
        nextTaxPayment: paymentAmount,
        nextPaymentDate: nextPayment.toISOString().split('T')[0]
      };
    }
  }
  
  // Default calculations based on payment schedule
  switch (taxPaymentSchedule) {
    case 'annual':
      return {
        nextTaxPayment: annualPropertyTax,
        nextPaymentDate: `${taxYear + 1}-04-15`
      };
    case 'semi_annual':
      return {
        nextTaxPayment: annualPropertyTax / 2,
        nextPaymentDate: `${taxYear}-10-15`
      };
    case 'quarterly':
      return {
        nextTaxPayment: annualPropertyTax / 4,
        nextPaymentDate: `${taxYear}-12-31`
      };
    case 'monthly':
      return {
        nextTaxPayment: annualPropertyTax / 12,
        nextPaymentDate: `${taxYear}-${String(closing.getMonth() + 2).padStart(2, '0')}-01`
      };
    default:
      return {
        nextTaxPayment: annualPropertyTax,
        nextPaymentDate: `${taxYear + 1}-04-15`
      };
  }
}

/**
 * Generate proration summary
 */
function generateProrationSummary(
  sellerDays: number,
  buyerDays: number,
  dailyTaxRate: number,
  sellerCredit: number,
  buyerDebit: number,
  sellerPaidTaxes: number,
  escrowMonthlyPayment: number
): string {
  let summary = `**Proration Summary:**\n`;
  summary += `- Seller owned property for ${sellerDays} days\n`;
  summary += `- Buyer will own property for ${buyerDays} days\n`;
  summary += `- Daily tax rate: $${dailyTaxRate.toFixed(2)}\n`;
  summary += `- Seller credit: $${sellerCredit.toFixed(2)}\n`;
  summary += `- Buyer debit: $${buyerDebit.toFixed(2)}\n`;
  
  if (sellerPaidTaxes > 0) {
    summary += `- Seller already paid $${sellerPaidTaxes.toFixed(2)}\n`;
  }
  
  if (escrowMonthlyPayment > 0) {
    summary += `- Monthly escrow payment: $${escrowMonthlyPayment.toFixed(2)}\n`;
  }
  
  return summary;
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
 * Calculate days between two dates
 */
export function calculateDaysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end.getTime() - start.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

/**
 * Generate analysis of property tax proration calculation
 */
export function generateAnalysis(
  inputs: PropertyTaxProrationInputs,
  outputs: PropertyTaxProrationOutputs
): string {
  const {
    annualPropertyTax,
    closingDate,
    taxYear,
    taxPaymentSchedule,
    prorationMethod,
    sellerPaidTaxes,
    escrowAccount
  } = inputs;

  const {
    sellerCredit,
    buyerDebit,
    sellerDays,
    buyerDays,
    dailyTaxRate,
    netProration,
    escrowMonthlyPayment
  } = outputs;

  let analysis = `## Property Tax Proration Analysis\n\n`;
  
  analysis += `**Annual Property Tax:** $${annualPropertyTax.toLocaleString()}\n`;
  analysis += `**Closing Date:** ${closingDate}\n`;
  analysis += `**Tax Year:** ${taxYear}\n`;
  analysis += `**Payment Schedule:** ${taxPaymentSchedule.replace('_', ' ')}\n`;
  analysis += `**Proration Method:** ${prorationMethod.replace('_', ' ')}\n\n`;

  analysis += `**Seller Days:** ${sellerDays}\n`;
  analysis += `**Buyer Days:** ${buyerDays}\n`;
  analysis += `**Daily Tax Rate:** $${dailyTaxRate.toFixed(2)}\n\n`;

  analysis += `**Seller Credit:** $${sellerCredit.toFixed(2)}\n`;
  analysis += `**Buyer Debit:** $${buyerDebit.toFixed(2)}\n`;
  analysis += `**Net Proration:** $${netProration.toFixed(2)}\n\n`;

  if (sellerPaidTaxes && sellerPaidTaxes > 0) {
    analysis += `**Seller Paid Taxes:** $${sellerPaidTaxes.toFixed(2)}\n`;
  }

  if (escrowAccount === 'yes') {
    analysis += `**Monthly Escrow Payment:** $${escrowMonthlyPayment.toFixed(2)}\n`;
  }

  analysis += `\n## Recommendations\n\n`;
  
  if (sellerCredit > 0) {
    analysis += `- Seller should be credited $${sellerCredit.toFixed(2)} at closing\n`;
  }
  
  if (buyerDebit > 0) {
    analysis += `- Buyer should be debited $${buyerDebit.toFixed(2)} at closing\n`;
  }
  
  if (escrowAccount === 'yes') {
    analysis += `- Set up monthly escrow payment of $${escrowMonthlyPayment.toFixed(2)}\n`;
  }

  return analysis;
}