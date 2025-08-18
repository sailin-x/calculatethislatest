import { Formula, CalculationResult } from '../../../types/calculator';

export interface SaaSInputs {
  // Revenue metrics
  monthlyRecurringRevenue: number;
  annualRecurringRevenue?: number;
  totalRevenue: number;
  
  // Customer metrics
  totalCustomers: number;
  newCustomersThisMonth: number;
  churnedCustomersThisMonth: number;
  
  // Financial metrics
  customerAcquisitionCost: number;
  averageRevenuePerUser: number;
  grossMargin: number; // percentage
  
  // Cohort data (optional)
  cohortRetentionRates?: number[]; // monthly retention rates
  
  // Acquisition channels
  acquisitionChannels?: AcquisitionChannel[];
  
  // Time period
  timeHorizon: number; // months for projections
}

export interface AcquisitionChannel {
  name: string;
  customers: number;
  cost: number;
  conversionRate: number;
}

export interface SaaSMetrics {
  // Growth metrics
  monthlyGrowthRate: number;
  annualGrowthRate: number;
  compoundMonthlyGrowthRate: number;
  
  // Customer metrics
  customerLifetimeValue: number;
  churnRate: number;
  retentionRate: number;
  netRevenueRetention: number;
  
  // Unit economics
  ltv_cac_ratio: number;
  cacPaybackPeriod: number;
  grossRevenueRetention: number;
  
  // Financial health
  burnRate?: number;
  runway?: number;
  ruleOf40: number;
  
  // Efficiency metrics
  magicNumber?: number;
  salesEfficiency: number;
  
  // Projections
  projectedMRR: number[];
  projectedCustomers: number[];
  projectedRevenue: number[];
}

/**
 * Comprehensive SaaS metrics calculation formulas
 */
export class SaaSFormulas {
  
  /**
   * Calculate Customer Lifetime Value (LTV)
   */
  static calculateLTV(
    averageRevenuePerUser: number,
    grossMargin: number,
    churnRate: number
  ): number {
    if (churnRate <= 0) return Infinity;
    return (averageRevenuePerUser * (grossMargin / 100)) / (churnRate / 100);
  }

  /**
   * Calculate cohort-based LTV using retention curve
   */
  static calculateCohortLTV(
    averageRevenuePerUser: number,
    grossMargin: number,
    retentionRates: number[]
  ): number {
    let totalValue = 0;
    let remainingCustomers = 1; // Start with 1 customer
    
    for (let month = 0; month < retentionRates.length; month++) {
      if (month > 0) {
        remainingCustomers *= (retentionRates[month] / 100);
      }
      totalValue += remainingCustomers * averageRevenuePerUser * (grossMargin / 100);
    }
    
    return totalValue;
  }

  /**
   * Calculate monthly churn rate
   */
  static calculateChurnRate(
    churnedCustomers: number,
    totalCustomersAtStart: number
  ): number {
    if (totalCustomersAtStart <= 0) return 0;
    return (churnedCustomers / totalCustomersAtStart) * 100;
  }

  /**
   * Calculate Net Revenue Retention (NRR)
   */
  static calculateNetRevenueRetention(
    startingMRR: number,
    expansionMRR: number,
    contractionMRR: number,
    churnedMRR: number
  ): number {
    if (startingMRR <= 0) return 0;
    return ((startingMRR + expansionMRR - contractionMRR - churnedMRR) / startingMRR) * 100;
  }

  /**
   * Calculate CAC Payback Period
   */
  static calculateCACPaybackPeriod(
    customerAcquisitionCost: number,
    averageRevenuePerUser: number,
    grossMargin: number
  ): number {
    const monthlyGrossProfit = averageRevenuePerUser * (grossMargin / 100);
    if (monthlyGrossProfit <= 0) return Infinity;
    return customerAcquisitionCost / monthlyGrossProfit;
  }

  /**
   * Calculate LTV:CAC ratio
   */
  static calculateLTVCACRatio(ltv: number, cac: number): number {
    if (cac <= 0) return Infinity;
    return ltv / cac;
  }

  /**
   * Calculate Monthly Growth Rate
   */
  static calculateMonthlyGrowthRate(currentMRR: number, previousMRR: number): number {
    if (previousMRR <= 0) return 0;
    return ((currentMRR - previousMRR) / previousMRR) * 100;
  }

  /**
   * Calculate Compound Monthly Growth Rate (CMGR)
   */
  static calculateCMGR(startingMRR: number, endingMRR: number, months: number): number {
    if (startingMRR <= 0 || months <= 0) return 0;
    return (Math.pow(endingMRR / startingMRR, 1 / months) - 1) * 100;
  }

  /**
   * Calculate Rule of 40
   */
  static calculateRuleOf40(growthRate: number, profitMargin: number): number {
    return growthRate + profitMargin;
  }

  /**
   * Calculate Sales Efficiency (Magic Number)
   */
  static calculateMagicNumber(
    newMRRThisQuarter: number,
    salesAndMarketingSpendLastQuarter: number
  ): number {
    if (salesAndMarketingSpendLastQuarter <= 0) return 0;
    return (newMRRThisQuarter * 4) / salesAndMarketingSpendLastQuarter;
  }

  /**
   * Calculate Annual Contract Value (ACV)
   */
  static calculateACV(totalContractValue: number, contractLengthYears: number): number {
    if (contractLengthYears <= 0) return 0;
    return totalContractValue / contractLengthYears;
  }

  /**
   * Calculate Average Revenue Per Account (ARPA)
   */
  static calculateARPA(totalMRR: number, totalAccounts: number): number {
    if (totalAccounts <= 0) return 0;
    return totalMRR / totalAccounts;
  }

  /**
   * Project MRR growth with churn
   */
  static projectMRRGrowth(
    startingMRR: number,
    monthlyGrowthRate: number,
    churnRate: number,
    months: number
  ): number[] {
    const projections: number[] = [startingMRR];
    let currentMRR = startingMRR;
    
    for (let month = 1; month <= months; month++) {
      // Apply growth
      currentMRR *= (1 + monthlyGrowthRate / 100);
      // Apply churn
      currentMRR *= (1 - churnRate / 100);
      projections.push(currentMRR);
    }
    
    return projections;
  }

  /**
   * Calculate customer projections
   */
  static projectCustomerGrowth(
    startingCustomers: number,
    newCustomersPerMonth: number,
    churnRate: number,
    months: number
  ): number[] {
    const projections: number[] = [startingCustomers];
    let currentCustomers = startingCustomers;
    
    for (let month = 1; month <= months; month++) {
      // Add new customers
      currentCustomers += newCustomersPerMonth;
      // Apply churn
      currentCustomers *= (1 - churnRate / 100);
      projections.push(Math.round(currentCustomers));
    }
    
    return projections;
  }

  /**
   * Calculate channel efficiency
   */
  static calculateChannelEfficiency(channels: AcquisitionChannel[]): AcquisitionChannel[] {
    return channels.map(channel => ({
      ...channel,
      costPerCustomer: channel.customers > 0 ? channel.cost / channel.customers : 0,
      efficiency: channel.customers > 0 ? channel.customers / channel.cost * 1000 : 0 // customers per $1000 spent
    }));
  }

  /**
   * Calculate cohort retention analysis
   */
  static analyzeCohortRetention(retentionRates: number[]): {
    averageRetention: number;
    retentionTrend: 'improving' | 'declining' | 'stable';
    projectedLTV: number;
  } {
    if (retentionRates.length === 0) {
      return { averageRetention: 0, retentionTrend: 'stable', projectedLTV: 0 };
    }
    
    const averageRetention = retentionRates.reduce((sum, rate) => sum + rate, 0) / retentionRates.length;
    
    // Determine trend
    let retentionTrend: 'improving' | 'declining' | 'stable' = 'stable';
    if (retentionRates.length >= 3) {
      const firstHalf = retentionRates.slice(0, Math.floor(retentionRates.length / 2));
      const secondHalf = retentionRates.slice(Math.floor(retentionRates.length / 2));
      
      const firstAvg = firstHalf.reduce((sum, rate) => sum + rate, 0) / firstHalf.length;
      const secondAvg = secondHalf.reduce((sum, rate) => sum + rate, 0) / secondHalf.length;
      
      if (secondAvg > firstAvg * 1.05) retentionTrend = 'improving';
      else if (secondAvg < firstAvg * 0.95) retentionTrend = 'declining';
    }
    
    // Project LTV based on retention curve
    const projectedLTV = retentionRates.reduce((total, rate, index) => {
      return total + (rate / 100) * Math.pow(0.95, index); // Assume some natural decay
    }, 0);
    
    return { averageRetention, retentionTrend, projectedLTV };
  }

  /**
   * Calculate SaaS health score
   */
  static calculateHealthScore(metrics: {
    ltvCacRatio: number;
    churnRate: number;
    growthRate: number;
    grossMargin: number;
    netRevenueRetention: number;
  }): { score: number; grade: string; recommendations: string[] } {
    let score = 0;
    const recommendations: string[] = [];
    
    // LTV:CAC ratio (25 points)
    if (metrics.ltvCacRatio >= 3) score += 25;
    else if (metrics.ltvCacRatio >= 2) score += 15;
    else if (metrics.ltvCacRatio >= 1) score += 5;
    else recommendations.push('Improve LTV:CAC ratio to at least 3:1');
    
    // Churn rate (25 points)
    if (metrics.churnRate <= 2) score += 25;
    else if (metrics.churnRate <= 5) score += 15;
    else if (metrics.churnRate <= 10) score += 5;
    else recommendations.push('Reduce monthly churn rate below 5%');
    
    // Growth rate (25 points)
    if (metrics.growthRate >= 20) score += 25;
    else if (metrics.growthRate >= 10) score += 15;
    else if (metrics.growthRate >= 5) score += 5;
    else recommendations.push('Increase monthly growth rate above 10%');
    
    // Gross margin (15 points)
    if (metrics.grossMargin >= 80) score += 15;
    else if (metrics.grossMargin >= 70) score += 10;
    else if (metrics.grossMargin >= 60) score += 5;
    else recommendations.push('Improve gross margins above 70%');
    
    // Net Revenue Retention (10 points)
    if (metrics.netRevenueRetention >= 110) score += 10;
    else if (metrics.netRevenueRetention >= 100) score += 7;
    else if (metrics.netRevenueRetention >= 90) score += 3;
    else recommendations.push('Improve Net Revenue Retention above 100%');
    
    let grade = 'F';
    if (score >= 90) grade = 'A';
    else if (score >= 80) grade = 'B';
    else if (score >= 70) grade = 'C';
    else if (score >= 60) grade = 'D';
    
    return { score, grade, recommendations };
  }
}

/**
 * Main SaaS metrics calculator formula
 */
export const saasMetricsCalculatorFormula: Formula = {
  id: 'saas-metrics-calculator',
  name: 'Comprehensive SaaS Metrics Calculator',
  description: 'Advanced SaaS business metrics including LTV, CAC, churn analysis, cohort modeling, and growth projections',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const saasInputs = inputs as SaaSInputs;
    
    try {
      // Calculate basic metrics
      const churnRate = SaaSFormulas.calculateChurnRate(
        saasInputs.churnedCustomersThisMonth,
        saasInputs.totalCustomers
      );
      
      const retentionRate = 100 - churnRate;
      
      const ltv = SaaSFormulas.calculateLTV(
        saasInputs.averageRevenuePerUser,
        saasInputs.grossMargin,
        churnRate
      );
      
      const ltvCacRatio = SaaSFormulas.calculateLTVCACRatio(ltv, saasInputs.customerAcquisitionCost);
      
      const cacPaybackPeriod = SaaSFormulas.calculateCACPaybackPeriod(
        saasInputs.customerAcquisitionCost,
        saasInputs.averageRevenuePerUser,
        saasInputs.grossMargin
      );
      
      // Calculate growth metrics
      const monthlyGrowthRate = saasInputs.newCustomersThisMonth > 0 ? 
        (saasInputs.newCustomersThisMonth / saasInputs.totalCustomers) * 100 : 0;
      
      const annualGrowthRate = Math.pow(1 + monthlyGrowthRate / 100, 12) - 1;
      
      // Calculate Rule of 40 (assuming profit margin from gross margin)
      const estimatedProfitMargin = saasInputs.grossMargin - 50; // Rough estimate
      const ruleOf40 = SaaSFormulas.calculateRuleOf40(annualGrowthRate * 100, estimatedProfitMargin);
      
      // Project future metrics
      const projectedMRR = SaaSFormulas.projectMRRGrowth(
        saasInputs.monthlyRecurringRevenue,
        monthlyGrowthRate,
        churnRate,
        saasInputs.timeHorizon || 12
      );
      
      const projectedCustomers = SaaSFormulas.projectCustomerGrowth(
        saasInputs.totalCustomers,
        saasInputs.newCustomersThisMonth,
        churnRate,
        saasInputs.timeHorizon || 12
      );
      
      const projectedRevenue = projectedMRR.map(mrr => mrr * 12);
      
      // Calculate cohort analysis if data available
      let cohortAnalysis = null;
      if (saasInputs.cohortRetentionRates && saasInputs.cohortRetentionRates.length > 0) {
        cohortAnalysis = SaaSFormulas.analyzeCohortRetention(saasInputs.cohortRetentionRates);
      }
      
      // Calculate channel efficiency if data available
      let channelEfficiency = null;
      if (saasInputs.acquisitionChannels && saasInputs.acquisitionChannels.length > 0) {
        channelEfficiency = SaaSFormulas.calculateChannelEfficiency(saasInputs.acquisitionChannels);
      }
      
      // Calculate health score
      const healthScore = SaaSFormulas.calculateHealthScore({
        ltvCacRatio,
        churnRate,
        growthRate: monthlyGrowthRate,
        grossMargin: saasInputs.grossMargin,
        netRevenueRetention: 100 // Simplified assumption
      });
      
      // Calculate additional metrics
      const arpa = SaaSFormulas.calculateARPA(saasInputs.monthlyRecurringRevenue, saasInputs.totalCustomers);
      const annualRunRate = saasInputs.monthlyRecurringRevenue * 12;
      
      return {
        outputs: {
          // Core metrics
          customerLifetimeValue: ltv,
          ltvCacRatio,
          cacPaybackPeriod,
          churnRate,
          retentionRate,
          
          // Growth metrics
          monthlyGrowthRate,
          annualGrowthRate: annualGrowthRate * 100,
          ruleOf40,
          
          // Revenue metrics
          averageRevenuePerAccount: arpa,
          annualRunRate,
          
          // Projections
          projectedMRRIn12Months: projectedMRR[12] || projectedMRR[projectedMRR.length - 1],
          projectedCustomersIn12Months: projectedCustomers[12] || projectedCustomers[projectedCustomers.length - 1],
          projectedAnnualRevenue: projectedRevenue[12] || projectedRevenue[projectedRevenue.length - 1],
          
          // Health metrics
          healthScore: healthScore.score,
          healthGrade: healthScore.grade,
          
          // Advanced metrics
          cohortAnalysis,
          channelEfficiency,
          projectedMRR: projectedMRR.slice(0, 13), // First 12 months
          projectedCustomers: projectedCustomers.slice(0, 13)
        },
        explanation: `SaaS metrics analysis: LTV of ${ltv.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} with ${ltvCacRatio.toFixed(1)}:1 LTV:CAC ratio. Monthly churn rate: ${churnRate.toFixed(2)}%, Monthly growth: ${monthlyGrowthRate.toFixed(1)}%. Rule of 40 score: ${ruleOf40.toFixed(1)}. Health grade: ${healthScore.grade} (${healthScore.score}/100).`,
        intermediateSteps: {
          'Monthly Churn Rate': `${saasInputs.churnedCustomersThisMonth} ÷ ${saasInputs.totalCustomers} = ${churnRate.toFixed(2)}%`,
          'Customer LTV': `$${saasInputs.averageRevenuePerUser} × ${saasInputs.grossMargin}% ÷ ${churnRate.toFixed(2)}% = $${ltv.toLocaleString()}`,
          'LTV:CAC Ratio': `$${ltv.toLocaleString()} ÷ $${saasInputs.customerAcquisitionCost.toLocaleString()} = ${ltvCacRatio.toFixed(1)}:1`,
          'CAC Payback': `$${saasInputs.customerAcquisitionCost} ÷ ($${saasInputs.averageRevenuePerUser} × ${saasInputs.grossMargin}%) = ${cacPaybackPeriod.toFixed(1)} months`,
          'Annual Run Rate': `$${saasInputs.monthlyRecurringRevenue.toLocaleString()} × 12 = $${annualRunRate.toLocaleString()}`,
          'Rule of 40': `${(annualGrowthRate * 100).toFixed(1)}% growth + ${estimatedProfitMargin.toFixed(1)}% margin = ${ruleOf40.toFixed(1)}`
        }
      };
    } catch (error) {
      throw new Error(`SaaS metrics calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};