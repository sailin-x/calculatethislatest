/**
 * Quick validation for ARM Mortgage Calculator
 * Self-contained testing without external dependencies
 */

import { ARMMortgageCalculator } from './ARMMortgageCalculator';

export function validateCalculator(): {
  passed: boolean;
  results: Array<{ test: string; passed: boolean; error?: string }>;
} {
  const tests = [];
  
  try {
    // Test 1: Basic 5/1 ARM calculation
    const basic51Inputs = {
      loanAmount: '400000',
      initialRate: '3.5',
      initialPeriod: '5',
      loanTerm: '30',
      indexRate: '2.5',
      margin: '2.25',
      periodicCap: '2',
      lifetimeCap: '5',
      adjustmentFrequency: '1',
      expectedIndexTrend: '0.5'
    };
    
    const basic51Result = ARMMortgageCalculator.calculate(basic51Inputs);
    tests.push({
      test: 'Basic 5/1 ARM calculation',
      passed: basic51Result.initialPayment.value > 1500 && 
              basic51Result.initialPayment.value < 2000 &&
              basic51Result.fullyIndexedRate.value === 4.75 &&
              basic51Result.maxPossibleRate.value === 8.5
    });

    // Test 2: 7/1 ARM with higher caps
    const arm71Inputs = {
      loanAmount: '600000',
      initialRate: '3.25',
      initialPeriod: '7',
      loanTerm: '30',
      indexRate: '3.0',
      margin: '2.5',
      periodicCap: '2.5',
      lifetimeCap: '6',
      adjustmentFrequency: '1',
      expectedIndexTrend: '0.75'
    };
    
    const arm71Result = ARMMortgageCalculator.calculate(arm71Inputs);
    tests.push({
      test: '7/1 ARM with higher caps',
      passed: arm71Result.fullyIndexedRate.value === 5.5 &&
              arm71Result.maxPossibleRate.value === 9.25 &&
              arm71Result.maxPossiblePayment.value > arm71Result.initialPayment.value
    });

    // Test 3: Zero index trend handling
    const zeroTrendInputs = {
      loanAmount: '500000',
      initialRate: '4.0',
      initialPeriod: '5',
      loanTerm: '30',
      indexRate: '3.0',
      margin: '2.0',
      periodicCap: '2',
      lifetimeCap: '5',
      adjustmentFrequency: '1',
      expectedIndexTrend: '0'
    };
    
    const zeroTrendResult = ARMMortgageCalculator.calculate(zeroTrendInputs);
    tests.push({
      test: 'Zero index trend handling',
      passed: zeroTrendResult.fullyIndexedRate.value === 5.0 &&
              zeroTrendResult.totalInterestPaid.value > 0
    });

    // Test 4: High-risk ARM detection
    const highRiskInputs = {
      loanAmount: '600000',
      initialRate: '2.5', // Low teaser
      initialPeriod: '3', // Short period
      loanTerm: '30',
      indexRate: '4.0',
      margin: '3.5', // High margin
      periodicCap: '2.5',
      lifetimeCap: '6',
      adjustmentFrequency: '1',
      expectedIndexTrend: '1.0'
    };
    
    const highRiskResult = ARMMortgageCalculator.calculate(highRiskInputs);
    tests.push({
      test: 'High-risk ARM detection',
      passed: highRiskResult.riskAssessment.value.includes('RISK') &&
              highRiskResult.maxPossiblePayment.value > highRiskResult.initialPayment.value * 1.3
    });

    // Test 5: Payment schedule generation
    const scheduleInputs = {
      loanAmount: '300000',
      initialRate: '3.5',
      initialPeriod: '5',
      loanTerm: '30',
      indexRate: '2.5',
      margin: '2.25',
      periodicCap: '2',
      lifetimeCap: '5',
      adjustmentFrequency: '1',
      expectedIndexTrend: '0.5'
    };
    
    const scheduleResult = ARMMortgageCalculator.calculate(scheduleInputs);
    tests.push({
      test: 'Payment schedule generation',
      passed: scheduleResult.paymentSchedule.value.includes('Years 1-5') &&
              scheduleResult.paymentSchedule.value.includes('Year 6+') &&
              scheduleResult.rateAdjustments.value.includes('First adjustment')
    });

  } catch (error) {
    tests.push({
      test: 'Calculator execution',
      passed: false,
      error: error.message
    });
  }

  const allPassed = tests.every(test => test.passed);
  
  return {
    passed: allPassed,
    results: tests
  };
}

// Run validation immediately
const validation = validateCalculator();
console.log('ARM Mortgage Calculator Validation:', validation.passed ? 'PASSED' : 'FAILED');
if (!validation.passed) {
  console.log('Failed tests:', validation.results.filter(r => !r.passed));
}