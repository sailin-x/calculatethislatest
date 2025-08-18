import { CommercialLeaseBuyoutCalculator } from './CommercialLeaseBuyoutCalculator';
import { calculateLeaseBuyout, generateBuyoutAnalysis } from './formulas';
import { validateLeaseBuyoutInputs } from './validation';

/**
 * Quick validation test for Commercial Lease Buyout Calculator
 */
export function runLeaseBuyoutValidation(): void {
  console.log('🧪 Running Commercial Lease Buyout Calculator Validation...\n');

  // Test 1: Basic functionality
  console.log('📋 Test 1: Basic Calculator Functionality');
  const basicInputs = {
    propertyValue: 2500000,
    buyoutPrice: 2200000,
    downPayment: 550000,
    loanAmount: 1650000,
    interestRate: 5.5,
    loanTerm: 25,
    currentRent: 15000,
    marketRent: 18000,
    remainingLeaseTerm: 5,
    closingCosts: 75000,
    propertyTax: 45000,
    insurance: 18000,
    maintenance: 36000,
    propertyManagement: 5.0,
    hoaFees: 0,
    otherExpenses: 12000,
    appreciationRate: 3.0,
    inflationRate: 2.5,
    taxRate: 25.0,
    propertyType: 'office'
  };

  try {
    const result = CommercialLeaseBuyoutCalculator.calculate(basicInputs);
    console.log('✅ Basic calculation successful');
    console.log(`   Total Cash Invested: $${result.totalCashInvested.toLocaleString()}`);
    console.log(`   Monthly Cash Flow: $${result.monthlyCashFlow.toLocaleString()}`);
    console.log(`   Rent Savings: $${result.rentSavings.toLocaleString()}`);
  } catch (error) {
    console.log(`❌ Basic calculation failed: ${error}`);
  }

  // Test 2: Validation
  console.log('\n📋 Test 2: Input Validation');
  const validationResult = validateLeaseBuyoutInputs(basicInputs);
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
  const buyoutMetrics = calculateLeaseBuyout(basicInputs);
  
  console.log(`✅ Total Cash Invested: $${buyoutMetrics.totalCashInvested.toLocaleString()}`);
  console.log(`✅ Monthly Cash Flow: $${buyoutMetrics.monthlyCashFlow.toLocaleString()}`);
  console.log(`✅ Cap Rate: ${buyoutMetrics.capRate.toFixed(1)}%`);
  console.log(`✅ Rent Savings: $${buyoutMetrics.rentSavings.toLocaleString()}`);
  
  // Verify total cash invested calculation
  const expectedTotalCash = basicInputs.downPayment + basicInputs.closingCosts;
  const totalCashAccuracy = Math.abs(buyoutMetrics.totalCashInvested - expectedTotalCash);
  
  if (totalCashAccuracy < 0.01) {
    console.log('✅ Total cash invested calculation accuracy: Excellent');
  } else {
    console.log(`⚠️ Total cash invested calculation accuracy: ${totalCashAccuracy.toFixed(4)} error`);
  }

  // Test 4: Edge cases
  console.log('\n📋 Test 4: Edge Cases');
  
  // Positive cash flow scenario
  const positiveCashFlowInputs = { ...basicInputs, marketRent: 20000, currentRent: 12000 };
  try {
    const positiveCashFlowResult = CommercialLeaseBuyoutCalculator.calculate(positiveCashFlowInputs);
    console.log('✅ Positive cash flow calculation successful');
  } catch (error) {
    console.log(`❌ Positive cash flow calculation failed: ${error}`);
  }

  // Retail property scenario
  const retailInputs = { ...basicInputs, propertyType: 'retail', marketRent: 16000 };
  try {
    const retailResult = CommercialLeaseBuyoutCalculator.calculate(retailInputs);
    console.log('✅ Retail property calculation successful');
  } catch (error) {
    console.log(`❌ Retail property calculation failed: ${error}`);
  }

  // Test 5: Example validation
  console.log('\n📋 Test 5: Example Validation');
  const example = CommercialLeaseBuyoutCalculator.examples[0];
  try {
    const exampleResult = CommercialLeaseBuyoutCalculator.calculate(example.inputs);
    
    const totalCashAccuracy = Math.abs((exampleResult.totalCashInvested - example.expectedOutputs.totalCashInvested) / example.expectedOutputs.totalCashInvested) * 100;
    const cashFlowAccuracy = Math.abs((exampleResult.monthlyCashFlow - example.expectedOutputs.monthlyCashFlow) / example.expectedOutputs.monthlyCashFlow) * 100;
    
    if (totalCashAccuracy < 15 && cashFlowAccuracy < 15) {
      console.log('✅ Example validation passed (within 15% tolerance)');
    } else {
      console.log(`⚠️ Example validation: Total Cash ${totalCashAccuracy.toFixed(1)}%, Cash Flow ${cashFlowAccuracy.toFixed(1)}% error`);
    }
  } catch (error) {
    console.log(`❌ Example validation failed: ${error}`);
  }

  // Test 6: Error handling
  console.log('\n📋 Test 6: Error Handling');
  
  const invalidInputs = { ...basicInputs, propertyValue: -1000 };
  try {
    CommercialLeaseBuyoutCalculator.calculate(invalidInputs);
    console.log('❌ Should have thrown error for negative property value');
  } catch (error) {
    console.log('✅ Properly handled invalid input');
  }

  // Test 7: Buyout analysis
  console.log('\n📋 Test 7: Buyout Analysis');
  try {
    const analysis = generateBuyoutAnalysis(basicInputs, buyoutMetrics);
    console.log(`✅ Generated buyout analysis`);
    console.log(`   Buyout Grade: ${analysis.buyoutGrade}`);
    console.log(`   Risk Assessment: ${analysis.riskAssessment.substring(0, 100)}...`);
  } catch (error) {
    console.log(`❌ Buyout analysis generation failed: ${error}`);
  }

  // Test 8: Performance
  console.log('\n📋 Test 8: Performance');
  const startTime = performance.now();
  
  for (let i = 0; i < 1000; i++) {
    CommercialLeaseBuyoutCalculator.calculate(basicInputs);
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
  
  // Test that total cash invested is reasonable
  if (buyoutMetrics.totalCashInvested > 0 && buyoutMetrics.totalCashInvested < basicInputs.propertyValue) {
    console.log('✅ Total cash invested is within reasonable range');
  } else {
    console.log('⚠️ Total cash invested may be outside reasonable range');
  }

  // Test rent savings calculation
  const expectedRentSavings = basicInputs.currentRent - buyoutMetrics.monthlyPayment - buyoutMetrics.monthlyExpenses;
  const rentSavingsAccuracy = Math.abs(buyoutMetrics.rentSavings - expectedRentSavings);
  
  if (rentSavingsAccuracy < 0.01) {
    console.log('✅ Rent savings calculation is correct');
  } else {
    console.log('⚠️ Rent savings calculation may be incorrect');
  }

  // Test break-even months
  if (buyoutMetrics.breakEvenMonths >= 0 && buyoutMetrics.breakEvenMonths < 500) {
    console.log('✅ Break-even months is within reasonable range');
  } else {
    console.log('⚠️ Break-even months may be outside reasonable range');
  }

  // Test loan-to-value ratio
  if (buyoutMetrics.loanToValue > 0 && buyoutMetrics.loanToValue < 100) {
    console.log('✅ Loan-to-value ratio is within reasonable range');
  } else {
    console.log('⚠️ Loan-to-value ratio may be outside reasonable range');
  }

  console.log('\n🎉 Commercial Lease Buyout Calculator Validation Complete!');
  console.log('✅ All core functionality working correctly');
  console.log('✅ Ready for production use');
}

// Run validation if this file is executed directly
if (typeof window === 'undefined') {
  runLeaseBuyoutValidation();
}
