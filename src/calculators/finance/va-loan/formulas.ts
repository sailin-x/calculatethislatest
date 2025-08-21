import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// VA funding fee rates (2024)
const VA_FUNDING_FEE_RATES = {
  'veteran': {
    'yes': { '0': 2.15, '5': 1.5, '10': 1.25, '100': 0 },
    'no': { '0': 3.3, '5': 1.5, '10': 1.25, '100': 0 }
  },
  'active-duty': {
    'yes': { '0': 2.15, '5': 1.5, '10': 1.25, '100': 0 },
    'no': { '0': 3.3, '5': 1.5, '10': 1.25, '100': 0 }
  },
  'reserves': {
    'yes': { '0': 2.4, '5': 1.75, '10': 1.5, '100': 0 },
    'no': { '0': 3.3, '5': 1.75, '10': 1.5, '100': 0 }
  },
  'surviving-spouse': {
    'yes': { '0': 2.15, '5': 1.5, '10': 1.25, '100': 0 },
    'no': { '0': 3.3, '5': 1.5, '10': 1.25, '100': 0 }
  }
};

// VA loan limits by county (2024 - simplified)
const VA_LOAN_LIMITS = {
  'rural': 726200,
  'suburban': 726200,
  'urban': 726200
};

// Property type eligibility factors
const PROPERTY_ELIGIBILITY = {
  'single-family': 1.0,
  'townhouse': 0.95,
  'condo': 0.9,
  'manufactured': 0.8,
  'new-construction': 0.98
};

export function calculateVALoan(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs
  const {
    purchasePrice,
    downPayment,
    interestRate,
    loanTerm,
    veteranStatus,
    serviceYears,
    disabilityRating,
    firstTimeUse,
    propertyType,
    propertyLocation,
    propertyAge,
    propertySize,
    propertyTaxes,
    homeownersInsurance,
    monthlyDebts,
    creditScore,
    annualIncome,
    closingCosts,
    prepaidItems,
    sellerCredits,
    analysisPeriod
  } = inputs;

  // Calculate base loan amount
  const baseLoanAmount = purchasePrice - downPayment;

  // Calculate VA funding fee
  const fundingFeeRate = calculateFundingFeeRate(veteranStatus, firstTimeUse, disabilityRating);
  const fundingFeeAmount = baseLoanAmount * (fundingFeeRate / 100);

  // Calculate total loan amount (including funding fee)
  const loanAmount = baseLoanAmount + fundingFeeAmount;

  // Calculate monthly payment
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);

  // Calculate monthly escrow
  const monthlyEscrow = (propertyTaxes + homeownersInsurance) / 12;

  // Calculate total monthly payment
  const totalMonthlyPayment = monthlyPayment + monthlyEscrow;

  // Calculate debt-to-income ratio
  const monthlyIncome = annualIncome / 12;
  const totalMonthlyDebts = totalMonthlyPayment + monthlyDebts;
  const debtToIncomeRatio = (totalMonthlyDebts / monthlyIncome) * 100;

  // Calculate housing ratio
  const housingRatio = (totalMonthlyPayment / monthlyIncome) * 100;

  // Calculate total closing costs
  const totalClosingCosts = closingCosts + fundingFeeAmount;

  // Calculate cash to close
  const cashToClose = downPayment + totalClosingCosts + prepaidItems - sellerCredits;

  // Calculate total interest paid
  const totalInterestPaid = (monthlyPayment * totalPayments) - loanAmount;

  // Calculate total funding fees
  const totalFundingFees = fundingFeeAmount;

  // Calculate total cost
  const totalCost = loanAmount + totalInterestPaid + totalFundingFees;

  // Calculate savings vs conventional (assuming 20% down conventional)
  const conventionalDownPayment = purchasePrice * 0.2;
  const conventionalLoanAmount = purchasePrice - conventionalDownPayment;
  const conventionalMonthlyPayment = conventionalLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                                    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  const conventionalTotalInterest = (conventionalMonthlyPayment * totalPayments) - conventionalLoanAmount;
  const conventionalTotalCost = conventionalLoanAmount + conventionalTotalInterest;
  const savingsVsConventional = conventionalTotalCost - totalCost;

  // Check eligibility
  const veteranEligibility = checkVeteranEligibility(veteranStatus, serviceYears, disabilityRating);
  const propertyEligibility = checkPropertyEligibility(propertyType, propertyAge, propertySize, propertyLocation);
  const fundingFeeExemption = checkFundingFeeExemption(disabilityRating);

  // Calculate eligibility score
  const eligibilityScore = calculateEligibilityScore(
    veteranEligibility,
    propertyEligibility,
    debtToIncomeRatio,
    housingRatio,
    creditScore,
    serviceYears,
    disabilityRating
  );

  // Generate recommendation
  const recommendation = generateRecommendation(inputs, {
    loanAmount,
    monthlyPayment,
    totalMonthlyPayment,
    debtToIncomeRatio,
    housingRatio,
    veteranEligibility,
    propertyEligibility,
    fundingFeeExemption,
    eligibilityScore,
    savingsVsConventional,
    fundingFeeAmount
  });

  return {
    loanAmount: Math.round(loanAmount),
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    monthlyEscrow: Math.round(monthlyEscrow * 100) / 100,
    totalMonthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
    fundingFeeAmount: Math.round(fundingFeeAmount),
    fundingFeeRate: Math.round(fundingFeeRate * 100) / 100,
    totalClosingCosts: Math.round(totalClosingCosts),
    cashToClose: Math.round(cashToClose),
    debtToIncomeRatio: Math.round(debtToIncomeRatio * 100) / 100,
    housingRatio: Math.round(housingRatio * 100) / 100,
    veteranEligibility,
    propertyEligibility,
    fundingFeeExemption,
    totalInterestPaid: Math.round(totalInterestPaid),
    totalFundingFees: Math.round(totalFundingFees),
    totalCost: Math.round(totalCost),
    savingsVsConventional: Math.round(savingsVsConventional),
    eligibilityScore: Math.round(eligibilityScore),
    recommendation
  };
}

function calculateFundingFeeRate(veteranStatus: string, firstTimeUse: string, disabilityRating: number): number {
  const statusRates = VA_FUNDING_FEE_RATES[veteranStatus as keyof typeof VA_FUNDING_FEE_RATES];
  if (!statusRates) return 2.15; // Default rate

  const usageRates = statusRates[firstTimeUse as keyof typeof statusRates];
  if (!usageRates) return 2.15; // Default rate

  // Determine rate based on disability rating
  if (disabilityRating >= 100) return usageRates['100'];
  if (disabilityRating >= 10) return usageRates['10'];
  if (disabilityRating >= 5) return usageRates['5'];
  return usageRates['0'];
}

function checkVeteranEligibility(veteranStatus: string, serviceYears: number, disabilityRating: number): string {
  // Basic service requirements
  if (veteranStatus === 'veteran' && serviceYears < 2) {
    return 'Limited Eligibility - Insufficient Service';
  }
  
  if (veteranStatus === 'reserves' && serviceYears < 6) {
    return 'Limited Eligibility - Insufficient Service';
  }

  if (veteranStatus === 'surviving-spouse' && serviceYears < 2) {
    return 'Limited Eligibility - Insufficient Service';
  }

  // Disability rating benefits
  if (disabilityRating >= 10) {
    return 'Highly Eligible - Service-Connected Disability';
  }

  if (serviceYears >= 4) {
    return 'Highly Eligible - Sufficient Service';
  }

  if (serviceYears >= 2) {
    return 'Eligible - Minimum Service Met';
  }

  return 'Limited Eligibility - Service Requirements Not Met';
}

function checkPropertyEligibility(propertyType: string, propertyAge: number, propertySize: number, propertyLocation: string): string {
  const typeEligibility = PROPERTY_ELIGIBILITY[propertyType as keyof typeof PROPERTY_ELIGIBILITY] || 0.5;
  
  // Age factor (newer properties are more eligible)
  const ageFactor = Math.max(0.5, 1 - (propertyAge / 50));
  
  // Size factor (reasonable size is more eligible)
  const sizeFactor = propertySize >= 800 && propertySize <= 5000 ? 1 : 0.8;
  
  // Location factor
  const locationFactor = propertyLocation === 'rural' ? 0.9 : 1.0;
  
  const overallEligibility = typeEligibility * ageFactor * sizeFactor * locationFactor;
  
  if (overallEligibility >= 0.8) {
    return 'Highly Eligible';
  } else if (overallEligibility >= 0.6) {
    return 'Moderately Eligible';
  } else {
    return 'Limited Eligibility';
  }
}

function checkFundingFeeExemption(disabilityRating: number): string {
  if (disabilityRating >= 10) {
    return 'Exempt - Service-Connected Disability';
  }
  return 'Not Exempt - Standard Funding Fee Applies';
}

function calculateEligibilityScore(
  veteranEligibility: string,
  propertyEligibility: string,
  debtToIncomeRatio: number,
  housingRatio: number,
  creditScore: number,
  serviceYears: number,
  disabilityRating: number
): number {
  let score = 0;

  // Veteran eligibility (35 points)
  if (veteranEligibility.includes('Highly Eligible')) score += 35;
  else if (veteranEligibility.includes('Eligible')) score += 25;
  else if (veteranEligibility.includes('Moderately Eligible')) score += 15;
  else score += 5;

  // Property eligibility (20 points)
  if (propertyEligibility === 'Highly Eligible') score += 20;
  else if (propertyEligibility === 'Moderately Eligible') score += 12;
  else score += 5;

  // Debt-to-income ratio (20 points)
  if (debtToIncomeRatio <= 41) score += 20;
  else if (debtToIncomeRatio <= 45) score += 15;
  else if (debtToIncomeRatio <= 50) score += 10;
  else score += 0;

  // Housing ratio (10 points)
  if (housingRatio <= 28) score += 10;
  else if (housingRatio <= 31) score += 7;
  else score += 0;

  // Credit score (10 points)
  if (creditScore >= 720) score += 10;
  else if (creditScore >= 680) score += 7;
  else if (creditScore >= 640) score += 5;
  else score += 0;

  // Service years bonus (3 points)
  if (serviceYears >= 4) score += 3;
  else if (serviceYears >= 2) score += 1;

  // Disability rating bonus (2 points)
  if (disabilityRating >= 10) score += 2;

  return Math.min(100, score);
}

function generateRecommendation(inputs: CalculatorInputs, outputs: any): string {
  const {
    debtToIncomeRatio,
    housingRatio,
    veteranEligibility,
    propertyEligibility,
    fundingFeeExemption,
    eligibilityScore,
    savingsVsConventional,
    fundingFeeAmount
  } = outputs;

  let recommendation = '';

  // Overall assessment
  if (eligibilityScore >= 80) {
    recommendation += '**Excellent VA Loan Candidate**\n\n';
  } else if (eligibilityScore >= 60) {
    recommendation += '**Good VA Loan Candidate**\n\n';
  } else if (eligibilityScore >= 40) {
    recommendation += '**Moderate VA Loan Candidate**\n\n';
  } else {
    recommendation += '**Limited VA Loan Eligibility**\n\n';
  }

  // Veteran assessment
  if (veteranEligibility.includes('Highly Eligible')) {
    recommendation += '✅ **Veteran Status**: Excellent eligibility with strong service record.\n';
  } else if (veteranEligibility.includes('Eligible')) {
    recommendation += '✅ **Veteran Status**: Good eligibility with adequate service.\n';
  } else if (veteranEligibility.includes('Moderately Eligible')) {
    recommendation += '⚠️ **Veteran Status**: Moderate eligibility with some concerns.\n';
  } else {
    recommendation += '❌ **Veteran Status**: Limited eligibility due to service requirements.\n';
  }

  // Property assessment
  if (propertyEligibility === 'Highly Eligible') {
    recommendation += '✅ **Property**: Property type and characteristics are highly suitable.\n';
  } else if (propertyEligibility === 'Moderately Eligible') {
    recommendation += '⚠️ **Property**: Property has some eligibility concerns.\n';
  } else {
    recommendation += '❌ **Property**: Property may not meet VA requirements.\n';
  }

  // Financial assessment
  if (debtToIncomeRatio <= 41) {
    recommendation += '✅ **Debt Ratio**: Excellent debt-to-income ratio.\n';
  } else if (debtToIncomeRatio <= 45) {
    recommendation += '⚠️ **Debt Ratio**: Acceptable but approaching limits.\n';
  } else {
    recommendation += '❌ **Debt Ratio**: Debt ratio exceeds VA guidelines.\n';
  }

  if (housingRatio <= 28) {
    recommendation += '✅ **Housing Ratio**: Excellent housing expense ratio.\n';
  } else if (housingRatio <= 31) {
    recommendation += '⚠️ **Housing Ratio**: Housing ratio is acceptable.\n';
  } else {
    recommendation += '❌ **Housing Ratio**: Housing ratio exceeds guidelines.\n';
  }

  // Funding fee assessment
  if (fundingFeeExemption.includes('Exempt')) {
    recommendation += '✅ **Funding Fee**: Exempt from VA funding fee due to service-connected disability.\n';
  } else {
    recommendation += `💰 **Funding Fee**: VA funding fee of $${fundingFeeAmount.toLocaleString()} applies.\n`;
  }

  // Savings assessment
  if (savingsVsConventional > 0) {
    recommendation += `💰 **Savings**: VA loan saves $${Math.abs(savingsVsConventional).toLocaleString()} vs conventional loan.\n`;
  } else {
    recommendation += `⚠️ **Cost**: VA loan costs $${Math.abs(savingsVsConventional).toLocaleString()} more than conventional.\n`;
  }

  // Next steps
  recommendation += '\n**Next Steps**:\n';
  if (eligibilityScore >= 60) {
    recommendation += '1. Contact a VA-approved lender\n';
    recommendation += '2. Obtain Certificate of Eligibility (COE)\n';
    recommendation += '3. Verify property meets VA requirements\n';
    recommendation += '4. Begin pre-approval process\n';
  } else {
    recommendation += '1. Review service requirements\n';
    recommendation += '2. Consider improving credit score\n';
    recommendation += '3. Reduce existing debt\n';
    recommendation += '4. Consult with VA loan specialist\n';
  }

  return recommendation;
}

export function generateVALoanAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const {
    purchasePrice,
    downPayment,
    interestRate,
    loanTerm,
    veteranStatus,
    serviceYears,
    disabilityRating,
    firstTimeUse,
    propertyType,
    propertyLocation,
    propertyAge,
    propertySize,
    propertyTaxes,
    homeownersInsurance,
    monthlyDebts,
    creditScore,
    annualIncome,
    closingCosts,
    prepaidItems,
    sellerCredits
  } = inputs;

  const {
    loanAmount,
    monthlyPayment,
    totalMonthlyPayment,
    debtToIncomeRatio,
    housingRatio,
    veteranEligibility,
    propertyEligibility,
    fundingFeeExemption,
    totalInterestPaid,
    totalFundingFees,
    totalCost,
    savingsVsConventional,
    eligibilityScore,
    fundingFeeAmount,
    recommendation
  } = outputs;

  return `# VA Home Loan Analysis

## Executive Summary
This analysis evaluates your eligibility for a VA home loan and provides detailed financial projections.

**Overall Eligibility Score: ${eligibilityScore}/100**

## Financial Performance
- **Monthly Payment**: $${monthlyPayment.toLocaleString()}
- **Total Monthly Payment**: $${totalMonthlyPayment.toLocaleString()}
- **Debt-to-Income Ratio**: ${debtToIncomeRatio}%
- **Housing Ratio**: ${housingRatio}%
- **Total Interest Paid**: $${totalInterestPaid.toLocaleString()}
- **Total Funding Fees**: $${totalFundingFees.toLocaleString()}
- **Total Loan Cost**: $${totalCost.toLocaleString()}

## Property Details
- **Purchase Price**: $${purchasePrice.toLocaleString()}
- **Down Payment**: $${downPayment.toLocaleString()}
- **Property Type**: ${propertyType.replace('-', ' ').toUpperCase()}
- **Property Age**: ${propertyAge} years
- **Property Size**: ${propertySize.toLocaleString()} sq ft
- **Location Type**: ${propertyLocation.toUpperCase()}

## Financial Terms
- **Loan Amount**: $${loanAmount.toLocaleString()}
- **Interest Rate**: ${interestRate}%
- **Loan Term**: ${loanTerm} years
- **VA Funding Fee**: ${outputs.fundingFeeRate}% ($${fundingFeeAmount.toLocaleString()})
- **Funding Fee Status**: ${fundingFeeExemption}

## Veteran Information
- **Veteran Status**: ${veteranStatus.replace('-', ' ').toUpperCase()}
- **Years of Service**: ${serviceYears} years
- **Disability Rating**: ${disabilityRating}%
- **First Time Use**: ${firstTimeUse === 'yes' ? 'Yes' : 'No'}
- **Annual Income**: $${annualIncome.toLocaleString()}
- **Credit Score**: ${creditScore}

## VA Eligibility Assessment
- **Veteran Eligibility**: ${veteranEligibility}
- **Property Eligibility**: ${propertyEligibility}
- **Funding Fee Exemption**: ${fundingFeeExemption}

## Monthly Payment Breakdown
- **Principal & Interest**: $${monthlyPayment.toLocaleString()}
- **Property Taxes**: $${(propertyTaxes / 12).toLocaleString()}
- **Homeowners Insurance**: $${(homeownersInsurance / 12).toLocaleString()}
- **Total Monthly Payment**: $${totalMonthlyPayment.toLocaleString()}

## Closing Costs
- **Base Closing Costs**: $${closingCosts.toLocaleString()}
- **VA Funding Fee**: $${fundingFeeAmount.toLocaleString()}
- **Prepaid Items**: $${prepaidItems.toLocaleString()}
- **Seller Credits**: -$${sellerCredits.toLocaleString()}
- **Total Closing Costs**: $${outputs.totalClosingCosts.toLocaleString()}
- **Cash Required to Close**: $${outputs.cashToClose.toLocaleString()}

## VA Loan Benefits
- **No Down Payment Required**: VA loans allow 0% down payment
- **No PMI**: No private mortgage insurance required
- **Competitive Interest Rates**: Often lower than conventional loans
- **Flexible Credit Requirements**: More lenient than conventional loans
- **Funding Fee Exemption**: Available for service-connected disabilities
- **Lifetime Benefit**: Can be used multiple times

## Cost Comparison
- **VA Loan Total Cost**: $${totalCost.toLocaleString()}
- **Conventional Loan (20% down)**: $${(totalCost + savingsVsConventional).toLocaleString()}
- **Savings with VA**: $${savingsVsConventional > 0 ? savingsVsConventional.toLocaleString() : 'N/A'}

## VA Program Requirements
1. **Service Requirements**: Must meet minimum service requirements
2. **Certificate of Eligibility**: Must obtain COE from VA
3. **Primary Residence**: Must be used as primary residence
4. **Property Standards**: Must meet VA property requirements
5. **Credit History**: Must demonstrate ability to repay

## Recommendations
${recommendation}

## Investment Decision
Based on the analysis above, this VA loan ${eligibilityScore >= 60 ? 'appears to be an excellent option' : 'may not be the best option'} for your situation. The ${eligibilityScore >= 60 ? 'favorable terms and veteran benefits' : 'eligibility concerns and costs'} should be carefully considered before proceeding.

**Last Updated**: ${new Date().toLocaleDateString()}
`;
}
