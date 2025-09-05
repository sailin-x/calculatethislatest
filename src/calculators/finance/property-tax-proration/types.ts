export interface PropertyTaxProrationInputs {
  annualPropertyTax: number;
  closingDate: string;
  taxYear: number;
  paymentSchedule: 'annual' | 'semi-annual' | 'quarterly' | 'monthly';
  sellerPaidMonths?: number;
  buyerPaidMonths?: number;
  prorationMethod: '365-day' | '360-day' | 'actual-days';
  sellerCredits?: number;
  buyerCredits?: number;
  specialAssessments?: number;
}

export interface PropertyTaxProrationOutputs {
  totalDaysInYear: number;
  daysFromStartOfYear: number;
  daysRemainingInYear: number;
  sellerProration: number;
  buyerProration: number;
  netProration: number;
  sellerOwes: number;
  buyerOwes: number;
  breakdown: {
    annualTax: number;
    dailyRate: number;
    sellerDays: number;
    buyerDays: number;
    sellerAmount: number;
    buyerAmount: number;
    specialAssessments: number;
  };
  paymentSchedule: {
    nextPaymentDate: string;
    nextPaymentAmount: number;
    remainingPayments: number;
  };
}

export interface PropertyTaxProrationValidation {
  annualPropertyTax: boolean;
  closingDate: boolean;
  taxYear: boolean;
  paymentSchedule: boolean;
  sellerPaidMonths: boolean;
  buyerPaidMonths: boolean;
  prorationMethod: boolean;
  sellerCredits: boolean;
  buyerCredits: boolean;
  specialAssessments: boolean;
}