import { MortgageClosingCostInputs } from './validation';

export interface ClosingCostResult {
  totalClosingCosts: number;
  lenderFees: number;
  thirdPartyFees: number;
  prepaidItems: number;
  escrowItems: number;
  governmentFees: number;
  insuranceFees: number;
  titleFees: number;
  inspectionFees: number;
  closingCostPercentage: number;
  closingCostPerSquareFoot: number;
  cashToClose: number;
  breakdownByCategory: BreakdownByCategory;
  feeComparison: FeeComparison;
  costAnalysis: CostAnalysis;
  recommendations: string;
  keyMetrics: KeyMetrics;
}

export interface BreakdownByCategory {
  lenderFees: { name: string; amount: number; percentage: number }[];
  thirdPartyFees: { name: string; amount: number; percentage: number }[];
  titleFees: { name: string; amount: number; percentage: number }[];
  insuranceFees: { name: string; amount: number; percentage: number }[];
  governmentFees: { name: string; amount: number; percentage: number }[];
  inspectionFees: { name: string; amount: number; percentage: number }[];
  prepaidItems: { name: string; amount: number; percentage: number }[];
  escrowItems: { name: string; amount: number; percentage: number }[];
  credits: { name: string; amount: number; percentage: number }[];
}

export interface FeeComparison {
  averageClosingCosts: number;
  averagePercentage: number;
  comparison: string;
  percentile: number;
  costRange: string;
}

export interface CostAnalysis {
  highestFee: { name: string; amount: number; percentage: number };
  lowestFee: { name: string; amount: number; percentage: number };
  negotiableFees: string[];
  nonNegotiableFees: string[];
  optionalFees: string[];
  requiredFees: string[];
}

export interface KeyMetrics {
  averageClosingCosts: number;
  averagePercentage: number;
  costEfficiency: number;
  negotiablePercentage: number;
  totalCredits: number;
  netClosingCosts: number;
}

export const calculateMortgageClosingCosts = (inputs: MortgageClosingCostInputs): ClosingCostResult => {
  const {
    loanAmount,
    propertyValue,
    lenderOriginationFee = 0,
    lenderPoints = 0,
    applicationFee = 0,
    processingFee = 0,
    underwritingFee = 0,
    appraisalFee = 0,
    creditReportFee = 0,
    floodCertificationFee = 0,
    taxServiceFee = 0,
    titleInsuranceOwner = 0,
    titleInsuranceLender = 0,
    titleSearchFee = 0,
    titleExamFee = 0,
    titleEndorsements = 0,
    attorneyFee = 0,
    escrowFee = 0,
    recordingFee = 0,
    transferTax = 0,
    surveyFee = 0,
    homeInspectionFee = 0,
    pestInspectionFee = 0,
    homeownersInsuranceAnnual = 0,
    propertyTaxAnnual = 0,
    pmiAnnual = 0,
    mipAnnual = 0,
    vaFundingFee = 0,
    usdaGuaranteeFee = 0,
    escrowMonths = 12,
    rateLockFee = 0,
    prepaymentPenalty = 0,
    otherFees = 0,
    lenderCredits = 0,
    sellerCredits = 0
  } = inputs;

  // Calculate lender fees
  const pointsAmount = (lenderPoints / 100) * loanAmount;
  const lenderFees = lenderOriginationFee + pointsAmount + applicationFee + processingFee + underwritingFee + rateLockFee;

  // Calculate third-party fees
  const thirdPartyFees = appraisalFee + creditReportFee + floodCertificationFee + taxServiceFee + attorneyFee + escrowFee + surveyFee + otherFees;

  // Calculate title fees
  const titleFees = titleInsuranceOwner + titleInsuranceLender + titleSearchFee + titleExamFee + titleEndorsements;

  // Calculate insurance fees
  const insuranceFees = pmiAnnual + mipAnnual + vaFundingFee + usdaGuaranteeFee;

  // Calculate government fees
  const governmentFees = recordingFee + transferTax;

  // Calculate inspection fees
  const inspectionFees = homeInspectionFee + pestInspectionFee;

  // Calculate prepaid items (typically 1 month of insurance and taxes)
  const prepaidInsurance = homeownersInsuranceAnnual / 12;
  const prepaidTaxes = propertyTaxAnnual / 12;
  const prepaidItems = prepaidInsurance + prepaidTaxes;

  // Calculate escrow items
  const escrowInsurance = (homeownersInsuranceAnnual * escrowMonths) / 12;
  const escrowTaxes = (propertyTaxAnnual * escrowMonths) / 12;
  const escrowPMI = (pmiAnnual * escrowMonths) / 12;
  const escrowMIP = (mipAnnual * escrowMonths) / 12;
  const escrowItems = escrowInsurance + escrowTaxes + escrowPMI + escrowMIP;

  // Calculate total closing costs
  const totalFees = lenderFees + thirdPartyFees + titleFees + insuranceFees + governmentFees + inspectionFees + prepaidItems + escrowItems;
  const totalCredits = Math.abs(lenderCredits) + Math.abs(sellerCredits);
  const totalClosingCosts = totalFees - totalCredits;

  // Calculate percentages
  const closingCostPercentage = (totalClosingCosts / loanAmount) * 100;

  // Calculate cash to close
  const downPayment = propertyValue - loanAmount;
  const cashToClose = downPayment + totalClosingCosts;

  // Generate breakdown by category
  const breakdownByCategory = generateBreakdownByCategory(inputs, totalClosingCosts);

  // Generate fee comparison
  const feeComparison = generateFeeComparison(totalClosingCosts, loanAmount, inputs);

  // Generate cost analysis
  const costAnalysis = generateCostAnalysis(breakdownByCategory);

  // Generate recommendations
  const recommendations = generateRecommendations(inputs, totalClosingCosts, feeComparison);

  // Generate key metrics
  const keyMetrics = generateKeyMetrics(inputs, totalClosingCosts, totalCredits);

  return {
    totalClosingCosts: Math.round(totalClosingCosts * 100) / 100,
    lenderFees: Math.round(lenderFees * 100) / 100,
    thirdPartyFees: Math.round(thirdPartyFees * 100) / 100,
    prepaidItems: Math.round(prepaidItems * 100) / 100,
    escrowItems: Math.round(escrowItems * 100) / 100,
    governmentFees: Math.round(governmentFees * 100) / 100,
    insuranceFees: Math.round(insuranceFees * 100) / 100,
    titleFees: Math.round(titleFees * 100) / 100,
    inspectionFees: Math.round(inspectionFees * 100) / 100,
    closingCostPercentage: Math.round(closingCostPercentage * 100) / 100,
    closingCostPerSquareFoot: 0, // Would need property size to calculate
    cashToClose: Math.round(cashToClose * 100) / 100,
    breakdownByCategory,
    feeComparison,
    costAnalysis,
    recommendations,
    keyMetrics
  };
};

const generateBreakdownByCategory = (inputs: MortgageClosingCostInputs, totalClosingCosts: number): BreakdownByCategory => {
  const breakdown: BreakdownByCategory = {
    lenderFees: [],
    thirdPartyFees: [],
    titleFees: [],
    insuranceFees: [],
    governmentFees: [],
    inspectionFees: [],
    prepaidItems: [],
    escrowItems: [],
    credits: []
  };

  // Lender fees
  if (inputs.lenderOriginationFee) {
    breakdown.lenderFees.push({
      name: 'Lender Origination Fee',
      amount: inputs.lenderOriginationFee,
      percentage: (inputs.lenderOriginationFee / totalClosingCosts) * 100
    });
  }

  if (inputs.lenderPoints) {
    const pointsAmount = (inputs.lenderPoints / 100) * inputs.loanAmount;
    breakdown.lenderFees.push({
      name: 'Lender Points',
      amount: pointsAmount,
      percentage: (pointsAmount / totalClosingCosts) * 100
    });
  }

  if (inputs.applicationFee) {
    breakdown.lenderFees.push({
      name: 'Application Fee',
      amount: inputs.applicationFee,
      percentage: (inputs.applicationFee / totalClosingCosts) * 100
    });
  }

  if (inputs.processingFee) {
    breakdown.lenderFees.push({
      name: 'Processing Fee',
      amount: inputs.processingFee,
      percentage: (inputs.processingFee / totalClosingCosts) * 100
    });
  }

  if (inputs.underwritingFee) {
    breakdown.lenderFees.push({
      name: 'Underwriting Fee',
      amount: inputs.underwritingFee,
      percentage: (inputs.underwritingFee / totalClosingCosts) * 100
    });
  }

  if (inputs.rateLockFee) {
    breakdown.lenderFees.push({
      name: 'Rate Lock Fee',
      amount: inputs.rateLockFee,
      percentage: (inputs.rateLockFee / totalClosingCosts) * 100
    });
  }

  // Third-party fees
  if (inputs.appraisalFee) {
    breakdown.thirdPartyFees.push({
      name: 'Appraisal Fee',
      amount: inputs.appraisalFee,
      percentage: (inputs.appraisalFee / totalClosingCosts) * 100
    });
  }

  if (inputs.creditReportFee) {
    breakdown.thirdPartyFees.push({
      name: 'Credit Report Fee',
      amount: inputs.creditReportFee,
      percentage: (inputs.creditReportFee / totalClosingCosts) * 100
    });
  }

  if (inputs.floodCertificationFee) {
    breakdown.thirdPartyFees.push({
      name: 'Flood Certification Fee',
      amount: inputs.floodCertificationFee,
      percentage: (inputs.floodCertificationFee / totalClosingCosts) * 100
    });
  }

  if (inputs.taxServiceFee) {
    breakdown.thirdPartyFees.push({
      name: 'Tax Service Fee',
      amount: inputs.taxServiceFee,
      percentage: (inputs.taxServiceFee / totalClosingCosts) * 100
    });
  }

  if (inputs.attorneyFee) {
    breakdown.thirdPartyFees.push({
      name: 'Attorney Fee',
      amount: inputs.attorneyFee,
      percentage: (inputs.attorneyFee / totalClosingCosts) * 100
    });
  }

  if (inputs.escrowFee) {
    breakdown.thirdPartyFees.push({
      name: 'Escrow Fee',
      amount: inputs.escrowFee,
      percentage: (inputs.escrowFee / totalClosingCosts) * 100
    });
  }

  if (inputs.surveyFee) {
    breakdown.thirdPartyFees.push({
      name: 'Survey Fee',
      amount: inputs.surveyFee,
      percentage: (inputs.surveyFee / totalClosingCosts) * 100
    });
  }

  if (inputs.otherFees) {
    breakdown.thirdPartyFees.push({
      name: 'Other Fees',
      amount: inputs.otherFees,
      percentage: (inputs.otherFees / totalClosingCosts) * 100
    });
  }

  // Title fees
  if (inputs.titleInsuranceOwner) {
    breakdown.titleFees.push({
      name: 'Owner Title Insurance',
      amount: inputs.titleInsuranceOwner,
      percentage: (inputs.titleInsuranceOwner / totalClosingCosts) * 100
    });
  }

  if (inputs.titleInsuranceLender) {
    breakdown.titleFees.push({
      name: 'Lender Title Insurance',
      amount: inputs.titleInsuranceLender,
      percentage: (inputs.titleInsuranceLender / totalClosingCosts) * 100
    });
  }

  if (inputs.titleSearchFee) {
    breakdown.titleFees.push({
      name: 'Title Search Fee',
      amount: inputs.titleSearchFee,
      percentage: (inputs.titleSearchFee / totalClosingCosts) * 100
    });
  }

  if (inputs.titleExamFee) {
    breakdown.titleFees.push({
      name: 'Title Examination Fee',
      amount: inputs.titleExamFee,
      percentage: (inputs.titleExamFee / totalClosingCosts) * 100
    });
  }

  if (inputs.titleEndorsements) {
    breakdown.titleFees.push({
      name: 'Title Endorsements',
      amount: inputs.titleEndorsements,
      percentage: (inputs.titleEndorsements / totalClosingCosts) * 100
    });
  }

  // Insurance fees
  if (inputs.pmiAnnual) {
    breakdown.insuranceFees.push({
      name: 'PMI (Annual)',
      amount: inputs.pmiAnnual,
      percentage: (inputs.pmiAnnual / totalClosingCosts) * 100
    });
  }

  if (inputs.mipAnnual) {
    breakdown.insuranceFees.push({
      name: 'MIP (Annual)',
      amount: inputs.mipAnnual,
      percentage: (inputs.mipAnnual / totalClosingCosts) * 100
    });
  }

  if (inputs.vaFundingFee) {
    breakdown.insuranceFees.push({
      name: 'VA Funding Fee',
      amount: inputs.vaFundingFee,
      percentage: (inputs.vaFundingFee / totalClosingCosts) * 100
    });
  }

  if (inputs.usdaGuaranteeFee) {
    breakdown.insuranceFees.push({
      name: 'USDA Guarantee Fee',
      amount: inputs.usdaGuaranteeFee,
      percentage: (inputs.usdaGuaranteeFee / totalClosingCosts) * 100
    });
  }

  // Government fees
  if (inputs.recordingFee) {
    breakdown.governmentFees.push({
      name: 'Recording Fee',
      amount: inputs.recordingFee,
      percentage: (inputs.recordingFee / totalClosingCosts) * 100
    });
  }

  if (inputs.transferTax) {
    breakdown.governmentFees.push({
      name: 'Transfer Tax',
      amount: inputs.transferTax,
      percentage: (inputs.transferTax / totalClosingCosts) * 100
    });
  }

  // Inspection fees
  if (inputs.homeInspectionFee) {
    breakdown.inspectionFees.push({
      name: 'Home Inspection Fee',
      amount: inputs.homeInspectionFee,
      percentage: (inputs.homeInspectionFee / totalClosingCosts) * 100
    });
  }

  if (inputs.pestInspectionFee) {
    breakdown.inspectionFees.push({
      name: 'Pest Inspection Fee',
      amount: inputs.pestInspectionFee,
      percentage: (inputs.pestInspectionFee / totalClosingCosts) * 100
    });
  }

  // Credits
  if (inputs.lenderCredits) {
    breakdown.credits.push({
      name: 'Lender Credits',
      amount: Math.abs(inputs.lenderCredits),
      percentage: (Math.abs(inputs.lenderCredits) / totalClosingCosts) * 100
    });
  }

  if (inputs.sellerCredits) {
    breakdown.credits.push({
      name: 'Seller Credits',
      amount: Math.abs(inputs.sellerCredits),
      percentage: (Math.abs(inputs.sellerCredits) / totalClosingCosts) * 100
    });
  }

  return breakdown;
};

const generateFeeComparison = (totalClosingCosts: number, loanAmount: number, inputs: MortgageClosingCostInputs): FeeComparison => {
  // Average closing costs based on loan type and amount
  let averageClosingCosts = 0;
  let averagePercentage = 0;

  if (inputs.loanType === 'FHA') {
    averageClosingCosts = loanAmount * 0.035; // 3.5% average for FHA
    averagePercentage = 3.5;
  } else if (inputs.loanType === 'VA') {
    averageClosingCosts = loanAmount * 0.025; // 2.5% average for VA
    averagePercentage = 2.5;
  } else if (inputs.loanType === 'USDA') {
    averageClosingCosts = loanAmount * 0.03; // 3% average for USDA
    averagePercentage = 3.0;
  } else {
    averageClosingCosts = loanAmount * 0.028; // 2.8% average for conventional
    averagePercentage = 2.8;
  }

  const currentPercentage = (totalClosingCosts / loanAmount) * 100;
  let comparison = '';
  let percentile = 50;

  if (currentPercentage < averagePercentage * 0.8) {
    comparison = 'Excellent - Below average closing costs';
    percentile = 20;
  } else if (currentPercentage < averagePercentage) {
    comparison = 'Good - Below average closing costs';
    percentile = 40;
  } else if (currentPercentage < averagePercentage * 1.2) {
    comparison = 'Average - Typical closing costs';
    percentile = 60;
  } else if (currentPercentage < averagePercentage * 1.5) {
    comparison = 'High - Above average closing costs';
    percentile = 80;
  } else {
    comparison = 'Very High - Significantly above average';
    percentile = 95;
  }

  let costRange = '';
  if (currentPercentage < 2) {
    costRange = 'Very Low';
  } else if (currentPercentage < 3) {
    costRange = 'Low';
  } else if (currentPercentage < 4) {
    costRange = 'Average';
  } else if (currentPercentage < 5) {
    costRange = 'High';
  } else {
    costRange = 'Very High';
  }

  return {
    averageClosingCosts: Math.round(averageClosingCosts * 100) / 100,
    averagePercentage: Math.round(averagePercentage * 100) / 100,
    comparison,
    percentile,
    costRange
  };
};

const generateCostAnalysis = (breakdown: BreakdownByCategory): CostAnalysis => {
  const allFees = [
    ...breakdown.lenderFees,
    ...breakdown.thirdPartyFees,
    ...breakdown.titleFees,
    ...breakdown.insuranceFees,
    ...breakdown.governmentFees,
    ...breakdown.inspectionFees,
    ...breakdown.prepaidItems,
    ...breakdown.escrowItems
  ];

  const highestFee = allFees.reduce((max, fee) => fee.amount > max.amount ? fee : max, allFees[0] || { name: 'None', amount: 0, percentage: 0 });
  const lowestFee = allFees.reduce((min, fee) => fee.amount < min.amount ? fee : min, allFees[0] || { name: 'None', amount: 0, percentage: 0 });

  const negotiableFees = [
    'Lender Origination Fee',
    'Lender Points',
    'Application Fee',
    'Processing Fee',
    'Underwriting Fee',
    'Attorney Fee',
    'Escrow Fee',
    'Survey Fee',
    'Home Inspection Fee',
    'Pest Inspection Fee'
  ];

  const nonNegotiableFees = [
    'Appraisal Fee',
    'Credit Report Fee',
    'Flood Certification Fee',
    'Tax Service Fee',
    'Recording Fee',
    'Transfer Tax',
    'Owner Title Insurance',
    'Lender Title Insurance',
    'Title Search Fee',
    'Title Examination Fee'
  ];

  const optionalFees = [
    'Rate Lock Fee',
    'Prepayment Penalty',
    'Title Endorsements',
    'Home Inspection Fee',
    'Pest Inspection Fee',
    'Survey Fee'
  ];

  const requiredFees = [
    'Appraisal Fee',
    'Credit Report Fee',
    'Recording Fee',
    'Owner Title Insurance',
    'Lender Title Insurance',
    'Title Search Fee',
    'Title Examination Fee'
  ];

  return {
    highestFee,
    lowestFee,
    negotiableFees,
    nonNegotiableFees,
    optionalFees,
    requiredFees
  };
};

const generateRecommendations = (inputs: MortgageClosingCostInputs, totalClosingCosts: number, feeComparison: FeeComparison): string => {
  let recommendations = '';

  if (feeComparison.percentile > 70) {
    recommendations += 'Your closing costs are above average. Consider the following to reduce costs:\n\n';
    
    if (inputs.lenderOriginationFee > 1000) {
      recommendations += '• Negotiate or shop around for lower lender origination fees\n';
    }
    
    if (inputs.lenderPoints > 0) {
      recommendations += '• Consider paying fewer points or negotiating point costs\n';
    }
    
    if (inputs.applicationFee > 500) {
      recommendations += '• Ask if application fees can be waived or reduced\n';
    }
    
    if (inputs.processingFee > 300) {
      recommendations += '• Negotiate processing and underwriting fees\n';
    }
    
    if (inputs.attorneyFee > 500) {
      recommendations += '• Shop around for lower attorney/settlement fees\n';
    }
    
    if (inputs.surveyFee > 0) {
      recommendations += '• Check if a survey is required or if you can use an existing one\n';
    }
    
    if (inputs.homeInspectionFee > 0) {
      recommendations += '• Consider if home inspection is necessary or negotiate the fee\n';
    }
  } else if (feeComparison.percentile < 30) {
    recommendations += 'Your closing costs are below average. This is excellent!\n\n';
    recommendations += '• Continue to negotiate fees when possible\n';
    recommendations += '• Consider asking for lender credits to further reduce costs\n';
    recommendations += '• Shop around for title insurance if not already done\n';
  } else {
    recommendations += 'Your closing costs are in the average range. Consider these options:\n\n';
    recommendations += '• Negotiate lender fees if not already done\n';
    recommendations += '• Ask about lender credits or seller concessions\n';
    recommendations += '• Shop around for title insurance\n';
    recommendations += '• Consider if all inspection fees are necessary\n';
  }

  recommendations += '\nAdditional Tips:\n';
  recommendations += '• Request a Loan Estimate early to identify all costs\n';
  recommendations += '• Compare multiple lenders to find the best rates and fees\n';
  recommendations += '• Ask about any available discounts or promotions\n';
  recommendations += '• Consider timing your closing to minimize prepaid interest\n';

  return recommendations;
};

const generateKeyMetrics = (inputs: MortgageClosingCostInputs, totalClosingCosts: number, totalCredits: number): KeyMetrics => {
  const averageClosingCosts = inputs.loanAmount * 0.028; // 2.8% average
  const averagePercentage = 2.8;
  const currentPercentage = (totalClosingCosts / inputs.loanAmount) * 100;
  
  const costEfficiency = Math.round(((averageClosingCosts - totalClosingCosts) / averageClosingCosts) * 100);
  const negotiablePercentage = 35; // Estimated percentage of negotiable fees
  
  return {
    averageClosingCosts: Math.round(averageClosingCosts * 100) / 100,
    averagePercentage: Math.round(averagePercentage * 100) / 100,
    costEfficiency,
    negotiablePercentage,
    totalCredits: Math.round(totalCredits * 100) / 100,
    netClosingCosts: Math.round(totalClosingCosts * 100) / 100
  };
};

export const generateMortgageClosingCostAnalysis = (inputs: MortgageClosingCostInputs, outputs: ClosingCostResult): string => {
  const { totalClosingCosts, closingCostPercentage, cashToClose, feeComparison, recommendations } = outputs;
  
  let analysis = `# Mortgage Closing Cost Analysis\n\n`;
  
  analysis += `## Summary\n`;
  analysis += `- **Loan Amount:** $${inputs.loanAmount.toLocaleString()}\n`;
  analysis += `- **Property Value:** $${inputs.propertyValue.toLocaleString()}\n`;
  analysis += `- **Total Closing Costs:** $${totalClosingCosts.toLocaleString()}\n`;
  analysis += `- **Closing Cost Percentage:** ${closingCostPercentage}%\n`;
  analysis += `- **Cash to Close:** $${cashToClose.toLocaleString()}\n`;
  analysis += `- **Cost Assessment:** ${feeComparison.comparison}\n\n`;
  
  analysis += `## Cost Breakdown\n\n`;
  analysis += `| Category | Amount | Percentage |\n`;
  analysis += `|----------|--------|------------|\n`;
  analysis += `| Lender Fees | $${outputs.lenderFees.toLocaleString()} | ${((outputs.lenderFees / totalClosingCosts) * 100).toFixed(1)}% |\n`;
  analysis += `| Third-Party Fees | $${outputs.thirdPartyFees.toLocaleString()} | ${((outputs.thirdPartyFees / totalClosingCosts) * 100).toFixed(1)}% |\n`;
  analysis += `| Title Fees | $${outputs.titleFees.toLocaleString()} | ${((outputs.titleFees / totalClosingCosts) * 100).toFixed(1)}% |\n`;
  analysis += `| Insurance Fees | $${outputs.insuranceFees.toLocaleString()} | ${((outputs.insuranceFees / totalClosingCosts) * 100).toFixed(1)}% |\n`;
  analysis += `| Government Fees | $${outputs.governmentFees.toLocaleString()} | ${((outputs.governmentFees / totalClosingCosts) * 100).toFixed(1)}% |\n`;
  analysis += `| Inspection Fees | $${outputs.inspectionFees.toLocaleString()} | ${((outputs.inspectionFees / totalClosingCosts) * 100).toFixed(1)}% |\n`;
  analysis += `| Prepaid Items | $${outputs.prepaidItems.toLocaleString()} | ${((outputs.prepaidItems / totalClosingCosts) * 100).toFixed(1)}% |\n`;
  analysis += `| Escrow Items | $${outputs.escrowItems.toLocaleString()} | ${((outputs.escrowItems / totalClosingCosts) * 100).toFixed(1)}% |\n\n`;
  
  analysis += `## Fee Comparison\n\n`;
  analysis += `- **Your Closing Costs:** $${totalClosingCosts.toLocaleString()} (${closingCostPercentage}%)\n`;
  analysis += `- **Average Closing Costs:** $${feeComparison.averageClosingCosts.toLocaleString()} (${feeComparison.averagePercentage}%)\n`;
  analysis += `- **Assessment:** ${feeComparison.comparison}\n`;
  analysis += `- **Cost Range:** ${feeComparison.costRange}\n\n`;
  
  analysis += `## Key Findings\n\n`;
  analysis += `- **Highest Fee:** ${outputs.costAnalysis.highestFee.name} ($${outputs.costAnalysis.highestFee.amount.toLocaleString()})\n`;
  analysis += `- **Lowest Fee:** ${outputs.costAnalysis.lowestFee.name} ($${outputs.costAnalysis.lowestFee.amount.toLocaleString()})\n`;
  analysis += `- **Negotiable Fees:** ${outputs.costAnalysis.negotiableFees.length} items\n`;
  analysis += `- **Required Fees:** ${outputs.costAnalysis.requiredFees.length} items\n\n`;
  
  analysis += `## Recommendations\n\n`;
  analysis += recommendations;
  
  analysis += `## Additional Considerations\n\n`;
  analysis += `- **Timing:** Consider closing at the end of the month to minimize prepaid interest\n`;
  analysis += `- **Shopping:** Compare multiple lenders and title companies\n`;
  analysis += `- **Negotiation:** Many fees are negotiable, especially lender fees\n`;
  analysis += `- **Credits:** Ask about lender credits or seller concessions\n`;
  analysis += `- **Documentation:** Keep all fee estimates and final settlement statements for comparison\n`;
  
  return analysis;
};