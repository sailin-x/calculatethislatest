import { RealEstateDepreciationScheduleInputs, RealEstateDepreciationScheduleOutputs } from './types';

export function calculateRealEstateDepreciationSchedule(inputs: RealEstateDepreciationScheduleInputs): RealEstateDepreciationScheduleOutputs {
  const {
    propertyCost,
    landValue,
    placedInServiceDate,
    propertyType,
    depreciationMethod,
    bonusDepreciationPercentage,
    section179Deduction,
    costSegregation,
    costSegregationAmount,
    costSegregationBreakdown,
    taxYear,
    disposalDate,
    disposalValue,
    recaptureRate
  } = inputs;

  // Calculate depreciable basis
  const depreciableBasis = propertyCost - landValue;

  // Calculate bonus depreciation
  const bonusDepreciation = calculateBonusDepreciation(
    depreciableBasis,
    bonusDepreciationPercentage,
    placedInServiceDate
  );

  // Calculate Section 179 deduction
  const section179 = calculateSection179Deduction(
    section179Deduction,
    depreciableBasis,
    placedInServiceDate
  );

  // Calculate cost segregation depreciation
  const costSegregationDepreciation = calculateCostSegregationDepreciation(
    costSegregation,
    costSegregationAmount,
    costSegregationBreakdown,
    placedInServiceDate
  );

  // Calculate remaining basis after bonus depreciation and Section 179
  const remainingBasis = depreciableBasis - bonusDepreciation.amount - section179.amount;

  // Calculate annual depreciation schedule
  const depreciationSchedule = calculateDepreciationSchedule(
    remainingBasis,
    propertyType,
    depreciationMethod,
    placedInServiceDate,
    disposalDate
  );

  // Calculate accumulated depreciation
  const accumulatedDepreciation = depreciationSchedule.reduce(
    (sum, year) => sum + year.depreciation, 0
  ) + bonusDepreciation.amount + section179.amount;

  // Calculate tax savings
  const taxSavings = calculateTaxSavings(depreciationSchedule, bonusDepreciation.amount, section179.amount);

  // Calculate disposal analysis
  const disposalAnalysis = calculateDisposalAnalysis(
    propertyCost,
    landValue,
    accumulatedDepreciation,
    disposalValue,
    recaptureRate
  );

  // Calculate summary
  const summary = calculateSummary(
    accumulatedDepreciation,
    depreciationSchedule.length,
    taxSavings.total
  );

  return {
    depreciableBasis,
    annualDepreciation: depreciationSchedule[0]?.depreciation || 0,
    accumulatedDepreciation,
    remainingBasis,
    depreciationSchedule,
    bonusDepreciation,
    section179Deduction: section179,
    costSegregation: costSegregationDepreciation,
    taxSavings,
    disposalAnalysis,
    summary
  };
}

function calculateBonusDepreciation(
  basis: number,
  percentage: number,
  placedInServiceDate: string
): { amount: number; percentage: number } {
  const placedInService = new Date(placedInServiceDate);
  const currentYear = new Date().getFullYear();
  
  // Bonus depreciation rules (simplified)
  let eligiblePercentage = 0;
  if (placedInService.getFullYear() >= currentYear - 1) {
    eligiblePercentage = Math.min(percentage, 100);
  }
  
  return {
    amount: basis * (eligiblePercentage / 100),
    percentage: eligiblePercentage
  };
}

function calculateSection179Deduction(
  deduction: number,
  basis: number,
  placedInServiceDate: string
): { amount: number; eligible: boolean } {
  const placedInService = new Date(placedInServiceDate);
  const currentYear = new Date().getFullYear();
  
  // Section 179 eligibility (simplified)
  const eligible = placedInService.getFullYear() >= currentYear - 1;
  const maxDeduction = Math.min(deduction, basis, 1080000); // 2023 limit
  
  return {
    amount: eligible ? maxDeduction : 0,
    eligible
  };
}

function calculateCostSegregationDepreciation(
  enabled: boolean,
  amount: number,
  breakdown: any,
  placedInServiceDate: string
): any {
  if (!enabled) {
    return {
      totalAmount: 0,
      breakdown: {
        fiveYear: 0,
        sevenYear: 0,
        fifteenYear: 0,
        twentySevenPointFiveYear: 0,
        thirtyNineYear: 0
      },
      annualDepreciation: {
        fiveYear: 0,
        sevenYear: 0,
        fifteenYear: 0,
        twentySevenPointFiveYear: 0,
        thirtyNineYear: 0
      }
    };
  }

  // Calculate annual depreciation for each category
  const annualDepreciation = {
    fiveYear: breakdown.fiveYear * 0.20, // 5-year MACRS
    sevenYear: breakdown.sevenYear * 0.1429, // 7-year MACRS
    fifteenYear: breakdown.fifteenYear * 0.0667, // 15-year MACRS
    twentySevenPointFiveYear: breakdown.twentySevenPointFiveYear * 0.0364, // 27.5-year MACRS
    thirtyNineYear: breakdown.thirtyNineYear * 0.0256 // 39-year MACRS
  };

  return {
    totalAmount: amount,
    breakdown,
    annualDepreciation
  };
}

function calculateDepreciationSchedule(
  basis: number,
  propertyType: string,
  method: string,
  placedInServiceDate: string,
  disposalDate?: string
): Array<{
  year: number;
  beginningBasis: number;
  depreciation: number;
  accumulatedDepreciation: number;
  endingBasis: number;
}> {
  const placedInService = new Date(placedInServiceDate);
  const disposal = disposalDate ? new Date(disposalDate) : null;
  const currentYear = new Date().getFullYear();
  
  // Determine depreciation period
  let depreciationPeriod: number;
  if (propertyType === 'residential') {
    depreciationPeriod = 27.5;
  } else {
    depreciationPeriod = 39;
  }
  
  // Calculate annual depreciation rate
  let annualRate: number;
  if (method === 'straight-line') {
    annualRate = 1 / depreciationPeriod;
  } else if (method === 'accelerated') {
    // MACRS accelerated method
    annualRate = 1 / depreciationPeriod * 1.5; // Simplified
  } else {
    annualRate = 1 / depreciationPeriod;
  }
  
  const schedule: Array<{
    year: number;
    beginningBasis: number;
    depreciation: number;
    accumulatedDepreciation: number;
    endingBasis: number;
  }> = [];
  
  let remainingBasis = basis;
  let accumulatedDepreciation = 0;
  let year = 1;
  
  while (remainingBasis > 0 && year <= depreciationPeriod) {
    const beginningBasis = remainingBasis;
    const depreciation = Math.min(remainingBasis * annualRate, remainingBasis);
    
    accumulatedDepreciation += depreciation;
    remainingBasis -= depreciation;
    
    schedule.push({
      year,
      beginningBasis,
      depreciation,
      accumulatedDepreciation,
      endingBasis: remainingBasis
    });
    
    year++;
  }
  
  return schedule;
}

function calculateTaxSavings(
  schedule: Array<{ depreciation: number }>,
  bonusDepreciation: number,
  section179: number
): {
  year1: number;
  year2: number;
  year3: number;
  year4: number;
  year5: number;
  total: number;
} {
  const taxRate = 0.25; // Assume 25% tax rate
  
  const year1 = (schedule[0]?.depreciation || 0 + bonusDepreciation + section179) * taxRate;
  const year2 = (schedule[1]?.depreciation || 0) * taxRate;
  const year3 = (schedule[2]?.depreciation || 0) * taxRate;
  const year4 = (schedule[3]?.depreciation || 0) * taxRate;
  const year5 = (schedule[4]?.depreciation || 0) * taxRate;
  
  const total = year1 + year2 + year3 + year4 + year5;
  
  return {
    year1,
    year2,
    year3,
    year4,
    year5,
    total
  };
}

function calculateDisposalAnalysis(
  propertyCost: number,
  landValue: number,
  accumulatedDepreciation: number,
  disposalValue?: number,
  recaptureRate?: number
): {
  gainOrLoss: number;
  recaptureAmount: number;
  capitalGain: number;
  totalTax: number;
} {
  if (!disposalValue) {
    return {
      gainOrLoss: 0,
      recaptureAmount: 0,
      capitalGain: 0,
      totalTax: 0
    };
  }
  
  const adjustedBasis = propertyCost - accumulatedDepreciation;
  const gainOrLoss = disposalValue - adjustedBasis;
  
  const recaptureAmount = Math.min(gainOrLoss, accumulatedDepreciation);
  const capitalGain = Math.max(0, gainOrLoss - recaptureAmount);
  
  const recaptureTax = recaptureAmount * (recaptureRate || 0.25);
  const capitalGainTax = capitalGain * 0.20; // Long-term capital gains rate
  const totalTax = recaptureTax + capitalGainTax;
  
  return {
    gainOrLoss,
    recaptureAmount,
    capitalGain,
    totalTax
  };
}

function calculateSummary(
  totalDepreciation: number,
  depreciationPeriod: number,
  totalTaxSavings: number
): {
  totalDepreciation: number;
  averageAnnualDepreciation: number;
  depreciationPeriod: number;
  effectiveTaxRate: number;
} {
  return {
    totalDepreciation,
    averageAnnualDepreciation: totalDepreciation / depreciationPeriod,
    depreciationPeriod,
    effectiveTaxRate: totalTaxSavings / totalDepreciation
  };
}