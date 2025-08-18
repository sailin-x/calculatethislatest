import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Market condition factors
const MARKET_FACTORS = {
  'hot': { appreciation: 1.05, timeOnMarket: 0.7, risk: 0.8 },
  'stable': { appreciation: 1.02, timeOnMarket: 1.0, risk: 1.0 },
  'slow': { appreciation: 0.98, timeOnMarket: 1.5, risk: 1.3 },
  'declining': { appreciation: 0.95, timeOnMarket: 2.0, risk: 1.6 }
};

// Property condition factors
const CONDITION_FACTORS = {
  'excellent': { renovationMultiplier: 0.8, risk: 0.7 },
  'good': { renovationMultiplier: 1.0, risk: 0.9 },
  'fair': { renovationMultiplier: 1.2, risk: 1.1 },
  'poor': { renovationMultiplier: 1.5, risk: 1.4 },
  'needs-major-repairs': { renovationMultiplier: 2.0, risk: 1.8 }
};

// Property type factors
const PROPERTY_TYPE_FACTORS = {
  'single-family': { marketability: 1.0, risk: 1.0 },
  'duplex': { marketability: 0.9, risk: 1.1 },
  'townhouse': { marketability: 0.95, risk: 1.05 },
  'condo': { marketability: 0.85, risk: 1.2 },
  'multi-family': { marketability: 0.8, risk: 1.3 },
  'commercial': { marketability: 0.7, risk: 1.5 }
};

// Risk tolerance factors
const RISK_TOLERANCE_FACTORS = {
  'conservative': { maxLeverage: 0.6, minROI: 0.15 },
  'moderate': { maxLeverage: 0.75, minROI: 0.12 },
  'aggressive': { maxLeverage: 0.9, minROI: 0.08 }
};

// Experience level factors
const EXPERIENCE_FACTORS = {
  'beginner': { efficiency: 0.8, risk: 1.3 },
  'intermediate': { efficiency: 1.0, risk: 1.0 },
  'expert': { efficiency: 1.2, risk: 0.8 }
};

function calculateMonthlyPayment(loanAmount: number, annualRate: number, months: number): number {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return loanAmount / months;
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

function calculateTotalInterest(loanAmount: number, monthlyPayment: number, months: number): number {
  return (monthlyPayment * months) - loanAmount;
}

function calculateIRR(cashFlows: number[], periods: number): number {
  // Simplified IRR calculation using Newton-Raphson method
  let guess = 0.1;
  const tolerance = 0.0001;
  const maxIterations = 100;
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let derivative = 0;
    
    for (let j = 0; j < cashFlows.length; j++) {
      const factor = Math.pow(1 + guess, j);
      npv += cashFlows[j] / factor;
      derivative -= j * cashFlows[j] / (factor * (1 + guess));
    }
    
    const newGuess = guess - npv / derivative;
    if (Math.abs(newGuess - guess) < tolerance) {
      return newGuess * 100; // Convert to percentage
    }
    guess = newGuess;
  }
  
  return guess * 100;
}

function calculateNPV(cashFlows: number[], rate: number): number {
  let npv = 0;
  for (let i = 0; i < cashFlows.length; i++) {
    npv += cashFlows[i] / Math.pow(1 + rate / 100, i);
  }
  return npv;
}

function calculateRiskScore(inputs: CalculatorInputs): number {
  let riskScore = 50; // Base risk score
  
  // Market risk
  const marketFactor = MARKET_FACTORS[inputs.marketType as keyof typeof MARKET_FACTORS];
  riskScore += (marketFactor.risk - 1) * 20;
  
  // Property condition risk
  const conditionFactor = CONDITION_FACTORS[inputs.propertyCondition as keyof typeof CONDITION_FACTORS];
  riskScore += (conditionFactor.risk - 1) * 15;
  
  // Property type risk
  const typeFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS];
  riskScore += (typeFactor.risk - 1) * 10;
  
  // Financial risk
  const downPaymentPercentage = Number(inputs.downPayment) / Number(inputs.purchasePrice);
  if (downPaymentPercentage < 0.2) riskScore += 15;
  else if (downPaymentPercentage < 0.3) riskScore += 10;
  else if (downPaymentPercentage > 0.5) riskScore -= 10;
  
  // Timeline risk
  const renovationTime = Number(inputs.renovationTime);
  if (renovationTime > 6) riskScore += 15;
  else if (renovationTime > 3) riskScore += 8;
  
  // Experience risk
  if (inputs.experienceLevel) {
    const experienceFactor = EXPERIENCE_FACTORS[inputs.experienceLevel as keyof typeof EXPERIENCE_FACTORS];
    riskScore += (experienceFactor.risk - 1) * 10;
  }
  
  return Math.max(1, Math.min(100, riskScore));
}

function calculateFeasibilityScore(roi: number, riskScore: number, marketType: string): number {
  const marketFactor = MARKET_FACTORS[marketType as keyof typeof MARKET_FACTORS];
  const marketScore = (marketFactor.appreciation - 0.95) * 100;
  
  return (roi * 0.4) + ((100 - riskScore) * 0.3) + (marketScore * 0.3);
}

function generateSensitivityAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const baseROI = outputs.roi;
  const baseARV = Number(inputs.afterRepairValue);
  const baseRenovation = Number(inputs.renovationBudget);
  
  const scenarios = [
    { name: 'ARV -10%', arv: baseARV * 0.9, renovation: baseRenovation },
    { name: 'ARV -5%', arv: baseARV * 0.95, renovation: baseRenovation },
    { name: 'ARV +5%', arv: baseARV * 1.05, renovation: baseRenovation },
    { name: 'ARV +10%', arv: baseARV * 1.1, renovation: baseRenovation },
    { name: 'Renovation +20%', arv: baseARV, renovation: baseRenovation * 1.2 },
    { name: 'Renovation +50%', arv: baseARV, renovation: baseRenovation * 1.5 }
  ];
  
  let analysis = 'Sensitivity Analysis:\n';
  scenarios.forEach(scenario => {
    const newTotalCosts = Number(inputs.purchasePrice) + Number(inputs.purchaseClosingCosts || 0) + scenario.renovation + outputs.totalHoldingCosts + Number(inputs.sellingCosts);
    const newGrossProfit = scenario.arv - newTotalCosts;
    const newROI = (newGrossProfit / outputs.totalInvestment) * 100;
    
    analysis += `${scenario.name}: ROI ${newROI.toFixed(1)}% (${(newROI - baseROI).toFixed(1)}% change)\n`;
  });
  
  return analysis;
}

function generateMarketAnalysis(inputs: CalculatorInputs): string {
  const marketFactor = MARKET_FACTORS[inputs.marketType as keyof typeof MARKET_FACTORS];
  const conditionFactor = CONDITION_FACTORS[inputs.propertyCondition as keyof typeof CONDITION_FACTORS];
  const typeFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS];
  
  let analysis = 'Market Analysis:\n';
  analysis += `Market Type: ${inputs.marketType} (${marketFactor.appreciation > 1 ? 'Appreciating' : 'Depreciating'})\n`;
  analysis += `Property Condition: ${inputs.propertyCondition} (${conditionFactor.renovationMultiplier > 1 ? 'Needs Work' : 'Good Condition'})\n`;
  analysis += `Property Type: ${inputs.propertyType} (Marketability: ${(typeFactor.marketability * 100).toFixed(0)}%)\n`;
  analysis += `Location: ${inputs.location}\n`;
  
  if (marketFactor.appreciation < 1) {
    analysis += '⚠️ Market is declining - consider holding longer or adjusting ARV\n';
  }
  
  if (conditionFactor.renovationMultiplier > 1.5) {
    analysis += '⚠️ Property needs significant work - ensure renovation budget is adequate\n';
  }
  
  if (typeFactor.marketability < 0.9) {
    analysis += '⚠️ Property type may have limited buyer pool\n';
  }
  
  return analysis;
}

function generateRiskFactors(inputs: CalculatorInputs, riskScore: number): string {
  let factors = 'Key Risk Factors:\n';
  
  if (riskScore > 70) factors += '🔴 HIGH RISK PROJECT\n';
  else if (riskScore > 50) factors += '🟡 MODERATE RISK PROJECT\n';
  else factors += '🟢 LOW RISK PROJECT\n';
  
  const downPaymentPercentage = Number(inputs.downPayment) / Number(inputs.purchasePrice);
  if (downPaymentPercentage < 0.2) factors += '• Low down payment increases leverage risk\n';
  
  if (Number(inputs.renovationTime) > 6) factors += '• Extended renovation timeline increases holding costs\n';
  
  if (inputs.marketType === 'declining') factors += '• Declining market may reduce ARV\n';
  
  if (inputs.propertyCondition === 'needs-major-repairs') factors += '• Major repairs required - budget overruns likely\n';
  
  if (inputs.experienceLevel === 'beginner') factors += '• Beginner experience may lead to delays/cost overruns\n';
  
  return factors;
}

function generateOptimizationOpportunities(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  let opportunities = 'Optimization Opportunities:\n';
  
  const downPaymentPercentage = Number(inputs.downPayment) / Number(inputs.purchasePrice);
  if (downPaymentPercentage > 0.4) {
    opportunities += '• Consider increasing leverage to improve ROI\n';
  }
  
  if (outputs.roi < 15) {
    opportunities += '• ROI below target - consider negotiating purchase price\n';
    opportunities += '• Look for ways to reduce renovation costs\n';
  }
  
  if (Number(inputs.renovationTime) > 4) {
    opportunities += '• Extended timeline - consider faster renovation approach\n';
  }
  
  if (outputs.riskScore > 60) {
    opportunities += '• High risk - consider more conservative approach\n';
  }
  
  return opportunities;
}

function generateExitStrategyRecommendation(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  let recommendation = 'Exit Strategy Recommendation:\n';
  
  if (outputs.roi > 25) {
    recommendation += '• Strong ROI - proceed with sale strategy\n';
  } else if (outputs.roi > 15) {
    recommendation += '• Moderate ROI - consider rent-to-own or lease option\n';
  } else {
    recommendation += '• Low ROI - consider holding as rental property\n';
  }
  
  if (inputs.marketType === 'hot') {
    recommendation += '• Hot market - quick sale recommended\n';
  } else if (inputs.marketType === 'declining') {
    recommendation += '• Declining market - consider alternative exit strategies\n';
  }
  
  return recommendation;
}

function generateTimelineAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const renovationTime = Number(inputs.renovationTime);
  const timeOnMarket = Number(inputs.timeOnMarket || 30) / 30; // Convert days to months
  const totalTime = renovationTime + timeOnMarket;
  
  let analysis = 'Timeline Analysis:\n';
  analysis += `Renovation Period: ${renovationTime} months\n`;
  analysis += `Expected Time on Market: ${timeOnMarket.toFixed(1)} months\n`;
  analysis += `Total Project Duration: ${totalTime.toFixed(1)} months\n`;
  analysis += `Monthly Profit: $${outputs.monthlyProfit.toLocaleString()}\n`;
  analysis += `Payback Period: ${outputs.paybackPeriod.toFixed(1)} months\n`;
  
  if (totalTime > 12) {
    analysis += '⚠️ Extended timeline increases holding cost risk\n';
  }
  
  return analysis;
}

export function calculateFixAndFlip(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract and convert inputs
  const purchasePrice = Number(inputs.purchasePrice);
  const downPayment = Number(inputs.downPayment);
  const interestRate = Number(inputs.interestRate);
  const loanTerm = Number(inputs.loanTerm);
  const renovationBudget = Number(inputs.renovationBudget);
  const renovationTime = Number(inputs.renovationTime);
  const afterRepairValue = Number(inputs.afterRepairValue);
  const sellingCosts = Number(inputs.sellingCosts);
  const holdingCosts = Number(inputs.holdingCosts);
  
  // Optional inputs with defaults
  const purchaseClosingCosts = Number(inputs.purchaseClosingCosts || 0);
  const contingencyBudget = Number(inputs.contingencyBudget || 0);
  const timeOnMarket = Number(inputs.timeOnMarket || 30) / 30; // Convert days to months
  const marketAppreciation = Number(inputs.marketAppreciation || 0) / 100;
  const inflationRate = Number(inputs.inflationRate || 0) / 100;
  const opportunityCost = Number(inputs.opportunityCost || 0) / 100;
  
  // Calculate loan details
  const loanAmount = purchasePrice - downPayment;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  const totalInterest = calculateTotalInterest(loanAmount, monthlyPayment, loanTerm);
  
  // Calculate project duration
  const projectDuration = renovationTime + timeOnMarket;
  
  // Calculate holding costs
  const totalHoldingCosts = (holdingCosts + monthlyPayment) * projectDuration;
  
  // Calculate total investment and costs
  const totalInvestment = downPayment + purchaseClosingCosts + renovationBudget + contingencyBudget;
  const totalCosts = purchasePrice + purchaseClosingCosts + renovationBudget + totalHoldingCosts + sellingCosts;
  
  // Apply market appreciation to ARV
  const adjustedARV = afterRepairValue * (1 + marketAppreciation);
  
  // Calculate profits
  const grossProfit = adjustedARV - totalCosts;
  const netProfit = grossProfit * 0.85; // Assume 15% for taxes and other fees
  
  // Calculate returns
  const roi = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0;
  const cashOnCashReturn = roi;
  const profitMargin = adjustedARV > 0 ? (netProfit / adjustedARV) * 100 : 0;
  
  // Calculate additional metrics
  const breakEvenPrice = totalCosts;
  const monthlyProfit = projectDuration > 0 ? netProfit / projectDuration : 0;
  const debtToEquityRatio = totalInvestment > 0 ? loanAmount / totalInvestment : 0;
  const paybackPeriod = monthlyProfit > 0 ? totalInvestment / monthlyProfit : 0;
  
  // Calculate risk and feasibility scores
  const riskScore = calculateRiskScore(inputs);
  const feasibilityScore = calculateFeasibilityScore(roi, riskScore, inputs.marketType);
  
  // Calculate maximum purchase price using 70% rule
  const maxPurchasePrice = (adjustedARV * 0.7) - renovationBudget;
  const minARV = totalCosts / 0.7;
  const maxRenovationBudget = (adjustedARV * 0.7) - purchasePrice;
  
  // Calculate IRR and NPV
  const cashFlows = [-totalInvestment, netProfit];
  const irr = calculateIRR(cashFlows, projectDuration);
  const npv = calculateNPV(cashFlows, opportunityCost);
  const profitabilityIndex = totalInvestment > 0 ? npv / totalInvestment : 0;
  
  // Generate analysis reports
  const sensitivityAnalysis = generateSensitivityAnalysis(inputs, { roi, totalInvestment } as CalculatorOutputs);
  const marketAnalysis = generateMarketAnalysis(inputs);
  const riskFactors = generateRiskFactors(inputs, riskScore);
  const optimizationOpportunities = generateOptimizationOpportunities(inputs, { roi, riskScore } as CalculatorOutputs);
  const exitStrategyRecommendation = generateExitStrategyRecommendation(inputs, { roi } as CalculatorOutputs);
  const timelineAnalysis = generateTimelineAnalysis(inputs, { monthlyProfit, paybackPeriod } as CalculatorOutputs);
  
  return {
    totalInvestment: Math.round(totalInvestment),
    totalCosts: Math.round(totalCosts),
    grossProfit: Math.round(grossProfit),
    netProfit: Math.round(netProfit),
    roi: Math.round(roi * 100) / 100,
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment),
    totalHoldingCosts: Math.round(totalHoldingCosts),
    breakEvenPrice: Math.round(breakEvenPrice),
    profitMargin: Math.round(profitMargin * 100) / 100,
    projectDuration: Math.round(projectDuration * 100) / 100,
    monthlyProfit: Math.round(monthlyProfit),
    riskScore: Math.round(riskScore),
    feasibilityScore: Math.round(feasibilityScore),
    maxPurchasePrice: Math.round(maxPurchasePrice),
    minARV: Math.round(minARV),
    maxRenovationBudget: Math.round(maxRenovationBudget),
    loanAmount: Math.round(loanAmount),
    totalInterest: Math.round(totalInterest),
    debtService: Math.round(monthlyPayment * loanTerm),
    equityRequired: Math.round(totalInvestment),
    liquidityRatio: Math.round((totalInvestment / totalCosts) * 100),
    debtToEquityRatio: Math.round(debtToEquityRatio * 100) / 100,
    cashFlow: Math.round(-monthlyPayment - holdingCosts),
    paybackPeriod: Math.round(paybackPeriod * 100) / 100,
    irr: Math.round(irr * 100) / 100,
    npv: Math.round(npv),
    profitabilityIndex: Math.round(profitabilityIndex * 100) / 100,
    sensitivityAnalysis,
    marketAnalysis,
    riskFactors,
    optimizationOpportunities,
    exitStrategyRecommendation,
    timelineAnalysis,
    fixAndFlipAnalysis: 'Comprehensive fix and flip analysis completed'
  };
}

export function generateFixAndFlipAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  let analysis = `# Fix and Flip Investment Analysis\n\n`;
  
  analysis += `## Project Summary\n`;
  analysis += `**Property:** ${inputs.propertyType} in ${inputs.location}\n`;
  analysis += `**Purchase Price:** $${Number(inputs.purchasePrice).toLocaleString()}\n`;
  analysis += `**After Repair Value:** $${Number(inputs.afterRepairValue).toLocaleString()}\n`;
  analysis += `**Renovation Budget:** $${Number(inputs.renovationBudget).toLocaleString()}\n`;
  analysis += `**Project Duration:** ${outputs.projectDuration} months\n\n`;
  
  analysis += `## Financial Performance\n`;
  analysis += `**Total Investment:** $${outputs.totalInvestment.toLocaleString()}\n`;
  analysis += `**Total Costs:** $${outputs.totalCosts.toLocaleString()}\n`;
  analysis += `**Net Profit:** $${outputs.netProfit.toLocaleString()}\n`;
  analysis += `**ROI:** ${outputs.roi}%\n`;
  analysis += `**Cash on Cash Return:** ${outputs.cashOnCashReturn}%\n`;
  analysis += `**Profit Margin:** ${outputs.profitMargin}%\n`;
  analysis += `**Monthly Profit:** $${outputs.monthlyProfit.toLocaleString()}\n\n`;
  
  analysis += `## Risk Assessment\n`;
  analysis += `**Risk Score:** ${outputs.riskScore}/100\n`;
  analysis += `**Feasibility Score:** ${outputs.feasibilityScore}/100\n`;
  analysis += `**Debt to Equity Ratio:** ${outputs.debtToEquityRatio}\n`;
  analysis += `**Payback Period:** ${outputs.paybackPeriod} months\n\n`;
  
  analysis += `## Key Metrics\n`;
  analysis += `**Break Even Price:** $${outputs.breakEvenPrice.toLocaleString()}\n`;
  analysis += `**Maximum Purchase Price:** $${outputs.maxPurchasePrice.toLocaleString()}\n`;
  analysis += `**Minimum ARV:** $${outputs.minARV.toLocaleString()}\n`;
  analysis += `**IRR:** ${outputs.irr}%\n`;
  analysis += `**NPV:** $${outputs.npv.toLocaleString()}\n\n`;
  
  analysis += `## Analysis Reports\n\n`;
  analysis += `### ${outputs.marketAnalysis}\n`;
  analysis += `### ${outputs.riskFactors}\n`;
  analysis += `### ${outputs.optimizationOpportunities}\n`;
  analysis += `### ${outputs.exitStrategyRecommendation}\n`;
  analysis += `### ${outputs.timelineAnalysis}\n`;
  analysis += `### ${outputs.sensitivityAnalysis}\n`;
  
  return analysis;
}
