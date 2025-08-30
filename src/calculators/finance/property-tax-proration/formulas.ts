import { PropertyTaxProrationInputs, PropertyTaxProrationOutputs, PropertyTaxProrationAnalysis, PropertyTaxProrationMetrics } from './types';

export function calculatePropertyTaxProration(inputs: PropertyTaxProrationInputs): PropertyTaxProrationOutputs {
  // Calculate basic metrics
  const metrics = calculatePropertyTaxProrationMetrics(inputs);
  
  // Calculate timeline analysis
  const timelineAnalysis = calculateTimelineAnalysis(inputs);
  
  // Calculate payment schedule
  const paymentSchedule = calculatePaymentSchedule(inputs);
  
  // Calculate analysis
  const analysis = calculatePropertyTaxProrationAnalysis(inputs, metrics);
  
  // Calculate settlement summary
  const settlementSummary = calculateSettlementSummary(metrics, inputs);
  
  // Calculate proration details
  const prorationDetails = calculateProrationDetails(inputs, metrics);
  
  return {
    // Basic Information
    propertyValue: inputs.propertyValue,
    assessedValue: inputs.assessedValue,
    taxableValue: Math.max(0, inputs.assessedValue - metrics.totalExemptions),
    closingDate: inputs.closingDate,
    taxYear: inputs.taxYear,
    
    // Proration Calculations
    totalDaysInYear: metrics.totalDaysInYear,
    sellerDays: metrics.sellerDays,
    buyerDays: metrics.buyerDays,
    sellerPercentage: metrics.sellerPercentage,
    buyerPercentage: metrics.buyerPercentage,
    
    // Tax Responsibilities
    totalAnnualTax: metrics.totalAnnualTax,
    sellerTaxResponsibility: metrics.sellerTaxResponsibility,
    buyerTaxResponsibility: metrics.buyerTaxResponsibility,
    sellerTaxCredit: metrics.sellerTaxCredit,
    buyerTaxDebit: metrics.buyerTaxDebit,
    
    // Tax Breakdown
    countyTax: metrics.countyTax,
    cityTax: metrics.cityTax,
    schoolTax: metrics.schoolTax,
    specialDistrictTax: metrics.specialDistrictTax,
    specialAssessmentsTotal: metrics.specialAssessmentsTotal,
    improvementAssessmentsTotal: metrics.improvementAssessmentsTotal,
    bondAssessmentsTotal: metrics.bondAssessmentsTotal,
    
    // Exemptions
    totalExemptions: metrics.totalExemptions,
    exemptionSavings: metrics.exemptionSavings,
    exemptionPercentage: metrics.exemptionPercentage,
    
    // Payment Analysis
    lastPaymentDate: metrics.lastPaymentDate,
    nextPaymentDate: metrics.nextPaymentDate,
    daysSinceLastPayment: metrics.daysSinceLastPayment,
    daysUntilNextPayment: metrics.daysUntilNextPayment,
    sellerPaymentCredit: metrics.sellerPaymentCredit,
    buyerPaymentDebit: metrics.buyerPaymentDebit,
    
    // Escrow Analysis
    escrowProrationAmount: metrics.escrowProrationAmount,
    sellerEscrowCredit: metrics.sellerEscrowCredit,
    buyerEscrowDebit: metrics.buyerEscrowDebit,
    escrowDeficit: metrics.escrowDeficit,
    escrowSurplus: metrics.escrowSurplus,
    
    // Proration Summary
    netSellerCredit: metrics.netSellerCredit,
    netBuyerDebit: metrics.netBuyerDebit,
    prorationBalance: metrics.prorationBalance,
    prorationAccuracy: metrics.prorationAccuracy,
    
    // Analysis Arrays
    prorationTimeline: timelineAnalysis,
    paymentSchedule: paymentSchedule,
    
    // Analysis Object
    analysis: analysis,
    
    // Additional Metrics
    prorationEfficiency: metrics.prorationEfficiency,
    prorationComplexity: metrics.prorationComplexity,
    prorationRisk: metrics.prorationRisk,
    
    // Proration Details
    prorationMethod: prorationDetails.method,
    prorationFormula: prorationDetails.formula,
    prorationNotes: prorationDetails.notes,
    
    // Settlement Summary
    settlementSummary: settlementSummary,
  };
}

function calculatePropertyTaxProrationMetrics(inputs: PropertyTaxProrationInputs): PropertyTaxProrationMetrics {
  // Calculate total exemptions
  let totalExemptions = 0;
  if (inputs.homesteadExemption) totalExemptions += inputs.homesteadExemptionAmount;
  if (inputs.seniorExemption) totalExemptions += inputs.seniorExemptionAmount;
  if (inputs.veteranExemption) totalExemptions += inputs.veteranExemptionAmount;
  if (inputs.disabilityExemption) totalExemptions += inputs.disabilityExemptionAmount;
  
  // Calculate taxable value
  const taxableValue = Math.max(0, inputs.assessedValue - totalExemptions);
  
  // Calculate total tax rate
  const totalTaxRate = inputs.countyTaxRate + inputs.cityTaxRate + inputs.schoolTaxRate + inputs.specialDistrictTaxRate;
  
  // Calculate total annual tax
  const totalAnnualTax = (taxableValue / 1000) * totalTaxRate;
  
  // Calculate tax breakdown
  const countyTax = (taxableValue / 1000) * inputs.countyTaxRate;
  const cityTax = (taxableValue / 1000) * inputs.cityTaxRate;
  const schoolTax = (taxableValue / 1000) * inputs.schoolTaxRate;
  const specialDistrictTax = (taxableValue / 1000) * inputs.specialDistrictTaxRate;
  
  // Calculate special assessments
  const specialAssessmentsTotal = inputs.specialAssessments.reduce((sum, assessment) => {
    if (assessment.prorationIncluded) {
      return sum + assessment.annualAmount;
    }
    return sum;
  }, 0);
  
  const improvementAssessmentsTotal = inputs.improvementAssessments.reduce((sum, assessment) => {
    if (assessment.prorationIncluded) {
      return sum + assessment.annualAmount;
    }
    return sum;
  }, 0);
  
  const bondAssessmentsTotal = inputs.bondAssessments.reduce((sum, assessment) => {
    if (assessment.prorationIncluded) {
      return sum + assessment.annualAmount;
    }
    return sum;
  }, 0);
  
  // Calculate days in year based on proration method
  let totalDaysInYear: number;
  switch (inputs.prorationMethod) {
    case '365_day':
      totalDaysInYear = 365;
      break;
    case '360_day':
      totalDaysInYear = 360;
      break;
    case 'actual_days':
      totalDaysInYear = isLeapYear(inputs.taxYear) ? 366 : 365;
      break;
    case 'banker_30_360':
      totalDaysInYear = 360;
      break;
    default:
      totalDaysInYear = 365;
  }
  
  // Calculate seller and buyer days
  const closingDate = new Date(inputs.closingDate);
  const sellerOccupiedUntil = new Date(inputs.sellerOccupiedUntil);
  const buyerOccupiedFrom = new Date(inputs.buyerOccupiedFrom);
  
  const sellerDays = calculateDaysBetween(new Date(inputs.taxYear, 0, 1), sellerOccupiedUntil, inputs.prorationMethod);
  const buyerDays = calculateDaysBetween(buyerOccupiedFrom, new Date(inputs.taxYear, 11, 31), inputs.prorationMethod);
  
  const sellerPercentage = (sellerDays / totalDaysInYear) * 100;
  const buyerPercentage = (buyerDays / totalDaysInYear) * 100;
  
  // Calculate tax responsibilities
  const sellerTaxResponsibility = (totalAnnualTax * sellerDays) / totalDaysInYear;
  const buyerTaxResponsibility = (totalAnnualTax * buyerDays) / totalDaysInYear;
  
  // Calculate payment analysis
  const lastPaymentDate = inputs.lastTaxPaymentDate;
  const nextPaymentDate = inputs.nextTaxPaymentDate;
  const daysSinceLastPayment = calculateDaysBetween(new Date(lastPaymentDate), closingDate, inputs.prorationMethod);
  const daysUntilNextPayment = calculateDaysBetween(closingDate, new Date(nextPaymentDate), inputs.prorationMethod);
  
  // Calculate seller payment credit and buyer payment debit
  const sellerPaymentCredit = (inputs.lastTaxPaymentAmount * sellerDays) / totalDaysInYear;
  const buyerPaymentDebit = (inputs.nextTaxPaymentAmount * buyerDays) / totalDaysInYear;
  
  // Calculate escrow analysis
  let escrowProrationAmount = 0;
  let sellerEscrowCredit = 0;
  let buyerEscrowDebit = 0;
  
  if (inputs.escrowAccount) {
    escrowProrationAmount = inputs.escrowBalance;
    
    switch (inputs.escrowProrationMethod) {
      case 'seller_pays_all':
        sellerEscrowCredit = escrowProrationAmount;
        buyerEscrowDebit = 0;
        break;
      case 'buyer_pays_all':
        sellerEscrowCredit = 0;
        buyerEscrowDebit = escrowProrationAmount;
        break;
      case 'split_50_50':
        sellerEscrowCredit = escrowProrationAmount * 0.5;
        buyerEscrowDebit = escrowProrationAmount * 0.5;
        break;
      case 'custom_split':
        sellerEscrowCredit = escrowProrationAmount * (inputs.customEscrowSplit / 100);
        buyerEscrowDebit = escrowProrationAmount * ((100 - inputs.customEscrowSplit) / 100);
        break;
    }
  }
  
  // Calculate net amounts
  const netSellerCredit = sellerTaxResponsibility + sellerPaymentCredit + sellerEscrowCredit;
  const netBuyerDebit = buyerTaxResponsibility + buyerPaymentDebit + buyerEscrowDebit;
  const prorationBalance = netBuyerDebit - netSellerCredit;
  
  // Calculate escrow deficit/surplus
  const escrowDeficit = Math.max(0, inputs.escrowMonthlyPayment * 12 - totalAnnualTax);
  const escrowSurplus = Math.max(0, totalAnnualTax - inputs.escrowMonthlyPayment * 12);
  
  // Calculate proration efficiency, complexity, and risk
  const prorationEfficiency = calculateProrationEfficiency(inputs, metrics);
  const prorationComplexity = calculateProrationComplexity(inputs);
  const prorationRisk = calculateProrationRisk(inputs, metrics);
  
  return {
    totalDaysInYear,
    sellerDays,
    buyerDays,
    sellerPercentage,
    buyerPercentage,
    totalAnnualTax,
    sellerTaxResponsibility,
    buyerTaxResponsibility,
    sellerTaxCredit: sellerTaxResponsibility,
    buyerTaxDebit: buyerTaxResponsibility,
    countyTax,
    cityTax,
    schoolTax,
    specialDistrictTax,
    specialAssessmentsTotal,
    improvementAssessmentsTotal,
    bondAssessmentsTotal,
    totalExemptions,
    exemptionSavings: totalExemptions * (totalTaxRate / 1000),
    exemptionPercentage: (totalExemptions / inputs.assessedValue) * 100,
    lastPaymentDate,
    nextPaymentDate,
    daysSinceLastPayment,
    daysUntilNextPayment,
    sellerPaymentCredit,
    buyerPaymentDebit,
    escrowProrationAmount,
    sellerEscrowCredit,
    buyerEscrowDebit,
    escrowDeficit,
    escrowSurplus,
    netSellerCredit,
    netBuyerDebit,
    prorationBalance,
    prorationAccuracy: inputs.prorationAccuracy,
    prorationEfficiency,
    prorationComplexity,
    prorationRisk,
  };
}

function calculateTimelineAnalysis(inputs: PropertyTaxProrationInputs) {
  const timeline = [];
  const closingDate = new Date(inputs.closingDate);
  
  // Add key dates to timeline
  timeline.push({
    date: inputs.lastTaxPaymentDate,
    event: 'Last Tax Payment',
    sellerAmount: inputs.lastTaxPaymentAmount,
    buyerAmount: 0,
    runningBalance: inputs.lastTaxPaymentAmount,
    description: 'Previous tax payment made by seller'
  });
  
  timeline.push({
    date: inputs.sellerOccupiedUntil,
    event: 'Seller Occupancy Ends',
    sellerAmount: 0,
    buyerAmount: 0,
    runningBalance: inputs.lastTaxPaymentAmount,
    description: 'Seller vacates property'
  });
  
  timeline.push({
    date: inputs.closingDate,
    event: 'Property Closing',
    sellerAmount: 0,
    buyerAmount: 0,
    runningBalance: inputs.lastTaxPaymentAmount,
    description: 'Property ownership transfers'
  });
  
  timeline.push({
    date: inputs.buyerOccupiedFrom,
    event: 'Buyer Occupancy Begins',
    sellerAmount: 0,
    buyerAmount: 0,
    runningBalance: inputs.lastTaxPaymentAmount,
    description: 'Buyer takes possession'
  });
  
  timeline.push({
    date: inputs.nextTaxPaymentDate,
    event: 'Next Tax Payment Due',
    sellerAmount: 0,
    buyerAmount: inputs.nextTaxPaymentAmount,
    runningBalance: inputs.lastTaxPaymentAmount - inputs.nextTaxPaymentAmount,
    description: 'Next tax payment due'
  });
  
  return timeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

function calculatePaymentSchedule(inputs: PropertyTaxProrationInputs) {
  const schedule = [];
  const taxYear = inputs.taxYear;
  
  // Add payment schedule based on payment frequency
  switch (inputs.taxPaymentSchedule) {
    case 'annual':
      schedule.push({
        date: `${taxYear}-01-01`,
        amount: inputs.nextTaxPaymentAmount,
        responsibleParty: 'buyer' as const,
        sellerShare: 0,
        buyerShare: inputs.nextTaxPaymentAmount,
        status: 'future' as const
      });
      break;
    case 'semi_annual':
      schedule.push({
        date: `${taxYear}-01-01`,
        amount: inputs.nextTaxPaymentAmount / 2,
        responsibleParty: 'buyer' as const,
        sellerShare: 0,
        buyerShare: inputs.nextTaxPaymentAmount / 2,
        status: 'future' as const
      });
      schedule.push({
        date: `${taxYear}-07-01`,
        amount: inputs.nextTaxPaymentAmount / 2,
        responsibleParty: 'buyer' as const,
        sellerShare: 0,
        buyerShare: inputs.nextTaxPaymentAmount / 2,
        status: 'future' as const
      });
      break;
    case 'quarterly':
      for (let i = 0; i < 4; i++) {
        schedule.push({
          date: `${taxYear}-${String((i * 3) + 1).padStart(2, '0')}-01`,
          amount: inputs.nextTaxPaymentAmount / 4,
          responsibleParty: 'buyer' as const,
          sellerShare: 0,
          buyerShare: inputs.nextTaxPaymentAmount / 4,
          status: 'future' as const
        });
      }
      break;
    case 'monthly':
      for (let i = 1; i <= 12; i++) {
        schedule.push({
          date: `${taxYear}-${String(i).padStart(2, '0')}-01`,
          amount: inputs.nextTaxPaymentAmount / 12,
          responsibleParty: 'buyer' as const,
          sellerShare: 0,
          buyerShare: inputs.nextTaxPaymentAmount / 12,
          status: 'future' as const
        });
      }
      break;
  }
  
  return schedule;
}

function calculatePropertyTaxProrationAnalysis(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): PropertyTaxProrationAnalysis {
  // Calculate proration rating
  const prorationRating = calculateProrationRating(inputs, metrics);
  
  // Calculate accuracy rating
  const accuracyRating = calculateAccuracyRating(inputs);
  
  // Calculate fairness rating
  const fairnessRating = calculateFairnessRating(inputs, metrics);
  
  // Generate recommendation
  const recommendation = generateRecommendation(inputs, metrics, prorationRating, accuracyRating, fairnessRating);
  
  // Generate key strengths and weaknesses
  const keyStrengths = generateKeyStrengths(inputs, metrics);
  const keyWeaknesses = generateKeyWeaknesses(inputs, metrics);
  
  // Generate optimization suggestions
  const optimizationSuggestions = generateOptimizationSuggestions(inputs, metrics);
  
  // Generate risk assessment
  const prorationRisks = generateProrationRisks(inputs, metrics);
  const mitigationStrategies = generateMitigationStrategies(inputs, metrics);
  const contingencyPlans = generateContingencyPlans(inputs, metrics);
  
  // Generate cost analysis
  const costFactors = generateCostFactors(inputs, metrics);
  const potentialSavings = calculatePotentialSavings(inputs, metrics);
  const optimizationOpportunities = generateOptimizationOpportunities(inputs, metrics);
  
  // Generate legal considerations
  const legalRequirements = generateLegalRequirements(inputs);
  const complianceIssues = generateComplianceIssues(inputs, metrics);
  const documentationNeeds = generateDocumentationNeeds(inputs);
  
  // Generate market analysis
  const marketFactors = generateMarketFactors(inputs);
  const economicImpact = generateEconomicImpact(inputs, metrics);
  const futureProjections = generateFutureProjections(inputs, metrics);
  
  // Generate action items
  const nextSteps = generateNextSteps(inputs, metrics);
  const timeline = generateTimeline(inputs);
  const priorityActions = generatePriorityActions(inputs, metrics);
  
  // Generate performance benchmarks
  const performanceBenchmarks = generatePerformanceBenchmarks(inputs, metrics);
  
  // Generate presentation data
  const presentationPoints = generatePresentationPoints(inputs, metrics);
  const decisionFactors = generateDecisionFactors(inputs, metrics);
  const summaryPoints = generateSummaryPoints(inputs, metrics);
  
  return {
    prorationRating,
    accuracyRating,
    fairnessRating,
    recommendation,
    keyStrengths,
    keyWeaknesses,
    optimizationSuggestions,
    prorationRisks,
    mitigationStrategies,
    contingencyPlans,
    costFactors,
    potentialSavings,
    optimizationOpportunities,
    legalRequirements,
    complianceIssues,
    documentationNeeds,
    marketFactors,
    economicImpact,
    futureProjections,
    nextSteps,
    timeline,
    priorityActions,
    performanceBenchmarks,
    presentationPoints,
    decisionFactors,
    summaryPoints,
  };
}

function calculateSettlementSummary(metrics: PropertyTaxProrationMetrics, inputs: PropertyTaxProrationInputs) {
  const totalCredits = metrics.netSellerCredit;
  const totalDebits = metrics.netBuyerDebit;
  const netAmount = totalDebits - totalCredits;
  
  let responsibleParty: string;
  if (netAmount > 0) {
    responsibleParty = 'Buyer';
  } else if (netAmount < 0) {
    responsibleParty = 'Seller';
  } else {
    responsibleParty = 'Balanced';
  }
  
  return {
    totalCredits,
    totalDebits,
    netAmount: Math.abs(netAmount),
    responsibleParty,
    dueDate: inputs.closingDate,
  };
}

function calculateProrationDetails(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics) {
  const method = inputs.prorationMethod;
  const formula = generateProrationFormula(inputs);
  const notes = generateProrationNotes(inputs, metrics);
  
  return {
    method,
    formula,
    notes,
  };
}

// Helper functions
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function calculateDaysBetween(startDate: Date, endDate: Date, method: string): number {
  const timeDiff = endDate.getTime() - startDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  switch (method) {
    case '365_day':
      return Math.max(0, daysDiff);
    case '360_day':
      return Math.max(0, Math.floor(daysDiff * 360 / 365));
    case 'actual_days':
      return Math.max(0, daysDiff);
    case 'banker_30_360':
      return Math.max(0, Math.floor(daysDiff * 360 / 365));
    default:
      return Math.max(0, daysDiff);
  }
}

function calculateProrationEfficiency(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): 'low' | 'medium' | 'high' {
  const complexity = calculateProrationComplexity(inputs);
  const accuracy = inputs.prorationAccuracy;
  
  if (complexity === 'simple' && accuracy === 'exact') return 'high';
  if (complexity === 'complex' && accuracy === 'approximate') return 'low';
  return 'medium';
}

function calculateProrationComplexity(inputs: PropertyTaxProrationInputs): 'simple' | 'moderate' | 'complex' {
  let complexity = 0;
  
  if (inputs.specialAssessments.length > 0) complexity += 2;
  if (inputs.improvementAssessments.length > 0) complexity += 2;
  if (inputs.bondAssessments.length > 0) complexity += 2;
  if (inputs.homesteadExemption || inputs.seniorExemption || inputs.veteranExemption || inputs.disabilityExemption) complexity += 1;
  if (inputs.escrowAccount) complexity += 1;
  if (inputs.prorationMethod !== '365_day') complexity += 1;
  
  if (complexity <= 1) return 'simple';
  if (complexity <= 3) return 'moderate';
  return 'complex';
}

function calculateProrationRisk(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): 'low' | 'medium' | 'high' {
  let risk = 0;
  
  if (inputs.prorationAccuracy === 'approximate') risk += 2;
  if (inputs.prorationMethod !== '365_day') risk += 1;
  if (inputs.specialAssessments.length > 0) risk += 1;
  if (Math.abs(metrics.prorationBalance) > metrics.totalAnnualTax * 0.1) risk += 1;
  
  if (risk <= 1) return 'low';
  if (risk <= 3) return 'medium';
  return 'high';
}

function calculateProrationRating(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): 'Excellent' | 'Good' | 'Fair' | 'Poor' {
  const efficiency = calculateProrationEfficiency(inputs, metrics);
  const complexity = calculateProrationComplexity(inputs);
  const risk = calculateProrationRisk(inputs, metrics);
  
  if (efficiency === 'high' && complexity === 'simple' && risk === 'low') return 'Excellent';
  if (efficiency === 'high' || (complexity === 'moderate' && risk === 'low')) return 'Good';
  if (efficiency === 'medium' || complexity === 'moderate') return 'Fair';
  return 'Poor';
}

function calculateAccuracyRating(inputs: PropertyTaxProrationInputs): 'High' | 'Medium' | 'Low' {
  switch (inputs.prorationAccuracy) {
    case 'exact': return 'High';
    case 'estimated': return 'Medium';
    case 'approximate': return 'Low';
    default: return 'Medium';
  }
}

function calculateFairnessRating(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): 'Very Fair' | 'Fair' | 'Unfair' | 'Very Unfair' {
  const balance = Math.abs(metrics.prorationBalance);
  const totalTax = metrics.totalAnnualTax;
  const fairnessRatio = balance / totalTax;
  
  if (fairnessRatio <= 0.05) return 'Very Fair';
  if (fairnessRatio <= 0.1) return 'Fair';
  if (fairnessRatio <= 0.2) return 'Unfair';
  return 'Very Unfair';
}

// Generate analysis content functions
function generateRecommendation(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics, prorationRating: string, accuracyRating: string, fairnessRating: string): string {
  if (prorationRating === 'Excellent') {
    return 'This proration is well-structured and fair. Proceed with confidence.';
  } else if (prorationRating === 'Good') {
    return 'This proration is generally good but consider minor adjustments for optimization.';
  } else if (prorationRating === 'Fair') {
    return 'This proration requires review and potential adjustments to improve fairness and accuracy.';
  } else {
    return 'This proration needs significant revision to ensure fairness and compliance.';
  }
}

function generateKeyStrengths(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const strengths: string[] = [];
  
  if (inputs.prorationAccuracy === 'exact') strengths.push('High accuracy calculation method');
  if (inputs.prorationMethod === '365_day') strengths.push('Standard 365-day proration method');
  if (metrics.totalExemptions > 0) strengths.push('Proper exemption calculations included');
  if (inputs.escrowAccount) strengths.push('Escrow account properly considered');
  
  return strengths;
}

function generateKeyWeaknesses(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const weaknesses: string[] = [];
  
  if (inputs.prorationAccuracy === 'approximate') weaknesses.push('Approximate calculation may reduce accuracy');
  if (inputs.specialAssessments.length > 0) weaknesses.push('Special assessments add complexity');
  if (Math.abs(metrics.prorationBalance) > metrics.totalAnnualTax * 0.1) weaknesses.push('Significant proration imbalance');
  
  return weaknesses;
}

function generateOptimizationSuggestions(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const suggestions: string[] = [];
  
  if (inputs.prorationAccuracy === 'approximate') suggestions.push('Consider using exact calculation method');
  if (Math.abs(metrics.prorationBalance) > metrics.totalAnnualTax * 0.1) suggestions.push('Review proration method for better balance');
  if (inputs.specialAssessments.length > 0) suggestions.push('Verify special assessment calculations');
  
  return suggestions;
}

function generateProrationRisks(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const risks: string[] = [];
  
  if (inputs.prorationAccuracy === 'approximate') risks.push('Calculation accuracy may be insufficient');
  if (inputs.specialAssessments.length > 0) risks.push('Special assessments may change');
  if (Math.abs(metrics.prorationBalance) > metrics.totalAnnualTax * 0.1) risks.push('Significant proration imbalance');
  
  return risks;
}

function generateMitigationStrategies(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const strategies: string[] = [];
  
  if (inputs.prorationAccuracy === 'approximate') strategies.push('Use exact calculation method');
  if (inputs.specialAssessments.length > 0) strategies.push('Verify special assessment amounts');
  if (Math.abs(metrics.prorationBalance) > metrics.totalAnnualTax * 0.1) strategies.push('Adjust proration method');
  
  return strategies;
}

function generateContingencyPlans(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const plans: string[] = [];
  
  plans.push('Hold additional funds in escrow for potential adjustments');
  plans.push('Document all assumptions and calculations');
  plans.push('Plan for post-closing adjustments if needed');
  
  return plans;
}

function generateCostFactors(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const factors: string[] = [];
  
  factors.push(`Total annual tax: ${metrics.totalAnnualTax.toFixed(2)}`);
  factors.push(`Exemptions: ${metrics.totalExemptions.toFixed(2)}`);
  factors.push(`Special assessments: ${metrics.specialAssessmentsTotal.toFixed(2)}`);
  
  return factors;
}

function calculatePotentialSavings(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): number {
  return metrics.exemptionSavings;
}

function generateOptimizationOpportunities(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const opportunities: string[] = [];
  
  if (metrics.totalExemptions < inputs.assessedValue * 0.1) opportunities.push('Consider additional exemptions');
  if (Math.abs(metrics.prorationBalance) > metrics.totalAnnualTax * 0.05) opportunities.push('Optimize proration method');
  
  return opportunities;
}

function generateLegalRequirements(inputs: PropertyTaxProrationInputs): string[] {
  const requirements: string[] = [];
  
  requirements.push('Comply with state proration laws');
  requirements.push('Follow local tax assessment rules');
  requirements.push('Document all calculations');
  
  return requirements;
}

function generateComplianceIssues(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const issues: string[] = [];
  
  if (inputs.prorationAccuracy === 'approximate') issues.push('May not meet legal accuracy requirements');
  
  return issues;
}

function generateDocumentationNeeds(inputs: PropertyTaxProrationInputs): string[] {
  const needs: string[] = [];
  
  needs.push('Proration calculation worksheet');
  needs.push('Tax assessment documentation');
  needs.push('Exemption verification');
  
  return needs;
}

function generateMarketFactors(inputs: PropertyTaxProrationInputs): string[] {
  const factors: string[] = [];
  
  factors.push(`Market appreciation rate: ${inputs.marketAppreciationRate}%`);
  factors.push(`Inflation rate: ${inputs.inflationRate}%`);
  factors.push(`Local economic growth: ${inputs.localEconomicGrowth}%`);
  
  return factors;
}

function generateEconomicImpact(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const impacts: string[] = [];
  
  impacts.push(`Total tax burden: ${metrics.totalAnnualTax.toFixed(2)}`);
  impacts.push(`Effective tax rate: ${((metrics.totalAnnualTax / inputs.propertyValue) * 100).toFixed(2)}%`);
  
  return impacts;
}

function generateFutureProjections(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const projections: string[] = [];
  
  const projectedTax = metrics.totalAnnualTax * (1 + inputs.inflationRate / 100);
  projections.push(`Projected tax next year: ${projectedTax.toFixed(2)}`);
  
  return projections;
}

function generateNextSteps(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const steps: string[] = [];
  
  steps.push('Review proration calculations');
  steps.push('Verify all inputs and assumptions');
  steps.push('Document final proration agreement');
  
  return steps;
}

function generateTimeline(inputs: PropertyTaxProrationInputs): string[] {
  const timeline: string[] = [];
  
  timeline.push(`Closing date: ${inputs.closingDate}`);
  timeline.push(`Tax year: ${inputs.taxYear}`);
  timeline.push(`Next payment due: ${inputs.nextTaxPaymentDate}`);
  
  return timeline;
}

function generatePriorityActions(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const actions: string[] = [];
  
  if (Math.abs(metrics.prorationBalance) > metrics.totalAnnualTax * 0.1) {
    actions.push('Address proration imbalance immediately');
  }
  
  actions.push('Finalize proration agreement');
  actions.push('Prepare settlement statement');
  
  return actions;
}

function generatePerformanceBenchmarks(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics) {
  return [
    {
      metric: 'Proration Balance',
      target: 0,
      benchmark: Math.abs(metrics.prorationBalance),
      industry: 'Real Estate',
      status: Math.abs(metrics.prorationBalance) < metrics.totalAnnualTax * 0.05 ? 'excellent' : 'good'
    }
  ];
}

function generatePresentationPoints(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const points: string[] = [];
  
  points.push(`Seller credit: ${metrics.sellerTaxCredit.toFixed(2)}`);
  points.push(`Buyer debit: ${metrics.buyerTaxDebit.toFixed(2)}`);
  points.push(`Net amount: ${metrics.prorationBalance.toFixed(2)}`);
  
  return points;
}

function generateDecisionFactors(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const factors: string[] = [];
  
  factors.push('Proration accuracy');
  factors.push('Fairness to both parties');
  factors.push('Legal compliance');
  factors.push('Market conditions');
  
  return factors;
}

function generateSummaryPoints(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const points: string[] = [];
  
  points.push(`Total annual tax: ${metrics.totalAnnualTax.toFixed(2)}`);
  points.push(`Seller days: ${metrics.sellerDays} (${metrics.sellerPercentage.toFixed(1)}%)`);
  points.push(`Buyer days: ${metrics.buyerDays} (${metrics.buyerPercentage.toFixed(1)}%)`);
  points.push(`Proration balance: ${metrics.prorationBalance.toFixed(2)}`);
  
  return points;
}

function generateProrationFormula(inputs: PropertyTaxProrationInputs): string {
  switch (inputs.prorationMethod) {
    case '365_day':
      return 'Proration = (Annual Tax × Days) ÷ 365';
    case '360_day':
      return 'Proration = (Annual Tax × Days) ÷ 360';
    case 'actual_days':
      return 'Proration = (Annual Tax × Actual Days) ÷ Days in Year';
    case 'banker_30_360':
      return 'Proration = (Annual Tax × Days) ÷ 360 (Banker\'s Method)';
    default:
      return 'Proration = (Annual Tax × Days) ÷ Total Days';
  }
}

function generateProrationNotes(inputs: PropertyTaxProrationInputs, metrics: PropertyTaxProrationMetrics): string[] {
  const notes: string[] = [];
  
  notes.push(`Proration method: ${inputs.prorationMethod}`);
  notes.push(`Accuracy level: ${inputs.prorationAccuracy}`);
  notes.push(`Total days in year: ${metrics.totalDaysInYear}`);
  
  return notes;
}