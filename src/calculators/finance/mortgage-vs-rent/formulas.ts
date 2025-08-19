export interface MortgageVsRentInputs {
  currentRent: number;
  rentIncreaseRate: number;
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: string;
  propertyTaxRate: number;
  homeownersInsurance: number;
  pmiRate?: number;
  maintenanceCost: number;
  utilities: number;
  utilitiesHome: number;
  closingCosts: number;
  homeAppreciation: number;
  investmentReturn: number;
  analysisPeriod: number;
  taxRate?: number;
  rentersInsurance?: number;
  hoaFees?: number;
}

export interface RentVsBuyScenario {
  year: number;
  rentCost: number;
  mortgageCost: number;
  rentCumulative: number;
  mortgageCumulative: number;
  homeValue: number;
  homeEquity: number;
  opportunityCost: number;
}

export interface MortgageVsRentOutputs {
  monthlyRentCost: number;
  monthlyMortgageCost: number;
  totalRentCost: number;
  totalMortgageCost: number;
  homeEquity: number;
  opportunityCost: number;
  netHomeCost: number;
  breakEvenYears: number;
  recommendation: string;
  analysis: string;
}

/**
 * Calculate mortgage vs rent analysis
 */
export function calculateMortgageVsRent(inputs: MortgageVsRentInputs): MortgageVsRentOutputs {
  const {
    currentRent,
    rentIncreaseRate,
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,
    homeownersInsurance,
    pmiRate = 0,
    maintenanceCost,
    utilities,
    utilitiesHome,
    closingCosts,
    homeAppreciation,
    investmentReturn,
    analysisPeriod,
    taxRate = 0,
    rentersInsurance = 0,
    hoaFees = 0
  } = inputs;

  // Calculate loan amount and monthly mortgage payment
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = parseInt(loanTerm) * 12;
  const monthlyMortgagePayment = calculateMonthlyPayment(loanAmount, monthlyRate, totalMonths);

  // Calculate monthly costs
  const monthlyRentCost = currentRent + utilities + rentersInsurance;
  const monthlyPropertyTax = (homePrice * propertyTaxRate / 100) / 12;
  const monthlyHomeownersInsurance = homeownersInsurance / 12;
  const monthlyPMI = loanAmount > 0 && downPayment < homePrice * 0.2 ? (loanAmount * pmiRate / 100) / 12 : 0;
  const monthlyMaintenance = maintenanceCost / 12;
  const monthlyHOA = hoaFees;

  const monthlyMortgageCost = monthlyMortgagePayment + monthlyPropertyTax + monthlyHomeownersInsurance + 
                              monthlyPMI + monthlyMaintenance + utilitiesHome + monthlyHOA;

  // Calculate total costs over analysis period
  const totalRentCost = calculateTotalRentCost(currentRent, rentIncreaseRate, utilities, rentersInsurance, analysisPeriod);
  const totalMortgageCost = calculateTotalMortgageCost(
    monthlyMortgagePayment,
    monthlyPropertyTax,
    monthlyHomeownersInsurance,
    monthlyPMI,
    monthlyMaintenance,
    utilitiesHome,
    monthlyHOA,
    closingCosts,
    analysisPeriod
  );

  // Calculate home equity and opportunity cost
  const homeEquity = calculateHomeEquity(homePrice, downPayment, loanAmount, monthlyRate, totalMonths, homeAppreciation, analysisPeriod);
  const opportunityCost = calculateOpportunityCost(downPayment + closingCosts, investmentReturn, analysisPeriod);

  // Calculate net home cost
  const netHomeCost = totalMortgageCost - homeEquity;

  // Calculate break-even years
  const breakEvenYears = calculateBreakEvenYears(
    currentRent,
    rentIncreaseRate,
    utilities,
    rentersInsurance,
    monthlyMortgagePayment,
    monthlyPropertyTax,
    monthlyHomeownersInsurance,
    monthlyPMI,
    monthlyMaintenance,
    utilitiesHome,
    monthlyHOA,
    closingCosts,
    homeAppreciation,
    investmentReturn,
    downPayment
  );

  // Generate recommendation
  const recommendation = generateRecommendation(
    totalRentCost,
    netHomeCost,
    breakEvenYears,
    analysisPeriod,
    monthlyRentCost,
    monthlyMortgageCost
  );

  // Generate detailed analysis
  const analysis = generateAnalysis(
    inputs,
    monthlyRentCost,
    monthlyMortgageCost,
    totalRentCost,
    totalMortgageCost,
    homeEquity,
    opportunityCost,
    netHomeCost,
    breakEvenYears
  );

  return {
    monthlyRentCost,
    monthlyMortgageCost,
    totalRentCost,
    totalMortgageCost,
    homeEquity,
    opportunityCost,
    netHomeCost,
    breakEvenYears,
    recommendation,
    analysis
  };
}

/**
 * Calculate monthly mortgage payment
 */
function calculateMonthlyPayment(loanAmount: number, monthlyRate: number, totalMonths: number): number {
  if (monthlyRate === 0) {
    return loanAmount / totalMonths;
  }
  
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
}

/**
 * Calculate total rent cost over analysis period
 */
function calculateTotalRentCost(
  currentRent: number,
  rentIncreaseRate: number,
  utilities: number,
  rentersInsurance: number,
  analysisPeriod: number
): number {
  let totalCost = 0;
  let monthlyRent = currentRent;
  
  for (let year = 1; year <= analysisPeriod; year++) {
    const annualRentCost = (monthlyRent + utilities + rentersInsurance) * 12;
    totalCost += annualRentCost;
    monthlyRent *= (1 + rentIncreaseRate / 100);
  }
  
  return totalCost;
}

/**
 * Calculate total mortgage cost over analysis period
 */
function calculateTotalMortgageCost(
  monthlyMortgagePayment: number,
  monthlyPropertyTax: number,
  monthlyHomeownersInsurance: number,
  monthlyPMI: number,
  monthlyMaintenance: number,
  utilitiesHome: number,
  monthlyHOA: number,
  closingCosts: number,
  analysisPeriod: number
): number {
  const monthlyTotal = monthlyMortgagePayment + monthlyPropertyTax + monthlyHomeownersInsurance + 
                       monthlyPMI + monthlyMaintenance + utilitiesHome + monthlyHOA;
  
  return (monthlyTotal * 12 * analysisPeriod) + closingCosts;
}

/**
 * Calculate home equity at end of analysis period
 */
function calculateHomeEquity(
  homePrice: number,
  downPayment: number,
  loanAmount: number,
  monthlyRate: number,
  totalMonths: number,
  homeAppreciation: number,
  analysisPeriod: number
): number {
  // Calculate future home value
  const futureHomeValue = homePrice * Math.pow(1 + homeAppreciation / 100, analysisPeriod);
  
  // Calculate remaining loan balance
  const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyRate, totalMonths);
  const remainingBalance = calculateRemainingBalance(loanAmount, monthlyRate, monthlyPayment, analysisPeriod * 12);
  
  // Home equity = future value - remaining balance
  return Math.max(0, futureHomeValue - remainingBalance);
}

/**
 * Calculate remaining loan balance
 */
function calculateRemainingBalance(
  loanAmount: number,
  monthlyRate: number,
  monthlyPayment: number,
  monthsPaid: number
): number {
  if (monthlyRate === 0) {
    return Math.max(0, loanAmount - (monthlyPayment * monthsPaid));
  }
  
  return loanAmount * Math.pow(1 + monthlyRate, monthsPaid) - 
         monthlyPayment * (Math.pow(1 + monthlyRate, monthsPaid) - 1) / monthlyRate;
}

/**
 * Calculate opportunity cost of down payment and closing costs
 */
function calculateOpportunityCost(
  totalInvestment: number,
  investmentReturn: number,
  analysisPeriod: number
): number {
  return totalInvestment * (Math.pow(1 + investmentReturn / 100, analysisPeriod) - 1);
}

/**
 * Calculate break-even years
 */
function calculateBreakEvenYears(
  currentRent: number,
  rentIncreaseRate: number,
  utilities: number,
  rentersInsurance: number,
  monthlyMortgagePayment: number,
  monthlyPropertyTax: number,
  monthlyHomeownersInsurance: number,
  monthlyPMI: number,
  monthlyMaintenance: number,
  utilitiesHome: number,
  monthlyHOA: number,
  closingCosts: number,
  homeAppreciation: number,
  investmentReturn: number,
  downPayment: number
): number {
  let rentCumulative = 0;
  let mortgageCumulative = closingCosts;
  let monthlyRent = currentRent;
  
  for (let year = 1; year <= 30; year++) {
    // Add annual rent costs
    rentCumulative += (monthlyRent + utilities + rentersInsurance) * 12;
    
    // Add annual mortgage costs
    const monthlyTotal = monthlyMortgagePayment + monthlyPropertyTax + monthlyHomeownersInsurance + 
                         monthlyPMI + monthlyMaintenance + utilitiesHome + monthlyHOA;
    mortgageCumulative += monthlyTotal * 12;
    
    // Calculate home equity at this point
    const futureHomeValue = (currentRent * 12) * Math.pow(1 + homeAppreciation / 100, year); // Rough estimate
    const remainingBalance = Math.max(0, (currentRent * 12) - (monthlyTotal * 12 * year)); // Rough estimate
    const homeEquity = Math.max(0, futureHomeValue - remainingBalance);
    
    // Calculate opportunity cost
    const opportunityCost = (downPayment + closingCosts) * (Math.pow(1 + investmentReturn / 100, year) - 1);
    
    // Net mortgage cost
    const netMortgageCost = mortgageCumulative - homeEquity + opportunityCost;
    
    // Check if mortgage becomes cheaper
    if (netMortgageCost <= rentCumulative) {
      return year;
    }
    
    // Increase rent for next year
    monthlyRent *= (1 + rentIncreaseRate / 100);
  }
  
  return 30; // Never break even within 30 years
}

/**
 * Generate recommendation
 */
function generateRecommendation(
  totalRentCost: number,
  netHomeCost: number,
  breakEvenYears: number,
  analysisPeriod: number,
  monthlyRentCost: number,
  monthlyMortgageCost: number
): string {
  // Strong buy recommendation
  if (netHomeCost < totalRentCost * 0.8 && breakEvenYears < analysisPeriod * 0.6) {
    return 'Strongly recommend buying';
  }
  
  // Moderate buy recommendation
  if (netHomeCost < totalRentCost && breakEvenYears < analysisPeriod * 0.8) {
    return 'Consider buying';
  }
  
  // Moderate rent recommendation
  if (netHomeCost > totalRentCost * 1.2 || breakEvenYears > analysisPeriod) {
    return 'Consider renting';
  }
  
  // Strong rent recommendation
  if (netHomeCost > totalRentCost * 1.5 || breakEvenYears > analysisPeriod * 1.2) {
    return 'Strongly recommend renting';
  }
  
  // Neutral recommendation
  return 'Both options are comparable';
}

/**
 * Generate detailed analysis
 */
function generateAnalysis(
  inputs: MortgageVsRentInputs,
  monthlyRentCost: number,
  monthlyMortgageCost: number,
  totalRentCost: number,
  totalMortgageCost: number,
  homeEquity: number,
  opportunityCost: number,
  netHomeCost: number,
  breakEvenYears: number
): string {
  const {
    currentRent,
    homePrice,
    downPayment,
    analysisPeriod,
    homeAppreciation,
    investmentReturn
  } = inputs;

  let analysis = `# Rent vs. Buy Analysis\n\n`;

  // Summary
  analysis += `## Summary\n`;
  analysis += `- **Monthly Rent Cost:** $${monthlyRentCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
  analysis += `- **Monthly Mortgage Cost:** $${monthlyMortgageCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
  analysis += `- **Monthly Difference:** $${(monthlyMortgageCost - monthlyRentCost).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\n`;

  // Total costs
  analysis += `## Total Costs Over ${analysisPeriod} Years\n`;
  analysis += `- **Total Rent Cost:** $${totalRentCost.toLocaleString()}\n`;
  analysis += `- **Total Mortgage Cost:** $${totalMortgageCost.toLocaleString()}\n`;
  analysis += `- **Home Equity:** $${homeEquity.toLocaleString()}\n`;
  analysis += `- **Opportunity Cost:** $${opportunityCost.toLocaleString()}\n`;
  analysis += `- **Net Home Cost:** $${netHomeCost.toLocaleString()}\n\n`;

  // Break-even analysis
  analysis += `## Break-Even Analysis\n`;
  if (breakEvenYears <= analysisPeriod) {
    analysis += `- **Break-Even Point:** ${breakEvenYears} years\n`;
    analysis += `- **Years of Savings:** ${analysisPeriod - breakEvenYears} years\n`;
  } else {
    analysis += `- **Break-Even Point:** Beyond ${analysisPeriod} years\n`;
    analysis += `- **Renting is cheaper** for the analysis period\n`;
  }

  // Cost comparison
  analysis += `\n## Cost Comparison\n`;
  const costDifference = totalRentCost - netHomeCost;
  if (costDifference > 0) {
    analysis += `- **Buying saves:** $${costDifference.toLocaleString()} over ${analysisPeriod} years\n`;
    analysis += `- **Annual savings:** $${(costDifference / analysisPeriod).toLocaleString()}\n`;
  } else {
    analysis += `- **Renting saves:** $${Math.abs(costDifference).toLocaleString()} over ${analysisPeriod} years\n`;
    analysis += `- **Annual savings:** $${(Math.abs(costDifference) / analysisPeriod).toLocaleString()}\n`;
  }

  // Key factors
  analysis += `\n## Key Factors\n`;
  analysis += `- **Home Price:** $${homePrice.toLocaleString()}\n`;
  analysis += `- **Down Payment:** $${downPayment.toLocaleString()} (${((downPayment / homePrice) * 100).toFixed(1)}%)\n`;
  analysis += `- **Home Appreciation:** ${homeAppreciation}% annually\n`;
  analysis += `- **Investment Return:** ${investmentReturn}% annually\n`;
  analysis += `- **Analysis Period:** ${analysisPeriod} years\n`;

  // Monthly cash flow
  analysis += `\n## Monthly Cash Flow Impact\n`;
  const monthlyDifference = monthlyMortgageCost - monthlyRentCost;
  if (monthlyDifference > 0) {
    analysis += `- **Additional monthly cost:** $${monthlyDifference.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
    analysis += `- **Annual additional cost:** $${(monthlyDifference * 12).toLocaleString()}\n`;
  } else {
    analysis += `- **Monthly savings:** $${Math.abs(monthlyDifference).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
    analysis += `- **Annual savings:** $${(Math.abs(monthlyDifference) * 12).toLocaleString()}\n`;
  }

  // Long-term considerations
  analysis += `\n## Long-Term Considerations\n`;
  analysis += `- **Equity Building:** Homeownership builds equity over time\n`;
  analysis += `- **Tax Benefits:** Mortgage interest and property tax deductions\n`;
  analysis += `- **Maintenance Responsibility:** Homeowners are responsible for all repairs\n`;
  analysis += `- **Market Risk:** Home values can decline in poor markets\n`;
  analysis += `- **Liquidity:** Renting provides more flexibility to move\n`;

  // Final recommendation
  analysis += `\n## Final Recommendation\n`;
  const recommendation = generateRecommendation(totalRentCost, netHomeCost, breakEvenYears, analysisPeriod, monthlyRentCost, monthlyMortgageCost);
  analysis += `**${recommendation}**\n\n`;
  
  if (recommendation.includes('buying')) {
    analysis += `Homeownership appears to be financially beneficial based on the analysis above.\n`;
  } else if (recommendation.includes('renting')) {
    analysis += `Renting appears to be more financially advantageous at this time.\n`;
  } else {
    analysis += `Both options are financially comparable. Consider non-financial factors.\n`;
  }

  return analysis;
}

/**
 * Calculate year-by-year comparison
 */
export function calculateYearlyComparison(inputs: MortgageVsRentInputs): RentVsBuyScenario[] {
  const scenarios: RentVsBuyScenario[] = [];
  const {
    currentRent,
    rentIncreaseRate,
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,
    homeownersInsurance,
    pmiRate = 0,
    maintenanceCost,
    utilities,
    utilitiesHome,
    closingCosts,
    homeAppreciation,
    investmentReturn,
    analysisPeriod,
    rentersInsurance = 0,
    hoaFees = 0
  } = inputs;

  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = parseInt(loanTerm) * 12;
  const monthlyMortgagePayment = calculateMonthlyPayment(loanAmount, monthlyRate, totalMonths);

  let rentCumulative = 0;
  let mortgageCumulative = closingCosts;
  let monthlyRent = currentRent;

  for (let year = 1; year <= analysisPeriod; year++) {
    // Calculate annual rent costs
    const annualRentCost = (monthlyRent + utilities + rentersInsurance) * 12;
    rentCumulative += annualRentCost;

    // Calculate annual mortgage costs
    const monthlyPropertyTax = (homePrice * propertyTaxRate / 100) / 12;
    const monthlyHomeownersInsurance = homeownersInsurance / 12;
    const monthlyPMI = loanAmount > 0 && downPayment < homePrice * 0.2 ? (loanAmount * pmiRate / 100) / 12 : 0;
    const monthlyMaintenance = maintenanceCost / 12;
    const monthlyTotal = monthlyMortgagePayment + monthlyPropertyTax + monthlyHomeownersInsurance + 
                         monthlyPMI + monthlyMaintenance + utilitiesHome + hoaFees;
    mortgageCumulative += monthlyTotal * 12;

    // Calculate home value and equity
    const homeValue = homePrice * Math.pow(1 + homeAppreciation / 100, year);
    const remainingBalance = calculateRemainingBalance(loanAmount, monthlyRate, monthlyMortgagePayment, year * 12);
    const homeEquity = Math.max(0, homeValue - remainingBalance);

    // Calculate opportunity cost
    const opportunityCost = (downPayment + closingCosts) * (Math.pow(1 + investmentReturn / 100, year) - 1);

    scenarios.push({
      year,
      rentCost: annualRentCost,
      mortgageCost: monthlyTotal * 12,
      rentCumulative,
      mortgageCumulative,
      homeValue,
      homeEquity,
      opportunityCost
    });

    // Increase rent for next year
    monthlyRent *= (1 + rentIncreaseRate / 100);
  }

  return scenarios;
}