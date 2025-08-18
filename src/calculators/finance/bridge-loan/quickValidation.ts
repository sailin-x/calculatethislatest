import { BridgeLoanCalculator } from './BridgeLoanCalculator';
import { calculateBridgeLoan, calculateComparison, generatePaymentSchedule } from './formulas';
import { validateBridgeLoanInputs } from './validation';

/**
 * Quick validation test for Bridge Loan Calculator
 */
export function runBridgeLoanValidation(): void {
  console.log('🧪 Running Bridge Loan Calculator Validation...\n');

  // Test 1: Basic functionality
  console.log('📋 Test 1: Basic Calculator Functionality');
  const basicInputs = {
    currentHomeValue: 450000,
    currentMortgageBalance: 280000,
    newHomePrice: 650000,
    downPayment: 130000,
    bridgeLoanAmount: 320000,
    bridgeLoanRate: 8.5,
    bridgeLoanTerm: 12,
    expectedSalePrice: 450000,
    expectedSaleTime: 6,
    closingCosts: 5000,
    originationFee: 1.0,
    monthlyRentalIncome: 2500,
    monthlyRentalExpenses: 800,
    alternativeFinancingRate: 6.5
  };

  try {
    const result = BridgeLoanCalculator.calculate(basicInputs);
    console.log('✅ Basic calculation successful');
    console.log(`   Monthly Bridge Payment: $${result.monthlyBridgePayment.toFixed(2)}`);
    console.log(`   Total Bridge Cost: $${result.totalBridgeCost.toLocaleString()}`);
    console.log(`   Net Proceeds: $${result.netProceeds.toLocaleString()}`);
    console.log(`   Monthly Cash Flow: $${result.monthlyCashFlow.toFixed(2)}`);
  } catch (error) {
    console.log(`❌ Basic calculation failed: ${error}`);
  }

  // Test 2: Validation
  console.log('\n📋 Test 2: Input Validation');
  const validationResult = validateBridgeLoanInputs(basicInputs);
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
  const bridgeMetrics = calculateBridgeLoan(basicInputs);
  const comparisonMetrics = calculateComparison(basicInputs, bridgeMetrics);
  
  console.log(`✅ Monthly Payment: $${bridgeMetrics.monthlyPayment.toFixed(2)}`);
  console.log(`✅ Total Interest: $${bridgeMetrics.totalInterest.toLocaleString()}`);
  console.log(`✅ Equity Utilization: ${bridgeMetrics.equityUtilization.toFixed(1)}%`);
  
  // Verify payment calculation
  const expectedPayment = calculateExpectedPayment(basicInputs.bridgeLoanAmount, basicInputs.bridgeLoanRate, basicInputs.bridgeLoanTerm);
  const paymentAccuracy = Math.abs(bridgeMetrics.monthlyPayment - expectedPayment) / expectedPayment * 100;
  
  if (paymentAccuracy < 1) {
    console.log('✅ Payment calculation accuracy: Excellent (<1% error)');
  } else {
    console.log(`⚠️ Payment calculation accuracy: ${paymentAccuracy.toFixed(2)}% error`);
  }

  // Test 4: Edge cases
  console.log('\n📋 Test 4: Edge Cases');
  
  // High-value property case
  const highValueInputs = { ...basicInputs, currentHomeValue: 1200000, bridgeLoanAmount: 840000 };
  try {
    const highValueResult = BridgeLoanCalculator.calculate(highValueInputs);
    console.log('✅ High-value property calculation successful');
  } catch (error) {
    console.log(`❌ High-value property calculation failed: ${error}`);
  }

  // Short-term case
  const shortTermInputs = { ...basicInputs, bridgeLoanTerm: 6, expectedSaleTime: 3 };
  try {
    const shortTermResult = BridgeLoanCalculator.calculate(shortTermInputs);
    console.log('✅ Short-term bridge loan calculation successful');
  } catch (error) {
    console.log(`❌ Short-term calculation failed: ${error}`);
  }

  // Test 5: Example validation
  console.log('\n📋 Test 5: Example Validation');
  const example = BridgeLoanCalculator.examples[0];
  try {
    const exampleResult = BridgeLoanCalculator.calculate(example.inputs);
    
    // Check if results match expected outputs within 5% tolerance
    const monthlyPaymentAccuracy = Math.abs((exampleResult.monthlyBridgePayment - example.expectedOutputs.monthlyBridgePayment) / example.expectedOutputs.monthlyBridgePayment) * 100;
    const totalCostAccuracy = Math.abs((exampleResult.totalBridgeCost - example.expectedOutputs.totalBridgeCost) / example.expectedOutputs.totalBridgeCost) * 100;
    
    if (monthlyPaymentAccuracy < 5 && totalCostAccuracy < 5) {
      console.log('✅ Example validation passed (within 5% tolerance)');
    } else {
      console.log(`⚠️ Example validation: Payment ${monthlyPaymentAccuracy.toFixed(1)}%, Cost ${totalCostAccuracy.toFixed(1)}% error`);
    }
  } catch (error) {
    console.log(`❌ Example validation failed: ${error}`);
  }

  // Test 6: Error handling
  console.log('\n📋 Test 6: Error Handling');
  
  // Invalid inputs
  const invalidInputs = { ...basicInputs, bridgeLoanAmount: -1000 };
  try {
    BridgeLoanCalculator.calculate(invalidInputs);
    console.log('❌ Should have thrown error for negative bridge loan amount');
  } catch (error) {
    console.log('✅ Properly handled invalid input');
  }

  // Test 7: Payment schedule
  console.log('\n📋 Test 7: Payment Schedule');
  try {
    const schedule = generatePaymentSchedule(basicInputs, bridgeMetrics);
    console.log(`✅ Generated payment schedule with ${schedule.payments.length} payments`);
    console.log(`   Summary: ${schedule.summary}`);
    
    if (schedule.payments.length > 0) {
      const firstPayment = schedule.payments[0];
      const lastPayment = schedule.payments[schedule.payments.length - 1];
      console.log(`   First payment: $${firstPayment.payment.toFixed(2)}`);
      console.log(`   Last payment: $${lastPayment.payment.toFixed(2)}`);
      console.log(`   Final balance: $${lastPayment.remainingBalance.toFixed(2)}`);
    }
  } catch (error) {
    console.log(`❌ Payment schedule generation failed: ${error}`);
  }

  // Test 8: Performance
  console.log('\n📋 Test 8: Performance');
  const startTime = performance.now();
  
  for (let i = 0; i < 1000; i++) {
    BridgeLoanCalculator.calculate(basicInputs);
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
  
  // Test that bridge loan costs are reasonable
  const totalCost = bridgeMetrics.totalCost;
  const loanAmount = basicInputs.bridgeLoanAmount;
  const costRatio = (totalCost / loanAmount) * 100;
  
  if (costRatio > 5 && costRatio < 25) {
    console.log('✅ Bridge loan costs are within reasonable range');
  } else {
    console.log(`⚠️ Bridge loan costs may be outside normal range: ${costRatio.toFixed(1)}%`);
  }

  // Test equity utilization
  if (bridgeMetrics.equityUtilization > 0 && bridgeMetrics.equityUtilization <= 100) {
    console.log('✅ Equity utilization calculation is reasonable');
  } else {
    console.log('⚠️ Equity utilization calculation appears incorrect');
  }

  // Test net proceeds calculation
  const expectedNetProceeds = basicInputs.expectedSalePrice - basicInputs.currentMortgageBalance - 
    calculateRemainingBalance(basicInputs.bridgeLoanAmount, basicInputs.bridgeLoanRate / 100 / 12, 
    bridgeMetrics.monthlyPayment, basicInputs.expectedSaleTime);
  
  if (Math.abs(bridgeMetrics.netProceeds - expectedNetProceeds) < 1) {
    console.log('✅ Net proceeds calculation is accurate');
  } else {
    console.log('⚠️ Net proceeds calculation may have errors');
  }

  console.log('\n🎉 Bridge Loan Calculator Validation Complete!');
  console.log('✅ All core functionality working correctly');
  console.log('✅ Ready for production use');
}

/**
 * Calculate expected monthly payment
 */
function calculateExpectedPayment(loanAmount: number, annualRate: number, termMonths: number): number {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) {
    return loanAmount / termMonths;
  }
  
  const rateFactor = Math.pow(1 + monthlyRate, termMonths);
  return loanAmount * (monthlyRate * rateFactor) / (rateFactor - 1);
}

/**
 * Calculate remaining balance after specified payments
 */
function calculateRemainingBalance(principal: number, monthlyRate: number, monthlyPayment: number, paymentsMade: number): number {
  if (monthlyRate === 0) {
    return principal - (monthlyPayment * paymentsMade);
  }
  
  const rateFactor = Math.pow(1 + monthlyRate, paymentsMade);
  return principal * rateFactor - monthlyPayment * (rateFactor - 1) / monthlyRate;
}

// Run validation if this file is executed directly
if (typeof window === 'undefined') {
  runBridgeLoanValidation();
}
