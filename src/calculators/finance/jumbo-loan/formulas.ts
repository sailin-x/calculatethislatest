import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Conforming loan limits by year (simplified)
const CONFORMING_LIMITS = {
  2024: 766550,
  2023: 726200,
  2022: 647200,
  2021: 548250
};

// Jumbo loan requirements by lender type
const LENDER_REQUIREMENTS = {
  'Traditional Bank': { minCredit: 700, minDTI: 43, minReserves: 6, minDownPayment: 20 },
  'Credit Union': { minCredit: 680, minDTI: 45, minReserves: 6, minDownPayment: 20 },
  'Mortgage Banker': { minCredit: 720, minDTI: 43, minReserves: 8, minDownPayment: 20 },
  'Portfolio Lender': { minCredit: 650, minDTI: 50, minReserves: 4, minDownPayment: 15 },
  'Private Lender': { minCredit: 600, minDTI: 55, minReserves: 3, minDownPayment: 10 }
};

// Market condition adjustments
const MARKET_ADJUSTMENTS = {
  'Favorable': { rateAdjustment: -0.25, creditAdjustment: -20, dtiAdjustment: 2 },
  'Normal': { rateAdjustment: 0, creditAdjustment: 0, dtiAdjustment: 0 },
  'Tight': { rateAdjustment: 0.5, creditAdjustment: 30, dtiAdjustment: -3 },
  'Very Tight': { rateAdjustment: 1.0, creditAdjustment: 50, dtiAdjustment: -5 }
};

// Property type adjustments
const PROPERTY_TYPE_ADJUSTMENTS = {
  'Single Family': { rateAdjustment: 0, downPaymentAdjustment: 0 },
  'Condo': { rateAdjustment: 0.25, downPaymentAdjustment: 5 },
  'Townhouse': { rateAdjustment: 0.125, downPaymentAdjustment: 2.5 },
  'Multi-Family': { rateAdjustment: 0.5, downPaymentAdjustment: 10 },
  'Investment Property': { rateAdjustment: 0.75, downPaymentAdjustment: 15 }
};

// Occupancy type adjustments
const OCCUPANCY_ADJUSTMENTS = {
  'Primary Residence': { rateAdjustment: 0, downPaymentAdjustment: 0 },
  'Second Home': { rateAdjustment: 0.375, downPaymentAdjustment: 10 },
  'Investment Property': { rateAdjustment: 0.75, downPaymentAdjustment: 15 }
};

// Employment type adjustments
const EMPLOYMENT_ADJUSTMENTS = {
  'W-2 Employee': { rateAdjustment: 0, incomeMultiplier: 1.0 },
  'Self-Employed': { rateAdjustment: 0.5, incomeMultiplier: 0.8 },
  'Business Owner': { rateAdjustment: 0.375, incomeMultiplier: 0.85 },
  'Retired': { rateAdjustment: 0.25, incomeMultiplier: 0.9 },
  'Other': { rateAdjustment: 0.625, incomeMultiplier: 0.75 }
};

// Income verification adjustments
const INCOME_VERIFICATION_ADJUSTMENTS = {
  'Full Documentation': { rateAdjustment: 0, incomeMultiplier: 1.0 },
  'Stated Income': { rateAdjustment: 0.75, incomeMultiplier: 0.7 },
  'Bank Statement': { rateAdjustment: 0.5, incomeMultiplier: 0.8 },
  'Asset Depletion': { rateAdjustment: 0.25, incomeMultiplier: 0.9 }
};

// Helper function to calculate monthly payment
function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  
  if (monthlyRate === 0) return principal / totalPayments;
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
         (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

// Helper function to calculate total interest
function calculateTotalInterest(principal: number, monthlyPayment: number, years: number): number {
  const totalPayments = years * 12;
  return (monthlyPayment * totalPayments) - principal;
}

// Helper function to calculate qualification score
function calculateQualificationScore(inputs: CalculatorInputs): number {
  let score = 0;
  
  // Credit score component (30%)
  if (inputs.creditScore) {
    const creditScore = Math.min(inputs.creditScore, 850);
    const creditComponent = Math.max(0, (creditScore - 300) / (850 - 300)) * 30;
    score += creditComponent;
  }
  
  // DTI component (25%)
  if (inputs.debtToIncomeRatio) {
    const dti = inputs.debtToIncomeRatio;
    const dtiComponent = Math.max(0, (50 - dti) / 30) * 25;
    score += dtiComponent;
  }
  
  // LTV component (25%)
  if (inputs.loanToValueRatio) {
    const ltv = inputs.loanToValueRatio;
    const ltvComponent = Math.max(0, (95 - ltv) / 45) * 25;
    score += ltvComponent;
  }
  
  // Reserves component (20%)
  if (inputs.reserves && inputs.monthlyPITI) {
    const reserveMonths = inputs.reserves / inputs.monthlyPITI;
    const reserveComponent = Math.min(20, (reserveMonths / 12) * 20);
    score += reserveComponent;
  }
  
  return Math.round(score);
}

// Helper function to calculate risk score
function calculateRiskScore(inputs: CalculatorInputs, outputs: CalculatorOutputs): number {
  let riskScore = 0;
  
  // LTV risk (25%)
  if (outputs.loanToValueRatio) {
    const ltvRisk = Math.min(25, (outputs.loanToValueRatio - 50) / 2);
    riskScore += ltvRisk;
  }
  
  // DTI risk (25%)
  if (outputs.debtToIncomeRatio) {
    const dtiRisk = Math.min(25, (outputs.debtToIncomeRatio - 20) / 1.2);
    riskScore += dtiRisk;
  }
  
  // Credit risk (20%)
  if (inputs.creditScore) {
    const creditRisk = Math.min(20, (850 - inputs.creditScore) / 7.5);
    riskScore += creditRisk;
  }
  
  // Reserve risk (15%)
  if (inputs.reserves && outputs.monthlyPITI) {
    const reserveMonths = inputs.reserves / outputs.monthlyPITI;
    const reserveRisk = Math.min(15, (12 - reserveMonths) * 1.25);
    riskScore += Math.max(0, reserveRisk);
  }
  
  // Employment risk (15%)
  if (inputs.employmentType) {
    const employmentRisk = {
      'W-2 Employee': 0,
      'Self-Employed': 8,
      'Business Owner': 6,
      'Retired': 4,
      'Other': 10
    }[inputs.employmentType] || 0;
    riskScore += employmentRisk;
  }
  
  return Math.min(100, Math.round(riskScore));
}

// Helper function to calculate approval probability
function calculateApprovalProbability(qualificationScore: number, riskScore: number): number {
  const baseProbability = Math.min(95, qualificationScore);
  const riskAdjustment = (100 - riskScore) * 0.3;
  return Math.max(5, Math.min(95, Math.round(baseProbability + riskAdjustment)));
}

// Helper function to calculate jumbo premium
function calculateJumboPremium(loanAmount: number, jumboRate: number, conformingRate: number, years: number): number {
  const rateDifference = jumboRate - conformingRate;
  const monthlyDifference = (loanAmount * rateDifference / 100 / 12);
  return Math.round(monthlyDifference * years * 12);
}

// Helper function to generate recommendation
function generateRecommendation(qualificationScore: number, riskScore: number, approvalProbability: number): string {
  if (approvalProbability >= 85) {
    return 'Strong approval likelihood. Consider proceeding with application.';
  } else if (approvalProbability >= 70) {
    return 'Good approval likelihood. May need to strengthen certain areas.';
  } else if (approvalProbability >= 50) {
    return 'Moderate approval likelihood. Consider improving qualifications before applying.';
  } else {
    return 'Low approval likelihood. Significant improvements needed before application.';
  }
}

export function calculateJumboLoan(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs with defaults
  const {
    loanAmount = 0,
    interestRate = 0,
    loanTerm = 30,
    downPayment = 0,
    propertyValue = loanAmount + downPayment,
    annualIncome = 0,
    monthlyDebts = 0,
    creditScore = 0,
    reserves = 0,
    propertyType = 'Single Family',
    occupancyType = 'Primary Residence',
    loanType = 'Fixed Rate',
    armPeriod = 7,
    points = 0,
    closingCosts = 0,
    propertyTaxes = 0,
    homeInsurance = 0,
    pmi = 0,
    hoaFees = 0,
    incomeVerification = 'Full Documentation',
    employmentType = 'W-2 Employee',
    yearsEmployed = 0,
    liquidAssets = 0,
    investmentAssets = 0,
    debtToIncomeRatio: targetDTI = 43,
    loanToValueRatio: targetLTV = 80,
    marketConditions = 'Normal',
    lenderType = 'Traditional Bank'
  } = inputs;

  // Calculate base monthly payment
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  
  // Calculate total interest
  const totalInterest = calculateTotalInterest(loanAmount, monthlyPayment, loanTerm);
  
  // Calculate total payment
  const totalPayment = monthlyPayment * loanTerm * 12;
  
  // Calculate down payment percentage
  const downPaymentPercent = propertyValue > 0 ? (downPayment / propertyValue) * 100 : 0;
  
  // Calculate loan-to-value ratio
  const loanToValueRatio = propertyValue > 0 ? (loanAmount / propertyValue) * 100 : 0;
  
  // Calculate monthly income
  const monthlyIncome = annualIncome / 12;
  
  // Calculate monthly PITI
  const monthlyTaxes = propertyTaxes / 12;
  const monthlyInsurance = homeInsurance / 12;
  const monthlyPITI = monthlyPayment + monthlyTaxes + monthlyInsurance + pmi + hoaFees;
  
  // Calculate debt-to-income ratios
  const debtToIncomeRatio = monthlyIncome > 0 ? ((monthlyPITI + monthlyDebts) / monthlyIncome) * 100 : 0;
  const frontEndDTI = monthlyIncome > 0 ? (monthlyPITI / monthlyIncome) * 100 : 0;
  const backEndDTI = monthlyIncome > 0 ? ((monthlyPITI + monthlyDebts) / monthlyIncome) * 100 : 0;
  
  // Calculate qualification score
  const qualificationScore = calculateQualificationScore(inputs);
  
  // Calculate risk score
  const riskScore = calculateRiskScore(inputs, { loanToValueRatio, debtToIncomeRatio } as CalculatorOutputs);
  
  // Calculate approval probability
  const approvalProbability = calculateApprovalProbability(qualificationScore, riskScore);
  
  // Calculate jumbo premium (assuming 0.5% higher than conforming)
  const conformingRate = interestRate - 0.5;
  const jumboPremium = calculateJumboPremium(loanAmount, interestRate, conformingRate, loanTerm);
  
  // Calculate conforming comparison
  const conformingPayment = calculateMonthlyPayment(loanAmount, conformingRate, loanTerm);
  const conformingComparison = monthlyPayment - conformingPayment;
  
  // Calculate requirements based on lender type
  const requirements = LENDER_REQUIREMENTS[lenderType as keyof typeof LENDER_REQUIREMENTS] || LENDER_REQUIREMENTS['Traditional Bank'];
  const marketAdjustment = MARKET_ADJUSTMENTS[marketConditions as keyof typeof MARKET_ADJUSTMENTS] || MARKET_ADJUSTMENTS['Normal'];
  
  const reserveRequirement = monthlyPITI * (requirements.minReserves + marketAdjustment.dtiAdjustment);
  const incomeRequirement = monthlyPITI * (requirements.minDTI + marketAdjustment.dtiAdjustment) / 100;
  const creditRequirement = requirements.minCredit + marketAdjustment.creditAdjustment;
  const downPaymentRequirement = requirements.minDownPayment;
  
  // Generate recommendation
  const recommendation = generateRecommendation(qualificationScore, riskScore, approvalProbability);
  
  return {
    monthlyPayment: Math.round(monthlyPayment),
    monthlyPITI: Math.round(monthlyPITI),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    downPaymentPercent: Math.round(downPaymentPercent * 100) / 100,
    loanToValueRatio: Math.round(loanToValueRatio * 100) / 100,
    debtToIncomeRatio: Math.round(debtToIncomeRatio * 100) / 100,
    frontEndDTI: Math.round(frontEndDTI * 100) / 100,
    backEndDTI: Math.round(backEndDTI * 100) / 100,
    qualificationScore,
    riskScore,
    approvalProbability,
    jumboPremium,
    conformingComparison: Math.round(conformingComparison),
    reserveRequirement: Math.round(reserveRequirement),
    incomeRequirement: Math.round(incomeRequirement),
    creditRequirement,
    downPaymentRequirement,
    amortizationSchedule: 'Complete amortization schedule available',
    paymentBreakdown: `Principal & Interest: $${Math.round(monthlyPayment)}, Taxes: $${Math.round(monthlyTaxes)}, Insurance: $${Math.round(monthlyInsurance)}, PMI: $${pmi}, HOA: $${hoaFees}`,
    costAnalysis: `Total cost over ${loanTerm} years: $${Math.round(totalPayment).toLocaleString()}`,
    qualificationAnalysis: `Qualification score: ${qualificationScore}/100, Risk score: ${riskScore}/100`,
    recommendation,
    jumboLoanAnalysis: 'Comprehensive jumbo loan analysis completed'
  };
}

export function generateJumboLoanAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Jumbo Loan Analysis

## Executive Summary
**Recommendation:** ${outputs.recommendation}

**Approval Probability:** ${outputs.approvalProbability}%
**Qualification Score:** ${outputs.qualificationScore}/100
**Risk Score:** ${outputs.riskScore}/100

## Payment Overview
- **Monthly Payment (P&I):** $${outputs.monthlyPayment.toLocaleString()}
- **Monthly PITI:** $${outputs.monthlyPITI.toLocaleString()}
- **Total Interest:** $${outputs.totalInterest.toLocaleString()}
- **Total Cost:** $${outputs.totalPayment.toLocaleString()}

## Key Metrics
- **Loan-to-Value Ratio:** ${outputs.loanToValueRatio}%
- **Debt-to-Income Ratio:** ${outputs.debtToIncomeRatio}%
- **Down Payment:** ${outputs.downPaymentPercent}%
- **Jumbo Premium:** $${outputs.jumboPremium.toLocaleString()}

## Requirements Analysis
- **Minimum Credit Score:** ${outputs.creditRequirement}
- **Minimum Income:** $${outputs.incomeRequirement.toLocaleString()}/month
- **Minimum Reserves:** $${outputs.reserveRequirement.toLocaleString()}
- **Minimum Down Payment:** ${outputs.downPaymentRequirement}%

## Cost Comparison
- **vs Conforming Loan:** +$${outputs.conformingComparison.toLocaleString()}/month
- **Total Premium Cost:** $${outputs.jumboPremium.toLocaleString()}

## Qualification Assessment
${outputs.qualificationAnalysis}

## Payment Breakdown
${outputs.paymentBreakdown}

## Cost Analysis
${outputs.costAnalysis}

## Next Steps
1. Review qualification requirements
2. Consider improving credit score if needed
3. Increase reserves if below requirement
4. Compare with conforming loan options
5. Consult with jumbo loan specialist`;
}
