import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// USDA income limits by household size (2024 estimates)
const USDA_INCOME_LIMITS = {
  1: 54000, 2: 62000, 3: 70000, 4: 78000, 5: 86000,
  6: 94000, 7: 102000, 8: 110000, 9: 118000, 10: 126000
};

// USDA location eligibility factors
const LOCATION_ELIGIBILITY = {
  rural: 1.0,
  suburban: 0.7,
  urban: 0.3
};

// Property type eligibility factors
const PROPERTY_ELIGIBILITY = {
  'single-family': 1.0,
  'townhouse': 0.9,
  'condo': 0.8,
  'manufactured': 0.7,
  'new-construction': 0.95
};

export function calculateUSDALoan(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs
  const {
    purchasePrice,
    downPayment,
    interestRate,
    loanTerm,
    annualIncome,
    householdSize,
    propertyLocation,
    propertyType,
    propertyAge,
    propertySize,
    propertyTaxes,
    homeownersInsurance,
    monthlyDebts,
    creditScore,
    guaranteeFee,
    annualFee,
    closingCosts,
    prepaidItems,
    sellerCredits,
    analysisPeriod
  } = inputs;

  // Calculate loan amount (including guarantee fee)
  const baseLoanAmount = purchasePrice - downPayment;
  const guaranteeFeeAmount = baseLoanAmount * (guaranteeFee / 100);
  const loanAmount = baseLoanAmount + guaranteeFeeAmount;

  // Calculate monthly payment
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);

  // Calculate monthly escrow
  const monthlyEscrow = (propertyTaxes + homeownersInsurance) / 12;

  // Calculate monthly USDA annual fee
  const monthlyUSDAFee = (loanAmount * (annualFee / 100)) / 12;

  // Calculate total monthly payment
  const totalMonthlyPayment = monthlyPayment + monthlyEscrow + monthlyUSDAFee;

  // Calculate debt-to-income ratio
  const monthlyIncome = annualIncome / 12;
  const totalMonthlyDebts = totalMonthlyPayment + monthlyDebts;
  const debtToIncomeRatio = (totalMonthlyDebts / monthlyIncome) * 100;

  // Calculate housing ratio
  const housingRatio = (totalMonthlyPayment / monthlyIncome) * 100;

  // Calculate total closing costs
  const totalClosingCosts = closingCosts + guaranteeFeeAmount;

  // Calculate cash to close
  const cashToClose = downPayment + totalClosingCosts + prepaidItems - sellerCredits;

  // Calculate total interest paid
  const totalInterestPaid = (monthlyPayment * totalPayments) - loanAmount;

  // Calculate total USDA fees over loan term
  const totalUSDAFees = (monthlyUSDAFee * totalPayments) + guaranteeFeeAmount;

  // Calculate total cost
  const totalCost = loanAmount + totalInterestPaid + totalUSDAFees;

  // Calculate savings vs conventional (assuming 20% down conventional)
  const conventionalDownPayment = purchasePrice * 0.2;
  const conventionalLoanAmount = purchasePrice - conventionalDownPayment;
  const conventionalMonthlyPayment = conventionalLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                                    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  const conventionalTotalInterest = (conventionalMonthlyPayment * totalPayments) - conventionalLoanAmount;
  const conventionalTotalCost = conventionalLoanAmount + conventionalTotalInterest;
  const savingsVsConventional = conventionalTotalCost - totalCost;

  // Check eligibility
  const incomeEligibility = checkIncomeEligibility(annualIncome, householdSize);
  const locationEligibility = checkLocationEligibility(propertyLocation);
  const propertyEligibility = checkPropertyEligibility(propertyType, propertyAge, propertySize);

  // Calculate eligibility score
  const eligibilityScore = calculateEligibilityScore(
    incomeEligibility,
    locationEligibility,
    propertyEligibility,
    debtToIncomeRatio,
    housingRatio,
    creditScore
  );

  // Generate recommendation
  const recommendation = generateRecommendation(inputs, {
    loanAmount,
    monthlyPayment,
    totalMonthlyPayment,
    debtToIncomeRatio,
    housingRatio,
    incomeEligibility,
    locationEligibility,
    propertyEligibility,
    eligibilityScore,
    savingsVsConventional
  });

  return {
    loanAmount: Math.round(loanAmount),
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    monthlyEscrow: Math.round(monthlyEscrow * 100) / 100,
    monthlyUSDAFee: Math.round(monthlyUSDAFee * 100) / 100,
    totalMonthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
    guaranteeFeeAmount: Math.round(guaranteeFeeAmount),
    totalClosingCosts: Math.round(totalClosingCosts),
    cashToClose: Math.round(cashToClose),
    debtToIncomeRatio: Math.round(debtToIncomeRatio * 100) / 100,
    housingRatio: Math.round(housingRatio * 100) / 100,
    incomeEligibility,
    locationEligibility,
    propertyEligibility,
    totalInterestPaid: Math.round(totalInterestPaid),
    totalUSDAFees: Math.round(totalUSDAFees),
    totalCost: Math.round(totalCost),
    savingsVsConventional: Math.round(savingsVsConventional),
    eligibilityScore: Math.round(eligibilityScore),
    recommendation
  };
}

function checkIncomeEligibility(annualIncome: number, householdSize: number): string {
  const limit = USDA_INCOME_LIMITS[householdSize as keyof typeof USDA_INCOME_LIMITS] || 
                USDA_INCOME_LIMITS[10] + (householdSize - 10) * 8000;
  
  if (annualIncome <= limit) {
    return 'Eligible';
  } else if (annualIncome <= limit * 1.15) {
    return 'Conditionally Eligible';
  } else {
    return 'Not Eligible';
  }
}

function checkLocationEligibility(propertyLocation: string): string {
  const eligibility = LOCATION_ELIGIBILITY[propertyLocation as keyof typeof LOCATION_ELIGIBILITY];
  
  if (eligibility >= 0.8) {
    return 'Highly Eligible';
  } else if (eligibility >= 0.5) {
    return 'Moderately Eligible';
  } else {
    return 'Limited Eligibility';
  }
}

function checkPropertyEligibility(propertyType: string, propertyAge: number, propertySize: number): string {
  const typeEligibility = PROPERTY_ELIGIBILITY[propertyType as keyof typeof PROPERTY_ELIGIBILITY] || 0.5;
  
  // Age factor (newer properties are more eligible)
  const ageFactor = Math.max(0.5, 1 - (propertyAge / 50));
  
  // Size factor (reasonable size is more eligible)
  const sizeFactor = propertySize >= 800 && propertySize <= 4000 ? 1 : 0.8;
  
  const overallEligibility = typeEligibility * ageFactor * sizeFactor;
  
  if (overallEligibility >= 0.8) {
    return 'Highly Eligible';
  } else if (overallEligibility >= 0.6) {
    return 'Moderately Eligible';
  } else {
    return 'Limited Eligibility';
  }
}

function calculateEligibilityScore(
  incomeEligibility: string,
  locationEligibility: string,
  propertyEligibility: string,
  debtToIncomeRatio: number,
  housingRatio: number,
  creditScore: number
): number {
  let score = 0;

  // Income eligibility (30 points)
  if (incomeEligibility === 'Eligible') score += 30;
  else if (incomeEligibility === 'Conditionally Eligible') score += 20;
  else score += 0;

  // Location eligibility (25 points)
  if (locationEligibility === 'Highly Eligible') score += 25;
  else if (locationEligibility === 'Moderately Eligible') score += 15;
  else score += 5;

  // Property eligibility (20 points)
  if (propertyEligibility === 'Highly Eligible') score += 20;
  else if (propertyEligibility === 'Moderately Eligible') score += 12;
  else score += 5;

  // Debt-to-income ratio (15 points)
  if (debtToIncomeRatio <= 41) score += 15;
  else if (debtToIncomeRatio <= 45) score += 10;
  else if (debtToIncomeRatio <= 50) score += 5;
  else score += 0;

  // Housing ratio (5 points)
  if (housingRatio <= 28) score += 5;
  else if (housingRatio <= 31) score += 3;
  else score += 0;

  // Credit score (5 points)
  if (creditScore >= 680) score += 5;
  else if (creditScore >= 640) score += 3;
  else score += 0;

  return Math.min(100, score);
}

function generateRecommendation(inputs: CalculatorInputs, outputs: any): string {
  const {
    debtToIncomeRatio,
    housingRatio,
    incomeEligibility,
    locationEligibility,
    propertyEligibility,
    eligibilityScore,
    savingsVsConventional
  } = outputs;

  let recommendation = '';

  // Overall assessment
  if (eligibilityScore >= 80) {
    recommendation += '**Excellent USDA Loan Candidate**\n\n';
  } else if (eligibilityScore >= 60) {
    recommendation += '**Good USDA Loan Candidate**\n\n';
  } else if (eligibilityScore >= 40) {
    recommendation += '**Moderate USDA Loan Candidate**\n\n';
  } else {
    recommendation += '**Limited USDA Loan Eligibility**\n\n';
  }

  // Income assessment
  if (incomeEligibility === 'Eligible') {
    recommendation += '✅ **Income**: Your household income meets USDA requirements.\n';
  } else if (incomeEligibility === 'Conditionally Eligible') {
    recommendation += '⚠️ **Income**: Your income is slightly above limits but may still qualify.\n';
  } else {
    recommendation += '❌ **Income**: Your income exceeds USDA limits significantly.\n';
  }

  // Location assessment
  if (locationEligibility === 'Highly Eligible') {
    recommendation += '✅ **Location**: Property is in a highly eligible rural area.\n';
  } else if (locationEligibility === 'Moderately Eligible') {
    recommendation += '⚠️ **Location**: Property is in a moderately eligible area.\n';
  } else {
    recommendation += '❌ **Location**: Property location has limited USDA eligibility.\n';
  }

  // Property assessment
  if (propertyEligibility === 'Highly Eligible') {
    recommendation += '✅ **Property**: Property type and characteristics are highly suitable.\n';
  } else if (propertyEligibility === 'Moderately Eligible') {
    recommendation += '⚠️ **Property**: Property has some eligibility concerns.\n';
  } else {
    recommendation += '❌ **Property**: Property may not meet USDA requirements.\n';
  }

  // Financial assessment
  if (debtToIncomeRatio <= 41) {
    recommendation += '✅ **Debt Ratio**: Excellent debt-to-income ratio.\n';
  } else if (debtToIncomeRatio <= 45) {
    recommendation += '⚠️ **Debt Ratio**: Acceptable but approaching limits.\n';
  } else {
    recommendation += '❌ **Debt Ratio**: Debt ratio exceeds USDA guidelines.\n';
  }

  if (housingRatio <= 28) {
    recommendation += '✅ **Housing Ratio**: Excellent housing expense ratio.\n';
  } else if (housingRatio <= 31) {
    recommendation += '⚠️ **Housing Ratio**: Housing ratio is acceptable.\n';
  } else {
    recommendation += '❌ **Housing Ratio**: Housing ratio exceeds guidelines.\n';
  }

  // Savings assessment
  if (savingsVsConventional > 0) {
    recommendation += `💰 **Savings**: USDA loan saves $${Math.abs(savingsVsConventional).toLocaleString()} vs conventional loan.\n`;
  } else {
    recommendation += `⚠️ **Cost**: USDA loan costs $${Math.abs(savingsVsConventional).toLocaleString()} more than conventional.\n`;
  }

  // Next steps
  recommendation += '\n**Next Steps**:\n';
  if (eligibilityScore >= 60) {
    recommendation += '1. Contact a USDA-approved lender\n';
    recommendation += '2. Verify property eligibility with USDA\n';
    recommendation += '3. Gather required documentation\n';
    recommendation += '4. Begin pre-approval process\n';
  } else {
    recommendation += '1. Consider improving credit score\n';
    recommendation += '2. Reduce existing debt\n';
    recommendation += '3. Explore other loan options\n';
    recommendation += '4. Consult with a mortgage professional\n';
  }

  return recommendation;
}

export function generateUSDALoanAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const {
    purchasePrice,
    downPayment,
    interestRate,
    loanTerm,
    annualIncome,
    householdSize,
    propertyLocation,
    propertyType,
    propertyAge,
    propertySize,
    propertyTaxes,
    homeownersInsurance,
    monthlyDebts,
    creditScore,
    guaranteeFee,
    annualFee,
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
    incomeEligibility,
    locationEligibility,
    propertyEligibility,
    totalInterestPaid,
    totalUSDAFees,
    totalCost,
    savingsVsConventional,
    eligibilityScore,
    recommendation
  } = outputs;

  return `# USDA Rural Development Loan Analysis

## Executive Summary
This analysis evaluates your eligibility for a USDA Rural Development loan and provides detailed financial projections.

**Overall Eligibility Score: ${eligibilityScore}/100**

## Financial Performance
- **Monthly Payment**: $${monthlyPayment.toLocaleString()}
- **Total Monthly Payment**: $${totalMonthlyPayment.toLocaleString()}
- **Debt-to-Income Ratio**: ${debtToIncomeRatio}%
- **Housing Ratio**: ${housingRatio}%
- **Total Interest Paid**: $${totalInterestPaid.toLocaleString()}
- **Total USDA Fees**: $${totalUSDAFees.toLocaleString()}
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
- **USDA Guarantee Fee**: ${guaranteeFee}% ($${outputs.guaranteeFeeAmount.toLocaleString()})
- **USDA Annual Fee**: ${annualFee}% ($${outputs.monthlyUSDAFee.toLocaleString()}/month)

## Borrower Information
- **Annual Income**: $${annualIncome.toLocaleString()}
- **Household Size**: ${householdSize} people
- **Credit Score**: ${creditScore}
- **Monthly Debts**: $${monthlyDebts.toLocaleString()}

## USDA Eligibility Assessment
- **Income Eligibility**: ${incomeEligibility}
- **Location Eligibility**: ${locationEligibility}
- **Property Eligibility**: ${propertyEligibility}

## Monthly Payment Breakdown
- **Principal & Interest**: $${monthlyPayment.toLocaleString()}
- **Property Taxes**: $${(propertyTaxes / 12).toLocaleString()}
- **Homeowners Insurance**: $${(homeownersInsurance / 12).toLocaleString()}
- **USDA Annual Fee**: $${outputs.monthlyUSDAFee.toLocaleString()}
- **Total Monthly Payment**: $${totalMonthlyPayment.toLocaleString()}

## Closing Costs
- **Base Closing Costs**: $${closingCosts.toLocaleString()}
- **USDA Guarantee Fee**: $${outputs.guaranteeFeeAmount.toLocaleString()}
- **Prepaid Items**: $${prepaidItems.toLocaleString()}
- **Seller Credits**: -$${sellerCredits.toLocaleString()}
- **Total Closing Costs**: $${outputs.totalClosingCosts.toLocaleString()}
- **Cash Required to Close**: $${outputs.cashToClose.toLocaleString()}

## USDA Loan Benefits
- **No Down Payment Required**: USDA loans allow 0% down payment
- **Lower Interest Rates**: Often lower than conventional loans
- **Flexible Credit Requirements**: More lenient than conventional loans
- **No PMI**: No private mortgage insurance required
- **Rural Development**: Supports rural community development

## Cost Comparison
- **USDA Loan Total Cost**: $${totalCost.toLocaleString()}
- **Conventional Loan (20% down)**: $${(totalCost + savingsVsConventional).toLocaleString()}
- **Savings with USDA**: $${savingsVsConventional > 0 ? savingsVsConventional.toLocaleString() : 'N/A'}

## USDA Program Requirements
1. **Income Limits**: Must meet USDA income limits for household size
2. **Property Location**: Must be in eligible rural area
3. **Primary Residence**: Must be used as primary residence
4. **Credit History**: Must demonstrate ability to repay
5. **Property Standards**: Must meet USDA property requirements

## Recommendations
${recommendation}

## Investment Decision
Based on the analysis above, this USDA loan ${eligibilityScore >= 60 ? 'appears to be a good option' : 'may not be the best option'} for your situation. The ${eligibilityScore >= 60 ? 'favorable terms and potential savings' : 'eligibility concerns and costs'} should be carefully considered before proceeding.

**Last Updated**: ${new Date().toLocaleDateString()}
`;
}
