import { CalculationResult } from '../../../types/calculator';

export interface MortgageClosingCostInputs {
  loanAmount: number;
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  originationFee: number;
  discountPoints: number;
  appraisalFee: number;
  creditReportFee: number;
  floodCertificationFee: number;
  taxServiceFee: number;
  processingFee: number;
  underwritingFee: number;
  documentPreparationFee: number;
  titleInsurance: number;
  titleSearchFee: number;
  titleEndorsements: number;
  escrowFee: number;
  attorneyFee: number;
  surveyFee: number;
  pestInspectionFee: number;
  homeInspectionFee: number;
  recordingFee: number;
  transferTax: number;
  propertyTaxRate: number;
  propertyTaxMonths: number;
  homeownersInsuranceAnnual: number;
  insuranceMonths: number;
  mortgageInsuranceType: string;
  mortgageInsuranceRate: number;
  lenderCredits: number;
  sellerCredits: number;
  closingDate: string;
  firstPaymentDate: string;
}

export interface MortgageClosingCostOutputs {
  totalClosingCosts: number;
  lenderFees: number;
  thirdPartyFees: number;
  prepaidItems: number;
  escrowAccount: number;
  cashToClose: number;
  monthlyPayment: number;
  principalInterest: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  closingCostPercentage: number;
  closingCostPercentageHome: number;
  breakdownAnalysis: string;
  savingsOpportunities: string;
  comparisonAnalysis: string;
  timelineAnalysis: string;
  escrowAnalysis: string;
  recommendations: string;
  feeBreakdown: string;
  prepaidBreakdown: string;
  lenderComparison: string;
  negotiationTips: string;
  costProjection: string;
}

export function calculateMortgageClosingCost(inputs: MortgageClosingCostInputs): CalculationResult {
  // Calculate lender fees
  const lenderFees = inputs.originationFee + 
    (inputs.discountPoints * inputs.loanAmount / 100) +
    inputs.processingFee +
    inputs.underwritingFee +
    inputs.documentPreparationFee +
    inputs.creditReportFee +
    inputs.floodCertificationFee +
    inputs.taxServiceFee;

  // Calculate third-party fees
  const thirdPartyFees = inputs.appraisalFee +
    inputs.titleInsurance +
    inputs.titleSearchFee +
    inputs.titleEndorsements +
    inputs.escrowFee +
    inputs.attorneyFee +
    inputs.surveyFee +
    inputs.pestInspectionFee +
    inputs.homeInspectionFee +
    inputs.recordingFee +
    inputs.transferTax;

  // Calculate prepaid items
  const annualPropertyTax = inputs.homePrice * (inputs.propertyTaxRate / 100);
  const prepaidPropertyTax = annualPropertyTax * (inputs.propertyTaxMonths / 12);
  const prepaidInsurance = inputs.homeownersInsuranceAnnual * (inputs.insuranceMonths / 12);
  
  // Calculate prepaid interest
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numberOfPayments = inputs.loanTerm * 12;
  const monthlyPayment = inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  // Calculate days of prepaid interest
  const closingDate = new Date(inputs.closingDate);
  const firstPaymentDate = new Date(inputs.firstPaymentDate);
  const daysOfPrepaidInterest = Math.ceil((firstPaymentDate.getTime() - closingDate.getTime()) / (1000 * 60 * 60 * 24));
  const prepaidInterest = (inputs.loanAmount * (inputs.interestRate / 100) * daysOfPrepaidInterest) / 365;

  const prepaidItems = prepaidPropertyTax + prepaidInsurance + prepaidInterest;

  // Calculate escrow account
  const escrowAccount = prepaidPropertyTax + prepaidInsurance;

  // Calculate mortgage insurance
  let monthlyPMI = 0;
  if (inputs.mortgageInsuranceType !== 'none') {
    const ltv = (inputs.loanAmount / inputs.homePrice) * 100;
    let pmiRate = inputs.mortgageInsuranceRate / 100;
    
    // Adjust PMI rate based on LTV
    if (ltv > 95) pmiRate *= 1.2;
    else if (ltv > 90) pmiRate *= 1.1;
    else if (ltv > 85) pmiRate *= 1.0;
    else if (ltv > 80) pmiRate *= 0.9;
    
    monthlyPMI = (inputs.loanAmount * pmiRate) / 12;
  }

  // Calculate monthly payments
  const principalInterest = monthlyPayment;
  const monthlyTaxes = annualPropertyTax / 12;
  const monthlyInsurance = inputs.homeownersInsuranceAnnual / 12;
  const totalMonthlyPayment = principalInterest + monthlyTaxes + monthlyInsurance + monthlyPMI;

  // Calculate total closing costs
  const totalClosingCosts = lenderFees + thirdPartyFees + prepaidItems - inputs.lenderCredits - inputs.sellerCredits;

  // Calculate cash to close
  const cashToClose = inputs.downPayment + totalClosingCosts;

  // Calculate percentages
  const closingCostPercentage = (totalClosingCosts / inputs.loanAmount) * 100;
  const closingCostPercentageHome = (totalClosingCosts / inputs.homePrice) * 100;

  // Generate analysis reports
  const breakdownAnalysis = generateBreakdownAnalysis(inputs, lenderFees, thirdPartyFees, prepaidItems);
  const savingsOpportunities = generateSavingsOpportunities(inputs, totalClosingCosts);
  const comparisonAnalysis = generateComparisonAnalysis(totalClosingCosts, inputs.loanAmount, inputs.homePrice);
  const timelineAnalysis = generateTimelineAnalysis(inputs, prepaidInterest, prepaidPropertyTax, prepaidInsurance);
  const escrowAnalysis = generateEscrowAnalysis(inputs, escrowAccount, monthlyTaxes, monthlyInsurance, totalMonthlyPayment);
  const recommendations = generateRecommendations(inputs, totalClosingCosts, closingCostPercentage);
  const feeBreakdown = generateFeeBreakdown(inputs, lenderFees, thirdPartyFees, prepaidItems);
  const prepaidBreakdown = generatePrepaidBreakdown(inputs, prepaidPropertyTax, prepaidInsurance, prepaidInterest);
  const lenderComparison = generateLenderComparison(inputs, lenderFees, totalClosingCosts);
  const negotiationTips = generateNegotiationTips(inputs, totalClosingCosts);
  const costProjection = generateCostProjection(inputs, totalClosingCosts, totalMonthlyPayment);

  return {
    outputs: {
      totalClosingCosts,
      lenderFees,
      thirdPartyFees,
      prepaidItems,
      escrowAccount,
      cashToClose,
      monthlyPayment: totalMonthlyPayment,
      principalInterest,
      monthlyTaxes,
      monthlyInsurance,
      monthlyPMI,
      closingCostPercentage,
      closingCostPercentageHome,
      breakdownAnalysis,
      savingsOpportunities,
      comparisonAnalysis,
      timelineAnalysis,
      escrowAnalysis,
      recommendations,
      feeBreakdown,
      prepaidBreakdown,
      lenderComparison,
      negotiationTips,
      costProjection
    }
  };
}

function generateBreakdownAnalysis(inputs: MortgageClosingCostInputs, lenderFees: number, thirdPartyFees: number, prepaidItems: number): string {
  const total = lenderFees + thirdPartyFees + prepaidItems;
  
  return `## Closing Cost Breakdown Analysis

**Total Closing Costs: $${total.toLocaleString()}

### Cost Categories:
- **Lender Fees (${((lenderFees/total)*100).toFixed(1)}%):** $${lenderFees.toLocaleString()}
- **Third-Party Fees (${((thirdPartyFees/total)*100).toFixed(1)}%):** $${thirdPartyFees.toLocaleString()}
- **Prepaid Items (${((prepaidItems/total)*100).toFixed(1)}%):** $${prepaidItems.toLocaleString()}

### Key Insights:
${lenderFees > thirdPartyFees ? '• Lender fees are the highest cost category' : '• Third-party fees are the highest cost category'}
${prepaidItems > total * 0.3 ? '• Prepaid items represent a significant portion of closing costs' : '• Prepaid items are within normal range'}
${inputs.lenderCredits > 0 ? `• Lender credits reduce costs by $${inputs.lenderCredits.toLocaleString()}` : ''}
${inputs.sellerCredits > 0 ? `• Seller credits reduce costs by $${inputs.sellerCredits.toLocaleString()}` : ''}`;
}

function generateSavingsOpportunities(inputs: MortgageClosingCostInputs, totalClosingCosts: number): string {
  const opportunities = [];
  
  if (inputs.originationFee > inputs.loanAmount * 0.01) {
    opportunities.push('• Negotiate lower origination fee (currently high at ' + ((inputs.originationFee/inputs.loanAmount)*100).toFixed(2) + '% of loan)');
  }
  
  if (inputs.titleInsurance > inputs.loanAmount * 0.005) {
    opportunities.push('• Shop for title insurance (currently ' + ((inputs.titleInsurance/inputs.loanAmount)*100).toFixed(2) + '% of loan)');
  }
  
  if (inputs.escrowFee > 1000) {
    opportunities.push('• Compare escrow/settlement fees with other providers');
  }
  
  if (inputs.processingFee + inputs.underwritingFee > 800) {
    opportunities.push('• Ask lender to waive or reduce processing/underwriting fees');
  }
  
  if (inputs.discountPoints > 0) {
    opportunities.push('• Consider if discount points are worth the cost vs. higher rate');
  }
  
  if (opportunities.length === 0) {
    opportunities.push('• Your closing costs appear to be well-negotiated');
  }
  
  return `## Savings Opportunities

${opportunities.join('\n')}

**Potential Savings:** $${(totalClosingCosts * 0.1).toLocaleString()} - $${(totalClosingCosts * 0.2).toLocaleString()} (10-20% reduction possible)`;
}

function generateComparisonAnalysis(totalClosingCosts: number, loanAmount: number, homePrice: number): string {
  const loanPercentage = (totalClosingCosts / loanAmount) * 100;
  const homePercentage = (totalClosingCosts / homePrice) * 100;
  
  let marketComparison = '';
  if (loanPercentage < 2) {
    marketComparison = 'Excellent - Below market average';
  } else if (loanPercentage < 3) {
    marketComparison = 'Good - At or below market average';
  } else if (loanPercentage < 4) {
    marketComparison = 'Average - Within normal market range';
  } else {
    marketComparison = 'High - Above market average, consider negotiating';
  }
  
  return `## Market Comparison Analysis

**Your Closing Costs: $${totalClosingCosts.toLocaleString()}**
- **% of Loan Amount:** ${loanPercentage.toFixed(2)}%
- **% of Home Price:** ${homePercentage.toFixed(2)}%

**Market Comparison:** ${marketComparison}

**Typical Ranges:**
- **Low:** 2-3% of loan amount
- **Average:** 3-4% of loan amount  
- **High:** 4-6% of loan amount

**Your Position:** ${loanPercentage < 3 ? 'Below average - Good deal!' : loanPercentage < 4 ? 'Average - Standard costs' : 'Above average - Consider negotiating'}`;
}

function generateTimelineAnalysis(inputs: MortgageClosingCostInputs, prepaidInterest: number, prepaidPropertyTax: number, prepaidInsurance: number): string {
  const closingDate = new Date(inputs.closingDate);
  const firstPaymentDate = new Date(inputs.firstPaymentDate);
  const daysUntilFirstPayment = Math.ceil((firstPaymentDate.getTime() - closingDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return `## Timeline Analysis

**Closing Date:** ${closingDate.toLocaleDateString()}
**First Payment Date:** ${firstPaymentDate.toLocaleDateString()}
**Days Until First Payment:** ${daysUntilFirstPayment}

### Prepaid Items Breakdown:
- **Prepaid Interest:** $${prepaidInterest.toLocaleString()} (${daysUntilFirstPayment} days)
- **Prepaid Property Tax:** $${prepaidPropertyTax.toLocaleString()} (${inputs.propertyTaxMonths} months)
- **Prepaid Insurance:** $${prepaidInsurance.toLocaleString()} (${inputs.insuranceMonths} months)

### Timeline Impact:
${daysUntilFirstPayment > 15 ? '• Longer period until first payment increases prepaid interest' : '• Standard prepaid interest period'}
${inputs.propertyTaxMonths > 6 ? '• Extended property tax prepayment period' : '• Standard property tax prepayment'}
${inputs.insuranceMonths === 12 ? '• Full year of insurance prepaid' : '• Partial year of insurance prepaid'}`;
}

function generateEscrowAnalysis(inputs: MortgageClosingCostInputs, escrowAccount: number, monthlyTaxes: number, monthlyInsurance: number, totalMonthlyPayment: number): string {
  const monthlyEscrowPayment = monthlyTaxes + monthlyInsurance;
  const escrowBuffer = escrowAccount - (monthlyEscrowPayment * 2); // 2-month buffer

  return `## Escrow Account Analysis

**Initial Escrow Balance:** $${escrowAccount.toLocaleString()}
**Monthly Escrow Payment:** $${monthlyEscrowPayment.toLocaleString()}
**Escrow Buffer:** $${escrowBuffer.toLocaleString()}

### Escrow Components:
- **Property Taxes:** $${monthlyTaxes.toLocaleString()}/month
- **Homeowners Insurance:** $${monthlyInsurance.toLocaleString()}/month

### Buffer Analysis:
${escrowBuffer > 0 ? '• Adequate buffer to cover potential increases' : '• Minimal buffer - monitor for increases'}
${monthlyEscrowPayment > totalMonthlyPayment * 0.3 ? '• Escrow payments represent significant portion of monthly payment' : '• Escrow payments are reasonable portion of monthly payment'}

**Note:** Escrow account ensures taxes and insurance are paid on time, protecting your investment.`;
}

function generateRecommendations(inputs: MortgageClosingCostInputs, totalClosingCosts: number, closingCostPercentage: number): string {
  const recommendations = [];
  
  if (closingCostPercentage > 4) {
    recommendations.push('• **High Priority:** Negotiate with lender to reduce origination and processing fees');
    recommendations.push('• **High Priority:** Shop around for title insurance and escrow services');
  }
  
  if (inputs.originationFee > inputs.loanAmount * 0.01) {
    recommendations.push('• **Medium Priority:** Request lender credit or rate reduction in exchange for higher rate');
  }
  
  if (inputs.discountPoints > 0) {
    recommendations.push('• **Consider:** Evaluate if discount points provide sufficient rate reduction benefit');
  }
  
  if (inputs.lenderCredits === 0 && inputs.sellerCredits === 0) {
    recommendations.push('• **Explore:** Ask about lender credits or seller concessions');
  }
  
  recommendations.push('• **Always:** Get multiple loan estimates and compare line by line');
  recommendations.push('• **Always:** Review the Closing Disclosure carefully before signing');
  
  return `## Recommendations

${recommendations.join('\n')}

**Next Steps:**
1. Request updated Loan Estimate from lender
2. Compare with other lenders
3. Negotiate fees where possible
4. Consider timing of closing to minimize prepaid interest`;
}

function generateFeeBreakdown(inputs: MortgageClosingCostInputs, lenderFees: number, thirdPartyFees: number, prepaidItems: number): string {
  return `## Detailed Fee Breakdown

### Lender Fees ($${lenderFees.toLocaleString()}):
- Origination Fee: $${inputs.originationFee.toLocaleString()}
- Discount Points: $${(inputs.discountPoints * inputs.loanAmount / 100).toLocaleString()}
- Processing Fee: $${inputs.processingFee.toLocaleString()}
- Underwriting Fee: $${inputs.underwritingFee.toLocaleString()}
- Document Preparation: $${inputs.documentPreparationFee.toLocaleString()}
- Credit Report: $${inputs.creditReportFee.toLocaleString()}
- Flood Certification: $${inputs.floodCertificationFee.toLocaleString()}
- Tax Service: $${inputs.taxServiceFee.toLocaleString()}

### Third-Party Fees ($${thirdPartyFees.toLocaleString()}):
- Appraisal: $${inputs.appraisalFee.toLocaleString()}
- Title Insurance: $${inputs.titleInsurance.toLocaleString()}
- Title Search: $${inputs.titleSearchFee.toLocaleString()}
- Title Endorsements: $${inputs.titleEndorsements.toLocaleString()}
- Escrow/Settlement: $${inputs.escrowFee.toLocaleString()}
- Attorney: $${inputs.attorneyFee.toLocaleString()}
- Survey: $${inputs.surveyFee.toLocaleString()}
- Pest Inspection: $${inputs.pestInspectionFee.toLocaleString()}
- Home Inspection: $${inputs.homeInspectionFee.toLocaleString()}
- Recording: $${inputs.recordingFee.toLocaleString()}
- Transfer Tax: $${inputs.transferTax.toLocaleString()}

### Credits:
- Lender Credits: -$${inputs.lenderCredits.toLocaleString()}
- Seller Credits: -$${inputs.sellerCredits.toLocaleString()}`;
}

function generatePrepaidBreakdown(inputs: MortgageClosingCostInputs, prepaidPropertyTax: number, prepaidInsurance: number, prepaidInterest: number): string {
  const totalPrepaid = prepaidPropertyTax + prepaidInsurance + prepaidInterest;
  
  return `## Prepaid Items Breakdown

**Total Prepaid Items: $${totalPrepaid.toLocaleString()}**

### Property Taxes ($${prepaidPropertyTax.toLocaleString()}):
- Annual Property Tax: $${(inputs.homePrice * inputs.propertyTaxRate / 100).toLocaleString()}
- Months Prepaid: ${inputs.propertyTaxMonths}
- Monthly Tax Payment: $${(inputs.homePrice * inputs.propertyTaxRate / 100 / 12).toLocaleString()}

### Homeowners Insurance ($${prepaidInsurance.toLocaleString()}):
- Annual Premium: $${inputs.homeownersInsuranceAnnual.toLocaleString()}
- Months Prepaid: ${inputs.insuranceMonths}
- Monthly Insurance Payment: $${(inputs.homeownersInsuranceAnnual / 12).toLocaleString()}

### Prepaid Interest ($${prepaidInterest.toLocaleString()}):
- Daily Interest Rate: ${(inputs.interestRate / 100 / 365).toFixed(6)}%
- Days Until First Payment: ${Math.ceil((new Date(inputs.firstPaymentDate).getTime() - new Date(inputs.closingDate).getTime()) / (1000 * 60 * 60 * 24))}
- Loan Amount: $${inputs.loanAmount.toLocaleString()}

### Prepaid Analysis:
${prepaidPropertyTax > totalPrepaid * 0.5 ? '• Property taxes are the largest prepaid expense' : ''}
${prepaidInsurance > totalPrepaid * 0.3 ? '• Insurance represents significant prepaid amount' : ''}
${prepaidInterest > totalPrepaid * 0.2 ? '• Prepaid interest is substantial due to timing' : ''}`;
}

function generateLenderComparison(inputs: MortgageClosingCostInputs, lenderFees: number, totalClosingCosts: number): string {
  const lenderFeePercentage = (lenderFees / totalClosingCosts) * 100;
  
  let comparison = '';
  if (lenderFeePercentage < 30) {
    comparison = 'Excellent - Very low lender fees';
  } else if (lenderFeePercentage < 40) {
    comparison = 'Good - Below average lender fees';
  } else if (lenderFeePercentage < 50) {
    comparison = 'Average - Standard lender fees';
  } else {
    comparison = 'High - Above average lender fees, consider negotiating';
  }
  
  return `## Lender Fee Comparison

**Your Lender Fees: $${lenderFees.toLocaleString()}**
**Percentage of Total Closing Costs: ${lenderFeePercentage.toFixed(1)}%**

**Market Comparison:** ${comparison}

### Fee Analysis:
- **Origination Fee:** $${inputs.originationFee.toLocaleString()} (${((inputs.originationFee/lenderFees)*100).toFixed(1)}% of lender fees)
- **Processing/Underwriting:** $${(inputs.processingFee + inputs.underwritingFee).toLocaleString()}
- **Other Lender Fees:** $${(lenderFees - inputs.originationFee - inputs.processingFee - inputs.underwritingFee).toLocaleString()}

### Recommendations:
${lenderFeePercentage > 50 ? '• High lender fees - negotiate aggressively' : '• Lender fees are reasonable'}
${inputs.originationFee > inputs.loanAmount * 0.01 ? '• Origination fee is high - ask for reduction' : '• Origination fee is reasonable'}`;
}

function generateNegotiationTips(inputs: MortgageClosingCostInputs, totalClosingCosts: number): string {
  return `## Negotiation Tips

### High-Impact Negotiations:
1. **Origination Fee:** Often negotiable, especially for larger loans
2. **Processing/Underwriting Fees:** Lenders may waive or reduce these
3. **Title Insurance:** Shop around - rates vary significantly
4. **Escrow/Settlement Fee:** Compare with other providers

### Medium-Impact Negotiations:
1. **Appraisal Fee:** Usually fixed but can be waived in some cases
2. **Credit Report Fee:** Often minimal but can be bundled
3. **Document Preparation:** Sometimes negotiable

### Low-Impact Negotiations:
1. **Recording Fees:** Government fees, usually non-negotiable
2. **Transfer Taxes:** Government fees, non-negotiable
3. **Flood Certification:** Usually minimal cost

### Strategy:
- **Get multiple Loan Estimates** from different lenders
- **Compare line by line** - don't just look at total
- **Ask for lender credits** in exchange for slightly higher rate
- **Request seller concessions** if market allows
- **Time your closing** to minimize prepaid interest

### Red Flags:
- Origination fees > 1% of loan amount
- Processing fees > $500
- Title insurance > 0.5% of loan amount
- Total closing costs > 4% of loan amount`;
}

function generateCostProjection(inputs: MortgageClosingCostInputs, totalClosingCosts: number, monthlyPayment: number): string {
  const annualPayment = monthlyPayment * 12;
  const totalPayments = annualPayment * inputs.loanTerm;
  const totalInterest = totalPayments - inputs.loanAmount;
  
  return `## Cost Projection Analysis

### Upfront Costs:
- **Down Payment:** $${inputs.downPayment.toLocaleString()}
- **Closing Costs:** $${totalClosingCosts.toLocaleString()}
- **Total Upfront:** $${(inputs.downPayment + totalClosingCosts).toLocaleString()}

### Monthly Costs:
- **Principal & Interest:** $${monthlyPayment.toLocaleString()}
- **Property Taxes:** $${(inputs.homePrice * inputs.propertyTaxRate / 100 / 12).toLocaleString()}
- **Insurance:** $${(inputs.homeownersInsuranceAnnual / 12).toLocaleString()}
- **PMI:** $${inputs.mortgageInsuranceType !== 'none' ? ((inputs.loanAmount * inputs.mortgageInsuranceRate / 100) / 12).toLocaleString() : '0'}
- **Total Monthly:** $${monthlyPayment.toLocaleString()}

### Long-term Costs:
- **Total Interest Paid:** $${totalInterest.toLocaleString()}
- **Total Property Taxes:** $${(inputs.homePrice * inputs.propertyTaxRate / 100 * inputs.loanTerm).toLocaleString()}
- **Total Insurance:** $${(inputs.homeownersInsuranceAnnual * inputs.loanTerm).toLocaleString()}
- **Total PMI:** $${inputs.mortgageInsuranceType !== 'none' ? (inputs.loanAmount * inputs.mortgageInsuranceRate / 100 * inputs.loanTerm).toLocaleString() : '0'}

### Cost Breakdown:
- **Principal:** $${inputs.loanAmount.toLocaleString()} (${((inputs.loanAmount/totalPayments)*100).toFixed(1)}%)
- **Interest:** $${totalInterest.toLocaleString()} (${((totalInterest/totalPayments)*100).toFixed(1)}%)
- **Taxes & Insurance:** $${((inputs.homePrice * inputs.propertyTaxRate / 100 * inputs.loanTerm) + (inputs.homeownersInsuranceAnnual * inputs.loanTerm)).toLocaleString()}
- **PMI:** $${inputs.mortgageInsuranceType !== 'none' ? (inputs.loanAmount * inputs.mortgageInsuranceRate / 100 * inputs.loanTerm).toLocaleString() : '0'}

**Total Cost of Homeownership:** $${(inputs.downPayment + totalClosingCosts + totalPayments).toLocaleString()}`;
}

export function generateMortgageClosingCostAnalysis(inputs: MortgageClosingCostInputs, outputs: MortgageClosingCostOutputs): string {
  return `# Mortgage Closing Cost Analysis

## Summary
- **Loan Amount:** $${inputs.loanAmount.toLocaleString()}
- **Home Price:** $${inputs.homePrice.toLocaleString()}
- **Down Payment:** $${inputs.downPayment.toLocaleString()}
- **Interest Rate:** ${inputs.interestRate}%
- **Loan Term:** ${inputs.loanTerm} years

## Closing Cost Breakdown
- **Total Closing Costs:** $${outputs.totalClosingCosts.toLocaleString()}
- **Lender Fees:** $${outputs.lenderFees.toLocaleString()}
- **Third-Party Fees:** $${outputs.thirdPartyFees.toLocaleString()}
- **Prepaid Items:** $${outputs.prepaidItems.toLocaleString()}
- **Cash to Close:** $${outputs.cashToClose.toLocaleString()}

## Monthly Payment Breakdown
- **Principal & Interest:** $${outputs.principalInterest.toLocaleString()}
- **Property Taxes:** $${outputs.monthlyTaxes.toLocaleString()}
- **Homeowners Insurance:** $${outputs.monthlyInsurance.toLocaleString()}
- **PMI:** $${outputs.monthlyPMI.toLocaleString()}
- **Total Monthly Payment:** $${outputs.monthlyPayment.toLocaleString()}

## Cost Analysis
- **Closing Costs as % of Loan:** ${outputs.closingCostPercentage.toFixed(2)}%
- **Closing Costs as % of Home Price:** ${outputs.closingCostPercentageHome.toFixed(2)}%

${outputs.breakdownAnalysis}

${outputs.savingsOpportunities}

${outputs.comparisonAnalysis}

${outputs.timelineAnalysis}

${outputs.escrowAnalysis}

${outputs.recommendations}

${outputs.feeBreakdown}

${outputs.prepaidBreakdown}

${outputs.lenderComparison}

${outputs.negotiationTips}

${outputs.costProjection}

## Key Takeaways
1. **Total upfront cost:** $${outputs.cashToClose.toLocaleString()}
2. **Monthly housing cost:** $${outputs.monthlyPayment.toLocaleString()}
3. **Closing cost efficiency:** ${outputs.closingCostPercentage < 3 ? 'Excellent' : outputs.closingCostPercentage < 4 ? 'Good' : 'Needs improvement'}
4. **Negotiation potential:** ${outputs.closingCostPercentage > 4 ? 'High - significant savings possible' : 'Moderate - some room for improvement'}

*This analysis provides a comprehensive view of your mortgage closing costs and opportunities for optimization.*`;
}
