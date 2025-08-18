import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Depreciation rates by property type and recovery period
const DEPRECIATION_RATES = {
  '5-year': {
    'straight-line': 0.20,
    'declining-balance': 0.40,
    'sum-of-years': [0.333, 0.267, 0.200, 0.133, 0.067]
  },
  '7-year': {
    'straight-line': 0.143,
    'declining-balance': 0.286,
    'sum-of-years': [0.250, 0.214, 0.179, 0.143, 0.107, 0.071, 0.036]
  },
  '15-year': {
    'straight-line': 0.067,
    'declining-balance': 0.133,
    'sum-of-years': [0.133, 0.125, 0.117, 0.109, 0.101, 0.093, 0.085, 0.077, 0.069, 0.061, 0.053, 0.045, 0.037, 0.029, 0.021]
  },
  '27.5-year': {
    'straight-line': 0.036,
    'declining-balance': 0.072,
    'sum-of-years': [0.036, 0.035, 0.034, 0.033, 0.032, 0.031, 0.030, 0.029, 0.028, 0.027, 0.026, 0.025, 0.024, 0.023, 0.022, 0.021, 0.020, 0.019, 0.018, 0.017, 0.016, 0.015, 0.014, 0.013, 0.012, 0.011, 0.010, 0.009]
  },
  '39-year': {
    'straight-line': 0.026,
    'declining-balance': 0.051,
    'sum-of-years': [0.026, 0.025, 0.024, 0.023, 0.022, 0.021, 0.020, 0.019, 0.018, 0.017, 0.016, 0.015, 0.014, 0.013, 0.012, 0.011, 0.010, 0.009, 0.008, 0.007, 0.006, 0.005, 0.004, 0.003, 0.002, 0.001, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000]
  }
};

// Cost segregation allocation percentages by property type
const COST_SEGREGATION_ALLOCATIONS = {
  'office': {
    '5-year': 0.08,
    '7-year': 0.12,
    '15-year': 0.15,
    '39-year': 0.65
  },
  'retail': {
    '5-year': 0.12,
    '7-year': 0.15,
    '15-year': 0.18,
    '39-year': 0.55
  },
  'warehouse': {
    '5-year': 0.06,
    '7-year': 0.10,
    '15-year': 0.12,
    '39-year': 0.72
  },
  'hotel': {
    '5-year': 0.15,
    '7-year': 0.18,
    '15-year': 0.20,
    '39-year': 0.47
  },
  'apartment': {
    '5-year': 0.05,
    '7-year': 0.08,
    '15-year': 0.10,
    '39-year': 0.77
  },
  'restaurant': {
    '5-year': 0.18,
    '7-year': 0.20,
    '15-year': 0.22,
    '39-year': 0.40
  },
  'medical': {
    '5-year': 0.10,
    '7-year': 0.14,
    '15-year': 0.16,
    '39-year': 0.60
  },
  'mixed-use': {
    '5-year': 0.09,
    '7-year': 0.13,
    '15-year': 0.16,
    '39-year': 0.62
  }
};

// Calculate depreciation for a given year
function calculateYearlyDepreciation(cost: number, recoveryPeriod: string, method: string, year: number, convention: string): number {
  const rates = DEPRECIATION_RATES[recoveryPeriod as keyof typeof DEPRECIATION_RATES];
  if (!rates) return 0;

  let rate = 0;
  switch (method) {
    case 'straight-line':
      rate = rates['straight-line'];
      break;
    case 'declining-balance':
      rate = rates['declining-balance'];
      break;
    case 'sum-of-years':
      const sumOfYearsRates = rates['sum-of-years'];
      rate = sumOfYearsRates[Math.min(year - 1, sumOfYearsRates.length - 1)] || 0;
      break;
    default:
      rate = rates['straight-line'];
  }

  // Apply convention adjustment
  let conventionMultiplier = 1;
  switch (convention) {
    case 'mid-month':
      conventionMultiplier = 0.5;
      break;
    case 'mid-quarter':
      conventionMultiplier = 0.75;
      break;
    case 'half-year':
      conventionMultiplier = 0.5;
      break;
  }

  return cost * rate * conventionMultiplier;
}

// Calculate standard depreciation schedule
function calculateStandardDepreciationSchedule(inputs: CalculatorInputs): any[] {
  const buildingCost = inputs.buildingCost as number;
  const siteImprovements = inputs.siteImprovements as number;
  const personalProperty = inputs.personalProperty as number;
  const landImprovements = inputs.landImprovements as number;
  const recoveryPeriod = inputs.recoveryPeriod as string;
  const depreciationMethod = inputs.depreciationMethod as string;
  const convention = inputs.convention as string;
  const acquisitionDate = new Date(inputs.acquisitionDate as string);
  const taxYear = inputs.taxYear as number;
  const propertyAge = inputs.propertyAge as number;

  const schedule: any[] = [];
  const totalYears = parseInt(recoveryPeriod) || 39;

  for (let year = 1; year <= totalYears; year++) {
    const currentYear = acquisitionDate.getFullYear() + year - 1;
    if (currentYear > taxYear + 20) break; // Limit to 20 years into future

    const buildingDepreciation = calculateYearlyDepreciation(buildingCost, recoveryPeriod, depreciationMethod, year, convention);
    const siteDepreciation = calculateYearlyDepreciation(siteImprovements, '15-year', depreciationMethod, year, convention);
    const personalDepreciation = calculateYearlyDepreciation(personalProperty, '5-year', depreciationMethod, year, convention);
    const landDepreciation = calculateYearlyDepreciation(landImprovements, '15-year', depreciationMethod, year, convention);

    const totalDepreciation = buildingDepreciation + siteDepreciation + personalDepreciation + landDepreciation;

    schedule.push({
      year: currentYear,
      buildingDepreciation: Math.round(buildingDepreciation),
      siteDepreciation: Math.round(siteDepreciation),
      personalDepreciation: Math.round(personalDepreciation),
      landDepreciation: Math.round(landDepreciation),
      totalDepreciation: Math.round(totalDepreciation),
      cumulativeDepreciation: Math.round(schedule.reduce((sum, item) => sum + item.totalDepreciation, 0) + totalDepreciation)
    });
  }

  return schedule;
}

// Calculate cost segregation depreciation schedule
function calculateCostSegregationSchedule(inputs: CalculatorInputs): any[] {
  const totalDepreciableCost = inputs.buildingCost as number + inputs.siteImprovements as number + inputs.personalProperty as number + inputs.landImprovements as number;
  const propertyType = inputs.propertyType as string;
  const depreciationMethod = inputs.depreciationMethod as string;
  const convention = inputs.convention as string;
  const acquisitionDate = new Date(inputs.acquisitionDate as string);
  const taxYear = inputs.taxYear as number;
  const bonusDepreciation = parseInt(inputs.bonusDepreciation as string) / 100;

  const allocations = COST_SEGREGATION_ALLOCATIONS[propertyType as keyof typeof COST_SEGREGATION_ALLOCATIONS] || COST_SEGREGATION_ALLOCATIONS.office;

  const schedule: any[] = [];
  const maxYears = 39;

  for (let year = 1; year <= maxYears; year++) {
    const currentYear = acquisitionDate.getFullYear() + year - 1;
    if (currentYear > taxYear + 20) break;

    let fiveYearDepreciation = 0;
    let sevenYearDepreciation = 0;
    let fifteenYearDepreciation = 0;
    let thirtyNineYearDepreciation = 0;

    // Apply bonus depreciation in first year
    if (year === 1) {
      fiveYearDepreciation = totalDepreciableCost * allocations['5-year'] * bonusDepreciation;
      sevenYearDepreciation = totalDepreciableCost * allocations['7-year'] * bonusDepreciation;
      fifteenYearDepreciation = totalDepreciableCost * allocations['15-year'] * bonusDepreciation;
    }

    // Regular depreciation on remaining basis
    const remainingFiveYear = totalDepreciableCost * allocations['5-year'] * (1 - bonusDepreciation);
    const remainingSevenYear = totalDepreciableCost * allocations['7-year'] * (1 - bonusDepreciation);
    const remainingFifteenYear = totalDepreciableCost * allocations['15-year'] * (1 - bonusDepreciation);
    const remainingThirtyNineYear = totalDepreciableCost * allocations['39-year'];

    if (year > 1 || bonusDepreciation < 1) {
      fiveYearDepreciation += calculateYearlyDepreciation(remainingFiveYear, '5-year', depreciationMethod, year, convention);
      sevenYearDepreciation += calculateYearlyDepreciation(remainingSevenYear, '7-year', depreciationMethod, year, convention);
      fifteenYearDepreciation += calculateYearlyDepreciation(remainingFifteenYear, '15-year', depreciationMethod, year, convention);
      thirtyNineYearDepreciation = calculateYearlyDepreciation(remainingThirtyNineYear, '39-year', depreciationMethod, year, convention);
    }

    const totalDepreciation = fiveYearDepreciation + sevenYearDepreciation + fifteenYearDepreciation + thirtyNineYearDepreciation;

    schedule.push({
      year: currentYear,
      fiveYearDepreciation: Math.round(fiveYearDepreciation),
      sevenYearDepreciation: Math.round(sevenYearDepreciation),
      fifteenYearDepreciation: Math.round(fifteenYearDepreciation),
      thirtyNineYearDepreciation: Math.round(thirtyNineYearDepreciation),
      totalDepreciation: Math.round(totalDepreciation),
      cumulativeDepreciation: Math.round(schedule.reduce((sum, item) => sum + item.totalDepreciation, 0) + totalDepreciation)
    });
  }

  return schedule;
}

// Calculate present value
function calculatePresentValue(futureValue: number, rate: number, years: number): number {
  return futureValue / Math.pow(1 + rate, years);
}

// Calculate internal rate of return
function calculateIRR(cashFlows: number[]): number {
  // Simplified IRR calculation
  const totalInvestment = Math.abs(cashFlows[0]);
  const totalReturns = cashFlows.slice(1).reduce((sum, flow) => sum + Math.max(0, flow), 0);
  
  if (totalInvestment === 0) return 0;
  
  const years = cashFlows.length - 1;
  return Math.pow(totalReturns / totalInvestment, 1 / years) - 1;
}

// Generate compliance risk assessment
function generateComplianceRiskAssessment(inputs: CalculatorInputs, outputs: CalculatorOutputs): any {
  const risks: any[] = [];
  
  // Property age risk
  const propertyAge = inputs.propertyAge as number;
  if (propertyAge > 15) {
    risks.push({
      type: 'property-age',
      severity: 'high',
      description: `Property is ${propertyAge} years old, which may limit cost segregation benefits`,
      mitigation: 'Consider focusing on recent renovations and improvements'
    });
  }

  // Study cost vs benefits risk
  const studyCost = inputs.studyCost as number;
  const totalTaxSavings = outputs.taxSavings;
  if (studyCost > totalTaxSavings * 0.1) {
    risks.push({
      type: 'cost-benefit',
      severity: 'medium',
      description: `Study cost represents more than 10% of total tax savings`,
      mitigation: 'Consider negotiating study cost or focusing on higher-value properties'
    });
  }

  // Documentation risk
  risks.push({
    type: 'documentation',
    severity: 'medium',
    description: 'Ensure proper documentation and professional study for IRS compliance',
    mitigation: 'Use qualified cost segregation professionals and maintain detailed records'
  });

  // Recapture risk
  if (outputs.depreciationRecapture > 0) {
    risks.push({
      type: 'recapture',
      severity: 'low',
      description: `Potential depreciation recapture of $${outputs.depreciationRecapture.toLocaleString()} on sale`,
      mitigation: 'Consider 1031 exchange or hold property long-term to defer recapture'
    });
  }

  return {
    risks,
    riskScore: risks.length,
    overallRisk: risks.length === 0 ? 'low' : risks.length <= 2 ? 'medium' : 'high',
    recommendations: [
      'Use qualified cost segregation professionals',
      'Maintain detailed documentation',
      'Consider timing of study relative to property acquisition',
      'Evaluate impact on future property sales'
    ]
  };
}

export function calculateCostSegregation(inputs: CalculatorInputs): CalculatorOutputs {
  const totalPropertyCost = inputs.totalPropertyCost as number;
  const landCost = inputs.landCost as number;
  const buildingCost = inputs.buildingCost as number;
  const siteImprovements = inputs.siteImprovements as number;
  const personalProperty = inputs.personalProperty as number;
  const landImprovements = inputs.landImprovements as number;
  const studyCost = inputs.studyCost as number;
  const taxYear = inputs.taxYear as number;
  const marginalTaxRate = inputs.marginalTaxRate as number;
  const stateTaxRate = inputs.stateTaxRate as number;
  const propertyType = inputs.propertyType as string;
  const bonusDepreciation = parseInt(inputs.bonusDepreciation as string) / 100;
  const section179 = inputs.section179 as number;
  const priorDepreciation = inputs.priorDepreciation as number;

  // Calculate total depreciable cost
  const totalDepreciableCost = buildingCost + siteImprovements + personalProperty + landImprovements;

  // Get cost segregation allocations
  const allocations = COST_SEGREGATION_ALLOCATIONS[propertyType as keyof typeof COST_SEGREGATION_ALLOCATIONS] || COST_SEGREGATION_ALLOCATIONS.office;

  // Calculate cost segregation allocation
  const costSegregationAllocation = {
    '5-year': Math.round(totalDepreciableCost * allocations['5-year']),
    '7-year': Math.round(totalDepreciableCost * allocations['7-year']),
    '15-year': Math.round(totalDepreciableCost * allocations['15-year']),
    '39-year': Math.round(totalDepreciableCost * allocations['39-year'])
  };

  // Calculate depreciation schedules
  const standardSchedule = calculateStandardDepreciationSchedule(inputs);
  const costSegregationSchedule = calculateCostSegregationSchedule(inputs);

  // Calculate accelerated depreciation
  const currentYearStandard = standardSchedule.find(item => item.year === taxYear)?.totalDepreciation || 0;
  const currentYearAccelerated = costSegregationSchedule.find(item => item.year === taxYear)?.totalDepreciation || 0;
  const acceleratedDepreciation = Math.max(0, currentYearAccelerated - currentYearStandard);

  // Calculate tax savings
  const totalTaxRate = (marginalTaxRate + stateTaxRate) / 100;
  const taxSavings = acceleratedDepreciation * totalTaxRate;

  // Calculate present value of tax savings
  const discountRate = 0.08; // 8% discount rate
  let presentValueTaxSavings = 0;
  for (let year = 1; year <= 20; year++) {
    const yearTaxSavings = (costSegregationSchedule.find(item => item.year === taxYear + year)?.totalDepreciation || 0) * totalTaxRate;
    presentValueTaxSavings += calculatePresentValue(yearTaxSavings, discountRate, year);
  }

  // Calculate payback period
  const paybackPeriod = studyCost > 0 ? (studyCost / taxSavings) * 12 : 0;

  // Calculate ROI
  const totalTaxSavings = costSegregationSchedule.reduce((sum, item) => sum + item.totalDepreciation, 0) * totalTaxRate;
  const roi = studyCost > 0 ? ((totalTaxSavings - studyCost) / studyCost) * 100 : 0;

  // Calculate net present value
  const netPresentValue = presentValueTaxSavings - studyCost;

  // Calculate internal rate of return
  const cashFlows = [-studyCost, ...costSegregationSchedule.slice(0, 10).map(item => item.totalDepreciation * totalTaxRate)];
  const internalRateOfReturn = calculateIRR(cashFlows) * 100;

  // Calculate depreciation recapture
  const totalAcceleratedDepreciation = costSegregationSchedule.reduce((sum, item) => sum + item.totalDepreciation, 0);
  const depreciationRecapture = totalAcceleratedDepreciation * 0.25; // 25% recapture rate

  // Calculate adjusted basis
  const adjustedBasis = totalDepreciableCost - priorDepreciation - totalAcceleratedDepreciation;

  // Calculate gain deferral benefit
  const gainDeferral = totalAcceleratedDepreciation * 0.15; // 15% capital gains rate

  // Generate cash flow impact
  const cashFlowImpact = costSegregationSchedule.slice(0, 10).map(item => ({
    year: item.year,
    taxSavings: Math.round(item.totalDepreciation * totalTaxRate),
    cumulativeTaxSavings: Math.round(costSegregationSchedule.slice(0, costSegregationSchedule.findIndex(s => s.year === item.year) + 1).reduce((sum, s) => sum + s.totalDepreciation, 0) * totalTaxRate)
  }));

  // Generate compliance risk assessment
  const complianceRisk = generateComplianceRiskAssessment(inputs, {
    taxSavings,
    depreciationRecapture
  } as CalculatorOutputs);

  return {
    totalDepreciableCost: Math.round(totalDepreciableCost),
    costSegregationAllocation,
    acceleratedDepreciation: Math.round(acceleratedDepreciation),
    taxSavings: Math.round(taxSavings),
    presentValueTaxSavings: Math.round(presentValueTaxSavings),
    paybackPeriod: Math.round(paybackPeriod),
    roi: Math.round(roi * 10) / 10,
    depreciationSchedule: costSegregationSchedule,
    cashFlowImpact,
    netPresentValue: Math.round(netPresentValue),
    internalRateOfReturn: Math.round(internalRateOfReturn * 10) / 10,
    depreciationRecapture: Math.round(depreciationRecapture),
    adjustedBasis: Math.round(adjustedBasis),
    gainDeferral: Math.round(gainDeferral),
    complianceRisk,
    costSegregationAnalysis: 'Comprehensive cost segregation analysis completed'
  };
}

export function generateCostSegregationAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const propertyType = inputs.propertyType;
  const totalPropertyCost = inputs.totalPropertyCost as number;
  const studyCost = inputs.studyCost as number;
  
  let analysis = `# Cost Segregation Analysis - ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} Property\n\n`;
  
  analysis += `## Property Summary\n`;
  analysis += `- **Property Type:** ${propertyType}\n`;
  analysis += `- **Total Property Cost:** $${totalPropertyCost.toLocaleString()}\n`;
  analysis += `- **Study Cost:** $${studyCost.toLocaleString()}\n`;
  analysis += `- **Total Depreciable Cost:** $${outputs.totalDepreciableCost.toLocaleString()}\n\n`;
  
  analysis += `## Cost Segregation Allocation\n`;
  analysis += `- **5-Year Property:** $${outputs.costSegregationAllocation['5-year'].toLocaleString()}\n`;
  analysis += `- **7-Year Property:** $${outputs.costSegregationAllocation['7-year'].toLocaleString()}\n`;
  analysis += `- **15-Year Property:** $${outputs.costSegregationAllocation['15-year'].toLocaleString()}\n`;
  analysis += `- **39-Year Property:** $${outputs.costSegregationAllocation['39-year'].toLocaleString()}\n\n`;
  
  analysis += `## Financial Benefits\n`;
  analysis += `- **Accelerated Depreciation:** $${outputs.acceleratedDepreciation.toLocaleString()}\n`;
  analysis += `- **Tax Savings:** $${outputs.taxSavings.toLocaleString()}\n`;
  analysis += `- **Present Value Tax Savings:** $${outputs.presentValueTaxSavings.toLocaleString()}\n`;
  analysis += `- **Net Present Value:** $${outputs.netPresentValue.toLocaleString()}\n\n`;
  
  analysis += `## Investment Metrics\n`;
  analysis += `- **Payback Period:** ${outputs.paybackPeriod} months\n`;
  analysis += `- **Return on Investment:** ${outputs.roi}%\n`;
  analysis += `- **Internal Rate of Return:** ${outputs.internalRateOfReturn}%\n\n`;
  
  analysis += `## Tax Implications\n`;
  analysis += `- **Depreciation Recapture:** $${outputs.depreciationRecapture.toLocaleString()}\n`;
  analysis += `- **Adjusted Basis:** $${outputs.adjustedBasis.toLocaleString()}\n`;
  analysis += `- **Gain Deferral Benefit:** $${outputs.gainDeferral.toLocaleString()}\n\n`;
  
  analysis += `## Compliance Risk Assessment\n`;
  analysis += `- **Overall Risk Level:** ${outputs.complianceRisk.overallRisk.toUpperCase()}\n`;
  analysis += `- **Risk Score:** ${outputs.complianceRisk.riskScore}/5\n\n`;
  
  if (outputs.complianceRisk.risks.length > 0) {
    analysis += `### Risk Factors:\n`;
    outputs.complianceRisk.risks.forEach((risk: any) => {
      analysis += `- **${risk.type.toUpperCase()}** (${risk.severity}): ${risk.description}\n`;
      analysis += `  - Mitigation: ${risk.mitigation}\n\n`;
    });
  }
  
  analysis += `## Recommendations\n`;
  
  if (outputs.roi > 500) {
    analysis += `- **HIGHLY RECOMMENDED** - Excellent ROI of ${outputs.roi}%\n`;
  } else if (outputs.roi > 200) {
    analysis += `- **RECOMMENDED** - Good ROI of ${outputs.roi}%\n`;
  } else if (outputs.roi > 100) {
    analysis += `- **CONSIDER** - Moderate ROI of ${outputs.roi}%\n`;
  } else {
    analysis += `- **NOT RECOMMENDED** - Low ROI of ${outputs.roi}%\n`;
  }
  
  if (outputs.paybackPeriod < 12) {
    analysis += `- Quick payback period of ${outputs.paybackPeriod} months\n`;
  }
  
  if (outputs.complianceRisk.overallRisk === 'low') {
    analysis += `- Low compliance risk makes this an attractive option\n`;
  }
  
  analysis += `\n## Implementation Steps\n`;
  analysis += `1. Engage qualified cost segregation professional\n`;
  analysis += `2. Conduct detailed property analysis and documentation\n`;
  analysis += `3. Prepare and file amended returns if applicable\n`;
  analysis += `4. Maintain detailed records for IRS compliance\n`;
  analysis += `5. Consider impact on future property disposition\n`;
  
  return analysis;
}
