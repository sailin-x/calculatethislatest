import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Calculate monthly interest payment on outstanding balance
function calculateMonthlyInterest(outstandingBalance: number, interestRate: number): number {
  return (outstandingBalance * interestRate / 100) / 12;
}

// Calculate total interest cost over construction period
function calculateTotalInterest(loanAmount: number, interestRate: number, constructionPeriod: number, drawSchedule: string): number {
  const monthlyRate = interestRate / 100 / 12;
  let totalInterest = 0;
  
  // Calculate draw amounts based on schedule
  const drawAmounts = calculateDrawAmounts(loanAmount, constructionPeriod, drawSchedule);
  
  // Calculate interest on each draw
  for (let month = 0; month < constructionPeriod; month++) {
    const outstandingBalance = drawAmounts.slice(0, month + 1).reduce((sum, amount) => sum + amount, 0);
    totalInterest += calculateMonthlyInterest(outstandingBalance, interestRate);
  }
  
  return totalInterest;
}

// Calculate draw amounts based on schedule
function calculateDrawAmounts(loanAmount: number, constructionPeriod: number, drawSchedule: string): number[] {
  const draws: number[] = [];
  
  switch (drawSchedule) {
    case 'monthly':
      const monthlyDraw = loanAmount / constructionPeriod;
      for (let i = 0; i < constructionPeriod; i++) {
        draws.push(monthlyDraw);
      }
      break;
    case 'bi-monthly':
      const biMonthlyDraw = loanAmount / (constructionPeriod * 2);
      for (let i = 0; i < constructionPeriod * 2; i++) {
        draws.push(biMonthlyDraw);
      }
      break;
    case 'quarterly':
      const quarterlyDraw = loanAmount / Math.ceil(constructionPeriod / 3);
      for (let i = 0; i < Math.ceil(constructionPeriod / 3); i++) {
        draws.push(quarterlyDraw);
      }
      break;
    case 'milestone':
      // Milestone-based draws (front-loaded)
      const milestoneDraws = [0.3, 0.25, 0.25, 0.2]; // 30%, 25%, 25%, 20%
      for (let i = 0; i < constructionPeriod; i++) {
        const milestoneIndex = Math.min(Math.floor(i / (constructionPeriod / 4)), 3);
        draws.push(loanAmount * milestoneDraws[milestoneIndex] / (constructionPeriod / 4));
      }
      break;
    default:
      // Default to monthly
      const defaultDraw = loanAmount / constructionPeriod;
      for (let i = 0; i < constructionPeriod; i++) {
        draws.push(defaultDraw);
      }
  }
  
  return draws;
}

// Calculate loan fees
function calculateLoanFees(loanAmount: number, originationFee: number, appraisalFee: number, legalFee: number, titleFee: number, inspectionFee: number): number {
  const originationFeeAmount = (loanAmount * originationFee / 100);
  return originationFeeAmount + appraisalFee + legalFee + titleFee + inspectionFee;
}

// Calculate funding gap
function calculateFundingGap(projectCost: number, loanAmount: number, equityContribution: number): number {
  return Math.max(0, projectCost - loanAmount - equityContribution);
}

// Calculate equity required
function calculateEquityRequired(projectCost: number, loanAmount: number): number {
  return Math.max(0, projectCost - loanAmount);
}

// Calculate loan-to-cost ratio
function calculateLoanToCostRatio(loanAmount: number, projectCost: number): number {
  return (loanAmount / projectCost) * 100;
}

// Calculate loan-to-value ratio
function calculateLoanToValueRatio(loanAmount: number, completionValue: number): number {
  return (loanAmount / completionValue) * 100;
}

// Calculate profit margin
function calculateProfitMargin(completionValue: number, projectCost: number): number {
  return ((completionValue - projectCost) / projectCost) * 100;
}

// Calculate return on investment
function calculateROI(completionValue: number, projectCost: number, equityContribution: number): number {
  if (equityContribution === 0) return 0;
  return ((completionValue - projectCost) / equityContribution) * 100;
}

// Calculate break-even point
function calculateBreakEvenPoint(projectCost: number, completionValue: number, constructionPeriod: number): number {
  const monthlyProfit = (completionValue - projectCost) / constructionPeriod;
  if (monthlyProfit <= 0) return constructionPeriod;
  return projectCost / monthlyProfit;
}

// Generate draw schedule
function generateDrawSchedule(loanAmount: number, constructionPeriod: number, drawSchedule: string, startDate: string): any[] {
  const draws: any[] = [];
  const drawAmounts = calculateDrawAmounts(loanAmount, constructionPeriod, drawSchedule);
  const startDateObj = new Date(startDate);
  
  for (let i = 0; i < drawAmounts.length; i++) {
    const drawDate = new Date(startDateObj);
    drawDate.setMonth(drawDate.getMonth() + i);
    
    draws.push({
      drawNumber: i + 1,
      date: drawDate.toISOString().split('T')[0],
      amount: Math.round(drawAmounts[i]),
      cumulativeAmount: Math.round(drawAmounts.slice(0, i + 1).reduce((sum, amount) => sum + amount, 0))
    });
  }
  
  return draws;
}

// Generate cash flow analysis
function generateCashFlowAnalysis(inputs: CalculatorInputs, totalInterest: number): any[] {
  const cashFlow: any[] = [];
  const constructionPeriod = inputs.constructionPeriod as number;
  const loanAmount = inputs.loanAmount as number;
  const drawAmounts = calculateDrawAmounts(loanAmount, constructionPeriod, inputs.drawSchedule as string);
  
  for (let month = 0; month < constructionPeriod; month++) {
    const drawAmount = drawAmounts[month] || 0;
    const monthlyInterest = calculateMonthlyInterest(
      drawAmounts.slice(0, month + 1).reduce((sum, amount) => sum + amount, 0),
      inputs.interestRate as number
    );
    
    cashFlow.push({
      month: month + 1,
      drawAmount: Math.round(drawAmount),
      interestPayment: Math.round(monthlyInterest),
      cumulativeDraws: Math.round(drawAmounts.slice(0, month + 1).reduce((sum, amount) => sum + amount, 0)),
      cumulativeInterest: Math.round(monthlyInterest * (month + 1))
    });
  }
  
  return cashFlow;
}

// Generate risk analysis
function generateRiskAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): any {
  const risks: any[] = [];
  
  // Funding gap risk
  if (outputs.fundingGap > 0) {
    risks.push({
      type: 'funding-gap',
      severity: 'high',
      description: `Funding gap of $${outputs.fundingGap.toLocaleString()} needs to be addressed`,
      mitigation: 'Increase equity contribution or reduce project scope'
    });
  }
  
  // Interest reserve risk
  if (outputs.interestReserveNeeded > 0) {
    risks.push({
      type: 'interest-reserve',
      severity: 'medium',
      description: `Additional interest reserve of $${outputs.interestReserveNeeded.toLocaleString()} needed`,
      mitigation: 'Increase interest reserve or extend construction timeline'
    });
  }
  
  // LTC ratio risk
  if (outputs.loanToCostRatio > (inputs.loanToCost as number)) {
    risks.push({
      type: 'ltc-ratio',
      severity: 'high',
      description: `Actual LTC ratio (${outputs.loanToCostRatio.toFixed(1)}%) exceeds maximum (${inputs.loanToCost}%)`,
      mitigation: 'Reduce loan amount or increase project costs'
    });
  }
  
  // LTV ratio risk
  if (outputs.loanToValueRatio > (inputs.loanToValue as number)) {
    risks.push({
      type: 'ltv-ratio',
      severity: 'high',
      description: `Actual LTV ratio (${outputs.loanToValueRatio.toFixed(1)}%) exceeds maximum (${inputs.loanToValue}%)`,
      mitigation: 'Reduce loan amount or increase completion value'
    });
  }
  
  // Profit margin risk
  if (outputs.profitMargin < 10) {
    risks.push({
      type: 'profit-margin',
      severity: 'medium',
      description: `Low profit margin of ${outputs.profitMargin.toFixed(1)}%`,
      mitigation: 'Optimize costs or increase completion value'
    });
  }
  
  return {
    risks,
    riskScore: risks.length,
    overallRisk: risks.length === 0 ? 'low' : risks.length <= 2 ? 'medium' : 'high'
  };
}

export function calculateConstructionLoan(inputs: CalculatorInputs): CalculatorOutputs {
  const loanAmount = inputs.loanAmount as number;
  const interestRate = inputs.interestRate as number;
  const constructionPeriod = inputs.constructionPeriod as number;
  const projectCost = inputs.projectCost as number;
  const equityContribution = inputs.equityContribution as number;
  const interestReserve = inputs.interestReserve as number;
  const completionValue = inputs.completionValue as number;
  const drawSchedule = inputs.drawSchedule as string;
  const originationFee = inputs.originationFee as number;
  const appraisalFee = inputs.appraisalFee as number;
  const legalFee = inputs.legalFee as number;
  const titleFee = inputs.titleFee as number;
  const inspectionFee = inputs.inspectionFee as number;
  const startDate = inputs.constructionStartDate as string;
  
  // Calculate key metrics
  const totalInterest = calculateTotalInterest(loanAmount, interestRate, constructionPeriod, drawSchedule);
  const interestReserveNeeded = Math.max(0, totalInterest - interestReserve);
  const loanFees = calculateLoanFees(loanAmount, originationFee, appraisalFee, legalFee, titleFee, inspectionFee);
  const totalLoanCost = loanAmount + totalInterest + loanFees;
  const fundingGap = calculateFundingGap(projectCost, loanAmount, equityContribution);
  const equityRequired = calculateEquityRequired(projectCost, loanAmount);
  const loanToCostRatio = calculateLoanToCostRatio(loanAmount, projectCost);
  const loanToValueRatio = calculateLoanToValueRatio(loanAmount, completionValue);
  const profitMargin = calculateProfitMargin(completionValue, projectCost);
  const roi = calculateROI(completionValue, projectCost, equityContribution);
  const breakEvenPoint = calculateBreakEvenPoint(projectCost, completionValue, constructionPeriod);
  const monthlyDraws = loanAmount / constructionPeriod;
  
  // Generate detailed schedules
  const drawScheduleData = generateDrawSchedule(loanAmount, constructionPeriod, drawSchedule, startDate);
  const cashFlow = generateCashFlowAnalysis(inputs, totalInterest);
  const riskAnalysis = generateRiskAnalysis(inputs, {
    fundingGap,
    interestReserveNeeded,
    loanToCostRatio,
    loanToValueRatio,
    profitMargin
  } as CalculatorOutputs);
  
  return {
    monthlyInterest: Math.round(calculateMonthlyInterest(loanAmount, interestRate)),
    totalInterest: Math.round(totalInterest),
    interestReserveNeeded: Math.round(interestReserveNeeded),
    totalLoanCost: Math.round(totalLoanCost),
    loanFees: Math.round(loanFees),
    fundingGap: Math.round(fundingGap),
    equityRequired: Math.round(equityRequired),
    loanToCostRatio: Math.round(loanToCostRatio * 10) / 10,
    loanToValueRatio: Math.round(loanToValueRatio * 10) / 10,
    profitMargin: Math.round(profitMargin * 10) / 10,
    roi: Math.round(roi * 10) / 10,
    breakEvenPoint: Math.round(breakEvenPoint * 10) / 10,
    monthlyDraws: Math.round(monthlyDraws),
    drawSchedule: drawScheduleData,
    cashFlow,
    riskAnalysis,
    constructionLoanAnalysis: 'Comprehensive construction loan analysis completed'
  };
}

export function generateConstructionLoanAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const projectType = inputs.projectType;
  const loanAmount = inputs.loanAmount as number;
  const constructionPeriod = inputs.constructionPeriod as number;
  
  let analysis = `# Construction Loan Analysis - ${projectType.charAt(0).toUpperCase() + projectType.slice(1)} Project\n\n`;
  
  analysis += `## Loan Summary\n`;
  analysis += `- **Loan Amount:** $${loanAmount.toLocaleString()}\n`;
  analysis += `- **Construction Period:** ${constructionPeriod} months\n`;
  analysis += `- **Total Interest Cost:** $${outputs.totalInterest.toLocaleString()}\n`;
  analysis += `- **Total Loan Cost:** $${outputs.totalLoanCost.toLocaleString()}\n\n`;
  
  analysis += `## Financial Metrics\n`;
  analysis += `- **Loan-to-Cost Ratio:** ${outputs.loanToCostRatio}%\n`;
  analysis += `- **Loan-to-Value Ratio:** ${outputs.loanToValueRatio}%\n`;
  analysis += `- **Profit Margin:** ${outputs.profitMargin}%\n`;
  analysis += `- **Return on Investment:** ${outputs.roi}%\n`;
  analysis += `- **Break-Even Point:** ${outputs.breakEvenPoint} months\n\n`;
  
  analysis += `## Funding Analysis\n`;
  analysis += `- **Equity Required:** $${outputs.equityRequired.toLocaleString()}\n`;
  analysis += `- **Funding Gap:** $${outputs.fundingGap.toLocaleString()}\n`;
  analysis += `- **Interest Reserve Needed:** $${outputs.interestReserveNeeded.toLocaleString()}\n\n`;
  
  analysis += `## Risk Assessment\n`;
  analysis += `- **Overall Risk Level:** ${outputs.riskAnalysis.overallRisk.toUpperCase()}\n`;
  analysis += `- **Risk Score:** ${outputs.riskAnalysis.riskScore}/5\n\n`;
  
  if (outputs.riskAnalysis.risks.length > 0) {
    analysis += `### Risk Factors:\n`;
    outputs.riskAnalysis.risks.forEach((risk: any) => {
      analysis += `- **${risk.type.toUpperCase()}** (${risk.severity}): ${risk.description}\n`;
      analysis += `  - Mitigation: ${risk.mitigation}\n\n`;
    });
  }
  
  analysis += `## Recommendations\n`;
  
  if (outputs.fundingGap > 0) {
    analysis += `- Address funding gap of $${outputs.fundingGap.toLocaleString()}\n`;
  }
  
  if (outputs.interestReserveNeeded > 0) {
    analysis += `- Increase interest reserve by $${outputs.interestReserveNeeded.toLocaleString()}\n`;
  }
  
  if (outputs.loanToCostRatio > (inputs.loanToCost as number)) {
    analysis += `- Consider reducing loan amount or increasing project costs\n`;
  }
  
  if (outputs.profitMargin < 15) {
    analysis += `- Optimize project costs to improve profit margin\n`;
  }
  
  analysis += `\n## Project Feasibility\n`;
  
  if (outputs.riskAnalysis.overallRisk === 'low' && outputs.profitMargin > 15) {
    analysis += `✅ **HIGHLY FEASIBLE** - Project shows strong financial metrics with manageable risks.\n`;
  } else if (outputs.riskAnalysis.overallRisk === 'medium' && outputs.profitMargin > 10) {
    analysis += `⚠️ **MODERATELY FEASIBLE** - Project is viable but requires attention to identified risks.\n`;
  } else {
    analysis += `❌ **HIGH RISK** - Project requires significant modifications to be feasible.\n`;
  }
  
  return analysis;
}
