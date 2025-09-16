/**
 * Real Estate Depreciation Schedule Calculator Formulas
 * Comprehensive depreciation calculations for real estate investments
 */

/**
 * Calculate straight-line depreciation
 */
export function calculateStraightLineDepreciation(
  costBasis: number,
  salvageValue: number = 0,
  usefulLife: number = 27.5,
  currentYear: number = 1
): {
  costBasis: number;
  salvageValue: number;
  depreciableBasis: number;
  usefulLife: number;
  annualDepreciation: number;
  accumulatedDepreciation: number;
  currentBookValue: number;
  remainingDepreciation: number;
  depreciationSchedule: Array<{
    year: number;
    beginningBookValue: number;
    depreciationExpense: number;
    accumulatedDepreciation: number;
    endingBookValue: number;
  }>;
} {
  if (costBasis < 0) {
    throw new Error('Cost basis cannot be negative');
  }
  if (salvageValue < 0) {
    throw new Error('Salvage value cannot be negative');
  }
  if (salvageValue > costBasis) {
    throw new Error('Salvage value cannot exceed cost basis');
  }
  if (usefulLife <= 0) {
    throw new Error('Useful life must be positive');
  }
  if (currentYear < 1) {
    throw new Error('Current year must be at least 1');
  }

  const depreciableBasis = costBasis - salvageValue;
  const annualDepreciation = depreciableBasis / usefulLife;
  const accumulatedDepreciation = annualDepreciation * (currentYear - 1);
  const currentBookValue = costBasis - accumulatedDepreciation;
  const remainingDepreciation = depreciableBasis - accumulatedDepreciation;

  // Generate depreciation schedule
  const depreciationSchedule = [];
  let bookValue = costBasis;

  for (let year = 1; year <= Math.ceil(usefulLife); year++) {
    const beginningValue = bookValue;
    const depreciationExpense = year <= usefulLife ? annualDepreciation : 0;
    const accumulated = annualDepreciation * year;
    const endingValue = Math.max(salvageValue, costBasis - accumulated);

    depreciationSchedule.push({
      year,
      beginningBookValue: Math.round(beginningValue * 100) / 100,
      depreciationExpense: Math.round(depreciationExpense * 100) / 100,
      accumulatedDepreciation: Math.round(accumulated * 100) / 100,
      endingBookValue: Math.round(endingValue * 100) / 100
    });

    bookValue = endingValue;
  }

  return {
    costBasis: Math.round(costBasis * 100) / 100,
    salvageValue: Math.round(salvageValue * 100) / 100,
    depreciableBasis: Math.round(depreciableBasis * 100) / 100,
    usefulLife,
    annualDepreciation: Math.round(annualDepreciation * 100) / 100,
    accumulatedDepreciation: Math.round(accumulatedDepreciation * 100) / 100,
    currentBookValue: Math.round(currentBookValue * 100) / 100,
    remainingDepreciation: Math.round(remainingDepreciation * 100) / 100,
    depreciationSchedule
  };
}

/**
 * Calculate cost segregation depreciation
 */
export function calculateCostSegregationDepreciation(
  totalCost: number,
  landValue: number,
  segregatedAssets: Array<{
    description: string;
    cost: number;
    usefulLife: number;
    depreciationMethod: 'straight_line' | 'declining_balance';
  }>,
  currentYear: number = 1
): {
  totalCost: number;
  landValue: number;
  buildingValue: number;
  segregatedAssets: any[];
  totalAnnualDepreciation: number;
  totalAccumulatedDepreciation: number;
  currentBookValue: number;
  depreciationByAsset: Array<{
    description: string;
    annualDepreciation: number;
    accumulatedDepreciation: number;
    remainingDepreciation: number;
  }>;
  depreciationSchedule: Array<{
    year: number;
    totalDepreciation: number;
    accumulatedDepreciation: number;
    bookValue: number;
    assetDepreciation: Array<{
      description: string;
      depreciation: number;
    }>;
  }>;
} {
  if (totalCost < 0) {
    throw new Error('Total cost cannot be negative');
  }
  if (landValue < 0) {
    throw new Error('Land value cannot be negative');
  }
  if (landValue > totalCost) {
    throw new Error('Land value cannot exceed total cost');
  }
  if (currentYear < 1) {
    throw new Error('Current year must be at least 1');
  }

  const buildingValue = totalCost - landValue;
  const depreciationByAsset = [];
  const depreciationSchedule = [];
  let totalAnnualDepreciation = 0;
  let totalAccumulatedDepreciation = 0;

  // Calculate depreciation for each segregated asset
  for (const asset of segregatedAssets) {
    if (asset.cost < 0) {
      throw new Error(`Asset cost cannot be negative for ${asset.description}`);
    }
    if (asset.usefulLife <= 0) {
      throw new Error(`Useful life must be positive for ${asset.description}`);
    }

    let annualDepreciation = 0;
    let accumulatedDepreciation = 0;

    if (asset.depreciationMethod === 'straight_line') {
      annualDepreciation = asset.cost / asset.usefulLife;
      accumulatedDepreciation = Math.min(asset.cost, annualDepreciation * (currentYear - 1));
    } else if (asset.depreciationMethod === 'declining_balance') {
      // Simplified declining balance calculation
      const rate = 2 / asset.usefulLife; // Double declining balance
      let bookValue = asset.cost;
      accumulatedDepreciation = 0;

      for (let year = 1; year < currentYear; year++) {
        const depreciation = Math.min(bookValue * rate, bookValue);
        accumulatedDepreciation += depreciation;
        bookValue -= depreciation;
      }

      annualDepreciation = Math.min(bookValue * rate, bookValue);
    }

    const remainingDepreciation = asset.cost - accumulatedDepreciation;

    depreciationByAsset.push({
      description: asset.description,
      annualDepreciation: Math.round(annualDepreciation * 100) / 100,
      accumulatedDepreciation: Math.round(accumulatedDepreciation * 100) / 100,
      remainingDepreciation: Math.round(remainingDepreciation * 100) / 100
    });

    totalAnnualDepreciation += annualDepreciation;
    totalAccumulatedDepreciation += accumulatedDepreciation;
  }

  const currentBookValue = totalCost - totalAccumulatedDepreciation;

  // Generate depreciation schedule (simplified for first 10 years)
  for (let year = 1; year <= Math.min(10, Math.max(...segregatedAssets.map(a => a.usefulLife))); year++) {
    let yearTotalDepreciation = 0;
    let yearAccumulatedDepreciation = 0;
    const assetDepreciation = [];

    for (const asset of segregatedAssets) {
      let depreciation = 0;

      if (asset.depreciationMethod === 'straight_line') {
        depreciation = year <= asset.usefulLife ? asset.cost / asset.usefulLife : 0;
      } else if (asset.depreciationMethod === 'declining_balance') {
        // Simplified calculation
        const rate = 2 / asset.usefulLife;
        const remainingValue = asset.cost - (asset.cost / asset.usefulLife * (year - 1));
        depreciation = year <= asset.usefulLife ? Math.max(remainingValue * rate, 0) : 0;
      }

      assetDepreciation.push({
        description: asset.description,
        depreciation: Math.round(depreciation * 100) / 100
      });

      yearTotalDepreciation += depreciation;
      yearAccumulatedDepreciation += depreciation;
    }

    depreciationSchedule.push({
      year,
      totalDepreciation: Math.round(yearTotalDepreciation * 100) / 100,
      accumulatedDepreciation: Math.round(yearAccumulatedDepreciation * 100) / 100,
      bookValue: Math.round((totalCost - yearAccumulatedDepreciation) * 100) / 100,
      assetDepreciation
    });
  }

  return {
    totalCost: Math.round(totalCost * 100) / 100,
    landValue: Math.round(landValue * 100) / 100,
    buildingValue: Math.round(buildingValue * 100) / 100,
    segregatedAssets,
    totalAnnualDepreciation: Math.round(totalAnnualDepreciation * 100) / 100,
    totalAccumulatedDepreciation: Math.round(totalAccumulatedDepreciation * 100) / 100,
    currentBookValue: Math.round(currentBookValue * 100) / 100,
    depreciationByAsset,
    depreciationSchedule
  };
}

/**
 * Calculate Section 179 deduction
 */
export function calculateSection179Deduction(
  equipmentCost: number,
  businessUsePercentage: number = 100,
  phaseOutThreshold: number = 2000000,
  phaseOutAmount: number = 200000,
  section179Limit: number = 1080000
): {
  equipmentCost: number;
  businessUsePercentage: number;
  businessUseCost: number;
  section179Limit: number;
  phaseOutThreshold: number;
  phaseOutAmount: number;
  eligibleAmount: number;
  section179Deduction: number;
  remainingCost: number;
  taxSavings: number;
} {
  if (equipmentCost < 0) {
    throw new Error('Equipment cost cannot be negative');
  }
  if (businessUsePercentage < 0 || businessUsePercentage > 100) {
    throw new Error('Business use percentage must be between 0 and 100');
  }
  if (section179Limit < 0) {
    throw new Error('Section 179 limit cannot be negative');
  }

  const businessUseCost = equipmentCost * (businessUsePercentage / 100);

  // Calculate phase-out reduction
  const phaseOutReduction = Math.max(0, Math.min(phaseOutAmount,
    Math.max(0, businessUseCost - phaseOutThreshold) * (phaseOutAmount / phaseOutAmount)
  ));

  const eligibleAmount = Math.max(0, businessUseCost - phaseOutReduction);
  const section179Deduction = Math.min(eligibleAmount, section179Limit);
  const remainingCost = businessUseCost - section179Deduction;

  // Assume 37% corporate tax rate for tax savings calculation
  const taxSavings = section179Deduction * 0.37;

  return {
    equipmentCost: Math.round(equipmentCost * 100) / 100,
    businessUsePercentage,
    businessUseCost: Math.round(businessUseCost * 100) / 100,
    section179Limit: Math.round(section179Limit * 100) / 100,
    phaseOutThreshold: Math.round(phaseOutThreshold * 100) / 100,
    phaseOutAmount: Math.round(phaseOutAmount * 100) / 100,
    eligibleAmount: Math.round(eligibleAmount * 100) / 100,
    section179Deduction: Math.round(section179Deduction * 100) / 100,
    remainingCost: Math.round(remainingCost * 100) / 100,
    taxSavings: Math.round(taxSavings * 100) / 100
  };
}

/**
 * Calculate bonus depreciation
 */
export function calculateBonusDepreciation(
  qualifiedPropertyCost: number,
  bonusPercentage: number = 80,
  businessUsePercentage: number = 100,
  taxYear: number = 2024
): {
  qualifiedPropertyCost: number;
  bonusPercentage: number;
  businessUsePercentage: number;
  businessUseCost: number;
  bonusDepreciation: number;
  remainingBasis: number;
  taxSavings: number;
  taxYear: number;
} {
  if (qualifiedPropertyCost < 0) {
    throw new Error('Qualified property cost cannot be negative');
  }
  if (bonusPercentage < 0 || bonusPercentage > 100) {
    throw new Error('Bonus percentage must be between 0 and 100');
  }
  if (businessUsePercentage < 0 || businessUsePercentage > 100) {
    throw new Error('Business use percentage must be between 0 and 100');
  }

  const businessUseCost = qualifiedPropertyCost * (businessUsePercentage / 100);
  const bonusDepreciation = businessUseCost * (bonusPercentage / 100);
  const remainingBasis = businessUseCost - bonusDepreciation;

  // Assume 37% corporate tax rate for tax savings calculation
  const taxSavings = bonusDepreciation * 0.37;

  return {
    qualifiedPropertyCost: Math.round(qualifiedPropertyCost * 100) / 100,
    bonusPercentage,
    businessUsePercentage,
    businessUseCost: Math.round(businessUseCost * 100) / 100,
    bonusDepreciation: Math.round(bonusDepreciation * 100) / 100,
    remainingBasis: Math.round(remainingBasis * 100) / 100,
    taxSavings: Math.round(taxSavings * 100) / 100,
    taxYear
  };
}

/**
 * Calculate depreciation recapture
 */
export function calculateDepreciationRecapture(
  originalCost: number,
  accumulatedDepreciation: number,
  salePrice: number,
  depreciationMethod: 'straight_line' | 'accelerated' = 'straight_line'
): {
  originalCost: number;
  accumulatedDepreciation: number;
  salePrice: number;
  adjustedBasis: number;
  gainOnSale: number;
  depreciationRecapture: number;
  capitalGain: number;
  taxRate: number;
  totalTax: number;
  depreciationMethod: string;
} {
  if (originalCost < 0) {
    throw new Error('Original cost cannot be negative');
  }
  if (accumulatedDepreciation < 0) {
    throw new Error('Accumulated depreciation cannot be negative');
  }
  if (salePrice < 0) {
    throw new Error('Sale price cannot be negative');
  }
  if (accumulatedDepreciation > originalCost) {
    throw new Error('Accumulated depreciation cannot exceed original cost');
  }

  const adjustedBasis = originalCost - accumulatedDepreciation;
  const gainOnSale = salePrice - adjustedBasis;

  let depreciationRecapture = 0;
  let capitalGain = gainOnSale;

  if (gainOnSale > 0) {
    if (depreciationMethod === 'straight_line') {
      // Section 1250 property - unrecaptured depreciation
      depreciationRecapture = Math.min(gainOnSale, accumulatedDepreciation);
      capitalGain = gainOnSale - depreciationRecapture;
    } else {
      // Section 1245 property - full recapture
      depreciationRecapture = Math.min(gainOnSale, accumulatedDepreciation);
      capitalGain = gainOnSale - depreciationRecapture;
    }
  }

  // Tax rates (simplified)
  const recaptureTaxRate = 0.25; // Unrecaptured Section 1250 gain
  const capitalGainsTaxRate = 0.20; // Long-term capital gains

  const recaptureTax = depreciationRecapture * recaptureTaxRate;
  const capitalGainsTax = capitalGain * capitalGainsTaxRate;
  const totalTax = recaptureTax + capitalGainsTax;

  return {
    originalCost: Math.round(originalCost * 100) / 100,
    accumulatedDepreciation: Math.round(accumulatedDepreciation * 100) / 100,
    salePrice: Math.round(salePrice * 100) / 100,
    adjustedBasis: Math.round(adjustedBasis * 100) / 100,
    gainOnSale: Math.round(gainOnSale * 100) / 100,
    depreciationRecapture: Math.round(depreciationRecapture * 100) / 100,
    capitalGain: Math.round(capitalGain * 100) / 100,
    taxRate: depreciationMethod === 'straight_line' ? 25 : 35,
    totalTax: Math.round(totalTax * 100) / 100,
    depreciationMethod
  };
}

/**
 * Calculate tax depreciation benefits
 */
export function calculateTaxDepreciationBenefits(
  propertyCost: number,
  annualDepreciation: number,
  taxRate: number = 37,
  holdingPeriod: number = 5,
  discountRate: number = 8
): {
  propertyCost: number;
  annualDepreciation: number;
  taxRate: number;
  holdingPeriod: number;
  discountRate: number;
  annualTaxSavings: number;
  totalTaxSavings: number;
  presentValueTaxSavings: number;
  depreciationTaxShield: number;
  effectiveTaxRate: number;
} {
  if (propertyCost < 0) {
    throw new Error('Property cost cannot be negative');
  }
  if (annualDepreciation < 0) {
    throw new Error('Annual depreciation cannot be negative');
  }
  if (taxRate < 0 || taxRate > 100) {
    throw new Error('Tax rate must be between 0 and 100');
  }
  if (holdingPeriod < 1) {
    throw new Error('Holding period must be at least 1 year');
  }

  const annualTaxSavings = annualDepreciation * (taxRate / 100);
  const totalTaxSavings = annualTaxSavings * holdingPeriod;

  // Calculate present value of tax savings
  let presentValueTaxSavings = 0;
  for (let year = 1; year <= holdingPeriod; year++) {
    presentValueTaxSavings += annualTaxSavings / Math.pow(1 + discountRate / 100, year);
  }

  const depreciationTaxShield = presentValueTaxSavings;
  const effectiveTaxRate = (totalTaxSavings / propertyCost) * 100;

  return {
    propertyCost: Math.round(propertyCost * 100) / 100,
    annualDepreciation: Math.round(annualDepreciation * 100) / 100,
    taxRate,
    holdingPeriod,
    discountRate,
    annualTaxSavings: Math.round(annualTaxSavings * 100) / 100,
    totalTaxSavings: Math.round(totalTaxSavings * 100) / 100,
    presentValueTaxSavings: Math.round(presentValueTaxSavings * 100) / 100,
    depreciationTaxShield: Math.round(depreciationTaxShield * 100) / 100,
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100
  };
}

/**
 * Main real estate depreciation calculation function
 */
export function calculateRealEstateDepreciation(inputs: any): any {
  const {
    calculationType,
    costBasis, salvageValue, usefulLife, currentYear,
    totalCost, landValue, segregatedAssets,
    equipmentCost, businessUsePercentage, phaseOutThreshold, phaseOutAmount, section179Limit,
    qualifiedPropertyCost, bonusPercentage, taxYear,
    originalCost, accumulatedDepreciation, salePrice, depreciationMethod,
    propertyCost, annualDepreciation, taxRate, holdingPeriod, discountRate
  } = inputs;

  switch (calculationType) {
    case 'straight_line':
      return calculateStraightLineDepreciation(
        costBasis,
        salvageValue,
        usefulLife,
        currentYear
      );

    case 'cost_segregation':
      return calculateCostSegregationDepreciation(
        totalCost,
        landValue,
        segregatedAssets,
        currentYear
      );

    case 'section_179':
      return calculateSection179Deduction(
        equipmentCost,
        businessUsePercentage,
        phaseOutThreshold,
        phaseOutAmount,
        section179Limit
      );

    case 'bonus_depreciation':
      return calculateBonusDepreciation(
        qualifiedPropertyCost,
        bonusPercentage,
        businessUsePercentage,
        taxYear
      );

    case 'depreciation_recapture':
      return calculateDepreciationRecapture(
        originalCost,
        accumulatedDepreciation,
        salePrice,
        depreciationMethod
      );

    case 'tax_benefits':
      return calculateTaxDepreciationBenefits(
        propertyCost,
        annualDepreciation,
        taxRate,
        holdingPeriod,
        discountRate
      );

    case 'comprehensive':
      // Calculate multiple depreciation methods for comprehensive analysis
      const straightLine = calculateStraightLineDepreciation(
        costBasis || 500000,
        salvageValue || 50000,
        usefulLife || 27.5,
        currentYear || 3
      );

      const section179 = calculateSection179Deduction(
        equipmentCost || 100000,
        businessUsePercentage || 100,
        phaseOutThreshold || 2000000,
        phaseOutAmount || 200000,
        section179Limit || 1080000
      );

      const bonus = calculateBonusDepreciation(
        qualifiedPropertyCost || 200000,
        bonusPercentage || 80,
        businessUsePercentage || 100,
        taxYear || 2024
      );

      const taxBenefits = calculateTaxDepreciationBenefits(
        propertyCost || 500000,
        annualDepreciation || 18000,
        taxRate || 37,
        holdingPeriod || 5,
        discountRate || 8
      );

      return {
        straightLineDepreciation: straightLine,
        section179Deduction: section179,
        bonusDepreciation: bonus,
        taxBenefits: taxBenefits,
        summary: {
          totalFirstYearDepreciation: straightLine.annualDepreciation + section179.section179Deduction + bonus.bonusDepreciation,
          totalTaxSavings: section179.taxSavings + bonus.taxSavings + taxBenefits.annualTaxSavings,
          effectiveTaxRate: taxBenefits.effectiveTaxRate,
          presentValueTaxShield: taxBenefits.presentValueTaxSavings
        }
      };

    default:
      throw new Error('Unknown real estate depreciation calculation type');
  }
}