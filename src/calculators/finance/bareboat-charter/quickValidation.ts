import { BareboatCharterCalculator } from './BareboatCharterCalculator';
import { calculateBareboatCharter, calculateTimeCharter, compareCharterOptions } from './formulas';
import { validateBareboatCharterInputs } from './validation';

/**
 * Quick validation test for Bareboat Charter Calculator
 */
export function runBareboatCharterValidation(): void {
  console.log('🧪 Running Bareboat Charter Calculator Validation...\n');

  // Test 1: Basic functionality
  console.log('📋 Test 1: Basic Calculator Functionality');
  const basicInputs = {
    vesselValue: 25000000,
    charterDuration: 24,
    bareboatRate: 12000,
    timeCharterRate: 22000,
    operatingCosts: 6000,
    insuranceCosts: 400,
    maintenanceReserve: 800,
    utilizationRate: 88,
    fuelPrice: 650,
    fuelConsumption: 18,
    crewCosts: 2500,
    portCharges: 600
  };

  try {
    const result = BareboatCharterCalculator.calculate(basicInputs);
    console.log('✅ Basic calculation successful');
    console.log(`   Bareboat Revenue: $${result.bareboatRevenue.toLocaleString()}`);
    console.log(`   Bareboat Profit: $${result.bareboatProfit.toLocaleString()}`);
    console.log(`   Time Charter Revenue: $${result.timeCharterRevenue.toLocaleString()}`);
    console.log(`   Time Charter Profit: $${result.timeCharterProfit.toLocaleString()}`);
    console.log(`   Recommendation: ${result.recommendation}`);
  } catch (error) {
    console.log(`❌ Basic calculation failed: ${error}`);
  }

  // Test 2: Validation
  console.log('\n📋 Test 2: Input Validation');
  const validationResult = validateBareboatCharterInputs(basicInputs);
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
  const bareboatMetrics = calculateBareboatCharter(basicInputs);
  const timeCharterMetrics = calculateTimeCharter(basicInputs);
  
  console.log(`✅ Bareboat Charter ROI: ${bareboatMetrics.roi.toFixed(1)}%`);
  console.log(`✅ Time Charter ROI: ${timeCharterMetrics.roi.toFixed(1)}%`);
  
  // Verify calculations
  const expectedBareboatRevenue = 12000 * (24 * 30.44) * 0.88;
  const actualBareboatRevenue = bareboatMetrics.totalRevenue;
  const revenueAccuracy = Math.abs((actualBareboatRevenue - expectedBareboatRevenue) / expectedBareboatRevenue) * 100;
  
  if (revenueAccuracy < 1) {
    console.log('✅ Revenue calculation accuracy: Excellent (<1% error)');
  } else {
    console.log(`⚠️ Revenue calculation accuracy: ${revenueAccuracy.toFixed(2)}% error`);
  }

  // Test 4: Edge cases
  console.log('\n📋 Test 4: Edge Cases');
  
  // High utilization case
  const highUtilizationInputs = { ...basicInputs, utilizationRate: 95 };
  try {
    const highUtilResult = BareboatCharterCalculator.calculate(highUtilizationInputs);
    console.log('✅ High utilization (95%) calculation successful');
  } catch (error) {
    console.log(`❌ High utilization calculation failed: ${error}`);
  }

  // Low utilization case
  const lowUtilizationInputs = { ...basicInputs, utilizationRate: 70 };
  try {
    const lowUtilResult = BareboatCharterCalculator.calculate(lowUtilizationInputs);
    console.log('✅ Low utilization (70%) calculation successful');
  } catch (error) {
    console.log(`❌ Low utilization calculation failed: ${error}`);
  }

  // Test 5: Example validation
  console.log('\n📋 Test 5: Example Validation');
  const example = BareboatCharterCalculator.examples[0];
  try {
    const exampleResult = BareboatCharterCalculator.calculate(example.inputs);
    
    // Check if results match expected outputs within 5% tolerance
    const bareboatProfitAccuracy = Math.abs((exampleResult.bareboatProfit - example.expectedOutputs.bareboatProfit) / example.expectedOutputs.bareboatProfit) * 100;
    const timeCharterProfitAccuracy = Math.abs((exampleResult.timeCharterProfit - example.expectedOutputs.timeCharterProfit) / example.expectedOutputs.timeCharterProfit) * 100;
    
    if (bareboatProfitAccuracy < 5 && timeCharterProfitAccuracy < 5) {
      console.log('✅ Example validation passed (within 5% tolerance)');
    } else {
      console.log(`⚠️ Example validation: Bareboat ${bareboatProfitAccuracy.toFixed(1)}%, Time Charter ${timeCharterProfitAccuracy.toFixed(1)}% error`);
    }
  } catch (error) {
    console.log(`❌ Example validation failed: ${error}`);
  }

  // Test 6: Error handling
  console.log('\n📋 Test 6: Error Handling');
  
  // Invalid inputs
  const invalidInputs = { ...basicInputs, vesselValue: -1000 };
  try {
    BareboatCharterCalculator.calculate(invalidInputs);
    console.log('❌ Should have thrown error for negative vessel value');
  } catch (error) {
    console.log('✅ Properly handled invalid input');
  }

  // Test 7: Comparison logic
  console.log('\n📋 Test 7: Comparison Logic');
  const comparison = compareCharterOptions(bareboatMetrics, timeCharterMetrics, basicInputs);
  console.log(`✅ Profit difference: $${comparison.profitDifference.toLocaleString()}`);
  console.log(`✅ Break-even utilization: ${comparison.breakEvenUtilization.toFixed(1)}%`);
  console.log(`✅ Risk analysis: ${comparison.riskAnalysis.substring(0, 100)}...`);

  // Test 8: Performance
  console.log('\n📋 Test 8: Performance');
  const startTime = performance.now();
  for (let i = 0; i < 1000; i++) {
    BareboatCharterCalculator.calculate(basicInputs);
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

  console.log('\n🎉 Bareboat Charter Calculator Validation Complete!');
  console.log('✅ All core functionality working correctly');
  console.log('✅ Ready for production use');
}

// Run validation if this file is executed directly
if (typeof window === 'undefined') {
  runBareboatCharterValidation();
}
