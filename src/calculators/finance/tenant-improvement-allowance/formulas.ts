import { TenantImprovementAllowanceInputs, TenantImprovementAllowanceOutputs } from './TenantImprovementAllowanceCalculator';

export function calculateTenantImprovementAllowance(inputs: TenantImprovementAllowanceInputs): TenantImprovementAllowanceOutputs {
  // Set default values for optional inputs
  const softCosts = inputs.softCosts || 0;
  const hardCosts = inputs.hardCosts || 0;
  const permitFees = inputs.permitFees || 0;
  const architecturalFees = inputs.architecturalFees || 0;
  const engineeringFees = inputs.engineeringFees || 0;
  const projectManagementFees = inputs.projectManagementFees || 0;
  const demolitionCosts = inputs.demolitionCosts || 0;
  const structuralModifications = inputs.structuralModifications || 0;
  const electricalWork = inputs.electricalWork || 0;
  const plumbingWork = inputs.plumbingWork || 0;
  const hvacWork = inputs.hvacWork || 0;
  const flooringCosts = inputs.flooringCosts || 0;
  const wallFinishes = inputs.wallFinishes || 0;
  const ceilingWork = inputs.ceilingWork || 0;
  const lightingCosts = inputs.lightingCosts || 0;
  const millworkCosts = inputs.millworkCosts || 0;
  const paintingCosts = inputs.paintingCosts || 0;
  const fixturesCosts = inputs.fixturesCosts || 0;
  const technologyInfrastructure = inputs.technologyInfrastructure || 0;
  const securitySystems = inputs.securitySystems || 0;
  const signageCosts = inputs.signageCosts || 0;
  const rentAbatementPeriod = inputs.rentAbatementPeriod || 0;
  const marketTiAllowance = inputs.marketTiAllowance || 0;
  const constructionCostIndex = inputs.constructionCostIndex || 100;
  const laborCostMultiplier = inputs.laborCostMultiplier || 1.0;
  const materialCostMultiplier = inputs.materialCostMultiplier || 1.0;
  const tenantFinancialStrength = inputs.tenantFinancialStrength || 50;

  // Calculate TI allowance based on type
  let totalTiAllowance = 0;
  if (inputs.tiAllowanceType === 'per-sq-ft') {
    totalTiAllowance = inputs.tiAllowancePerSqFt * inputs.rentableSquareFootage;
  } else if (inputs.tiAllowanceType === 'lump-sum') {
    totalTiAllowance = inputs.totalTiAllowance;
  } else if (inputs.tiAllowanceType === 'percentage-of-rent') {
    totalTiAllowance = inputs.baseRent * (inputs.tiAllowancePercentage / 100);
  }

  // Calculate total construction cost if not provided
  let totalConstructionCost = inputs.totalConstructionCost;
  if (!totalConstructionCost) {
    totalConstructionCost = inputs.constructionCostPerSqFt * inputs.rentableSquareFootage;
  }

  // Calculate detailed cost breakdowns
  const hardCostsBreakdown = hardCosts + demolitionCosts + structuralModifications + 
                            electricalWork + plumbingWork + hvacWork + flooringCosts + 
                            wallFinishes + ceilingWork + lightingCosts + millworkCosts + 
                            paintingCosts + fixturesCosts + technologyInfrastructure + 
                            securitySystems + signageCosts;

  const softCostsBreakdown = softCosts + permitFees + architecturalFees + 
                            engineeringFees + projectManagementFees;

  const totalProjectCost = hardCostsBreakdown + softCostsBreakdown;

  // Calculate cost per square foot
  const costPerSqFt = totalProjectCost / inputs.rentableSquareFootage;

  // Calculate allowance utilization rate
  const allowanceUtilizationRate = totalProjectCost > 0 ? (totalProjectCost / totalTiAllowance) * 100 : 0;

  // Calculate tenant and landlord contributions
  const tenantContribution = Math.max(0, totalProjectCost - totalTiAllowance);
  const landlordContribution = Math.min(totalProjectCost, totalTiAllowance);
  const costOverrun = Math.max(0, totalProjectCost - totalTiAllowance);
  const costSavings = Math.max(0, totalTiAllowance - totalProjectCost);

  // Calculate effective rent impact
  const tiAllowanceAmortization = totalTiAllowance / inputs.leaseTerm;
  const effectiveRent = inputs.baseRent - tiAllowanceAmortization;
  const effectiveRentPerSqFt = effectiveRent / inputs.rentableSquareFootage;
  const rentImpact = tiAllowanceAmortization;

  // Calculate total lease value
  let totalLeaseValue = 0;
  let currentRent = inputs.baseRent;
  for (let year = 1; year <= inputs.leaseTerm; year++) {
    totalLeaseValue += currentRent;
    currentRent *= (1 + inputs.annualRentEscalation / 100);
  }

  // Calculate net present value (simplified)
  const discountRate = 0.08; // 8% discount rate
  let npv = -totalTiAllowance; // Initial landlord investment
  currentRent = inputs.baseRent;
  for (let year = 1; year <= inputs.leaseTerm; year++) {
    npv += currentRent / Math.pow(1 + discountRate, year);
    currentRent *= (1 + inputs.annualRentEscalation / 100);
  }

  // Calculate timeline analysis
  const constructionTimeline = inputs.constructionDuration;
  const rentAbatementValue = (inputs.baseRent / 12) * rentAbatementPeriod;
  const earlyOccupancyValue = 0; // Could be calculated based on business value
  const delayPenalties = calculateDelayPenalties(inputs);

  // Calculate market comparison
  const marketTiAllowanceComparison = marketTiAllowance - inputs.tiAllowancePerSqFt;
  const constructionCostComparison = (inputs.constructionCostPerSqFt * constructionCostIndex / 100) - inputs.constructionCostPerSqFt;

  let marketComparison = '';
  let competitivePosition: 'above-market' | 'at-market' | 'below-market' = 'at-market';

  if (marketTiAllowance > 0) {
    if (inputs.tiAllowancePerSqFt > marketTiAllowance * 1.1) {
      marketComparison = 'TI allowance is above market standards';
      competitivePosition = 'above-market';
    } else if (inputs.tiAllowancePerSqFt < marketTiAllowance * 0.9) {
      marketComparison = 'TI allowance is below market standards';
      competitivePosition = 'below-market';
    } else {
      marketComparison = 'TI allowance is at market standards';
      competitivePosition = 'at-market';
    }
  }

  // Calculate risk scores
  const constructionRisk = calculateConstructionRisk(inputs, totalProjectCost, totalTiAllowance);
  const financialRisk = calculateFinancialRisk(inputs, tenantContribution, tenantFinancialStrength);
  const marketRisk = calculateMarketRisk(inputs, marketTiAllowanceComparison);
  const timelineRisk = calculateTimelineRisk(inputs);
  const riskScore = (constructionRisk + financialRisk + marketRisk + timelineRisk) / 4;

  // Generate recommendations
  const { recommendation, negotiationStrategy, costOptimizationSuggestions, riskMitigationStrategies, alternativeApproaches } = 
    generateRecommendations(inputs, {
      totalTiAllowance,
      totalProjectCost,
      tenantContribution,
      costOverrun,
      riskScore,
      competitivePosition,
      marketTiAllowanceComparison
    });

  // Calculate ROI analysis
  const tenantROI = calculateTenantROI(inputs, totalProjectCost, effectiveRent);
  const landlordROI = calculateLandlordROI(inputs, totalTiAllowance, inputs.baseRent);
  const paybackPeriod = calculatePaybackPeriod(inputs, totalTiAllowance, inputs.baseRent);
  const internalRateOfReturn = calculateIRR(inputs, totalTiAllowance, inputs.baseRent);

  // Detailed category breakdown
  const categoryBreakdown = {
    demolition: demolitionCosts,
    structural: structuralModifications,
    electrical: electricalWork,
    plumbing: plumbingWork,
    hvac: hvacWork,
    flooring: flooringCosts,
    walls: wallFinishes,
    ceilings: ceilingWork,
    lighting: lightingCosts,
    millwork: millworkCosts,
    painting: paintingCosts,
    fixtures: fixturesCosts,
    technology: technologyInfrastructure,
    security: securitySystems,
    signage: signageCosts
  };

  return {
    totalTiAllowance,
    totalConstructionCost: totalProjectCost,
    tenantContribution,
    landlordContribution,
    costOverrun,
    costSavings,
    hardCostsBreakdown,
    softCostsBreakdown,
    totalProjectCost,
    costPerSqFt,
    allowanceUtilizationRate,
    effectiveRent,
    effectiveRentPerSqFt,
    rentImpact,
    totalLeaseValue,
    netPresentValue: npv,
    constructionTimeline,
    rentAbatementValue,
    earlyOccupancyValue,
    delayPenalties,
    marketComparison,
    competitivePosition,
    marketTiAllowanceComparison,
    constructionCostComparison,
    riskScore,
    constructionRisk,
    financialRisk,
    marketRisk,
    timelineRisk,
    recommendation,
    negotiationStrategy,
    costOptimizationSuggestions,
    riskMitigationStrategies,
    alternativeApproaches,
    categoryBreakdown,
    tenantROI,
    landlordROI,
    paybackPeriod,
    internalRateOfReturn
  };
}

function calculateDelayPenalties(inputs: TenantImprovementAllowanceInputs): number {
  // Calculate potential penalties for construction delays
  const basePenalty = inputs.baseRent / 12; // Monthly rent as base penalty
  const delayRisk = inputs.constructionDuration > 12 ? 0.1 : 0.05; // Higher risk for longer projects
  return basePenalty * delayRisk;
}

function calculateConstructionRisk(inputs: TenantImprovementAllowanceInputs, totalCost: number, tiAllowance: number): number {
  let riskScore = 50; // Base risk score

  // Cost overrun risk
  const costRatio = totalCost / tiAllowance;
  if (costRatio > 1.2) {
    riskScore += 30;
  } else if (costRatio > 1.1) {
    riskScore += 20;
  } else if (costRatio < 0.8) {
    riskScore -= 10;
  }

  // Construction duration risk
  if (inputs.constructionDuration > 16) {
    riskScore += 20;
  } else if (inputs.constructionDuration > 12) {
    riskScore += 10;
  }

  // Buildout specification risk
  switch (inputs.buildoutSpecifications) {
    case 'cold-shell':
      riskScore += 15;
      break;
    case 'warm-shell':
      riskScore += 5;
      break;
    case 'turnkey':
      riskScore -= 10;
      break;
  }

  // Sustainability requirements risk
  switch (inputs.sustainabilityRequirements) {
    case 'leed-platinum':
      riskScore += 20;
      break;
    case 'leed-gold':
      riskScore += 15;
      break;
    case 'leed-silver':
      riskScore += 10;
      break;
  }

  return Math.max(1, Math.min(100, riskScore));
}

function calculateFinancialRisk(inputs: TenantImprovementAllowanceInputs, tenantContribution: number, financialStrength: number): number {
  let riskScore = 50; // Base risk score

  // Tenant contribution risk
  if (tenantContribution > inputs.baseRent * 0.5) {
    riskScore += 25;
  } else if (tenantContribution > inputs.baseRent * 0.25) {
    riskScore += 15;
  }

  // Tenant financial strength risk
  if (financialStrength < 30) {
    riskScore += 30;
  } else if (financialStrength < 50) {
    riskScore += 20;
  } else if (financialStrength > 80) {
    riskScore -= 15;
  }

  // Tenant credit rating risk
  switch (inputs.tenantCreditRating) {
    case 'poor':
      riskScore += 25;
      break;
    case 'fair':
      riskScore += 15;
      break;
    case 'excellent':
      riskScore -= 15;
      break;
  }

  // Lease term risk
  if (inputs.leaseTerm < 3) {
    riskScore += 20;
  } else if (inputs.leaseTerm > 10) {
    riskScore -= 10;
  }

  return Math.max(1, Math.min(100, riskScore));
}

function calculateMarketRisk(inputs: TenantImprovementAllowanceInputs, marketComparison: number): number {
  let riskScore = 50; // Base risk score

  // Market comparison risk
  if (marketComparison < -10) {
    riskScore += 20; // Below market
  } else if (marketComparison > 10) {
    riskScore -= 10; // Above market
  }

  // Property class risk
  switch (inputs.propertyClass) {
    case 'class-c':
      riskScore += 15;
      break;
    case 'class-a':
      riskScore -= 10;
      break;
  }

  // Property location risk
  switch (inputs.propertyLocation) {
    case 'rural':
      riskScore += 15;
      break;
    case 'urban':
      riskScore -= 5;
      break;
  }

  // Property age risk
  if (inputs.propertyAge > 20) {
    riskScore += 15;
  } else if (inputs.propertyAge < 5) {
    riskScore -= 10;
  }

  return Math.max(1, Math.min(100, riskScore));
}

function calculateTimelineRisk(inputs: TenantImprovementAllowanceInputs): number {
  let riskScore = 50; // Base risk score

  // Construction duration risk
  if (inputs.constructionDuration > 20) {
    riskScore += 25;
  } else if (inputs.constructionDuration > 12) {
    riskScore += 15;
  }

  // Rent abatement period risk
  if (inputs.rentAbatementPeriod > 6) {
    riskScore += 20;
  } else if (inputs.rentAbatementPeriod > 3) {
    riskScore += 10;
  }

  // Timeline alignment risk
  const constructionEndToRentStart = Math.abs(
    inputs.constructionEndDate.getTime() - inputs.rentCommencementDate.getTime()
  ) / (1000 * 60 * 60 * 24 * 7); // Weeks difference

  if (constructionEndToRentStart > 4) {
    riskScore += 15;
  }

  return Math.max(1, Math.min(100, riskScore));
}

function generateRecommendations(
  inputs: TenantImprovementAllowanceInputs,
  metrics: {
    totalTiAllowance: number;
    totalProjectCost: number;
    tenantContribution: number;
    costOverrun: number;
    riskScore: number;
    competitivePosition: 'above-market' | 'at-market' | 'below-market';
    marketTiAllowanceComparison: number;
  }
): {
  recommendation: string;
  negotiationStrategy: string;
  costOptimizationSuggestions: string[];
  riskMitigationStrategies: string[];
  alternativeApproaches: string[];
} {
  const { totalTiAllowance, totalProjectCost, tenantContribution, costOverrun, riskScore, competitivePosition, marketTiAllowanceComparison } = metrics;

  // Generate recommendation
  let recommendation = '';
  if (riskScore < 30) {
    recommendation = 'Excellent TI allowance structure with low risk and competitive terms.';
  } else if (riskScore < 50) {
    recommendation = 'Good TI allowance structure with manageable risks and fair terms.';
  } else if (riskScore < 70) {
    recommendation = 'Moderate risk TI allowance structure requiring careful consideration and potential adjustments.';
  } else {
    recommendation = 'High-risk TI allowance structure requiring significant modifications or alternative approaches.';
  }

  // Generate negotiation strategy
  let negotiationStrategy = '';
  if (competitivePosition === 'below-market') {
    negotiationStrategy = 'Negotiate for higher TI allowance to align with market standards.';
  } else if (competitivePosition === 'above-market') {
    negotiationStrategy = 'Current TI allowance is competitive; focus on other lease terms.';
  } else {
    negotiationStrategy = 'TI allowance is at market; negotiate based on tenant strength and lease term.';
  }

  // Generate cost optimization suggestions
  const costOptimizationSuggestions: string[] = [];
  if (costOverrun > 0) {
    costOptimizationSuggestions.push('Consider value engineering to reduce construction costs');
    costOptimizationSuggestions.push('Negotiate with contractors for better pricing');
    costOptimizationSuggestions.push('Review scope of work for potential reductions');
  }
  if (inputs.buildoutSpecifications === 'turnkey') {
    costOptimizationSuggestions.push('Consider warm-shell or cold-shell options to reduce costs');
  }
  if (inputs.sustainabilityRequirements === 'leed-platinum') {
    costOptimizationSuggestions.push('Consider LEED Silver or Gold certification to reduce costs');
  }

  // Generate risk mitigation strategies
  const riskMitigationStrategies: string[] = [];
  if (riskScore > 50) {
    riskMitigationStrategies.push('Include contingency budget for cost overruns');
    riskMitigationStrategies.push('Establish clear construction timeline with penalties');
    riskMitigationStrategies.push('Require performance bonds from contractors');
  }
  if (tenantContribution > inputs.baseRent * 0.3) {
    riskMitigationStrategies.push('Consider amortizing tenant contribution over lease term');
    riskMitigationStrategies.push('Negotiate rent abatement during construction');
  }
  if (inputs.constructionDuration > 12) {
    riskMitigationStrategies.push('Implement phased construction approach');
    riskMitigationStrategies.push('Consider early occupancy options');
  }

  // Generate alternative approaches
  const alternativeApproaches: string[] = [];
  if (costOverrun > totalTiAllowance * 0.2) {
    alternativeApproaches.push('Consider build-to-suit arrangement');
    alternativeApproaches.push('Explore existing space with minimal improvements');
    alternativeApproaches.push('Negotiate longer lease term for higher TI allowance');
  }
  if (inputs.tenantType === 'medical' && inputs.sustainabilityRequirements === 'leed-platinum') {
    alternativeApproaches.push('Consider government incentives for medical office buildouts');
    alternativeApproaches.push('Explore healthcare-specific financing options');
  }
  if (inputs.propertyClass === 'class-c' && inputs.tenantType === 'office') {
    alternativeApproaches.push('Consider Class B properties with existing improvements');
    alternativeApproaches.push('Explore co-working or flexible office solutions');
  }

  return {
    recommendation,
    negotiationStrategy,
    costOptimizationSuggestions,
    riskMitigationStrategies,
    alternativeApproaches
  };
}

function calculateTenantROI(inputs: TenantImprovementAllowanceInputs, totalCost: number, effectiveRent: number): number {
  // Calculate tenant ROI based on investment and rent savings
  const totalInvestment = totalCost;
  const annualSavings = inputs.baseRent - effectiveRent;
  const totalSavings = annualSavings * inputs.leaseTerm;
  
  if (totalInvestment > 0) {
    return (totalSavings / totalInvestment) * 100;
  }
  return 0;
}

function calculateLandlordROI(inputs: TenantImprovementAllowanceInputs, tiAllowance: number, baseRent: number): number {
  // Calculate landlord ROI based on TI allowance and rent income
  const totalInvestment = tiAllowance;
  const totalRentIncome = baseRent * inputs.leaseTerm;
  
  if (totalInvestment > 0) {
    return ((totalRentIncome - totalInvestment) / totalInvestment) * 100;
  }
  return 0;
}

function calculatePaybackPeriod(inputs: TenantImprovementAllowanceInputs, tiAllowance: number, baseRent: number): number {
  // Calculate payback period for landlord investment
  const annualRentIncome = baseRent;
  const paybackPeriod = tiAllowance / annualRentIncome;
  return Math.min(paybackPeriod, inputs.leaseTerm);
}

function calculateIRR(inputs: TenantImprovementAllowanceInputs, tiAllowance: number, baseRent: number): number {
  // Simplified IRR calculation
  const totalRentIncome = baseRent * inputs.leaseTerm;
  const totalReturn = totalRentIncome - tiAllowance;
  const annualizedReturn = totalReturn / inputs.leaseTerm;
  
  if (tiAllowance > 0) {
    return (annualizedReturn / tiAllowance) * 100;
  }
  return 0;
}

export function generateTenantImprovementAllowanceAnalysis(
  inputs: TenantImprovementAllowanceInputs,
  outputs: TenantImprovementAllowanceOutputs
): string {
  return `# Tenant Improvement Allowance Analysis Report

## Executive Summary
This analysis evaluates the tenant improvement allowance for a ${inputs.rentableSquareFootage.toLocaleString()} sq ft ${inputs.tenantType} space in a ${inputs.propertyClass} ${inputs.propertyType} located in a ${inputs.propertyLocation} area.

## TI Allowance Overview
- **TI Allowance Type**: ${inputs.tiAllowanceType}
- **Total TI Allowance**: $${outputs.totalTiAllowance.toLocaleString()}
- **TI Allowance per Sq Ft**: $${(outputs.totalTiAllowance / inputs.rentableSquareFootage).toFixed(2)}
- **Construction Cost**: $${outputs.totalConstructionCost.toLocaleString()}
- **Cost per Sq Ft**: $${outputs.costPerSqFt.toFixed(2)}

## Financial Analysis

### Cost Breakdown
- **Hard Costs**: $${outputs.hardCostsBreakdown.toLocaleString()}
- **Soft Costs**: $${outputs.softCostsBreakdown.toLocaleString()}
- **Total Project Cost**: $${outputs.totalProjectCost.toLocaleString()}
- **Allowance Utilization**: ${outputs.allowanceUtilizationRate.toFixed(1)}%

### Contribution Analysis
- **Landlord Contribution**: $${outputs.landlordContribution.toLocaleString()}
- **Tenant Contribution**: $${outputs.tenantContribution.toLocaleString()}
- **Cost Overrun**: $${outputs.costOverrun.toLocaleString()}
- **Cost Savings**: $${outputs.costSavings.toLocaleString()}

## Lease Impact

### Rent Analysis
- **Base Rent**: $${inputs.baseRent.toLocaleString()}/year
- **Effective Rent**: $${outputs.effectiveRent.toLocaleString()}/year
- **Effective Rent per Sq Ft**: $${outputs.effectiveRentPerSqFt.toFixed(2)}/sq ft/year
- **Rent Impact**: $${outputs.rentImpact.toLocaleString()}/year

### Lease Value
- **Total Lease Value**: $${outputs.totalLeaseValue.toLocaleString()}
- **Net Present Value**: $${outputs.netPresentValue.toLocaleString()}
- **Tenant ROI**: ${outputs.tenantROI.toFixed(1)}%
- **Landlord ROI**: ${outputs.landlordROI.toFixed(1)}%

## Timeline Analysis
- **Construction Duration**: ${outputs.constructionTimeline} weeks
- **Rent Abatement Period**: ${inputs.rentAbatementPeriod || 0} months
- **Rent Abatement Value**: $${outputs.rentAbatementValue.toLocaleString()}
- **Delay Penalties**: $${outputs.delayPenalties.toLocaleString()}

## Market Comparison
- **Market Position**: ${outputs.competitivePosition}
- **Market Comparison**: ${outputs.marketComparison}
- **TI Allowance vs Market**: ${outputs.marketTiAllowanceComparison > 0 ? '+' : ''}$${outputs.marketTiAllowanceComparison.toFixed(2)}/sq ft
- **Construction Cost vs Market**: ${outputs.constructionCostComparison > 0 ? '+' : ''}$${outputs.constructionCostComparison.toFixed(2)}/sq ft

## Risk Assessment

### Risk Scores
- **Overall Risk Score**: ${outputs.riskScore.toFixed(0)}/100
- **Construction Risk**: ${outputs.constructionRisk.toFixed(0)}/100
- **Financial Risk**: ${outputs.financialRisk.toFixed(0)}/100
- **Market Risk**: ${outputs.marketRisk.toFixed(0)}/100
- **Timeline Risk**: ${outputs.timelineRisk.toFixed(0)}/100

### Risk Level
${outputs.riskScore < 30 ? '🟢 Low Risk' : outputs.riskScore < 50 ? '🟡 Moderate Risk' : outputs.riskScore < 70 ? '🟠 High Risk' : '🔴 Very High Risk'}

## Detailed Cost Breakdown

### Construction Categories
- **Demolition**: $${outputs.categoryBreakdown.demolition.toLocaleString()}
- **Structural**: $${outputs.categoryBreakdown.structural.toLocaleString()}
- **Electrical**: $${outputs.categoryBreakdown.electrical.toLocaleString()}
- **Plumbing**: $${outputs.categoryBreakdown.plumbing.toLocaleString()}
- **HVAC**: $${outputs.categoryBreakdown.hvac.toLocaleString()}
- **Flooring**: $${outputs.categoryBreakdown.flooring.toLocaleString()}
- **Walls**: $${outputs.categoryBreakdown.walls.toLocaleString()}
- **Ceilings**: $${outputs.categoryBreakdown.ceilings.toLocaleString()}
- **Lighting**: $${outputs.categoryBreakdown.lighting.toLocaleString()}
- **Millwork**: $${outputs.categoryBreakdown.millwork.toLocaleString()}
- **Painting**: $${outputs.categoryBreakdown.painting.toLocaleString()}
- **Fixtures**: $${outputs.categoryBreakdown.fixtures.toLocaleString()}
- **Technology**: $${outputs.categoryBreakdown.technology.toLocaleString()}
- **Security**: $${outputs.categoryBreakdown.security.toLocaleString()}
- **Signage**: $${outputs.categoryBreakdown.signage.toLocaleString()}

## Recommendations

### Overall Recommendation
${outputs.recommendation}

### Negotiation Strategy
${outputs.negotiationStrategy}

### Cost Optimization Suggestions
${outputs.costOptimizationSuggestions.map(suggestion => `- ${suggestion}`).join('\n')}

### Risk Mitigation Strategies
${outputs.riskMitigationStrategies.map(strategy => `- ${strategy}`).join('\n')}

### Alternative Approaches
${outputs.alternativeApproaches.map(approach => `- ${approach}`).join('\n')}

## Property and Tenant Details
- **Property Type**: ${inputs.propertyType}
- **Property Class**: ${inputs.propertyClass}
- **Property Age**: ${inputs.propertyAge} years
- **Tenant Type**: ${inputs.tenantType}
- **Tenant Credit Rating**: ${inputs.tenantCreditRating}
- **Lease Type**: ${inputs.leaseType}
- **Buildout Specifications**: ${inputs.buildoutSpecifications}
- **Sustainability Requirements**: ${inputs.sustainabilityRequirements}
- **Energy Efficiency Standards**: ${inputs.energyEfficiencyStandards}

## Investment Metrics
- **Payback Period**: ${outputs.paybackPeriod.toFixed(1)} years
- **Internal Rate of Return**: ${outputs.internalRateOfReturn.toFixed(1)}%
- **Total Project Cost**: $${outputs.totalProjectCost.toLocaleString()}
- **Cost per Square Foot**: $${outputs.costPerSqFt.toFixed(2)}

## Conclusion
This TI allowance analysis shows ${outputs.competitivePosition} positioning with a ${outputs.riskScore < 50 ? 'manageable' : 'elevated'} risk profile. The ${outputs.allowanceUtilizationRate.toFixed(1)}% utilization rate indicates ${outputs.allowanceUtilizationRate > 100 ? 'cost overruns requiring tenant contribution' : 'efficient use of the TI allowance'}.

${outputs.recommendation}

---
*Analysis generated on ${new Date().toLocaleDateString()}*
*Lease Term: ${inputs.leaseTerm} years*
*Construction Duration: ${inputs.constructionDuration} weeks*`;
}