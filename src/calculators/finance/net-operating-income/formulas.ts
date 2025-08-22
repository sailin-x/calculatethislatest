import { NetOperatingIncomeInputs } from './validation';

export interface NOIResult {
  netOperatingIncome: number;
  grossOperatingIncome: number;
  totalOperatingExpenses: number;
  operatingExpenseRatio: number;
  capRate: number;
  incomeBreakdown: {
    grossRentalIncome: number;
    otherIncome: number;
    totalGrossIncome: number;
    vacancyLoss: number;
    concessions: number;
    totalDeductions: number;
  };
  expenseBreakdown: {
    propertyTax: number;
    insurance: number;
    utilities: number;
    maintenance: number;
    propertyManagement: number;
    landscaping: number;
    janitorial: number;
    security: number;
    advertising: number;
    legal: number;
    accounting: number;
    licenses: number;
    supplies: number;
    trash: number;
    snowRemoval: number;
    pool: number;
    elevator: number;
    parking: number;
    roofing: number;
    hvac: number;
    pestControl: number;
    reserves: number;
    hoaFees: number;
    otherExpenses: number;
  };
  monthlyNOI: number;
  noiPerUnit: number;
  profitabilityAnalysis: {
    noiMargin: number;
    expenseEfficiency: number;
    incomeStability: number;
    cashFlowStrength: number;
  };
  expenseEfficiency: {
    expensePerUnit: number;
    expensePerSqFt: number;
    expenseRatio: number;
    efficiencyRating: string;
  };
  recommendations: string[];
  riskAssessment: {
    incomeRisks: string[];
    expenseRisks: string[];
    marketRisks: string[];
    overallRiskLevel: string;
  };
  comparisonMetrics: {
    noiPerSqFt: number;
    expensePerSqFt: number;
    incomePerUnit: number;
    marketComparison: string;
  };
}

export const calculateNetOperatingIncome = (inputs: NetOperatingIncomeInputs): NOIResult => {
  // Calculate income breakdown
  const grossRentalIncome = inputs.grossRentalIncome || 0;
  const otherIncome = inputs.otherIncome || 0;
  const totalGrossIncome = grossRentalIncome + otherIncome;
  
  const vacancyLoss = inputs.vacancyLoss || 0;
  const concessions = inputs.concessions || 0;
  const totalDeductions = vacancyLoss + concessions;
  
  const grossOperatingIncome = totalGrossIncome - totalDeductions;
  
  // Calculate expense breakdown
  const propertyTax = inputs.propertyTax || 0;
  const insurance = inputs.insurance || 0;
  const utilities = inputs.utilities || 0;
  const maintenance = inputs.maintenance || 0;
  const propertyManagement = inputs.propertyManagement || 0;
  const landscaping = inputs.landscaping || 0;
  const janitorial = inputs.janitorial || 0;
  const security = inputs.security || 0;
  const advertising = inputs.advertising || 0;
  const legal = inputs.legal || 0;
  const accounting = inputs.accounting || 0;
  const licenses = inputs.licenses || 0;
  const supplies = inputs.supplies || 0;
  const trash = inputs.trash || 0;
  const snowRemoval = inputs.snowRemoval || 0;
  const pool = inputs.pool || 0;
  const elevator = inputs.elevator || 0;
  const parking = inputs.parking || 0;
  const roofing = inputs.roofing || 0;
  const hvac = inputs.hvac || 0;
  const pestControl = inputs.pestControl || 0;
  const reserves = inputs.reserves || 0;
  const hoaFees = inputs.hoaFees || 0;
  
  const totalOperatingExpenses = propertyTax + insurance + utilities + maintenance + 
    propertyManagement + landscaping + janitorial + security + advertising + legal + 
    accounting + licenses + supplies + trash + snowRemoval + pool + elevator + parking + 
    roofing + hvac + pestControl + reserves + hoaFees;
  
  // Calculate NOI
  const netOperatingIncome = grossOperatingIncome - totalOperatingExpenses;
  
  // Calculate ratios
  const operatingExpenseRatio = totalGrossIncome > 0 ? (totalOperatingExpenses / totalGrossIncome) * 100 : 0;
  const capRate = inputs.propertyValue && inputs.propertyValue > 0 ? (netOperatingIncome / inputs.propertyValue) * 100 : 0;
  
  // Calculate monthly and per-unit metrics
  const monthlyNOI = netOperatingIncome / 12;
  const noiPerUnit = inputs.numberOfUnits && inputs.numberOfUnits > 0 ? netOperatingIncome / inputs.numberOfUnits : 0;
  
  // Calculate profitability analysis
  const noiMargin = totalGrossIncome > 0 ? (netOperatingIncome / totalGrossIncome) * 100 : 0;
  const expenseEfficiency = totalOperatingExpenses > 0 ? (grossOperatingIncome / totalOperatingExpenses) : 0;
  const incomeStability = totalGrossIncome > 0 ? ((totalGrossIncome - totalDeductions) / totalGrossIncome) * 100 : 0;
  const cashFlowStrength = totalOperatingExpenses > 0 ? (netOperatingIncome / totalOperatingExpenses) : 0;
  
  // Calculate expense efficiency metrics
  const expensePerUnit = inputs.numberOfUnits && inputs.numberOfUnits > 0 ? totalOperatingExpenses / inputs.numberOfUnits : 0;
  const expensePerSqFt = inputs.propertySize && inputs.propertySize > 0 ? totalOperatingExpenses / inputs.propertySize : 0;
  
  let efficiencyRating = 'Unknown';
  if (operatingExpenseRatio < 30) efficiencyRating = 'Excellent';
  else if (operatingExpenseRatio < 40) efficiencyRating = 'Good';
  else if (operatingExpenseRatio < 50) efficiencyRating = 'Average';
  else if (operatingExpenseRatio < 60) efficiencyRating = 'Below Average';
  else efficiencyRating = 'Poor';
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (operatingExpenseRatio > 50) {
    recommendations.push('Consider reducing operating expenses to improve NOI');
  }
  
  if (vacancyLoss > totalGrossIncome * 0.05) {
    recommendations.push('High vacancy loss - focus on tenant retention and marketing');
  }
  
  if (propertyManagement > totalGrossIncome * 0.1) {
    recommendations.push('Property management fees are high - consider self-management or renegotiate');
  }
  
  if (maintenance > totalGrossIncome * 0.08) {
    recommendations.push('Maintenance costs are elevated - implement preventive maintenance program');
  }
  
  if (capRate < 4) {
    recommendations.push('Low cap rate - consider property improvements or rent increases');
  }
  
  if (netOperatingIncome > 0) {
    recommendations.push('Positive NOI indicates good property performance');
  } else {
    recommendations.push('Negative NOI - immediate attention needed to improve income or reduce expenses');
  }
  
  // Risk assessment
  const incomeRisks: string[] = [];
  const expenseRisks: string[] = [];
  const marketRisks: string[] = [];
  
  if (vacancyLoss > totalGrossIncome * 0.1) {
    incomeRisks.push('High vacancy risk affecting income stability');
  }
  
  if (operatingExpenseRatio > 60) {
    expenseRisks.push('High operating expenses reducing profitability');
  }
  
  if (capRate < 3) {
    marketRisks.push('Low cap rate may indicate overvalued property');
  }
  
  if (netOperatingIncome < 0) {
    incomeRisks.push('Negative NOI indicates cash flow problems');
  }
  
  let overallRiskLevel = 'Low';
  if (incomeRisks.length + expenseRisks.length + marketRisks.length > 3) {
    overallRiskLevel = 'High';
  } else if (incomeRisks.length + expenseRisks.length + marketRisks.length > 1) {
    overallRiskLevel = 'Medium';
  }
  
  // Comparison metrics
  const noiPerSqFt = inputs.propertySize && inputs.propertySize > 0 ? netOperatingIncome / inputs.propertySize : 0;
  const incomePerUnit = inputs.numberOfUnits && inputs.numberOfUnits > 0 ? totalGrossIncome / inputs.numberOfUnits : 0;
  
  let marketComparison = 'Unknown';
  if (capRate > 8) marketComparison = 'Above Market';
  else if (capRate > 6) marketComparison = 'Market Rate';
  else if (capRate > 4) marketComparison = 'Below Market';
  else marketComparison = 'Significantly Below Market';
  
  return {
    netOperatingIncome,
    grossOperatingIncome,
    totalOperatingExpenses,
    operatingExpenseRatio,
    capRate,
    incomeBreakdown: {
      grossRentalIncome,
      otherIncome,
      totalGrossIncome,
      vacancyLoss,
      concessions,
      totalDeductions
    },
    expenseBreakdown: {
      propertyTax,
      insurance,
      utilities,
      maintenance,
      propertyManagement,
      landscaping,
      janitorial,
      security,
      advertising,
      legal,
      accounting,
      licenses,
      supplies,
      trash,
      snowRemoval,
      pool,
      elevator,
      parking,
      roofing,
      hvac,
      pestControl,
      reserves,
      hoaFees,
      otherExpenses: 0
    },
    monthlyNOI,
    noiPerUnit,
    profitabilityAnalysis: {
      noiMargin,
      expenseEfficiency,
      incomeStability,
      cashFlowStrength
    },
    expenseEfficiency: {
      expensePerUnit,
      expensePerSqFt,
      expenseRatio: operatingExpenseRatio,
      efficiencyRating
    },
    recommendations,
    riskAssessment: {
      incomeRisks,
      expenseRisks,
      marketRisks,
      overallRiskLevel
    },
    comparisonMetrics: {
      noiPerSqFt,
      expensePerSqFt,
      incomePerUnit,
      marketComparison
    }
  };
};

export const generateNetOperatingIncomeAnalysis = (inputs: NetOperatingIncomeInputs, outputs: NOIResult): string => {
  const analysis = `# Net Operating Income (NOI) Analysis

## Summary
**Net Operating Income:** $${outputs.netOperatingIncome.toLocaleString()}
**Gross Operating Income:** $${outputs.grossOperatingIncome.toLocaleString()}
**Total Operating Expenses:** $${outputs.totalOperatingExpenses.toLocaleString()}
**Operating Expense Ratio:** ${outputs.operatingExpenseRatio.toFixed(1)}%
**Capitalization Rate:** ${outputs.capRate.toFixed(2)}%

## Key Metrics
- **Monthly NOI:** $${outputs.monthlyNOI.toLocaleString()}
- **NOI per Unit:** $${outputs.noiPerUnit.toLocaleString()}
- **NOI Margin:** ${outputs.profitabilityAnalysis.noiMargin.toFixed(1)}%
- **Expense Efficiency:** ${outputs.profitabilityAnalysis.expenseEfficiency.toFixed(2)}

## Income Breakdown
- **Gross Rental Income:** $${outputs.incomeBreakdown.grossRentalIncome.toLocaleString()}
- **Other Income:** $${outputs.incomeBreakdown.otherIncome.toLocaleString()}
- **Total Gross Income:** $${outputs.incomeBreakdown.totalGrossIncome.toLocaleString()}
- **Vacancy Loss:** $${outputs.incomeBreakdown.vacancyLoss.toLocaleString()}
- **Rent Concessions:** $${outputs.incomeBreakdown.concessions.toLocaleString()}
- **Total Deductions:** $${outputs.incomeBreakdown.totalDeductions.toLocaleString()}

## Operating Expenses
- **Property Tax:** $${outputs.expenseBreakdown.propertyTax.toLocaleString()}
- **Insurance:** $${outputs.expenseBreakdown.insurance.toLocaleString()}
- **Utilities:** $${outputs.expenseBreakdown.utilities.toLocaleString()}
- **Maintenance & Repairs:** $${outputs.expenseBreakdown.maintenance.toLocaleString()}
- **Property Management:** $${outputs.expenseBreakdown.propertyManagement.toLocaleString()}
- **Landscaping:** $${outputs.expenseBreakdown.landscaping.toLocaleString()}
- **Janitorial Services:** $${outputs.expenseBreakdown.janitorial.toLocaleString()}
- **Security:** $${outputs.expenseBreakdown.security.toLocaleString()}
- **Advertising & Marketing:** $${outputs.expenseBreakdown.advertising.toLocaleString()}
- **Legal & Professional:** $${outputs.expenseBreakdown.legal.toLocaleString()}
- **Accounting:** $${outputs.expenseBreakdown.accounting.toLocaleString()}
- **Licenses & Permits:** $${outputs.expenseBreakdown.licenses.toLocaleString()}
- **Office Supplies:** $${outputs.expenseBreakdown.supplies.toLocaleString()}
- **Trash Removal:** $${outputs.expenseBreakdown.trash.toLocaleString()}
- **Snow Removal:** $${outputs.expenseBreakdown.snowRemoval.toLocaleString()}
- **Pool Maintenance:** $${outputs.expenseBreakdown.pool.toLocaleString()}
- **Elevator Maintenance:** $${outputs.expenseBreakdown.elevator.toLocaleString()}
- **Parking Maintenance:** $${outputs.expenseBreakdown.parking.toLocaleString()}
- **Roofing:** $${outputs.expenseBreakdown.roofing.toLocaleString()}
- **HVAC Maintenance:** $${outputs.expenseBreakdown.hvac.toLocaleString()}
- **Pest Control:** $${outputs.expenseBreakdown.pestControl.toLocaleString()}
- **Reserves:** $${outputs.expenseBreakdown.reserves.toLocaleString()}
- **HOA Fees:** $${outputs.expenseBreakdown.hoaFees.toLocaleString()}

## Profitability Analysis
- **NOI Margin:** ${outputs.profitabilityAnalysis.noiMargin.toFixed(1)}%
- **Expense Efficiency:** ${outputs.profitabilityAnalysis.expenseEfficiency.toFixed(2)}
- **Income Stability:** ${outputs.profitabilityAnalysis.incomeStability.toFixed(1)}%
- **Cash Flow Strength:** ${outputs.profitabilityAnalysis.cashFlowStrength.toFixed(2)}

## Expense Efficiency
- **Expense per Unit:** $${outputs.expenseEfficiency.expensePerUnit.toLocaleString()}
- **Expense per Sq Ft:** $${outputs.expenseEfficiency.expensePerSqFt.toFixed(2)}
- **Expense Ratio:** ${outputs.expenseEfficiency.expenseRatio.toFixed(1)}%
- **Efficiency Rating:** ${outputs.expenseEfficiency.efficiencyRating}

## Risk Assessment
**Overall Risk Level:** ${outputs.riskAssessment.overallRiskLevel}

### Income Risks
${outputs.riskAssessment.incomeRisks.length > 0 ? outputs.riskAssessment.incomeRisks.map(risk => `- ${risk}`).join('\n') : '- No significant income risks identified'}

### Expense Risks
${outputs.riskAssessment.expenseRisks.length > 0 ? outputs.riskAssessment.expenseRisks.map(risk => `- ${risk}`).join('\n') : '- No significant expense risks identified'}

### Market Risks
${outputs.riskAssessment.marketRisks.length > 0 ? outputs.riskAssessment.marketRisks.map(risk => `- ${risk}`).join('\n') : '- No significant market risks identified'}

## Comparison Metrics
- **NOI per Sq Ft:** $${outputs.comparisonMetrics.noiPerSqFt.toFixed(2)}
- **Expense per Sq Ft:** $${outputs.comparisonMetrics.expensePerSqFt.toFixed(2)}
- **Income per Unit:** $${outputs.comparisonMetrics.incomePerUnit.toLocaleString()}
- **Market Comparison:** ${outputs.comparisonMetrics.marketComparison}

## Recommendations
${outputs.recommendations.map(rec => `- ${rec}`).join('\n')}

## Property Details
- **Property Value:** ${inputs.propertyValue ? `$${inputs.propertyValue.toLocaleString()}` : 'Not specified'}
- **Analysis Period:** ${inputs.analysisPeriod || 1} year(s)
- **Number of Units:** ${inputs.numberOfUnits || 'Not specified'}
- **Property Size:** ${inputs.propertySize ? `${inputs.propertySize.toLocaleString()} sq ft` : 'Not specified'}

---
*This analysis provides a comprehensive view of the property's operating performance and financial health.*`;

  return analysis;
};