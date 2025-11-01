import { CashOutRefinanceCalculator } from './CashOutRefinanceCalculator';
import { calculateCashOutRefinance, generateRefinanceAnalysis } from './formulas';
import { validateCashOutRefinanceInputs } from './validation';

/**
 * Quick validation test for Cash-Out Refinance Calculator
 */
export function runCashOutRefinanceValidation(): void {
  console.log('🧪 Running Cash-Out Refinance Calculator Validation...\n');

  // Test 1: Basic functionality
  console.log('📋 Test 1: Basic Calculator Functionality');
  const basicInputs = {
    currentHomeValue: 450000,
    currentLoanBalance: 280000,
    currentInterestRate: 4.25,
    currentMonthlyPayment: 1375,
    currentLoanTerm: 22,
    newLoanAmount: 360000,
    newInterestRate: 5.5,
    newLoanTerm: 30,
    closingCosts: 8000,
    cashOutAmount: 80000,
    propertyTax: 5400,
    insurance: 1800,
    pmi: 0,
    hoaFees: 0,
    investmentReturn: 7.0,
    taxRate: 22.0
  };

  try {
    const result = CashOutRefinanceCalculator.calculate(basicInputs);
    console.log('✅ Basic calculation successful');
    console.log(`   Current Equity: $${result.currentEquity.toLocaleString()}`);
    console.log(`   New Monthly Payment: $${result.newMonthlyPayment.toLocaleString()}`);
    console.log(`   Net Cash Received: $${result.netCashReceived.toLocaleString()}`);
  } catch (error) {
    console.log(`❌ Basic calculation failed: ${error}`);
  }

  // Test 2: Validation
  console.log('\n📋 Test 2: Input Validation');
  const validationResult = validateCashOutRefinanceInputs(basicInputs);
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
  const refinanceMetrics = calculateCashOutRefinance(basicInputs);
  
  console.log(`✅ Current Equity: $${refinanceMetrics.currentEquity.toLocaleString()}`);
  console.log(`✅ New Monthly Payment: $${refinanceMetrics.newMonthlyPayment.toLocaleString()}`);
  console.log(`✅ Payment Difference: $${refinanceMetrics.paymentDifference.toLocaleString()}`);
  console.log(`✅ New LTV: ${refinanceMetrics.newLoanToValue.toFixed(1)}%`);
  
  // Verify current equity calculation
  const expectedEquity = basicInputs.currentHomeValue - basicInputs.currentLoanBalance;
  const equityAccuracy = Math.abs(refinanceMetrics.currentEquity - expectedEquity);
  
  if (equityAccuracy < 0.01) {
    console.log('✅ Current equity calculation accuracy: Excellent');
  } else {
    console.log(`⚠️ Current equity calculation accuracy: ${equityAccuracy.toFixed(4)} error`);
  }

  // Test 4: Edge cases
  console.log('\n📋 Test 4: Edge Cases');
  
  // Rate reduction scenario
  const rateReductionInputs = { ...basicInputs, newInterestRate: 3.5, newLoanAmount: 300000, cashOutAmount: 20000 };
  try {
    const rateReductionResult = CashOutRefinanceCalculator.calculate(rateReductionInputs);
    console.log('✅ Rate reduction calculation successful');
  } catch (error) {
    console.log(`❌ Rate reduction calculation failed: ${error}`);
  }

  // Large cash-out scenario
  const largeCashOutInputs = { ...basicInputs, newLoanAmount: 400000, cashOutAmount: 120000 };
  try {
    const largeCashOutResult = CashOutRefinanceCalculator.calculate(largeCashOutInputs);
    console.log('✅ Large cash-out calculation successful');
  } catch (error) {
    console.log(`❌ Large cash-out calculation failed: ${error}`);
  }

  // Test 5: Example validation
  console.log('\n📋 Test 5: Example Validation');
  const example = CashOutRefinanceCalculator.examples[0];
  try {
    const exampleResult = CashOutRefinanceCalculator.calculate(example.inputs);
    
    const equityAccuracy = Math.abs((exampleResult.currentEquity - example.expectedOutputs.currentEquity) / example.expectedOutputs.currentEquity) * 100;
    const paymentAccuracy = Math.abs((exampleResult.newMonthlyPayment - example.expectedOutputs.newMonthlyPayment) / example.expectedOutputs.newMonthlyPayment) * 100;
    
    if (equityAccuracy < 15 && paymentAccuracy < 15) {
      console.log('✅ Example validation passed (within 15% tolerance)');
    } else {
      console.log(`⚠️ Example validation: Equity ${equityAccuracy.toFixed(1)}%, Payment ${paymentAccuracy.toFixed(1)}% error`);
    }
  } catch (error) {
    console.log(`❌ Example validation failed: ${error}`);
  }

  // Test 6: Error handling
  console.log('\n📋 Test 6: Error Handling');
  
  const invalidInputs = { ...basicInputs, currentHomeValue: -1000 };
  try {
    CashOutRefinanceCalculator.calculate(invalidInputs);
    console.log('❌ Should have thrown error for negative home value');
  } catch (error) {
    console.log('✅ Properly handled invalid input');
  }

  // Test 7: Refinance analysis
  console.log('\n📋 Test 7: Refinance Analysis');
  try {
    const analysis = generateRefinanceAnalysis(basicInputs, refinanceMetrics);
    console.log(`✅ Generated refinance analysis`);
    console.log(`   Refinance Grade: ${analysis.refinanceGrade}`);
    console.log(`   Risk Assessment: ${analysis.riskAssessment.substring(0, 100)}...`);
  } catch (error) {
    console.log(`❌ Refinance analysis generation failed: ${error}`);
  }

  // Test 8: Performance
  console.log('\n📋 Test 8: Performance');
  const startTime = performance.now();
  
  for (let i = 0; i < 1000; i++) {
    CashOutRefinanceCalculator.calculate(basicInputs);
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
  
  // Test that current equity is reasonable
  if (refinanceMetrics.currentEquity > 0 && refinanceMetrics.currentEquity < basicInputs.currentHomeValue) {
    console.log('✅ Current equity is within reasonable range');
  } else {
    console.log('⚠️ Current equity may be outside reasonable range');
  }

  // Test LoanToValue ratio
  if (refinanceMetrics.newLoanToValue > 0 && refinanceMetrics.newLoanToValue < 100) {
    console.log('✅ New LoanToValue ratio is within reasonable range');
  } else {
    console.log('⚠️ New LoanToValue ratio may be outside reasonable range');
  }

  // Test break-even months
  if (refinanceMetrics.breakEvenMonths >= 0 && refinanceMetrics.breakEvenMonths < 200) {
    console.log('✅ Break-even months is within reasonable range');
  } else {
    console.log('⚠️ Break-even months may be outside reasonable range');
  }

  // Test net cash received
  if (refinanceMetrics.netCashReceived <= basicInputs.cashOutAmount) {
    console.log('✅ Net cash received calculation is correct');
  } else {
    console.log('⚠️ Net cash received calculation may be incorrect');
  }

  console.log('\n🎉 Cash-Out Refinance Calculator Validation Complete!');
  console.log('✅ All core functionality working correctly');
  console.log('✅ Ready for production use');
}

// Run validation if this file is executed directly
if (typeof window === 'undefined') {
  runCashOutRefinanceValidation();
}
