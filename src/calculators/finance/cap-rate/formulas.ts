interface CapRateMetrics {
  capRate: number;
  noi: number;
  cashOnCashReturn: number;
  totalReturn: number;
}

interface NOIBreakdown {
  effectiveGrossIncome: number;
  totalExpenses: number;
  vacancyLoss: number;
  operatingExpenseRatio: number;
}

interface InvestmentAnalysis {
  marketComparison: string;
  investmentGrade: string;
  riskAssessment: string;
  breakEvenAnalysis: string;
  sensitivityAnalysis: string;
}

/**
 * Calculate cap rate and related metrics
 */
export function calculateCapRate(inputs: Record<string, any>): CapRateMetrics {
  const {
    propertyValue,
    grossRent,
    vacancyRate = 5.0,
    propertyTax = 0,
    insurance = 0,
    utilities = 0,
    maintenance = 0,
    propertyManagement = 8.0,
    hoaFees = 0,
    otherExpenses = 0
  } = inputs;

  // Calculate effective gross income
  const vacancyLoss = grossRent * (vacancyRate / 100);
  const effectiveGrossIncome = grossRent - vacancyLoss;
  
  // Calculate total operating expenses
  const propertyManagementFee = effectiveGrossIncome * (propertyManagement / 100);
  const totalExpenses = propertyTax + insurance + utilities + maintenance + 
    propertyManagementFee + hoaFees + otherExpenses;
  
  // Calculate NOI
  const noi = effectiveGrossIncome - totalExpenses;
  
  // Calculate cap rate
  const capRate = (noi / propertyValue) * 100;
  
  // Calculate cash-on-cash return (assuming 20% down payment)
  const downPayment = propertyValue * 0.2;
  const cashOnCashReturn = (noi / downPayment) * 100;
  
  // Calculate total return (including appreciation assumption)
  const annualAppreciation = propertyValue * 0.03; // 3% annual appreciation
  const totalReturn = ((noi + annualAppreciation) / propertyValue) * 100;
  
  return {
    capRate,
    noi,
    cashOnCashReturn,
    totalReturn
  };
}

/**
 * Calculate detailed NOI breakdown
 */
export function calculateNOI(inputs: Record<string, any>): NOIBreakdown {
  const {
    grossRent,
    vacancyRate = 5.0,
    propertyTax = 0,
    insurance = 0,
    utilities = 0,
    maintenance = 0,
    propertyManagement = 8.0,
    hoaFees = 0,
    otherExpenses = 0
  } = inputs;

  // Calculate vacancy loss
  const vacancyLoss = grossRent * (vacancyRate / 100);
  
  // Calculate effective gross income
  const effectiveGrossIncome = grossRent - vacancyLoss;
  
  // Calculate property management fee
  const propertyManagementFee = effectiveGrossIncome * (propertyManagement / 100);
  
  // Calculate total expenses
  const totalExpenses = propertyTax + insurance + utilities + maintenance + 
    propertyManagementFee + hoaFees + otherExpenses;
  
  // Calculate operating expense ratio
  const operatingExpenseRatio = (totalExpenses / effectiveGrossIncome) * 100;
  
  return {
    effectiveGrossIncome,
    totalExpenses,
    vacancyLoss,
    operatingExpenseRatio
  };
}

/**
 * Generate comprehensive investment analysis
 */
export function generateInvestmentAnalysis(inputs: Record<string, any>, capRateMetrics: CapRateMetrics): InvestmentAnalysis {
  const { propertyType, location, propertyAge, propertyCondition, marketCapRate } = inputs;
  
  // Market comparison
  const marketComparison = generateMarketComparison(capRateMetrics.capRate, marketCapRate, propertyType, location);
  
  // Investment grade assessment
  const investmentGrade = generateInvestmentGrade(capRateMetrics.capRate, capRateMetrics.operatingExpenseRatio);
  
  // Risk assessment
  const riskAssessment = generateRiskAssessment(inputs, capRateMetrics);
  
  // Break-even analysis
  const breakEvenAnalysis = generateBreakEvenAnalysis(inputs, capRateMetrics);
  
  // Sensitivity analysis
  const sensitivityAnalysis = generateSensitivityAnalysis(inputs, capRateMetrics);
  
  return {
    marketComparison,
    investmentGrade,
    riskAssessment,
    breakEvenAnalysis,
    sensitivityAnalysis
  };
}

/**
 * Generate market comparison analysis
 */
function generateMarketComparison(capRate: number, marketCapRate: number, propertyType: string, location: string): string {
  let comparison = '';
  
  if (marketCapRate && marketCapRate > 0) {
    const difference = capRate - marketCapRate;
    const percentageDiff = (difference / marketCapRate) * 100;
    
    if (Math.abs(percentageDiff) < 5) {
      comparison = `Cap rate of ${capRate.toFixed(1)}% is in line with market average of ${marketCapRate.toFixed(1)}% for ${propertyType} properties in ${location} markets.`;
    } else if (difference > 0) {
      comparison = `Cap rate of ${capRate.toFixed(1)}% is ${percentageDiff.toFixed(1)}% higher than market average of ${marketCapRate.toFixed(1)}%, indicating potentially better returns or higher risk.`;
    } else {
      comparison = `Cap rate of ${capRate.toFixed(1)}% is ${Math.abs(percentageDiff).toFixed(1)}% lower than market average of ${marketCapRate.toFixed(1)}%, indicating potentially lower returns or lower risk.`;
    }
  } else {
    comparison = `Cap rate of ${capRate.toFixed(1)}% for ${propertyType} property in ${location} market. Compare with local market data for assessment.`;
  }
  
  return comparison;
}

/**
 * Generate investment grade assessment
 */
function generateInvestmentGrade(capRate: number, operatingExpenseRatio: number): string {
  let grade = '';
  
  if (capRate >= 8.0) {
    grade = 'A+ - Excellent investment with high returns';
  } else if (capRate >= 6.5) {
    grade = 'A - Strong investment with good returns';
  } else if (capRate >= 5.5) {
    grade = 'B+ - Good investment with solid returns';
  } else if (capRate >= 4.5) {
    grade = 'B - Average investment with moderate returns';
  } else if (capRate >= 3.5) {
    grade = 'C+ - Below average returns, consider carefully';
  } else {
    grade = 'C - Low returns, high risk or overvalued property';
  }
  
  if (operatingExpenseRatio > 60) {
    grade += ' (High operating expenses may impact profitability)';
  } else if (operatingExpenseRatio < 30) {
    grade += ' (Low operating expenses enhance profitability)';
  }
  
  return grade;
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(inputs: Record<string, any>, capRateMetrics: CapRateMetrics): string {
  const risks: string[] = [];
  
  // Vacancy risk
  if (inputs.vacancyRate > 10) {
    risks.push('High vacancy rate increases income volatility');
  }
  
  // Property age risk
  if (inputs.propertyAge > 30) {
    risks.push('Older property may require increased maintenance costs');
  }
  
  // Property condition risk
  if (inputs.propertyCondition === 'poor' || inputs.propertyCondition === 'needs-rehab') {
    risks.push('Poor property condition may require significant capital expenditures');
  }
  
  // Location risk
  if (inputs.location === 'rural') {
    risks.push('Rural location may limit tenant pool and appreciation potential');
  }
  
  // Cap rate risk
  if (capRateMetrics.capRate < 4.0) {
    risks.push('Low cap rate may indicate overvaluation or low return potential');
  } else if (capRateMetrics.capRate > 10.0) {
    risks.push('Very high cap rate may indicate high-risk area or property issues');
  }
  
  if (risks.length === 0) {
    risks.push('Standard real estate investment risks apply');
  }
  
  return `Risk Factors: ${risks.join(', ')}. Consider market conditions, property condition, and local economic factors.`;
}

/**
 * Generate break-even analysis
 */
function generateBreakEvenAnalysis(inputs: Record<string, any>, capRateMetrics: CapRateMetrics): string {
  const { propertyValue, grossRent } = inputs;
  
  // Calculate break-even point
  const noi = capRateMetrics.noi;
  const annualAppreciation = propertyValue * 0.03; // 3% appreciation
  const totalAnnualReturn = noi + annualAppreciation;
  
  // Years to break even on property value
  const yearsToBreakEven = propertyValue / totalAnnualReturn;
  
  // Cash flow break-even (assuming 20% down payment)
  const downPayment = propertyValue * 0.2;
  const monthlyNOI = noi / 12;
  const monthlyBreakEven = downPayment / (monthlyNOI * 12);
  
  return `Break-even Analysis: Property value break-even in ${yearsToBreakEven.toFixed(1)} years. Cash investment break-even in ${monthlyBreakEven.toFixed(1)} years. Annual cash flow: $${noi.toLocaleString()}.`;
}

/**
 * Generate sensitivity analysis
 */
function generateSensitivityAnalysis(inputs: Record<string, any>, capRateMetrics: CapRateMetrics): string {
  const { propertyValue, grossRent, vacancyRate = 5.0 } = inputs;
  
  // Calculate impact of 10% changes in key variables
  const baseCapRate = capRateMetrics.capRate;
  
  // 10% increase in property value
  const newValue = propertyValue * 1.1;
  const newCapRateValue = (capRateMetrics.noi / newValue) * 100;
  const valueImpact = ((newCapRateValue - baseCapRate) / baseCapRate) * 100;
  
  // 10% increase in gross rent
  const newRent = grossRent * 1.1;
  const newVacancyLoss = newRent * (vacancyRate / 100);
  const newEffectiveIncome = newRent - newVacancyLoss;
  const newNOI = newEffectiveIncome - (capRateMetrics.noi - (grossRent - grossRent * (vacancyRate / 100)));
  const newCapRateRent = (newNOI / propertyValue) * 100;
  const rentImpact = ((newCapRateRent - baseCapRate) / baseCapRate) * 100;
  
  return `Sensitivity Analysis: 10% increase in property value reduces cap rate by ${Math.abs(valueImpact).toFixed(1)}%. 10% increase in gross rent improves cap rate by ${rentImpact.toFixed(1)}%. Monitor market conditions and rental rates.`;
}
