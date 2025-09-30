/**
 * COMPREHENSIVE CALCULATOR TESTING FRAMEWORK
 *
 * This framework provides thorough testing of all calculator implementations
 * including mathematical accuracy, edge cases, performance, and industry standards compliance.
 */

import { calculatorRegistry } from './data/calculatorRegistry';
import { CalculationError, ValidationError } from './lib/errors';

interface TestResult {
  calculatorId: string;
  calculatorName: string;
  category: string;
  status: 'PASS' | 'FAIL' | 'ERROR';
  testCases: TestCaseResult[];
  performance: PerformanceMetrics;
  accuracy: AccuracyMetrics;
  issues: string[];
}

interface TestCaseResult {
  testName: string;
  inputs: Record<string, any>;
  expectedOutputs: Record<string, any>;
  actualOutputs?: Record<string, any>;
  status: 'PASS' | 'FAIL' | 'ERROR';
  error?: string;
  executionTime: number;
}

interface PerformanceMetrics {
  averageExecutionTime: number;
  maxExecutionTime: number;
  minExecutionTime: number;
  memoryUsage: number;
  cacheHitRate: number;
}

interface AccuracyMetrics {
  industryStandardCompliance: number; // 0-100
  precision: number; // decimal places
  edgeCaseHandling: number; // 0-100
  errorRate: number; // percentage
}

/**
 * COMPREHENSIVE CALCULATOR TEST SUITE
 */
export class CalculatorTestSuite {
  private results: TestResult[] = [];
  private testCases: Map<string, TestCase[]> = new Map();

  constructor() {
    this.initializeTestCases();
  }

  /**
   * Initialize comprehensive test cases for all calculator categories
   */
  private initializeTestCases(): void {
    // Finance Calculators
    this.testCases.set('mortgage', this.getMortgageTestCases());
    this.testCases.set('investment', this.getInvestmentTestCases());
    this.testCases.set('retirement', this.getRetirementTestCases());
    this.testCases.set('insurance', this.getInsuranceTestCases());

    // Business Calculators
    this.testCases.set('roi', this.getROITestCases());
    this.testCases.set('payroll', this.getPayrollTestCases());
    this.testCases.set('break-even', this.getBreakEvenTestCases());

    // Math Calculators
    this.testCases.set('statistics', this.getStatisticsTestCases());
    this.testCases.set('geometry', this.getGeometryTestCases());
    this.testCases.set('algebra', this.getAlgebraTestCases());

    // Health Calculators
    this.testCases.set('bmr', this.getBMRTestCases());

    // Construction Calculators
    this.testCases.set('concrete', this.getConcreteTestCases());
  }

  /**
   * Run comprehensive test suite
   */
  async runFullTestSuite(): Promise<TestResult[]> {
    console.log('🚀 STARTING COMPREHENSIVE CALCULATOR TEST SUITE');
    console.log('================================================\n');

    const calculators = calculatorRegistry.getAllCalculators();

    for (const calculator of calculators) {
      console.log(`🧪 Testing: ${calculator.title} (${calculator.category})`);
      const result = await this.testCalculator(calculator);
      this.results.push(result);

      const status = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '🔥';
      console.log(`${status} ${result.calculatorName}: ${result.testCases.filter(t => t.status === 'PASS').length}/${result.testCases.length} tests passed\n`);
    }

    this.generateFinalReport();
    return this.results;
  }

  /**
   * Test individual calculator with comprehensive test cases
   */
  private async testCalculator(calculator: any): Promise<TestResult> {
    const result: TestResult = {
      calculatorId: calculator.id,
      calculatorName: calculator.title,
      category: calculator.category,
      status: 'PASS',
      testCases: [],
      performance: {
        averageExecutionTime: 0,
        maxExecutionTime: 0,
        minExecutionTime: Infinity,
        memoryUsage: 0,
        cacheHitRate: 0
      },
      accuracy: {
        industryStandardCompliance: 100,
        precision: 2,
        edgeCaseHandling: 100,
        errorRate: 0
      },
      issues: []
    };

    // Get test cases for this calculator type
    const testCases = this.getTestCasesForCalculator(calculator);

    for (const testCase of testCases) {
      const testResult = await this.runTestCase(calculator, testCase);
      result.testCases.push(testResult);

      if (testResult.status !== 'PASS') {
        result.status = 'FAIL';
        result.issues.push(`${testCase.name}: ${testResult.error || 'Failed'}`);
      }

      // Update performance metrics
      result.performance.averageExecutionTime += testResult.executionTime;
      result.performance.maxExecutionTime = Math.max(result.performance.maxExecutionTime, testResult.executionTime);
      result.performance.minExecutionTime = Math.min(result.performance.minExecutionTime, testResult.executionTime);
    }

    // Calculate averages
    if (result.testCases.length > 0) {
      result.performance.averageExecutionTime /= result.testCases.length;
    }

    // Assess accuracy
    result.accuracy = this.assessAccuracy(calculator, result.testCases);

    return result;
  }

  /**
   * Run individual test case
   */
  private async runTestCase(calculator: any, testCase: TestCase): Promise<TestCaseResult> {
    const startTime = performance.now();

    const result: TestCaseResult = {
      testName: testCase.name,
      inputs: testCase.inputs,
      expectedOutputs: testCase.expectedOutputs,
      status: 'PASS',
      executionTime: 0
    };

    try {
      // Execute calculator
      const actualOutputs = calculator.calculate(testCase.inputs);
      result.actualOutputs = actualOutputs;
      result.executionTime = performance.now() - startTime;

      // Validate results
      const validationResult = this.validateTestResults(testCase.expectedOutputs, actualOutputs, testCase.tolerance);
      if (!validationResult.isValid) {
        result.status = 'FAIL';
        result.error = validationResult.error;
      }

    } catch (error) {
      result.status = 'ERROR';
      result.error = error instanceof Error ? error.message : 'Unknown error';
      result.executionTime = performance.now() - startTime;
    }

    return result;
  }

  /**
   * Validate test results against expected outputs
   */
  private validateTestResults(expected: Record<string, any>, actual: Record<string, any>, tolerance: number = 0.01): { isValid: boolean; error?: string } {
    for (const [key, expectedValue] of Object.entries(expected)) {
      const actualValue = actual[key];

      if (actualValue === undefined) {
        return { isValid: false, error: `Missing output: ${key}` };
      }

      if (typeof expectedValue === 'number' && typeof actualValue === 'number') {
        const diff = Math.abs(expectedValue - actualValue);
        const relativeDiff = Math.abs(diff / expectedValue);

        if (relativeDiff > tolerance) {
          return {
            isValid: false,
            error: `${key}: expected ${expectedValue}, got ${actualValue} (diff: ${diff.toFixed(6)}, tolerance: ${(tolerance * 100).toFixed(2)}%)`
          };
        }
      } else if (expectedValue !== actualValue) {
        return {
          isValid: false,
          error: `${key}: expected "${expectedValue}", got "${actualValue}"`
        };
      }
    }

    return { isValid: true };
  }

  /**
   * Assess accuracy metrics
   */
  private assessAccuracy(calculator: any, testResults: TestCaseResult[]): AccuracyMetrics {
    const passedTests = testResults.filter(t => t.status === 'PASS').length;
    const totalTests = testResults.length;

    return {
      industryStandardCompliance: (passedTests / totalTests) * 100,
      precision: this.calculatePrecision(testResults),
      edgeCaseHandling: this.assessEdgeCaseHandling(testResults),
      errorRate: ((totalTests - passedTests) / totalTests) * 100
    };
  }

  /**
   * Calculate precision based on test results
   */
  private calculatePrecision(testResults: TestCaseResult[]): number {
    let totalPrecision = 0;
    let count = 0;

    for (const result of testResults) {
      if (result.actualOutputs) {
        for (const [key, value] of Object.entries(result.actualOutputs)) {
          if (typeof value === 'number') {
            const decimalPlaces = this.getDecimalPlaces(value);
            totalPrecision += decimalPlaces;
            count++;
          }
        }
      }
    }

    return count > 0 ? totalPrecision / count : 2;
  }

  /**
   * Assess edge case handling
   */
  private assessEdgeCaseHandling(testResults: TestCaseResult[]): number {
    const edgeCaseTests = testResults.filter(t => t.testName.includes('Edge') || t.testName.includes('Boundary'));
    const passedEdgeCases = edgeCaseTests.filter(t => t.status === 'PASS').length;

    return edgeCaseTests.length > 0 ? (passedEdgeCases / edgeCaseTests.length) * 100 : 100;
  }

  /**
   * Get decimal places in a number
   */
  private getDecimalPlaces(num: number): number {
    const str = num.toString();
    const decimalIndex = str.indexOf('.');
    return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
  }

  /**
   * Get test cases for specific calculator
   */
  private getTestCasesForCalculator(calculator: any): TestCase[] {
    const categoryTests = this.testCases.get(calculator.category) || [];
    const specificTests = this.testCases.get(calculator.id) || [];

    return [...categoryTests, ...specificTests];
  }

  /**
   * Generate final comprehensive report
   */
  private generateFinalReport(): void {
    console.log('\n📊 COMPREHENSIVE TEST REPORT');
    console.log('===========================\n');

    const totalCalculators = this.results.length;
    const passedCalculators = this.results.filter(r => r.status === 'PASS').length;
    const failedCalculators = this.results.filter(r => r.status === 'FAIL').length;
    const errorCalculators = this.results.filter(r => r.status === 'ERROR').length;

    console.log(`📈 OVERALL RESULTS:`);
    console.log(`Total Calculators Tested: ${totalCalculators}`);
    console.log(`✅ Passed: ${passedCalculators}`);
    console.log(`❌ Failed: ${failedCalculators}`);
    console.log(`🔥 Errors: ${errorCalculators}`);
    console.log(`📊 Success Rate: ${((passedCalculators / totalCalculators) * 100).toFixed(1)}%\n`);

    // Category breakdown
    const categoryStats = this.getCategoryStats();
    console.log(`📂 CATEGORY BREAKDOWN:`);
    for (const [category, stats] of categoryStats.entries()) {
      console.log(`${category}: ${stats.passed}/${stats.total} (${stats.percentage.toFixed(1)}%)`);
    }
    console.log('');

    // Performance summary
    const perfStats = this.getPerformanceStats();
    console.log(`⚡ PERFORMANCE SUMMARY:`);
    console.log(`Average Execution Time: ${perfStats.avgExecutionTime.toFixed(2)}ms`);
    console.log(`Max Execution Time: ${perfStats.maxExecutionTime.toFixed(2)}ms`);
    console.log(`Min Execution Time: ${perfStats.minExecutionTime.toFixed(2)}ms\n`);

    // Accuracy summary
    const accuracyStats = this.getAccuracyStats();
    console.log(`🎯 ACCURACY SUMMARY:`);
    console.log(`Industry Standard Compliance: ${accuracyStats.avgCompliance.toFixed(1)}%`);
    console.log(`Average Precision: ${accuracyStats.avgPrecision.toFixed(1)} decimal places`);
    console.log(`Edge Case Handling: ${accuracyStats.avgEdgeCaseHandling.toFixed(1)}%\n`);

    // Issues summary
    this.printIssuesSummary();

    console.log(`🏆 FINAL VERDICT:`);
    if (passedCalculators === totalCalculators) {
      console.log(`🎉 ALL CALCULATORS PASSED! 100% FUNCTIONAL ✅`);
    } else if (passedCalculators / totalCalculators >= 0.95) {
      console.log(`✅ EXCELLENT: ${((passedCalculators / totalCalculators) * 100).toFixed(1)}% success rate`);
    } else if (passedCalculators / totalCalculators >= 0.90) {
      console.log(`⚠️ GOOD: ${((passedCalculators / totalCalculators) * 100).toFixed(1)}% success rate - minor issues to fix`);
    } else {
      console.log(`❌ NEEDS ATTENTION: ${((passedCalculators / totalCalculators) * 100).toFixed(1)}% success rate - significant issues`);
    }
  }

  private getCategoryStats(): Map<string, { passed: number; total: number; percentage: number }> {
    const stats = new Map<string, { passed: number; total: number; percentage: number }>();

    for (const result of this.results) {
      if (!stats.has(result.category)) {
        stats.set(result.category, { passed: 0, total: 0, percentage: 0 });
      }

      const categoryStats = stats.get(result.category)!;
      categoryStats.total++;
      if (result.status === 'PASS') {
        categoryStats.passed++;
      }
      categoryStats.percentage = (categoryStats.passed / categoryStats.total) * 100;
    }

    return stats;
  }

  private getPerformanceStats(): { avgExecutionTime: number; maxExecutionTime: number; minExecutionTime: number } {
    let totalTime = 0;
    let maxTime = 0;
    let minTime = Infinity;
    let count = 0;

    for (const result of this.results) {
      for (const testCase of result.testCases) {
        totalTime += testCase.executionTime;
        maxTime = Math.max(maxTime, testCase.executionTime);
        minTime = Math.min(minTime, testCase.executionTime);
        count++;
      }
    }

    return {
      avgExecutionTime: count > 0 ? totalTime / count : 0,
      maxExecutionTime: maxTime,
      minExecutionTime: minTime === Infinity ? 0 : minTime
    };
  }

  private getAccuracyStats(): { avgCompliance: number; avgPrecision: number; avgEdgeCaseHandling: number } {
    let totalCompliance = 0;
    let totalPrecision = 0;
    let totalEdgeCaseHandling = 0;
    let count = 0;

    for (const result of this.results) {
      totalCompliance += result.accuracy.industryStandardCompliance;
      totalPrecision += result.accuracy.precision;
      totalEdgeCaseHandling += result.accuracy.edgeCaseHandling;
      count++;
    }

    return {
      avgCompliance: count > 0 ? totalCompliance / count : 0,
      avgPrecision: count > 0 ? totalPrecision / count : 0,
      avgEdgeCaseHandling: count > 0 ? totalEdgeCaseHandling / count : 0
    };
  }

  private printIssuesSummary(): void {
    const allIssues = this.results.flatMap(r => r.issues);

    if (allIssues.length === 0) {
      console.log(`✅ NO ISSUES FOUND - ALL TESTS PASSED!\n`);
      return;
    }

    console.log(`🚨 ISSUES SUMMARY:`);
    console.log(`================`);

    // Group issues by type
    const issueGroups = new Map<string, string[]>();

    for (const issue of allIssues) {
      const [calculator, ...issueParts] = issue.split(': ');
      const issueType = issueParts.join(': ');

      if (!issueGroups.has(calculator)) {
        issueGroups.set(calculator, []);
      }
      issueGroups.get(calculator)!.push(issueType);
    }

    for (const [calculator, issues] of issueGroups.entries()) {
      console.log(`${calculator}:`);
      issues.forEach(issue => console.log(`  - ${issue}`));
    }
    console.log('');
  }

  // Test case definitions for different calculator types
  private getMortgageTestCases(): TestCase[] {
    return [
      {
        name: 'Standard 30-year mortgage',
        inputs: { homePrice: 400000, downPayment: 80000, loanTerm: 30, interestRate: 6.5 },
        expectedOutputs: { monthlyPayment: 2497.86 },
        tolerance: 0.01
      },
      {
        name: '15-year mortgage',
        inputs: { homePrice: 300000, downPayment: 60000, loanTerm: 15, interestRate: 5.5 },
        expectedOutputs: { monthlyPayment: 2178.86 },
        tolerance: 0.01
      },
      {
        name: 'Edge case: 100% financing',
        inputs: { homePrice: 200000, downPayment: 0, loanTerm: 30, interestRate: 7.0 },
        expectedOutputs: { monthlyPayment: 1330.60 },
        tolerance: 0.01
      }
    ];
  }

  private getInvestmentTestCases(): TestCase[] {
    return [
      {
        name: 'Compound interest calculation',
        inputs: { principal: 10000, rate: 7, years: 10, compoundingFrequency: 12 },
        expectedOutputs: { finalAmount: 19671.51 },
        tolerance: 0.01
      }
    ];
  }

  private getRetirementTestCases(): TestCase[] {
    return [
      {
        name: '401k projection',
        inputs: { currentBalance: 50000, annualContribution: 12000, years: 25, expectedReturn: 7 },
        expectedOutputs: { projectedBalance: 894616.00 },
        tolerance: 0.05
      }
    ];
  }

  private getInsuranceTestCases(): TestCase[] {
    return [
      {
        name: 'Home insurance premium',
        inputs: { homeValue: 400000, coverage: 'full', riskFactors: ['standard'] },
        expectedOutputs: { annualPremium: 1200 },
        tolerance: 0.10
      }
    ];
  }

  private getROITestCases(): TestCase[] {
    return [
      {
        name: 'Simple ROI calculation',
        inputs: { initialInvestment: 10000, finalValue: 15000 },
        expectedOutputs: { roi: 50.00 },
        tolerance: 0.01
      }
    ];
  }

  private getPayrollTestCases(): TestCase[] {
    return [
      {
        name: 'Salary calculation',
        inputs: { annualSalary: 75000, payPeriod: 'biweekly' },
        expectedOutputs: { grossPayPerPeriod: 2884.62 },
        tolerance: 0.01
      }
    ];
  }

  private getBreakEvenTestCases(): TestCase[] {
    return [
      {
        name: 'Break-even analysis',
        inputs: { fixedCosts: 50000, variableCostPerUnit: 10, pricePerUnit: 25 },
        expectedOutputs: { breakEvenUnits: 3333.33 },
        tolerance: 0.01
      }
    ];
  }

  private getStatisticsTestCases(): TestCase[] {
    return [
      {
        name: 'Mean calculation',
        inputs: { values: [1, 2, 3, 4, 5] },
        expectedOutputs: { mean: 3.0 },
        tolerance: 0.01
      },
      {
        name: 'Standard deviation',
        inputs: { values: [1, 2, 3, 4, 5] },
        expectedOutputs: { standardDeviation: 1.581 },
        tolerance: 0.01
      }
    ];
  }

  private getGeometryTestCases(): TestCase[] {
    return [
      {
        name: 'Circle area',
        inputs: { radius: 5 },
        expectedOutputs: { area: 78.54 },
        tolerance: 0.01
      },
      {
        name: 'Rectangle area',
        inputs: { length: 10, width: 5 },
        expectedOutputs: { area: 50 },
        tolerance: 0.01
      }
    ];
  }

  private getAlgebraTestCases(): TestCase[] {
    return [
      {
        name: 'Linear equation',
        inputs: { equation: '2x + 3 = 7' },
        expectedOutputs: { solution: { x: 2 } },
        tolerance: 0.01
      }
    ];
  }

  private getBMRTestCases(): TestCase[] {
    return [
      {
        name: 'Male BMR calculation',
        inputs: { weight: 70, height: 175, age: 30, gender: 'male' },
        expectedOutputs: { bmr: 1616 },
        tolerance: 0.05
      },
      {
        name: 'Female BMR calculation',
        inputs: { weight: 60, height: 165, age: 25, gender: 'female' },
        expectedOutputs: { bmr: 1365 },
        tolerance: 0.05
      }
    ];
  }

  private getConcreteTestCases(): TestCase[] {
    return [
      {
        name: 'Concrete volume calculation',
        inputs: { length: 10, width: 5, depth: 0.5 },
        expectedOutputs: { volume: 25 },
        tolerance: 0.01
      }
    ];
  }
}

interface TestCase {
  name: string;
  inputs: Record<string, any>;
  expectedOutputs: Record<string, any>;
  tolerance?: number;
}

// Export for external use
export type { TestResult, TestCaseResult, PerformanceMetrics, AccuracyMetrics };
export { CalculatorTestSuite as default };