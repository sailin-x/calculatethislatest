import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export function calculateMortgageAPRComparison(inputs: CalculatorInputs): CalculatorOutputs {
  // Calculate APR for each offer
  const apr1 = calculateAPR(inputs, 1);
  const apr2 = calculateAPR(inputs, 2);
  const apr3 = calculateAPR(inputs, 3);

  // Calculate monthly payments
  const monthlyPayment1 = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate1, inputs.loanTerm);
  const monthlyPayment2 = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate2, inputs.loanTerm);
  const monthlyPayment3 = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate3, inputs.loanTerm);

  // Calculate total costs
  const totalCost1 = calculateTotalCost(inputs, 1, monthlyPayment1);
  const totalCost2 = calculateTotalCost(inputs, 2, monthlyPayment2);
  const totalCost3 = calculateTotalCost(inputs, 3, monthlyPayment3);

  // Calculate closing costs
  const closingCosts1 = calculateClosingCosts(inputs, 1);
  const closingCosts2 = calculateClosingCosts(inputs, 2);
  const closingCosts3 = calculateClosingCosts(inputs, 3);

  // Calculate total interest
  const totalInterest1 = calculateTotalInterest(inputs.loanAmount, inputs.interestRate1, inputs.loanTerm);
  const totalInterest2 = calculateTotalInterest(inputs.loanAmount, inputs.interestRate2, inputs.loanTerm);
  const totalInterest3 = calculateTotalInterest(inputs.loanAmount, inputs.interestRate3, inputs.loanTerm);

  // Generate analysis
  const costComparison = generateCostComparison(totalCost1, totalCost2, totalCost3);
  const bestOffer = determineBestOffer(apr1, apr2, apr3);
  const savingsAnalysis = generateSavingsAnalysis(monthlyPayment1, monthlyPayment2, monthlyPayment3, totalCost1, totalCost2, totalCost3);
  const breakEvenAnalysis = generateBreakEvenAnalysis(inputs, closingCosts1, closingCosts2, closingCosts3, monthlyPayment1, monthlyPayment2, monthlyPayment3);
  const feeBreakdown1 = generateFeeBreakdown(inputs, 1);
  const feeBreakdown2 = generateFeeBreakdown(inputs, 2);
  const feeBreakdown3 = generateFeeBreakdown(inputs, 3);
  const aprDifference = generateAPRDifference(apr1, apr2, apr3);
  const monthlySavings = generateMonthlySavings(monthlyPayment1, monthlyPayment2, monthlyPayment3);
  const totalSavings = generateTotalSavings(totalCost1, totalCost2, totalCost3);
  const recommendation = generateRecommendation(inputs, apr1, apr2, apr3, totalCost1, totalCost2, totalCost3);

  return {
    apr1,
    apr2,
    apr3,
    monthlyPayment1,
    monthlyPayment2,
    monthlyPayment3,
    totalCost1,
    totalCost2,
    totalCost3,
    closingCosts1,
    closingCosts2,
    closingCosts3,
    totalInterest1,
    totalInterest2,
    totalInterest3,
    costComparison,
    bestOffer,
    savingsAnalysis,
    breakEvenAnalysis,
    feeBreakdown1,
    feeBreakdown2,
    feeBreakdown3,
    aprDifference,
    monthlySavings,
    totalSavings,
    recommendation
  };
}

function calculateAPR(inputs: CalculatorInputs, offerNumber: number): number {
  const interestRate = inputs[`interestRate${offerNumber}`] as number;
  const loanAmount = inputs.loanAmount as number;
  const loanTerm = inputs.loanTerm as number;
  
  // Calculate total finance charges
  const totalFinanceCharges = calculateTotalFinanceCharges(inputs, offerNumber);
  
  // Calculate APR using the formula: APR = (Total Finance Charges / Loan Amount) * (365 / Loan Term in Days) * 100
  const loanTermInDays = loanTerm * 365;
  const apr = (totalFinanceCharges / loanAmount) * (365 / loanTermInDays) * 100;
  
  return Math.round(apr * 10000) / 10000; // Round to 4 decimal places
}

function calculateTotalFinanceCharges(inputs: CalculatorInputs, offerNumber: number): number {
  const loanAmount = inputs.loanAmount as number;
  const interestRate = inputs[`interestRate${offerNumber}`] as number;
  const loanTerm = inputs.loanTerm as number;
  
  // Calculate total interest
  const totalInterest = calculateTotalInterest(loanAmount, interestRate, loanTerm);
  
  // Calculate total fees
  const totalFees = calculateTotalFees(inputs, offerNumber);
  
  return totalInterest + totalFees;
}

function calculateTotalFees(inputs: CalculatorInputs, offerNumber: number): number {
  const fees = [
    inputs[`originationFee${offerNumber}`],
    inputs[`appraisalFee${offerNumber}`],
    inputs[`titleInsurance${offerNumber}`],
    inputs[`escrowFees${offerNumber}`],
    inputs[`creditReportFee${offerNumber}`],
    inputs[`processingFee${offerNumber}`],
    inputs[`underwritingFee${offerNumber}`],
    inputs[`documentPreparationFee${offerNumber}`],
    inputs[`floodCertificationFee${offerNumber}`],
    inputs[`taxServiceFee${offerNumber}`],
    inputs[`prepaidInterest${offerNumber}`],
    inputs[`prepaidInsurance${offerNumber}`],
    inputs[`prepaidTaxes${offerNumber}`],
    -inputs[`lenderCredits${offerNumber}`] // Negative because credits reduce costs
  ];
  
  // Add discount points cost
  const discountPoints = inputs[`discountPoints${offerNumber}`] as number;
  const discountPointsCost = (discountPoints / 100) * (inputs.loanAmount as number);
  fees.push(discountPointsCost);
  
  return fees.reduce((sum, fee) => sum + (fee as number), 0);
}

function calculateMonthlyPayment(loanAmount: number, interestRate: number, loanTerm: number): number {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  if (monthlyRate === 0) {
    return loanAmount / numberOfPayments;
  }
  
  const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                  (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Math.round(payment * 100) / 100;
}

function calculateTotalCost(inputs: CalculatorInputs, offerNumber: number, monthlyPayment: number): number {
  const loanAmount = inputs.loanAmount as number;
  const loanTerm = inputs.loanTerm as number;
  const totalInterest = calculateTotalInterest(loanAmount, inputs[`interestRate${offerNumber}`] as number, loanTerm);
  const totalFees = calculateTotalFees(inputs, offerNumber);
  
  return loanAmount + totalInterest + totalFees;
}

function calculateClosingCosts(inputs: CalculatorInputs, offerNumber: number): number {
  const fees = [
    inputs[`originationFee${offerNumber}`],
    inputs[`appraisalFee${offerNumber}`],
    inputs[`titleInsurance${offerNumber}`],
    inputs[`escrowFees${offerNumber}`],
    inputs[`creditReportFee${offerNumber}`],
    inputs[`processingFee${offerNumber}`],
    inputs[`underwritingFee${offerNumber}`],
    inputs[`documentPreparationFee${offerNumber}`],
    inputs[`floodCertificationFee${offerNumber}`],
    inputs[`taxServiceFee${offerNumber}`],
    inputs[`prepaidInterest${offerNumber}`],
    inputs[`prepaidInsurance${offerNumber}`],
    inputs[`prepaidTaxes${offerNumber}`],
    -inputs[`lenderCredits${offerNumber}`]
  ];
  
  // Add discount points cost
  const discountPoints = inputs[`discountPoints${offerNumber}`] as number;
  const discountPointsCost = (discountPoints / 100) * (inputs.loanAmount as number);
  fees.push(discountPointsCost);
  
  return fees.reduce((sum, fee) => sum + (fee as number), 0);
}

function calculateTotalInterest(loanAmount: number, interestRate: number, loanTerm: number): number {
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  const totalPayments = monthlyPayment * loanTerm * 12;
  
  return totalPayments - loanAmount;
}

function generateCostComparison(totalCost1: number, totalCost2: number, totalCost3: number): string {
  const costs = [
    { offer: 1, cost: totalCost1 },
    { offer: 2, cost: totalCost2 },
    { offer: 3, cost: totalCost3 }
  ].sort((a, b) => a.cost - b.cost);
  
  const lowest = costs[0];
  const highest = costs[2];
  const difference = highest.cost - lowest.cost;
  
  return `**Cost Comparison Summary:**
- **Lowest Total Cost:** Offer ${lowest.offer} at $${lowest.cost.toLocaleString()}
- **Highest Total Cost:** Offer ${highest.offer} at $${highest.cost.toLocaleString()}
- **Cost Difference:** $${difference.toLocaleString()} between highest and lowest offers
- **Savings Opportunity:** Choosing the lowest cost offer saves $${difference.toLocaleString()} over the loan term`;
}

function determineBestOffer(apr1: number, apr2: number, apr3: number): string {
  const aprs = [
    { offer: 1, apr: apr1 },
    { offer: 2, apr: apr2 },
    { offer: 3, apr: apr3 }
  ].sort((a, b) => a.apr - b.apr);
  
  const best = aprs[0];
  const worst = aprs[2];
  const difference = worst.apr - best.apr;
  
  return `**Best Offer Recommendation:** Offer ${best.offer}
- **APR:** ${best.apr.toFixed(4)}%
- **Advantage:** ${difference.toFixed(4)}% lower than the highest APR offer
- **Savings:** Lower APR means less total interest paid over the loan term`;
}

function generateSavingsAnalysis(monthlyPayment1: number, monthlyPayment2: number, monthlyPayment3: number, 
                                totalCost1: number, totalCost2: number, totalCost3: number): string {
  const payments = [
    { offer: 1, payment: monthlyPayment1, total: totalCost1 },
    { offer: 2, payment: monthlyPayment2, total: totalCost2 },
    { offer: 3, payment: monthlyPayment3, total: totalCost3 }
  ].sort((a, b) => a.payment - b.payment);
  
  const lowestMonthly = payments[0];
  const highestMonthly = payments[2];
  const monthlyDifference = highestMonthly.payment - lowestMonthly.payment;
  const annualDifference = monthlyDifference * 12;
  const totalDifference = highestMonthly.total - lowestMonthly.total;
  
  return `**Savings Analysis:**
- **Lowest Monthly Payment:** Offer ${lowestMonthly.offer} at $${lowestMonthly.payment.toLocaleString()}/month
- **Highest Monthly Payment:** Offer ${highestMonthly.offer} at $${highestMonthly.payment.toLocaleString()}/month
- **Monthly Savings:** $${monthlyDifference.toLocaleString()} by choosing the lowest payment offer
- **Annual Savings:** $${annualDifference.toLocaleString()} per year
- **Total Savings:** $${totalDifference.toLocaleString()} over the entire loan term`;
}

function generateBreakEvenAnalysis(inputs: CalculatorInputs, closingCosts1: number, closingCosts2: number, closingCosts3: number,
                                  monthlyPayment1: number, monthlyPayment2: number, monthlyPayment3: number): string {
  const offers = [
    { offer: 1, closingCosts: closingCosts1, monthlyPayment: monthlyPayment1 },
    { offer: 2, closingCosts: closingCosts2, monthlyPayment: monthlyPayment2 },
    { offer: 3, closingCosts: closingCosts3, monthlyPayment: monthlyPayment3 }
  ];
  
  let analysis = `**Break-Even Analysis:**\n\n`;
  
  // Compare each pair of offers
  for (let i = 0; i < offers.length; i++) {
    for (let j = i + 1; j < offers.length; j++) {
      const offer1 = offers[i];
      const offer2 = offers[j];
      
      const costDifference = Math.abs(offer1.closingCosts - offer2.closingCosts);
      const paymentDifference = Math.abs(offer1.monthlyPayment - offer2.monthlyPayment);
      
      if (paymentDifference > 0) {
        const breakEvenMonths = costDifference / paymentDifference;
        analysis += `**Offer ${offer1.offer} vs Offer ${offer2.offer}:**
- Closing cost difference: $${costDifference.toLocaleString()}
- Monthly payment difference: $${paymentDifference.toLocaleString()}
- Break-even point: ${breakEvenMonths.toFixed(1)} months\n\n`;
      }
    }
  }
  
  return analysis;
}

function generateFeeBreakdown(inputs: CalculatorInputs, offerNumber: number): string {
  const fees = [
    { name: 'Origination Fee', value: inputs[`originationFee${offerNumber}`] },
    { name: 'Discount Points', value: (inputs[`discountPoints${offerNumber}`] as number / 100) * (inputs.loanAmount as number) },
    { name: 'Appraisal Fee', value: inputs[`appraisalFee${offerNumber}`] },
    { name: 'Title Insurance', value: inputs[`titleInsurance${offerNumber}`] },
    { name: 'Escrow Fees', value: inputs[`escrowFees${offerNumber}`] },
    { name: 'Credit Report Fee', value: inputs[`creditReportFee${offerNumber}`] },
    { name: 'Processing Fee', value: inputs[`processingFee${offerNumber}`] },
    { name: 'Underwriting Fee', value: inputs[`underwritingFee${offerNumber}`] },
    { name: 'Document Preparation', value: inputs[`documentPreparationFee${offerNumber}`] },
    { name: 'Flood Certification', value: inputs[`floodCertificationFee${offerNumber}`] },
    { name: 'Tax Service Fee', value: inputs[`taxServiceFee${offerNumber}`] },
    { name: 'Prepaid Interest', value: inputs[`prepaidInterest${offerNumber}`] },
    { name: 'Prepaid Insurance', value: inputs[`prepaidInsurance${offerNumber}`] },
    { name: 'Prepaid Taxes', value: inputs[`prepaidTaxes${offerNumber}`] },
    { name: 'Lender Credits', value: -inputs[`lenderCredits${offerNumber}`] }
  ];
  
  const totalFees = fees.reduce((sum, fee) => sum + (fee.value as number), 0);
  
  let breakdown = `**Offer ${offerNumber} Fee Breakdown:**\n\n`;
  fees.forEach(fee => {
    breakdown += `- ${fee.name}: $${(fee.value as number).toLocaleString()}\n`;
  });
  breakdown += `\n**Total Closing Costs: $${totalFees.toLocaleString()}**`;
  
  return breakdown;
}

function generateAPRDifference(apr1: number, apr2: number, apr3: number): string {
  const aprs = [
    { offer: 1, apr: apr1 },
    { offer: 2, apr: apr2 },
    { offer: 3, apr: apr3 }
  ].sort((a, b) => a.apr - b.apr);
  
  const lowest = aprs[0];
  const highest = aprs[2];
  const difference = highest.apr - lowest.apr;
  
  return `**APR Comparison:**
- **Lowest APR:** Offer ${lowest.offer} at ${lowest.apr.toFixed(4)}%
- **Highest APR:** Offer ${highest.offer} at ${highest.apr.toFixed(4)}%
- **APR Difference:** ${difference.toFixed(4)}% between highest and lowest
- **Impact:** ${difference.toFixed(4)}% difference can significantly affect total loan cost`;
}

function generateMonthlySavings(monthlyPayment1: number, monthlyPayment2: number, monthlyPayment3: number): string {
  const payments = [
    { offer: 1, payment: monthlyPayment1 },
    { offer: 2, payment: monthlyPayment2 },
    { offer: 3, payment: monthlyPayment3 }
  ].sort((a, b) => a.payment - b.payment);
  
  const lowest = payments[0];
  const highest = payments[2];
  const difference = highest.payment - lowest.payment;
  const annualSavings = difference * 12;
  
  return `**Monthly Payment Comparison:**
- **Lowest Payment:** Offer ${lowest.offer} at $${lowest.payment.toLocaleString()}/month
- **Highest Payment:** Offer ${highest.offer} at $${highest.payment.toLocaleString()}/month
- **Monthly Difference:** $${difference.toLocaleString()}
- **Annual Savings:** $${annualSavings.toLocaleString()} by choosing the lowest payment offer`;
}

function generateTotalSavings(totalCost1: number, totalCost2: number, totalCost3: number): string {
  const costs = [
    { offer: 1, cost: totalCost1 },
    { offer: 2, cost: totalCost2 },
    { offer: 3, cost: totalCost3 }
  ].sort((a, b) => a.cost - b.cost);
  
  const lowest = costs[0];
  const highest = costs[2];
  const difference = highest.cost - lowest.cost;
  
  return `**Total Cost Comparison:**
- **Lowest Total Cost:** Offer ${lowest.offer} at $${lowest.cost.toLocaleString()}
- **Highest Total Cost:** Offer ${highest.offer} at $${highest.cost.toLocaleString()}
- **Total Savings:** $${difference.toLocaleString()} by choosing the lowest cost offer
- **Percentage Savings:** ${((difference / highest.cost) * 100).toFixed(2)}% less than the highest cost offer`;
}

function generateRecommendation(inputs: CalculatorInputs, apr1: number, apr2: number, apr3: number,
                               totalCost1: number, totalCost2: number, totalCost3: number): string {
  const aprs = [
    { offer: 1, apr: apr1, totalCost: totalCost1 },
    { offer: 2, apr: apr2, totalCost: totalCost2 },
    { offer: 3, apr: apr3, totalCost: totalCost3 }
  ].sort((a, b) => a.apr - b.apr);
  
  const bestAPR = aprs[0];
  const worstAPR = aprs[2];
  
  const costs = [
    { offer: 1, apr: apr1, totalCost: totalCost1 },
    { offer: 2, apr: apr2, totalCost: totalCost2 },
    { offer: 3, apr: apr3, totalCost: totalCost3 }
  ].sort((a, b) => a.totalCost - b.totalCost);
  
  const bestCost = costs[0];
  const worstCost = costs[2];
  
  let recommendation = `**Mortgage Offer Recommendation:**\n\n`;
  
  if (bestAPR.offer === bestCost.offer) {
    recommendation += `**🏆 RECOMMENDED: Offer ${bestAPR.offer}**
- **Best APR:** ${bestAPR.apr.toFixed(4)}%
- **Lowest Total Cost:** $${bestAPR.totalCost.toLocaleString()}
- **Advantage:** This offer provides both the lowest APR and lowest total cost
- **Savings:** $${(worstCost.totalCost - bestAPR.totalCost).toLocaleString()} compared to the most expensive offer\n\n`;
  } else {
    recommendation += `**🤔 CONSIDER BOTH:**
- **For Lowest APR:** Offer ${bestAPR.offer} at ${bestAPR.apr.toFixed(4)}%
- **For Lowest Total Cost:** Offer ${bestCost.offer} at $${bestCost.totalCost.toLocaleString()}
- **Trade-off:** Lower APR vs. lower closing costs\n\n`;
  }
  
  recommendation += `**Key Factors to Consider:**
- **Monthly Budget:** Choose the offer with the most comfortable monthly payment
- **Cash Available:** Consider how much cash you have for closing costs
- **Loan Term:** Longer terms may have higher total costs but lower monthly payments
- **Future Plans:** Consider if you plan to refinance or sell before the loan term ends`;
  
  return recommendation;
}

export function generateMortgageAPRComparisonAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Mortgage APR Comparison Analysis Report

## Executive Summary

This analysis compares three mortgage offers using Annual Percentage Rate (APR) calculations to determine the true cost of borrowing. APR includes both the interest rate and all associated fees, providing a comprehensive comparison tool.

## Key Metrics

### APR Comparison
- **Offer 1 APR:** ${outputs.apr1.toFixed(4)}%
- **Offer 2 APR:** ${outputs.apr2.toFixed(4)}%
- **Offer 3 APR:** ${outputs.apr3.toFixed(4)}%

### Monthly Payments
- **Offer 1:** $${outputs.monthlyPayment1.toLocaleString()}/month
- **Offer 2:** $${outputs.monthlyPayment2.toLocaleString()}/month
- **Offer 3:** $${outputs.monthlyPayment3.toLocaleString()}/month

### Total Costs
- **Offer 1:** $${outputs.totalCost1.toLocaleString()}
- **Offer 2:** $${outputs.totalCost2.toLocaleString()}
- **Offer 3:** $${outputs.totalCost3.toLocaleString()}

## Detailed Analysis

### APR Differences
${outputs.aprDifference}

### Monthly Payment Comparison
${outputs.monthlySavings}

### Total Cost Comparison
${outputs.totalSavings}

### Closing Costs Breakdown

#### Offer 1 Closing Costs
${outputs.feeBreakdown1}

#### Offer 2 Closing Costs
${outputs.feeBreakdown2}

#### Offer 3 Closing Costs
${outputs.feeBreakdown3}

### Break-Even Analysis
${outputs.breakEvenAnalysis}

### Cost Comparison Summary
${outputs.costComparison}

## Recommendations

### Best Offer Analysis
${outputs.bestOffer}

### Savings Analysis
${outputs.savingsAnalysis}

### Final Recommendation
${outputs.recommendation}

## Important Considerations

### APR vs. Interest Rate
- **Interest Rate:** The cost of borrowing the principal loan amount
- **APR:** The total cost of credit, including interest and fees
- **Key Difference:** APR provides a more accurate comparison between loan offers

### Closing Costs Impact
- Higher closing costs increase the total cost of the loan
- Lower closing costs may result in higher interest rates
- Consider your available cash for closing costs

### Monthly Payment vs. Total Cost
- Lower monthly payments may have higher total costs due to fees
- Higher monthly payments may have lower total costs due to lower fees
- Balance your monthly budget with long-term cost considerations

### Break-Even Analysis
- Calculate how long it takes for lower monthly payments to offset higher closing costs
- Consider your expected time in the home when making this calculation

## Conclusion

The APR comparison reveals the true cost of each mortgage offer, helping you make an informed decision based on your financial situation and goals. Consider both short-term affordability (monthly payments) and long-term cost (total cost) when choosing your mortgage offer.

**Remember:** The lowest APR doesn't always mean the best deal for your specific situation. Consider your cash flow, available funds for closing costs, and future plans when making your final decision.`;
}
