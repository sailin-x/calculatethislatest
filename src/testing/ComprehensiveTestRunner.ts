/**
 * Comprehensive test runner that orchestrates all testing frameworks
 * Provides unified testing interface for accuracy, performance, and accessibility
 */

import { testFramework, TestFramework, ValidationReport } from './TestFramework';
import { performanceTestFramework, PerformanceTestFramework, PerformanceReport } from './PerformanceTestFramework';
import { accessibilityTestFramework, AccessibilityTestFramework, AccessibilityReport } from './AccessibilityTestFramework';
import { mortgageTestSuite } from './testSuites/MortgageTestSuite';
import { investmentTestSuite } from './testSuites/InvestmentTestSuite';
import { mathTestSuite } from './testSuites/MathTestSuite';

export interface ComprehensiveTestConfig {
  includeAccuracyTests: boolean;
  includePerformanceTests: boolean;
  includeAccessibilityTests: boolean;
  calculatorIds?: string[];
  generateReports: boolean;
  exportResults: boolean;
}

export interface ComprehensiveTestResult {
  calculatorId: string;
  timestamp: Date;
  accuracyReport?: ValidationReport;
  performanceReport?: PerformanceReport;
  accessibilityReport?: AccessibilityReport;
  overallScore: number;
  certification: 'passed' | 'failed' | 'pending';
  recommendations: string[];
}

export interface TestSuiteResults {
  timestamp: Date;
  totalCalculators: number;
  results: ComprehensiveTestResult[];
  overallStatistics: {
    averageAccuracyScore: number;
    averagePerformanceScore: number;
    averageAccessibilityScore: number;
    overallCertificationRate: number;
  };
  industryBenchmarkComparison: {
    accuracyVsIndustry: 'above' | 'at' | 'below';
    performanceVsIndustry: 'above' | 'at' | 'below';
    accessibilityVsIndustry: 'above' | 'at' | 'below';
  };
  recommendations: string[];
}

export class ComprehensiveTestRunner {
  private testFramework: TestFramework;
  private performanceFramework: PerformanceTestFramework;
  private accessibilityFramework: AccessibilityTestFramework;

  constructor() {
    this.testFramework = testFramework;
    this.performanceFramework = performanceTestFramework;
    this.accessibilityFramework = accessibilityTestFramework;
    this.initializeTestSuites();
  }

  /**
   * Initialize test suites for all calculators
   */
  private initializeTestSuites(): void {
    // Register test suites
    this.testFramework.registerTestSuite(mortgageTestSuite);
    this.testFramework.registerTestSuite(investmentTestSuite);
    this.testFramework.registerTestSuite(mathTestSuite);

    console.log('Test suites initialized for comprehensive testing');
  }

  /**
   * Run comprehensive tests for all calculators
   */
  async runComprehensiveTests(config: ComprehensiveTestConfig = {
    includeAccuracyTests: true,
    includePerformanceTests: true,
    includeAccessibilityTests: true,
    generateReports: true,
    exportResults: true
  }): Promise<TestSuiteResults> {
    
    const calculatorIds = config.calculatorIds || [
      'mortgage-calculator',
      'portfolio-calculator',
      'algebra-calculator',
      'personal-injury-calculator',
      'saas-metrics-calculator',
      'bmr-calculator',
      'concrete-calculator'
    ];

    const results: ComprehensiveTestResult[] = [];
    
    console.log(`Starting comprehensive testing for ${calculatorIds.length} calculators...`);

    // Run tests for each calculator
    for (const calculatorId of calculatorIds) {
      try {
        console.log(`Testing ${calculatorId}...`);
        const result = await this.runCalculatorTests(calculatorId, config);
        results.push(result);
        console.log(`✅ ${calculatorId} testing complete (Score: ${result.overallScore})`);
      } catch (error) {
        console.error(`❌ Failed to test ${calculatorId}:`, error);
        
        // Add failed result
        results.push({
          calculatorId,
          timestamp: new Date(),
          overallScore: 0,
          certification: 'failed',
          recommendations: [`Testing failed: ${error instanceof Error ? error.message : 'Unknown error'}`]
        });
      }
    }

    // Run accessibility tests (global)
    let accessibilityReport: AccessibilityReport | undefined;
    if (config.includeAccessibilityTests) {
      console.log('Running accessibility tests...');
      accessibilityReport = await this.accessibilityFramework.runAccessibilityTests();
      console.log(`✅ Accessibility testing complete (Score: ${accessibilityReport.overallScore})`);
    }

    // Calculate overall statistics
    const overallStatistics = this.calculateOverallStatistics(results, accessibilityReport);
    const industryBenchmarkComparison = this.compareToIndustryBenchmarks(results);
    const recommendations = this.generateOverallRecommendations(results, accessibilityReport);

    const testSuiteResults: TestSuiteResults = {
      timestamp: new Date(),
      totalCalculators: calculatorIds.length,
      results,
      overallStatistics,
      industryBenchmarkComparison,
      recommendations
    };

    // Generate reports if requested
    if (config.generateReports) {
      await this.generateComprehensiveReports(testSuiteResults, accessibilityReport);
    }

    // Export results if requested
    if (config.exportResults) {
      await this.exportTestResults(testSuiteResults);
    }

    console.log('🎉 Comprehensive testing complete!');
    return testSuiteResults;
  }

  /**
   * Run tests for a single calculator
   */
  private async runCalculatorTests(
    calculatorId: string, 
    config: ComprehensiveTestConfig
  ): Promise<ComprehensiveTestResult> {
    
    let accuracyReport: ValidationReport | undefined;
    let performanceReport: PerformanceReport | undefined;

    // Run accuracy tests
    if (config.includeAccuracyTests) {
      try {
        accuracyReport = await this.testFramework.runTests(calculatorId);
      } catch (error) {
        console.warn(`Accuracy testing failed for ${calculatorId}:`, error);
      }
    }

    // Run performance tests
    if (config.includePerformanceTests) {
      try {
        performanceReport = await this.performanceFramework.runPerformanceTests(calculatorId);
      } catch (error) {
        console.warn(`Performance testing failed for ${calculatorId}:`, error);
      }
    }

    // Calculate overall score and certification
    const overallScore = this.calculateOverallScore(accuracyReport, performanceReport);
    const certification = this.determineCertification(accuracyReport, performanceReport);
    const recommendations = this.generateCalculatorRecommendations(accuracyReport, performanceReport);

    return {
      calculatorId,
      timestamp: new Date(),
      accuracyReport,
      performanceReport,
      overallScore,
      certification,
      recommendations
    };
  }

  /**
   * Calculate overall score for a calculator
   */
  private calculateOverallScore(
    accuracyReport?: ValidationReport,
    performanceReport?: PerformanceReport
  ): number {
    let totalScore = 0;
    let weights = 0;

    if (accuracyReport) {
      totalScore += accuracyReport.successRate * 0.6; // 60% weight for accuracy
      weights += 0.6;
    }

    if (performanceReport) {
      const performanceScore = (performanceReport.passedTests / performanceReport.totalTests) * 100;
      totalScore += performanceScore * 0.4; // 40% weight for performance
      weights += 0.4;
    }

    return weights > 0 ? Math.round(totalScore / weights) : 0;
  }

  /**
   * Determine certification status
   */
  private determineCertification(
    accuracyReport?: ValidationReport,
    performanceReport?: PerformanceReport
  ): 'passed' | 'failed' | 'pending' {
    
    // Must pass accuracy tests
    if (accuracyReport && accuracyReport.certificationStatus === 'failed') {
      return 'failed';
    }

    // Must have reasonable performance
    if (performanceReport && performanceReport.overallRating === 'poor') {
      return 'failed';
    }

    // If accuracy is passed and performance is acceptable
    if (accuracyReport?.certificationStatus === 'passed' && 
        performanceReport?.overallRating !== 'poor') {
      return 'passed';
    }

    return 'pending';
  }

  /**
   * Generate recommendations for a calculator
   */
  private generateCalculatorRecommendations(
    accuracyReport?: ValidationReport,
    performanceReport?: PerformanceReport
  ): string[] {
    const recommendations: string[] = [];

    if (accuracyReport) {
      recommendations.push(...accuracyReport.recommendations);
    }

    if (performanceReport) {
      recommendations.push(...performanceReport.recommendations);
    }

    return recommendations;
  }

  /**
   * Calculate overall statistics across all calculators
   */
  private calculateOverallStatistics(
    results: ComprehensiveTestResult[],
    accessibilityReport?: AccessibilityReport
  ): {
    averageAccuracyScore: number;
    averagePerformanceScore: number;
    averageAccessibilityScore: number;
    overallCertificationRate: number;
  } {
    
    const accuracyScores = results
      .map(r => r.accuracyReport?.successRate)
      .filter(score => score !== undefined) as number[];
    
    const performanceScores = results
      .map(r => r.performanceReport ? (r.performanceReport.passedTests / r.performanceReport.totalTests) * 100 : undefined)
      .filter(score => score !== undefined) as number[];

    const certifiedCalculators = results.filter(r => r.certification === 'passed').length;

    return {
      averageAccuracyScore: accuracyScores.length > 0 
        ? Math.round(accuracyScores.reduce((sum, score) => sum + score, 0) / accuracyScores.length)
        : 0,
      averagePerformanceScore: performanceScores.length > 0
        ? Math.round(performanceScores.reduce((sum, score) => sum + score, 0) / performanceScores.length)
        : 0,
      averageAccessibilityScore: accessibilityReport?.overallScore || 0,
      overallCertificationRate: results.length > 0 
        ? Math.round((certifiedCalculators / results.length) * 100)
        : 0
    };
  }

  /**
   * Compare results to industry benchmarks
   */
  private compareToIndustryBenchmarks(results: ComprehensiveTestResult[]): {
    accuracyVsIndustry: 'above' | 'at' | 'below';
    performanceVsIndustry: 'above' | 'at' | 'below';
    accessibilityVsIndustry: 'above' | 'at' | 'below';
  } {
    // Industry benchmarks (simplified)
    const industryBenchmarks = {
      accuracy: 95, // 95% accuracy expected
      performance: 85, // 85% performance tests should pass
      accessibility: 80 // 80% accessibility score expected
    };

    const avgAccuracy = results
      .map(r => r.accuracyReport?.successRate || 0)
      .reduce((sum, score) => sum + score, 0) / results.length;

    const avgPerformance = results
      .map(r => r.performanceReport ? (r.performanceReport.passedTests / r.performanceReport.totalTests) * 100 : 0)
      .reduce((sum, score) => sum + score, 0) / results.length;

    return {
      accuracyVsIndustry: avgAccuracy > industryBenchmarks.accuracy + 2 ? 'above' :
                         avgAccuracy < industryBenchmarks.accuracy - 2 ? 'below' : 'at',
      performanceVsIndustry: avgPerformance > industryBenchmarks.performance + 5 ? 'above' :
                            avgPerformance < industryBenchmarks.performance - 5 ? 'below' : 'at',
      accessibilityVsIndustry: 'at' // Simplified for now
    };
  }

  /**
   * Generate overall recommendations
   */
  private generateOverallRecommendations(
    results: ComprehensiveTestResult[],
    accessibilityReport?: AccessibilityReport
  ): string[] {
    const recommendations: string[] = [];

    const failedCalculators = results.filter(r => r.certification === 'failed');
    const pendingCalculators = results.filter(r => r.certification === 'pending');

    if (failedCalculators.length > 0) {
      recommendations.push(`${failedCalculators.length} calculator(s) failed certification - immediate attention required`);
    }

    if (pendingCalculators.length > 0) {
      recommendations.push(`${pendingCalculators.length} calculator(s) pending certification - review and improvements needed`);
    }

    const avgAccuracy = results.reduce((sum, r) => sum + (r.accuracyReport?.successRate || 0), 0) / results.length;
    if (avgAccuracy < 95) {
      recommendations.push('Overall accuracy below industry standard (95%) - focus on calculation precision');
    }

    if (accessibilityReport && accessibilityReport.overallScore < 80) {
      recommendations.push('Accessibility score below target (80%) - improve WCAG compliance');
    }

    const certificationRate = (results.filter(r => r.certification === 'passed').length / results.length) * 100;
    if (certificationRate >= 90) {
      recommendations.push('Excellent certification rate - platform meets professional standards');
    } else if (certificationRate < 70) {
      recommendations.push('Low certification rate - comprehensive review and improvements needed');
    }

    return recommendations;
  }

  /**
   * Generate comprehensive reports
   */
  private async generateComprehensiveReports(
    results: TestSuiteResults,
    accessibilityReport?: AccessibilityReport
  ): Promise<void> {
    console.log('Generating comprehensive test reports...');

    // Generate individual calculator reports
    for (const result of results.results) {
      if (result.accuracyReport) {
        const accuracyReportText = this.testFramework.generateTestReport(result.accuracyReport);
        console.log(`\n=== ACCURACY REPORT: ${result.calculatorId} ===`);
        console.log(accuracyReportText);
      }

      if (result.performanceReport) {
        const performanceReportText = this.performanceFramework.generatePerformanceReport(result.performanceReport);
        console.log(`\n=== PERFORMANCE REPORT: ${result.calculatorId} ===`);
        console.log(performanceReportText);
      }
    }

    // Generate accessibility report
    if (accessibilityReport) {
      const accessibilityReportText = this.accessibilityFramework.generateAccessibilityReport(accessibilityReport);
      console.log(`\n=== ACCESSIBILITY REPORT ===`);
      console.log(accessibilityReportText);
    }

    // Generate overall summary report
    const summaryReport = this.generateSummaryReport(results);
    console.log(`\n=== COMPREHENSIVE TEST SUMMARY ===`);
    console.log(summaryReport);
  }

  /**
   * Generate summary report
   */
  private generateSummaryReport(results: TestSuiteResults): string {
    return `
# Comprehensive Test Suite Summary

**Date:** ${results.timestamp.toISOString()}
**Calculators Tested:** ${results.totalCalculators}

## Overall Statistics
- **Average Accuracy Score:** ${results.overallStatistics.averageAccuracyScore}%
- **Average Performance Score:** ${results.overallStatistics.averagePerformanceScore}%
- **Average Accessibility Score:** ${results.overallStatistics.averageAccessibilityScore}%
- **Certification Rate:** ${results.overallStatistics.overallCertificationRate}%

## Industry Benchmark Comparison
- **Accuracy vs Industry:** ${results.industryBenchmarkComparison.accuracyVsIndustry.toUpperCase()}
- **Performance vs Industry:** ${results.industryBenchmarkComparison.performanceVsIndustry.toUpperCase()}
- **Accessibility vs Industry:** ${results.industryBenchmarkComparison.accessibilityVsIndustry.toUpperCase()}

## Calculator Results
${results.results.map(result => `
### ${result.calculatorId}
- **Overall Score:** ${result.overallScore}%
- **Certification:** ${result.certification.toUpperCase()}
- **Accuracy:** ${result.accuracyReport?.successRate.toFixed(1) || 'N/A'}%
- **Performance:** ${result.performanceReport ? ((result.performanceReport.passedTests / result.performanceReport.totalTests) * 100).toFixed(1) : 'N/A'}%
`).join('')}

## Recommendations
${results.recommendations.map(rec => `- ${rec}`).join('\n')}

## Platform Certification
${results.overallStatistics.overallCertificationRate >= 90 ? 
  '🏆 PLATFORM CERTIFIED - Exceeds industry standards for professional calculator platform' :
  results.overallStatistics.overallCertificationRate >= 70 ?
  '✅ PLATFORM APPROVED - Meets minimum standards with room for improvement' :
  '❌ PLATFORM NEEDS IMPROVEMENT - Below minimum standards for professional use'
}
    `.trim();
  }

  /**
   * Export test results
   */
  private async exportTestResults(results: TestSuiteResults): Promise<void> {
    const exportData = {
      metadata: {
        timestamp: results.timestamp,
        totalCalculators: results.totalCalculators,
        testFrameworkVersion: '1.0.0'
      },
      statistics: results.overallStatistics,
      benchmarkComparison: results.industryBenchmarkComparison,
      calculatorResults: results.results.map(result => ({
        calculatorId: result.calculatorId,
        overallScore: result.overallScore,
        certification: result.certification,
        accuracyData: result.accuracyReport ? {
          successRate: result.accuracyReport.successRate,
          totalTests: result.accuracyReport.totalTests,
          passedTests: result.accuracyReport.passedTests,
          certificationStatus: result.accuracyReport.certificationStatus
        } : null,
        performanceData: result.performanceReport ? {
          overallRating: result.performanceReport.overallRating,
          totalTests: result.performanceReport.totalTests,
          passedTests: result.performanceReport.passedTests
        } : null
      })),
      recommendations: results.recommendations
    };

    console.log('Test results exported:', JSON.stringify(exportData, null, 2));
  }
}

// Export singleton instance
export const comprehensiveTestRunner = new ComprehensiveTestRunner();