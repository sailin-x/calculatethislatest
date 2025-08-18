import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// FHA loan limits by state (2024 - simplified for calculator)
const FHA_LOAN_LIMITS = {
  'AL': 472030, 'AK': 472030, 'AZ': 472030, 'AR': 472030, 'CA': 1152000,
  'CO': 472030, 'CT': 472030, 'DE': 472030, 'FL': 472030, 'GA': 472030,
  'HI': 1152000, 'ID': 472030, 'IL': 472030, 'IN': 472030, 'IA': 472030,
  'KS': 472030, 'KY': 472030, 'LA': 472030, 'ME': 472030, 'MD': 472030,
  'MA': 472030, 'MI': 472030, 'MN': 472030, 'MS': 472030, 'MO': 472030,
  'MT': 472030, 'NE': 472030, 'NV': 472030, 'NH': 472030, 'NJ': 472030,
  'NM': 472030, 'NY': 472030, 'NC': 472030, 'ND': 472030, 'OH': 472030,
  'OK': 472030, 'OR': 472030, 'PA': 472030, 'RI': 472030, 'SC': 472030,
  'SD': 472030, 'TN': 472030, 'TX': 472030, 'UT': 472030, 'VT': 472030,
  'VA': 472030, 'WA': 472030, 'WV': 472030, 'WI': 472030, 'WY': 472030
};

// MIP rates based on down payment and loan term
const MIP_RATES = {
  upfront: {
    '15': 0.015, // 1.5% for 15-year loans
    '30': 0.0175 // 1.75% for 30-year loans
  },
  annual: {
    '15': {
      '3.5': 0.0045, // 0.45% for 15-year loans with 3.5% down
      '5': 0.0045,   // 0.45% for 15-year loans with 5% down
      '10': 0.0045   // 0.45% for 15-year loans with 10% down
    },
    '30': {
      '3.5': 0.0085, // 0.85% for 30-year loans with 3.5% down
      '5': 0.0085,   // 0.85% for 30-year loans with 5% down
      '10': 0.0085   // 0.85% for 30-year loans with 10% down
    }
  }
};

// Credit score factors for eligibility
const CREDIT_SCORE_FACTORS = {
  'excellent': { min: 760, factor: 1.0 },
  'very-good': { min: 700, factor: 0.95 },
  'good': { min: 680, factor: 0.90 },
  'fair': { min: 640, factor: 0.85 },
  'poor': { min: 580, factor: 0.75 },
  'very-poor': { min: 500, factor: 0.60 }
};

// Property type factors
const PROPERTY_TYPE_FACTORS = {
  'single-family': 1.0,
  'duplex': 1.05,
  'triplex': 1.10,
  'fourplex': 1.15,
  'condo': 0.95,
  'townhouse': 1.0,
  'manufactured': 0.90
};

// Occupancy type factors
const OCCUPANCY_FACTORS = {
  'primary-residence': 1.0,
  'secondary-home': 0.85,
  'investment': 0.75
};

function calculateMonthlyPayment(loanAmount: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
         (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

function getCreditScoreCategory(creditScore: number): string {
  if (creditScore >= 760) return 'excellent';
  if (creditScore >= 700) return 'very-good';
  if (creditScore >= 680) return 'good';
  if (creditScore >= 640) return 'fair';
  if (creditScore >= 580) return 'poor';
  return 'very-poor';
}

function calculateMIPRates(downPaymentPercentage: number, loanTerm: number): { upfront: number; annual: number } {
  const termKey = loanTerm.toString();
  const downPaymentKey = downPaymentPercentage >= 10 ? '10' : 
                        downPaymentPercentage >= 5 ? '5' : '3.5';
  
  const upfrontRate = MIP_RATES.upfront[termKey as keyof typeof MIP_RATES.upfront] || 0.0175;
  const annualRate = MIP_RATES.annual[termKey as keyof typeof MIP_RATES.annual]?.[downPaymentKey as keyof typeof MIP_RATES.annual['30']] || 0.0085;
  
  return { upfront: upfrontRate, annual: annualRate };
}

function calculateEligibilityScore(inputs: CalculatorInputs): number {
  let score = 50; // Base score
  
  // Credit score factor
  const creditScore = Number(inputs.creditScore);
  const creditCategory = getCreditScoreCategory(creditScore);
  const creditFactor = CREDIT_SCORE_FACTORS[creditCategory as keyof typeof CREDIT_SCORE_FACTORS]?.factor || 0.75;
  score += creditFactor * 20;
  
  // Debt-to-income ratio factor
  const annualIncome = Number(inputs.annualIncome);
  const monthlyIncome = annualIncome / 12;
  const monthlyDebt = Number(inputs.monthlyDebt);
  const homePrice = Number(inputs.homePrice);
  const downPayment = Number(inputs.downPayment);
  const loanAmount = homePrice - downPayment;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, Number(inputs.interestRate), Number(inputs.loanTerm));
  const propertyTaxes = Number(inputs.propertyTaxes);
  const homeInsurance = Number(inputs.homeInsurance);
  const hoaFees = Number(inputs.hoaFees) || 0;
  const floodInsurance = Number(inputs.floodInsurance) || 0;
  
  const totalMonthlyPayment = monthlyPayment + (propertyTaxes / 12) + (homeInsurance / 12) + hoaFees + (floodInsurance / 12);
  const dti = ((monthlyDebt + totalMonthlyPayment) / monthlyIncome) * 100;
  
  if (dti <= 31) score += 20;
  else if (dti <= 43) score += 15;
  else if (dti <= 50) score += 10;
  else if (dti <= 56.99) score += 5;
  else score -= 10;
  
  // Down payment factor
  const downPaymentPercentage = (downPayment / homePrice) * 100;
  if (downPaymentPercentage >= 10) score += 15;
  else if (downPaymentPercentage >= 5) score += 10;
  else if (downPaymentPercentage >= 3.5) score += 5;
  else score -= 10;
  
  // Property type factor
  const propertyFactor = PROPERTY_TYPE_FACTORS[inputs.propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
  score += (propertyFactor - 1) * 10;
  
  // Occupancy factor
  const occupancyFactor = OCCUPANCY_FACTORS[inputs.occupancyType as keyof typeof OCCUPANCY_FACTORS] || 1.0;
  score += (occupancyFactor - 1) * 10;
  
  // Employment stability factor
  const employmentLength = Number(inputs.employmentLength) || 0;
  if (employmentLength >= 2) score += 10;
  else if (employmentLength >= 1) score += 5;
  else score -= 5;
  
  // Reserves factor
  const reserves = Number(inputs.reserves) || 0;
  const monthlyPaymentAmount = totalMonthlyPayment;
  if (reserves >= monthlyPaymentAmount * 6) score += 10;
  else if (reserves >= monthlyPaymentAmount * 3) score += 5;
  else score -= 5;
  
  // Clamp score between 0 and 100
  return Math.max(0, Math.min(100, score));
}

function calculateConventionalComparison(inputs: CalculatorInputs, fhaMonthlyPayment: number): { monthlySavings: number; totalSavings: number } {
  const homePrice = Number(inputs.homePrice);
  const downPayment = Number(inputs.downPayment);
  const downPaymentPercentage = (downPayment / homePrice) * 100;
  
  // Estimate conventional loan rate (typically 0.5-1% lower than FHA)
  const fhaRate = Number(inputs.interestRate);
  const conventionalRate = fhaRate - 0.75; // Assume 0.75% lower rate
  
  // Calculate conventional payment
  const loanAmount = homePrice - downPayment;
  const conventionalPayment = calculateMonthlyPayment(loanAmount, conventionalRate, Number(inputs.loanTerm));
  
  // Conventional loans typically require 20% down to avoid PMI
  // For comparison, assume 20% down payment scenario
  const conventionalDownPayment = homePrice * 0.20;
  const conventionalLoanAmount = homePrice - conventionalDownPayment;
  const conventionalPayment20Down = calculateMonthlyPayment(conventionalLoanAmount, conventionalRate, Number(inputs.loanTerm));
  
  const monthlySavings = fhaMonthlyPayment - conventionalPayment20Down;
  const totalSavings = monthlySavings * Number(inputs.loanTerm) * 12;
  
  return { monthlySavings, totalSavings };
}

function generateQualificationStatus(eligibilityScore: number, dti: number, creditScore: number): string {
  if (eligibilityScore >= 80 && dti <= 43 && creditScore >= 580) {
    return 'APPROVED - Excellent qualification profile';
  } else if (eligibilityScore >= 70 && dti <= 50 && creditScore >= 580) {
    return 'APPROVED - Good qualification profile';
  } else if (eligibilityScore >= 60 && dti <= 56.99 && creditScore >= 580) {
    return 'APPROVED - Acceptable qualification profile';
  } else if (eligibilityScore >= 50 && dti <= 56.99 && creditScore >= 500) {
    return 'CONDITIONAL APPROVAL - May require additional documentation';
  } else {
    return 'NOT QUALIFIED - Does not meet FHA requirements';
  }
}

function generateAmortizationSummary(loanAmount: number, interestRate: number, loanTerm: number): string {
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  const totalPayments = loanTerm * 12;
  const totalInterest = (monthlyPayment * totalPayments) - loanAmount;
  
  return `Loan amortizes over ${loanTerm} years with ${totalPayments} payments. ` +
         `Monthly payment: $${Math.round(monthlyPayment).toLocaleString()}. ` +
         `Total interest: $${Math.round(totalInterest).toLocaleString()}. ` +
         `Interest represents ${Math.round((totalInterest / (monthlyPayment * totalPayments)) * 100)}% of total payments.`;
}

export function calculateFHALoan(inputs: CalculatorInputs): CalculatorOutputs {
  const homePrice = Number(inputs.homePrice);
  const downPayment = Number(inputs.downPayment);
  const interestRate = Number(inputs.interestRate);
  const loanTerm = Number(inputs.loanTerm);
  const annualIncome = Number(inputs.annualIncome);
  const monthlyDebt = Number(inputs.monthlyDebt);
  const creditScore = Number(inputs.creditScore);
  const propertyTaxes = Number(inputs.propertyTaxes);
  const homeInsurance = Number(inputs.homeInsurance);
  const hoaFees = Number(inputs.hoaFees) || 0;
  const floodInsurance = Number(inputs.floodInsurance) || 0;
  
  // Calculate loan amount
  const loanAmount = homePrice - downPayment;
  const downPaymentPercentage = (downPayment / homePrice) * 100;
  
  // Calculate monthly payment
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  
  // Calculate MIP rates and costs
  const mipRates = calculateMIPRates(downPaymentPercentage, loanTerm);
  const upfrontMIP = loanAmount * mipRates.upfront;
  const monthlyMIP = (loanAmount * mipRates.annual) / 12;
  
  // Calculate monthly costs
  const monthlyTaxes = propertyTaxes / 12;
  const monthlyInsurance = homeInsurance / 12;
  const monthlyFloodInsurance = floodInsurance / 12;
  
  // Calculate total monthly payment
  const totalMonthlyPayment = monthlyPayment + monthlyMIP + monthlyTaxes + monthlyInsurance + monthlyFloodInsurance + hoaFees;
  
  // Calculate debt-to-income ratios
  const monthlyIncome = annualIncome / 12;
  const frontEndDTI = (totalMonthlyPayment / monthlyIncome) * 100;
  const backEndDTI = ((monthlyDebt + totalMonthlyPayment) / monthlyIncome) * 100;
  
  // Calculate loan-to-value ratio
  const loanToValueRatio = (loanAmount / homePrice) * 100;
  
  // Calculate total costs
  const totalPayments = loanTerm * 12;
  const totalInterest = (monthlyPayment * totalPayments) - loanAmount;
  const totalMIPCost = monthlyMIP * totalPayments;
  const totalCost = totalInterest + totalMIPCost + upfrontMIP;
  
  // Calculate eligibility and qualification
  const eligibilityScore = calculateEligibilityScore(inputs);
  const qualificationStatus = generateQualificationStatus(eligibilityScore, backEndDTI, creditScore);
  
  // Calculate maximum loan amount for the state
  const maxLoanAmount = FHA_LOAN_LIMITS[inputs.state as keyof typeof FHA_LOAN_LIMITS] || 472030;
  
  // Calculate minimum down payment
  const minDownPayment = homePrice * 0.035; // 3.5% minimum for FHA
  
  // Calculate maximum home price based on income
  const maxDTI = 43; // FHA maximum DTI ratio
  const maxMonthlyPayment = (monthlyIncome * maxDTI / 100) - monthlyDebt;
  const maxLoanAmountByIncome = maxMonthlyPayment * ((1 - Math.pow(1 + interestRate / 100 / 12, -totalPayments)) / (interestRate / 100 / 12));
  const maxHomePrice = maxLoanAmountByIncome / (1 - 0.035); // Assuming 3.5% down payment
  
  // Calculate monthly income required
  const monthlyIncomeRequired = ((totalMonthlyPayment + monthlyDebt) / 43) * 100;
  
  // Calculate cash to close
  const closingCosts = Number(inputs.closingCosts) || 0;
  const prepaidItems = Number(inputs.prepaidItems) || 0;
  const sellerConcessions = Number(inputs.sellerConcessions) || 0;
  const lenderCredits = Number(inputs.lenderCredits) || 0;
  const cashToClose = downPayment + closingCosts + prepaidItems + upfrontMIP - sellerConcessions - lenderCredits;
  
  // Calculate conventional loan comparison
  const conventionalComparison = calculateConventionalComparison(inputs, totalMonthlyPayment);
  
  // Generate amortization summary
  const amortizationSchedule = generateAmortizationSummary(loanAmount, interestRate, loanTerm);
  
  return {
    loanAmount: Math.round(loanAmount),
    downPaymentPercentage: Math.round(downPaymentPercentage * 10) / 10,
    monthlyPayment: Math.round(monthlyPayment),
    monthlyMIP: Math.round(monthlyMIP),
    monthlyTaxes: Math.round(monthlyTaxes),
    monthlyInsurance: Math.round(monthlyInsurance),
    totalMonthlyPayment: Math.round(totalMonthlyPayment),
    debtToIncomeRatio: Math.round(backEndDTI * 10) / 10,
    frontEndDTI: Math.round(frontEndDTI * 10) / 10,
    backEndDTI: Math.round(backEndDTI * 10) / 10,
    loanToValueRatio: Math.round(loanToValueRatio * 10) / 10,
    upfrontMIP: Math.round(upfrontMIP),
    annualMIP: Math.round(mipRates.annual * 10000) / 100,
    totalMIPCost: Math.round(totalMIPCost),
    totalInterest: Math.round(totalInterest),
    totalCost: Math.round(totalCost),
    amortizationSchedule,
    eligibilityScore: Math.round(eligibilityScore),
    qualificationStatus,
    maxLoanAmount,
    minDownPayment: Math.round(minDownPayment),
    maxHomePrice: Math.round(maxHomePrice),
    monthlyIncomeRequired: Math.round(monthlyIncomeRequired),
    cashToClose: Math.round(cashToClose),
    monthlySavings: Math.round(conventionalComparison.monthlySavings),
    totalSavings: Math.round(conventionalComparison.totalSavings),
    fhaLoanAnalysis: 'Comprehensive FHA loan analysis completed'
  };
}

export function generateFHALoanAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const homePrice = Number(inputs.homePrice);
  const creditScore = Number(inputs.creditScore);
  const propertyType = inputs.propertyType;
  const occupancyType = inputs.occupancyType;
  
  let analysis = `# FHA Loan Analysis Report\n\n`;
  
  analysis += `## Loan Overview\n`;
  analysis += `- **Home Price**: $${homePrice.toLocaleString()}\n`;
  analysis += `- **Down Payment**: $${Number(inputs.downPayment).toLocaleString()} (${outputs.downPaymentPercentage}%)\n`;
  analysis += `- **Loan Amount**: $${outputs.loanAmount.toLocaleString()}\n`;
  analysis += `- **Interest Rate**: ${inputs.interestRate}%\n`;
  analysis += `- **Loan Term**: ${inputs.loanTerm} years\n`;
  analysis += `- **Property Type**: ${propertyType}\n`;
  analysis += `- **Occupancy**: ${occupancyType}\n\n`;
  
  analysis += `## Monthly Payment Breakdown\n`;
  analysis += `- **Principal & Interest**: $${outputs.monthlyPayment.toLocaleString()}\n`;
  analysis += `- **Monthly MIP**: $${outputs.monthlyMIP.toLocaleString()}\n`;
  analysis += `- **Property Taxes**: $${outputs.monthlyTaxes.toLocaleString()}\n`;
  analysis += `- **Home Insurance**: $${outputs.monthlyInsurance.toLocaleString()}\n`;
  analysis += `- **HOA Fees**: $${(Number(inputs.hoaFees) || 0).toLocaleString()}\n`;
  analysis += `- **Flood Insurance**: $${(Number(inputs.floodInsurance) || 0 / 12).toLocaleString()}\n`;
  analysis += `- **Total Monthly Payment**: $${outputs.totalMonthlyPayment.toLocaleString()}\n\n`;
  
  analysis += `## Qualification Analysis\n`;
  analysis += `- **Credit Score**: ${creditScore}\n`;
  analysis += `- **Front-End DTI**: ${outputs.frontEndDTI}%\n`;
  analysis += `- **Back-End DTI**: ${outputs.backEndDTI}%\n`;
  analysis += `- **Loan-to-Value Ratio**: ${outputs.loanToValueRatio}%\n`;
  analysis += `- **Eligibility Score**: ${outputs.eligibilityScore}/100\n`;
  analysis += `- **Qualification Status**: ${outputs.qualificationStatus}\n\n`;
  
  analysis += `## Mortgage Insurance (MIP)\n`;
  analysis += `- **Upfront MIP**: $${outputs.upfrontMIP.toLocaleString()}\n`;
  analysis += `- **Annual MIP Rate**: ${outputs.annualMIP}%\n`;
  analysis += `- **Monthly MIP**: $${outputs.monthlyMIP.toLocaleString()}\n`;
  analysis += `- **Total MIP Cost**: $${outputs.totalMIPCost.toLocaleString()}\n\n`;
  
  analysis += `## Cost Analysis\n`;
  analysis += `- **Total Interest**: $${outputs.totalInterest.toLocaleString()}\n`;
  analysis += `- **Total MIP**: $${outputs.totalMIPCost.toLocaleString()}\n`;
  analysis += `- **Total Cost**: $${outputs.totalCost.toLocaleString()}\n`;
  analysis += `- **Cash to Close**: $${outputs.cashToClose.toLocaleString()}\n\n`;
  
  analysis += `## Loan Limits & Requirements\n`;
  analysis += `- **Maximum Loan Amount**: $${outputs.maxLoanAmount.toLocaleString()}\n`;
  analysis += `- **Minimum Down Payment**: $${outputs.minDownPayment.toLocaleString()}\n`;
  analysis += `- **Maximum Home Price**: $${outputs.maxHomePrice.toLocaleString()}\n`;
  analysis += `- **Monthly Income Required**: $${outputs.monthlyIncomeRequired.toLocaleString()}\n\n`;
  
  analysis += `## Conventional Loan Comparison\n`;
  analysis += `- **Monthly Savings**: $${Math.abs(outputs.monthlySavings).toLocaleString()}\n`;
  analysis += `- **Total Savings**: $${Math.abs(outputs.totalSavings).toLocaleString()}\n`;
  if (outputs.monthlySavings > 0) {
    analysis += `- **Note**: FHA loan costs more than conventional loan\n\n`;
  } else {
    analysis += `- **Note**: FHA loan saves money compared to conventional loan\n\n`;
  }
  
  analysis += `## Amortization Summary\n`;
  analysis += `${outputs.amortizationSchedule}\n\n`;
  
  analysis += `## FHA Loan Benefits\n`;
  analysis += `- Lower down payment requirements (3.5% minimum)\n`;
  analysis += `- More flexible credit requirements\n`;
  analysis += `- Competitive interest rates\n`;
  analysis += `- Available for first-time homebuyers\n`;
  analysis += `- Can be used for various property types\n\n`;
  
  analysis += `## Important Considerations\n`;
  analysis += `- Mortgage insurance is required for the life of the loan\n`;
  analysis += `- Upfront MIP is typically financed into the loan\n`;
  analysis += `- Property must meet FHA minimum property standards\n`;
  analysis += `- Loan limits vary by location\n`;
  analysis += `- Must be owner-occupied for primary residence loans\n\n`;
  
  analysis += `## Next Steps\n`;
  if (outputs.qualificationStatus.includes('APPROVED')) {
    analysis += `1. Contact an FHA-approved lender\n`;
    analysis += `2. Complete loan application\n`;
    analysis += `3. Provide required documentation\n`;
    analysis += `4. Schedule property appraisal\n`;
    analysis += `5. Complete underwriting process\n`;
  } else {
    analysis += `1. Improve credit score if below 580\n`;
    analysis += `2. Reduce debt-to-income ratio\n`;
    analysis += `3. Increase down payment if possible\n`;
    analysis += `4. Consider alternative loan programs\n`;
    analysis += `5. Consult with a mortgage professional\n`;
  }
  
  return analysis;
}
