/**
 * Quick validation for 1031 Exchange Calculator
 * Self-contained testing without external dependencies
 */

import { Exchange1031Calculator } from './Exchange1031Calculator';

export function validateCalculator(): {
  passed: boolean;
  results: Array<{ test: string; passed: boolean; error?: string }>;
} {
  const tests = [];
  
  try {
    // Test 1: Basic calculation
    const basicInputs = {
      originalPropertyValue: '500000',
      originalBasis: '300000',
      replacementPropertyValue: '600000',
      exchangeExpenses: '15000',
      capitalGainsTaxRate: '20',
      depreciationRecapture: '50000',
      bootReceived: '0'
    };
    
    const basicResult = Exchange1031Calculator.calculate(basicInputs);
    tests.push({
      test: 'Basic calculation',
      passed: basicResult.capitalGain.value === 200000 && 
              basicResult.exchangeQualifies.value === 'Yes' &&
              basicResult.newBasis.value === 400000
    });

    // Test 2: Exchange with boot
    const bootInputs = {
      originalPropertyValue: '800000',
      originalBasis: '400000',
      replacementPropertyValue: '750000',
      exchangeExpenses: '20000',
      capitalGainsTaxRate: '23.8',
      depreciationRecapture: '100000',
      bootReceived: '50000'
    };
    
    const bootResult = Exchange1031Calculator.calculate(bootInputs);
    tests.push({
      test: 'Exchange with boot',
      passed: bootResult.capitalGain.value === 400000 && 
              bootResult.taxOnBoot.value > 0 &&
              bootResult.netCashFlow.value < 50000
    });

    // Test 3: Non-qualifying exchange
    const nonQualifyingInputs = {
      originalPropertyValue: '500000',
      originalBasis: '300000',
      replacementPropertyValue: '400000',
      exchangeExpenses: '15000',
      capitalGainsTaxRate: '20',
      depreciationRecapture: '0',
      bootReceived: '0'
    };
    
    const nonQualifyingResult = Exchange1031Calculator.calculate(nonQualifyingInputs);
    tests.push({
      test: 'Non-qualifying exchange detection',
      passed: nonQualifyingResult.exchangeQualifies.value === 'No'
    });

    // Test 4: Zero capital gain
    const zeroGainInputs = {
      originalPropertyValue: '300000',
      originalBasis: '300000',
      replacementPropertyValue: '350000',
      exchangeExpenses: '10000',
      capitalGainsTaxRate: '20',
      depreciationRecapture: '0',
      bootReceived: '0'
    };
    
    const zeroGainResult = Exchange1031Calculator.calculate(zeroGainInputs);
    tests.push({
      test: 'Zero capital gain handling',
      passed: zeroGainResult.capitalGain.value === 0 && 
              zeroGainResult.deferredTax.value === 0 &&
              zeroGainResult.exchangeQualifies.value === 'Yes'
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
console.log('1031 Exchange Calculator Validation:', validation.passed ? 'PASSED' : 'FAILED');
if (!validation.passed) {
  console.log('Failed tests:', validation.results.filter(r => !r.passed));
}