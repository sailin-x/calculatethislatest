import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Helper function to calculate monthly mortgage payment
function calculateMonthlyPayment(loanAmount: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    return loanAmount / numberOfPayments;
  }
  
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

// Helper function to calculate affordability score
function calculateAffordabilityScore(
  monthlyIncome: number,
  frontEndDTI: number,
  backEndDTI: number,
  monthlyCashFlow: number,
  emergencyFund: number,
  totalMonthlyPayment: number
): number {
  let incomeFactor = 0.3;
  if (monthlyIncome >= 15000) incomeFactor = 1.0;
  else if (monthlyIncome >= 10000) incomeFactor = 0.9;
  else if (monthlyIncome >= 6000) incomeFactor = 0.6;

  let dtiFactor = 0.3;
  if (frontEndDTI <= 25 && backEndDTI <= 35) dtiFactor = 1.0;
  else if (frontEndDTI <= 28 && backEndDTI <= 36) dtiFactor = 0.8;
  else if (frontEndDTI <= 31 && backEndDTI <= 43) dtiFactor = 0.6;

  let cashFlowFactor = 0.3;
  const cashFlowRatio = monthlyCashFlow / monthlyIncome;
  if (cashFlowRatio >= 0.4) cashFlowFactor = 1.0;
  else if (cashFlowRatio >= 0.3) cashFlowFactor = 0.8;
  else if (cashFlowRatio >= 0.2) cashFlowFactor = 0.6;

  let emergencyFundFactor = 0.3;
  const emergencyFundMonths = emergencyFund / totalMonthlyPayment;
  if (emergencyFundMonths >= 6) emergencyFundFactor = 1.0;
  else if (emergencyFundMonths >= 3) emergencyFundFactor = 0.8;
  else if (emergencyFundMonths >= 1) emergencyFundFactor = 0.6;

  return Math.round((incomeFactor * 0.3 + dtiFactor * 0.3 + cashFlowFactor * 0.2 + emergencyFundFactor * 0.2) * 100);
}

// Helper function to calculate risk score
function calculateRiskScore(
  frontEndDTI: number,
  backEndDTI: number,
  monthlyCashFlow: number,
  monthlyIncome: number,
  emergencyFund: number,
  totalMonthlyPayment: number,
  creditScore: number
): number {
  let riskScore = 0;

  if (frontEndDTI > 31) riskScore += 25;
  else if (frontEndDTI > 28) riskScore += 15;
  else if (frontEndDTI > 25) riskScore += 10;

  if (backEndDTI > 43) riskScore += 25;
  else if (backEndDTI > 36) riskScore += 15;
  else if (backEndDTI > 35) riskScore += 10;

  const cashFlowRatio = monthlyCashFlow / monthlyIncome;
  if (cashFlowRatio < 0.1) riskScore += 20;
  else if (cashFlowRatio < 0.2) riskScore += 15;
  else if (cashFlowRatio < 0.3) riskScore += 10;

  const emergencyFundMonths = emergencyFund / totalMonthlyPayment;
  if (emergencyFundMonths < 1) riskScore += 15;
  else if (emergencyFundMonths < 3) riskScore += 10;
  else if (emergencyFundMonths < 6) riskScore += 5;

  if (creditScore < 620) riskScore += 15;
  else if (creditScore < 680) riskScore += 10;
  else if (creditScore < 720) riskScore += 5;

  return Math.min(riskScore, 100);
}

export function calculateHomeAffordability(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs with defaults
  const annualIncome = inputs.annualIncome || 0;
  const monthlyIncome = inputs.monthlyIncome || annualIncome / 12;
  const downPayment = inputs.downPayment || 0;
  const downPaymentPercent = inputs.downPaymentPercent || 20;
  const interestRate = inputs.interestRate || 6.5;
  const loanTerm = inputs.loanTerm || 30;
  const monthlyDebtPayments = inputs.monthlyDebtPayments || 0;
  const annualPropertyTaxes = inputs.annualPropertyTaxes || 0;
  const annualHomeownersInsurance = inputs.annualHomeownersInsurance || 0;
  const monthlyHoaFees = inputs.monthlyHoaFees || 0;
  const monthlyUtilities = inputs.monthlyUtilities || 0;
  const monthlyMaintenance = inputs.monthlyMaintenance || 0;
  const creditScore = inputs.creditScore || 750;
  const targetFrontEndDTI = inputs.frontEndDTI || 28;
  const targetBackEndDTI = inputs.backEndDTI || 36;
  const loanType = inputs.loanType || 'conventional';
  const propertyType = inputs.propertyType || 'single-family';
  const occupancyType = inputs.occupancyType || 'primary-residence';
  const propertyTaxRate = inputs.propertyTaxRate || 1.2;
  const insuranceRate = inputs.insuranceRate || 0.5;
  const pmiRate = inputs.pmiRate || 0.5;
  const emergencyFund = inputs.emergencyFund || 10000;
  const taxRate = inputs.taxRate || 22;

  // Calculate maximum home price based on different factors
  const maxDownPaymentBasedPrice = downPayment / (downPaymentPercent / 100);
  
  // Calculate maximum payment based on front-end DTI
  const maxMonthlyPayment = (monthlyIncome * targetFrontEndDTI / 100) - 
                           (annualPropertyTaxes / 12) - 
                           (annualHomeownersInsurance / 12) - 
                           monthlyHoaFees - 
                           monthlyUtilities - 
                           monthlyMaintenance;
  
  // Calculate maximum loan amount based on payment
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const maxLoanAmount = maxMonthlyPayment * (Math.pow(1 + monthlyRate, numberOfPayments) - 1) / 
                       (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
  
  const maxIncomeBasedPrice = maxLoanAmount + downPayment;
  
  // Calculate maximum price based on back-end DTI
  const maxTotalDebtPayment = (monthlyIncome * targetBackEndDTI / 100) - monthlyDebtPayments;
  const maxHousingPayment = maxTotalDebtPayment - monthlyUtilities - monthlyMaintenance;
  const maxLoanAmountBackEnd = maxHousingPayment * (Math.pow(1 + monthlyRate, numberOfPayments) - 1) / 
                              (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
  const maxDTIBasedPrice = maxLoanAmountBackEnd + downPayment;
  
  // Take the minimum of all calculated prices
  const maxHomePrice = Math.min(maxDownPaymentBasedPrice, maxIncomeBasedPrice, maxDTIBasedPrice);
  const maxLoanAmount = maxHomePrice - downPayment;
  
  // Calculate actual payments
  const monthlyPayment = calculateMonthlyPayment(maxLoanAmount, interestRate, loanTerm);
  const monthlyPropertyTaxes = (maxHomePrice * propertyTaxRate / 100) / 12;
  const monthlyInsurance = (maxHomePrice * insuranceRate / 100) / 12;
  const monthlyPMI = downPaymentPercent < 20 ? (maxLoanAmount * pmiRate / 100) / 12 : 0;
  const totalMonthlyPayment = monthlyPayment + monthlyPropertyTaxes + monthlyInsurance + 
                             monthlyPMI + monthlyHoaFees + monthlyUtilities + monthlyMaintenance;
  
  // Calculate DTI ratios
  const frontEndDTI = (totalMonthlyPayment / monthlyIncome) * 100;
  const backEndDTI = ((totalMonthlyPayment + monthlyDebtPayments) / monthlyIncome) * 100;
  const paymentToIncomeRatio = (totalMonthlyPayment / monthlyIncome) * 100;
  const debtServiceCoverage = monthlyIncome / totalMonthlyPayment;
  
  // Calculate cash flow
  const monthlyCashFlow = monthlyIncome - totalMonthlyPayment - monthlyDebtPayments;
  const annualCashFlow = monthlyCashFlow * 12;
  
  // Calculate scores
  const affordabilityScore = calculateAffordabilityScore(
    monthlyIncome, frontEndDTI, backEndDTI, monthlyCashFlow, emergencyFund, totalMonthlyPayment
  );
  
  const riskScore = calculateRiskScore(
    frontEndDTI, backEndDTI, monthlyCashFlow, monthlyIncome, emergencyFund, 
    totalMonthlyPayment, creditScore
  );
  
  // Determine comfort level
  let comfortLevel = 'High';
  if (affordabilityScore < 60) comfortLevel = 'Low';
  else if (affordabilityScore < 80) comfortLevel = 'Medium';
  
  // Calculate recommended home price (80% of maximum for comfort)
  const recommendedHomePrice = maxHomePrice * 0.8;
  const recommendedDownPayment = recommendedHomePrice * (downPaymentPercent / 100);
  
  // Calculate emergency fund months
  const emergencyFundMonths = emergencyFund / totalMonthlyPayment;
  
  // Calculate tax benefits
  const annualInterest = monthlyPayment * 12;
  const annualPropertyTaxesTotal = monthlyPropertyTaxes * 12;
  const taxBenefits = (annualInterest + annualPropertyTaxesTotal) * (taxRate / 100);
  
  // Calculate break-even years (simplified)
  const breakEvenYears = Math.max(1, Math.round(5 + (riskScore / 20)));
  
  // Calculate total cost of ownership
  const totalCostOfOwnership = (totalMonthlyPayment * 12 * loanTerm) + downPayment;
  
  // Calculate equity build-up over 5 years
  const equityBuildUp = maxHomePrice * 0.15;
  
  // Calculate investment return
  const investmentReturn = 3 + (equityBuildUp / maxHomePrice) * 100;
  
  // Determine recommended action
  let recommendedAction = 'Proceed with purchase';
  if (affordabilityScore < 60) recommendedAction = 'Consider lower-priced home or increase down payment';
  else if (affordabilityScore < 80) recommendedAction = 'Proceed with caution and build emergency fund';
  
  return {
    maxHomePrice: Math.round(maxHomePrice),
    maxLoanAmount: Math.round(maxLoanAmount),
    monthlyPayment: Math.round(monthlyPayment),
    monthlyPropertyTaxes: Math.round(monthlyPropertyTaxes),
    monthlyInsurance: Math.round(monthlyInsurance),
    monthlyPMI: Math.round(monthlyPMI),
    monthlyHoaFees: Math.round(monthlyHoaFees),
    monthlyUtilities: Math.round(monthlyUtilities),
    monthlyMaintenance: Math.round(monthlyMaintenance),
    totalMonthlyPayment: Math.round(totalMonthlyPayment),
    frontEndDTI: Math.round(frontEndDTI * 100) / 100,
    backEndDTI: Math.round(backEndDTI * 100) / 100,
    paymentToIncomeRatio: Math.round(paymentToIncomeRatio * 100) / 100,
    debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,
    affordabilityScore,
    riskScore,
    comfortLevel,
    recommendedHomePrice: Math.round(recommendedHomePrice),
    recommendedDownPayment: Math.round(recommendedDownPayment),
    monthlyCashFlow: Math.round(monthlyCashFlow),
    annualCashFlow: Math.round(annualCashFlow),
    emergencyFundMonths: Math.round(emergencyFundMonths * 100) / 100,
    taxBenefits: Math.round(taxBenefits),
    breakEvenYears,
    totalCostOfOwnership: Math.round(totalCostOfOwnership),
    equityBuildUp: Math.round(equityBuildUp),
    investmentReturn: Math.round(investmentReturn * 100) / 100,
    liquidityScore: Math.round(affordabilityScore * 0.8),
    flexibilityScore: Math.round(affordabilityScore * 0.9),
    stabilityScore: Math.round(affordabilityScore * 0.85),
    recommendedAction,
    homeAffordabilityAnalysis: 'Comprehensive home affordability analysis completed'
  };
}

export function generateHomeAffordabilityAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Home Affordability Analysis

## Summary
Based on your financial profile, you can afford a home up to **$${outputs.maxHomePrice.toLocaleString()}** with a recommended purchase price of **$${outputs.recommendedHomePrice.toLocaleString()}**.

## Key Metrics
- **Maximum Home Price:** $${outputs.maxHomePrice.toLocaleString()}
- **Maximum Loan Amount:** $${outputs.maxLoanAmount.toLocaleString()}
- **Total Monthly Payment:** $${outputs.totalMonthlyPayment.toLocaleString()}
- **Front-End DTI:** ${outputs.frontEndDTI}%
- **Back-End DTI:** ${outputs.backEndDTI}%
- **Affordability Score:** ${outputs.affordabilityScore}/100
- **Risk Score:** ${outputs.riskScore}/100

## Recommendations
**${outputs.recommendedAction}**

## Next Steps
1. Review your emergency fund adequacy
2. Consider increasing your down payment if possible
3. Shop for competitive interest rates
4. Factor in closing costs and moving expenses
5. Plan for ongoing maintenance and utility costs`;
}
