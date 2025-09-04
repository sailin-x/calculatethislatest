import { LoanToCostRatioInputs, LoanToCostRatioResults } from './types';

export function calculateLoanToCostRatio(inputs: LoanToCostRatioInputs): LoanToCostRatioResults {
  // Calculate total project cost
  const totalProjectCost = inputs.projectInformation.totalProjectCost;
  
  // Calculate LTC ratio
  const ltcRatio = (inputs.financingDetails.requestedLoanAmount / totalProjectCost) * 100;
  
  // Calculate equity requirement
  const equityRequirement = totalProjectCost - inputs.financingDetails.requestedLoanAmount;
  
  // Calculate loan payments
  const { monthlyPayment, totalInterest } = calculateLoanPayments(
    inputs.financingDetails.requestedLoanAmount,
    inputs.financingDetails.interestRate,
    inputs.financingDetails.loanTerm,
    inputs.financingDetails.interestOnlyPeriod
  );
  
  // Calculate total fees
  const totalFees = inputs.financingDetails.originationFee + inputs.financingDetails.otherFees;
  
  // Calculate break-even analysis
  const breakEvenAnalysis = calculateBreakEvenAnalysis(
    inputs.financingDetails.requestedLoanAmount,
    inputs.financingDetails.interestRate,
    inputs.marketAssumptions.projectedRentalIncome,
    inputs.marketAssumptions.projectedOperatingExpenses,
    inputs.projectTimeline.stabilizationPeriod
  );
  
  // Calculate risk assessment
  const riskAssessment = calculateRiskAssessment(inputs);
  
  // Calculate cash flow projections
  const cashFlowProjection = calculateCashFlowProjection(
    inputs,
    monthlyPayment,
    inputs.projectTimeline.constructionDuration + inputs.projectTimeline.stabilizationPeriod
  );
  
  // Calculate sensitivity analysis
  const sensitivityAnalysis = calculateSensitivityAnalysis(inputs, totalProjectCost);
  
  return {
    ltcRatio,
    loanAmount: inputs.financingDetails.requestedLoanAmount,
    totalProjectCost,
    equityRequirement,
    monthlyPayment,
    totalInterest,
    totalFees,
    breakEvenAnalysis,
    riskAssessment,
    cashFlowProjection,
    sensitivityAnalysis
  };
}

function calculateLoanPayments(
  loanAmount: number,
  interestRate: number,
  loanTerm: number,
  interestOnlyPeriod: number
): { monthlyPayment: number; totalInterest: number } {
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm;
  
  let totalInterest = 0;
  let monthlyPayment = 0;
  
  if (interestOnlyPeriod > 0) {
    // Interest-only period
    const interestOnlyPayment = loanAmount * monthlyRate;
    totalInterest += interestOnlyPayment * interestOnlyPeriod;
    
    // Remaining term with principal and interest
    const remainingTerm = totalPayments - interestOnlyPeriod;
    const remainingPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, remainingTerm)) / 
                            (Math.pow(1 + monthlyRate, remainingTerm) - 1);
    
    totalInterest += (remainingPayment * remainingTerm) - loanAmount;
    monthlyPayment = remainingPayment; // Use the higher payment for planning
  } else {
    // Standard amortization
    monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                     (Math.pow(1 + monthlyRate, totalPayments) - 1);
    totalInterest = (monthlyPayment * totalPayments) - loanAmount;
  }
  
  return { monthlyPayment, totalInterest };
}

function calculateBreakEvenAnalysis(
  loanAmount: number,
  interestRate: number,
  projectedRentalIncome: number,
  projectedOperatingExpenses: number,
  stabilizationPeriod: number
): {
  breakEvenRent: number;
  breakEvenOccupancy: number;
  breakEvenTimeline: number;
} {
  const annualInterest = loanAmount * (interestRate / 100);
  const annualOperatingExpenses = projectedOperatingExpenses;
  const totalAnnualExpenses = annualInterest + annualOperatingExpenses;
  
  // Break-even rent (assuming 100% occupancy)
  const breakEvenRent = totalAnnualExpenses;
  
  // Break-even occupancy (assuming projected rent)
  const breakEvenOccupancy = projectedRentalIncome > 0 ? 
    (totalAnnualExpenses / projectedRentalIncome) * 100 : 0;
  
  // Break-even timeline (months to reach positive cash flow)
  const monthlyNetIncome = (projectedRentalIncome - projectedOperatingExpenses) / 12;
  const monthlyInterest = annualInterest / 12;
  const monthlyNetCashFlow = monthlyNetIncome - monthlyInterest;
  
  const breakEvenTimeline = monthlyNetCashFlow > 0 ? 
    Math.ceil(loanAmount / monthlyNetCashFlow) : 
    stabilizationPeriod;
  
  return {
    breakEvenRent,
    breakEvenOccupancy: Math.min(breakEvenOccupancy, 100),
    breakEvenTimeline
  };
}

function calculateRiskAssessment(inputs: LoanToCostRatioInputs): {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: string[];
  recommendations: string[];
} {
  let riskScore = 0;
  const riskFactors: string[] = [];
  const recommendations: string[] = [];
  
  // LTC Ratio Risk (0-30 points)
  const ltcRatio = (inputs.financingDetails.requestedLoanAmount / inputs.projectInformation.totalProjectCost) * 100;
  if (ltcRatio > 85) {
    riskScore += 30;
    riskFactors.push('Very high LTC ratio (>85%)');
    recommendations.push('Consider reducing loan amount or increasing equity');
  } else if (ltcRatio > 75) {
    riskScore += 20;
    riskFactors.push('High LTC ratio (75-85%)');
    recommendations.push('Monitor project costs closely and maintain contingency reserves');
  } else if (ltcRatio > 65) {
    riskScore += 10;
    riskFactors.push('Moderate LTC ratio (65-75%)');
  }
  
  // Market Risk (0-25 points)
  if (inputs.riskFactors.marketRisk === 'high') {
    riskScore += 25;
    riskFactors.push('High market risk');
    recommendations.push('Consider delaying project or reducing exposure');
  } else if (inputs.riskFactors.marketRisk === 'medium') {
    riskScore += 15;
    riskFactors.push('Medium market risk');
    recommendations.push('Monitor market conditions and have contingency plans');
  }
  
  // Construction Risk (0-20 points)
  if (inputs.riskFactors.constructionRisk === 'high') {
    riskScore += 20;
    riskFactors.push('High construction risk');
    recommendations.push('Engage experienced contractors and increase contingency');
  } else if (inputs.riskFactors.constructionRisk === 'medium') {
    riskScore += 10;
    riskFactors.push('Medium construction risk');
  }
  
  // Leasing Risk (0-15 points)
  if (inputs.riskFactors.leasingRisk === 'high') {
    riskScore += 15;
    riskFactors.push('High leasing risk');
    recommendations.push('Focus on pre-leasing and market research');
  } else if (inputs.riskFactors.leasingRisk === 'medium') {
    riskScore += 8;
    riskFactors.push('Medium leasing risk');
  }
  
  // Interest Rate Risk (0-10 points)
  if (inputs.riskFactors.interestRateRisk === 'high') {
    riskScore += 10;
    riskFactors.push('High interest rate risk');
    recommendations.push('Consider interest rate hedging or shorter loan terms');
  } else if (inputs.riskFactors.interestRateRisk === 'medium') {
    riskScore += 5;
    riskFactors.push('Medium interest rate risk');
  }
  
  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high';
  if (riskScore <= 30) {
    riskLevel = 'low';
  } else if (riskScore <= 60) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'high';
  }
  
  // Add general recommendations based on risk level
  if (riskLevel === 'high') {
    recommendations.push('Consider reducing project scope or increasing equity contribution');
    recommendations.push('Implement comprehensive risk management strategies');
  } else if (riskLevel === 'medium') {
    recommendations.push('Maintain adequate contingency reserves');
    recommendations.push('Monitor key risk factors regularly');
  } else {
    recommendations.push('Proceed with standard project management practices');
  }
  
  return {
    riskScore,
    riskLevel,
    riskFactors,
    recommendations
  };
}

function calculateCashFlowProjection(
  inputs: LoanToCostRatioInputs,
  monthlyPayment: number,
  totalMonths: number
): {
  monthlyCashFlow: Array<{
    month: number;
    income: number;
    expenses: number;
    netCashFlow: number;
    cumulativeCashFlow: number;
  }>;
  annualCashFlow: Array<{
    year: number;
    income: number;
    expenses: number;
    netCashFlow: number;
    cumulativeCashFlow: number;
  }>;
  cumulativeCashFlow: number[];
} {
  const monthlyCashFlow: Array<{
    month: number;
    income: number;
    expenses: number;
    netCashFlow: number;
    cumulativeCashFlow: number;
  }> = [];
  
  const annualCashFlow: Array<{
    year: number;
    income: number;
    expenses: number;
    netCashFlow: number;
    cumulativeCashFlow: number;
  }> = [];
  
  const cumulativeCashFlow: number[] = [];
  
  let cumulative = 0;
  let annualIncome = 0;
  let annualExpenses = 0;
  let currentYear = 1;
  
  for (let month = 1; month <= totalMonths; month++) {
    // During construction, no income, only expenses
    const isConstructionPhase = month <= inputs.projectTimeline.constructionDuration;
    
    let monthlyIncome = 0;
    let monthlyExpenses = monthlyPayment; // Always have loan payment
    
    if (isConstructionPhase) {
      // Construction phase - additional construction costs
      monthlyExpenses += inputs.projectInformation.constructionCost / inputs.projectTimeline.constructionDuration;
    } else {
      // Stabilization phase - start generating income
      const stabilizationMonth = month - inputs.projectTimeline.constructionDuration;
      const occupancyRate = Math.min(stabilizationMonth / inputs.projectTimeline.stabilizationPeriod, 1);
      
      monthlyIncome = (inputs.marketAssumptions.projectedRentalIncome / 12) * occupancyRate;
      monthlyExpenses += (inputs.marketAssumptions.projectedOperatingExpenses / 12) * occupancyRate;
    }
    
    const netCashFlow = monthlyIncome - monthlyExpenses;
    cumulative += netCashFlow;
    
    monthlyCashFlow.push({
      month,
      income: monthlyIncome,
      expenses: monthlyExpenses,
      netCashFlow,
      cumulativeCashFlow: cumulative
    });
    
    cumulativeCashFlow.push(cumulative);
    
    // Track annual totals
    annualIncome += monthlyIncome;
    annualExpenses += monthlyExpenses;
    
    // Create annual summary
    if (month % 12 === 0 || month === totalMonths) {
      annualCashFlow.push({
        year: currentYear,
        income: annualIncome,
        expenses: annualExpenses,
        netCashFlow: annualIncome - annualExpenses,
        cumulativeCashFlow: cumulative
      });
      
      currentYear++;
      annualIncome = 0;
      annualExpenses = 0;
    }
  }
  
  return {
    monthlyCashFlow,
    annualCashFlow,
    cumulativeCashFlow
  };
}

function calculateSensitivityAnalysis(
  inputs: LoanToCostRatioInputs,
  totalProjectCost: number
): {
  scenarios: Array<{
    scenario: string;
    ltcRatio: number;
    loanAmount: number;
    equityRequirement: number;
    monthlyPayment: number;
    riskScore: number;
  }>;
  keyAssumptions: Array<{
    assumption: string;
    currentValue: number;
    impact: string;
  }>;
  riskMitigation: string[];
} {
  const scenarios = [
    {
      scenario: 'Base Case',
      ltcRatio: (inputs.financingDetails.requestedLoanAmount / totalProjectCost) * 100,
      loanAmount: inputs.financingDetails.requestedLoanAmount,
      equityRequirement: totalProjectCost - inputs.financingDetails.requestedLoanAmount,
      monthlyPayment: calculateLoanPayments(
        inputs.financingDetails.requestedLoanAmount,
        inputs.financingDetails.interestRate,
        inputs.financingDetails.loanTerm,
        inputs.financingDetails.interestOnlyPeriod
      ).monthlyPayment,
      riskScore: calculateRiskAssessment(inputs).riskScore
    },
    {
      scenario: 'Conservative (70% LTC)',
      ltcRatio: 70,
      loanAmount: totalProjectCost * 0.7,
      equityRequirement: totalProjectCost * 0.3,
      monthlyPayment: calculateLoanPayments(
        totalProjectCost * 0.7,
        inputs.financingDetails.interestRate,
        inputs.financingDetails.loanTerm,
        inputs.financingDetails.interestOnlyPeriod
      ).monthlyPayment,
      riskScore: Math.max(0, calculateRiskAssessment(inputs).riskScore - 20)
    },
    {
      scenario: 'Aggressive (85% LTC)',
      ltcRatio: 85,
      loanAmount: totalProjectCost * 0.85,
      equityRequirement: totalProjectCost * 0.15,
      monthlyPayment: calculateLoanPayments(
        totalProjectCost * 0.85,
        inputs.financingDetails.interestRate,
        inputs.financingDetails.loanTerm,
        inputs.financingDetails.interestOnlyPeriod
      ).monthlyPayment,
      riskScore: calculateRiskAssessment(inputs).riskScore + 25
    }
  ];
  
  const keyAssumptions = [
    {
      assumption: 'Interest Rate',
      currentValue: inputs.financingDetails.interestRate,
      impact: 'Higher rates increase monthly payments and total interest costs'
    },
    {
      assumption: 'Construction Duration',
      currentValue: inputs.projectTimeline.constructionDuration,
      impact: 'Longer construction increases interest costs and delays income generation'
    },
    {
      assumption: 'Market Growth Rate',
      currentValue: inputs.marketAssumptions.marketGrowthRate,
      impact: 'Lower growth reduces projected rental income and property value'
    },
    {
      assumption: 'Cap Rate',
      currentValue: inputs.marketAssumptions.capRate,
      impact: 'Higher cap rates reduce property value and refinancing options'
    }
  ];
  
  const riskMitigation = [
    'Maintain adequate contingency reserves (10-15% of total cost)',
    'Secure pre-leasing commitments before construction',
    'Use experienced contractors with proven track records',
    'Implement comprehensive project management and oversight',
    'Consider interest rate hedging strategies',
    'Maintain strong relationships with lenders and investors',
    'Regular monitoring of market conditions and project progress'
  ];
  
  return {
    scenarios,
    keyAssumptions,
    riskMitigation
  };
}
