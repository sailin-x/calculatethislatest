import { MortgageAPRComparisonInputs } from './validation';

export interface MortgageOption {
  id: string;
  name: string;
  interestRate: number;
  closingCosts: number;
  points: number;
  originationFee: number;
  applicationFee: number;
  appraisalFee: number;
  titleInsurance: number;
  escrowFees: number;
  otherFees: number;
  lenderCredits: number;
  rateLockFee: number;
  prepaymentPenalty: number;
  monthlyPMI: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
}

export interface ComparisonResult {
  comparisonTable: MortgageComparisonRow[];
  bestOption: MortgageComparisonRow;
  totalCostComparison: TotalCostComparison;
  monthlyPaymentComparison: MonthlyPaymentComparison;
  aprComparison: APRComparison;
  breakEvenAnalysis: BreakEvenAnalysis;
  savingsAnalysis: SavingsAnalysis;
  recommendation: string;
  keyMetrics: KeyMetrics;
}

export interface MortgageComparisonRow {
  optionId: string;
  optionName: string;
  interestRate: number;
  apr: number;
  monthlyPayment: number;
  totalCost: number;
  closingCosts: number;
  totalFees: number;
  breakEvenMonths: number;
  totalSavings: number;
  recommendation: string;
}

export interface TotalCostComparison {
  options: { id: string; name: string; totalCost: number; savings: number }[];
  bestOption: string;
  worstOption: string;
  totalSavings: number;
}

export interface MonthlyPaymentComparison {
  options: { id: string; name: string; monthlyPayment: number; difference: number }[];
  lowestPayment: string;
  highestPayment: string;
  paymentRange: number;
}

export interface APRComparison {
  options: { id: string; name: string; apr: number; difference: number }[];
  lowestAPR: string;
  highestAPR: string;
  aprRange: number;
}

export interface BreakEvenAnalysis {
  comparisons: BreakEvenComparison[];
  averageBreakEven: number;
}

export interface BreakEvenComparison {
  option1: string;
  option2: string;
  breakEvenMonths: number;
  monthlySavings: number;
  totalSavings: number;
}

export interface SavingsAnalysis {
  bestVsWorst: number;
  bestVsAverage: number;
  fiveYearSavings: number;
  tenYearSavings: number;
  lifetimeSavings: number;
}

export interface KeyMetrics {
  averageAPR: number;
  averageMonthlyPayment: number;
  averageClosingCosts: number;
  averageTotalCost: number;
  costRange: number;
  paymentRange: number;
  aprRange: number;
}

export const calculateMortgageAPRComparison = (inputs: MortgageAPRComparisonInputs): ComparisonResult => {
  const { loanAmount, loanTerm, mortgageOptions } = inputs;
  
  // Calculate APR and costs for each option
  const comparisonRows: MortgageComparisonRow[] = mortgageOptions.map(option => {
    const monthlyRate = option.interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    
    // Calculate monthly payment
    const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyRate, totalPayments);
    
    // Calculate total fees
    const totalFees = option.closingCosts + option.points + option.originationFee + 
                     option.applicationFee + option.appraisalFee + option.titleInsurance + 
                     option.escrowFees + option.otherFees + option.rateLockFee - option.lenderCredits;
    
    // Calculate APR
    const apr = calculateAPR(loanAmount, monthlyPayment, totalPayments, totalFees);
    
    // Calculate total cost
    const totalCost = (monthlyPayment * totalPayments) + totalFees;
    
    return {
      optionId: option.id,
      optionName: option.name,
      interestRate: option.interestRate,
      apr: apr,
      monthlyPayment: monthlyPayment,
      totalCost: totalCost,
      closingCosts: option.closingCosts,
      totalFees: totalFees,
      breakEvenMonths: 0, // Will be calculated later
      totalSavings: 0, // Will be calculated later
      recommendation: ''
    };
  });
  
  // Sort by total cost to find best option
  comparisonRows.sort((a, b) => a.totalCost - b.totalCost);
  
  // Calculate break-even analysis
  const breakEvenAnalysis = calculateBreakEvenAnalysis(comparisonRows);
  
  // Calculate savings analysis
  const savingsAnalysis = calculateSavingsAnalysis(comparisonRows);
  
  // Determine best option
  const bestOption = comparisonRows[0];
  
  // Generate recommendations
  comparisonRows.forEach(row => {
    row.recommendation = generateRecommendation(row, bestOption, comparisonRows);
  });
  
  // Calculate comparison metrics
  const totalCostComparison = calculateTotalCostComparison(comparisonRows);
  const monthlyPaymentComparison = calculateMonthlyPaymentComparison(comparisonRows);
  const aprComparison = calculateAPRComparison(comparisonRows);
  const keyMetrics = calculateKeyMetrics(comparisonRows);
  
  // Generate overall recommendation
  const recommendation = generateOverallRecommendation(comparisonRows, savingsAnalysis, breakEvenAnalysis);
  
  return {
    comparisonTable: comparisonRows,
    bestOption: bestOption,
    totalCostComparison,
    monthlyPaymentComparison,
    aprComparison,
    breakEvenAnalysis,
    savingsAnalysis,
    recommendation,
    keyMetrics
  };
};

const calculateMonthlyPayment = (principal: number, monthlyRate: number, totalPayments: number): number => {
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                 (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  return Math.round(payment * 100) / 100;
};

const calculateAPR = (principal: number, monthlyPayment: number, totalPayments: number, totalFees: number): number => {
  const netPrincipal = principal - totalFees;
  
  // Use Newton's method to find the APR
  let apr = 0.05; // Initial guess
  const tolerance = 0.0001;
  const maxIterations = 100;
  
  for (let i = 0; i < maxIterations; i++) {
    const monthlyRate = apr / 12;
    const calculatedPayment = calculateMonthlyPayment(netPrincipal, monthlyRate, totalPayments);
    
    if (Math.abs(calculatedPayment - monthlyPayment) < tolerance) {
      break;
    }
    
    // Adjust APR
    const derivative = calculateAPRDerivative(netPrincipal, monthlyRate, totalPayments);
    apr = apr - (calculatedPayment - monthlyPayment) / derivative;
    
    if (apr < 0) apr = 0.001;
    if (apr > 1) apr = 0.99;
  }
  
  return Math.round(apr * 10000) / 100;
};

const calculateAPRDerivative = (principal: number, monthlyRate: number, totalPayments: number): number => {
  const term1 = principal * Math.pow(1 + monthlyRate, totalPayments);
  const term2 = totalPayments * monthlyRate * Math.pow(1 + monthlyRate, totalPayments - 1);
  const denominator = Math.pow(Math.pow(1 + monthlyRate, totalPayments) - 1, 2);
  
  return (term1 - term2) / denominator / 12;
};

const calculateBreakEvenAnalysis = (options: MortgageComparisonRow[]): BreakEvenAnalysis => {
  const comparisons: BreakEvenComparison[] = [];
  
  for (let i = 0; i < options.length; i++) {
    for (let j = i + 1; j < options.length; j++) {
      const option1 = options[i];
      const option2 = options[j];
      
      const costDifference = option2.totalFees - option1.totalFees;
      const paymentDifference = option1.monthlyPayment - option2.monthlyPayment;
      
      let breakEvenMonths = 0;
      if (paymentDifference > 0) {
        breakEvenMonths = costDifference / paymentDifference;
      }
      
      const monthlySavings = Math.abs(paymentDifference);
      const totalSavings = Math.abs(option2.totalCost - option1.totalCost);
      
      comparisons.push({
        option1: option1.optionName,
        option2: option2.optionName,
        breakEvenMonths: Math.round(breakEvenMonths * 100) / 100,
        monthlySavings: monthlySavings,
        totalSavings: totalSavings
      });
    }
  }
  
  const averageBreakEven = comparisons.length > 0 
    ? comparisons.reduce((sum, comp) => sum + comp.breakEvenMonths, 0) / comparisons.length
    : 0;
  
  return {
    comparisons,
    averageBreakEven: Math.round(averageBreakEven * 100) / 100
  };
};

const calculateSavingsAnalysis = (options: MortgageComparisonRow[]): SavingsAnalysis => {
  const best = options[0];
  const worst = options[options.length - 1];
  const average = options.reduce((sum, opt) => sum + opt.totalCost, 0) / options.length;
  
  const bestVsWorst = worst.totalCost - best.totalCost;
  const bestVsAverage = average - best.totalCost;
  
  // Calculate savings over different time periods
  const monthlySavings = worst.monthlyPayment - best.monthlyPayment;
  const fiveYearSavings = monthlySavings * 60;
  const tenYearSavings = monthlySavings * 120;
  const lifetimeSavings = bestVsWorst;
  
  return {
    bestVsWorst: Math.round(bestVsWorst * 100) / 100,
    bestVsAverage: Math.round(bestVsAverage * 100) / 100,
    fiveYearSavings: Math.round(fiveYearSavings * 100) / 100,
    tenYearSavings: Math.round(tenYearSavings * 100) / 100,
    lifetimeSavings: Math.round(lifetimeSavings * 100) / 100
  };
};

const calculateTotalCostComparison = (options: MortgageComparisonRow[]): TotalCostComparison => {
  const best = options[0];
  const worst = options[options.length - 1];
  
  const comparisonOptions = options.map(option => ({
    id: option.optionId,
    name: option.optionName,
    totalCost: option.totalCost,
    savings: best.totalCost - option.totalCost
  }));
  
  return {
    options: comparisonOptions,
    bestOption: best.optionName,
    worstOption: worst.optionName,
    totalSavings: Math.round((worst.totalCost - best.totalCost) * 100) / 100
  };
};

const calculateMonthlyPaymentComparison = (options: MortgageComparisonRow[]): MonthlyPaymentComparison => {
  const lowest = options.reduce((min, opt) => opt.monthlyPayment < min.monthlyPayment ? opt : min);
  const highest = options.reduce((max, opt) => opt.monthlyPayment > max.monthlyPayment ? opt : max);
  
  const comparisonOptions = options.map(option => ({
    id: option.optionId,
    name: option.optionName,
    monthlyPayment: option.monthlyPayment,
    difference: option.monthlyPayment - lowest.monthlyPayment
  }));
  
  return {
    options: comparisonOptions,
    lowestPayment: lowest.optionName,
    highestPayment: highest.optionName,
    paymentRange: Math.round((highest.monthlyPayment - lowest.monthlyPayment) * 100) / 100
  };
};

const calculateAPRComparison = (options: MortgageComparisonRow[]): APRComparison => {
  const lowest = options.reduce((min, opt) => opt.apr < min.apr ? opt : min);
  const highest = options.reduce((max, opt) => opt.apr > max.apr ? opt : max);
  
  const comparisonOptions = options.map(option => ({
    id: option.optionId,
    name: option.optionName,
    apr: option.apr,
    difference: option.apr - lowest.apr
  }));
  
  return {
    options: comparisonOptions,
    lowestAPR: lowest.optionName,
    highestAPR: highest.optionName,
    aprRange: Math.round((highest.apr - lowest.apr) * 100) / 100
  };
};

const calculateKeyMetrics = (options: MortgageComparisonRow[]): KeyMetrics => {
  const averageAPR = options.reduce((sum, opt) => sum + opt.apr, 0) / options.length;
  const averageMonthlyPayment = options.reduce((sum, opt) => sum + opt.monthlyPayment, 0) / options.length;
  const averageClosingCosts = options.reduce((sum, opt) => sum + opt.closingCosts, 0) / options.length;
  const averageTotalCost = options.reduce((sum, opt) => sum + opt.totalCost, 0) / options.length;
  
  const costRange = options[options.length - 1].totalCost - options[0].totalCost;
  const paymentRange = Math.max(...options.map(opt => opt.monthlyPayment)) - Math.min(...options.map(opt => opt.monthlyPayment));
  const aprRange = Math.max(...options.map(opt => opt.apr)) - Math.min(...options.map(opt => opt.apr));
  
  return {
    averageAPR: Math.round(averageAPR * 100) / 100,
    averageMonthlyPayment: Math.round(averageMonthlyPayment * 100) / 100,
    averageClosingCosts: Math.round(averageClosingCosts * 100) / 100,
    averageTotalCost: Math.round(averageTotalCost * 100) / 100,
    costRange: Math.round(costRange * 100) / 100,
    paymentRange: Math.round(paymentRange * 100) / 100,
    aprRange: Math.round(aprRange * 100) / 100
  };
};

const generateRecommendation = (option: MortgageComparisonRow, bestOption: MortgageComparisonRow, allOptions: MortgageComparisonRow[]): string => {
  if (option.optionId === bestOption.optionId) {
    return 'Best overall value - lowest total cost';
  }
  
  const costDifference = option.totalCost - bestOption.totalCost;
  const paymentDifference = option.monthlyPayment - bestOption.monthlyPayment;
  
  if (costDifference < 5000) {
    return 'Good value - minimal cost difference';
  } else if (paymentDifference < 50) {
    return 'Consider for lower monthly payment';
  } else {
    return 'Higher cost option - consider alternatives';
  }
};

const generateOverallRecommendation = (options: MortgageComparisonRow[], savingsAnalysis: SavingsAnalysis, breakEvenAnalysis: BreakEvenAnalysis): string => {
  const bestOption = options[0];
  const worstOption = options[options.length - 1];
  
  let recommendation = `Based on the analysis, ${bestOption.optionName} offers the best overall value with a total cost of $${bestOption.totalCost.toLocaleString()} over the loan term. `;
  
  if (savingsAnalysis.bestVsWorst > 10000) {
    recommendation += `Choosing this option over ${worstOption.optionName} could save you $${savingsAnalysis.bestVsWorst.toLocaleString()} over the life of the loan. `;
  }
  
  if (breakEvenAnalysis.averageBreakEven < 24) {
    recommendation += `The break-even point for most comparisons is under 2 years, making the lower-cost options attractive for long-term savings. `;
  }
  
  recommendation += `Consider your financial situation, how long you plan to stay in the home, and your preference for lower monthly payments versus total cost savings when making your final decision.`;
  
  return recommendation;
};

export const generateMortgageAPRComparisonAnalysis = (inputs: MortgageAPRComparisonInputs, outputs: ComparisonResult): string => {
  const { comparisonTable, bestOption, totalCostComparison, savingsAnalysis, recommendation } = outputs;
  
  let analysis = `# Mortgage APR Comparison Analysis\n\n`;
  
  analysis += `## Summary\n`;
  analysis += `- **Loan Amount:** $${inputs.loanAmount.toLocaleString()}\n`;
  analysis += `- **Loan Term:** ${inputs.loanTerm} years\n`;
  analysis += `- **Number of Options Compared:** ${comparisonTable.length}\n`;
  analysis += `- **Best Option:** ${bestOption.optionName}\n`;
  analysis += `- **Potential Savings:** $${savingsAnalysis.bestVsWorst.toLocaleString()}\n\n`;
  
  analysis += `## Detailed Comparison\n\n`;
  analysis += `| Option | Interest Rate | APR | Monthly Payment | Total Cost | Closing Costs | Recommendation |\n`;
  analysis += `|--------|---------------|-----|-----------------|------------|---------------|----------------|\n`;
  
  comparisonTable.forEach(option => {
    analysis += `| ${option.optionName} | ${option.interestRate}% | ${option.apr}% | $${option.monthlyPayment.toLocaleString()} | $${option.totalCost.toLocaleString()} | $${option.closingCosts.toLocaleString()} | ${option.recommendation} |\n`;
  });
  
  analysis += `\n## Key Findings\n\n`;
  analysis += `- **Lowest APR:** ${comparisonTable.reduce((min, opt) => opt.apr < min.apr ? opt : min).optionName} (${comparisonTable.reduce((min, opt) => opt.apr < min.apr ? opt : min).apr}%)\n`;
  analysis += `- **Lowest Monthly Payment:** ${comparisonTable.reduce((min, opt) => opt.monthlyPayment < min.monthlyPayment ? opt : min).optionName} ($${comparisonTable.reduce((min, opt) => opt.monthlyPayment < min.monthlyPayment ? opt : min).monthlyPayment.toLocaleString()})\n`;
  analysis += `- **Lowest Total Cost:** ${bestOption.optionName} ($${bestOption.totalCost.toLocaleString()})\n`;
  analysis += `- **Cost Range:** $${totalCostComparison.totalSavings.toLocaleString()}\n`;
  analysis += `- **Monthly Payment Range:** $${Math.round((Math.max(...comparisonTable.map(opt => opt.monthlyPayment)) - Math.min(...comparisonTable.map(opt => opt.monthlyPayment))) * 100) / 100}\n\n`;
  
  analysis += `## Savings Analysis\n\n`;
  analysis += `- **5-Year Savings:** $${savingsAnalysis.fiveYearSavings.toLocaleString()}\n`;
  analysis += `- **10-Year Savings:** $${savingsAnalysis.tenYearSavings.toLocaleString()}\n`;
  analysis += `- **Lifetime Savings:** $${savingsAnalysis.lifetimeSavings.toLocaleString()}\n\n`;
  
  analysis += `## Recommendation\n\n`;
  analysis += `${recommendation}\n\n`;
  
  analysis += `## Additional Considerations\n\n`;
  analysis += `- **Break-even Analysis:** Consider how long you plan to stay in the home when choosing between lower closing costs and lower interest rates.\n`;
  analysis += `- **Monthly Budget:** Ensure the monthly payment fits comfortably within your budget.\n`;
  analysis += `- **Future Plans:** Consider potential refinancing or selling scenarios.\n`;
  analysis += `- **Rate Lock:** Consider the cost and benefits of rate lock options.\n`;
  
  return analysis;
};