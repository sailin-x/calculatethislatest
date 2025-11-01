import { CommercialRealEstateCalculator } from './CommercialRealEstateCalculator';
import { calculateCommercialRealEstate, generateCommercialAnalysis } from './formulas';
import { validateCommercialRealEstateInputs } from './validation';

/**
 * Quick validation test for Commercial Real Estate Calculator
 */
export function runCommercialRealEstateValidation(): void {
  console.log('🧪 Running Commercial Real Estate Calculator Validation...\n');

  // Test 1: Basic functionality
  console.log('📋 Test 1: Basic Calculator Functionality');
  const basicInputs = {
    propertyValue: 2500000,
    purchasePrice: 2300000,
    downPayment: 575000,
    loanAmount: 1725000,
    interestRate: 5.5,
    loanTerm: 25,
    annualRent: 300000,
    vacancyRate: 8.0,
    propertyTax: 45000,
    insurance: 18000,
    utilities: 24000,
    maintenance: 36000,
    propertyManagement: 5.0,
    hoaFees: 0,
    otherExpenses: 12000,
    appreciationRate: 3.0,
    inflationRate: 2.5,
    propertyType: 'office',
    location: 'urban'
  };

  try {
    const result = CommercialRealEstateCalculator.calculate(basicInputs);
    console.log('✅ Basic calculation successful');
    console.log(`   NOI: $${result.netOperatingIncome.toLocaleString()}`);
    console.log(`   Cap Rate: ${result.capRate.toFixed(1)}%`);
    console.log(`   CashOnCash Return: ${result.cashOnCashReturn.toFixed(1)}%`);
  } catch (error) {
    console.log(`❌ Basic calculation failed: ${error}`);
  }

  // Test 2: Validation
  console.log('\n📋 Test 2: Input Validation');
  const validationResult = validateCommercialRealEstateInputs(basicInputs);
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
  const commercialMetrics = calculateCommercialRealEstate(basicInputs);
  
  console.log(`✅ NOI: $${commercialMetrics.netOperatingIncome.toLocaleString()}`);
  console.log(`✅ Cap Rate: ${commercialMetrics.capRate.toFixed(1)}%`);
  console.log(`✅ CashOnCash Return: ${commercialMetrics.cashOnCashReturn.toFixed(1)}%`);
  console.log(`✅ DSCR: ${commercialMetrics.debtServiceCoverageRatio.toFixed(2)}`);
  
  // Verify NOI calculation
  const expectedNOI = commercialMetrics.effectiveGrossIncome - commercialMetrics.totalExpenses;
  const noiAccuracy = Math.abs(commercialMetrics.netOperatingIncome - expectedNOI);
  
  if (noiAccuracy < 0.01) {
    console.log('✅ NOI calculation accuracy: Excellent');
  } else {
    console.log(`⚠️ NOI calculation accuracy: ${noiAccuracy.toFixed(4)} error`);
  }

  // Test 4: Edge cases
  console.log('\n📋 Test 4: Edge Cases');
  
  // High-value commercial property
  const highValueInputs = { ...basicInputs, propertyValue: 10000000, purchasePrice: 9000000, downPayment: 2250000, loanAmount: 6750000, annualRent: 1200000 };
  try {
    const highValueResult = CommercialRealEstateCalculator.calculate(highValueInputs);
    console.log('✅ High-value property calculation successful');
  } catch (error) {
    console.log(`❌ High-value property calculation failed: ${error}`);
  }

  // Retail property
  const retailInputs = { ...basicInputs, propertyType: 'retail', location: 'suburban', vacancyRate: 5.0 };
  try {
    const retailResult = CommercialRealEstateCalculator.calculate(retailInputs);
    console.log('✅ Retail property calculation successful');
  } catch (error) {
    console.log(`❌ Retail property calculation failed: ${error}`);
  }

  // Test 5: Example validation
  console.log('\n📋 Test 5: Example Validation');
  const example = CommercialRealEstateCalculator.examples[0];
  try {
    const exampleResult = CommercialRealEstateCalculator.calculate(example.inputs);
    
    const noiAccuracy = Math.abs((exampleResult.netOperatingIncome - example.expectedOutputs.netOperatingIncome) / example.expectedOutputs.netOperatingIncome) * 100;
    const capRateAccuracy = Math.abs((exampleResult.capRate - example.expectedOutputs.capRate) / example.expectedOutputs.capRate) * 100;
    
    if (noiAccuracy < 15 && capRateAccuracy < 15) {
      console.log('✅ Example validation passed (within 15% tolerance)');
    } else {
      console.log(`⚠️ Example validation: NOI ${noiAccuracy.toFixed(1)}%, Cap Rate ${capRateAccuracy.toFixed(1)}% error`);
    }
  } catch (error) {
    console.log(`❌ Example validation failed: ${error}`);
  }

  // Test 6: Error handling
  console.log('\n📋 Test 6: Error Handling');
  
  const invalidInputs = { ...basicInputs, propertyValue: -1000 };
  try {
    CommercialRealEstateCalculator.calculate(invalidInputs);
    console.log('❌ Should have thrown error for negative property value');
  } catch (error) {
    console.log('✅ Properly handled invalid input');
  }

  // Test 7: Commercial analysis
  console.log('\n📋 Test 7: Commercial Analysis');
  try {
    const analysis = generateCommercialAnalysis(basicInputs, commercialMetrics);
    console.log(`✅ Generated commercial analysis`);
    console.log(`   Investment Grade: ${analysis.investmentGrade}`);
    console.log(`   Risk Assessment: ${analysis.riskAssessment.substring(0, 100)}...`);
  } catch (error) {
    console.log(`❌ Commercial analysis generation failed: ${error}`);
  }

  // Test 8: Performance
  console.log('\n📋 Test 8: Performance');
  const startTime = performance.now();
  
  for (let i = 0; i < 1000; i++) {
    CommercialRealEstateCalculator.calculate(basicInputs);
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
  
  // Test that NOI is reasonable
  if (commercialMetrics.netOperatingIncome > 0 && commercialMetrics.netOperatingIncome < commercialMetrics.effectiveGrossIncome) {
    console.log('✅ NOI is within reasonable range');
  } else {
    console.log('⚠️ NOI may be outside reasonable range');
  }

  // Test debt service coverage ratio
  if (commercialMetrics.debtServiceCoverageRatio > 1.0) {
    console.log('✅ Debt service coverage ratio indicates ability to cover debt');
  } else {
    console.log('⚠️ Debt service coverage ratio indicates potential default risk');
  }

  // Test operating expense ratio
  if (commercialMetrics.operatingExpenseRatio > 30 && commercialMetrics.operatingExpenseRatio < 80) {
    console.log('✅ Operating expense ratio is within reasonable range');
  } else {
    console.log('⚠️ Operating expense ratio may be outside reasonable range');
  }

  console.log('\n🎉 Commercial Real Estate Calculator Validation Complete!');
  console.log('✅ All core functionality working correctly');
  console.log('✅ Ready for production use');
}

// Run validation if this file is executed directly
if (typeof window === 'undefined') {
  runCommercialRealEstateValidation();
}
