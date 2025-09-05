import { PropertyTaxProrationInputs, PropertyTaxProrationOutputs } from './types';

export function calculatePropertyTaxProration(inputs: PropertyTaxProrationInputs): PropertyTaxProrationOutputs {
  const {
    annualPropertyTax,
    closingDate,
    taxYear,
    paymentSchedule,
    sellerPaidMonths = 0,
    buyerPaidMonths = 0,
    prorationMethod = '365-day',
    sellerCredits = 0,
    buyerCredits = 0,
    specialAssessments = 0
  } = inputs;

  const closingDateObj = new Date(closingDate);
  const yearStart = new Date(taxYear, 0, 1);
  const yearEnd = new Date(taxYear, 11, 31);

  // Calculate total days in year based on method
  let totalDaysInYear: number;
  let daysFromStartOfYear: number;
  let daysRemainingInYear: number;

  if (prorationMethod === '365-day') {
    totalDaysInYear = 365;
    daysFromStartOfYear = Math.floor((closingDateObj.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24));
    daysRemainingInYear = totalDaysInYear - daysFromStartOfYear;
  } else if (prorationMethod === '360-day') {
    totalDaysInYear = 360;
    const monthsFromStart = closingDateObj.getMonth();
    const daysInMonth = closingDateObj.getDate();
    daysFromStartOfYear = (monthsFromStart * 30) + daysInMonth;
    daysRemainingInYear = totalDaysInYear - daysFromStartOfYear;
  } else { // actual-days
    const isLeapYear = (taxYear % 4 === 0 && taxYear % 100 !== 0) || (taxYear % 400 === 0);
    totalDaysInYear = isLeapYear ? 366 : 365;
    daysFromStartOfYear = Math.floor((closingDateObj.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24));
    daysRemainingInYear = totalDaysInYear - daysFromStartOfYear;
  }

  // Calculate daily tax rate
  const dailyRate = annualPropertyTax / totalDaysInYear;

  // Calculate prorations
  const sellerAmount = daysFromStartOfYear * dailyRate;
  const buyerAmount = daysRemainingInYear * dailyRate;

  // Adjust for pre-paid taxes
  const sellerPaidAmount = (sellerPaidMonths / 12) * annualPropertyTax;
  const buyerPaidAmount = (buyerPaidMonths / 12) * annualPropertyTax;

  // Calculate net proration
  const sellerProration = sellerAmount - sellerPaidAmount + sellerCredits;
  const buyerProration = buyerAmount - buyerPaidAmount + buyerCredits;
  const netProration = sellerProration - buyerProration;

  // Determine who owes what
  const sellerOwes = Math.max(0, sellerProration);
  const buyerOwes = Math.max(0, -sellerProration);

  // Calculate next payment information
  const nextPaymentInfo = calculateNextPayment(closingDateObj, paymentSchedule, annualPropertyTax);

  return {
    totalDaysInYear,
    daysFromStartOfYear,
    daysRemainingInYear,
    sellerProration,
    buyerProration,
    netProration,
    sellerOwes,
    buyerOwes,
    breakdown: {
      annualTax: annualPropertyTax,
      dailyRate,
      sellerDays: daysFromStartOfYear,
      buyerDays: daysRemainingInYear,
      sellerAmount,
      buyerAmount,
      specialAssessments
    },
    paymentSchedule: nextPaymentInfo
  };
}

function calculateNextPayment(
  closingDate: Date,
  schedule: string,
  annualTax: number
): { nextPaymentDate: string; nextPaymentAmount: number; remainingPayments: number } {
  const currentYear = closingDate.getFullYear();
  let nextPaymentDate: Date;
  let paymentAmount: number;
  let remainingPayments: number;

  switch (schedule) {
    case 'annual':
      nextPaymentDate = new Date(currentYear + 1, 0, 1);
      paymentAmount = annualTax;
      remainingPayments = 1;
      break;
    case 'semi-annual':
      const currentMonth = closingDate.getMonth();
      if (currentMonth < 6) {
        nextPaymentDate = new Date(currentYear, 5, 1); // June 1st
        remainingPayments = 2;
      } else {
        nextPaymentDate = new Date(currentYear + 1, 0, 1); // January 1st next year
        remainingPayments = 1;
      }
      paymentAmount = annualTax / 2;
      break;
    case 'quarterly':
      const quarter = Math.floor(closingDate.getMonth() / 3);
      const nextQuarter = (quarter + 1) % 4;
      const nextQuarterMonth = nextQuarter * 3;
      if (nextQuarter === 0) {
        nextPaymentDate = new Date(currentYear + 1, 0, 1);
        remainingPayments = 4;
      } else {
        nextPaymentDate = new Date(currentYear, nextQuarterMonth, 1);
        remainingPayments = 4 - quarter;
      }
      paymentAmount = annualTax / 4;
      break;
    case 'monthly':
      const nextMonth = closingDate.getMonth() + 1;
      if (nextMonth === 12) {
        nextPaymentDate = new Date(currentYear + 1, 0, 1);
        remainingPayments = 12;
      } else {
        nextPaymentDate = new Date(currentYear, nextMonth, 1);
        remainingPayments = 12 - closingDate.getMonth();
      }
      paymentAmount = annualTax / 12;
      break;
    default:
      nextPaymentDate = new Date(currentYear + 1, 0, 1);
      paymentAmount = annualTax;
      remainingPayments = 1;
  }

  return {
    nextPaymentDate: nextPaymentDate.toISOString().split('T')[0],
    nextPaymentAmount: paymentAmount,
    remainingPayments
  };
}

export function calculateProrationComparison(
  method1: PropertyTaxProrationOutputs,
  method2: PropertyTaxProrationOutputs
): { difference: number; percentageDifference: number } {
  const difference = method1.netProration - method2.netProration;
  const percentageDifference = method2.netProration !== 0 
    ? (difference / Math.abs(method2.netProration)) * 100 
    : 0;

  return {
    difference,
    percentageDifference
  };
}

export function calculateProrationWithEscrow(
  proration: PropertyTaxProrationOutputs,
  insuranceAmount: number = 0,
  hoaFees: number = 0
): PropertyTaxProrationOutputs {
  const totalMonthlyEscrow = (proration.breakdown.annualTax + insuranceAmount + hoaFees) / 12;
  
  return {
    ...proration,
    paymentSchedule: {
      ...proration.paymentSchedule,
      nextPaymentAmount: totalMonthlyEscrow
    }
  };
}