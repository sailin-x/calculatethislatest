import { Formula, CalculationResult } from '../../../types/calculator';
import { RetirementCalculatorInputs, RetirementCalculatorResults } from './types';

/**
 * Advanced retirement planning calculation formulas
 */
export class RetirementFormulas {
  
  /**
   * Calculate total savings at retirement
   */
  static calculateTotalSavingsAtRetirement(
    currentSavings: number,
    monthlyContribution: number,
    expectedReturn: number,
    yearsToRetirement: number
  ): { totalSavings: number; totalContributions: number; totalReturns: number } {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = yearsToRetirement * 12;
    
    // Future value of current savings
    const currentSavingsFV = currentSavings * Math.pow(1 + monthlyRate, months);
    
    // Future value of monthly contributions (annuity)
    const contributionFV = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    const totalSavings = currentSavingsFV + contributionFV;
    const totalContributions = currentSavings + (monthlyContribution * months);
    const totalReturns = totalSavings - totalContributions;
    
    return { totalSavings, totalContributions, totalReturns };
  }

  /**
   * Calculate retirement income from savings
   */
  static calculateRetirementIncome(
    totalSavings: number,
    yearsOfRetirement: number,
    expectedReturn: number,
    inflationRate: number
  ): { monthlyIncome: number; annualIncome: number; adjustedForInflation: number } {
    const realReturn = expectedReturn - inflationRate;
    const monthlyRate = realReturn / 100 / 12;
    const months = yearsOfRetirement * 12;
    
    // Calculate sustainable withdrawal rate (4% rule adjusted for inflation)
    const sustainableWithdrawalRate = Math.max(0.02, realReturn / 100); // Minimum 2%
    const annualIncome = totalSavings * sustainableWithdrawalRate;
    const monthlyIncome = annualIncome / 12;
    
    // Inflation-adjusted income
    const adjustedForInflation = monthlyIncome / Math.pow(1 + inflationRate / 100, yearsOfRetirement / 2);
    
    return { monthlyIncome, annualIncome, adjustedForInflation };
  }

  /**
   * Calculate Social Security benefits
   */
  static calculateSocialSecurityBenefits(
    currentIncome: number,
    retirementAge: number,
    includeInflation: boolean,
    inflationRate: number
  ): { monthlyBenefit: number; annualBenefit: number } {
    // Simplified Social Security calculation (actual formula is much more complex)
    const averageIndexedMonthlyEarnings = Math.min(currentIncome / 12, 106800 / 12); // 2023 max
    const primaryInsuranceAmount = averageIndexedMonthlyEarnings * 0.4; // Simplified PIA calculation
    
    // Apply early/late retirement adjustments
    let adjustmentFactor = 1.0;
    if (retirementAge < 67) {
      adjustmentFactor = 0.7 + (retirementAge - 62) * 0.06; // Early retirement reduction
    } else if (retirementAge > 67) {
      adjustmentFactor = 1.0 + (retirementAge - 67) * 0.08; // Delayed retirement credits
    }
    
    let monthlyBenefit = primaryInsuranceAmount * adjustmentFactor;
    
    // Adjust for inflation if requested
    if (includeInflation) {
      const yearsToRetirement = Math.max(0, retirementAge - 30); // Assume 30 years of work
      monthlyBenefit *= Math.pow(1 + inflationRate / 100, yearsToRetirement);
    }
    
    const annualBenefit = monthlyBenefit * 12;
    
    return { monthlyBenefit, annualBenefit };
  }

  /**
   * Calculate healthcare costs in retirement
   */
  static calculateHealthcareCosts(
    currentAge: number,
    retirementAge: number,
    includeInflation: boolean,
    inflationRate: number
  ): { monthlyCost: number; annualCost: number } {
    // Base healthcare costs (Medicare + supplemental insurance)
    let baseMonthlyCost = 500; // Medicare Part B + D + supplemental
    
    // Additional costs for long-term care
    const longTermCareRisk = Math.max(0, (retirementAge - 65) / 20); // Risk increases with age
    const longTermCareCost = 3000 * longTermCareRisk; // $3,000/month for long-term care
    
    let totalMonthlyCost = baseMonthlyCost + longTermCareCost;
    
    // Adjust for inflation
    if (includeInflation) {
      const yearsToRetirement = retirementAge - currentAge;
      totalMonthlyCost *= Math.pow(1 + inflationRate / 100, yearsToRetirement);
    }
    
    const annualCost = totalMonthlyCost * 12;
    
    return { monthlyCost: totalMonthlyCost, annualCost };
  }

  /**
   * Run Monte Carlo simulation for retirement planning
   */
  static runMonteCarloSimulation(
    inputs: RetirementCalculatorInputs,
    samples: number = 10000
  ): {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    probabilityOfSuccess: number;
    expectedValue: number;
  } {
    const results: number[] = [];
    const targetIncome = inputs.desiredRetirementIncome;
    
    for (let i = 0; i < samples; i++) {
      // Generate random return scenarios
      const returnVolatility = inputs.expectedReturn * 0.15; // 15% volatility
      const randomReturn = inputs.expectedReturn + (Math.random() - 0.5) * returnVolatility * 2;
      
      // Calculate retirement savings with random returns
      const { totalSavings } = this.calculateTotalSavingsAtRetirement(
        inputs.currentSavings + inputs.current401k + inputs.currentIRA + inputs.otherInvestments,
        inputs.monthly401kContribution + inputs.monthlyIRAContribution + inputs.otherMonthlyContributions,
        randomReturn,
        inputs.retirementAge - inputs.currentAge
      );
      
      // Calculate retirement income
      const { monthlyIncome } = this.calculateRetirementIncome(
        totalSavings,
        inputs.lifeExpectancy - inputs.retirementAge,
        randomReturn,
        inputs.inflationRate
      );
      
      // Add other income sources
      const totalMonthlyIncome = monthlyIncome + 
        (inputs.includeSocialSecurity ? inputs.socialSecurityMonthly : 0) +
        inputs.pensionMonthly +
        inputs.otherIncomeMonthly;
      
      results.push(totalMonthlyIncome);
    }
    
    // Sort results for percentile calculations
    results.sort((a, b) => a - b);
    
    const getPercentile = (p: number) => {
      const index = Math.floor(p * samples);
      return results[Math.min(index, samples - 1)];
    };
    
    const successCount = results.filter(r => r >= targetIncome).length;
    
    return {
      percentile10: getPercentile(0.10),
      percentile25: getPercentile(0.25),
      percentile50: getPercentile(0.50),
      percentile75: getPercentile(0.75),
      percentile90: getPercentile(0.90),
      probabilityOfSuccess: (successCount / samples) * 100,
      expectedValue: results.reduce((sum, val) => sum + val, 0) / samples
    };
  }

  /**
   * Calculate required savings rate
   */
  static calculateRequiredSavingsRate(
    inputs: RetirementCalculatorInputs,
    targetIncome: number
  ): { requiredMonthlySavings: number; requiredAnnualSavings: number; savingsRate: number } {
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
    const currentSavings = inputs.currentSavings + inputs.current401k + inputs.currentIRA + inputs.otherInvestments;
    
    // Calculate required total savings
    const requiredSavings = targetIncome * 25; // 4% rule
    
    // Calculate required monthly contribution
    const monthlyRate = inputs.expectedReturn / 100 / 12;
    const months = yearsToRetirement * 12;
    
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, months);
    const additionalSavingsNeeded = requiredSavings - futureValueOfCurrentSavings;
    
    const requiredMonthlySavings = additionalSavingsNeeded > 0 ? 
      additionalSavingsNeeded / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) : 0;
    
    const requiredAnnualSavings = requiredMonthlySavings * 12;
    const savingsRate = (requiredAnnualSavings / inputs.currentIncome) * 100;
    
    return { requiredMonthlySavings, requiredAnnualSavings, savingsRate };
  }

  /**
   * Generate retirement savings schedule
   */
  static generateSavingsSchedule(inputs: RetirementCalculatorInputs): Array<{
    age: number;
    year: number;
    beginningBalance: number;
    contributions: number;
    investmentReturns: number;
    endingBalance: number;
    projectedRetirementIncome: number;
  }> {
    const schedule = [];
    let balance = inputs.currentSavings + inputs.current401k + inputs.currentIRA + inputs.otherInvestments;
    const monthlyContribution = inputs.monthly401kContribution + inputs.monthlyIRAContribution + inputs.otherMonthlyContributions;
    const monthlyRate = inputs.expectedReturn / 100 / 12;
    
    for (let year = 1; year <= inputs.retirementAge - inputs.currentAge; year++) {
      const beginningBalance = balance;
      const contributions = monthlyContribution * 12;
      
      // Calculate investment returns
      const averageBalance = beginningBalance + contributions / 2;
      const investmentReturns = averageBalance * (inputs.expectedReturn / 100);
      
      balance = beginningBalance + contributions + investmentReturns;
      
      // Calculate projected retirement income
      const { monthlyIncome } = this.calculateRetirementIncome(
        balance,
        inputs.lifeExpectancy - inputs.currentAge - year,
        inputs.expectedReturn,
        inputs.inflationRate
      );
      
      schedule.push({
        age: inputs.currentAge + year,
        year,
        beginningBalance,
        contributions,
        investmentReturns,
        endingBalance: balance,
        projectedRetirementIncome: monthlyIncome
      });
    }
    
    return schedule;
  }
}

/**
 * Main retirement calculator formula
 */
export const retirementCalculatorFormula: Formula = {
  id: 'retirement-calculator',
  name: 'Comprehensive Retirement Planning Calculator',
  description: 'Advanced retirement planning with multiple income sources, inflation adjustment, healthcare costs, and Monte Carlo analysis',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const retirementInputs = inputs as RetirementCalculatorInputs;
    
    try {
      const yearsToRetirement = retirementInputs.retirementAge - retirementInputs.currentAge;
      const yearsOfRetirement = retirementInputs.lifeExpectancy - retirementInputs.retirementAge;
      
      // Calculate total current savings
      const totalCurrentSavings = retirementInputs.currentSavings + 
        retirementInputs.current401k + 
        retirementInputs.currentIRA + 
        retirementInputs.otherInvestments;
      
      // Calculate total monthly contributions
      const totalMonthlyContribution = retirementInputs.monthly401kContribution + 
        retirementInputs.monthlyIRAContribution + 
        retirementInputs.otherMonthlyContributions;
      
      // Calculate projected savings at retirement
      const { totalSavings, totalContributions, totalReturns } = 
        RetirementFormulas.calculateTotalSavingsAtRetirement(
          totalCurrentSavings,
          totalMonthlyContribution,
          retirementInputs.expectedReturn,
          yearsToRetirement
        );
      
      // Calculate retirement income from savings
      const { monthlyIncome: savingsIncome, annualIncome: savingsAnnual } = 
        RetirementFormulas.calculateRetirementIncome(
          totalSavings,
          yearsOfRetirement,
          retirementInputs.expectedReturn,
          retirementInputs.inflationRate
        );
      
      // Calculate Social Security benefits
      const { monthlyBenefit: ssMonthly, annualBenefit: ssAnnual } = 
        RetirementFormulas.calculateSocialSecurityBenefits(
          retirementInputs.currentIncome,
          retirementInputs.retirementAge,
          retirementInputs.includeInflation,
          retirementInputs.inflationRate
        );
      
      // Calculate total retirement income
      const totalMonthlyIncome = savingsIncome + 
        (retirementInputs.includeSocialSecurity ? ssMonthly : 0) +
        retirementInputs.pensionMonthly +
        retirementInputs.otherIncomeMonthly;
      
      const totalAnnualIncome = totalMonthlyIncome * 12;
      
      // Calculate retirement expenses
      const { monthlyCost: healthcareMonthly } = 
        RetirementFormulas.calculateHealthcareCosts(
          retirementInputs.currentAge,
          retirementInputs.retirementAge,
          retirementInputs.includeHealthcare,
          retirementInputs.inflationRate
        );
      
      const desiredMonthlyIncome = retirementInputs.desiredRetirementIncome / 12;
      const incomeGap = desiredMonthlyIncome - totalMonthlyIncome;
      
      // Calculate required savings
      const { requiredMonthlySavings, requiredAnnualSavings, savingsRate } = 
        RetirementFormulas.calculateRequiredSavingsRate(
          retirementInputs,
          retirementInputs.desiredRetirementIncome
        );
      
      // Generate savings schedule
      const savingsSchedule = RetirementFormulas.generateSavingsSchedule(retirementInputs);
      
      // Run Monte Carlo simulation
      const monteCarloResults = RetirementFormulas.runMonteCarloSimulation(
        retirementInputs,
        retirementInputs.monteCarloSamples || 10000
      );
      
      // Calculate retirement readiness score
      const readinessScore = Math.min(100, (totalMonthlyIncome / desiredMonthlyIncome) * 100);
      
      // Generate recommendations
      const recommendations = [];
      if (incomeGap > 0) {
        recommendations.push(`Increase monthly savings by $${incomeGap.toFixed(0)}`);
      }
      if (retirementInputs.retirementAge < 67) {
        recommendations.push('Consider delaying retirement to increase Social Security benefits');
      }
      if (savingsRate > 20) {
        recommendations.push('Your savings rate is excellent - consider tax-advantaged accounts');
      }
      
      const results: RetirementCalculatorResults = {
        basicCalculation: {
          totalSavingsAtRetirement: totalSavings,
          monthlyRetirementIncome: totalMonthlyIncome,
          annualRetirementIncome: totalAnnualIncome,
          retirementIncomeGap: incomeGap,
          yearsOfRetirement
        },
        detailedAnalysis: {
          projectedSavings: {
            personalSavings: totalCurrentSavings,
            employer401k: retirementInputs.current401k,
            employerMatch: retirementInputs.employerMatch,
            totalProjected: totalSavings
          },
          retirementIncome: {
            fromSavings: savingsIncome,
            fromSocialSecurity: retirementInputs.includeSocialSecurity ? ssMonthly : 0,
            fromPension: retirementInputs.pensionMonthly,
            fromOtherSources: retirementInputs.otherIncomeMonthly,
            totalMonthly: totalMonthlyIncome,
            totalAnnual: totalAnnualIncome
          },
          retirementExpenses: {
            basicLiving: desiredMonthlyIncome,
            healthcare: healthcareMonthly,
            longTermCare: retirementInputs.longTermCareCosts / 12,
            totalMonthly: desiredMonthlyIncome + healthcareMonthly + retirementInputs.longTermCareCosts / 12,
            totalAnnual: retirementInputs.desiredRetirementIncome + healthcareMonthly * 12 + retirementInputs.longTermCareCosts
          }
        },
        riskAnalysis: {
          probabilityOfSuccess: monteCarloResults.probabilityOfSuccess,
          worstCaseScenario: monteCarloResults.percentile10,
          bestCaseScenario: monteCarloResults.percentile90,
          medianScenario: monteCarloResults.percentile50,
          yearsOfSavings: yearsOfRetirement,
          shortfallAmount: Math.max(0, incomeGap)
        },
        recommendations: {
          requiredMonthlySavings: requiredMonthlySavings,
          requiredAnnualSavings: requiredAnnualSavings,
          savingsRate,
          catchUpContributions: Math.max(0, 6500 - retirementInputs.monthlyIRAContribution * 12),
          retirementAgeAdjustment: incomeGap > 0 ? 2 : 0,
          incomeReplacementNeeded: Math.max(0, incomeGap)
        },
        savingsSchedule: savingsSchedule.slice(0, 10), // First 10 years
        summary: {
          totalContributions: totalContributions,
          totalInvestmentReturns: totalReturns,
          finalPortfolioValue: totalSavings,
          monthlyRetirementIncome: totalMonthlyIncome,
          retirementReadinessScore: readinessScore,
          keyRecommendations: recommendations
        },
        monteCarloResults
      };
      
      return {
        outputs: results,
        explanation: `Based on your current savings of $${totalCurrentSavings.toLocaleString()} and monthly contributions of $${totalMonthlyContribution.toLocaleString()}, you're projected to have $${totalSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })} at retirement. This would provide $${totalMonthlyIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} monthly in retirement income. Your retirement readiness score is ${readinessScore.toFixed(0)}%.`,
        intermediateSteps: {
          'Years to Retirement': `${yearsToRetirement} years`,
          'Years of Retirement': `${yearsOfRetirement} years`,
          'Total Current Savings': `$${totalCurrentSavings.toLocaleString()}`,
          'Monthly Contributions': `$${totalMonthlyContribution.toLocaleString()}`,
          'Expected Annual Return': `${retirementInputs.expectedReturn}%`,
          'Projected Total Savings': `$${totalSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
        }
      };
    } catch (error) {
      throw new Error(`Retirement calculation failed: ${error}`);
    }
  }
};
