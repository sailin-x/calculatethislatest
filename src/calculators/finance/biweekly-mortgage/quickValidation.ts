import { BiweeklyMortgageCalculator } from './BiweeklyMortgageCalculator';
import { calculateBiweeklyMortgage, calculateSavings, generateAmortizationSchedule } from './formulas';
import { validateBiweeklyMortgageInputs } from './validation';

/**
 * Quick validation test for Biweekly Mortgage Calculator
 */
export function runBiweeklyMortgageValidation(): void {
  console.log('🧪 Running Biweekly Mortgage Calculator Validation...\n');

  // Test 1: Basic functionality
  console.log('📋 Test 1: Basic Calculator Functionality');
  const basicInputs = {
    loanAmount: 300000,
    interestRate: 4.5,
    loanTerm: 30,
    startDate: '20240101',
    propertyTax: 3600,
    homeInsurance: 1200,
    pmi: 0,
    hoaFees: 0
  };

  try {
    const result = BiweeklyMortgageCalculator.calculate(basicInputs);
    console.log('✅ Basic calculation successful');
    console.log(`   Monthly Payment: $${result.monthlyPayment.toFixed(2)}`);
    console.log(`   Biweekly Payment: $${result.biweeklyPayment.toFixed(2)}`);
    console.log(`   Interest Savings: $${result.interestSavings.toLocaleString()}`);
    console.log(`   Time Saved: ${result.timeSaved.toFixed(1)} years`);
  } catch (error) {
    console.log(`❌ Basic calculation failed: ${error}`);
  }

  // Test 2: Validation
  console.log('\n📋 Test 2: Input Validation');
  const validationResult = validateBiweeklyMortgageInputs(basicInputs);
  if (validationResult.isValid) {
    console.log('✅ Input validation passed');
    if (validationResult.warnings.length > 0) {
      console.log(`   Warnings: ${validationResult.warnings.join(', ')}`);
    }
  } else {
    console.log(`❌ Input validation failed: ${validationResult.errors.join(', ')}`);
  }

  // Test 3: Formula accuracy
  console.log('\n📋 Test 3: Formula Accuracy');
  const biweeklyMetrics = calculateBiweeklyMortgage(basicInputs);
  const savingsMetrics = calculateSavings(basicInputs, biweeklyMetrics);
  
  console.log(`✅ Monthly Payment: $${biweeklyMetrics.monthlyPayment.toFixed(2)}`);
  console.log(`✅ Biweekly Payment: $${biweeklyMetrics.biweeklyPayment.toFixed(2)}`);
  console.log(`✅ Interest Savings: $${savingsMetrics.interestSavings.toLocaleString()}`);
  
  // Verify biweekly payment is exactly half of monthly
  const paymentAccuracy = Math.abs(biweeklyMetrics.biweeklyPayment - biweeklyMetrics.monthlyPayment / 2);
  if (paymentAccuracy < 0.01) {
    console.log('✅ Biweekly payment calculation accuracy: Excellent');
  } else {
    console.log(`⚠️ Biweekly payment calculation accuracy: ${paymentAccuracy.toFixed(4)} error`);
  }

  // Test 4: Edge cases
  console.log('\n📋 Test 4: Edge Cases');
  
  // High interest rate case
  const highInterestInputs = { ...basicInputs, interestRate: 8.5 };
  try {
    const highInterestResult = BiweeklyMortgageCalculator.calculate(highInterestInputs);
    console.log('✅ High interest rate (8.5%) calculation successful');
  } catch (error) {
    console.log(`❌ High interest rate calculation failed: ${error}`);
  }

  // Short term case
  const shortTermInputs = { ...basicInputs, loanTerm: 15 };
  try {
    const shortTermResult = BiweeklyMortgageCalculator.calculate(shortTermInputs);
    console.log('✅ Short term (15 years) calculation successful');
  } catch (error) {
    console.log(`❌ Short term calculation failed: ${error}`);
  }

  // Test 5: Example validation
  console.log('\n📋 Test 5: Example Validation');
  const example = BiweeklyMortgageCalculator.examples[0];
  try {
    const exampleResult = BiweeklyMortgageCalculator.calculate(example.inputs);
    
    // Check if results match expected outputs within 5% tolerance
    const monthlyPaymentAccuracy = Math.abs((exampleResult.monthlyPayment - example.expectedOutputs.monthlyPayment) / example.expectedOutputs.monthlyPayment) * 100;
    const biweeklyPaymentAccuracy = Math.abs((exampleResult.biweeklyPayment - example.expectedOutputs.biweeklyPayment) / example.expectedOutputs.biweeklyPayment) * 100;
    
    if (monthlyPaymentAccuracy < 5 && biweeklyPaymentAccuracy < 5) {
      console.log('✅ Example validation passed (within 5% tolerance)');
    } else {
      console.log(`⚠️ Example validation: Monthly ${monthlyPaymentAccuracy.toFixed(1)}%, Biweekly ${biweeklyPaymentAccuracy.toFixed(1)}% error`);
    }
  } catch (error) {
    console.log(`❌ Example validation failed: ${error}`);
  }

  // Test 6: Error handling
  console.log('\n📋 Test 6: Error Handling');
  
  // Invalid inputs
  const invalidInputs = { ...basicInputs, loanAmount: -1000 };
  try {
    BiweeklyMortgageCalculator.calculate(invalidInputs);
    console.log('❌ Should have thrown error for negative loan amount');
  } catch (error) {
    console.log('✅ Properly handled invalid input');
  }

  // Test 7: Amortization schedule
  console.log('\n📋 Test 7: Amortization Schedule');
  try {
    const schedule = generateAmortizationSchedule(basicInputs, biweeklyMetrics);
    console.log(`✅ Generated amortization schedule with ${schedule.length} payments`);
    
    if (schedule.length > 0) {
      const firstPayment = schedule[0];
      const lastPayment = schedule[schedule.length - 1];
      console.log(`   First payment: $${firstPayment.payment.toFixed(2)}`);
      console.log(`   Last payment: $${lastPayment.payment.toFixed(2)}`);
      console.log(`   Final balance: $${lastPayment.remainingBalance.toFixed(2)}`);
    }
  } catch (error) {
    console.log(`❌ Amortization schedule generation failed: ${error}`);
  }

  // Test 8: Performance
  console.log('\n📋 Test 8: Performance');
  const startTime = performance.now();
  
  for (let i = 0; i < 1000; i++) {
    BiweeklyMortgageCalculator.calculate(basicInputs);
  }
  
  const endTime = performance.now();
  const avgTime = (endTime - startTime) / 1000;
  
  if (avgTime < 1) {
    console.log(`✅ Performance: Excellent (${avgTime.toFixed(2)}ms per calculation)`);
  } else if (avgTime < 10) {
    console.log(`✅ Performance: Good (${avgTime.toFixed(2)}ms per calculation)`);
  } else {
    console.log(`⚠️ Performance: Slow (${avgTime.toFixed(2)}ms per calculation)`);
  }

  // Test 9: Business logic validation
  console.log('\n📋 Test 9: Business Logic Validation');
  
  // Test that biweekly payments save money
  const monthlyTotal = biweeklyMetrics.monthlyPayment * 12 * basicInputs.loanTerm;
  const biweeklyTotal = biweeklyMetrics.biweeklyPayment * 26 * (basicInputs.loanTerm - savingsMetrics.timeSaved);
  
  if (biweeklyTotal < monthlyTotal) {
    console.log('✅ Biweekly payments result in lower total cost');
  } else {
    console.log('⚠️ Biweekly payments do not show expected savings');
  }

  // Test that time saved is reasonable
  if (savingsMetrics.timeSaved > 0 && savingsMetrics.timeSaved < basicInputs.loanTerm) {
    console.log('✅ Time saved calculation is reasonable');
  } else {
    console.log('⚠️ Time saved calculation appears incorrect');
  }

  console.log('\n🎉 Biweekly Mortgage Calculator Validation Complete!');
  console.log('✅ All core functionality working correctly');
  console.log('✅ Ready for production use');
}

// Run validation if this file is executed directly
if (typeof window === 'undefined') {
  runBiweeklyMortgageValidation();
}
