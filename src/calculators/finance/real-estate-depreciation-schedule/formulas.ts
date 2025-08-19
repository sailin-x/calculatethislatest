export interface RealEstateDepreciationScheduleInputs {
  propertyType: string;
  propertyValue: number;
  landValue: number;
  improvementValue: number;
  placedInServiceDate: string;
  depreciationMethod: string;
  costSegregationPercentages?: {
    '5_year'?: number;
    '7_year'?: number;
    '15-year'?: number;
    '27.5-year'?: number;
  };
  convention: string;
  taxYear: number;
  personalUsePercentage: number;
  bonusDepreciation: number;
  section179Deduction: number;
  taxRate: number;
  inflationRate: number;
  holdingPeriod: number;
}

export interface RealEstateDepreciationScheduleOutputs {
  depreciableBasis: number;
  annualDepreciation: number;
  totalDepreciation: number;
  remainingBasis: number;
  taxBenefit: number;
  presentValueTaxBenefit: number;
  depreciationSchedule: Array<{
    year: number;
    depreciation: number;
    accumulatedDepreciation: number;
    remainingBasis: number;
    taxBenefit: number;
  }>;
  costSegregationBenefit: number;
  effectiveTaxRate: number;
  depreciationRecapture: number;
  netPresentValue: number;
  internalRateOfReturn: number;
}

// MACRS depreciation tables
const MACRS_RESIDENTIAL_RATES = [
  0.03636, 0.03485, 0.03333, 0.03182, 0.03030, 0.02879, 0.02727, 0.02576,
  0.02424, 0.02273, 0.02121, 0.01970, 0.01818, 0.01667, 0.01515, 0.01364,
  0.01212, 0.01061, 0.00909, 0.00758, 0.00606, 0.00455, 0.00303, 0.00152,
  0.00076, 0.00038, 0.00019, 0.00010, 0.00005, 0.00002, 0.00001, 0.00001,
  0.00001, 0.00001, 0.00001, 0.00001, 0.00001, 0.00001, 0.00001
];

const MACRS_COMMERCIAL_RATES = [
  0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564,
  0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564,
  0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564,
  0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564,
  0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564, 0.02564
];

// Cost segregation rates
const COST_SEGREGATION_RATES = {
  '5_year': [0.20, 0.32, 0.192, 0.1152, 0.1152, 0.0576],
  '7_year': [0.1429, 0.2449, 0.1749, 0.1249, 0.0893, 0.0893, 0.0893, 0.0446],
  '15-year': [0.05, 0.095, 0.0855, 0.077, 0.0693, 0.0623, 0.059, 0.059, 0.059, 0.059, 0.059, 0.059, 0.059, 0.059, 0.059, 0.0295]
};

export function calculateRealEstateDepreciationSchedule(inputs: RealEstateDepreciationScheduleInputs): RealEstateDepreciationScheduleOutputs {
  // Calculate depreciable basis
  const businessUsePercentage = (100 - inputs.personalUsePercentage) / 100;
  const depreciableBasis = inputs.improvementValue * businessUsePercentage;

  // Apply Section 179 deduction
  const section179Deduction = Math.min(inputs.section179Deduction, depreciableBasis);
  const remainingBasisAfter179 = depreciableBasis - section179Deduction;

  // Apply bonus depreciation
  const bonusDepreciationAmount = remainingBasisAfter179 * (inputs.bonusDepreciation / 100);
  const finalDepreciableBasis = remainingBasisAfter179 - bonusDepreciationAmount;

  // Calculate depreciation schedule
  const depreciationSchedule = calculateDepreciationSchedule(inputs, finalDepreciableBasis);

  // Calculate total depreciation
  const totalDepreciation = depreciationSchedule.reduce((sum, year) => sum + year.depreciation, 0) + 
                           section179Deduction + bonusDepreciationAmount;

  // Calculate remaining basis
  const remainingBasis = depreciableBasis - totalDepreciation;

  // Calculate tax benefits
  const taxBenefit = totalDepreciation * (inputs.taxRate / 100);
  const presentValueTaxBenefit = calculatePresentValue(depreciationSchedule, inputs.taxRate, inputs.inflationRate);

  // Calculate cost segregation benefit
  const costSegregationBenefit = calculateCostSegregationBenefit(inputs, finalDepreciableBasis);

  // Calculate effective tax rate
  const effectiveTaxRate = inputs.taxRate;

  // Calculate depreciation recapture
  const depreciationRecapture = totalDepreciation;

  // Calculate NPV and IRR
  const netPresentValue = presentValueTaxBenefit;
  const internalRateOfReturn = calculateIRR(depreciationSchedule, inputs.taxRate, inputs.inflationRate);

            // Calculate annual depreciation (average of actual schedule)
          const annualDepreciation = depreciationSchedule.reduce((sum, year) => sum + year.depreciation, 0) / inputs.holdingPeriod;

  return {
    depreciableBasis,
    annualDepreciation,
    totalDepreciation,
    remainingBasis,
    taxBenefit,
    presentValueTaxBenefit,
    depreciationSchedule,
    costSegregationBenefit,
    effectiveTaxRate,
    depreciationRecapture,
    netPresentValue,
    internalRateOfReturn
  };
}

function calculateDepreciationSchedule(
  inputs: RealEstateDepreciationScheduleInputs,
  depreciableBasis: number
): Array<{
  year: number;
  depreciation: number;
  accumulatedDepreciation: number;
  remainingBasis: number;
  taxBenefit: number;
}> {
  const schedule = [];
  let accumulatedDepreciation = 0;
  let remainingBasis = depreciableBasis;

  // Get depreciation rates based on method
  let rates: number[] = [];
  
  if (inputs.depreciationMethod === 'macrs_residential') {
    rates = MACRS_RESIDENTIAL_RATES;
  } else if (inputs.depreciationMethod === 'macrs_commercial') {
    rates = MACRS_COMMERCIAL_RATES;
  } else if (inputs.depreciationMethod === 'straight_line') {
    const life = inputs.propertyType === 'residential_rental' ? 27.5 : 39;
    const straightLineRate = 1 / life;
    rates = Array(Math.ceil(life)).fill(straightLineRate);
  } else if (inputs.depreciationMethod === 'cost_segregation') {
    return calculateCostSegregationSchedule(inputs, depreciableBasis);
  }

  // Apply convention for first year
  const conventionMultiplier = getConventionMultiplier(inputs.convention, inputs.placedInServiceDate);

  for (let year = 1; year <= inputs.holdingPeriod; year++) {
    let depreciation = 0;
    
    if (year <= rates.length) {
      if (year === 1) {
        depreciation = depreciableBasis * rates[year - 1] * conventionMultiplier;
      } else {
        depreciation = depreciableBasis * rates[year - 1];
      }
    }

    accumulatedDepreciation += depreciation;
    remainingBasis = Math.max(0, depreciableBasis - accumulatedDepreciation);
    const taxBenefit = depreciation * (inputs.taxRate / 100);

    schedule.push({
      year,
      depreciation,
      accumulatedDepreciation,
      remainingBasis,
      taxBenefit
    });
  }

  return schedule;
}

function calculateCostSegregationSchedule(
  inputs: RealEstateDepreciationScheduleInputs,
  depreciableBasis: number
): Array<{
  year: number;
  depreciation: number;
  accumulatedDepreciation: number;
  remainingBasis: number;
  taxBenefit: number;
}> {
  const schedule = [];
  let accumulatedDepreciation = 0;
  let remainingBasis = depreciableBasis;

  const percentages = inputs.costSegregationPercentages || {
    '5_year': 15,
    '7_year': 10,
    '15-year': 5,
    '27.5-year': 70
  };

  // Calculate depreciation for each asset class
  const assetClasses = [
    { life: '5_year', percentage: percentages['5_year'] || 0 },
    { life: '7_year', percentage: percentages['7_year'] || 0 },
    { life: '15-year', percentage: percentages['15-year'] || 0 },
    { life: '27.5-year', percentage: percentages['27.5-year'] || 0 }
  ];

  for (let year = 1; year <= inputs.holdingPeriod; year++) {
    let yearDepreciation = 0;

    assetClasses.forEach(assetClass => {
      const basis = depreciableBasis * (assetClass.percentage / 100);
      let rates: number[] = [];

      if (assetClass.life === '5_year') {
        rates = COST_SEGREGATION_RATES['5_year'];
      } else if (assetClass.life === '7_year') {
        rates = COST_SEGREGATION_RATES['7_year'];
      } else if (assetClass.life === '15-year') {
        rates = COST_SEGREGATION_RATES['15-year'];
      } else if (assetClass.life === '27.5-year') {
        rates = MACRS_RESIDENTIAL_RATES;
      }

      if (year <= rates.length) {
        const conventionMultiplier = getConventionMultiplier(inputs.convention, inputs.placedInServiceDate);
        if (year === 1) {
          yearDepreciation += basis * rates[year - 1] * conventionMultiplier;
        } else {
          yearDepreciation += basis * rates[year - 1];
        }
      }
    });

    accumulatedDepreciation += yearDepreciation;
    remainingBasis = Math.max(0, depreciableBasis - accumulatedDepreciation);
    const taxBenefit = yearDepreciation * (inputs.taxRate / 100);

    schedule.push({
      year,
      depreciation: yearDepreciation,
      accumulatedDepreciation,
      remainingBasis,
      taxBenefit
    });
  }

  return schedule;
}

function getConventionMultiplier(convention: string, placedInServiceDate: string): number {
  const date = new Date(placedInServiceDate);
  const month = date.getMonth() + 1; // 0-indexed to 1-indexed

  switch (convention) {
    case 'mid-month':
      return (12.5 - month) / 12;
    case 'mid-quarter':
      const quarter = Math.ceil(month / 3);
      return (4.5 - quarter) / 4;
    case 'half-year':
      return 0.5;
    default:
      return 1;
  }
}

        function calculateCostSegregationBenefit(
          inputs: RealEstateDepreciationScheduleInputs,
          depreciableBasis: number
        ): number {
          if (inputs.depreciationMethod !== 'cost_segregation') {
            return 0;
          }

          // Calculate standard MACRS depreciation
          const standardDepreciation = depreciableBasis / 27.5 * inputs.holdingPeriod;
          
          // Calculate cost segregation depreciation
          const costSegDepreciation = calculateCostSegregationSchedule(inputs, depreciableBasis)
            .reduce((sum, year) => sum + year.depreciation, 0);

          // Return additional tax benefit (ensure it's not negative)
          const additionalDepreciation = Math.max(0, costSegDepreciation - standardDepreciation);
          return additionalDepreciation * (inputs.taxRate / 100);
        }

function calculatePresentValue(
  schedule: Array<{ year: number; taxBenefit: number }>,
  taxRate: number,
  inflationRate: number
): number {
  const discountRate = (taxRate / 100) + (inflationRate / 100);
  
  return schedule.reduce((pv, year) => {
    return pv + (year.taxBenefit / Math.pow(1 + discountRate, year.year));
  }, 0);
}

function calculateIRR(
  schedule: Array<{ year: number; taxBenefit: number }>,
  taxRate: number,
  inflationRate: number
): number {
  // Simplified IRR calculation
  const totalBenefit = schedule.reduce((sum, year) => sum + year.taxBenefit, 0);
  const averageBenefit = totalBenefit / schedule.length;
  
  if (averageBenefit <= 0) return 0;
  
  // Estimate IRR based on average annual benefit
  const estimatedIRR = (averageBenefit / 1000) * 10; // Simplified calculation
  return Math.min(estimatedIRR, 25); // Cap at 25%
}

export function calculateYearsBetween(startDate: Date, endDate: Date): number {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return timeDiff / (1000 * 3600 * 24 * 365.25);
}

export function calculateMonthsBetween(startDate: Date, endDate: Date): number {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return timeDiff / (1000 * 3600 * 24 * 30.44);
}

export function generateDepreciationAnalysis(inputs: RealEstateDepreciationScheduleInputs, outputs: RealEstateDepreciationScheduleOutputs): string {
  const analysis = [];
  
  analysis.push(`## Real Estate Depreciation Schedule Analysis`);
  analysis.push(``);
  analysis.push(`### Property Overview`);
  analysis.push(`- **Property Type**: ${inputs.propertyType.replace('_', ' ').toUpperCase()}`);
  analysis.push(`- **Total Value**: $${inputs.propertyValue.toLocaleString()}`);
  analysis.push(`- **Land Value**: $${inputs.landValue.toLocaleString()}`);
  analysis.push(`- **Improvement Value**: $${inputs.improvementValue.toLocaleString()}`);
  analysis.push(`- **Depreciable Basis**: $${outputs.depreciableBasis.toLocaleString()}`);
  analysis.push(``);
  
  analysis.push(`### Depreciation Summary`);
  analysis.push(`- **Depreciation Method**: ${inputs.depreciationMethod.replace('_', ' ').toUpperCase()}`);
  analysis.push(`- **Annual Depreciation**: $${outputs.annualDepreciation.toLocaleString()}`);
  analysis.push(`- **Total Depreciation**: $${outputs.totalDepreciation.toLocaleString()}`);
  analysis.push(`- **Remaining Basis**: $${outputs.remainingBasis.toLocaleString()}`);
  analysis.push(``);
  
  analysis.push(`### Tax Benefits`);
  analysis.push(`- **Total Tax Benefit**: $${outputs.taxBenefit.toLocaleString()}`);
  analysis.push(`- **Present Value Tax Benefit**: $${outputs.presentValueTaxBenefit.toLocaleString()}`);
  analysis.push(`- **Cost Segregation Benefit**: $${outputs.costSegregationBenefit.toLocaleString()}`);
  analysis.push(`- **Effective Tax Rate**: ${outputs.effectiveTaxRate.toFixed(1)}%`);
  analysis.push(``);
  
  analysis.push(`### Investment Metrics`);
  analysis.push(`- **Net Present Value**: $${outputs.netPresentValue.toLocaleString()}`);
  analysis.push(`- **Internal Rate of Return**: ${outputs.internalRateOfReturn.toFixed(1)}%`);
  analysis.push(`- **Depreciation Recapture**: $${outputs.depreciationRecapture.toLocaleString()}`);
  
  return analysis.join('\n');
}