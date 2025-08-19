import { Calculator } from '../../../types/calculator';

export interface MortgageClosingCostInputs {
  loanAmount: number;
  propertyValue: number;
  downPayment?: number;
  loanType?: string;
  purchaseType?: string;
  state?: string;
  propertyType?: string;
  occupancyType?: string;
  creditScore?: number;
  interestRate?: number;
  loanTerm?: number;
  points?: number;
  originationFee?: number;
  processingFee?: number;
  underwritingFee?: number;
  applicationFee?: number;
  commitmentFee?: number;
  appraisalFee?: number;
  titleInsurance?: number;
  titleSearch?: number;
  recordingFee?: number;
  creditReport?: number;
  floodCert?: number;
  taxService?: number;
  wireFee?: number;
  surveyFee?: number;
  homeInspection?: number;
  pestInspection?: number;
  leadPaintInspection?: number;
  radonInspection?: number;
  septicInspection?: number;
  wellInspection?: number;
  attorneyFee?: number;
  notaryFee?: number;
  escrowFee?: number;
  courierFee?: number;
  otherFees?: number;
  propertyTax?: number;
  homeInsurance?: number;
  hoaFees?: number;
  pmiRate?: number;
  prepaidInterest?: number;
  prepaidInsurance?: number;
  prepaidTaxes?: number;
  escrowMonths?: number;
}

export interface CostBreakdown {
  lenderFees: {
    originationFee: number;
    processingFee: number;
    underwritingFee: number;
    applicationFee: number;
    commitmentFee: number;
    pointsCost: number;
    total: number;
  };
  thirdPartyFees: {
    appraisalFee: number;
    titleInsurance: number;
    titleSearch: number;
    recordingFee: number;
    creditReport: number;
    floodCert: number;
    taxService: number;
    wireFee: number;
    surveyFee: number;
    homeInspection: number;
    pestInspection: number;
    leadPaintInspection: number;
    radonInspection: number;
    septicInspection: number;
    wellInspection: number;
    attorneyFee: number;
    notaryFee: number;
    escrowFee: number;
    courierFee: number;
    otherFees: number;
    total: number;
  };
  prepaidItems: {
    prepaidInterest: number;
    prepaidInsurance: number;
    prepaidTaxes: number;
    total: number;
  };
  escrowItems: {
    propertyTax: number;
    homeInsurance: number;
    pmi: number;
    hoaFees: number;
    total: number;
  };
}

export interface MortgageClosingCostOutputs {
  totalClosingCosts: number;
  lenderFees: number;
  thirdPartyFees: number;
  prepaidItems: number;
  escrowItems: number;
  costBreakdown: CostBreakdown;
  costPercentage: number;
  cashToClose: number;
  monthlyEscrow: number;
  recommendations: string;
  summary: {
    totalFees: number;
    totalPrepaid: number;
    totalEscrow: number;
    grandTotal: number;
  };
}

export function calculateMortgageClosingCosts(inputs: MortgageClosingCostInputs): MortgageClosingCostOutputs {
  const {
    loanAmount,
    propertyValue,
    downPayment = 0,
    points = 0,
    originationFee = 0,
    processingFee = 0,
    underwritingFee = 0,
    applicationFee = 0,
    commitmentFee = 0,
    appraisalFee = 0,
    titleInsurance = 0,
    titleSearch = 0,
    recordingFee = 0,
    creditReport = 0,
    floodCert = 0,
    taxService = 0,
    wireFee = 0,
    surveyFee = 0,
    homeInspection = 0,
    pestInspection = 0,
    leadPaintInspection = 0,
    radonInspection = 0,
    septicInspection = 0,
    wellInspection = 0,
    attorneyFee = 0,
    notaryFee = 0,
    escrowFee = 0,
    courierFee = 0,
    otherFees = 0,
    propertyTax = 0,
    homeInsurance = 0,
    hoaFees = 0,
    pmiRate = 0,
    prepaidInterest = 0,
    prepaidInsurance = 0,
    prepaidTaxes = 0,
    escrowMonths = 2
  } = inputs;

  // Calculate points cost
  const pointsCost = (points / 100) * loanAmount;

  // Calculate PMI if applicable
  const ltvRatio = ((loanAmount - downPayment) / propertyValue) * 100;
  const pmiAmount = ltvRatio > 80 ? (pmiRate / 100) * loanAmount : 0;

  // Calculate escrow items
  const escrowPropertyTax = (propertyTax / 12) * escrowMonths;
  const escrowHomeInsurance = (homeInsurance / 12) * escrowMonths;
  const escrowPMI = (pmiAmount / 12) * escrowMonths;
  const escrowHOA = hoaFees * escrowMonths;

  // Build cost breakdown
  const costBreakdown: CostBreakdown = {
    lenderFees: {
      originationFee,
      processingFee,
      underwritingFee,
      applicationFee,
      commitmentFee,
      pointsCost,
      total: originationFee + processingFee + underwritingFee + applicationFee + commitmentFee + pointsCost
    },
    thirdPartyFees: {
      appraisalFee,
      titleInsurance,
      titleSearch,
      recordingFee,
      creditReport,
      floodCert,
      taxService,
      wireFee,
      surveyFee,
      homeInspection,
      pestInspection,
      leadPaintInspection,
      radonInspection,
      septicInspection,
      wellInspection,
      attorneyFee,
      notaryFee,
      escrowFee,
      courierFee,
      otherFees,
      total: appraisalFee + titleInsurance + titleSearch + recordingFee + creditReport + floodCert + 
             taxService + wireFee + surveyFee + homeInspection + pestInspection + leadPaintInspection + 
             radonInspection + septicInspection + wellInspection + attorneyFee + notaryFee + escrowFee + 
             courierFee + otherFees
    },
    prepaidItems: {
      prepaidInterest,
      prepaidInsurance,
      prepaidTaxes,
      total: prepaidInterest + prepaidInsurance + prepaidTaxes
    },
    escrowItems: {
      propertyTax: escrowPropertyTax,
      homeInsurance: escrowHomeInsurance,
      pmi: escrowPMI,
      hoaFees: escrowHOA,
      total: escrowPropertyTax + escrowHomeInsurance + escrowPMI + escrowHOA
    }
  };

  // Calculate totals
  const lenderFees = costBreakdown.lenderFees.total;
  const thirdPartyFees = costBreakdown.thirdPartyFees.total;
  const prepaidItems = costBreakdown.prepaidItems.total;
  const escrowItems = costBreakdown.escrowItems.total;
  const totalClosingCosts = lenderFees + thirdPartyFees + prepaidItems + escrowItems;
  const costPercentage = (totalClosingCosts / loanAmount) * 100;
  const cashToClose = downPayment + totalClosingCosts;
  const monthlyEscrow = (propertyTax + homeInsurance + pmiAmount + (hoaFees * 12)) / 12;

  // Generate recommendations
  const recommendations = generateRecommendations(inputs, costBreakdown, totalClosingCosts, costPercentage);

  return {
    totalClosingCosts: Math.round(totalClosingCosts),
    lenderFees: Math.round(lenderFees),
    thirdPartyFees: Math.round(thirdPartyFees),
    prepaidItems: Math.round(prepaidItems),
    escrowItems: Math.round(escrowItems),
    costBreakdown,
    costPercentage: Math.round(costPercentage * 100) / 100,
    cashToClose: Math.round(cashToClose),
    monthlyEscrow: Math.round(monthlyEscrow),
    recommendations,
    summary: {
      totalFees: Math.round(lenderFees + thirdPartyFees),
      totalPrepaid: Math.round(prepaidItems),
      totalEscrow: Math.round(escrowItems),
      grandTotal: Math.round(totalClosingCosts)
    }
  };
}

function generateRecommendations(
  inputs: MortgageClosingCostInputs, 
  costBreakdown: CostBreakdown, 
  totalClosingCosts: number, 
  costPercentage: number
): string {
  const recommendations: string[] = [];

  // Loan type specific recommendations
  if (inputs.loanType === 'FHA') {
    recommendations.push('FHA loans typically have higher closing costs due to upfront MIP and stricter requirements.');
  } else if (inputs.loanType === 'VA') {
    recommendations.push('VA loans have lower closing costs but may include a funding fee.');
  } else if (inputs.loanType === 'Conventional') {
    recommendations.push('Conventional loans generally have the most negotiable closing costs.');
  }

  // Cost percentage recommendations
  if (costPercentage > 5) {
    recommendations.push('Closing costs are high (>5% of loan amount). Consider negotiating with the lender or shopping for better rates.');
  } else if (costPercentage > 3) {
    recommendations.push('Closing costs are moderate (3-5% of loan amount). Some fees may be negotiable.');
  } else {
    recommendations.push('Closing costs are reasonable (<3% of loan amount).');
  }

  // Specific fee recommendations
  if (costBreakdown.lenderFees.originationFee > 1000) {
    recommendations.push('Consider negotiating the origination fee or shopping for lenders with lower fees.');
  }

  if (costBreakdown.thirdPartyFees.titleInsurance > 1500) {
    recommendations.push('Shop around for title insurance - rates can vary significantly between providers.');
  }

  if (costBreakdown.thirdPartyFees.appraisalFee > 500) {
    recommendations.push('Appraisal fees may be negotiable or covered by the lender in some cases.');
  }

  // PMI recommendations
  if (costBreakdown.escrowItems.pmi > 0) {
    recommendations.push('Consider making a larger down payment to avoid PMI costs.');
  }

  // Inspection recommendations
  const totalInspections = costBreakdown.thirdPartyFees.homeInspection + 
                          costBreakdown.thirdPartyFees.pestInspection + 
                          costBreakdown.thirdPartyFees.radonInspection;
  if (totalInspections > 800) {
    recommendations.push('Consider bundling inspection services or negotiating package rates.');
  }

  // State-specific recommendations
  if (inputs.state === 'NY' || inputs.state === 'CA' || inputs.state === 'TX') {
    recommendations.push('Some states have specific requirements that may affect closing costs. Consult with a local expert.');
  }

  return recommendations.join(' ');
}

export function calculateEstimatedClosingCosts(
  loanAmount: number, 
  loanType: string, 
  purchaseType: string,
  state?: string
): number {
  // Base estimates by loan type and purchase type
  let basePercentage = 0.03; // 3% default

  if (loanType === 'FHA') {
    basePercentage = purchaseType === 'Purchase' ? 0.035 : 0.032; // 3.5% for purchase, 3.2% for refinance
  } else if (loanType === 'VA') {
    basePercentage = purchaseType === 'Purchase' ? 0.025 : 0.022; // 2.5% for purchase, 2.2% for refinance
  } else if (loanType === 'USDA') {
    basePercentage = purchaseType === 'Purchase' ? 0.033 : 0.030; // 3.3% for purchase, 3.0% for refinance
  } else if (loanType === 'Conventional') {
    basePercentage = purchaseType === 'Purchase' ? 0.028 : 0.025; // 2.8% for purchase, 2.5% for refinance
  }

  // State adjustments
  if (state === 'NY' || state === 'CA') {
    basePercentage += 0.005; // Add 0.5% for high-cost states
  } else if (state === 'TX') {
    basePercentage += 0.003; // Add 0.3% for Texas
  }

  return Math.round(loanAmount * basePercentage);
}

export function calculateBreakdownByCategory(inputs: MortgageClosingCostInputs): {
  category: string;
  amount: number;
  percentage: number;
}[] {
  const result = calculateMortgageClosingCosts(inputs);
  const total = result.totalClosingCosts;

  return [
    {
      category: 'Lender Fees',
      amount: result.lenderFees,
      percentage: Math.round((result.lenderFees / total) * 100)
    },
    {
      category: 'Third-Party Fees',
      amount: result.thirdPartyFees,
      percentage: Math.round((result.thirdPartyFees / total) * 100)
    },
    {
      category: 'Prepaid Items',
      amount: result.prepaidItems,
      percentage: Math.round((result.prepaidItems / total) * 100)
    },
    {
      category: 'Escrow Items',
      amount: result.escrowItems,
      percentage: Math.round((result.escrowItems / total) * 100)
    }
  ];
}

export function generateClosingCostAnalysis(inputs: MortgageClosingCostInputs, outputs: MortgageClosingCostOutputs): string {
  let analysis = `# Mortgage Closing Cost Analysis\n\n`;
  
  analysis += `## Summary\n`;
  analysis += `- **Total Closing Costs**: $${outputs.totalClosingCosts.toLocaleString()}\n`;
  analysis += `- **Cost Percentage**: ${outputs.costPercentage}% of loan amount\n`;
  analysis += `- **Cash to Close**: $${outputs.cashToClose.toLocaleString()}\n`;
  analysis += `- **Monthly Escrow**: $${outputs.monthlyEscrow.toLocaleString()}\n\n`;
  
  analysis += `## Cost Breakdown\n\n`;
  analysis += `| Category | Amount | Percentage |\n`;
  analysis += `|----------|--------|------------|\n`;
  analysis += `| Lender Fees | $${outputs.lenderFees.toLocaleString()} | ${Math.round((outputs.lenderFees / outputs.totalClosingCosts) * 100)}% |\n`;
  analysis += `| Third-Party Fees | $${outputs.thirdPartyFees.toLocaleString()} | ${Math.round((outputs.thirdPartyFees / outputs.totalClosingCosts) * 100)}% |\n`;
  analysis += `| Prepaid Items | $${outputs.prepaidItems.toLocaleString()} | ${Math.round((outputs.prepaidItems / outputs.totalClosingCosts) * 100)}% |\n`;
  analysis += `| Escrow Items | $${outputs.escrowItems.toLocaleString()} | ${Math.round((outputs.escrowItems / outputs.totalClosingCosts) * 100)}% |\n\n`;
  
  analysis += `## Detailed Fee Breakdown\n\n`;
  
  // Lender fees
  analysis += `### Lender Fees: $${outputs.lenderFees.toLocaleString()}\n`;
  if (outputs.costBreakdown.lenderFees.originationFee > 0) {
    analysis += `- Origination Fee: $${outputs.costBreakdown.lenderFees.originationFee.toLocaleString()}\n`;
  }
  if (outputs.costBreakdown.lenderFees.processingFee > 0) {
    analysis += `- Processing Fee: $${outputs.costBreakdown.lenderFees.processingFee.toLocaleString()}\n`;
  }
  if (outputs.costBreakdown.lenderFees.underwritingFee > 0) {
    analysis += `- Underwriting Fee: $${outputs.costBreakdown.lenderFees.underwritingFee.toLocaleString()}\n`;
  }
  if (outputs.costBreakdown.lenderFees.pointsCost > 0) {
    analysis += `- Points Cost: $${outputs.costBreakdown.lenderFees.pointsCost.toLocaleString()}\n`;
  }
  analysis += `\n`;
  
  // Third-party fees
  analysis += `### Third-Party Fees: $${outputs.thirdPartyFees.toLocaleString()}\n`;
  if (outputs.costBreakdown.thirdPartyFees.appraisalFee > 0) {
    analysis += `- Appraisal Fee: $${outputs.costBreakdown.thirdPartyFees.appraisalFee.toLocaleString()}\n`;
  }
  if (outputs.costBreakdown.thirdPartyFees.titleInsurance > 0) {
    analysis += `- Title Insurance: $${outputs.costBreakdown.thirdPartyFees.titleInsurance.toLocaleString()}\n`;
  }
  if (outputs.costBreakdown.thirdPartyFees.attorneyFee > 0) {
    analysis += `- Attorney Fee: $${outputs.costBreakdown.thirdPartyFees.attorneyFee.toLocaleString()}\n`;
  }
  analysis += `\n`;
  
  // Prepaid items
  analysis += `### Prepaid Items: $${outputs.prepaidItems.toLocaleString()}\n`;
  if (outputs.costBreakdown.prepaidItems.prepaidInterest > 0) {
    analysis += `- Prepaid Interest: $${outputs.costBreakdown.prepaidItems.prepaidInterest.toLocaleString()}\n`;
  }
  if (outputs.costBreakdown.prepaidItems.prepaidInsurance > 0) {
    analysis += `- Prepaid Insurance: $${outputs.costBreakdown.prepaidItems.prepaidInsurance.toLocaleString()}\n`;
  }
  if (outputs.costBreakdown.prepaidItems.prepaidTaxes > 0) {
    analysis += `- Prepaid Taxes: $${outputs.costBreakdown.prepaidItems.prepaidTaxes.toLocaleString()}\n`;
  }
  analysis += `\n`;
  
  analysis += `## Recommendations\n\n`;
  analysis += outputs.recommendations;
  
  return analysis;
}