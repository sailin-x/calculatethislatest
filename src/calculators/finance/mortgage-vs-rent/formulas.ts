import { MortgageVsRentInputs } from './validation';

export interface MortgageVsRentResult {
  recommendation: string;
  breakEvenYears: number;
  monthlyCostDifference: number;
  totalCostComparison: number;
  netWorthComparison: number;
  monthlyMortgagePayment: number;
  totalMonthlyCost: number;
  totalMonthlyRent: number;
  equityBuildUp: number;
  opportunityCost: number;
  recommendations: string[];
  costBreakdown: {
    buying: {
      mortgagePayment: number;
      propertyTax: number;
      insurance: number;
      hoaFees: number;
      maintenance: number;
      utilities: number;
      pmi: number;
      total: number;
    };
    renting: {
      rent: number;
      utilities: number;
      total: number;
    };
    comparison: {
      monthlyDifference: number;
      annualDifference: number;
      totalDifference: number;
    };
  };
  financialAnalysis: {
    equityGrowth: number;
    homeValueGrowth: number;
    investmentGrowth: number;
    taxSavings: number;
    totalBuyingValue: number;
    totalRentingValue: number;
  };
  riskAssessment: {
    buyingRisks: string[];
    rentingRisks: string[];
    marketRisks: string[];
    overallRisk: 'low' | 'medium' | 'high';
  };
  scenarioAnalysis: {
    highAppreciation: { netWorth: number; recommendation: string };
    lowAppreciation: { netWorth: number; recommendation: string };
    highRentGrowth: { netWorth: number; recommendation: string };
    lowRentGrowth: { netWorth: number; recommendation: string };
    highInvestmentReturn: { netWorth: number; recommendation: string };
    lowInvestmentReturn: { netWorth: number; recommendation: string };
  };
}

export const calculateMortgageVsRent = (inputs: MortgageVsRentInputs): MortgageVsRentResult => {
  const {
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    monthlyRent,
    rentIncreaseRate = 3.0,
    propertyTax,
    homeInsurance,
    hoaFees = 0,
    maintenanceCosts = 3000,
    closingCosts,
    homeAppreciationRate = 3.0,
    investmentReturn = 7.0,
    taxRate = 0,
    analysisPeriod = 10,
    includePMI = false,
    pmiRate = 0.5,
    includeUtilities = true,
    buyerUtilities = 300,
    renterUtilities = 200,
    includeTaxBenefits = true,
    includeOpportunityCost = true,
    includeLiquidity = true,
    includeFlexibility = true
  } = inputs;

  // Calculate loan amount and monthly mortgage payment
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;
  
  const monthlyMortgagePayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                                (Math.pow(1 + monthlyRate, totalPayments) - 1);

  // Calculate PMI if applicable
  const pmiPayment = includePMI && downPayment < homePrice * 0.2 ? 
    (loanAmount * pmiRate / 100 / 12) : 0;

  // Calculate total monthly costs for buying
  const totalMonthlyCost = monthlyMortgagePayment +
    (propertyTax / 12) +
    (homeInsurance / 12) +
    hoaFees +
    (maintenanceCosts / 12) +
    (includeUtilities ? buyerUtilities : 0) +
    pmiPayment;

  // Calculate total monthly costs for renting
  const totalMonthlyRent = monthlyRent + (includeUtilities ? renterUtilities : 0);

  // Calculate monthly cost difference
  const monthlyCostDifference = totalMonthlyCost - totalMonthlyRent;

  // Calculate break-even years
  let breakEvenYears = Infinity;
  if (monthlyCostDifference < 0) {
    // Buying is cheaper monthly, calculate when total costs break even
    const upfrontCosts = downPayment + closingCosts;
    const monthlySavings = Math.abs(monthlyCostDifference);
    breakEvenYears = upfrontCosts / (monthlySavings * 12);
  } else {
    // Renting is cheaper monthly, calculate when buying becomes cheaper
    let cumulativeRentCost = 0;
    let cumulativeBuyCost = downPayment + closingCosts;
    
    for (let year = 1; year <= analysisPeriod; year++) {
      const annualRent = monthlyRent * 12 * Math.pow(1 + rentIncreaseRate / 100, year - 1);
      cumulativeRentCost += annualRent;
      cumulativeBuyCost += totalMonthlyCost * 12;
      
      if (cumulativeBuyCost < cumulativeRentCost) {
        breakEvenYears = year;
        break;
      }
    }
  }

  // Calculate equity build-up over analysis period
  let remainingBalance = loanAmount;
  let equityBuildUp = downPayment;
  
  for (let year = 1; year <= analysisPeriod; year++) {
    const annualPayment = monthlyMortgagePayment * 12;
    const annualInterest = remainingBalance * (interestRate / 100);
    const annualPrincipal = annualPayment - annualInterest;
    
    remainingBalance -= annualPrincipal;
    equityBuildUp += annualPrincipal;
  }

  // Calculate home value growth
  const homeValueGrowth = homePrice * Math.pow(1 + homeAppreciationRate / 100, analysisPeriod) - homePrice;

  // Calculate opportunity cost of down payment and closing costs
  const opportunityCost = (downPayment + closingCosts) * 
    (Math.pow(1 + investmentReturn / 100, analysisPeriod) - 1);

  // Calculate tax savings from mortgage interest deduction
  let taxSavings = 0;
  if (includeTaxBenefits && taxRate > 0) {
    let totalInterestPaid = 0;
    let tempBalance = loanAmount;
    
    for (let year = 1; year <= analysisPeriod; year++) {
      const annualInterest = tempBalance * (interestRate / 100);
      totalInterestPaid += annualInterest;
      tempBalance -= (monthlyMortgagePayment * 12 - annualInterest);
    }
    
    taxSavings = totalInterestPaid * (taxRate / 100);
  }

  // Calculate total cost comparison
  const totalBuyingCost = (downPayment + closingCosts) + (totalMonthlyCost * 12 * analysisPeriod);
  const totalRentingCost = monthlyRent * 12 * 
    (Math.pow(1 + rentIncreaseRate / 100, analysisPeriod) - 1) / (rentIncreaseRate / 100);
  
  const totalCostComparison = totalBuyingCost - totalRentingCost;

  // Calculate net worth comparison
  const totalBuyingValue = equityBuildUp + homeValueGrowth + taxSavings - opportunityCost;
  const totalRentingValue = (downPayment + closingCosts) * Math.pow(1 + investmentReturn / 100, analysisPeriod);
  
  const netWorthComparison = totalBuyingValue - totalRentingValue;

  // Generate recommendations
  const recommendations: string[] = [];
  
  if (breakEvenYears <= 3) {
    recommendations.push('Buying appears highly favorable - break-even in 3 years or less');
  } else if (breakEvenYears <= 7) {
    recommendations.push('Buying may be beneficial - break-even in 7 years or less');
  } else if (breakEvenYears > 10) {
    recommendations.push('Consider renting longer - break-even period is quite long');
  }
  
  if (netWorthComparison > 50000) {
    recommendations.push('Buying significantly improves long-term net worth');
  } else if (netWorthComparison < -50000) {
    recommendations.push('Renting may be better for long-term wealth building');
  }
  
  if (monthlyCostDifference > 500) {
    recommendations.push('Monthly costs are significantly higher when buying - ensure you can afford it');
  }
  
  if (downPayment < homePrice * 0.2) {
    recommendations.push('Consider saving for a larger down payment to avoid PMI');
  }

  // Determine recommendation
  let recommendation = 'CONSIDER BOTH OPTIONS';
  
  if (breakEvenYears <= 5 && netWorthComparison > 0 && monthlyCostDifference < 300) {
    recommendation = 'BUY';
  } else if (breakEvenYears > 10 || netWorthComparison < -100000) {
    recommendation = 'RENT';
  } else if (breakEvenYears <= 7 && netWorthComparison > -50000) {
    recommendation = 'CONSIDER BUYING';
  }

  // Cost breakdown
  const costBreakdown = {
    buying: {
      mortgagePayment: monthlyMortgagePayment,
      propertyTax: propertyTax / 12,
      insurance: homeInsurance / 12,
      hoaFees,
      maintenance: maintenanceCosts / 12,
      utilities: includeUtilities ? buyerUtilities : 0,
      pmi: pmiPayment,
      total: totalMonthlyCost
    },
    renting: {
      rent: monthlyRent,
      utilities: includeUtilities ? renterUtilities : 0,
      total: totalMonthlyRent
    },
    comparison: {
      monthlyDifference: monthlyCostDifference,
      annualDifference: monthlyCostDifference * 12,
      totalDifference: totalCostComparison
    }
  };

  // Financial analysis
  const financialAnalysis = {
    equityGrowth: equityBuildUp,
    homeValueGrowth,
    investmentGrowth: opportunityCost,
    taxSavings,
    totalBuyingValue,
    totalRentingValue
  };

  // Risk assessment
  const buyingRisks: string[] = [];
  const rentingRisks: string[] = [];
  const marketRisks: string[] = [];
  
  if (downPayment < homePrice * 0.2) {
    buyingRisks.push('Low equity position increases risk');
  }
  if (monthlyCostDifference > 500) {
    buyingRisks.push('High monthly cost burden');
  }
  if (homeAppreciationRate < 2) {
    buyingRisks.push('Low appreciation expectations');
  }
  
  rentingRisks.push('No equity building');
  rentingRisks.push('Rent increases over time');
  rentingRisks.push('No control over housing costs');
  
  if (homeAppreciationRate > 5) {
    marketRisks.push('High appreciation expectations may not be sustainable');
  }
  if (rentIncreaseRate > 5) {
    marketRisks.push('High rent growth expectations');
  }

  let overallRisk: 'low' | 'medium' | 'high' = 'medium';
  if (buyingRisks.length <= 1 && marketRisks.length <= 1) {
    overallRisk = 'low';
  } else if (buyingRisks.length >= 3 || marketRisks.length >= 3) {
    overallRisk = 'high';
  }

  // Scenario analysis
  const scenarioAnalysis = {
    highAppreciation: {
      netWorth: (equityBuildUp + homePrice * Math.pow(1.05, analysisPeriod) - homePrice + taxSavings - opportunityCost) - totalRentingValue,
      recommendation: 'High appreciation favors buying'
    },
    lowAppreciation: {
      netWorth: (equityBuildUp + homePrice * Math.pow(1.01, analysisPeriod) - homePrice + taxSavings - opportunityCost) - totalRentingValue,
      recommendation: 'Low appreciation may favor renting'
    },
    highRentGrowth: {
      netWorth: totalBuyingValue - (downPayment + closingCosts) * Math.pow(1 + investmentReturn / 100, analysisPeriod),
      recommendation: 'High rent growth favors buying'
    },
    lowRentGrowth: {
      netWorth: totalBuyingValue - (downPayment + closingCosts) * Math.pow(1 + investmentReturn / 100, analysisPeriod),
      recommendation: 'Low rent growth may favor renting'
    },
    highInvestmentReturn: {
      netWorth: totalBuyingValue - (downPayment + closingCosts) * Math.pow(1.1, analysisPeriod),
      recommendation: 'High investment returns favor renting'
    },
    lowInvestmentReturn: {
      netWorth: totalBuyingValue - (downPayment + closingCosts) * Math.pow(1.04, analysisPeriod),
      recommendation: 'Low investment returns favor buying'
    }
  };

  return {
    recommendation,
    breakEvenYears,
    monthlyCostDifference,
    totalCostComparison,
    netWorthComparison,
    monthlyMortgagePayment,
    totalMonthlyCost,
    totalMonthlyRent,
    equityBuildUp,
    opportunityCost,
    recommendations,
    costBreakdown,
    financialAnalysis,
    riskAssessment: {
      buyingRisks,
      rentingRisks,
      marketRisks,
      overallRisk
    },
    scenarioAnalysis
  };
};

export const generateMortgageVsRentAnalysis = (inputs: MortgageVsRentInputs, outputs: MortgageVsRentResult): string => {
  const { homePrice, downPayment, monthlyRent, analysisPeriod } = inputs;
  const { recommendation, breakEvenYears, monthlyCostDifference, netWorthComparison, totalMonthlyCost, totalMonthlyRent } = outputs;

  let analysis = `## Mortgage vs. Rent Analysis\n\n`;

  // Recommendation
  analysis += `### Recommendation\n`;
  analysis += `**Decision:** ${recommendation === 'BUY' ? '🏠 BUY' : 
    recommendation === 'RENT' ? '🏢 RENT' : 
    recommendation === 'CONSIDER BUYING' ? '🤔 CONSIDER BUYING' : '⚖️ CONSIDER BOTH OPTIONS'}\n\n`;

  // Key Metrics
  analysis += `### Key Metrics\n`;
  analysis += `- **Break-Even Years:** ${breakEvenYears === Infinity ? 'Never' : breakEvenYears.toFixed(1)} years\n`;
  analysis += `- **Monthly Cost Difference:** $${Math.abs(monthlyCostDifference).toFixed(2)} ${monthlyCostDifference > 0 ? '(buying costs more)' : '(buying saves)'}\n`;
  analysis += `- **Net Worth Comparison:** $${netWorthComparison.toLocaleString()} ${netWorthComparison > 0 ? '(buying better)' : '(renting better)'}\n`;
  analysis += `- **Analysis Period:** ${analysisPeriod} years\n\n`;

  // Cost Comparison
  analysis += `### Monthly Cost Comparison\n`;
  analysis += `- **Buying:** $${totalMonthlyCost.toFixed(2)}/month\n`;
  analysis += `- **Renting:** $${totalMonthlyRent.toFixed(2)}/month\n`;
  analysis += `- **Difference:** $${Math.abs(monthlyCostDifference).toFixed(2)}/month\n\n`;

  // Property Details
  analysis += `### Property Details\n`;
  analysis += `- **Home Price:** $${homePrice.toLocaleString()}\n`;
  analysis += `- **Down Payment:** $${downPayment.toLocaleString()} (${((downPayment / homePrice) * 100).toFixed(1)}%)\n`;
  analysis += `- **Monthly Rent:** $${monthlyRent.toLocaleString()}\n\n`;

  // Financial Analysis
  analysis += `### Financial Analysis\n`;
  analysis += `- **Equity Build-Up:** $${outputs.equityBuildUp.toLocaleString()}\n`;
  analysis += `- **Home Value Growth:** $${outputs.financialAnalysis.homeValueGrowth.toLocaleString()}\n`;
  analysis += `- **Tax Savings:** $${outputs.financialAnalysis.taxSavings.toLocaleString()}\n`;
  analysis += `- **Opportunity Cost:** $${outputs.opportunityCost.toLocaleString()}\n\n`;

  // Recommendations
  if (outputs.recommendations.length > 0) {
    analysis += `### Recommendations\n`;
    outputs.recommendations.forEach((rec, index) => {
      analysis += `${index + 1}. ${rec}\n`;
    });
    analysis += `\n`;
  }

  // Risk Assessment
  analysis += `### Risk Assessment\n`;
  analysis += `- **Overall Risk:** ${outputs.riskAssessment.overallRisk.toUpperCase()}\n\n`;

  if (outputs.riskAssessment.buyingRisks.length > 0) {
    analysis += `**Buying Risks:**\n`;
    outputs.riskAssessment.buyingRisks.forEach(risk => {
      analysis += `- ⚠️ ${risk}\n`;
    });
    analysis += `\n`;
  }

  if (outputs.riskAssessment.rentingRisks.length > 0) {
    analysis += `**Renting Risks:**\n`;
    outputs.riskAssessment.rentingRisks.forEach(risk => {
      analysis += `- ⚠️ ${risk}\n`;
    });
    analysis += `\n`;
  }

  // Scenario Analysis
  analysis += `### Scenario Analysis\n`;
  analysis += `- **High Appreciation:** ${outputs.scenarioAnalysis.highAppreciation.recommendation}\n`;
  analysis += `- **Low Appreciation:** ${outputs.scenarioAnalysis.lowAppreciation.recommendation}\n`;
  analysis += `- **High Investment Returns:** ${outputs.scenarioAnalysis.highInvestmentReturn.recommendation}\n`;
  analysis += `- **Low Investment Returns:** ${outputs.scenarioAnalysis.lowInvestmentReturn.recommendation}\n`;

  return analysis;
};