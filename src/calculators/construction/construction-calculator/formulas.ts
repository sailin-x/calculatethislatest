/**
 * Construction Calculator Formulas
 * Comprehensive construction cost estimation and project planning calculations
 */

/**
 * Calculate construction costs per square foot
 */
export function calculateCostPerSquareFoot(
  totalCost: number,
  squareFootage: number,
  constructionType: 'basic' | 'standard' | 'luxury' | 'custom' = 'standard',
  location: 'rural' | 'suburban' | 'urban' | 'high_cost' = 'suburban',
  qualityGrade: 'economy' | 'standard' | 'premium' | 'luxury' = 'standard'
): {
  costPerSqFt: number;
  adjustedCostPerSqFt: number;
  totalCost: number;
  squareFootage: number;
  constructionMultiplier: number;
  locationMultiplier: number;
  qualityMultiplier: number;
  costBreakdown: {
    base: number;
    construction: number;
    location: number;
    quality: number;
  };
} {
  if (totalCost < 0) {
    throw new Error('Total cost cannot be negative');
  }
  if (squareFootage <= 0) {
    throw new Error('Square footage must be positive');
  }

  const baseCostPerSqFt = totalCost / squareFootage;

  // Construction type multipliers
  const constructionMultipliers = {
    basic: 0.8,
    standard: 1.0,
    luxury: 1.5,
    custom: 2.0
  };

  // Location multipliers
  const locationMultipliers = {
    rural: 0.85,
    suburban: 1.0,
    urban: 1.2,
    high_cost: 1.5
  };

  // Quality grade multipliers
  const qualityMultipliers = {
    economy: 0.8,
    standard: 1.0,
    premium: 1.3,
    luxury: 1.8
  };

  const constructionMultiplier = constructionMultipliers[constructionType];
  const locationMultiplier = locationMultipliers[location];
  const qualityMultiplier = qualityMultipliers[qualityGrade];

  const adjustedCostPerSqFt = baseCostPerSqFt * constructionMultiplier * locationMultiplier * qualityMultiplier;

  const costBreakdown = {
    base: Math.round(baseCostPerSqFt * 100) / 100,
    construction: Math.round((baseCostPerSqFt * constructionMultiplier) * 100) / 100,
    location: Math.round((baseCostPerSqFt * constructionMultiplier * locationMultiplier) * 100) / 100,
    quality: Math.round(adjustedCostPerSqFt * 100) / 100
  };

  return {
    costPerSqFt: Math.round(baseCostPerSqFt * 100) / 100,
    adjustedCostPerSqFt: Math.round(adjustedCostPerSqFt * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    squareFootage,
    constructionMultiplier,
    locationMultiplier,
    qualityMultiplier,
    costBreakdown
  };
}

/**
 * Calculate material costs for construction
 */
export function calculateMaterialCosts(
  squareFootage: number,
  foundationType: 'slab' | 'crawlspace' | 'basement' | 'pier_beam' = 'slab',
  framingType: 'wood' | 'steel' | 'concrete' = 'wood',
  roofingType: 'asphalt' | 'metal' | 'tile' | 'slate' = 'asphalt',
  sidingType: 'vinyl' | 'wood' | 'brick' | 'stucco' = 'vinyl',
  qualityGrade: 'economy' | 'standard' | 'premium' = 'standard'
): {
  totalMaterialCost: number;
  costPerSqFt: number;
  materialBreakdown: {
    foundation: number;
    framing: number;
    roofing: number;
    siding: number;
    insulation: number;
    drywall: number;
    flooring: number;
  };
  squareFootage: number;
  qualityGrade: string;
} {
  if (squareFootage <= 0) {
    throw new Error('Square footage must be positive');
  }

  // Base material costs per square foot
  const baseCosts = {
    foundation: {
      slab: 8,
      crawlspace: 12,
      basement: 18,
      pier_beam: 15
    },
    framing: {
      wood: 15,
      steel: 25,
      concrete: 35
    },
    roofing: {
      asphalt: 5,
      metal: 12,
      tile: 18,
      slate: 25
    },
    siding: {
      vinyl: 6,
      wood: 12,
      brick: 20,
      stucco: 15
    },
    insulation: 8,
    drywall: 10,
    flooring: 12
  };

  // Quality multipliers
  const qualityMultipliers = {
    economy: 0.8,
    standard: 1.0,
    premium: 1.4
  };

  const multiplier = qualityMultipliers[qualityGrade];

  const materialBreakdown = {
    foundation: Math.round(baseCosts.foundation[foundationType] * squareFootage * multiplier * 100) / 100,
    framing: Math.round(baseCosts.framing[framingType] * squareFootage * multiplier * 100) / 100,
    roofing: Math.round(baseCosts.roofing[roofingType] * squareFootage * multiplier * 100) / 100,
    siding: Math.round(baseCosts.siding[sidingType] * squareFootage * multiplier * 100) / 100,
    insulation: Math.round(baseCosts.insulation * squareFootage * multiplier * 100) / 100,
    drywall: Math.round(baseCosts.drywall * squareFootage * multiplier * 100) / 100,
    flooring: Math.round(baseCosts.flooring * squareFootage * multiplier * 100) / 100
  };

  const totalMaterialCost = Object.values(materialBreakdown).reduce((sum, cost) => sum + cost, 0);
  const costPerSqFt = Math.round((totalMaterialCost / squareFootage) * 100) / 100;

  return {
    totalMaterialCost: Math.round(totalMaterialCost * 100) / 100,
    costPerSqFt,
    materialBreakdown,
    squareFootage,
    qualityGrade
  };
}

/**
 * Calculate labor costs for construction
 */
export function calculateLaborCosts(
  squareFootage: number,
  constructionType: 'new_construction' | 'remodel' | 'addition' = 'new_construction',
  laborRate: number = 50, // Hourly rate
  projectComplexity: 'simple' | 'moderate' | 'complex' = 'moderate',
  location: 'rural' | 'suburban' | 'urban' = 'suburban'
): {
  totalLaborCost: number;
  costPerSqFt: number;
  estimatedHours: number;
  hourlyRate: number;
  laborBreakdown: {
    foundation: number;
    framing: number;
    roofing: number;
    electrical: number;
    plumbing: number;
    hvac: number;
    finishing: number;
  };
  squareFootage: number;
  constructionType: string;
} {
  if (squareFootage <= 0) {
    throw new Error('Square footage must be positive');
  }
  if (laborRate <= 0) {
    throw new Error('Labor rate must be positive');
  }

  // Hours per square foot by trade
  const hoursPerSqFt = {
    foundation: 2.5,
    framing: 4.0,
    roofing: 1.5,
    electrical: 3.0,
    plumbing: 2.0,
    hvac: 2.5,
    finishing: 5.0
  };

  // Complexity multipliers
  const complexityMultipliers = {
    simple: 0.8,
    moderate: 1.0,
    complex: 1.4
  };

  // Location multipliers (labor rates vary by region)
  const locationMultipliers = {
    rural: 0.9,
    suburban: 1.0,
    urban: 1.2
  };

  // Construction type multipliers
  const constructionMultipliers = {
    new_construction: 1.0,
    remodel: 1.3,
    addition: 1.2
  };

  const complexityMultiplier = complexityMultipliers[projectComplexity];
  const locationMultiplier = locationMultipliers[location];
  const constructionMultiplier = constructionMultipliers[constructionType];
  const adjustedRate = laborRate * locationMultiplier * complexityMultiplier * constructionMultiplier;

  const laborBreakdown = {
    foundation: Math.round(hoursPerSqFt.foundation * squareFootage * adjustedRate * 100) / 100,
    framing: Math.round(hoursPerSqFt.framing * squareFootage * adjustedRate * 100) / 100,
    roofing: Math.round(hoursPerSqFt.roofing * squareFootage * adjustedRate * 100) / 100,
    electrical: Math.round(hoursPerSqFt.electrical * squareFootage * adjustedRate * 100) / 100,
    plumbing: Math.round(hoursPerSqFt.plumbing * squareFootage * adjustedRate * 100) / 100,
    hvac: Math.round(hoursPerSqFt.hvac * squareFootage * adjustedRate * 100) / 100,
    finishing: Math.round(hoursPerSqFt.finishing * squareFootage * adjustedRate * 100) / 100
  };

  const totalHours = Object.values(hoursPerSqFt).reduce((sum, hours) => sum + hours, 0) * squareFootage;
  const totalLaborCost = Object.values(laborBreakdown).reduce((sum, cost) => sum + cost, 0);
  const costPerSqFt = Math.round((totalLaborCost / squareFootage) * 100) / 100;

  return {
    totalLaborCost: Math.round(totalLaborCost * 100) / 100,
    costPerSqFt,
    estimatedHours: Math.round(totalHours * 100) / 100,
    hourlyRate: Math.round(adjustedRate * 100) / 100,
    laborBreakdown,
    squareFootage,
    constructionType
  };
}

/**
 * Calculate construction timeline and scheduling
 */
export function calculateConstructionTimeline(
  squareFootage: number,
  constructionType: 'new_construction' | 'remodel' | 'addition' = 'new_construction',
  projectSize: 'small' | 'medium' | 'large' | 'extra_large' = 'medium',
  weatherConditions: 'good' | 'moderate' | 'poor' = 'moderate',
  contractorExperience: 'inexperienced' | 'experienced' | 'expert' = 'experienced'
): {
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  phaseBreakdown: {
    foundation: number;
    framing: number;
    roofing: number;
    electrical: number;
    plumbing: number;
    hvac: number;
    finishing: number;
  };
  criticalPath: string[];
  weatherDelay: number;
  experienceModifier: number;
  squareFootage: number;
} {
  if (squareFootage <= 0) {
    throw new Error('Square footage must be positive');
  }

  // Base days per phase based on square footage
  const baseDays = squareFootage <= 1000 ? 30 :
                   squareFootage <= 2000 ? 45 :
                   squareFootage <= 3000 ? 60 :
                   squareFootage <= 5000 ? 90 : 120;

  // Phase percentages of total time
  const phasePercentages = {
    foundation: 0.15,
    framing: 0.25,
    roofing: 0.10,
    electrical: 0.15,
    plumbing: 0.12,
    hvac: 0.10,
    finishing: 0.13
  };

  // Size multipliers
  const sizeMultipliers = {
    small: 0.8,
    medium: 1.0,
    large: 1.3,
    extra_large: 1.6
  };

  // Weather condition delays (days)
  const weatherDelays = {
    good: 0,
    moderate: 3,
    poor: 7
  };

  // Experience modifiers
  const experienceModifiers = {
    inexperienced: 1.3,
    experienced: 1.0,
    expert: 0.85
  };

  // Construction type modifiers
  const constructionModifiers = {
    new_construction: 1.0,
    remodel: 0.8,
    addition: 0.9
  };

  const sizeMultiplier = sizeMultipliers[projectSize];
  const weatherDelay = weatherDelays[weatherConditions];
  const experienceModifier = experienceModifiers[contractorExperience];
  const constructionModifier = constructionModifiers[constructionType];

  const adjustedDays = baseDays * sizeMultiplier * experienceModifier * constructionModifier + weatherDelay;

  const phaseBreakdown = {
    foundation: Math.round(adjustedDays * phasePercentages.foundation),
    framing: Math.round(adjustedDays * phasePercentages.framing),
    roofing: Math.round(adjustedDays * phasePercentages.roofing),
    electrical: Math.round(adjustedDays * phasePercentages.electrical),
    plumbing: Math.round(adjustedDays * phasePercentages.plumbing),
    hvac: Math.round(adjustedDays * phasePercentages.hvac),
    finishing: Math.round(adjustedDays * phasePercentages.finishing)
  };

  const totalDays = Object.values(phaseBreakdown).reduce((sum, days) => sum + days, 0);
  const totalWeeks = Math.round((totalDays / 7) * 100) / 100;
  const totalMonths = Math.round((totalDays / 30) * 100) / 100;

  // Critical path (sequential phases)
  const criticalPath = ['foundation', 'framing', 'roofing', 'electrical', 'plumbing', 'hvac', 'finishing'];

  return {
    totalDays: Math.round(totalDays),
    totalWeeks,
    totalMonths,
    phaseBreakdown,
    criticalPath,
    weatherDelay,
    experienceModifier,
    squareFootage
  };
}

/**
 * Calculate construction financing and loan estimates
 */
export function calculateConstructionFinancing(
  totalCost: number,
  downPaymentPercent: number = 20,
  loanTermYears: number = 30,
  interestRate: number = 4.5,
  constructionPeriodMonths: number = 6
): {
  totalCost: number;
  downPayment: number;
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayments: number;
  constructionInterest: number;
  loanTermYears: number;
  interestRate: number;
  costBreakdown: {
    principal: number;
    interest: number;
    constructionInterest: number;
  };
} {
  if (totalCost <= 0) {
    throw new Error('Total cost must be positive');
  }
  if (downPaymentPercent < 0 || downPaymentPercent > 100) {
    throw new Error('Down payment percentage must be between 0 and 100');
  }
  if (loanTermYears <= 0) {
    throw new Error('Loan term must be positive');
  }
  if (interestRate < 0) {
    throw new Error('Interest rate cannot be negative');
  }

  const downPayment = totalCost * (downPaymentPercent / 100);
  const loanAmount = totalCost - downPayment;

  // Calculate construction period interest (simple interest)
  const monthlyRate = interestRate / 100 / 12;
  const constructionInterest = loanAmount * (interestRate / 100) * (constructionPeriodMonths / 12);

  // Calculate regular mortgage payment using loan formula
  const numberOfPayments = loanTermYears * 12;
  const adjustedLoanAmount = loanAmount + constructionInterest;

  const monthlyPayment = adjustedLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayments = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayments - loanAmount;

  return {
    totalCost: Math.round(totalCost * 100) / 100,
    downPayment: Math.round(downPayment * 100) / 100,
    loanAmount: Math.round(loanAmount * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPayments: Math.round(totalPayments * 100) / 100,
    constructionInterest: Math.round(constructionInterest * 100) / 100,
    loanTermYears,
    interestRate,
    costBreakdown: {
      principal: Math.round(loanAmount * 100) / 100,
      interest: Math.round(totalInterest * 100) / 100,
      constructionInterest: Math.round(constructionInterest * 100) / 100
    }
  };
}

/**
 * Calculate construction contingencies and reserves
 */
export function calculateConstructionContingencies(
  baseCost: number,
  projectType: 'residential' | 'commercial' | 'industrial' = 'residential',
  projectComplexity: 'simple' | 'moderate' | 'complex' = 'moderate',
  locationRisk: 'low' | 'medium' | 'high' = 'medium'
): {
  baseCost: number;
  contingencyAmount: number;
  totalCostWithContingency: number;
  contingencyPercentage: number;
  contingencyBreakdown: {
    general: number;
    weather: number;
    materialPrice: number;
    labor: number;
    permits: number;
  };
  projectType: string;
  riskLevel: string;
} {
  if (baseCost <= 0) {
    throw new Error('Base cost must be positive');
  }

  // Base contingency percentages by project type
  const baseContingencies = {
    residential: {
      general: 5,
      weather: 3,
      materialPrice: 4,
      labor: 3,
      permits: 2
    },
    commercial: {
      general: 8,
      weather: 4,
      materialPrice: 6,
      labor: 5,
      permits: 4
    },
    industrial: {
      general: 12,
      weather: 5,
      materialPrice: 8,
      labor: 7,
      permits: 6
    }
  };

  // Complexity multipliers
  const complexityMultipliers = {
    simple: 0.8,
    moderate: 1.0,
    complex: 1.4
  };

  // Location risk multipliers
  const riskMultipliers = {
    low: 0.9,
    medium: 1.0,
    high: 1.2
  };

  const baseRates = baseContingencies[projectType];
  const complexityMultiplier = complexityMultipliers[projectComplexity];
  const riskMultiplier = riskMultipliers[locationRisk];

  const contingencyBreakdown = {
    general: Math.round(baseCost * (baseRates.general / 100) * complexityMultiplier * riskMultiplier * 100) / 100,
    weather: Math.round(baseCost * (baseRates.weather / 100) * complexityMultiplier * riskMultiplier * 100) / 100,
    materialPrice: Math.round(baseCost * (baseRates.materialPrice / 100) * complexityMultiplier * riskMultiplier * 100) / 100,
    labor: Math.round(baseCost * (baseRates.labor / 100) * complexityMultiplier * riskMultiplier * 100) / 100,
    permits: Math.round(baseCost * (baseRates.permits / 100) * complexityMultiplier * riskMultiplier * 100) / 100
  };

  const contingencyAmount = Object.values(contingencyBreakdown).reduce((sum, amount) => sum + amount, 0);
  const contingencyPercentage = Math.round((contingencyAmount / baseCost) * 100 * 100) / 100;
  const totalCostWithContingency = Math.round((baseCost + contingencyAmount) * 100) / 100;

  return {
    baseCost: Math.round(baseCost * 100) / 100,
    contingencyAmount: Math.round(contingencyAmount * 100) / 100,
    totalCostWithContingency,
    contingencyPercentage,
    contingencyBreakdown,
    projectType,
    riskLevel: locationRisk
  };
}

/**
 * Calculate construction waste and environmental impact
 */
export function calculateConstructionWaste(
  squareFootage: number,
  constructionType: 'new' | 'remodel' | 'demolition' = 'new',
  wasteReduction: 'none' | 'moderate' | 'extensive' = 'moderate'
): {
  totalWaste: number;
  wastePerSqFt: number;
  recyclableWaste: number;
  landfillWaste: number;
  wasteBreakdown: {
    wood: number;
    concrete: number;
    metal: number;
    drywall: number;
    insulation: number;
    other: number;
  };
  environmentalImpact: {
    co2Equivalent: number;
    landfillDiversion: number;
    recyclingRate: number;
  };
  squareFootage: number;
  constructionType: string;
} {
  if (squareFootage <= 0) {
    throw new Error('Square footage must be positive');
  }

  // Waste factors per square foot by construction type
  const wasteFactors = {
    new: {
      wood: 8,
      concrete: 15,
      metal: 3,
      drywall: 6,
      insulation: 2,
      other: 4
    },
    remodel: {
      wood: 12,
      concrete: 8,
      metal: 4,
      drywall: 8,
      insulation: 3,
      other: 5
    },
    demolition: {
      wood: 25,
      concrete: 40,
      metal: 8,
      drywall: 15,
      insulation: 6,
      other: 10
    }
  };

  // Waste reduction factors
  const reductionFactors = {
    none: 1.0,
    moderate: 0.8,
    extensive: 0.6
  };

  const baseWaste = wasteFactors[constructionType];
  const reductionFactor = reductionFactors[wasteReduction];

  const wasteBreakdown = {
    wood: Math.round(baseWaste.wood * squareFootage * reductionFactor * 100) / 100,
    concrete: Math.round(baseWaste.concrete * squareFootage * reductionFactor * 100) / 100,
    metal: Math.round(baseWaste.metal * squareFootage * reductionFactor * 100) / 100,
    drywall: Math.round(baseWaste.drywall * squareFootage * reductionFactor * 100) / 100,
    insulation: Math.round(baseWaste.insulation * squareFootage * reductionFactor * 100) / 100,
    other: Math.round(baseWaste.other * squareFootage * reductionFactor * 100) / 100
  };

  const totalWaste = Object.values(wasteBreakdown).reduce((sum, waste) => sum + waste, 0);
  const wastePerSqFt = Math.round((totalWaste / squareFootage) * 100) / 100;

  // Recycling estimates
  const recyclingRates = {
    wood: 0.7,
    concrete: 0.8,
    metal: 0.95,
    drywall: 0.6,
    insulation: 0.5,
    other: 0.4
  };

  const recyclableWaste = Object.entries(wasteBreakdown)
    .reduce((sum, [material, amount]) => sum + amount * recyclingRates[material as keyof typeof recyclingRates], 0);

  const landfillWaste = totalWaste - recyclableWaste;

  // Environmental impact estimates (rough approximations)
  const co2Equivalent = Math.round(totalWaste * 0.5 * 100) / 100; // kg CO2 per pound of waste
  const landfillDiversion = Math.round((recyclableWaste / totalWaste) * 100 * 100) / 100;
  const recyclingRate = Math.round((recyclableWaste / totalWaste) * 100 * 100) / 100;

  return {
    totalWaste: Math.round(totalWaste * 100) / 100,
    wastePerSqFt,
    recyclableWaste: Math.round(recyclableWaste * 100) / 100,
    landfillWaste: Math.round(landfillWaste * 100) / 100,
    wasteBreakdown,
    environmentalImpact: {
      co2Equivalent,
      landfillDiversion,
      recyclingRate
    },
    squareFootage,
    constructionType
  };
}

/**
 * Main construction calculation function
 */
export function calculateConstruction(inputs: any): any {
  const {
    calculationType,
    totalCost, squareFootage, constructionType, location, qualityGrade,
    foundationType, framingType, roofingType, sidingType,
    laborRate, projectComplexity, contractorExperience,
    downPaymentPercent, loanTermYears, interestRate, constructionPeriodMonths,
    baseCost, projectType, locationRisk,
    wasteReduction
  } = inputs;

  switch (calculationType) {
    case 'cost_per_sqft':
      return calculateCostPerSquareFoot(totalCost, squareFootage, constructionType, location, qualityGrade);

    case 'material_costs':
      return calculateMaterialCosts(squareFootage, foundationType, framingType, roofingType, sidingType, qualityGrade);

    case 'labor_costs':
      return calculateLaborCosts(squareFootage, constructionType, laborRate, projectComplexity, location);

    case 'timeline':
      return calculateConstructionTimeline(squareFootage, constructionType, 'medium', 'moderate', contractorExperience);

    case 'financing':
      return calculateConstructionFinancing(totalCost, downPaymentPercent, loanTermYears, interestRate, constructionPeriodMonths);

    case 'contingencies':
      return calculateConstructionContingencies(baseCost, projectType, projectComplexity, locationRisk);

    case 'waste':
      return calculateConstructionWaste(squareFootage, constructionType, wasteReduction);

    case 'comprehensive':
      // Calculate all components for a comprehensive construction estimate
      const costPerSqFt = calculateCostPerSquareFoot(totalCost || 250000, squareFootage || 2000, constructionType || 'standard', location || 'suburban', qualityGrade || 'standard');
      const materials = calculateMaterialCosts(squareFootage || 2000, foundationType || 'slab', framingType || 'wood', roofingType || 'asphalt', sidingType || 'vinyl', qualityGrade || 'standard');
      const labor = calculateLaborCosts(squareFootage || 2000, constructionType || 'new_construction', laborRate || 50, projectComplexity || 'moderate', location || 'suburban');
      const timeline = calculateConstructionTimeline(squareFootage || 2000, constructionType || 'new_construction', 'medium', 'moderate', contractorExperience || 'experienced');
      const financing = calculateConstructionFinancing(totalCost || 250000, downPaymentPercent || 20, loanTermYears || 30, interestRate || 4.5, constructionPeriodMonths || 6);
      const contingencies = calculateConstructionContingencies(totalCost || 250000, projectType || 'residential', projectComplexity || 'moderate', locationRisk || 'medium');

      const totalEstimatedCost = costPerSqFt.adjustedCostPerSqFt * squareFootage;
      const totalWithContingency = totalEstimatedCost + contingencies.contingencyAmount;

      return {
        costPerSqFt,
        materials,
        labor,
        timeline,
        financing,
        contingencies,
        summary: {
          squareFootage: squareFootage || 2000,
          totalEstimatedCost: Math.round(totalEstimatedCost * 100) / 100,
          totalWithContingency: Math.round(totalWithContingency * 100) / 100,
          costPerSqFt: Math.round((totalEstimatedCost / squareFootage) * 100) / 100,
          projectDuration: timeline.totalMonths,
          monthlyPayment: financing.monthlyPayment
        }
      };

    default:
      throw new Error('Unknown construction calculation type');
  }
}