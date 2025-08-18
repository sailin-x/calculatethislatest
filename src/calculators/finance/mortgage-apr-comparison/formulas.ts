import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export interface MortgageOffer {
  lender: string;
  interestRate: number;
  points: number;
  originationFee: number;
  processingFee: number;
  underwritingFee: number;
  appraisalFee: number;
  titleInsurance: number;
  recordingFee: number;
  creditReport: number;
  floodCert: number;
  taxService: number;
  wireFee: number;
  otherFees: number;
}

export interface MortgageAPRComparisonInputs extends CalculatorInputs {
  loanAmount: number;
  loanTerm: number;
  offers: MortgageOffer[];
  propertyValue?: number;
  downPayment?: number;
  propertyTax?: number;
  homeInsurance?: number;
  pmiRate?: number;
  hoaFees?: number;
  loanType?: string;
  occupancyType?: string;
  creditScore?: number;
  debtToIncomeRatio?: number;
  state?: string;
  propertyType?: string;
  purchaseType?: string;
  lenderFees?: number;
  thirdPartyFees?: number;
  prepaidItems?: number;
  comparisonPeriod?: number;
}

export interface APRComparisonOffer {
  lender: string;
  apr: number;
  monthlyPayment: number;
  totalCost: number;
  totalInterest: number;
  totalFees: number;
  effectiveRate: number;
  costBreakdown: {
    principal: number;
    interest: number;
    fees: number;
    taxes: number;
    insurance: number;
    pmi: number;
    hoa: number;
  };
}

export interface BestOffer {
  lender: string;
  apr: number;
  monthlyPayment: number;
  totalCost: number;
  savings: number;
  monthlySavings: number;
  annualSavings: number;
  totalSavings: number;
}

export interface MonthlyPaymentComparison {
  difference: number;
  percentageSavings: number;
  bestMonthlyPayment: number;
  worstMonthlyPayment: number;
}

export interface TotalCostComparison {
  difference: number;
  percentageSavings: number;
  bestTotalCost: number;
  worstTotalCost: number;
}

export interface BreakEvenAnalysis {
  breakEvenMonths: number;
  recommendation: string;
  closingCosts: number;
  monthlySavings: number;
}

export interface SavingsAnalysis {
  monthlySavings: number;
  annualSavings: number;
  totalSavings: number;
  percentageSavings: number;
}

export interface KeyMetrics {
  bestAPR: number;
  monthlySavings: number;
  totalSavings: number;
  breakEvenMonths: number;
  bestLender: string;
  worstLender: string;
  aprRange: number;
}

export interface MortgageAPRComparisonOutputs extends CalculatorOutputs {
  aprComparison: {
    offers: APRComparisonOffer[];
  };
  bestOffer: BestOffer;
  monthlyPaymentComparison: MonthlyPaymentComparison;
  totalCostComparison: TotalCostComparison;
  breakEvenAnalysis: BreakEvenAnalysis;
  savingsAnalysis: SavingsAnalysis;
  recommendations: string;
  keyMetrics: KeyMetrics;
  aprAnalysis: string;
}

export function calculateMortgageAPRComparison(inputs: MortgageAPRComparisonInputs): MortgageAPRComparisonOutputs {
  const { 
    loanAmount, 
    loanTerm, 
    offers, 
    propertyValue = loanAmount, 
    downPayment = 0, 
    propertyTax = 0, 
    homeInsurance = 0, 
    pmiRate = 0, 
    hoaFees = 0,
    comparisonPeriod = loanTerm 
  } = inputs;

  // Calculate APR for each offer
  const aprOffers: APRComparisonOffer[] = offers.map(offer => {
    const monthlyRate = offer.interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    
    // Calculate monthly payment using amortization formula
    const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyRate, totalPayments);
    
    // Calculate total fees
    const totalFees = calculateTotalFees(offer, loanAmount);
    
    // Calculate total payments over comparison period
    const comparisonPayments = Math.min(comparisonPeriod * 12, totalPayments);
    const totalPaymentsOverPeriod = monthlyPayment * comparisonPayments;
    
    // Calculate APR using the comparison period
    const apr = calculateAPR(loanAmount, totalPaymentsOverPeriod, totalFees, comparisonPeriod);
    
    // Calculate cost breakdown
    const costBreakdown = calculateCostBreakdown(
      loanAmount, 
      monthlyPayment, 
      totalPaymentsOverPeriod, 
      totalFees, 
      propertyTax, 
      homeInsurance, 
      pmiRate, 
      hoaFees, 
      comparisonPeriod
    );
    
    return {
      lender: offer.lender,
      apr: Math.round(apr * 100) / 100,
      monthlyPayment: Math.round(monthlyPayment),
      totalCost: Math.round(totalPaymentsOverPeriod + totalFees),
      totalInterest: Math.round(totalPaymentsOverPeriod - (loanAmount * comparisonPayments / totalPayments)),
      totalFees: Math.round(totalFees),
      effectiveRate: Math.round(offer.interestRate * 100) / 100,
      costBreakdown
    };
  });

  // Find best and worst offers
  const sortedOffers = [...aprOffers].sort((a, b) => a.apr - b.apr);
  const bestOffer = sortedOffers[0];
  const worstOffer = sortedOffers[sortedOffers.length - 1];

  // Calculate comparisons
  const monthlyPaymentComparison = calculateMonthlyPaymentComparison(aprOffers);
  const totalCostComparison = calculateTotalCostComparison(aprOffers);
  const breakEvenAnalysis = calculateBreakEvenAnalysis(aprOffers, inputs);
  const savingsAnalysis = calculateSavingsAnalysis(bestOffer, worstOffer);
  const keyMetrics = calculateKeyMetrics(aprOffers, bestOffer, worstOffer);
  const recommendations = generateRecommendations(aprOffers, inputs);
  const aprAnalysis = generateAPRAnalysis(aprOffers, bestOffer, worstOffer, inputs);

  return {
    aprComparison: { offers: aprOffers },
    bestOffer: {
      lender: bestOffer.lender,
      apr: bestOffer.apr,
      monthlyPayment: bestOffer.monthlyPayment,
      totalCost: bestOffer.totalCost,
      savings: Math.round(worstOffer.totalCost - bestOffer.totalCost),
      monthlySavings: Math.round(worstOffer.monthlyPayment - bestOffer.monthlyPayment),
      annualSavings: Math.round((worstOffer.monthlyPayment - bestOffer.monthlyPayment) * 12),
      totalSavings: Math.round(worstOffer.totalCost - bestOffer.totalCost)
    },
    monthlyPaymentComparison,
    totalCostComparison,
    breakEvenAnalysis,
    savingsAnalysis,
    recommendations,
    keyMetrics,
    aprAnalysis
  };
}

function calculateMonthlyPayment(principal: number, monthlyRate: number, totalPayments: number): number {
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

function calculateTotalFees(offer: MortgageOffer, loanAmount: number): number {
  const pointsCost = (offer.points / 100) * loanAmount;
  return pointsCost + offer.originationFee + offer.processingFee + offer.underwritingFee + 
         offer.appraisalFee + offer.titleInsurance + offer.recordingFee + offer.creditReport + 
         offer.floodCert + offer.taxService + offer.wireFee + offer.otherFees;
}

function calculateAPR(principal: number, totalPayments: number, totalFees: number, years: number): number {
  const totalFinanceCharge = totalPayments - principal + totalFees;
  return (totalFinanceCharge / principal / years) * 100;
}

function calculateCostBreakdown(
  principal: number, 
  monthlyPayment: number, 
  totalPayments: number, 
  totalFees: number, 
  propertyTax: number, 
  homeInsurance: number, 
  pmiRate: number, 
  hoaFees: number, 
  years: number
) {
  const totalInterest = totalPayments - (principal * totalPayments / (years * 12 * monthlyPayment));
  const totalTaxes = propertyTax * years;
  const totalInsurance = homeInsurance * years;
  const totalPMI = (pmiRate / 100) * principal * years;
  const totalHOA = hoaFees * 12 * years;

  return {
    principal: Math.round(principal),
    interest: Math.round(totalInterest),
    fees: Math.round(totalFees),
    taxes: Math.round(totalTaxes),
    insurance: Math.round(totalInsurance),
    pmi: Math.round(totalPMI),
    hoa: Math.round(totalHOA)
  };
}

function calculateMonthlyPaymentComparison(offers: APRComparisonOffer[]): MonthlyPaymentComparison {
  const sortedByPayment = [...offers].sort((a, b) => a.monthlyPayment - b.monthlyPayment);
  const bestMonthlyPayment = sortedByPayment[0].monthlyPayment;
  const worstMonthlyPayment = sortedByPayment[sortedByPayment.length - 1].monthlyPayment;
  const difference = worstMonthlyPayment - bestMonthlyPayment;
  const percentageSavings = (difference / worstMonthlyPayment) * 100;

  return {
    difference: Math.round(difference),
    percentageSavings: Math.round(percentageSavings * 100) / 100,
    bestMonthlyPayment,
    worstMonthlyPayment
  };
}

function calculateTotalCostComparison(offers: APRComparisonOffer[]): TotalCostComparison {
  const sortedByCost = [...offers].sort((a, b) => a.totalCost - b.totalCost);
  const bestTotalCost = sortedByCost[0].totalCost;
  const worstTotalCost = sortedByCost[sortedByCost.length - 1].totalCost;
  const difference = worstTotalCost - bestTotalCost;
  const percentageSavings = (difference / worstTotalCost) * 100;

  return {
    difference: Math.round(difference),
    percentageSavings: Math.round(percentageSavings * 100) / 100,
    bestTotalCost,
    worstTotalCost
  };
}

function calculateBreakEvenAnalysis(offers: APRComparisonOffer[], inputs: MortgageAPRComparisonInputs): BreakEvenAnalysis {
  const sortedOffers = [...offers].sort((a, b) => a.totalCost - b.totalCost);
  const bestOffer = sortedOffers[0];
  const secondBestOffer = sortedOffers[1];
  
  if (!secondBestOffer) {
    return {
      breakEvenMonths: 0,
      recommendation: 'Only one offer available',
      closingCosts: 0,
      monthlySavings: 0
    };
  }

  const closingCosts = secondBestOffer.totalFees - bestOffer.totalFees;
  const monthlySavings = secondBestOffer.monthlyPayment - bestOffer.monthlyPayment;
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0;

  let recommendation = '';
  if (breakEvenMonths === 0) {
    recommendation = `${bestOffer.lender} offers better terms immediately`;
  } else if (breakEvenMonths <= 12) {
    recommendation = `${bestOffer.lender} breaks even in ${breakEvenMonths} months`;
  } else {
    recommendation = `Consider if the long-term savings justify the higher closing costs`;
  }

  return {
    breakEvenMonths,
    recommendation,
    closingCosts: Math.round(closingCosts),
    monthlySavings: Math.round(monthlySavings)
  };
}

function calculateSavingsAnalysis(bestOffer: APRComparisonOffer, worstOffer: APRComparisonOffer): SavingsAnalysis {
  const monthlySavings = worstOffer.monthlyPayment - bestOffer.monthlyPayment;
  const annualSavings = monthlySavings * 12;
  const totalSavings = worstOffer.totalCost - bestOffer.totalCost;
  const percentageSavings = (totalSavings / worstOffer.totalCost) * 100;

  return {
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    totalSavings: Math.round(totalSavings),
    percentageSavings: Math.round(percentageSavings * 100) / 100
  };
}

function calculateKeyMetrics(offers: APRComparisonOffer[], bestOffer: APRComparisonOffer, worstOffer: APRComparisonOffer): KeyMetrics {
  const aprRange = worstOffer.apr - bestOffer.apr;
  const monthlySavings = worstOffer.monthlyPayment - bestOffer.monthlyPayment;
  const totalSavings = worstOffer.totalCost - bestOffer.totalCost;
  const breakEvenMonths = calculateBreakEvenAnalysis(offers, {} as MortgageAPRComparisonInputs).breakEvenMonths;

  return {
    bestAPR: bestOffer.apr,
    monthlySavings: Math.round(monthlySavings),
    totalSavings: Math.round(totalSavings),
    breakEvenMonths,
    bestLender: bestOffer.lender,
    worstLender: worstOffer.lender,
    aprRange: Math.round(aprRange * 100) / 100
  };
}

function generateRecommendations(offers: APRComparisonOffer[], inputs: MortgageAPRComparisonInputs): string {
  const sortedOffers = [...offers].sort((a, b) => a.apr - b.apr);
  const bestOffer = sortedOffers[0];
  const secondBestOffer = sortedOffers[1];
  
  if (!secondBestOffer) {
    return 'Only one offer available for comparison.';
  }

  const aprDifference = secondBestOffer.apr - bestOffer.apr;
  const monthlyDifference = secondBestOffer.monthlyPayment - bestOffer.monthlyPayment;
  const totalDifference = secondBestOffer.totalCost - bestOffer.totalCost;

  let recommendation = `${bestOffer.lender} offers the best overall value with a ${bestOffer.apr}% APR. `;
  
  if (aprDifference > 0.5) {
    recommendation += `The APR difference of ${aprDifference.toFixed(2)}% is significant. `;
  }
  
  if (monthlyDifference > 100) {
    recommendation += `Monthly savings of $${monthlyDifference} provide substantial cash flow benefits. `;
  }
  
  if (totalDifference > 10000) {
    recommendation += `Total savings of $${totalDifference.toLocaleString()} over the loan term make this an excellent choice. `;
  }

  // Add specific recommendations based on loan type and purchase type
  if (inputs.purchaseType === 'Refinance') {
    recommendation += 'For refinancing, consider your break-even timeline and long-term plans. ';
  }
  
  if (inputs.loanType === 'ARM') {
    recommendation += 'ARM loans offer lower initial rates but consider the risk of rate increases. ';
  }

  return recommendation;
}

function generateAPRAnalysis(offers: APRComparisonOffer[], bestOffer: APRComparisonOffer, worstOffer: APRComparisonOffer, inputs: MortgageAPRComparisonInputs): string {
  const aprRange = worstOffer.apr - bestOffer.apr;
  const monthlySavings = worstOffer.monthlyPayment - bestOffer.monthlyPayment;
  const totalSavings = worstOffer.totalCost - bestOffer.totalCost;
  const percentageSavings = (totalSavings / worstOffer.totalCost) * 100;

  let analysis = `${bestOffer.lender} offers the most favorable terms with a ${bestOffer.apr}% APR compared to ${worstOffer.lender}'s ${worstOffer.apr}% APR. `;
  
  analysis += `This results in $${monthlySavings} monthly savings and $${totalSavings.toLocaleString()} total savings over the ${inputs.comparisonPeriod || inputs.loanTerm}-year term. `;
  
  if (percentageSavings > 5) {
    analysis += `The ${percentageSavings.toFixed(1)}% total cost savings represent significant value. `;
  }
  
  if (aprRange > 1) {
    analysis += `The ${aprRange.toFixed(2)}% APR difference highlights the importance of shopping multiple lenders. `;
  }

  // Add context based on loan characteristics
  if (inputs.purchaseType === 'Refinance') {
    analysis += 'For refinancing scenarios, the lower APR and monthly payments can provide immediate financial relief. ';
  }
  
  if (inputs.loanType === 'Conventional' && inputs.creditScore && inputs.creditScore > 740) {
    analysis += 'With excellent credit, you qualify for the best available rates. ';
  }

  analysis += `Consider factors beyond APR such as lender reputation, customer service, and loan terms when making your final decision.`;

  return analysis;
}

export function generateMortgageAPRComparisonAnalysis(inputs: MortgageAPRComparisonInputs, outputs: MortgageAPRComparisonOutputs): string {
  const { aprComparison, bestOffer, savingsAnalysis, breakEvenAnalysis, recommendations } = outputs;
  
  let analysis = `# Mortgage APR Comparison Analysis\n\n`;
  
  analysis += `## Summary\n`;
  analysis += `- **Best Offer**: ${bestOffer.lender} (${bestOffer.apr}% APR)\n`;
  analysis += `- **Monthly Savings**: $${savingsAnalysis.monthlySavings}\n`;
  analysis += `- **Total Savings**: $${savingsAnalysis.totalSavings.toLocaleString()}\n`;
  analysis += `- **Break-Even**: ${breakEvenAnalysis.breakEvenMonths} months\n\n`;
  
  analysis += `## Detailed Comparison\n\n`;
  analysis += `| Lender | APR | Monthly Payment | Total Cost |\n`;
  analysis += `|--------|-----|-----------------|------------|\n`;
  
  aprComparison.offers.forEach(offer => {
    analysis += `| ${offer.lender} | ${offer.apr}% | $${offer.monthlyPayment.toLocaleString()} | $${offer.totalCost.toLocaleString()} |\n`;
  });
  
  analysis += `\n## Key Insights\n\n`;
  analysis += `1. **APR Range**: ${(Math.max(...aprComparison.offers.map(o => o.apr)) - Math.min(...aprComparison.offers.map(o => o.apr))).toFixed(2)}%\n`;
  analysis += `2. **Monthly Payment Range**: $${(Math.max(...aprComparison.offers.map(o => o.monthlyPayment)) - Math.min(...aprComparison.offers.map(o => o.monthlyPayment))).toLocaleString()}\n`;
  analysis += `3. **Total Cost Range**: $${(Math.max(...aprComparison.offers.map(o => o.totalCost)) - Math.min(...aprComparison.offers.map(o => o.totalCost))).toLocaleString()}\n\n`;
  
  analysis += `## Recommendations\n\n`;
  analysis += recommendations;
  
  analysis += `\n\n## Cost Breakdown for Best Offer\n\n`;
  const bestOfferDetails = aprComparison.offers.find(o => o.lender === bestOffer.lender);
  if (bestOfferDetails) {
    analysis += `- **Principal**: $${bestOfferDetails.costBreakdown.principal.toLocaleString()}\n`;
    analysis += `- **Interest**: $${bestOfferDetails.costBreakdown.interest.toLocaleString()}\n`;
    analysis += `- **Fees**: $${bestOfferDetails.costBreakdown.fees.toLocaleString()}\n`;
    analysis += `- **Taxes**: $${bestOfferDetails.costBreakdown.taxes.toLocaleString()}\n`;
    analysis += `- **Insurance**: $${bestOfferDetails.costBreakdown.insurance.toLocaleString()}\n`;
    analysis += `- **PMI**: $${bestOfferDetails.costBreakdown.pmi.toLocaleString()}\n`;
    analysis += `- **HOA**: $${bestOfferDetails.costBreakdown.hoa.toLocaleString()}\n`;
  }
  
  return analysis;
}