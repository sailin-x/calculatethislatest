/**
 * Quick validation for Amortization Calculator
 * Self-contained testing without external dependencies
 */

import { AmortizationCalculator } from './AmortizationCalculator';

export function validateCalculator(): {
  passed: boolean;
  results: Array<{ test: string; passed: boolean; error?: string }>;
} {
  const tests = [];
  
  try {
    // Test 1: Standard 30-year mortgage
    const standardInputs = {
      loanAmount: '300000',
      interestRate: '4.5',
      loanTerm: '30',
      extraPayment: '0',
      oneTimePayment: '0',
      paymentFrequency: 'monthly',
      compoundingFrequency: 'monthly'
    };
    
    const standardResult = AmortizationCalculator.calculate(standardInputs);
    tests.push({
      test: 'Standard 30-year mortgage calculation',
      passed: Math.abs(standardResult.monthlyPayment.value - 1520.06) < 1 &&
              standardResult.totalInterest.value > 240000 &&
              standardResult.totalPayments.value > 540000
    });

    // Test 2: Mortgage with extra payments
    const extraPaymentInputs = {
      loanAmount: '300000',
      interestRate: '4.5',
      loanTerm: '30',
      extraPayment: '200',
      extraPaymentStart: '1',
      oneTimePayment: '10000',
      oneTimePaymentMonth: '12',
      paymentFrequency: 'monthly',
      compoundingFrequency: 'monthly'
    };
    
    const extraPaymentResult = AmortizationCalculator.calculate(extraPaymentInputs);
    tests.push({
      test: 'Mortgage with extra payments',
      passed: extraPaymentResult.interestSavings.value > 50000 &&
              extraPaymentResult.timeSavings.value.includes('years') &&
              extraPaymentResult.monthlyPayment.value === standardResult.monthlyPayment.value
    });

    // Test 3: Biweekly payments
    const biweeklyInputs = {
      loanAmount: '400000',
      interestRate: '5.0',
      loanTerm: '30',
      extraPayment: '0',
      oneTimePayment: '0',
      paymentFrequency: 'biweekly',
      compoundingFrequency: 'monthly'
    };
    
    const biweeklyResult = AmortizationCalculator.calculate(biweeklyInputs);
    tests.push({
      test: 'Biweekly payment calculation',
      passed: biweeklyResult.monthlyPayment.value > 1000 &&
              biweeklyResult.interestSavings.value > 0 &&
              biweeklyResult.timeSavings.value.includes('years')
    });

    // Test 4: Zero interest loan
    const zeroInterestInputs = {
      loanAmount: '120000',
      interestRate: '0',
      loanTerm: '10',
      extraPayment: '0',
      oneTimePayment: '0',
      paymentFrequency: 'monthly',
      compoundingFrequency: 'monthly'
    };
    
    const zeroInterestResult = AmortizationCalculator.calculate(zeroInterestInputs);
    tests.push({
      test: 'Zero interest loan handling',
      passed: zeroInterestResult.monthlyPayment.value === 1000 && // 120000 / (10 * 12)
              zeroInterestResult.totalInterest.value === 0 &&
              zeroInterestResult.totalPayments.value === 120000
    });

    // Test 5: Schedule breakdown generation
    const scheduleInputs = {
      loanAmount: '250000',
      interestRate: '4.0',
      loanTerm: '30',
      extraPayment: '0',
      oneTimePayment: '0',
      paymentFrequency: 'monthly',
      compoundingFrequency: 'monthly'
    };
    
    const scheduleResult = AmortizationCalculator.calculate(scheduleInputs);
    tests.push({
      test: 'Schedule breakdown generation',
      passed: scheduleResult.scheduleBreakdown.value.includes('Total payments') &&
              scheduleResult.scheduleBreakdown.value.includes('First year') &&
              scheduleResult.scheduleBreakdown.value.includes('Final year') &&
              scheduleResult.yearlyTotals.value.includes('total')
    });

    // Test 6: Large extra payment scenario
    const largeExtraInputs = {
      loanAmount: '200000',
      interestRate: '4.5',
      loanTerm: '30',
      extraPayment: '1000', // Large extra payment
      extraPaymentStart: '1',
      oneTimePayment: '0',
      oneTimePaymentMonth: '1',
      paymentFrequency: 'monthly',
      compoundingFrequency: 'monthly'
    };
    
    const largeExtraResult = AmortizationCalculator.calculate(largeExtraInputs);
    tests.push({
      test: 'Large extra payment scenario',
      passed: largeExtraResult.interestSavings.value > 80000 &&
              largeExtraResult.timeSavings.value.includes('years') &&
              largeExtraResult.totalInterest.value < 150000
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
console.log('Amortization Calculator Validation:', validation.passed ? 'PASSED' : 'FAILED');
if (!validation.passed) {
  console.log('Failed tests:', validation.results.filter(r => !r.passed));
}