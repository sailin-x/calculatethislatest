import { Formula, CalculationResult } from '../../../types/calculator';
import { CompoundInterestInputs, CompoundInterestResults } from './types';

/**
 * Advanced compound interest calculation formulas
 */
export class CompoundInterestFormulas {
  
  /**
   * Calculate compound interest with various compounding frequencies
   */
  static calculateCompoundInterest(
    principal: number,
    rate: number,
    time: number,
    compoundingFrequency: number = 12
  ): { futureValue: number; interestEarned: number; effectiveRate: number } {
    const r = rate / 100;
    const n = compoundingFrequency;
    const t = time;
    
    const futureValue = principal * Math.pow(1 + r / n, n * t);
    const interestEarned = futureValue - principal;
    const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;
    
    return { futureValue, interestEarned, effectiveRate };
  }

  /**
   * Calculate continuous compounding
   */
  static calculateContinuousCompounding(
    principal: number,
    rate: number,
    time: number
  ): { futureValue: number; interestEarned: number } {
    const r = rate / 100;
    const futureValue = principal * Math.exp(r * time);
    const interestEarned = futureValue - principal;
    
    return { futureValue, interestEarned };
  }

  /**
   * Calculate compound interest with regular contributions
   */
  static calculateWithContributions(
    principal: number,
    rate: number,
    time: number,
    monthlyContribution: number,
    compoundingFrequency: number = 12
  ): { futureValue: number; totalContributions: number; interestEarned: number } {
    const r = rate / 100;
    const n = compoundingFrequency;
    const t = time;
    const pmt = monthlyContribution;
    
    // Future value of initial principal
    const principalFV = principal * Math.pow(1 + r / n, n * t);
    
    // Future value of regular contributions (annuity)
    const contributionFV = pmt * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
    
    const futureValue = principalFV + contributionFV;
    const totalContributions = principal + (pmt * 12 * t);
    const interestEarned = futureValue - totalContributions;
    
    return { futureValue, totalContributions, interestEarned };
  }

  /**
   * Calculate time to reach a target amount
   */
  static calculateTimeToTarget(
    principal: number,
    rate: number,
    targetAmount: number,
    monthlyContribution: number = 0,
    compoundingFrequency: number = 12
  ): number {
    const r = rate / 100;
    const n = compoundingFrequency;
    const pmt = monthlyContribution;
    
    if (pmt === 0) {
      // Simple case: no contributions
      return Math.log(targetAmount / principal) / (n * Math.log(1 + r / n));
    } else {
      // With contributions, use iterative approach
      let time = 0;
      let currentValue = principal;
      
      while (currentValue < targetAmount && time < 100) {
        time += 1/12; // Increment by month
        const { futureValue } = this.calculateWithContributions(
          principal, rate, time, pmt, n
        );
        currentValue = futureValue;
      }
      
      return time;
    }
  }

  /**
   * Calculate required rate to reach target
   */
  static calculateRequiredRate(
    principal: number,
    targetAmount: number,
    time: number,
    monthlyContribution: number = 0,
    compoundingFrequency: number = 12
  ): number {
    if (monthlyContribution === 0) {
      // Simple case: no contributions
      const n = compoundingFrequency;
      const t = time;
      return (Math.pow(targetAmount / principal, 1 / (n * t)) - 1) * n * 100;
    } else {
      // With contributions, use iterative approach
      let rate = 0;
      let step = 1;
      let attempts = 0;
      
      while (attempts < 1000) {
        const { futureValue } = this.calculateWithContributions(
          principal, rate, time, monthlyContribution, compoundingFrequency
        );
        
        if (Math.abs(futureValue - targetAmount) < 0.01) {
          break;
        }
        
        if (futureValue < targetAmount) {
          rate += step;
        } else {
          rate -= step;
          step *= 0.5;
        }
        
        attempts++;
      }
      
      return rate;
    }
  }

  /**
   * Generate compound interest schedule
   */
  static generateSchedule(
    principal: number,
    rate: number,
    time: number,
    monthlyContribution: number = 0,
    compoundingFrequency: number = 12
  ): Array<{
    year: number;
    beginningBalance: number;
    contributions: number;
    interestEarned: number;
    endingBalance: number;
  }> {
    const schedule = [];
    let balance = principal;
    
    for (let year = 1; year <= time; year++) {
      const beginningBalance = balance;
      const contributions = monthlyContribution * 12;
      
      const { futureValue, interestEarned } = this.calculateWithContributions(
        balance, rate, 1, monthlyContribution, compoundingFrequency
      );
      
      balance = futureValue;
      
      schedule.push({
        year,
        beginningBalance,
        contributions,
        interestEarned,
        endingBalance: balance
      });
    }
    
    return schedule;
  }

  /**
   * Calculate inflation-adjusted returns
   */
  static calculateInflationAdjusted(
    nominalRate: number,
    inflationRate: number,
    time: number,
    principal: number
  ): { realRate: number; realValue: number; purchasingPower: number } {
    const realRate = ((1 + nominalRate / 100) / (1 + inflationRate / 100) - 1) * 100;
    const realValue = principal * Math.pow(1 + realRate / 100, time);
    const purchasingPower = realValue / Math.pow(1 + inflationRate / 100, time);
    
    return { realRate, realValue, purchasingPower };
  }

  /**
   * Calculate tax impact on compound interest
   */
  static calculateTaxImpact(
    principal: number,
    rate: number,
    time: number,
    taxRate: number,
    compoundingFrequency: number = 12
  ): { afterTaxValue: number; taxPaid: number; effectiveRate: number } {
    const afterTaxRate = rate * (1 - taxRate / 100);
    const { futureValue } = this.calculateCompoundInterest(
      principal, afterTaxRate, time, compoundingFrequency
    );
    
    const { futureValue: preTaxValue } = this.calculateCompoundInterest(
      principal, rate, time, compoundingFrequency
    );
    
    const taxPaid = (preTaxValue - principal) * (taxRate / 100);
    const effectiveRate = afterTaxRate;
    
    return { afterTaxValue: futureValue, taxPaid, effectiveRate };
  }
}

/**
 * Main compound interest calculator formula
 */
export const compoundInterestCalculatorFormula: Formula = {
  id: 'compound-interest-calculator',
  name: 'Advanced Compound Interest Calculator',
  description: 'Comprehensive compound interest calculations with contributions, inflation adjustment, and tax considerations',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const compoundInputs = inputs as CompoundInterestInputs;
    
    try {
      const {
        principal,
        rate,
        time,
        compoundingFrequency,
        monthlyContribution,
        inflationRate,
        taxRate,
        includeInflation,
        includeTax
      } = compoundInputs;

      // Basic compound interest calculation
      const basicResult = CompoundInterestFormulas.calculateCompoundInterest(
        principal, rate, time, compoundingFrequency
      );

      // With contributions
      const withContributions = CompoundInterestFormulas.calculateWithContributions(
        principal, rate, time, monthlyContribution || 0, compoundingFrequency
      );

      // Inflation adjustment
      let inflationAdjusted = null;
      if (includeInflation && inflationRate) {
        inflationAdjusted = CompoundInterestFormulas.calculateInflationAdjusted(
          rate, inflationRate, time, principal
        );
      }

      // Tax impact
      let taxImpact = null;
      if (includeTax && taxRate) {
        taxImpact = CompoundInterestFormulas.calculateTaxImpact(
          principal, rate, time, taxRate, compoundingFrequency
        );
      }

      // Generate schedule
      const schedule = CompoundInterestFormulas.generateSchedule(
        principal, rate, time, monthlyContribution || 0, compoundingFrequency
      );

      // Calculate time to target if specified
      let timeToTarget = null;
      if (compoundInputs.targetAmount) {
        timeToTarget = CompoundInterestFormulas.calculateTimeToTarget(
          principal, rate, compoundInputs.targetAmount, monthlyContribution || 0, compoundingFrequency
        );
      }

      const results: CompoundInterestResults = {
        basicCalculation: {
          futureValue: basicResult.futureValue,
          interestEarned: basicResult.interestEarned,
          effectiveRate: basicResult.effectiveRate
        },
        withContributions: {
          futureValue: withContributions.futureValue,
          totalContributions: withContributions.totalContributions,
          interestEarned: withContributions.interestEarned
        },
        schedule: schedule.slice(0, 10), // First 10 years for display
        inflationAdjusted,
        taxImpact,
        timeToTarget,
        summary: {
          totalValue: withContributions.futureValue,
          totalInterest: withContributions.interestEarned,
          totalContributions: withContributions.totalContributions,
          effectiveAnnualRate: basicResult.effectiveRate
        }
      };

      return {
        outputs: results,
        explanation: `With an initial investment of $${principal.toLocaleString()} at ${rate}% annual interest compounded ${compoundingFrequency} times per year, your investment will grow to $${basicResult.futureValue.toLocaleString('en-US', { maximumFractionDigits: 2 })} after ${time} years. Including monthly contributions of $${monthlyContribution || 0}, the total value would be $${withContributions.futureValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}.`,
        intermediateSteps: {
          'Principal Amount': `$${principal.toLocaleString()}`,
          'Annual Interest Rate': `${rate}%`,
          'Compounding Frequency': `${compoundingFrequency} times per year`,
          'Time Period': `${time} years`,
          'Monthly Contributions': `$${monthlyContribution || 0}`,
          'Effective Annual Rate': `${basicResult.effectiveRate.toFixed(4)}%`
        }
      };
    } catch (error) {
      throw new Error(`Compound interest calculation failed: ${error}`);
    }
  }
};
