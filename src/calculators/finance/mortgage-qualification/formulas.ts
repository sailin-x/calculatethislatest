import { MortgageQualificationInputs } from './validation';

export interface QualificationResult {
  qualified: boolean;
  maxLoanAmount: number;
  maxHomePrice: number;
  frontEndRatio: number;
  backEndRatio: number;
  monthlyPayment: number;
  qualificationMethod: string;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  loanOptions: {
    conventional: boolean;
    fha: boolean;
    va: boolean;
    usda: boolean;
  };
  qualificationAnalysis: {
    incomeAnalysis: string;
    debtAnalysis: string;
    creditAnalysis: string;
    downPaymentAnalysis: string;
    riskFactors: string[];
  };
}

export const calculateMortgageQualification = (inputs: MortgageQualificationInputs): QualificationResult => {
  const {
    annualIncome,
    monthlyIncome,
    downPayment,
    propertyPrice,
    interestRate,
    loanTerm,
    loanType,
    creditScore,
    monthlyDebts,
    propertyTax,
    homeInsurance,
    hoa,
    pmi,
    closingCosts,
    cashReserves,
    employmentType,
    employmentLength,
    debtTypes,
    bankruptcyHistory,
    foreclosureHistory,
    coBorrowerIncome,
    coBorrowerDebts,
    coBorrowerCreditScore,
    includePropertyTax,
    includeHomeInsurance,
    includeHOA,
    includePMI,
    includeClosingCosts,
    qualificationMethod,
    customFrontEndRatio,
    customBackEndRatio
  } = inputs;

  // Calculate total monthly income
  const totalMonthlyIncome = (monthlyIncome || annualIncome / 12) + (coBorrowerIncome || 0);

  // Calculate loan amount
  const loanAmount = propertyPrice - downPayment;

  // Calculate monthly P&I payment
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  const monthlyPIPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);

  // Calculate total monthly payment
  const totalMonthlyPayment = monthlyPIPayment +
    (includePropertyTax ? propertyTax / 12 : 0) +
    (includeHomeInsurance ? homeInsurance / 12 : 0) +
    (includeHOA ? hoa : 0) +
    (includePMI ? pmi : 0);

  // Calculate total monthly debts
  const totalMonthlyDebts = monthlyDebts + (coBorrowerDebts || 0);

  // Calculate ratios
  const frontEndRatio = totalMonthlyPayment / totalMonthlyIncome;
  const backEndRatio = (totalMonthlyPayment + totalMonthlyDebts) / totalMonthlyIncome;

  // Determine qualification ratios based on method and loan type
  let maxFrontEndRatio: number;
  let maxBackEndRatio: number;

  if (qualificationMethod === 'custom') {
    maxFrontEndRatio = customFrontEndRatio / 100;
    maxBackEndRatio = customBackEndRatio / 100;
  } else {
    switch (loanType) {
      case 'conventional':
        maxFrontEndRatio = 0.28;
        maxBackEndRatio = 0.36;
        break;
      case 'fha':
        maxFrontEndRatio = 0.31;
        maxBackEndRatio = 0.43;
        break;
      case 'va':
        maxFrontEndRatio = 0.41;
        maxBackEndRatio = 0.41;
        break;
      case 'usda':
        maxFrontEndRatio = 0.29;
        maxBackEndRatio = 0.41;
        break;
      default:
        maxFrontEndRatio = 0.28;
        maxBackEndRatio = 0.36;
    }
  }

  // Check qualification
  const frontEndQualified = frontEndRatio <= maxFrontEndRatio;
  const backEndQualified = backEndRatio <= maxBackEndRatio;

  // Calculate maximum loan amount based on income
  const maxLoanByFrontEnd = (totalMonthlyIncome * maxFrontEndRatio - 
    (includePropertyTax ? propertyTax / 12 : 0) -
    (includeHomeInsurance ? homeInsurance / 12 : 0) -
    (includeHOA ? hoa : 0) -
    (includePMI ? pmi : 0)) * 
    (Math.pow(1 + monthlyRate, totalPayments) - 1) / 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments));

  const maxLoanByBackEnd = ((totalMonthlyIncome * maxBackEndRatio - totalMonthlyDebts) - 
    (includePropertyTax ? propertyTax / 12 : 0) -
    (includeHomeInsurance ? homeInsurance / 12 : 0) -
    (includeHOA ? hoa : 0) -
    (includePMI ? pmi : 0)) * 
    (Math.pow(1 + monthlyRate, totalPayments) - 1) / 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments));

  const maxLoanAmount = Math.min(maxLoanByFrontEnd, maxLoanByBackEnd);
  const maxHomePrice = maxLoanAmount + downPayment;

  // Determine qualification status
  const qualified = frontEndQualified && backEndQualified && maxLoanAmount >= loanAmount;

  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  if (frontEndRatio > maxFrontEndRatio * 0.9 || backEndRatio > maxBackEndRatio * 0.9) {
    riskLevel = 'medium';
  }
  if (frontEndRatio > maxFrontEndRatio || backEndRatio > maxBackEndRatio) {
    riskLevel = 'high';
  }
  if (creditScore < 620 || bankruptcyHistory || foreclosureHistory) {
    riskLevel = 'high';
  }

  // Generate recommendations
  const recommendations: string[] = [];
  
  if (!frontEndQualified) {
    recommendations.push(`Reduce housing costs or increase income to meet front-end ratio requirement (${(maxFrontEndRatio * 100).toFixed(1)}%)`);
  }
  
  if (!backEndQualified) {
    recommendations.push(`Reduce total debt or increase income to meet back-end ratio requirement (${(maxBackEndRatio * 100).toFixed(1)}%)`);
  }
  
  if (creditScore < 620) {
    recommendations.push('Improve credit score to at least 620 for better loan options');
  }
  
  if (downPayment < propertyPrice * 0.2) {
    recommendations.push('Consider increasing down payment to 20% to avoid PMI');
  }
  
  if (cashReserves < totalMonthlyPayment * 3) {
    recommendations.push('Build emergency fund of at least 3 months of housing payments');
  }

  // Determine available loan options
  const loanOptions = {
    conventional: creditScore >= 620 && downPayment >= propertyPrice * 0.05,
    fha: creditScore >= 580 && downPayment >= propertyPrice * 0.035,
    va: false, // Would need VA eligibility check
    usda: false // Would need USDA eligibility check
  };

  // Generate qualification analysis
  const qualificationAnalysis = {
    incomeAnalysis: `Total monthly income: $${totalMonthlyIncome.toLocaleString()}. ${totalMonthlyIncome >= 5000 ? 'Strong income level.' : 'Consider increasing income for better qualification.'}`,
    debtAnalysis: `Total monthly debts: $${totalMonthlyDebts.toLocaleString()}. ${totalMonthlyDebts / totalMonthlyIncome < 0.1 ? 'Low debt burden.' : 'High debt burden may limit qualification.'}`,
    creditAnalysis: `Credit score: ${creditScore}. ${creditScore >= 740 ? 'Excellent credit.' : creditScore >= 670 ? 'Good credit.' : creditScore >= 580 ? 'Fair credit.' : 'Poor credit may limit loan options.'}`,
    downPaymentAnalysis: `Down payment: $${downPayment.toLocaleString()} (${((downPayment / propertyPrice) * 100).toFixed(1)}%). ${downPayment >= propertyPrice * 0.2 ? 'Sufficient for conventional loan without PMI.' : 'Consider larger down payment to avoid PMI.'}`,
    riskFactors: []
  };

  if (bankruptcyHistory) {
    qualificationAnalysis.riskFactors.push('Recent bankruptcy history');
  }
  if (foreclosureHistory) {
    qualificationAnalysis.riskFactors.push('Previous foreclosure');
  }
  if (employmentLength < 2) {
    qualificationAnalysis.riskFactors.push('Short employment history');
  }
  if (cashReserves < totalMonthlyPayment * 2) {
    qualificationAnalysis.riskFactors.push('Limited cash reserves');
  }

  return {
    qualified,
    maxLoanAmount,
    maxHomePrice,
    frontEndRatio,
    backEndRatio,
    monthlyPayment: totalMonthlyPayment,
    qualificationMethod,
    riskLevel,
    recommendations,
    loanOptions,
    qualificationAnalysis
  };
};

export const generateMortgageQualificationAnalysis = (inputs: MortgageQualificationInputs, outputs: QualificationResult): string => {
  const { propertyPrice, loanType, creditScore } = inputs;
  const { qualified, maxHomePrice, frontEndRatio, backEndRatio, riskLevel, recommendations } = outputs;

  let analysis = `## Mortgage Qualification Analysis\n\n`;

  // Qualification Status
  analysis += `### Qualification Status\n`;
  analysis += `**Status:** ${qualified ? '✅ QUALIFIED' : '❌ NOT QUALIFIED'}\n\n`;

  // Key Metrics
  analysis += `### Key Metrics\n`;
  analysis += `- **Front-End Ratio:** ${(frontEndRatio * 100).toFixed(1)}%\n`;
  analysis += `- **Back-End Ratio:** ${(backEndRatio * 100).toFixed(1)}%\n`;
  analysis += `- **Maximum Home Price:** $${maxHomePrice.toLocaleString()}\n`;
  analysis += `- **Risk Level:** ${riskLevel.toUpperCase()}\n\n`;

  // Property Analysis
  analysis += `### Property Analysis\n`;
  analysis += `- **Target Property Price:** $${propertyPrice.toLocaleString()}\n`;
  analysis += `- **Price vs. Maximum:** ${propertyPrice <= maxHomePrice ? 'Within budget' : 'Exceeds maximum'}\n`;
  analysis += `- **Loan Type:** ${loanType.toUpperCase()}\n`;
  analysis += `- **Credit Score:** ${creditScore}\n\n`;

  // Recommendations
  if (recommendations.length > 0) {
    analysis += `### Recommendations\n`;
    recommendations.forEach((rec, index) => {
      analysis += `${index + 1}. ${rec}\n`;
    });
    analysis += `\n`;
  }

  // Risk Assessment
  analysis += `### Risk Assessment\n`;
  switch (riskLevel) {
    case 'low':
      analysis += `**Low Risk:** Strong qualification profile with good income, credit, and debt ratios.\n`;
      break;
    case 'medium':
      analysis += `**Medium Risk:** Some qualification concerns that should be addressed before proceeding.\n`;
      break;
    case 'high':
      analysis += `**High Risk:** Significant qualification challenges that require immediate attention.\n`;
      break;
  }

  return analysis;
};