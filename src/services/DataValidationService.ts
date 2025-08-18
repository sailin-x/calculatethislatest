/**
 * Data validation service for ensuring data integrity and quality
 * Validates external data sources and provides data quality metrics
 */

export interface ValidationRule {
  id: string;
  name: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
  validate: (data: any, context?: any) => ValidationResult;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  details?: any;
  suggestedFix?: string;
}

export interface DataQualityReport {
  sourceId: string;
  timestamp: Date;
  overallScore: number; // 0-100
  totalRules: number;
  passedRules: number;
  failedRules: number;
  warnings: number;
  errors: number;
  results: Array<{
    ruleId: string;
    ruleName: string;
    severity: string;
    result: ValidationResult;
  }>;
  recommendations: string[];
}

export class DataValidationService {
  private validationRules: Map<string, ValidationRule[]> = new Map();

  constructor() {
    this.initializeValidationRules();
  }

  /**
   * Initialize validation rules for different data sources
   */
  private initializeValidationRules(): void {
    // Mortgage rates validation rules
    this.addValidationRules('mortgage-rates', [
      {
        id: 'mortgage-rates-range',
        name: 'Rate Range Check',
        description: 'Mortgage rates should be within reasonable range',
        severity: 'error',
        validate: (data) => {
          const rates = [data.conventional30, data.conventional15, data.fha30, data.va30, data.jumbo30];
          const invalidRates = rates.filter(rate => !rate || rate < 1 || rate > 20);
          
          return {
            isValid: invalidRates.length === 0,
            message: invalidRates.length > 0 ? `${invalidRates.length} rates are outside valid range (1-20%)` : 'All rates within valid range',
            details: { invalidRates },
            suggestedFix: 'Check data source for anomalies or update validation range'
          };
        }
      },
      {
        id: 'mortgage-rates-consistency',
        name: 'Rate Consistency Check',
        description: '15-year rates should typically be lower than 30-year rates',
        severity: 'warning',
        validate: (data) => {
          const isConsistent = data.conventional15 <= data.conventional30;
          
          return {
            isValid: isConsistent,
            message: isConsistent ? 'Rate structure is consistent' : '15-year rate is higher than 30-year rate',
            details: { 
              conventional15: data.conventional15, 
              conventional30: data.conventional30,
              difference: data.conventional15 - data.conventional30
            },
            suggestedFix: 'Verify data source accuracy - inverted yield curve may be temporary'
          };
        }
      },
      {
        id: 'mortgage-rates-freshness',
        name: 'Data Freshness Check',
        description: 'Data should be updated within expected timeframe',
        severity: 'warning',
        validate: (data) => {
          const lastUpdated = new Date(data.lastUpdated);
          const daysSinceUpdate = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
          const isFresh = daysSinceUpdate <= 7; // Within 1 week
          
          return {
            isValid: isFresh,
            message: isFresh ? 'Data is fresh' : `Data is ${Math.round(daysSinceUpdate)} days old`,
            details: { lastUpdated, daysSinceUpdate },
            suggestedFix: 'Update data source or check update schedule'
          };
        }
      }
    ]);

    // Regional property data validation rules
    this.addValidationRules('regional-property-data', [
      {
        id: 'property-tax-range',
        name: 'Property Tax Range Check',
        description: 'Property tax rates should be within reasonable range',
        severity: 'error',
        validate: (data) => {
          const rates = Object.values(data.propertyTaxRates || {}) as number[];
          const invalidRates = rates.filter(rate => !rate || rate < 0 || rate > 0.05); // 0-5%
          
          return {
            isValid: invalidRates.length === 0,
            message: invalidRates.length > 0 ? `${invalidRates.length} property tax rates are invalid` : 'All property tax rates valid',
            details: { invalidRates, totalRates: rates.length },
            suggestedFix: 'Review property tax data for outliers'
          };
        }
      },
      {
        id: 'insurance-rate-range',
        name: 'Insurance Rate Range Check',
        description: 'Insurance rates should be within reasonable range',
        severity: 'error',
        validate: (data) => {
          const rates = Object.values(data.insuranceRates || {}) as number[];
          const invalidRates = rates.filter(rate => !rate || rate < 0 || rate > 0.02); // 0-2%
          
          return {
            isValid: invalidRates.length === 0,
            message: invalidRates.length > 0 ? `${invalidRates.length} insurance rates are invalid` : 'All insurance rates valid',
            details: { invalidRates, totalRates: rates.length },
            suggestedFix: 'Review insurance rate data for outliers'
          };
        }
      },
      {
        id: 'regional-coverage',
        name: 'Regional Coverage Check',
        description: 'Should have data for major states',
        severity: 'warning',
        validate: (data) => {
          const majorStates = ['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI'];
          const availableStates = Object.keys(data.propertyTaxRates || {});
          const missingStates = majorStates.filter(state => !availableStates.includes(state));
          
          return {
            isValid: missingStates.length <= 2,
            message: missingStates.length > 2 ? `Missing data for ${missingStates.length} major states` : 'Good regional coverage',
            details: { missingStates, availableStates: availableStates.length },
            suggestedFix: 'Expand data collection to include missing major states'
          };
        }
      }
    ]);

    // Legal multipliers validation rules
    this.addValidationRules('legal-multipliers', [
      {
        id: 'multiplier-range',
        name: 'Multiplier Range Check',
        description: 'Legal multipliers should be within reasonable range',
        severity: 'error',
        validate: (data) => {
          const allMultipliers: number[] = [];
          
          Object.values(data.personalInjury || {}).forEach((jurisdiction: any) => {
            if (jurisdiction.minor) allMultipliers.push(jurisdiction.minor);
            if (jurisdiction.moderate) allMultipliers.push(jurisdiction.moderate);
            if (jurisdiction.severe) allMultipliers.push(jurisdiction.severe);
          });
          
          const invalidMultipliers = allMultipliers.filter(mult => mult < 1 || mult > 15);
          
          return {
            isValid: invalidMultipliers.length === 0,
            message: invalidMultipliers.length > 0 ? `${invalidMultipliers.length} multipliers outside valid range` : 'All multipliers within valid range',
            details: { invalidMultipliers, totalMultipliers: allMultipliers.length },
            suggestedFix: 'Review legal multiplier data for extreme values'
          };
        }
      },
      {
        id: 'multiplier-progression',
        name: 'Multiplier Progression Check',
        description: 'Severe injury multipliers should be higher than moderate, which should be higher than minor',
        severity: 'warning',
        validate: (data) => {
          const violations: string[] = [];
          
          Object.entries(data.personalInjury || {}).forEach(([jurisdiction, multipliers]: [string, any]) => {
            if (multipliers.minor >= multipliers.moderate) {
              violations.push(`${jurisdiction}: minor >= moderate`);
            }
            if (multipliers.moderate >= multipliers.severe) {
              violations.push(`${jurisdiction}: moderate >= severe`);
            }
          });
          
          return {
            isValid: violations.length === 0,
            message: violations.length > 0 ? `${violations.length} progression violations found` : 'Multiplier progression is logical',
            details: { violations },
            suggestedFix: 'Review multiplier values to ensure logical progression'
          };
        }
      }
    ]);

    // Market data validation rules
    this.addValidationRules('market-indices', [
      {
        id: 'market-index-range',
        name: 'Market Index Range Check',
        description: 'Market indices should be within reasonable range',
        severity: 'error',
        validate: (data) => {
          const checks = [
            { name: 'S&P 500', value: data.sp500, min: 1000, max: 10000 },
            { name: 'NASDAQ', value: data.nasdaq, min: 5000, max: 25000 },
            { name: 'Dow Jones', value: data.dow, min: 15000, max: 50000 },
            { name: 'VIX', value: data.vix, min: 5, max: 80 },
            { name: '10-Year Treasury', value: data.tenYearTreasury, min: 0, max: 15 },
            { name: 'Inflation Rate', value: data.inflationRate, min: -5, max: 20 }
          ];
          
          const failures = checks.filter(check => 
            !check.value || check.value < check.min || check.value > check.max
          );
          
          return {
            isValid: failures.length === 0,
            message: failures.length > 0 ? `${failures.length} market indices out of range` : 'All market indices within valid range',
            details: { failures },
            suggestedFix: 'Verify market data source for accuracy'
          };
        }
      },
      {
        id: 'market-volatility',
        name: 'Market Volatility Check',
        description: 'Check for unusual market volatility',
        severity: 'info',
        validate: (data, context) => {
          // This would compare against historical data in a real implementation
          const highVolatility = data.vix > 30;
          
          return {
            isValid: true, // This is informational only
            message: highVolatility ? 'High market volatility detected' : 'Normal market volatility',
            details: { vix: data.vix, threshold: 30 },
            suggestedFix: highVolatility ? 'Consider noting high volatility in calculations' : undefined
          };
        }
      }
    ]);

    // Construction costs validation rules
    this.addValidationRules('construction-costs', [
      {
        id: 'construction-cost-range',
        name: 'Construction Cost Range Check',
        description: 'Construction costs should be within reasonable range',
        severity: 'error',
        validate: (data) => {
          const materials = ['concrete', 'steel', 'lumber'];
          const ranges = {
            concrete: { min: 50, max: 200 }, // per cubic yard
            steel: { min: 400, max: 1500 }, // per ton
            lumber: { min: 300, max: 1200 } // per thousand board feet
          };
          
          const violations: string[] = [];
          
          materials.forEach(material => {
            const materialData = data[material] || {};
            const range = ranges[material as keyof typeof ranges];
            
            Object.entries(materialData).forEach(([region, cost]: [string, any]) => {
              if (cost < range.min || cost > range.max) {
                violations.push(`${material} in ${region}: $${cost} (expected ${range.min}-${range.max})`);
              }
            });
          });
          
          return {
            isValid: violations.length === 0,
            message: violations.length > 0 ? `${violations.length} cost values out of range` : 'All construction costs within valid range',
            details: { violations },
            suggestedFix: 'Review construction cost data for outliers'
          };
        }
      }
    ]);
  }

  /**
   * Add validation rules for a data source
   */
  addValidationRules(sourceId: string, rules: ValidationRule[]): void {
    const existingRules = this.validationRules.get(sourceId) || [];
    this.validationRules.set(sourceId, [...existingRules, ...rules]);
  }

  /**
   * Validate data for a specific source
   */
  validateData(sourceId: string, data: any, context?: any): DataQualityReport {
    const rules = this.validationRules.get(sourceId) || [];
    const results: Array<{
      ruleId: string;
      ruleName: string;
      severity: string;
      result: ValidationResult;
    }> = [];

    let passedRules = 0;
    let failedRules = 0;
    let warnings = 0;
    let errors = 0;

    // Run all validation rules
    for (const rule of rules) {
      try {
        const result = rule.validate(data, context);
        
        results.push({
          ruleId: rule.id,
          ruleName: rule.name,
          severity: rule.severity,
          result
        });

        if (result.isValid) {
          passedRules++;
        } else {
          failedRules++;
          
          if (rule.severity === 'error') {
            errors++;
          } else if (rule.severity === 'warning') {
            warnings++;
          }
        }
      } catch (error) {
        // Handle validation rule errors
        results.push({
          ruleId: rule.id,
          ruleName: rule.name,
          severity: 'error',
          result: {
            isValid: false,
            message: `Validation rule failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            suggestedFix: 'Check validation rule implementation'
          }
        });
        
        failedRules++;
        errors++;
      }
    }

    // Calculate overall score
    const overallScore = rules.length > 0 ? Math.round((passedRules / rules.length) * 100) : 100;

    // Generate recommendations
    const recommendations = this.generateRecommendations(results);

    return {
      sourceId,
      timestamp: new Date(),
      overallScore,
      totalRules: rules.length,
      passedRules,
      failedRules,
      warnings,
      errors,
      results,
      recommendations
    };
  }

  /**
   * Generate recommendations based on validation results
   */
  private generateRecommendations(results: Array<{
    ruleId: string;
    ruleName: string;
    severity: string;
    result: ValidationResult;
  }>): string[] {
    const recommendations: string[] = [];
    
    const errorCount = results.filter(r => r.severity === 'error' && !r.result.isValid).length;
    const warningCount = results.filter(r => r.severity === 'warning' && !r.result.isValid).length;

    if (errorCount > 0) {
      recommendations.push(`Address ${errorCount} critical data quality error(s) immediately`);
    }

    if (warningCount > 0) {
      recommendations.push(`Review ${warningCount} data quality warning(s) for potential improvements`);
    }

    if (errorCount === 0 && warningCount === 0) {
      recommendations.push('Data quality is excellent - no issues detected');
    }

    // Add specific recommendations from failed rules
    results
      .filter(r => !r.result.isValid && r.result.suggestedFix)
      .forEach(r => {
        if (r.result.suggestedFix && !recommendations.includes(r.result.suggestedFix)) {
          recommendations.push(r.result.suggestedFix);
        }
      });

    return recommendations;
  }

  /**
   * Get validation rules for a data source
   */
  getValidationRules(sourceId: string): ValidationRule[] {
    return this.validationRules.get(sourceId) || [];
  }

  /**
   * Remove validation rule
   */
  removeValidationRule(sourceId: string, ruleId: string): boolean {
    const rules = this.validationRules.get(sourceId);
    if (!rules) return false;

    const filteredRules = rules.filter(rule => rule.id !== ruleId);
    this.validationRules.set(sourceId, filteredRules);
    
    return filteredRules.length < rules.length;
  }

  /**
   * Get data quality summary across all sources
   */
  getQualitySummary(reports: DataQualityReport[]): {
    averageScore: number;
    totalSources: number;
    sourcesWithErrors: number;
    sourcesWithWarnings: number;
    totalErrors: number;
    totalWarnings: number;
    worstPerformingSource: string | null;
    bestPerformingSource: string | null;
  } {
    if (reports.length === 0) {
      return {
        averageScore: 0,
        totalSources: 0,
        sourcesWithErrors: 0,
        sourcesWithWarnings: 0,
        totalErrors: 0,
        totalWarnings: 0,
        worstPerformingSource: null,
        bestPerformingSource: null
      };
    }

    const averageScore = reports.reduce((sum, report) => sum + report.overallScore, 0) / reports.length;
    const sourcesWithErrors = reports.filter(r => r.errors > 0).length;
    const sourcesWithWarnings = reports.filter(r => r.warnings > 0).length;
    const totalErrors = reports.reduce((sum, report) => sum + report.errors, 0);
    const totalWarnings = reports.reduce((sum, report) => sum + report.warnings, 0);

    const sortedByScore = [...reports].sort((a, b) => a.overallScore - b.overallScore);
    const worstPerformingSource = sortedByScore[0]?.sourceId || null;
    const bestPerformingSource = sortedByScore[sortedByScore.length - 1]?.sourceId || null;

    return {
      averageScore: Math.round(averageScore),
      totalSources: reports.length,
      sourcesWithErrors,
      sourcesWithWarnings,
      totalErrors,
      totalWarnings,
      worstPerformingSource,
      bestPerformingSource
    };
  }

  /**
   * Export validation configuration
   */
  exportValidationConfig(): any {
    const config: Record<string, any> = {};
    
    for (const [sourceId, rules] of this.validationRules) {
      config[sourceId] = rules.map(rule => ({
        id: rule.id,
        name: rule.name,
        description: rule.description,
        severity: rule.severity
        // Note: validate function is not serializable
      }));
    }

    return {
      config,
      exportTimestamp: new Date()
    };
  }
}

// Export singleton instance
export const dataValidationService = new DataValidationService();