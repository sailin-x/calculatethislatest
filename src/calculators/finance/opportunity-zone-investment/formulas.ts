import { OpportunityZoneInvestmentInputs, OpportunityZoneInvestmentMetrics } from './types';

export function calculateOpportunityZoneInvestment(inputs: OpportunityZoneInvestmentInputs): OpportunityZoneInvestmentMetrics {
  // Calculate tax benefits
  const taxDeferralBenefit = calculateTaxDeferralBenefit(inputs);
  const taxExclusionBenefit = calculateTaxExclusionBenefit(inputs);
  const basisStepUpBenefit = calculateBasisStepUpBenefit(inputs);
  const totalTaxBenefit = taxDeferralBenefit + taxExclusionBenefit + basisStepUpBenefit;

  // Calculate investment returns
  const totalReturn = calculateTotalReturn(inputs);
  const annualizedReturn = calculateAnnualizedReturn(inputs, totalReturn);
  const internalRateOfReturn = calculateIRR(inputs);
  const netPresentValue = calculateNPV(inputs);
  const paybackPeriod = calculatePaybackPeriod(inputs);

  // Calculate cash flow metrics
  const annualCashFlow = calculateAnnualCashFlow(inputs);
  const totalCashFlow = calculateTotalCashFlow(inputs, annualCashFlow);
  const cashOnCashReturn = calculateCashOnCashReturn(inputs, annualCashFlow);
  const equityMultiple = calculateEquityMultiple(inputs, totalReturn);

  // Calculate tax analysis
  const taxSavings = calculateTaxSavings(inputs, totalTaxBenefit);
  const afterTaxReturn = calculateAfterTaxReturn(inputs, totalReturn, taxSavings);
  const taxEfficiency = calculateTaxEfficiency(inputs, taxSavings);
  const taxAdvantage = calculateTaxAdvantage(inputs, afterTaxReturn);
  const effectiveTaxRate = calculateEffectiveTaxRate(inputs, taxSavings);

  // Calculate risk analysis
  const riskScore = calculateRiskScore(inputs);
  const probabilityOfSuccess = calculateProbabilityOfSuccess(inputs, riskScore);
  const worstCaseScenario = calculateWorstCaseScenario(inputs);
  const bestCaseScenario = calculateBestCaseScenario(inputs);

  // Generate analysis components
  const comparisonAnalysis = generateComparisonAnalysis(inputs, afterTaxReturn);
  const sensitivityMatrix = generateSensitivityMatrix(inputs);
  const scenarios = generateScenarios(inputs);
  const timelineAnalysis = generateTimelineAnalysis(inputs);
  const marketAnalysis = generateMarketAnalysis(inputs);
  const performanceBenchmarks = generatePerformanceBenchmarks(inputs);

  return {
    // Tax Benefit Analysis
    taxDeferralBenefit,
    taxExclusionBenefit,
    basisStepUpBenefit,
    totalTaxBenefit,
    effectiveTaxRate,
    
    // Investment Returns
    totalReturn,
    annualizedReturn,
    internalRateOfReturn,
    netPresentValue,
    paybackPeriod,
    
    // Cash Flow Analysis
    annualCashFlow,
    totalCashFlow,
    cashOnCashReturn,
    equityMultiple,
    
    // Tax Analysis
    taxSavings,
    afterTaxReturn,
    taxEfficiency,
    taxAdvantage,
    
    // Risk Analysis
    riskScore,
    probabilityOfSuccess,
    worstCaseScenario,
    bestCaseScenario,
    
    // Analysis Components
    comparisonAnalysis,
    sensitivityMatrix,
    scenarios,
    timelineAnalysis,
    marketAnalysis,
    performanceBenchmarks
  };
}

function calculateTaxDeferralBenefit(inputs: OpportunityZoneInvestmentInputs): number {
  const originalGain = inputs.originalGainAmount;
  const taxRate = inputs.investorTaxRate + inputs.stateTaxRate + inputs.localTaxRate;
  const deferralPeriod = inputs.deferralPeriod;
  const discountRate = inputs.discountRate;
  
  // Tax deferral benefit is the present value of deferred taxes
  const deferredTax = originalGain * taxRate;
  const presentValueDeferredTax = deferredTax / Math.pow(1 + discountRate, deferralPeriod);
  
  return deferredTax - presentValueDeferredTax;
}

function calculateTaxExclusionBenefit(inputs: OpportunityZoneInvestmentInputs): number {
  const investmentAmount = inputs.investmentAmount;
  const expectedAppreciation = inputs.expectedAppreciation;
  const exclusionPeriod = inputs.exclusionPeriod;
  const taxRate = inputs.investorTaxRate + inputs.stateTaxRate + inputs.localTaxRate;
  
  // Tax exclusion benefit is the tax savings on appreciation after 10 years
  const appreciation = investmentAmount * Math.pow(1 + expectedAppreciation, exclusionPeriod) - investmentAmount;
  const exclusionBenefit = appreciation * taxRate;
  
  return exclusionBenefit;
}

function calculateBasisStepUpBenefit(inputs: OpportunityZoneInvestmentInputs): number {
  const originalGain = inputs.originalGainAmount;
  const basisStepUpPercentage = inputs.basisStepUpPercentage;
  const taxRate = inputs.investorTaxRate + inputs.stateTaxRate + inputs.localTaxRate;
  
  // Basis step-up benefit is the tax savings from the 10% basis increase
  const basisStepUp = originalGain * basisStepUpPercentage;
  const basisStepUpBenefit = basisStepUp * taxRate;
  
  return basisStepUpBenefit;
}

function calculateTotalReturn(inputs: OpportunityZoneInvestmentInputs): number {
  const investmentAmount = inputs.investmentAmount;
  const expectedExitValue = inputs.expectedExitValue;
  const totalCashFlow = calculateTotalCashFlow(inputs, calculateAnnualCashFlow(inputs));
  
  return (expectedExitValue + totalCashFlow - investmentAmount) / investmentAmount;
}

function calculateAnnualizedReturn(inputs: OpportunityZoneInvestmentInputs, totalReturn: number): number {
  const investmentPeriod = inputs.investmentPeriod;
  
  return Math.pow(1 + totalReturn, 1 / investmentPeriod) - 1;
}

function calculateIRR(inputs: OpportunityZoneInvestmentInputs): number {
  const investmentAmount = inputs.investmentAmount;
  const annualCashFlow = calculateAnnualCashFlow(inputs);
  const expectedExitValue = inputs.expectedExitValue;
  const investmentPeriod = inputs.investmentPeriod;
  
  // Simple IRR calculation using Newton-Raphson method
  let irr = 0.1; // Initial guess
  const tolerance = 0.0001;
  const maxIterations = 100;
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = -investmentAmount;
    let npvDerivative = 0;
    
    for (let year = 1; year <= investmentPeriod; year++) {
      const cashFlow = year === investmentPeriod ? annualCashFlow + expectedExitValue : annualCashFlow;
      npv += cashFlow / Math.pow(1 + irr, year);
      npvDerivative -= year * cashFlow / Math.pow(1 + irr, year + 1);
    }
    
    if (Math.abs(npv) < tolerance) break;
    
    irr = irr - npv / npvDerivative;
  }
  
  return Math.max(0, irr);
}

function calculateNPV(inputs: OpportunityZoneInvestmentInputs): number {
  const investmentAmount = inputs.investmentAmount;
  const annualCashFlow = calculateAnnualCashFlow(inputs);
  const expectedExitValue = inputs.expectedExitValue;
  const investmentPeriod = inputs.investmentPeriod;
  const discountRate = inputs.discountRate;
  
  let npv = -investmentAmount;
  
  for (let year = 1; year <= investmentPeriod; year++) {
    const cashFlow = year === investmentPeriod ? annualCashFlow + expectedExitValue : annualCashFlow;
    npv += cashFlow / Math.pow(1 + discountRate, year);
  }
  
  return npv;
}

function calculatePaybackPeriod(inputs: OpportunityZoneInvestmentInputs): number {
  const investmentAmount = inputs.investmentAmount;
  const annualCashFlow = calculateAnnualCashFlow(inputs);
  
  if (annualCashFlow <= 0) return Infinity;
  
  return investmentAmount / annualCashFlow;
}

function calculateAnnualCashFlow(inputs: OpportunityZoneInvestmentInputs): number {
  // Calculate annual cash flow from revenue projections
  const totalRevenue = inputs.revenueProjections.reduce((sum, projection) => sum + projection.revenue, 0);
  const totalExpenses = inputs.revenueProjections.reduce((sum, projection) => sum + projection.expenses, 0);
  const averageAnnualRevenue = totalRevenue / inputs.revenueProjections.length;
  const averageAnnualExpenses = totalExpenses / inputs.revenueProjections.length;
  
  return averageAnnualRevenue - averageAnnualExpenses;
}

function calculateTotalCashFlow(inputs: OpportunityZoneInvestmentInputs, annualCashFlow: number): number {
  return annualCashFlow * inputs.investmentPeriod;
}

function calculateCashOnCashReturn(inputs: OpportunityZoneInvestmentInputs, annualCashFlow: number): number {
  return annualCashFlow / inputs.investmentAmount;
}

function calculateEquityMultiple(inputs: OpportunityZoneInvestmentInputs, totalReturn: number): number {
  return 1 + totalReturn;
}

function calculateTaxSavings(inputs: OpportunityZoneInvestmentInputs, totalTaxBenefit: number): number {
  return totalTaxBenefit;
}

function calculateAfterTaxReturn(inputs: OpportunityZoneInvestmentInputs, totalReturn: number, taxSavings: number): number {
  const investmentAmount = inputs.investmentAmount;
  const afterTaxReturn = (totalReturn * investmentAmount + taxSavings) / investmentAmount;
  
  return afterTaxReturn;
}

function calculateTaxEfficiency(inputs: OpportunityZoneInvestmentInputs, taxSavings: number): number {
  const investmentAmount = inputs.investmentAmount;
  const totalReturn = calculateTotalReturn(inputs);
  const grossReturn = totalReturn * investmentAmount;
  
  return taxSavings / grossReturn;
}

function calculateTaxAdvantage(inputs: OpportunityZoneInvestmentInputs, afterTaxReturn: number): number {
  // Compare to traditional investment without Opportunity Zone benefits
  const traditionalAfterTaxReturn = calculateTraditionalAfterTaxReturn(inputs);
  
  return afterTaxReturn - traditionalAfterTaxReturn;
}

function calculateTraditionalAfterTaxReturn(inputs: OpportunityZoneInvestmentInputs): number {
  const totalReturn = calculateTotalReturn(inputs);
  const taxRate = inputs.investorTaxRate + inputs.stateTaxRate + inputs.localTaxRate;
  
  return totalReturn * (1 - taxRate);
}

function calculateEffectiveTaxRate(inputs: OpportunityZoneInvestmentInputs, taxSavings: number): number {
  const totalReturn = calculateTotalReturn(inputs);
  const investmentAmount = inputs.investmentAmount;
  const grossReturn = totalReturn * investmentAmount;
  const taxRate = inputs.investorTaxRate + inputs.stateTaxRate + inputs.localTaxRate;
  
  return taxRate - (taxSavings / grossReturn);
}

function calculateRiskScore(inputs: OpportunityZoneInvestmentInputs): number {
  let riskScore = 0;
  
  // Market risk
  switch (inputs.marketRisk) {
    case 'low': riskScore += 0.1; break;
    case 'medium': riskScore += 0.3; break;
    case 'high': riskScore += 0.5; break;
  }
  
  // Regulatory risk
  switch (inputs.regulatoryRisk) {
    case 'low': riskScore += 0.1; break;
    case 'medium': riskScore += 0.3; break;
    case 'high': riskScore += 0.5; break;
  }
  
  // Liquidity risk
  switch (inputs.liquidityRisk) {
    case 'low': riskScore += 0.1; break;
    case 'medium': riskScore += 0.3; break;
    case 'high': riskScore += 0.5; break;
  }
  
  // Development risk
  switch (inputs.developmentRisk) {
    case 'low': riskScore += 0.1; break;
    case 'medium': riskScore += 0.3; break;
    case 'high': riskScore += 0.5; break;
  }
  
  // Market condition adjustment
  switch (inputs.marketCondition) {
    case 'declining': riskScore += 0.2; break;
    case 'stable': riskScore += 0.1; break;
    case 'growing': riskScore -= 0.1; break;
    case 'hot': riskScore -= 0.2; break;
  }
  
  return Math.max(0, Math.min(1, riskScore));
}

function calculateProbabilityOfSuccess(inputs: OpportunityZoneInvestmentInputs, riskScore: number): number {
  // Base probability adjusted by risk factors
  let probability = 0.8; // Base 80% success rate
  
  // Adjust based on risk score
  probability -= riskScore * 0.4;
  
  // Adjust based on market condition
  switch (inputs.marketCondition) {
    case 'declining': probability -= 0.2; break;
    case 'stable': probability -= 0.1; break;
    case 'growing': probability += 0.1; break;
    case 'hot': probability += 0.2; break;
  }
  
  // Adjust based on investment type
  switch (inputs.investmentType) {
    case 'development': probability -= 0.1; break;
    case 'infrastructure': probability -= 0.05; break;
    case 'real_estate': probability += 0.05; break;
    case 'business': probability += 0.1; break;
  }
  
  return Math.max(0.1, Math.min(0.95, probability));
}

function calculateWorstCaseScenario(inputs: OpportunityZoneInvestmentInputs): number {
  const baseReturn = calculateTotalReturn(inputs);
  const riskScore = calculateRiskScore(inputs);
  
  // Worst case is base return reduced by risk factors
  return baseReturn * (1 - riskScore * 0.5);
}

function calculateBestCaseScenario(inputs: OpportunityZoneInvestmentInputs): number {
  const baseReturn = calculateTotalReturn(inputs);
  const marketGrowthRate = inputs.marketGrowthRate;
  
  // Best case includes market upside
  return baseReturn * (1 + marketGrowthRate * 0.5);
}

function generateComparisonAnalysis(inputs: OpportunityZoneInvestmentInputs, afterTaxReturn: number): any[] {
  const traditionalAfterTaxReturn = calculateTraditionalAfterTaxReturn(inputs);
  
  return [
    {
      metric: 'ROI',
      opportunityZone: afterTaxReturn,
      traditional: traditionalAfterTaxReturn,
      difference: afterTaxReturn - traditionalAfterTaxReturn,
      advantage: afterTaxReturn > traditionalAfterTaxReturn ? 'Opportunity Zone' : 'Traditional'
    },
    {
      metric: 'After-Tax Return',
      opportunityZone: afterTaxReturn,
      traditional: traditionalAfterTaxReturn,
      difference: afterTaxReturn - traditionalAfterTaxReturn,
      advantage: afterTaxReturn > traditionalAfterTaxReturn ? 'Opportunity Zone' : 'Traditional'
    },
    {
      metric: 'Tax Efficiency',
      opportunityZone: calculateTaxEfficiency(inputs, calculateTaxSavings(inputs, calculateOpportunityZoneInvestment(inputs).totalTaxBenefit)),
      traditional: 0,
      difference: calculateTaxEfficiency(inputs, calculateTaxSavings(inputs, calculateOpportunityZoneInvestment(inputs).totalTaxBenefit)),
      advantage: 'Opportunity Zone'
    }
  ];
}

function generateSensitivityMatrix(inputs: OpportunityZoneInvestmentInputs): any[] {
  const baseReturn = calculateTotalReturn(inputs);
  const baseIRR = calculateIRR(inputs);
  
  return [
    {
      variable: 'Market Growth Rate',
      values: [inputs.marketGrowthRate * 0.5, inputs.marketGrowthRate, inputs.marketGrowthRate * 1.5],
      impacts: [
        baseReturn * 0.8,
        baseReturn,
        baseReturn * 1.2
      ]
    },
    {
      variable: 'Expected Appreciation',
      values: [inputs.expectedAppreciation * 0.5, inputs.expectedAppreciation, inputs.expectedAppreciation * 1.5],
      impacts: [
        baseIRR * 0.8,
        baseIRR,
        baseIRR * 1.2
      ]
    },
    {
      variable: 'Tax Rate',
      values: [inputs.investorTaxRate * 0.8, inputs.investorTaxRate, inputs.investorTaxRate * 1.2],
      impacts: [
        baseReturn * 1.1,
        baseReturn,
        baseReturn * 0.9
      ]
    }
  ];
}

function generateScenarios(inputs: OpportunityZoneInvestmentInputs): any[] {
  const baseReturn = calculateTotalReturn(inputs);
  const baseIRR = calculateIRR(inputs);
  const totalTaxBenefit = calculateOpportunityZoneInvestment(inputs).totalTaxBenefit;
  
  return [
    {
      scenario: 'Conservative',
      probability: 0.3,
      roi: baseReturn * 0.8,
      irr: baseIRR * 0.8,
      taxBenefit: totalTaxBenefit * 0.9
    },
    {
      scenario: 'Base Case',
      probability: 0.5,
      roi: baseReturn,
      irr: baseIRR,
      taxBenefit: totalTaxBenefit
    },
    {
      scenario: 'Optimistic',
      probability: 0.2,
      roi: baseReturn * 1.3,
      irr: baseIRR * 1.3,
      taxBenefit: totalTaxBenefit * 1.1
    }
  ];
}

function generateTimelineAnalysis(inputs: OpportunityZoneInvestmentInputs): any[] {
  const annualCashFlow = calculateAnnualCashFlow(inputs);
  const timeline: any[] = [];
  
  for (let year = 0; year <= inputs.investmentPeriod; year++) {
    let investment = 0;
    let cashFlow = 0;
    let taxBenefit = 0;
    let totalValue = 0;
    
    if (year === 0) {
      investment = inputs.investmentAmount;
      totalValue = -inputs.investmentAmount;
    } else {
      cashFlow = annualCashFlow;
      
      // Tax benefits by year
      if (year <= inputs.deferralPeriod) {
        taxBenefit = calculateTaxDeferralBenefit(inputs) / inputs.deferralPeriod;
      }
      if (year >= 5) {
        taxBenefit += calculateBasisStepUpBenefit(inputs) / (inputs.investmentPeriod - 5);
      }
      if (year >= 10) {
        taxBenefit += calculateTaxExclusionBenefit(inputs) / (inputs.investmentPeriod - 10);
      }
      
      totalValue = cashFlow + taxBenefit;
    }
    
    timeline.push({
      year,
      investment,
      cashFlow,
      taxBenefit,
      totalValue
    });
  }
  
  return timeline;
}

function generateMarketAnalysis(inputs: OpportunityZoneInvestmentInputs): any[] {
  return [
    {
      factor: 'Market Growth',
      impact: inputs.marketGrowthRate,
      risk: inputs.marketRisk,
      opportunity: inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot' ? 'High' : 'Moderate'
    },
    {
      factor: 'Regulatory Environment',
      impact: 0.1,
      risk: inputs.regulatoryRisk,
      opportunity: inputs.regulatoryRisk === 'low' ? 'High' : 'Moderate'
    },
    {
      factor: 'Liquidity',
      impact: -0.1,
      risk: inputs.liquidityRisk,
      opportunity: inputs.liquidityRisk === 'low' ? 'High' : 'Low'
    },
    {
      factor: 'Development Potential',
      impact: inputs.investmentType === 'development' ? 0.2 : 0.1,
      risk: inputs.developmentRisk,
      opportunity: inputs.developmentRisk === 'low' ? 'High' : 'Moderate'
    }
  ];
}

function generatePerformanceBenchmarks(inputs: OpportunityZoneInvestmentInputs): any[] {
  const metrics = calculateOpportunityZoneInvestment(inputs);
  
  return [
    {
      metric: 'IRR',
      target: 0.12,
      benchmark: metrics.internalRateOfReturn,
      industry: 'Real Estate'
    },
    {
      metric: 'Cash-on-Cash Return',
      target: 0.08,
      benchmark: metrics.cashOnCashReturn,
      industry: 'Real Estate'
    },
    {
      metric: 'Tax Efficiency',
      target: 0.8,
      benchmark: metrics.taxEfficiency,
      industry: 'Opportunity Zone'
    },
    {
      metric: 'Risk Score',
      target: 0.4,
      benchmark: metrics.riskScore,
      industry: 'Real Estate'
    }
  ];
}