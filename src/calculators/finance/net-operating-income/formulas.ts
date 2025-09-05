import { NetOperatingIncomeInputs, NetOperatingIncomeMetrics } from './types';

export function calculateNetOperatingIncome(inputs: NetOperatingIncomeInputs): NetOperatingIncomeMetrics {
  // Calculate total gross income
  const totalGrossIncome = calculateTotalGrossIncome(inputs);
  
  // Calculate vacancy and collection loss
  const vacancyLoss = calculateVacancyLoss(inputs, totalGrossIncome);
  const collectionLoss = calculateCollectionLoss(inputs, totalGrossIncome);
  const totalVacancyAndCollectionLoss = vacancyLoss + collectionLoss;
  
  // Calculate effective gross income
  const effectiveGrossIncome = totalGrossIncome - totalVacancyAndCollectionLoss;
  
  // Calculate total operating expenses
  const totalOperatingExpenses = calculateTotalOperatingExpenses(inputs);
  
  // Calculate net operating income
  const netOperatingIncome = effectiveGrossIncome - totalOperatingExpenses;
  
  // Calculate key ratios and metrics
  const noiMargin = (netOperatingIncome / totalGrossIncome) * 100;
  const expenseRatio = (totalOperatingExpenses / effectiveGrossIncome) * 100;
  const vacancyRate = (totalVacancyAndCollectionLoss / totalGrossIncome) * 100;
  
  // Calculate per unit metrics
  const noiPerUnit = inputs.numberOfUnits > 0 ? netOperatingIncome / inputs.numberOfUnits : 0;
  const grossIncomePerUnit = inputs.numberOfUnits > 0 ? totalGrossIncome / inputs.numberOfUnits : 0;
  const expensesPerUnit = inputs.numberOfUnits > 0 ? totalOperatingExpenses / inputs.numberOfUnits : 0;
  
  // Calculate per square foot metrics
  const noiPerSqFt = inputs.propertySize > 0 ? netOperatingIncome / inputs.propertySize : 0;
  const grossIncomePerSqFt = inputs.propertySize > 0 ? totalGrossIncome / inputs.propertySize : 0;
  const expensesPerSqFt = inputs.propertySize > 0 ? totalOperatingExpenses / inputs.propertySize : 0;
  
  // Calculate occupancy metrics
  const occupiedUnits = inputs.numberOfUnits * (inputs.occupancyRate / 100);
  const vacantUnits = inputs.numberOfUnits - occupiedUnits;
  const potentialRentalIncome = inputs.grossRentalIncome / (inputs.occupancyRate / 100);
  const lostRentalIncome = potentialRentalIncome - inputs.grossRentalIncome;
  
  // Calculate expense breakdown
  const expenseBreakdown = calculateExpenseBreakdown(inputs);
  
  // Calculate income breakdown
  const incomeBreakdown = calculateIncomeBreakdown(inputs);
  
  // Calculate market analysis
  const marketAnalysis = calculateMarketAnalysis(inputs, netOperatingIncome);
  
  // Calculate performance metrics
  const performanceMetrics = calculatePerformanceMetrics(inputs, netOperatingIncome, totalGrossIncome, totalOperatingExpenses);
  
  // Calculate trend analysis
  const trendAnalysis = calculateTrendAnalysis(inputs);
  
  // Calculate sensitivity analysis
  const sensitivityAnalysis = calculateSensitivityAnalysis(inputs);
  
  // Calculate benchmarking
  const benchmarking = calculateBenchmarking(inputs, netOperatingIncome, totalGrossIncome, totalOperatingExpenses);
  
  return {
    totalGrossIncome,
    vacancyLoss,
    collectionLoss,
    totalVacancyAndCollectionLoss,
    effectiveGrossIncome,
    totalOperatingExpenses,
    netOperatingIncome,
    noiMargin,
    expenseRatio,
    vacancyRate,
    noiPerUnit,
    grossIncomePerUnit,
    expensesPerUnit,
    noiPerSqFt,
    grossIncomePerSqFt,
    expensesPerSqFt,
    occupiedUnits,
    vacantUnits,
    potentialRentalIncome,
    lostRentalIncome,
    expenseBreakdown,
    incomeBreakdown,
    marketAnalysis,
    performanceMetrics,
    trendAnalysis,
    sensitivityAnalysis,
    benchmarking
  };
}

function calculateTotalGrossIncome(inputs: NetOperatingIncomeInputs): number {
  return inputs.grossRentalIncome + 
         inputs.otherIncome + 
         inputs.parkingIncome + 
         inputs.laundryIncome + 
         inputs.storageIncome + 
         inputs.amenityIncome + 
         inputs.lateFees + 
         inputs.applicationFees + 
         inputs.petFees + 
         inputs.otherFees;
}

function calculateVacancyLoss(inputs: NetOperatingIncomeInputs, totalGrossIncome: number): number {
  return totalGrossIncome * (inputs.vacancyRate / 100);
}

function calculateCollectionLoss(inputs: NetOperatingIncomeInputs, totalGrossIncome: number): number {
  return totalGrossIncome * (inputs.collectionLossRate / 100);
}

function calculateTotalOperatingExpenses(inputs: NetOperatingIncomeInputs): number {
  // Calculate property management fee if rate is provided
  const propertyManagementFee = inputs.propertyManagementRate > 0 
    ? inputs.grossRentalIncome * (inputs.propertyManagementRate / 100)
    : inputs.propertyManagementFee;
  
  return propertyManagementFee +
         inputs.propertyTaxes +
         inputs.propertyInsurance +
         inputs.utilities +
         inputs.maintenance +
         inputs.repairs +
         inputs.landscaping +
         inputs.janitorial +
         inputs.security +
         inputs.advertising +
         inputs.legalFees +
         inputs.accountingFees +
         inputs.otherExpenses +
         inputs.badDebtExpense;
}

function calculateExpenseBreakdown(inputs: NetOperatingIncomeInputs): Array<{
  category: string;
  amount: number;
  percentage: number;
}> {
  const totalExpenses = calculateTotalOperatingExpenses(inputs);
  const propertyManagementFee = inputs.propertyManagementRate > 0 
    ? inputs.grossRentalIncome * (inputs.propertyManagementRate / 100)
    : inputs.propertyManagementFee;
  
  const expenses = [
    { category: 'Property Management', amount: propertyManagementFee },
    { category: 'Property Taxes', amount: inputs.propertyTaxes },
    { category: 'Property Insurance', amount: inputs.propertyInsurance },
    { category: 'Utilities', amount: inputs.utilities },
    { category: 'Maintenance', amount: inputs.maintenance },
    { category: 'Repairs', amount: inputs.repairs },
    { category: 'Landscaping', amount: inputs.landscaping },
    { category: 'Janitorial', amount: inputs.janitorial },
    { category: 'Security', amount: inputs.security },
    { category: 'Advertising', amount: inputs.advertising },
    { category: 'Legal Fees', amount: inputs.legalFees },
    { category: 'Accounting Fees', amount: inputs.accountingFees },
    { category: 'Other Expenses', amount: inputs.otherExpenses },
    { category: 'Bad Debt Expense', amount: inputs.badDebtExpense }
  ];
  
  return expenses.map(expense => ({
    category: expense.category,
    amount: expense.amount,
    percentage: totalExpenses > 0 ? (expense.amount / totalExpenses) * 100 : 0
  }));
}

function calculateIncomeBreakdown(inputs: NetOperatingIncomeInputs): Array<{
  category: string;
  amount: number;
  percentage: number;
}> {
  const totalIncome = calculateTotalGrossIncome(inputs);
  
  const incomeSources = [
    { category: 'Gross Rental Income', amount: inputs.grossRentalIncome },
    { category: 'Other Income', amount: inputs.otherIncome },
    { category: 'Parking Income', amount: inputs.parkingIncome },
    { category: 'Laundry Income', amount: inputs.laundryIncome },
    { category: 'Storage Income', amount: inputs.storageIncome },
    { category: 'Amenity Income', amount: inputs.amenityIncome },
    { category: 'Late Fees', amount: inputs.lateFees },
    { category: 'Application Fees', amount: inputs.applicationFees },
    { category: 'Pet Fees', amount: inputs.petFees },
    { category: 'Other Fees', amount: inputs.otherFees }
  ];
  
  return incomeSources.map(income => ({
    category: income.category,
    amount: income.amount,
    percentage: totalIncome > 0 ? (income.amount / totalIncome) * 100 : 0
  }));
}

function calculateMarketAnalysis(inputs: NetOperatingIncomeInputs, noi: number): {
  marketPosition: string;
  competitiveAdvantage: string;
  marketOpportunities: string[];
  marketRisks: string[];
  marketRecommendations: string[];
} {
  const marketPosition = determineMarketPosition(inputs, noi);
  const competitiveAdvantage = determineCompetitiveAdvantage(inputs);
  const marketOpportunities = identifyMarketOpportunities(inputs);
  const marketRisks = identifyMarketRisks(inputs);
  const marketRecommendations = generateMarketRecommendations(inputs, noi);
  
  return {
    marketPosition,
    competitiveAdvantage,
    marketOpportunities,
    marketRisks,
    marketRecommendations
  };
}

function determineMarketPosition(inputs: NetOperatingIncomeInputs, noi: number): string {
  if (inputs.marketCondition === 'hot' && inputs.occupancyRate > 95) {
    return 'Strong market position with high occupancy in hot market';
  } else if (inputs.marketCondition === 'growing' && inputs.occupancyRate > 90) {
    return 'Good market position in growing market with strong occupancy';
  } else if (inputs.marketCondition === 'stable' && inputs.occupancyRate > 85) {
    return 'Stable market position with adequate occupancy';
  } else if (inputs.marketCondition === 'declining' || inputs.occupancyRate < 80) {
    return 'Challenging market position requiring attention';
  } else {
    return 'Moderate market position with room for improvement';
  }
}

function determineCompetitiveAdvantage(inputs: NetOperatingIncomeInputs): string {
  const advantages: string[] = [];
  
  if (inputs.occupancyRate > 95) {
    advantages.push('High occupancy rate');
  }
  
  if (inputs.vacancyRate < 5) {
    advantages.push('Low vacancy rate');
  }
  
  if (inputs.collectionLossRate < 2) {
    advantages.push('Low collection loss rate');
  }
  
  if (inputs.propertyAge < 10) {
    advantages.push('Modern property');
  }
  
  if (inputs.numberOfUnits > 100) {
    advantages.push('Economies of scale');
  }
  
  return advantages.length > 0 ? advantages.join(', ') : 'Limited competitive advantages identified';
}

function identifyMarketOpportunities(inputs: NetOperatingIncomeInputs): string[] {
  const opportunities: string[] = [];
  
  if (inputs.occupancyRate < 95) {
    opportunities.push('Increase occupancy rate');
  }
  
  if (inputs.vacancyRate > 5) {
    opportunities.push('Reduce vacancy rate through marketing');
  }
  
  if (inputs.otherIncome < inputs.grossRentalIncome * 0.1) {
    opportunities.push('Increase ancillary income sources');
  }
  
  if (inputs.marketCondition === 'growing' || inputs.marketCondition === 'hot') {
    opportunities.push('Leverage market growth for rent increases');
  }
  
  if (inputs.propertyAge > 20) {
    opportunities.push('Consider property improvements to increase rents');
  }
  
  return opportunities;
}

function identifyMarketRisks(inputs: NetOperatingIncomeInputs): string[] {
  const risks: string[] = [];
  
  if (inputs.marketCondition === 'declining') {
    risks.push('Market decline affecting property values');
  }
  
  if (inputs.occupancyRate < 80) {
    risks.push('Low occupancy rate');
  }
  
  if (inputs.vacancyRate > 10) {
    risks.push('High vacancy rate');
  }
  
  if (inputs.collectionLossRate > 5) {
    risks.push('High collection loss rate');
  }
  
  if (inputs.propertyAge > 30) {
    risks.push('Aging property requiring increased maintenance');
  }
  
  return risks;
}

function generateMarketRecommendations(inputs: NetOperatingIncomeInputs, noi: number): string[] {
  const recommendations: string[] = [];
  
  if (inputs.occupancyRate < 90) {
    recommendations.push('Implement aggressive marketing strategy to increase occupancy');
  }
  
  if (inputs.vacancyRate > 8) {
    recommendations.push('Review pricing strategy and property condition');
  }
  
  if (inputs.collectionLossRate > 3) {
    recommendations.push('Improve tenant screening and collection processes');
  }
  
  if (inputs.otherIncome < inputs.grossRentalIncome * 0.05) {
    recommendations.push('Develop additional income streams');
  }
  
  if (inputs.marketCondition === 'hot' && inputs.occupancyRate > 95) {
    recommendations.push('Consider rent increases to maximize revenue');
  }
  
  return recommendations;
}

function calculatePerformanceMetrics(inputs: NetOperatingIncomeInputs, noi: number, grossIncome: number, expenses: number): {
  revenueGrowth: number;
  expenseGrowth: number;
  noiGrowth: number;
  efficiencyRatio: number;
  profitabilityIndex: number;
  returnOnInvestment: number;
} {
  // These would typically be calculated based on historical data
  // For now, using placeholder calculations
  const revenueGrowth = inputs.marketGrowthRate || 0;
  const expenseGrowth = inputs.marketGrowthRate * 0.8 || 0; // Expenses typically grow slower than revenue
  const noiGrowth = revenueGrowth - expenseGrowth;
  const efficiencyRatio = grossIncome > 0 ? (expenses / grossIncome) * 100 : 0;
  const profitabilityIndex = grossIncome > 0 ? (noi / grossIncome) * 100 : 0;
  const returnOnInvestment = inputs.propertyValue > 0 ? (noi / inputs.propertyValue) * 100 : 0;
  
  return {
    revenueGrowth,
    expenseGrowth,
    noiGrowth,
    efficiencyRatio,
    profitabilityIndex,
    returnOnInvestment
  };
}

function calculateTrendAnalysis(inputs: NetOperatingIncomeInputs): Array<{
  period: string;
  grossIncome: number;
  expenses: number;
  noi: number;
  occupancyRate: number;
}> {
  // This would typically use historical data
  // For now, generating projected trends
  const trends = [];
  const currentYear = new Date().getFullYear();
  
  for (let i = 0; i < 5; i++) {
    const year = currentYear + i;
    const growthFactor = Math.pow(1 + (inputs.marketGrowthRate / 100), i);
    const expenseGrowthFactor = Math.pow(1 + (inputs.marketGrowthRate * 0.8 / 100), i);
    
    const grossIncome = inputs.grossRentalIncome * growthFactor;
    const expenses = calculateTotalOperatingExpenses(inputs) * expenseGrowthFactor;
    const noi = grossIncome - expenses;
    const occupancyRate = Math.min(100, inputs.occupancyRate + (i * 2)); // Gradual improvement
    
    trends.push({
      period: year.toString(),
      grossIncome,
      expenses,
      noi,
      occupancyRate
    });
  }
  
  return trends;
}

function calculateSensitivityAnalysis(inputs: NetOperatingIncomeInputs): Array<{
  variable: string;
  values: number[];
  noiImpact: number[];
}> {
  const variables = [
    { name: 'Occupancy Rate', base: inputs.occupancyRate, range: [-10, 10] },
    { name: 'Rent Growth Rate', base: inputs.marketGrowthRate, range: [-2, 2] },
    { name: 'Expense Growth Rate', base: inputs.marketGrowthRate * 0.8, range: [-1, 1] }
  ];
  
  return variables.map(variable => {
    const values = [
      variable.base + variable.range[0],
      variable.base,
      variable.base + variable.range[1]
    ];
    
    const noiImpact = values.map(value => {
      // Simplified impact calculation
      if (variable.name === 'Occupancy Rate') {
        const modifiedInputs = { ...inputs, occupancyRate: value };
        const grossIncome = calculateTotalGrossIncome(modifiedInputs) * (value / 100);
        const expenses = calculateTotalOperatingExpenses(modifiedInputs);
        return grossIncome - expenses;
      } else {
        const growthFactor = 1 + (value / 100);
        const grossIncome = calculateTotalGrossIncome(inputs) * growthFactor;
        const expenses = calculateTotalOperatingExpenses(inputs) * (1 + (value * 0.8 / 100));
        return grossIncome - expenses;
      }
    });
    
    return { variable: variable.name, values, noiImpact };
  });
}

function calculateBenchmarking(inputs: NetOperatingIncomeInputs, noi: number, grossIncome: number, expenses: number): {
  industryBenchmarks: Array<{
    metric: string;
    propertyValue: number;
    industryAverage: number;
    performance: string;
  }>;
  peerComparison: Array<{
    property: string;
    noi: number;
    noiMargin: number;
    occupancyRate: number;
  }>;
} {
  const industryBenchmarks = [
    {
      metric: 'NOI Margin',
      propertyValue: (noi / grossIncome) * 100,
      industryAverage: 60, // Typical NOI margin
      performance: (noi / grossIncome) * 100 > 60 ? 'Above Average' : 'Below Average'
    },
    {
      metric: 'Expense Ratio',
      propertyValue: (expenses / grossIncome) * 100,
      industryAverage: 40, // Typical expense ratio
      performance: (expenses / grossIncome) * 100 < 40 ? 'Above Average' : 'Below Average'
    },
    {
      metric: 'Occupancy Rate',
      propertyValue: inputs.occupancyRate,
      industryAverage: 90, // Typical occupancy rate
      performance: inputs.occupancyRate > 90 ? 'Above Average' : 'Below Average'
    }
  ];
  
  const peerComparison = inputs.comparableProperties.map(comp => ({
    property: comp.property,
    noi: comp.noi,
    noiMargin: (comp.noi / comp.grossIncome) * 100,
    occupancyRate: comp.occupancyRate
  }));
  
  return {
    industryBenchmarks,
    peerComparison
  };
}