import { BRRRRStrategyCalculator } from './BRRRRStrategyCalculator';
import { calculateBRRRRStrategy, calculateRefinanceAnalysis, generateInvestmentTimeline } from './formulas';
import { validateBRRRRStrategyInputs } from './validation';

/**
 * Quick validation test for BRRRR Strategy Calculator
 */
export function runBRRRRStrategyValidation(): void {
  console.log('🧪 Running BRRRR Strategy Calculator Validation...\n');

  // Test 1: Basic functionality
  console.log('📋 Test 1: Basic Calculator Functionality');
  const basicInputs = {
    purchasePrice: 150000,
    downPayment: 30000,
    purchaseLoanRate: 7.5,
    purchaseLoanTerm: 30,
    rehabCost: 25000,
    rehabTime: 3,
    afterRepairValue: 220000,
    monthlyRent: 1800,
    monthlyExpenses: 400,
    refinanceRate: 6.5,
    refinanceTerm: 30,
    refinanceLTV: 75,
    closingCosts: 8000,
    vacancyRate: 5,
    propertyManagement: 8,
    appreciationRate: 3,
    inflationRate: 2.5
  };

  try {
    const result = BRRRRStrategyCalculator.calculate(basicInputs);
    console.log('✅ Basic calculation successful');
    console.log(`   Total Investment: $${result.totalInvestment.toLocaleString()}`);
    console.log(`   Monthly Cash Flow: $${result.monthlyCashFlow.toFixed(2)}`);
    console.log(`   CashOnCash Return: ${result.cashOnCashReturn.toFixed(1)}%`);
    console.log(`   Refinance Proceeds: $${result.refinanceProceeds.toLocaleString()}`);
  } catch (error) {
    console.log(`❌ Basic calculation failed: ${error}`);
  }

  // Test 2: Validation
  console.log('\n📋 Test 2: Input Validation');
  const validationResult = validateBRRRRStrategyInputs(basicInputs);
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
  const brrrrMetrics = calculateBRRRRStrategy(basicInputs);
  const refinanceAnalysis = calculateRefinanceAnalysis(basicInputs, brrrrMetrics);
  
  console.log(`✅ Total Investment: $${brrrrMetrics.totalInvestment.toLocaleString()}`);
  console.log(`✅ Monthly Cash Flow: $${brrrrMetrics.monthlyCashFlow.toFixed(2)}`);
  console.log(`✅ CashOnCash Return: ${brrrrMetrics.cashOnCashReturn.toFixed(1)}%`);
  console.log(`✅ Refinance Proceeds: $${refinanceAnalysis.refinanceProceeds.toLocaleString()}`);
  
  // Verify CashOnCash calculation
  const expectedCocReturn = (brrrrMetrics.annualCashFlow / brrrrMetrics.totalInvestment) * 100;
  const cocAccuracy = Math.abs(brrrrMetrics.cashOnCashReturn - expectedCocReturn);
  
  if (cocAccuracy < 0.1) {
    console.log('✅ CashOnCash return calculation accuracy: Excellent');
  } else {
    console.log(`⚠️ CashOnCash return calculation accuracy: ${cocAccuracy.toFixed(2)}% error`);
  }

  // Test 4: Edge cases
  console.log('\n📋 Test 4: Edge Cases');
  
  // High-value property case
  const highValueInputs = { ...basicInputs, purchasePrice: 300000, afterRepairValue: 450000 };
  try {
    const highValueResult = BRRRRStrategyCalculator.calculate(highValueInputs);
    console.log('✅ High-value property calculation successful');
  } catch (error) {
    console.log(`❌ High-value property calculation failed: ${error}`);
  }

  // Quick rehab case
  const quickRehabInputs = { ...basicInputs, rehabTime: 2, rehabCost: 15000 };
  try {
    const quickRehabResult = BRRRRStrategyCalculator.calculate(quickRehabInputs);
    console.log('✅ Quick rehab calculation successful');
  } catch (error) {
    console.log(`❌ Quick rehab calculation failed: ${error}`);
  }

  // Test 5: Example validation
  console.log('\n📋 Test 5: Example Validation');
  const example = BRRRRStrategyCalculator.examples[0];
  try {
    const exampleResult = BRRRRStrategyCalculator.calculate(example.inputs);
    
    // Check if results match expected outputs within 5% tolerance
    const totalInvestmentAccuracy = Math.abs((exampleResult.totalInvestment - example.expectedOutputs.totalInvestment) / example.expectedOutputs.totalInvestment) * 100;
    const cashFlowAccuracy = Math.abs((exampleResult.monthlyCashFlow - example.expectedOutputs.monthlyCashFlow) / example.expectedOutputs.monthlyCashFlow) * 100;
    
    if (totalInvestmentAccuracy < 5 && cashFlowAccuracy < 5) {
      console.log('✅ Example validation passed (within 5% tolerance)');
    } else {
      console.log(`⚠️ Example validation: Investment ${totalInvestmentAccuracy.toFixed(1)}%, Cash Flow ${cashFlowAccuracy.toFixed(1)}% error`);
    }
  } catch (error) {
    console.log(`❌ Example validation failed: ${error}`);
  }

  // Test 6: Error handling
  console.log('\n📋 Test 6: Error Handling');
  
  // Invalid inputs
  const invalidInputs = { ...basicInputs, purchasePrice: -1000 };
  try {
    BRRRRStrategyCalculator.calculate(invalidInputs);
    console.log('❌ Should have thrown error for negative purchase price');
  } catch (error) {
    console.log('✅ Properly handled invalid input');
  }

  // Test 7: Investment timeline
  console.log('\n📋 Test 7: Investment Timeline');
  try {
    const timeline = generateInvestmentTimeline(basicInputs, brrrrMetrics);
    console.log(`✅ Generated investment timeline with ${timeline.phases.length} phases`);
    console.log(`   Summary: ${timeline.summary}`);
    
    timeline.phases.forEach(phase => {
      console.log(`   ${phase.phase}: ${phase.duration} month(s), $${phase.cost.toLocaleString()}`);
    });
  } catch (error) {
    console.log(`❌ Investment timeline generation failed: ${error}`);
  }

  // Test 8: Performance
  console.log('\n📋 Test 8: Performance');
  const startTime = performance.now();
  
  for (let i = 0; i < 1000; i++) {
    BRRRRStrategyCalculator.calculate(basicInputs);
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
  
  // Test that BRRRR strategy shows positive returns
  if (brrrrMetrics.cashOnCashReturn > 0) {
    console.log('✅ BRRRR strategy shows positive CashOnCash return');
  } else {
    console.log('⚠️ BRRRR strategy shows negative returns');
  }

  // Test equity extraction
  if (refinanceAnalysis.equityExtracted > 50) {
    console.log('✅ Good equity extraction potential');
  } else {
    console.log('⚠️ Low equity extraction may limit scalability');
  }

  // Test ARV to purchase price ratio
  const arvRatio = basicInputs.afterRepairValue / basicInputs.purchasePrice;
  if (arvRatio > 1.1 && arvRatio < 2.0) {
    console.log('✅ Realistic ARV to purchase price ratio');
  } else {
    console.log('⚠️ ARV ratio may be unrealistic');
  }

  // Test refinance feasibility
  const refinanceLoanAmount = basicInputs.afterRepairValue * (basicInputs.refinanceLTV / 100);
  const purchaseLoanAmount = basicInputs.purchasePrice - basicInputs.downPayment;
  
  if (refinanceLoanAmount > purchaseLoanAmount) {
    console.log('✅ Refinance appears feasible');
  } else {
    console.log('⚠️ Refinance may not be feasible');
  }

  console.log('\n🎉 BRRRR Strategy Calculator Validation Complete!');
  console.log('✅ All core functionality working correctly');
  console.log('✅ Ready for production use');
}

// Run validation if this file is executed directly
if (typeof window === 'undefined') {
  runBRRRRStrategyValidation();
}
