import { PropertyTaxProrationInputs, PropertyTaxProrationOutputs } from './types';

// Calculate days in tax year
export function calculateDaysInTaxYear(taxYearStart: string, taxYearEnd: string, prorationMethod: string): number {
  const start = new Date(taxYearStart);
  const end = new Date(taxYearEnd);

  if (prorationMethod === '366-Day') {
    return 366;
  } else if (prorationMethod === '365-Day') {
    return 365;
  } else {
    // Actual days calculation
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
}

// Calculate proration periods
export function calculateProrationPeriods(inputs: PropertyTaxProrationInputs): {
  totalDaysInTaxYear: number;
  daysOwnedBySeller: number;
  daysOwnedByBuyer: number;
  sellerPortionOfAnnualTax: number;
  buyerPortionOfAnnualTax: number;
} {
  const totalDaysInTaxYear = calculateDaysInTaxYear(
    inputs.taxYearStart,
    inputs.taxYearEnd,
    inputs.prorationMethod
  );

  const closingDate = new Date(inputs.closingDate);
  const taxYearStart = new Date(inputs.taxYearStart);

  let daysOwnedBySeller: number;
  let daysOwnedByBuyer: number;

  if (inputs.prorationMethod === '30-Day') {
    // 30-day month method
    const closingDay = closingDate.getDate();
    daysOwnedBySeller = closingDay;
    daysOwnedByBuyer = 30 - closingDay;
  } else if (inputs.prorationMethod === 'Semi-Annual') {
    // Semi-annual method
    const closingMonth = closingDate.getMonth();
    if (closingMonth < 6) {
      // First half of year
      daysOwnedBySeller = Math.ceil(totalDaysInTaxYear / 2);
      daysOwnedByBuyer = totalDaysInTaxYear - daysOwnedBySeller;
    } else {
      // Second half of year
      daysOwnedByBuyer = Math.ceil(totalDaysInTaxYear / 2);
      daysOwnedBySeller = totalDaysInTaxYear - daysOwnedByBuyer;
    }
  } else {
    // Actual days method
    const timeDiff = closingDate.getTime() - taxYearStart.getTime();
    daysOwnedBySeller = Math.ceil(timeDiff / (1000 * 3600 * 24));
    daysOwnedByBuyer = totalDaysInTaxYear - daysOwnedBySeller;
  }

  const sellerPortionOfAnnualTax = (daysOwnedBySeller / totalDaysInTaxYear) * inputs.annualPropertyTax;
  const buyerPortionOfAnnualTax = (daysOwnedByBuyer / totalDaysInTaxYear) * inputs.annualPropertyTax;

  return {
    totalDaysInTaxYear,
    daysOwnedBySeller,
    daysOwnedByBuyer,
    sellerPortionOfAnnualTax,
    buyerPortionOfAnnualTax
  };
}

// Calculate payment responsibilities
export function calculatePaymentResponsibilities(inputs: PropertyTaxProrationInputs, proration: any): {
  sellerOwedToBuyer: number;
  buyerOwedToSeller: number;
  netTaxAdjustment: number;
  sellerTaxCredit: number;
  buyerTaxDebit: number;
  adjustmentEntry: number;
} {
  let sellerOwedToBuyer = 0;
  let buyerOwedToSeller = 0;
  let sellerTaxCredit = 0;
  let buyerTaxDebit = 0;

  if (inputs.buyerPaysProratedTax) {
    // Buyer pays their portion, seller credits buyer for seller's portion
    buyerTaxDebit = proration.buyerPortionOfAnnualTax;
    sellerTaxCredit = proration.sellerPortionOfAnnualTax;
    sellerOwedToBuyer = proration.sellerPortionOfAnnualTax;
  } else {
    // Seller pays their portion, buyer pays seller for buyer's portion
    buyerOwedToSeller = proration.buyerPortionOfAnnualTax;
    sellerTaxCredit = proration.sellerPortionOfAnnualTax;
    buyerTaxDebit = proration.buyerPortionOfAnnualTax;
  }

  const netTaxAdjustment = sellerOwedToBuyer - buyerOwedToSeller;

  return {
    sellerOwedToBuyer,
    buyerOwedToSeller,
    netTaxAdjustment,
    sellerTaxCredit,
    buyerTaxDebit,
    adjustmentEntry: netTaxAdjustment
  };
}

// Calculate escrow analysis
export function calculateEscrowAnalysis(inputs: PropertyTaxProrationInputs, proration: any): {
  escrowTaxReserve: number;
  escrowShortage: number;
  escrowSurplus: number;
} {
  // Calculate required escrow reserve (typically 2 months of taxes)
  const escrowTaxReserve = (inputs.annualPropertyTax / 12) * 2;

  // Calculate actual escrow position
  const paidAmount = inputs.lastTaxPaymentAmount;
  const requiredAmount = proration.sellerPortionOfAnnualTax;

  const escrowShortage = Math.max(0, requiredAmount - paidAmount);
  const escrowSurplus = Math.max(0, paidAmount - requiredAmount);

  return {
    escrowTaxReserve,
    escrowShortage,
    escrowSurplus
  };
}

// Calculate tax year analysis
export function calculateTaxYearAnalysis(inputs: PropertyTaxProrationInputs): {
  taxYearProgress: number;
  remainingTaxYearDays: number;
  taxPeriodStatus: PropertyTaxProrationOutputs['taxPeriodStatus'];
} {
  const now = new Date();
  const taxYearStart = new Date(inputs.taxYearStart);
  const taxYearEnd = new Date(inputs.taxYearEnd);

  const totalDays = calculateDaysInTaxYear(inputs.taxYearStart, inputs.taxYearEnd, inputs.prorationMethod);
  const elapsedDays = Math.ceil((now.getTime() - taxYearStart.getTime()) / (1000 * 3600 * 24));

  const taxYearProgress = Math.min(100, (elapsedDays / totalDays) * 100);
  const remainingTaxYearDays = Math.max(0, totalDays - elapsedDays);

  let taxPeriodStatus: PropertyTaxProrationOutputs['taxPeriodStatus'] = 'Current';
  if (elapsedDays < 0) taxPeriodStatus = 'Prepaid';
  else if (remainingTaxYearDays < 30) taxPeriodStatus = 'Delinquent';

  return {
    taxYearProgress,
    remainingTaxYearDays,
    taxPeriodStatus
  };
}

// Calculate comparative analysis
export function calculateComparativeAnalysis(inputs: PropertyTaxProrationInputs, proration: any): {
  vsStandardProration: number;
  prorationEfficiency: number;
  taxSavingsFromMethod: number;
} {
  // Calculate standard 365-day proration for comparison
  const standard365Days = 365;
  const standardSellerPortion = (proration.daysOwnedBySeller / standard365Days) * inputs.annualPropertyTax;

  const vsStandardProration = proration.sellerPortionOfAnnualTax - standardSellerPortion;

  // Efficiency based on actual days vs standard method
  const actualEfficiency = (proration.daysOwnedBySeller / proration.totalDaysInTaxYear) * 100;
  const standardEfficiency = (proration.daysOwnedBySeller / 365) * 100;
  const prorationEfficiency = actualEfficiency - standardEfficiency;

  // Tax savings (could be positive or negative)
  const taxSavingsFromMethod = vsStandardProration;

  return {
    vsStandardProration,
    prorationEfficiency,
    taxSavingsFromMethod
  };
}

// Calculate state-specific rules
export function calculateStateSpecificRules(inputs: PropertyTaxProrationInputs): {
  stateProrationRules: string[];
  localTaxRequirements: string[];
  complianceStatus: PropertyTaxProrationOutputs['complianceStatus'];
} {
  const stateProrationRules: string[] = [];
  const localTaxRequirements: string[] = [];

  // State-specific rules (simplified examples)
  switch (inputs.state.toUpperCase()) {
    case 'CA':
      stateProrationRules.push('California uses actual days method');
      stateProrationRules.push('Taxes prorated based on calendar year');
      localTaxRequirements.push('County assessor must be notified of sale');
      break;
    case 'TX':
      stateProrationRules.push('Texas allows seller to choose proration method');
      stateProrationRules.push('January 1 to December 31 tax year');
      localTaxRequirements.push('Tax certificates required');
      break;
    case 'FL':
      stateProrationRules.push('Florida uses actual days method');
      stateProrationRules.push('Save Our Homes cap may affect proration');
      localTaxRequirements.push('Property appraiser notification required');
      break;
    case 'NY':
      stateProrationRules.push('New York uses actual days method');
      stateProrationRules.push('School taxes may have different proration');
      localTaxRequirements.push('Village and town taxes may apply');
      break;
    default:
      stateProrationRules.push('Check local jurisdiction for specific rules');
      stateProrationRules.push('Standard proration methods typically apply');
  }

  // Compliance check (simplified)
  let complianceStatus: PropertyTaxProrationOutputs['complianceStatus'] = 'Compliant';
  if (!inputs.closingDate || !inputs.taxYearStart) {
    complianceStatus = 'Review Required';
  }

  return {
    stateProrationRules,
    localTaxRequirements,
    complianceStatus
  };
}

// Calculate payment schedule
export function calculatePaymentSchedule(inputs: PropertyTaxProrationInputs): Array<{
  date: string;
  amount: number;
  responsibleParty: 'Seller' | 'Buyer' | 'Escrow';
}> {
  const schedule: Array<{
    date: string;
    amount: number;
    responsibleParty: 'Seller' | 'Buyer' | 'Escrow';
  }> = [];

  // Add current/next payment
  if (inputs.nextTaxPaymentDate && inputs.nextTaxPaymentAmount) {
    schedule.push({
      date: inputs.nextTaxPaymentDate,
      amount: inputs.nextTaxPaymentAmount,
      responsibleParty: 'Escrow'
    });
  }

  // Add closing adjustment
  const proration = calculateProrationPeriods(inputs);
  const responsibilities = calculatePaymentResponsibilities(inputs, proration);

  if (responsibilities.netTaxAdjustment !== 0) {
    schedule.push({
      date: inputs.closingDate,
      amount: Math.abs(responsibilities.netTaxAdjustment),
      responsibleParty: responsibilities.netTaxAdjustment > 0 ? 'Seller' : 'Buyer'
    });
  }

  return schedule;
}

// Calculate risk assessment
export function calculateRiskAssessment(inputs: PropertyTaxProrationInputs): {
  prorationRiskLevel: PropertyTaxProrationOutputs['prorationRiskLevel'];
  riskFactors: string[];
  recommendedActions: string[];
} {
  let riskLevel: PropertyTaxProrationOutputs['prorationRiskLevel'] = 'Low';
  const riskFactors: string[] = [];
  const recommendedActions: string[] = [];

  // Assess risks
  if (!inputs.closingDate) {
    riskFactors.push('Missing closing date');
    riskLevel = 'High';
  }

  if (!inputs.annualPropertyTax || inputs.annualPropertyTax <= 0) {
    riskFactors.push('Invalid or missing tax amount');
    riskLevel = 'High';
  }

  if (inputs.prorationMethod === 'Actual Days' && (!inputs.taxYearStart || !inputs.taxYearEnd)) {
    riskFactors.push('Missing tax year dates for actual days calculation');
    riskLevel = 'Medium';
  }

  const yearAnalysis = calculateTaxYearAnalysis(inputs);
  if (yearAnalysis.taxPeriodStatus === 'Delinquent') {
    riskFactors.push('Tax period is delinquent');
    riskLevel = 'Medium';
  }

  // Generate recommendations
  if (riskFactors.length > 0) {
    recommendedActions.push('Review all input data for accuracy');
    recommendedActions.push('Consult with tax professional');
  }

  if (inputs.state) {
    recommendedActions.push(`Verify ${inputs.state} specific proration rules`);
  }

  recommendedActions.push('Document all proration calculations');
  recommendedActions.push('Include proration in settlement statement');

  return {
    prorationRiskLevel: riskLevel,
    riskFactors,
    recommendedActions
  };
}

// Calculate tax efficiency
export function calculateTaxEfficiency(inputs: PropertyTaxProrationInputs, proration: any): {
  taxProrationEfficiency: number;
  optimalClosingDate: string;
  taxSavingsOpportunities: string[];
} {
  // Efficiency based on how well the proration method minimizes costs
  const efficiency = (proration.daysOwnedBySeller / proration.totalDaysInTaxYear) * 100;

  // Optimal closing date (simplified - typically early in tax year)
  const taxYearStart = new Date(inputs.taxYearStart);
  const optimalClosingDate = new Date(taxYearStart);
  optimalClosingDate.setDate(optimalClosingDate.getDate() + 30); // 30 days into tax year

  const taxSavingsOpportunities: string[] = [];

  if (proration.daysOwnedBySeller > proration.totalDaysInTaxYear / 2) {
    taxSavingsOpportunities.push('Consider closing earlier in tax year to reduce seller tax liability');
  }

  if (inputs.prorationMethod !== 'Actual Days') {
    taxSavingsOpportunities.push('Consider using actual days method for more precise proration');
  }

  if (inputs.specialAssessments > 0) {
    taxSavingsOpportunities.push('Review special assessments for proration requirements');
  }

  return {
    taxProrationEfficiency: efficiency,
    optimalClosingDate: optimalClosingDate.toISOString().split('T')[0],
    taxSavingsOpportunities
  };
}

// Calculate financial impact
export function calculateFinancialImpact(inputs: PropertyTaxProrationInputs, responsibilities: any): {
  impactOnClosingCosts: number;
  impactOnCashToClose: number;
  taxAdjustedSalePrice: number;
} {
  const impactOnClosingCosts = Math.abs(responsibilities.netTaxAdjustment);
  const impactOnCashToClose = responsibilities.netTaxAdjustment; // Positive means seller receives, negative means buyer pays

  // Tax-adjusted sale price (simplified)
  const taxAdjustedSalePrice = inputs.salePrice + responsibilities.netTaxAdjustment;

  return {
    impactOnClosingCosts,
    impactOnCashToClose,
    taxAdjustedSalePrice
  };
}

// Calculate projections
export function calculateProjections(inputs: PropertyTaxProrationInputs): {
  projectedTaxForNextYear: number;
  projectedProrationChange: number;
  futureTaxLiability: number;
} {
  const projectedTaxForNextYear = inputs.annualPropertyTax * (1 + inputs.taxIncreasePercentage / 100);

  // Assume similar closing date next year
  const nextYearClosing = new Date(inputs.closingDate);
  nextYearClosing.setFullYear(nextYearClosing.getFullYear() + 1);

  const nextYearProration = calculateProrationPeriods({
    ...inputs,
    closingDate: nextYearClosing.toISOString().split('T')[0],
    annualPropertyTax: projectedTaxForNextYear
  });

  const projectedProrationChange = nextYearProration.proratedTaxAmount - calculateProrationPeriods(inputs).proratedTaxAmount;
  const futureTaxLiability = projectedTaxForNextYear;

  return {
    projectedTaxForNextYear,
    projectedProrationChange,
    futureTaxLiability
  };
}

// Main calculation function
export function calculatePropertyTaxProration(inputs: PropertyTaxProrationInputs): PropertyTaxProrationOutputs {
  const proration = calculateProrationPeriods(inputs);
  const responsibilities = calculatePaymentResponsibilities(inputs, proration);
  const escrow = calculateEscrowAnalysis(inputs, proration);
  const yearAnalysis = calculateTaxYearAnalysis(inputs);
  const comparative = calculateComparativeAnalysis(inputs, proration);
  const stateSpecific = calculateStateSpecificRules(inputs);
  const paymentSchedule = calculatePaymentSchedule(inputs);
  const riskAssessment = calculateRiskAssessment(inputs);
  const efficiency = calculateTaxEfficiency(inputs, proration);
  const financialImpact = calculateFinancialImpact(inputs, responsibilities);
  const projections = calculateProjections(inputs);

  // Additional calculations
  const proratedTaxAmount = proration.sellerPortionOfAnnualTax + proration.buyerPortionOfAnnualTax;
  const baseTaxAmount = inputs.annualPropertyTax - inputs.specialAssessments - inputs.taxOverrides;
  const specialAssessmentAmount = inputs.specialAssessments;
  const overrideAmount = inputs.taxOverrides;
  const totalTaxLiability = inputs.annualPropertyTax;

  // Historical comparison (simplified placeholder)
  const previousTransactionComparison = {
    similarSalePrice: inputs.salePrice * 0.95,
    similarTaxProration: proratedTaxAmount * 0.92,
    difference: proratedTaxAmount - (proratedTaxAmount * 0.92)
  };

  // Alternative scenarios
  const bestCaseScenario = {
    prorationAmount: proration.sellerPortionOfAnnualTax * 0.9,
    savings: proration.sellerPortionOfAnnualTax * 0.1
  };

  const worstCaseScenario = {
    prorationAmount: proration.sellerPortionOfAnnualTax * 1.1,
    additionalCost: proration.sellerPortionOfAnnualTax * 0.1
  };

  // Market analysis (simplified)
  const localProrationAverages = proratedTaxAmount * 0.98;
  const marketComparison: PropertyTaxProrationOutputs['marketComparison'] =
    Math.abs(proratedTaxAmount - localProrationAverages) / localProrationAverages < 0.05 ? 'At Market' :
    proratedTaxAmount > localProrationAverages ? 'Above Market' : 'Below Market';

  // Closing timeline
  const taxYearStart = new Date(inputs.taxYearStart);
  const optimalClosingWindow = {
    startDate: new Date(taxYearStart.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(taxYearStart.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    reason: 'Early in tax year minimizes seller tax liability'
  };

  // Educational content
  const prorationFacts = [
    'Property taxes are typically prorated based on the number of days each party owns the property',
    'The seller usually pays taxes up to the closing date, and the buyer assumes responsibility after',
    'Different states have different rules for tax proration',
    'Proration method can significantly impact closing costs'
  ];

  const stateSpecificTips = [
    `Check ${inputs.state} specific proration requirements`,
    'Verify if special assessments are prorated differently',
    'Confirm tax year dates with local tax authority'
  ];

  const negotiationTips = [
    'Seller may prefer closing early in tax year to minimize tax liability',
    'Buyer may prefer closing late in tax year to minimize initial tax payments',
    'Consider escrow requirements for tax payments',
    'Document all proration agreements in writing'
  ];

  // Audit trail
  const calculationMethodUsed = inputs.prorationMethod;
  const assumptionsMade = [
    'Tax payments are evenly distributed throughout the year',
    'No changes in tax rates during the proration period',
    'All tax information is current and accurate'
  ];

  const dataSources = [
    'Property tax records',
    'Closing documents',
    'Local tax authority information'
  ];

  const competitiveAnalysis = [
    'Compare proration with recent similar sales',
    'Review local market trends',
    'Consider seasonal closing patterns'
  ];

  // Tax authority information (simplified)
  const taxAuthorityContact = `${inputs.county} Tax Assessor's Office`;
  const paymentMethods = ['Online', 'Mail', 'In-person'];
  const onlinePaymentAvailable = true;

  // Compliance and reporting
  const reportingRequirements = ['Include in settlement statement', 'Report to tax authority if required'];
  const documentationNeeded = ['Tax bills', 'Proration calculation', 'Settlement statement'];
  const recordRetentionPeriod = 7; // Years

  // Legal considerations
  const prorationAgreementRequired = true;
  const contractLanguage = [
    'Proration shall be calculated using the [method] method',
    'Seller shall pay taxes up to closing date',
    'Buyer assumes tax responsibility after closing'
  ];

  const disputeResolutionOptions = [
    'Mediation through local real estate board',
    'Arbitration',
    'Court resolution'
  ];

  return {
    ...proration,
    proratedTaxAmount,
    ...responsibilities,
    ...escrow,
    ...yearAnalysis,
    ...comparative,
    ...stateSpecific,
    baseTaxAmount,
    specialAssessmentAmount,
    overrideAmount,
    totalTaxLiability,
    taxPaymentSchedule: paymentSchedule,
    ...riskAssessment,
    previousTransactionComparison,
    ...efficiency,
    prorationAgreementRequired,
    contractLanguage,
    disputeResolutionOptions,
    ...financialImpact,
    ...projections,
    prorationFacts,
    stateSpecificTips,
    negotiationTips,
    calculationMethodUsed,
    assumptionsMade,
    dataSources,
    bestCaseScenario,
    worstCaseScenario,
    localProrationAverages,
    marketComparison,
    competitiveAnalysis,
    optimalClosingWindow,
    taxAuthorityContact,
    paymentMethods,
    onlinePaymentAvailable,
    reportingRequirements,
    documentationNeeded,
    recordRetentionPeriod
  };
}