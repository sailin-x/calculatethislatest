import { RealEstateDepreciationScheduleInputs, RealEstateDepreciationScheduleOutputs, RealEstateDepreciationScheduleAnalysis, RealEstateDepreciationScheduleMetrics, DepreciationYear, DepreciationSchedule, ComponentSchedule, TaxImpact, CostSegregationAnalysis, BonusDepreciationAnalysis, Section179Analysis, DispositionAnalysis, TaxLiabilityAnalysis } from './types';

export function calculateRealEstateDepreciationSchedule(inputs: RealEstateDepreciationScheduleInputs): RealEstateDepreciationScheduleOutputs {
  // Calculate basic metrics
  const metrics = calculateRealEstateDepreciationScheduleMetrics(inputs);
  
  // Generate depreciation schedule
  const depreciationSchedule = generateDepreciationSchedule(inputs);
  
  // Generate component schedules if cost segregation is used
  const componentSchedules = inputs.costSegregationStudy ? generateComponentSchedules(inputs) : [];
  
  // Calculate tax impacts
  const taxImpacts = calculateTaxImpacts(inputs, depreciationSchedule);
  
  // Generate analysis
  const analysis = generateAnalysis(inputs, metrics, depreciationSchedule);
  
  // Calculate specialized analyses
  const costSegregationAnalysis = calculateCostSegregationAnalysis(inputs);
  const bonusDepreciationAnalysis = calculateBonusDepreciationAnalysis(inputs);
  const section179Analysis = calculateSection179Analysis(inputs);
  const dispositionAnalysis = calculateDispositionAnalysis(inputs, depreciationSchedule);
  const taxLiabilityAnalysis = calculateTaxLiabilityAnalysis(inputs, metrics);
  
  // Generate summary and recommendations
  const depreciationSummary = generateDepreciationSummary(inputs, metrics, analysis);
  const recommendations = generateRecommendations(inputs, metrics, analysis);
  
  // Compile key metrics
  const keyMetrics = {
    totalDepreciableBasis: metrics.totalDepreciableBasis,
    totalDepreciationTaken: metrics.totalDepreciationTaken,
    remainingBasis: metrics.remainingBasis,
    currentYearDepreciation: metrics.currentYearDepreciation,
    taxSavings: metrics.taxSavings,
    effectiveTaxRate: metrics.effectiveTaxRate,
    cashFlowImpact: metrics.cashFlowImpact,
    recoveryPercentage: metrics.recoveryPercentage,
    yearsRemaining: metrics.yearsRemaining,
    annualDepreciation: metrics.annualDepreciation,
    monthlyDepreciation: metrics.monthlyDepreciation,
    depreciationEfficiency: metrics.depreciationEfficiency,
    taxBenefitRatio: metrics.taxBenefitRatio,
    cashFlowEnhancement: metrics.cashFlowEnhancement,
    roiOnDepreciation: metrics.roiOnDepreciation
  };
  
  // Compile assumptions
  const assumptions = {
    depreciationMethod: inputs.depreciationMethod,
    recoveryPeriod: inputs.recoveryPeriod,
    convention: inputs.convention,
    taxRate: inputs.taxRate,
    stateTaxRate: inputs.stateTaxRate,
    localTaxRate: inputs.localTaxRate,
    costSegregationStudy: inputs.costSegregationStudy,
    bonusDepreciationEligible: inputs.bonusDepreciationEligible,
    section179Eligible: inputs.section179Eligible,
    amtEligible: inputs.amtEligible,
    passiveActivity: inputs.passiveActivity,
    realEstateProfessional: inputs.realEstateProfessional
  };

  return {
    metrics,
    analysis,
    depreciationSchedule,
    componentSchedules,
    taxImpacts,
    costSegregationAnalysis,
    bonusDepreciationAnalysis,
    section179Analysis,
    dispositionAnalysis,
    taxLiabilityAnalysis,
    depreciationSummary,
    recommendations,
    keyMetrics,
    assumptions
  };
}

function calculateRealEstateDepreciationScheduleMetrics(inputs: RealEstateDepreciationScheduleInputs): RealEstateDepreciationScheduleMetrics {
  const totalDepreciableBasis = inputs.totalCost - inputs.landValue;
  const currentYear = new Date().getFullYear();
  const acquisitionYear = new Date(inputs.acquisitionDate).getFullYear();
  const yearsDepreciated = Math.max(0, currentYear - acquisitionYear);
  
  // Calculate annual depreciation based on method
  let annualDepreciation = 0;
  let totalDepreciationTaken = 0;
  
  switch (inputs.depreciationMethod) {
    case 'straight-line':
      annualDepreciation = (totalDepreciableBasis - inputs.salvageValue) / inputs.recoveryPeriod;
      totalDepreciationTaken = annualDepreciation * yearsDepreciated;
      break;
    case 'accelerated':
      // MACRS accelerated depreciation
      const macrsRate = calculateMACRSRate(inputs.recoveryPeriod, yearsDepreciated);
      annualDepreciation = totalDepreciableBasis * macrsRate;
      totalDepreciationTaken = calculateAccumulatedMACRS(totalDepreciableBasis, inputs.recoveryPeriod, yearsDepreciated);
      break;
    case 'bonus':
    case 'bonus-depreciation':
      if (inputs.bonusDepreciationEligible) {
        const bonusAmount = totalDepreciableBasis * (inputs.bonusDepreciationPercentage / 100);
        const remainingBasis = totalDepreciableBasis - bonusAmount;
        annualDepreciation = (remainingBasis - inputs.salvageValue) / inputs.recoveryPeriod;
        totalDepreciationTaken = bonusAmount + (annualDepreciation * yearsDepreciated);
      } else {
        annualDepreciation = (totalDepreciableBasis - inputs.salvageValue) / inputs.recoveryPeriod;
        totalDepreciationTaken = annualDepreciation * yearsDepreciated;
      }
      break;
    default:
      annualDepreciation = (totalDepreciableBasis - inputs.salvageValue) / inputs.recoveryPeriod;
      totalDepreciationTaken = annualDepreciation * yearsDepreciated;
  }
  
  // Apply Section 179 if eligible
  if (inputs.section179Eligible && inputs.section179Deduction > 0) {
    totalDepreciationTaken += inputs.section179Deduction;
  }
  
  const remainingBasis = totalDepreciableBasis - totalDepreciationTaken;
  const currentYearDepreciation = Math.min(annualDepreciation, remainingBasis);
  const accumulatedDepreciation = totalDepreciationTaken;
  
  // Calculate tax impact
  const totalTaxRate = inputs.taxRate + inputs.stateTaxRate + inputs.localTaxRate;
  const taxSavings = totalDepreciationTaken * (totalTaxRate / 100);
  const effectiveTaxRate = totalTaxRate;
  const netTaxBenefit = taxSavings;
  const cashFlowImpact = taxSavings;
  
  // Calculate recovery metrics
  const recoveryPercentage = (totalDepreciationTaken / totalDepreciableBasis) * 100;
  const yearsRemaining = Math.max(0, inputs.recoveryPeriod - yearsDepreciated);
  const monthlyDepreciation = annualDepreciation / 12;
  
  // Calculate performance metrics
  const depreciationEfficiency = (taxSavings / totalDepreciableBasis) * 100;
  const taxBenefitRatio = taxSavings / totalDepreciationTaken;
  const cashFlowEnhancement = (cashFlowImpact / totalDepreciableBasis) * 100;
  const roiOnDepreciation = (taxSavings / totalDepreciableBasis) * 100;

  return {
    totalDepreciableBasis,
    totalDepreciationTaken,
    remainingBasis,
    currentYearDepreciation,
    accumulatedDepreciation,
    costSegregationSavings: 0, // Will be calculated separately
    acceleratedDepreciation: 0, // Will be calculated separately
    bonusDepreciationTaken: inputs.bonusDepreciationEligible ? totalDepreciableBasis * (inputs.bonusDepreciationPercentage / 100) : 0,
    section179DeductionTaken: inputs.section179Eligible ? inputs.section179Deduction : 0,
    taxSavings,
    effectiveTaxRate,
    netTaxBenefit,
    cashFlowImpact,
    recoveryPercentage,
    yearsRemaining,
    annualDepreciation,
    monthlyDepreciation,
    gainOrLoss: 0, // Will be calculated in disposition analysis
    recapturedDepreciation: 0, // Will be calculated in disposition analysis
    capitalGain: 0, // Will be calculated in disposition analysis
    taxLiability: 0, // Will be calculated in disposition analysis
    depreciationEfficiency,
    taxBenefitRatio,
    cashFlowEnhancement,
    roiOnDepreciation
  };
}

function generateDepreciationSchedule(inputs: RealEstateDepreciationScheduleInputs): DepreciationSchedule {
  const totalDepreciableBasis = inputs.totalCost - inputs.landValue;
  const acquisitionYear = new Date(inputs.acquisitionDate).getFullYear();
  const years: DepreciationYear[] = [];
  
  let beginningBasis = totalDepreciableBasis;
  let accumulatedDepreciation = 0;
  
  for (let year = acquisitionYear; year < acquisitionYear + inputs.recoveryPeriod; year++) {
    let depreciationAmount = 0;
    let depreciationRate = 0;
    
    // Calculate depreciation based on method
    switch (inputs.depreciationMethod) {
      case 'straight-line':
        depreciationAmount = (totalDepreciableBasis - inputs.salvageValue) / inputs.recoveryPeriod;
        depreciationRate = (depreciationAmount / totalDepreciableBasis) * 100;
        break;
      case 'accelerated':
        const macrsRate = calculateMACRSRate(inputs.recoveryPeriod, year - acquisitionYear);
        depreciationAmount = beginningBasis * macrsRate;
        depreciationRate = macrsRate * 100;
        break;
      case 'bonus':
      case 'bonus-depreciation':
        if (inputs.bonusDepreciationEligible && year === inputs.bonusDepreciationYear) {
          depreciationAmount = beginningBasis * (inputs.bonusDepreciationPercentage / 100);
          depreciationRate = (inputs.bonusDepreciationPercentage);
        } else {
          const remainingBasis = beginningBasis - (beginningBasis * (inputs.bonusDepreciationPercentage / 100));
          depreciationAmount = (remainingBasis - inputs.salvageValue) / inputs.recoveryPeriod;
          depreciationRate = (depreciationAmount / totalDepreciableBasis) * 100;
        }
        break;
      default:
        depreciationAmount = (totalDepreciableBasis - inputs.salvageValue) / inputs.recoveryPeriod;
        depreciationRate = (depreciationAmount / totalDepreciableBasis) * 100;
    }
    
    // Apply Section 179 if eligible
    if (inputs.section179Eligible && year === inputs.section179Year) {
      depreciationAmount += inputs.section179Deduction;
    }
    
    // Ensure we don't depreciate below salvage value
    if (beginningBasis - depreciationAmount < inputs.salvageValue) {
      depreciationAmount = beginningBasis - inputs.salvageValue;
    }
    
    const endingBasis = beginningBasis - depreciationAmount;
    accumulatedDepreciation += depreciationAmount;
    
    // Calculate tax savings
    const totalTaxRate = inputs.taxRate + inputs.stateTaxRate + inputs.localTaxRate;
    const taxSavings = depreciationAmount * (totalTaxRate / 100);
    const cashFlowImpact = taxSavings;
    
    years.push({
      year,
      beginningBasis,
      depreciationRate,
      depreciationAmount,
      endingBasis,
      accumulatedDepreciation,
      taxSavings,
      cashFlowImpact
    });
    
    beginningBasis = endingBasis;
  }
  
  return {
    propertyName: inputs.propertyName,
    propertyType: inputs.propertyType,
    acquisitionDate: inputs.acquisitionDate,
    totalCost: inputs.totalCost,
    landValue: inputs.landValue,
    depreciableBasis: totalDepreciableBasis,
    recoveryPeriod: inputs.recoveryPeriod,
    depreciationMethod: inputs.depreciationMethod,
    convention: inputs.convention,
    years,
    totalDepreciation: accumulatedDepreciation,
    remainingBasis: beginningBasis
  };
}

function generateComponentSchedules(inputs: RealEstateDepreciationScheduleInputs): ComponentSchedule[] {
  return inputs.segregatedComponents.map(component => {
    const years: DepreciationYear[] = [];
    let beginningBasis = component.originalCost;
    let accumulatedDepreciation = 0;
    
    for (let year = 0; year < component.recoveryPeriod; year++) {
      let depreciationAmount = 0;
      let depreciationRate = 0;
      
      switch (component.depreciationMethod) {
        case 'straight-line':
          depreciationAmount = component.originalCost / component.recoveryPeriod;
          depreciationRate = (depreciationAmount / component.originalCost) * 100;
          break;
        case 'accelerated':
          const macrsRate = calculateMACRSRate(component.recoveryPeriod, year);
          depreciationAmount = beginningBasis * macrsRate;
          depreciationRate = macrsRate * 100;
          break;
        case 'bonus':
          if (year === 0) {
            depreciationAmount = component.originalCost * 0.5; // 50% bonus depreciation
            depreciationRate = 50;
          } else {
            depreciationAmount = (component.originalCost - (component.originalCost * 0.5)) / (component.recoveryPeriod - 1);
            depreciationRate = (depreciationAmount / component.originalCost) * 100;
          }
          break;
        default:
          depreciationAmount = component.originalCost / component.recoveryPeriod;
          depreciationRate = (depreciationAmount / component.originalCost) * 100;
      }
      
      const endingBasis = beginningBasis - depreciationAmount;
      accumulatedDepreciation += depreciationAmount;
      
      const totalTaxRate = inputs.taxRate + inputs.stateTaxRate + inputs.localTaxRate;
      const taxSavings = depreciationAmount * (totalTaxRate / 100);
      const cashFlowImpact = taxSavings;
      
      years.push({
        year: new Date(component.placedInServiceDate).getFullYear() + year,
        beginningBasis,
        depreciationRate,
        depreciationAmount,
        endingBasis,
        accumulatedDepreciation,
        taxSavings,
        cashFlowImpact
      });
      
      beginningBasis = endingBasis;
    }
    
    return {
      componentName: component.componentName,
      componentType: component.componentType,
      originalCost: component.originalCost,
      recoveryPeriod: component.recoveryPeriod,
      depreciationMethod: component.depreciationMethod,
      years,
      totalDepreciation: accumulatedDepreciation,
      remainingBasis: beginningBasis
    };
  });
}

function calculateTaxImpacts(inputs: RealEstateDepreciationScheduleInputs, depreciationSchedule: DepreciationSchedule): TaxImpact[] {
  const totalTaxRate = inputs.taxRate + inputs.stateTaxRate + inputs.localTaxRate;
  
  return depreciationSchedule.years.map(year => {
    const depreciationDeduction = year.depreciationAmount;
    const taxSavings = depreciationDeduction * (totalTaxRate / 100);
    const effectiveTaxRate = totalTaxRate;
    const marginalTaxRate = inputs.taxRate;
    const netTaxBenefit = taxSavings;
    const cashFlowImpact = taxSavings;
    
    return {
      year: year.year,
      depreciationDeduction,
      taxSavings,
      effectiveTaxRate,
      marginalTaxRate,
      netTaxBenefit,
      cashFlowImpact
    };
  });
}

function generateAnalysis(inputs: RealEstateDepreciationScheduleInputs, metrics: RealEstateDepreciationScheduleMetrics, depreciationSchedule: DepreciationSchedule): RealEstateDepreciationScheduleAnalysis {
  // Determine strategy type
  let depreciationStrategy = 'balanced';
  let strategyScore = 50;
  
  if (inputs.bonusDepreciationEligible && inputs.costSegregationStudy) {
    depreciationStrategy = 'aggressive';
    strategyScore = 85;
  } else if (inputs.bonusDepreciationEligible || inputs.costSegregationStudy) {
    depreciationStrategy = 'optimal';
    strategyScore = 75;
  } else if (inputs.depreciationMethod === 'straight-line') {
    depreciationStrategy = 'conservative';
    strategyScore = 30;
  }
  
  // Generate key benefits
  const keyBenefits = [
    `Tax savings of ${metrics.taxSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} over the recovery period`,
    `Cash flow enhancement of ${metrics.cashFlowImpact.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
    `${metrics.recoveryPercentage.toFixed(1)}% of depreciable basis recovered`,
    `Effective tax rate of ${metrics.effectiveTaxRate.toFixed(1)}%`
  ];
  
  if (inputs.bonusDepreciationEligible) {
    keyBenefits.push('Bonus depreciation provides accelerated tax benefits');
  }
  
  if (inputs.costSegregationStudy) {
    keyBenefits.push('Cost segregation study maximizes depreciation deductions');
  }
  
  // Generate key risks
  const keyRisks = [
    'Depreciation recapture may apply upon sale',
    'Tax law changes could affect depreciation rules',
    'Alternative Minimum Tax (AMT) may limit benefits',
    'Passive activity rules may restrict deductions'
  ];
  
  if (inputs.bonusDepreciationEligible) {
    keyRisks.push('Bonus depreciation creates larger recapture potential');
  }
  
  // Generate recommendations
  const recommendations = [
    'Consider cost segregation study for properties over $500,000',
    'Monitor tax law changes affecting depreciation rules',
    'Plan for depreciation recapture in exit strategy',
    'Consult with tax professional for complex scenarios'
  ];
  
  if (!inputs.bonusDepreciationEligible && inputs.totalCost > 1000000) {
    recommendations.push('Consider bonus depreciation for eligible property');
  }
  
  if (inputs.passiveActivity && !inputs.realEstateProfessional) {
    recommendations.push('Consider real estate professional status to avoid passive loss limitations');
  }
  
  // Generate analysis text
  const taxAnalysis = `This depreciation strategy provides ${metrics.taxSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} in tax savings over ${inputs.recoveryPeriod} years, representing a ${metrics.depreciationEfficiency.toFixed(1)}% efficiency ratio.`;
  
  const cashFlowAnalysis = `The depreciation deductions enhance cash flow by ${metrics.cashFlowImpact.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} annually, improving the property's overall return on investment.`;
  
  const roiAnalysis = `The depreciation strategy provides a ${metrics.roiOnDepreciation.toFixed(1)}% return on the depreciable basis through tax savings and cash flow enhancement.`;
  
  const riskAnalysis = `The primary risks include depreciation recapture upon sale and potential changes in tax law. The strategy score of ${strategyScore}/100 indicates ${strategyScore >= 70 ? 'strong' : strategyScore >= 50 ? 'moderate' : 'conservative'} optimization.`;
  
  return {
    depreciationStrategy,
    strategyScore,
    keyBenefits,
    keyRisks,
    recommendations,
    taxAnalysis,
    cashFlowAnalysis,
    roiAnalysis,
    riskAnalysis,
    costSegregationAnalysis: {} as CostSegregationAnalysis, // Will be calculated separately
    bonusDepreciationAnalysis: {} as BonusDepreciationAnalysis, // Will be calculated separately
    section179Analysis: {} as Section179Analysis, // Will be calculated separately
    dispositionAnalysis: {} as DispositionAnalysis, // Will be calculated separately
    taxLiabilityAnalysis: {} as TaxLiabilityAnalysis, // Will be calculated separately
    complianceStatus: 'compliant',
    complianceIssues: [],
    complianceRecommendations: []
  };
}

function calculateCostSegregationAnalysis(inputs: RealEstateDepreciationScheduleInputs): CostSegregationAnalysis {
  const eligible = inputs.totalCost > 500000 && inputs.propertyType !== 'land-development';
  const potentialSavings = eligible ? (inputs.totalCost - inputs.landValue) * 0.15 : 0; // 15% typical savings
  const studyCost = inputs.costSegregationStudyCost || (inputs.totalCost * 0.002); // 0.2% of total cost
  const netBenefit = potentialSavings - studyCost;
  const paybackPeriod = potentialSavings > 0 ? studyCost / (potentialSavings / 5) : 0; // 5-year benefit period
  const recommended = netBenefit > 0 && paybackPeriod < 2;
  
  let analysis = 'Cost segregation is not recommended for this property.';
  if (eligible) {
    analysis = `Cost segregation could provide ${potentialSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} in additional depreciation over 5 years, with a payback period of ${paybackPeriod.toFixed(1)} years.`;
  }
  
  return {
    eligible,
    potentialSavings,
    studyCost,
    netBenefit,
    paybackPeriod,
    recommended,
    analysis
  };
}

function calculateBonusDepreciationAnalysis(inputs: RealEstateDepreciationScheduleInputs): BonusDepreciationAnalysis {
  const eligible = inputs.bonusDepreciationEligible && inputs.totalCost > 0;
  const maximumDeduction = eligible ? (inputs.totalCost - inputs.landValue) * (inputs.bonusDepreciationPercentage / 100) : 0;
  const recommendedDeduction = maximumDeduction;
  const taxSavings = recommendedDeduction * ((inputs.taxRate + inputs.stateTaxRate + inputs.localTaxRate) / 100);
  
  let analysis = 'Bonus depreciation is not available for this property.';
  if (eligible) {
    analysis = `Bonus depreciation of ${maximumDeduction.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} provides immediate tax savings of ${taxSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.`;
  }
  
  return {
    eligible,
    maximumDeduction,
    recommendedDeduction,
    taxSavings,
    analysis
  };
}

function calculateSection179Analysis(inputs: RealEstateDepreciationScheduleInputs): Section179Analysis {
  const eligible = inputs.section179Eligible && inputs.totalCost > 0;
  const maximumDeduction = eligible ? Math.min(inputs.section179Deduction, 1000000) : 0; // $1M limit
  const recommendedDeduction = maximumDeduction;
  const taxSavings = recommendedDeduction * ((inputs.taxRate + inputs.stateTaxRate + inputs.localTaxRate) / 100);
  
  let analysis = 'Section 179 deduction is not available for this property.';
  if (eligible) {
    analysis = `Section 179 deduction of ${maximumDeduction.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} provides immediate tax savings of ${taxSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.`;
  }
  
  return {
    eligible,
    maximumDeduction,
    recommendedDeduction,
    taxSavings,
    analysis
  };
}

function calculateDispositionAnalysis(inputs: RealEstateDepreciationScheduleInputs, depreciationSchedule: DepreciationSchedule): DispositionAnalysis {
  if (!inputs.dispositionDate || inputs.dispositionAmount === 0) {
    return {
      dispositionType: 'No disposition planned',
      taxConsequences: 'No immediate tax consequences',
      recaptureAmount: 0,
      capitalGainAmount: 0,
      totalTaxLiability: 0,
      recommendations: ['Consider tax implications before disposition']
    };
  }
  
  const adjustedBasis = inputs.adjustedBasis || (inputs.totalCost - depreciationSchedule.totalDepreciation);
  const gainOrLoss = inputs.dispositionAmount - adjustedBasis;
  const recapturedDepreciation = Math.min(depreciationSchedule.totalDepreciation, gainOrLoss);
  const capitalGain = Math.max(0, gainOrLoss - recapturedDepreciation);
  
  const recaptureTax = recapturedDepreciation * 0.25; // 25% recapture rate
  const capitalGainTax = capitalGain * (inputs.taxRate / 100);
  const totalTaxLiability = recaptureTax + capitalGainTax;
  
  const taxConsequences = `Disposition results in ${gainOrLoss >= 0 ? 'gain' : 'loss'} of ${Math.abs(gainOrLoss).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} with tax liability of ${totalTaxLiability.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.`;
  
  const recommendations = [
    'Consider 1031 exchange to defer taxes',
    'Plan for depreciation recapture',
    'Consult with tax professional for optimal strategy'
  ];
  
  return {
    dispositionType: inputs.dispositionType,
    taxConsequences,
    recaptureAmount: recapturedDepreciation,
    capitalGainAmount: capitalGain,
    totalTaxLiability,
    recommendations
  };
}

function calculateTaxLiabilityAnalysis(inputs: RealEstateDepreciationScheduleInputs, metrics: RealEstateDepreciationScheduleMetrics): TaxLiabilityAnalysis {
  const currentYearTax = 0; // Would need income information to calculate
  const projectedTaxSavings = metrics.taxSavings;
  const effectiveTaxRate = metrics.effectiveTaxRate;
  const marginalTaxRate = inputs.taxRate;
  
  const analysis = `The depreciation strategy reduces taxable income by ${metrics.totalDepreciationTaken.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} over the recovery period, providing ${projectedTaxSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} in tax savings.`;
  
  return {
    currentYearTax,
    projectedTaxSavings,
    effectiveTaxRate,
    marginalTaxRate,
    analysis
  };
}

function generateDepreciationSummary(inputs: RealEstateDepreciationScheduleInputs, metrics: RealEstateDepreciationScheduleMetrics, analysis: RealEstateDepreciationScheduleAnalysis): string {
  return `The ${inputs.propertyType} property with a total cost of ${inputs.totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} will generate ${metrics.totalDepreciationTaken.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} in depreciation deductions over ${inputs.recoveryPeriod} years using ${inputs.depreciationMethod} depreciation. This provides ${metrics.taxSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} in tax savings and enhances cash flow by ${metrics.cashFlowImpact.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}. The strategy is rated ${analysis.strategyScore}/100 for optimization.`;
}

function generateRecommendations(inputs: RealEstateDepreciationScheduleInputs, metrics: RealEstateDepreciationScheduleMetrics, analysis: RealEstateDepreciationScheduleAnalysis): string[] {
  const recommendations = [
    'Monitor tax law changes affecting depreciation rules',
    'Plan for depreciation recapture in exit strategy',
    'Consider cost segregation study for properties over $500,000',
    'Consult with tax professional for complex scenarios'
  ];
  
  if (!inputs.bonusDepreciationEligible && inputs.totalCost > 1000000) {
    recommendations.push('Consider bonus depreciation for eligible property');
  }
  
  if (inputs.passiveActivity && !inputs.realEstateProfessional) {
    recommendations.push('Consider real estate professional status to avoid passive loss limitations');
  }
  
  if (metrics.recoveryPercentage < 50) {
    recommendations.push('Consider accelerated depreciation methods to increase tax benefits');
  }
  
  return recommendations;
}

// Helper functions for MACRS calculations
function calculateMACRSRate(recoveryPeriod: number, year: number): number {
  // Simplified MACRS rates - in practice, these would be lookup tables
  const rates: Record<number, number[]> = {
    27.5: [3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 3.636, 1.818],
    39: [2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 2.564, 1.282]
  };
  
  const rateArray = rates[recoveryPeriod] || rates[27.5];
  return (rateArray[year] || 0) / 100;
}

function calculateAccumulatedMACRS(basis: number, recoveryPeriod: number, years: number): number {
  let accumulated = 0;
  for (let i = 0; i < years; i++) {
    accumulated += basis * calculateMACRSRate(recoveryPeriod, i);
  }
  return accumulated;
}