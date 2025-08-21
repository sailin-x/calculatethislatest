import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

function calculateMortgagePayment(principal: number, annualRate: number, termYears: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = termYears * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

function calculateNPV(cashFlows: number[], discountRate: number): number {
  return cashFlows.reduce((npv, cashFlow, year) => {
    return npv + cashFlow / Math.pow(1 + discountRate / 100, year);
  }, 0);
}

function calculateIRR(initialInvestment: number, cashFlows: number[], maxIterations: number = 100): number {
  let rate = 0.1; // Start with 10%
  
  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPV([-initialInvestment, ...cashFlows], rate * 100);
    
    if (Math.abs(npv) < 0.01) {
      return rate * 100;
    }
    
    // Simple Newton-Raphson approximation
    const derivative = cashFlows.reduce((sum, cashFlow, year) => {
      return sum - (year + 1) * cashFlow / Math.pow(1 + rate, year + 2);
    }, 0);
    
    rate = rate - npv / derivative;
    
    if (rate < -0.99 || rate > 10) {
      break;
    }
  }
  
  return rate * 100;
}

function calculateFinancialScore(
  totalRentCost: number, 
  netBuyCost: number, 
  breakEvenYears: number, 
  timeHorizon: number,
  roi: number,
  investmentReturn: number
): number {
  let score = 50; // Start neutral
  
  // Cost comparison (40% weight)
  const costRatio = totalRentCost / netBuyCost;
  if (costRatio > 1.2) score += 20; // Renting is 20%+ more expensive
  else if (costRatio < 0.8) score -= 20; // Buying is 20%+ more expensive
  else score += (costRatio - 1) * 50; // Linear adjustment
  
  // Break-even timing (30% weight)
  if (breakEvenYears <= timeHorizon * 0.5) score += 15; // Break-even in first half
  else if (breakEvenYears <= timeHorizon) score += 5; // Break-even within horizon
  else score -= 15; // Won't break-even
  
  // ROI comparison (30% weight)
  if (roi > investmentReturn) score += 15;
  else if (roi < investmentReturn * 0.5) score -= 15;
  else score += (roi - investmentReturn) / investmentReturn * 15;
  
  return Math.max(0, Math.min(100, score));
}

function calculateLifestyleScore(
  lifestylePreference: string,
  maintenancePreference: string,
  timeHorizon: number,
  flexibility: boolean
): number {
  let score = 50; // Start neutral
  
  // Lifestyle preference (40% weight)
  if (lifestylePreference === 'flexibility') score -= 20;
  else if (lifestylePreference === 'stability') score += 20;
  
  // Maintenance preference (30% weight)
  if (maintenancePreference === 'avoid') score -= 15;
  else if (maintenancePreference === 'handle') score += 15;
  
  // Time horizon factor (20% weight)
  if (timeHorizon < 3) score -= 10; // Short-term favors renting
  else if (timeHorizon > 7) score += 10; // Long-term favors buying
  
  // Flexibility need (10% weight)
  if (flexibility) score -= 5;
  
  return Math.max(0, Math.min(100, score));
}

export function calculateRentVsBuy(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract and set defaults
  const homePrice = inputs.homePrice || 0;
  const downPayment = inputs.downPayment || 0;
  const downPaymentPercent = inputs.downPaymentPercent || (downPayment / homePrice * 100);
  const closingCosts = inputs.closingCosts || (inputs.closingCostsPercent ? homePrice * inputs.closingCostsPercent / 100 : homePrice * 0.03);
  const loanAmount = inputs.loanAmount || (homePrice - downPayment);
  const interestRate = inputs.interestRate || 0;
  const loanTerm = inputs.loanTerm || 30;
  const pmi = inputs.pmi || (inputs.pmiRate ? loanAmount * inputs.pmiRate / 100 / 12 : 0);
  
  const monthlyRent = inputs.monthlyRent || 0;
  const rentIncreaseRate = inputs.rentIncreaseRate || 3;
  const rentersInsurance = inputs.rentersInsurance || 25;
  const securityDeposit = inputs.securityDeposit || monthlyRent;
  
  const propertyTaxes = inputs.propertyTaxes || (inputs.propertyTaxRate ? homePrice * inputs.propertyTaxRate / 100 : homePrice * 0.01);
  const homeownersInsurance = inputs.homeownersInsurance || 1200;
  const hoaFees = inputs.hoaFees || 0;
  const maintenance = inputs.maintenance || (inputs.maintenancePercent ? homePrice * inputs.maintenancePercent / 100 / 12 : homePrice * 0.01 / 12);
  const utilities = inputs.utilities || 200;
  
  const homeAppreciationRate = inputs.homeAppreciationRate || 3;
  const inflationRate = inputs.inflationRate || 2.5;
  const investmentReturn = inputs.investmentReturn || 7;
  const sellingCosts = inputs.sellingCosts || 6;
  
  const timeHorizon = inputs.timeHorizon || 7;
  const marginalTaxRate = inputs.marginalTaxRate || 22;
  const stateTaxRate = inputs.stateTaxRate || 5;
  const propertyTaxDeductible = inputs.propertyTaxDeductible || 'yes';
  
  // Calculate monthly costs
  const monthlyPayment = calculateMortgagePayment(loanAmount, interestRate, loanTerm);
  const monthlyPropertyTaxes = propertyTaxes / 12;
  const monthlyHomeownersInsurance = homeownersInsurance / 12;
  const monthlyMaintenance = maintenance;
  const monthlyUtilities = utilities;
  
  const monthlyBuyCost = monthlyPayment + monthlyPropertyTaxes + monthlyHomeownersInsurance + 
                        hoaFees + monthlyMaintenance + monthlyUtilities + pmi;
  
  const monthlyRentCost = monthlyRent + rentersInsurance;
  
  // Calculate annual costs
  const annualRentCost = monthlyRentCost * 12;
  const annualBuyCost = monthlyBuyCost * 12;
  
  // Calculate total costs over time horizon
  let totalRentCost = 0;
  let totalBuyCost = 0;
  let totalInterest = 0;
  let totalPrincipal = 0;
  let totalTaxSavings = 0;
  
  let currentRent = monthlyRent;
  let remainingLoan = loanAmount;
  let currentHomeValue = homePrice;
  
  for (let year = 1; year <= timeHorizon; year++) {
    // Rent costs
    totalRentCost += currentRent * 12 + rentersInsurance * 12;
    currentRent *= (1 + rentIncreaseRate / 100);
    
    // Buy costs
    const annualBuyCostThisYear = monthlyBuyCost * 12;
    totalBuyCost += annualBuyCostThisYear;
    
    // Mortgage breakdown
    const annualInterest = remainingLoan * (interestRate / 100);
    const annualPrincipal = monthlyPayment * 12 - annualInterest;
    totalInterest += annualInterest;
    totalPrincipal += annualPrincipal;
    remainingLoan -= annualPrincipal;
    
    // Tax savings
    const deductibleInterest = annualInterest;
    const deductiblePropertyTaxes = propertyTaxDeductible === 'yes' ? propertyTaxes : 
                                   propertyTaxDeductible === 'partial' ? propertyTaxes * 0.5 : 0;
    const totalDeductions = deductibleInterest + deductiblePropertyTaxes;
    const taxSavingsThisYear = totalDeductions * (marginalTaxRate + stateTaxRate) / 100;
    totalTaxSavings += taxSavingsThisYear;
    
    // Home appreciation
    currentHomeValue *= (1 + homeAppreciationRate / 100);
  }
  
  // Add upfront costs
  totalBuyCost += downPayment + closingCosts;
  
  // Calculate equity and net costs
  const homeValue = currentHomeValue;
  const equity = Math.max(0, homeValue - remainingLoan);
  const sellingCostsAmount = homeValue * sellingCosts / 100;
  const netBuyCost = totalBuyCost - equity + sellingCostsAmount - totalTaxSavings;
  
  // Calculate opportunity cost
  const opportunityCost = (downPayment + closingCosts) * Math.pow(1 + investmentReturn / 100, timeHorizon) - 
                         (downPayment + closingCosts);
  
  // Calculate break-even
  let breakEvenYears = 0;
  let cumulativeRentCost = 0;
  let cumulativeBuyCost = downPayment + closingCosts;
  let tempHomeValue = homePrice;
  let tempRemainingLoan = loanAmount;
  
  for (let year = 1; year <= 30; year++) {
    cumulativeRentCost += monthlyRent * Math.pow(1 + rentIncreaseRate / 100, year - 1) * 12 + rentersInsurance * 12;
    cumulativeBuyCost += monthlyBuyCost * 12;
    
    // Calculate equity
    const annualInterest = tempRemainingLoan * (interestRate / 100);
    const annualPrincipal = monthlyPayment * 12 - annualInterest;
    tempRemainingLoan -= annualPrincipal;
    tempHomeValue *= (1 + homeAppreciationRate / 100);
    const tempEquity = Math.max(0, tempHomeValue - tempRemainingLoan);
    
    if (cumulativeBuyCost - tempEquity <= cumulativeRentCost) {
      breakEvenYears = year;
      break;
    }
  }
  
  const breakEvenMonths = breakEvenYears * 12;
  const costDifference = totalRentCost - netBuyCost;
  const monthlySavings = costDifference > 0 ? costDifference / (timeHorizon * 12) : 0;
  const totalSavings = Math.max(0, costDifference);
  
  // Calculate ROI
  const totalInvestment = downPayment + closingCosts;
  const totalReturn = equity - totalInvestment + totalTaxSavings;
  const roi = totalInvestment > 0 ? (totalReturn / totalInvestment) * 100 : 0;
  
  // Calculate IRR
  const cashFlows = [];
  for (let year = 1; year <= timeHorizon; year++) {
    const rentCost = monthlyRent * Math.pow(1 + rentIncreaseRate / 100, year - 1) * 12 + rentersInsurance * 12;
    const buyCost = monthlyBuyCost * 12;
    cashFlows.push(rentCost - buyCost);
  }
  cashFlows[cashFlows.length - 1] += equity - sellingCostsAmount;
  
  const internalRateOfReturn = calculateIRR(totalInvestment, cashFlows);
  
  // Calculate NPV
  const netPresentValue = calculateNPV([-totalInvestment, ...cashFlows], investmentReturn);
  
  // Calculate scores
  const financialScore = calculateFinancialScore(totalRentCost, netBuyCost, breakEvenYears, timeHorizon, roi, investmentReturn);
  const lifestyleScore = calculateLifestyleScore(
    inputs.lifestylePreference || 'neutral',
    inputs.maintenancePreference || 'neutral',
    timeHorizon,
    timeHorizon < 5
  );
  const overallScore = (financialScore * 0.7 + lifestyleScore * 0.3);
  
  // Generate recommendation
  let recommendation = 'Buy';
  let keyFactors = '';
  let risks = '';
  
  if (overallScore < 40) {
    recommendation = 'Rent';
    keyFactors = 'High upfront costs, long break-even period, and lifestyle preferences favor renting';
    risks = 'Rent increases, lack of equity building, and potential housing market appreciation';
  } else if (overallScore < 60) {
    recommendation = 'Consider Both';
    keyFactors = 'Mixed financial and lifestyle factors - consider personal circumstances';
    risks = 'Market volatility, maintenance responsibilities, and flexibility constraints';
  } else {
    recommendation = 'Buy';
    keyFactors = 'Favorable financial comparison, short break-even period, and stability benefits';
    risks = 'Market downturns, maintenance costs, and reduced flexibility';
  }
  
  return {
    monthlyRentCost,
    monthlyBuyCost,
    annualRentCost,
    annualBuyCost,
    totalRentCost,
    totalBuyCost,
    monthlyPayment,
    totalInterest,
    totalPrincipal,
    homeValue,
    equity,
    netBuyCost,
    opportunityCost,
    taxSavings: totalTaxSavings,
    breakEvenYears,
    breakEvenMonths,
    costDifference,
    monthlySavings,
    totalSavings,
    roi,
    internalRateOfReturn,
    netPresentValue,
    financialScore,
    lifestyleScore,
    overallScore,
    recommendation,
    keyFactors,
    risks,
    rentVsBuyAnalysis: generateRentVsBuyAnalysis(inputs, {
      monthlyRentCost,
      monthlyBuyCost,
      annualRentCost,
      annualBuyCost,
      totalRentCost,
      totalBuyCost,
      monthlyPayment,
      totalInterest,
      totalPrincipal,
      homeValue,
      equity,
      netBuyCost,
      opportunityCost,
      taxSavings: totalTaxSavings,
      breakEvenYears,
      breakEvenMonths,
      costDifference,
      monthlySavings,
      totalSavings,
      roi,
      internalRateOfReturn,
      netPresentValue,
      financialScore,
      lifestyleScore,
      overallScore,
      recommendation,
      keyFactors,
      risks
    })
  };
}

export function generateRentVsBuyAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Rent vs. Buy Analysis Report

## Summary
**Recommendation: ${outputs.recommendation}**

This analysis compares renting vs buying a home over a ${inputs.timeHorizon}-year period. The overall score is **${outputs.overallScore.toFixed(1)}/100**, with a financial score of **${outputs.financialScore.toFixed(1)}/100** and lifestyle score of **${outputs.lifestyleScore.toFixed(1)}/100**.

## Cost Comparison

### Monthly Costs
- **Renting:** $${outputs.monthlyRentCost.toLocaleString()}/month
- **Buying:** $${outputs.monthlyBuyCost.toLocaleString()}/month
- **Difference:** $${(outputs.monthlyBuyCost - outputs.monthlyRentCost).toLocaleString()}/month

### Total Costs Over ${inputs.timeHorizon} Years
- **Total Rent Cost:** $${outputs.totalRentCost.toLocaleString()}
- **Net Buy Cost:** $${outputs.netBuyCost.toLocaleString()}
- **Cost Difference:** $${outputs.costDifference.toLocaleString()}

## Financial Analysis

### Break-Even Analysis
- **Break-Even Time:** ${outputs.breakEvenYears} years (${outputs.breakEvenMonths} months)
- **Monthly Payment:** $${outputs.monthlyPayment.toLocaleString()}
- **Total Interest Paid:** $${outputs.totalInterest.toLocaleString()}
- **Total Principal Paid:** $${outputs.totalPrincipal.toLocaleString()}

### Investment Analysis
- **ROI:** ${outputs.roi.toFixed(2)}%
- **Internal Rate of Return:** ${outputs.internalRateOfReturn.toFixed(2)}%
- **Net Present Value:** $${outputs.netPresentValue.toLocaleString()}
- **Opportunity Cost:** $${outputs.opportunityCost.toLocaleString()}

### Tax Benefits
- **Total Tax Savings:** $${outputs.taxSavings.toLocaleString()}
- **Annual Tax Savings:** $${(outputs.taxSavings / inputs.timeHorizon).toLocaleString()}

## Property Details

### Home Value Projection
- **Initial Value:** $${inputs.homePrice?.toLocaleString()}
- **Projected Value:** $${outputs.homeValue.toLocaleString()}
- **Appreciation:** ${((outputs.homeValue / (inputs.homePrice || 1) - 1) * 100).toFixed(2)}%

### Equity Building
- **Projected Equity:** $${outputs.equity.toLocaleString()}
- **Equity Percentage:** ${((outputs.equity / outputs.homeValue) * 100).toFixed(2)}%

## Key Factors

${outputs.keyFactors}

## Risks to Consider

${outputs.risks}

## Detailed Breakdown

### Renting Costs
- Monthly Rent: $${inputs.monthlyRent?.toLocaleString()}
- Renters Insurance: $${(inputs.rentersInsurance || 25).toLocaleString()}/month
- Security Deposit: $${(inputs.securityDeposit || inputs.monthlyRent).toLocaleString()}
- Annual Rent Increase: ${inputs.rentIncreaseRate || 3}%

### Buying Costs
- Home Price: $${inputs.homePrice?.toLocaleString()}
- Down Payment: $${inputs.downPayment?.toLocaleString()} (${inputs.downPaymentPercent || (inputs.downPayment || 0) / (inputs.homePrice || 1) * 100}%)
- Closing Costs: $${(inputs.closingCosts || (inputs.homePrice || 0) * 0.03).toLocaleString()}
- Interest Rate: ${inputs.interestRate}%
- Loan Term: ${inputs.loanTerm} years

### Ongoing Homeownership Costs
- Property Taxes: $${(inputs.propertyTaxes || (inputs.homePrice || 0) * 0.01).toLocaleString()}/year
- Homeowners Insurance: $${(inputs.homeownersInsurance || 1200).toLocaleString()}/year
- HOA Fees: $${(inputs.hoaFees || 0).toLocaleString()}/month
- Maintenance: $${(inputs.maintenance || (inputs.homePrice || 0) * 0.01 / 12).toLocaleString()}/month
- Utilities: $${(inputs.utilities || 200).toLocaleString()}/month

## Market Assumptions

- Home Appreciation: ${inputs.homeAppreciationRate || 3}% annually
- Rent Increase: ${inputs.rentIncreaseRate || 3}% annually
- Investment Return: ${inputs.investmentReturn || 7}% annually
- Inflation: ${inputs.inflationRate || 2.5}% annually
- Selling Costs: ${inputs.sellingCosts || 6}% of home value

## Recommendations

1. **Financial Considerations:**
   - ${outputs.costDifference > 0 ? 'Renting is more expensive by $' + outputs.costDifference.toLocaleString() : 'Buying is more expensive by $' + Math.abs(outputs.costDifference).toLocaleString()}
   - Break-even occurs in ${outputs.breakEvenYears} years
   - Consider your investment alternatives and risk tolerance

2. **Lifestyle Considerations:**
   - Time horizon of ${inputs.timeHorizon} years ${inputs.timeHorizon < 5 ? 'favors renting' : 'favors buying'}
   - Maintenance preferences: ${inputs.maintenancePreference || 'neutral'}
   - Flexibility needs: ${inputs.lifestylePreference || 'neutral'}

3. **Risk Management:**
   - Ensure adequate emergency fund
   - Consider market volatility and maintenance costs
   - Evaluate job stability and relocation likelihood

## Next Steps

1. Review your personal circumstances and preferences
2. Consult with a financial advisor or real estate professional
3. Consider market conditions in your specific area
4. Evaluate your long-term financial goals
5. Assess your comfort with homeownership responsibilities

*This analysis is based on current market conditions and assumptions. Actual results may vary based on market changes, personal circumstances, and other factors.*`;
}
