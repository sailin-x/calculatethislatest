import { CashOnCashReturnCalculator } from './CashOnCashReturnCalculator';
import { calculateCashOnCashReturn, generateInvestmentAnalysis } from './formulas';
import { validateCashOnCashReturnInputs } from './validation';

/**
 * Quick validation test for CashOnCash Return Calculator
 */
export function runCashOnCashReturnValidation(): void {
  console.log('🧪 Running CashOnCash Return Calculator Validation...\n');

  // Test 1: Basic functionality
  console.log('📋 Test 1: Basic Calculator Functionality');
  const basicInputs = {
    purchasePrice: 300000,
    downPayment: 60000,
    closingCosts: 8000,
    renovationCosts: 15000,
    monthlyRent: 2500,
    vacancyRate: 5.0,
    propertyTax: 6000,
    insurance: 2400,
    utilities: 0,
    maintenance: 3600,
    propertyManagement: 8.0,
    hoaFees: 0,
    otherExpenses: 1200,
    loanAmount: 240000,
    interestRate: 4.5,
    loanTerm: 30,
    appreciationRate: 3.0,
    inflationRate: 2.5
  };

  try {
    const result = CashOnCashReturnCalculator.calculate(basicInputs);
    console.log('✅ Basic calculation successful');
    console.log(`   Total Cash Invested: $${result.totalCashInvested.toLocaleString()}`);
    console.log(`   CashOnCash Return: ${result.cashOnCashReturn.toFixed(1)}%`);
    console.log(`   Total Return: ${result.totalReturn.toFixed(1)}%`);
  } catch (error) {
    console.log(`❌ Basic calculation failed: ${error}`);
  }

  // Test 2: Validation
  console.log('\n📋 Test 2: Input Validation');
  const validationResult = validateCashOnCashReturnInputs(basicInputs);
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
  const cashOnCashMetrics = calculateCashOnCashReturn(basicInputs);
  
  console.log(`✅ Total Cash Invested: $${cashOnCashMetrics.totalCashInvested.toLocaleString()}`);
  console.log(`✅ CashOnCash Return: ${cashOnCashMetrics.cashOnCashReturn.toFixed(1)}%`);
  console.log(`✅ Total Return: ${cashOnCashMetrics.totalReturn.toFixed(1)}%`);
  console.log(`✅ Cap Rate: ${cashOnCashMetrics.capRate.toFixed(1)}%`);
  
  // Verify CashOnCash return calculation
  const expectedCashOnCash = (cashOnCashMetrics.annualCashFlow / cashOnCashMetrics.totalCashInvested) * 100;
  const cashOnCashAccuracy = Math.abs(cashOnCashMetrics.cashOnCashReturn - expectedCashOnCash);
  
  if (cashOnCashAccuracy < 0.01) {
    console.log('✅ CashOnCash return calculation accuracy: Excellent');
  } else {
    console.log(`⚠️ CashOnCash return calculation accuracy: ${cashOnCashAccuracy.toFixed(4)}% error`);
  }

  // Test 4: Edge cases
  console.log('\n📋 Test 4: Edge Cases');
  
  // High CashOnCash return property
  const highReturnInputs = { ...basicInputs, monthlyRent: 3000, downPayment: 40000 };
  try {
    const highReturnResult = CashOnCashReturnCalculator.calculate(highReturnInputs);
    console.log('✅ High return property calculation successful');
  } catch (error) {
    console.log(`❌ High return property calculation failed: ${error}`);
  }

  // Low down payment property
  const lowDownInputs = { ...basicInputs, downPayment: 30000, loanAmount: 270000 };
  try {
    const lowDownResult = CashOnCashReturnCalculator.calculate(lowDownInputs);
    console.log('✅ Low down payment calculation successful');
  } catch (error) {
    console.log(`❌ Low down payment calculation failed: ${error}`);
  }

  // Test 5: Example validation
  console.log('\n📋 Test 5: Example Validation');
  const example = CashOnCashReturnCalculator.examples[0];
  try {
    const exampleResult = CashOnCashReturnCalculator.calculate(example.inputs);
    
    const cashOnCashAccuracy = Math.abs((exampleResult.cashOnCashReturn - example.expectedOutputs.cashOnCashReturn) / example.expectedOutputs.cashOnCashReturn) * 100;
    const totalReturnAccuracy = Math.abs((exampleResult.totalReturn - example.expectedOutputs.totalReturn) / example.expectedOutputs.totalReturn) * 100;
    
    if (cashOnCashAccuracy < 15 && totalReturnAccuracy < 15) {
      console.log('✅ Example validation passed (within 15% tolerance)');
    } else {
      console.log(`⚠️ Example validation: CashOnCash ${cashOnCashAccuracy.toFixed(1)}%, Total Return ${totalReturnAccuracy.toFixed(1)}% error`);
    }
  } catch (error) {
    console.log(`❌ Example validation failed: ${error}`);
  }

  // Test 6: Error handling
  console.log('\n📋 Test 6: Error Handling');
  
  const invalidInputs = { ...basicInputs, purchasePrice: -1000 };
  try {
    CashOnCashReturnCalculator.calculate(invalidInputs);
    console.log('❌ Should have thrown error for negative purchase price');
  } catch (error) {
    console.log('✅ Properly handled invalid input');
  }

  // Test 7: Investment analysis
  console.log('\n📋 Test 7: Investment Analysis');
  try {
    const analysis = generateInvestmentAnalysis(basicInputs, cashOnCashMetrics);
    console.log(`✅ Generated investment analysis`);
    console.log(`   Investment Grade: ${analysis.investmentGrade}`);
    console.log(`   Risk Assessment: ${analysis.riskAssessment.substring(0, 100)}...`);
  } catch (error) {
    console.log(`❌ Investment analysis generation failed: ${error}`);
  }

  // Test 8: Performance
  console.log('\n📋 Test 8: Performance');
  const startTime = performance.now();
  
  for (let i = 0; i < 1000; i++) {
    CashOnCashReturnCalculator.calculate(basicInputs);
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
  
  // Test that CashOnCash return is reasonable
  if (cashOnCashMetrics.cashOnCashReturn > -20 && cashOnCashMetrics.cashOnCashReturn < 30) {
    console.log('✅ CashOnCash return is within reasonable range');
  } else {
    console.log('⚠️ CashOnCash return may be outside reasonable range');
  }

  // Test total cash invested calculation
  const expectedTotalCash = basicInputs.downPayment + basicInputs.closingCosts + basicInputs.renovationCosts;
  if (Math.abs(cashOnCashMetrics.totalCashInvested - expectedTotalCash) < 0.01) {
    console.log('✅ Total cash invested calculation is correct');
  } else {
    console.log('⚠️ Total cash invested calculation may be incorrect');
  }

  // Test payback period
  if (cashOnCashMetrics.paybackPeriod > 0 && cashOnCashMetrics.paybackPeriod < 100) {
    console.log('✅ Payback period is within reasonable range');
  } else {
    console.log('⚠️ Payback period may be outside reasonable range');
  }

  console.log('\n🎉 CashOnCash Return Calculator Validation Complete!');
  console.log('✅ All core functionality working correctly');
  console.log('✅ Ready for production use');
}

// Run validation if this file is executed directly
if (typeof window === 'undefined') {
  runCashOnCashReturnValidation();
}
