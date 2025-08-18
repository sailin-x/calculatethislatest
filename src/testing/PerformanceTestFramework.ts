/**
 * Performance testing framework for calculator validation
 * Tests execution speed, memory usage, and scalability
 */

import { Calculator } from '../types/calculator';
import { CalculatorEngine } from '../engines/CalculatorEngine';

export interface PerformanceTest {
  id: string;
  name: string;
  description: string;
  calculatorId: string;
  testInputs: Record<string, any>;
  iterations: number;
  expectedMaxTime: number; // milliseconds
  expectedThroughput: number; // operations per second
  memoryThreshold?: number; // MB
  category: 'speed' | 'memory' | 'scalability' | 'stress';
}

export interface PerformanceResult {
  testId: string;
  passed: boolean;
  averageExecutionTime: number;
  minExecutionTime: number;
  maxExecutionTime: number;
  standardDeviation: number;
  throughput: number;
  memoryUsage?: number;
  iterations: number;
  totalTime: number;
  percentiles: {
    p50: number;
    p90: number;
    p95: number;
    p99: number;
  };
  errors: string[];
  warnings: string[];
}

export interface PerformanceReport {
  calculatorId: string;
  timestamp: Date;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  results: PerformanceResult[];
  overallRating: 'excellent' | 'good' | 'acceptable' | 'poor';
  recommendations: string[];
}

export class PerformanceTestFramework {
  private calculatorEngine: CalculatorEngine;
  private performanceTests: Map<string, PerformanceTest[]> = new Map();

  constructor() {
    this.calculatorEngine = new CalculatorEngine();
    this.initializePerformanceTests();
  }

  /**
   * Initialize performance tests for different calculators
   */
  private initializePerformanceTests(): void {
    // Mortgage calculator performance tests
    this.addPerformanceTests('mortgage-calculator', [
      {
        id: 'mortgage-basic-speed',
        name: 'Basic Mortgage Calculation Speed',
        description: 'Standard mortgage calculation performance',
        calculatorId: 'mortgage-calculator',
        testInputs: {
          homePrice: 400000,
          downPayment: 80000,
          interestRate: 7.0,
          loanTerm: 30
        },
        iterations: 1000,
        expectedMaxTime: 10,
        expectedThroughput: 100,
        category: 'speed'
      },
      {
        id: 'mortgage-amortization-speed',
        name: 'Amortization Schedule Generation',
        description: 'Performance of full amortization schedule generation',
        calculatorId: 'mortgage-calculator',
        testInputs: {
          homePrice: 500000,
          downPayment: 100000,
          interestRate: 6.5,
          loanTerm: 30,
          generateAmortization: true
        },
        iterations: 100,
        expectedMaxTime: 50,
        expectedThroughput: 20,
        category: 'speed'
      },
      {
        id: 'mortgage-stress-test',
        name: 'Mortgage Calculator Stress Test',
        description: 'High-volume concurrent calculations',
        calculatorId: 'mortgage-calculator',
        testInputs: {
          homePrice: 300000,
          downPayment: 60000,
          interestRate: 7.25,
          loanTerm: 30
        },
        iterations: 10000,
        expectedMaxTime: 5,
        expectedThroughput: 200,
        memoryThreshold: 100,
        category: 'stress'
      }
    ]);

    // Investment calculator performance tests
    this.addPerformanceTests('portfolio-calculator', [
      {
        id: 'portfolio-optimization-speed',
        name: 'Portfolio Optimization Speed',
        description: 'Mean-variance optimization performance',
        calculatorId: 'portfolio-calculator',
        testInputs: {
          assets: 10,
          optimizationMethod: 'mean-variance',
          constraints: 'long-only'
        },
        iterations: 100,
        expectedMaxTime: 100,
        expectedThroughput: 10,
        category: 'speed'
      },
      {
        id: 'monte-carlo-performance',
        name: 'Monte Carlo Simulation Performance',
        description: 'Large-scale Monte Carlo simulation',
        calculatorId: 'portfolio-calculator',
        testInputs: {
          simulations: 10000,
          timeHorizon: 30,
          portfolioValue: 1000000
        },
        iterations: 10,
        expectedMaxTime: 2000,
        expectedThroughput: 0.5,
        memoryThreshold: 500,
        category: 'scalability'
      }
    ]);

    // Math calculator performance tests
    this.addPerformanceTests('algebra-calculator', [
      {
        id: 'polynomial-solving-speed',
        name: 'Polynomial Solving Speed',
        description: 'High-degree polynomial root finding',
        calculatorId: 'algebra-calculator',
        testInputs: {
          equationType: 'polynomial',
          polynomialCoefficients: Array.from({length: 10}, (_, i) => i + 1)
        },
        iterations: 1000,
        expectedMaxTime: 20,
        expectedThroughput: 50,
        category: 'speed'
      },
      {
        id: 'matrix-operations-speed',
        name: 'Large Matrix Operations',
        description: 'Performance with large matrices',
        calculatorId: 'matrix-calculator',
        testInputs: {
          operation: 'determinant',
          matrixARows: 100,
          matrixACols: 100,
          matrixAElements: Array.from({length: 10000}, () => Math.random())
        },
        iterations: 10,
        expectedMaxTime: 1000,
        expectedThroughput: 1,
        memoryThreshold: 200,
        category: 'scalability'
      }
    ]);
  }

  /**
   * Add performance tests for a calculator
   */
  addPerformanceTests(calculatorId: string, tests: PerformanceTest[]): void {
    const existingTests = this.performanceTests.get(calculatorId) || [];
    this.performanceTests.set(calculatorId, [...existingTests, ...tests]);
  }

  /**
   * Run performance tests for a calculator
   */
  async runPerformanceTests(calculatorId: string): Promise<PerformanceReport> {
    const tests = this.performanceTests.get(calculatorId) || [];
    if (tests.length === 0) {
      throw new Error(`No performance tests found for calculator: ${calculatorId}`);
    }

    const results: PerformanceResult[] = [];
    let passedTests = 0;
    let failedTests = 0;

    for (const test of tests) {
      try {
        const result = await this.executePerformanceTest(test);
        results.push(result);
        
        if (result.passed) {
          passedTests++;
        } else {
          failedTests++;
        }
      } catch (error) {
        failedTests++;
        results.push({
          testId: test.id,
          passed: false,
          averageExecutionTime: 0,
          minExecutionTime: 0,
          maxExecutionTime: 0,
          standardDeviation: 0,
          throughput: 0,
          iterations: 0,
          totalTime: 0,
          percentiles: { p50: 0, p90: 0, p95: 0, p99: 0 },
          errors: [error instanceof Error ? error.message : 'Unknown error'],
          warnings: []
        });
      }
    }

    const overallRating = this.calculateOverallRating(results);
    const recommendations = this.generatePerformanceRecommendations(results);

    return {
      calculatorId,
      timestamp: new Date(),
      totalTests: tests.length,
      passedTests,
      failedTests,
      results,
      overallRating,
      recommendations
    };
  }

  /**
   * Execute a single performance test
   */
  private async executePerformanceTest(test: PerformanceTest): Promise<PerformanceResult> {
    const executionTimes: number[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];
    let memoryUsage = 0;

    // Warm up
    for (let i = 0; i < Math.min(10, test.iterations); i++) {
      try {
        await this.calculatorEngine.calculate(test.calculatorId, test.testInputs);
      } catch (error) {
        // Ignore warm-up errors
      }
    }

    // Measure memory before test
    const initialMemory = this.getMemoryUsage();

    // Execute performance test
    const startTime = Date.now();
    
    for (let i = 0; i < test.iterations; i++) {
      const iterationStart = performance.now();
      
      try {
        await this.calculatorEngine.calculate(test.calculatorId, test.testInputs);
        const iterationTime = performance.now() - iterationStart;
        executionTimes.push(iterationTime);
      } catch (error) {
        errors.push(`Iteration ${i}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    const totalTime = Date.now() - startTime;
    
    // Measure memory after test
    const finalMemory = this.getMemoryUsage();
    memoryUsage = finalMemory - initialMemory;

    // Calculate statistics
    const validExecutionTimes = executionTimes.filter(time => time > 0);
    const averageExecutionTime = validExecutionTimes.length > 0 
      ? validExecutionTimes.reduce((sum, time) => sum + time, 0) / validExecutionTimes.length 
      : 0;
    
    const minExecutionTime = validExecutionTimes.length > 0 ? Math.min(...validExecutionTimes) : 0;
    const maxExecutionTime = validExecutionTimes.length > 0 ? Math.max(...validExecutionTimes) : 0;
    
    const variance = validExecutionTimes.length > 0
      ? validExecutionTimes.reduce((sum, time) => sum + Math.pow(time - averageExecutionTime, 2), 0) / validExecutionTimes.length
      : 0;
    const standardDeviation = Math.sqrt(variance);
    
    const throughput = totalTime > 0 ? (validExecutionTimes.length / totalTime) * 1000 : 0;
    
    // Calculate percentiles
    const sortedTimes = [...validExecutionTimes].sort((a, b) => a - b);
    const percentiles = {
      p50: this.getPercentile(sortedTimes, 50),
      p90: this.getPercentile(sortedTimes, 90),
      p95: this.getPercentile(sortedTimes, 95),
      p99: this.getPercentile(sortedTimes, 99)
    };

    // Check performance criteria
    const passed = this.evaluatePerformanceResult(test, {
      averageExecutionTime,
      throughput,
      memoryUsage,
      errors: errors.length
    });

    // Generate warnings
    if (averageExecutionTime > test.expectedMaxTime * 0.8) {
      warnings.push('Execution time approaching threshold');
    }
    if (throughput < test.expectedThroughput * 0.8) {
      warnings.push('Throughput below expected performance');
    }
    if (test.memoryThreshold && memoryUsage > test.memoryThreshold * 0.8) {
      warnings.push('Memory usage approaching threshold');
    }
    if (standardDeviation > averageExecutionTime * 0.5) {
      warnings.push('High variability in execution times');
    }

    return {
      testId: test.id,
      passed,
      averageExecutionTime,
      minExecutionTime,
      maxExecutionTime,
      standardDeviation,
      throughput,
      memoryUsage,
      iterations: validExecutionTimes.length,
      totalTime,
      percentiles,
      errors,
      warnings
    };
  }

  /**
   * Evaluate if performance result meets criteria
   */
  private evaluatePerformanceResult(test: PerformanceTest, result: {
    averageExecutionTime: number;
    throughput: number;
    memoryUsage: number;
    errors: number;
  }): boolean {
    // Check execution time
    if (result.averageExecutionTime > test.expectedMaxTime) {
      return false;
    }

    // Check throughput
    if (result.throughput < test.expectedThroughput) {
      return false;
    }

    // Check memory usage
    if (test.memoryThreshold && result.memoryUsage > test.memoryThreshold) {
      return false;
    }

    // Check error rate
    if (result.errors > test.iterations * 0.01) { // Allow 1% error rate
      return false;
    }

    return true;
  }

  /**
   * Calculate percentile from sorted array
   */
  private getPercentile(sortedArray: number[], percentile: number): number {
    if (sortedArray.length === 0) return 0;
    
    const index = (percentile / 100) * (sortedArray.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    
    if (lower === upper) {
      return sortedArray[lower];
    }
    
    const weight = index - lower;
    return sortedArray[lower] * (1 - weight) + sortedArray[upper] * weight;
  }

  /**
   * Get current memory usage (simplified)
   */
  private getMemoryUsage(): number {
    if (typeof performance !== 'undefined' && performance.memory) {
      return performance.memory.usedJSHeapSize / 1024 / 1024; // MB
    }
    return 0;
  }

  /**
   * Calculate overall performance rating
   */
  private calculateOverallRating(results: PerformanceResult[]): 'excellent' | 'good' | 'acceptable' | 'poor' {
    if (results.length === 0) return 'poor';
    
    const passRate = results.filter(r => r.passed).length / results.length;
    const avgWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0) / results.length;
    
    if (passRate >= 0.95 && avgWarnings < 1) return 'excellent';
    if (passRate >= 0.90 && avgWarnings < 2) return 'good';
    if (passRate >= 0.80) return 'acceptable';
    return 'poor';
  }

  /**
   * Generate performance recommendations
   */
  private generatePerformanceRecommendations(results: PerformanceResult[]): string[] {
    const recommendations: string[] = [];
    
    const failedTests = results.filter(r => !r.passed);
    const slowTests = results.filter(r => r.averageExecutionTime > 100);
    const highMemoryTests = results.filter(r => r.memoryUsage && r.memoryUsage > 100);
    const highVariabilityTests = results.filter(r => r.standardDeviation > r.averageExecutionTime * 0.3);

    if (failedTests.length > 0) {
      recommendations.push(`Optimize ${failedTests.length} failing performance test(s)`);
    }

    if (slowTests.length > 0) {
      recommendations.push(`Improve execution speed for ${slowTests.length} slow test(s)`);
    }

    if (highMemoryTests.length > 0) {
      recommendations.push(`Reduce memory usage for ${highMemoryTests.length} memory-intensive test(s)`);
    }

    if (highVariabilityTests.length > 0) {
      recommendations.push(`Improve consistency for ${highVariabilityTests.length} variable test(s)`);
    }

    const overallPassRate = results.filter(r => r.passed).length / results.length;
    if (overallPassRate >= 0.95) {
      recommendations.push('Excellent performance - meets all benchmarks');
    } else if (overallPassRate < 0.80) {
      recommendations.push('Significant performance improvements needed');
    }

    return recommendations;
  }

  /**
   * Generate performance report
   */
  generatePerformanceReport(report: PerformanceReport): string {
    const reportText = `
# Performance Test Report

**Calculator:** ${report.calculatorId}
**Date:** ${report.timestamp.toISOString()}
**Overall Rating:** ${report.overallRating.toUpperCase()}

## Summary
- **Total Tests:** ${report.totalTests}
- **Passed:** ${report.passedTests}
- **Failed:** ${report.failedTests}
- **Success Rate:** ${((report.passedTests / report.totalTests) * 100).toFixed(1)}%

## Performance Results
${report.results.map(result => `
### ${result.testId}
- **Status:** ${result.passed ? 'PASS' : 'FAIL'}
- **Average Time:** ${result.averageExecutionTime.toFixed(2)}ms
- **Throughput:** ${result.throughput.toFixed(2)} ops/sec
- **Memory Usage:** ${result.memoryUsage?.toFixed(2) || 'N/A'} MB
- **Iterations:** ${result.iterations}
- **Percentiles:** P50: ${result.percentiles.p50.toFixed(2)}ms, P95: ${result.percentiles.p95.toFixed(2)}ms
${result.warnings.length > 0 ? `- **Warnings:** ${result.warnings.join(', ')}` : ''}
${result.errors.length > 0 ? `- **Errors:** ${result.errors.slice(0, 3).join(', ')}` : ''}
`).join('')}

## Recommendations
${report.recommendations.map(rec => `- ${rec}`).join('\n')}

## Performance Rating
${report.overallRating === 'excellent' ? 
  '🚀 Excellent performance - exceeds industry benchmarks' :
  report.overallRating === 'good' ?
  '✅ Good performance - meets industry standards' :
  report.overallRating === 'acceptable' ?
  '⚠️ Acceptable performance - some optimization recommended' :
  '❌ Poor performance - significant optimization required'
}
    `;

    return reportText.trim();
  }
}

// Export singleton instance
export const performanceTestFramework = new PerformanceTestFramework();