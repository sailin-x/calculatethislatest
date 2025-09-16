// Calculator registry - imports and registers all calculators
import { calculatorRegistry } from '../data/calculatorRegistry';

// MINIMAL WORKING SET - Only properly implemented calculators
// Finance calculators
import { mortgageCalculator } from './finance/mortgage';
import { autoLoanCalculator } from './finance/auto-loan-calculator';
import { propertyTaxProrationCalculator } from './finance/property-tax-proration-calculator';
import { realEstateDevelopmentProFormaCalculator } from './finance/real-estate-development-pro-forma-calculator';
import { registerRealEstateDevelopmentProFormaCalculator } from './finance/real-estate-development-pro-forma-calculator/register';
import { realEstateDepreciationScheduleCalculator } from './finance/real-estate-depreciation-schedule-calculator';
import { registerRealEstateDepreciationScheduleCalculator } from './finance/real-estate-depreciation-schedule-calculator/register';
import { realEstateSyndicationCalculator } from './finance/real-estate-syndication-calculator';
import { registerRealEstateSyndicationCalculator } from './finance/real-estate-syndication-calculator/register';
import { realEstateTaxDeductionsCalculator } from './finance/real-estate-tax-deductions-calculator';
import { registerRealEstateTaxDeductionsCalculator } from './finance/real-estate-tax-deductions-calculator/register';
import { realEstateWaterfallModelCalculator } from './finance/real-estate-waterfall-model-calculator';
import { registerRealEstateWaterfallModelCalculator } from './finance/real-estate-waterfall-model-calculator/register';
import { mortgageRefinanceCalculator } from './finance/mortgage-refinance';
import { rentalPropertyROICalculator } from './finance/rental-property-roi-calculator';
import { registerRentalPropertyROICalculator } from './finance/rental-property-roi-calculator/register';
import { rentalYieldCalculator } from './finance/rental-yield-calculator';
import { registerRentalYieldCalculator } from './finance/rental-yield-calculator/register';
import { rentersInsuranceCalculator } from './finance/renters-insurance-calculator';
import { registerRentersInsuranceCalculator } from './finance/renters-insurance-calculator/register';
import { rentVsBuyCalculator } from './finance/rent-vs-buy-calculator';
import { registerRentVsBuyCalculator } from './finance/rent-vs-buy-calculator/register';
import { reverseMortgageCalculator } from './finance/reverse-mortgage-calculator';
import { registerReverseMortgageCalculator } from './finance/reverse-mortgage-calculator/register';
import { selfStorageFacilityROICalculator } from './finance/self-storage-facility-roi-calculator';
import { registerSelfStorageFacilityROICalculator } from './finance/self-storage-facility-roi-calculator/register';
import { tenantImprovementAllowanceCalculator } from './finance/tenant-improvement-ti-allowance-calculator';
import { registerTenantImprovementAllowanceCalculator } from './finance/tenant-improvement-ti-allowance-calculator/register';
import { timberlandInvestmentCalculator } from './finance/timberland-investment-calculator';
import { registerTimberlandInvestmentCalculator } from './finance/timberland-investment-calculator/register';
import { titleInsuranceCalculator } from './finance/title-insurance-calculator';
import { registerTitleInsuranceCalculator } from './finance/title-insurance-calculator/register';
import { usdaLoanCalculator } from './finance/usda-loan-calculator';
import { registerUSDALoanCalculator } from './finance/usda-loan-calculator/register';
import { annuityBuyoutCalculator } from './finance/annuity-buyout-calculator';
import { registerAnnuityBuyoutCalculator } from './finance/annuity-buyout-calculator/register';
import { aptValueCalculator } from './finance/asset-protection-trust-apt-value-calculator';
import { registerAPTValueCalculator } from './finance/asset-protection-trust-apt-value-calculator/register';
import { estatePlanningCalculator } from './finance/estate-planning-calculator';
import { registerEstatePlanningCalculator } from './finance/estate-planning-calculator/register';
import { estateTaxLiabilityCalculator } from './finance/estate-tax-liability-calculator';
import { registerEstateTaxLiabilityCalculator } from './finance/estate-tax-liability-calculator/register';
import { executiveDeferredCompensationCalculator } from './finance/executive-deferred-compensation-plan-calculator';
import { registerExecutiveDeferredCompensationCalculator } from './finance/executive-deferred-compensation-plan-calculator/register';
import { fafsaCalculator } from './finance/fafsa-calculator';
import { registerFAFSACalculator } from './finance/fafsa-calculator/register';
import { fixedIndexAnnuityCalculator } from './finance/fixed-index-annuity-calculator';
import { registerFixedIndexAnnuityCalculator } from './finance/fixed-index-annuity-calculator/register';
import { flexibleSpendingAccountCalculator } from './finance/flexible-spending-account-calculator';
import { registerFlexibleSpendingAccountCalculator } from './finance/flexible-spending-account-calculator/register';
import { generationSkippingTransferGstTaxCalculator } from './finance/generation-skipping-transfer-gst-tax-calculator';
import { registerGenerationSkippingTransferGstTaxCalculator } from './finance/generation-skipping-transfer-gst-tax-calculator/register';
import { giftTaxCalculator } from './finance/gift-tax-calculator';
import { registerGiftTaxCalculator } from './finance/gift-tax-calculator/register';
import { grantorRetainedAnnuityTrustCalculator } from './finance/grantor-retained-annuity-trust-grat-calculator';
import { registerGrantorRetainedAnnuityTrustCalculator } from './finance/grantor-retained-annuity-trust-grat-calculator/register';
import { healthSavingsAccountCalculator } from './finance/health-savings-account-hsa-calculator';
import { registerHealthSavingsAccountCalculator } from './finance/health-savings-account-hsa-calculator/register';
import { hsaTripleTaxAdvantageCalculator } from './finance/hsa-triple-tax-advantage-calculator';
import { registerHSATripleTaxAdvantageCalculator } from './finance/hsa-triple-tax-advantage-calculator/register';
import { immediateAnnuityPayoutCalculator } from './finance/immediate-annuity-payout-calculator';
import { registerImmediateAnnuityPayoutCalculator } from './finance/immediate-annuity-payout-calculator/register';
import { inheritanceTaxEstimator } from './finance/inheritance-tax-estimator';
import { registerInheritanceTaxEstimator } from './finance/inheritance-tax-estimator/register';

// Business calculators
import { paycheckCalculator } from './business/paycheck-calculator';
import developerSalaryCalculator from './career/developer-salary/register';

// Technology calculators
import { registerGPUMiningProfitabilityCalculator } from './technology/gpu-mining-profitability/register';
import { aiPromptCostCalculator } from './technology/ai-prompt-cost';

// Legal calculators
import { personalInjuryCalculator } from './legal/personal-injury';

// Health calculators
import { bmrCalculator } from './health/bmr-tdee';
import { calorieCalculator } from './health/calorie-calculator';

// Construction calculators
import { concreteCalculator } from './construction/concrete';

// Math calculators
import { statisticsCalculator } from './math/statistics';
import { algebraCalculator } from './math/algebra';
import { calculusCalculator } from './math/calculus';
import { geometryCalculator } from './math/geometry';
import { unitConversionCalculator } from './math/unit-conversion';
import { complexNumberCalculator } from './math/complex-numbers';
import { matrixCalculator } from './math/matrix';
import { scientificCalculator } from './math/scientific';

// Lifestyle calculators
import { automotiveCalculator } from './lifestyle/automotive';
import { cookingCalculator } from './lifestyle/cooking';
import { everydayCalculator } from './lifestyle/everyday';
import { hobbiesCalculator } from './lifestyle/hobbies';

/**
 * Register all calculators with the system
 */
export function registerAllCalculators(): void {
  // Finance calculators
  calculatorRegistry.register(mortgageCalculator);
  calculatorRegistry.register(autoLoanCalculator);
  calculatorRegistry.register(propertyTaxProrationCalculator);
  calculatorRegistry.register(realEstateDevelopmentProFormaCalculator);

  // Business calculators
  calculatorRegistry.register(paycheckCalculator);
  calculatorRegistry.register(developerSalaryCalculator);

  // Legal calculators
  calculatorRegistry.register(personalInjuryCalculator);

  // Health calculators
  calculatorRegistry.register(bmrCalculator);
  calculatorRegistry.register(calorieCalculator);

  // Construction calculators
  calculatorRegistry.register(concreteCalculator);

  // Math calculators
  calculatorRegistry.register(statisticsCalculator);
  calculatorRegistry.register(algebraCalculator);
  calculatorRegistry.register(calculusCalculator);
  calculatorRegistry.register(geometryCalculator);
  calculatorRegistry.register(unitConversionCalculator);
  calculatorRegistry.register(complexNumberCalculator);
  calculatorRegistry.register(matrixCalculator);
  calculatorRegistry.register(scientificCalculator);

  // Technology calculators
  registerGPUMiningProfitabilityCalculator();
  registerRealEstateDevelopmentProFormaCalculator();
  registerRealEstateDepreciationScheduleCalculator();
  registerRealEstateSyndicationCalculator();
  registerRealEstateTaxDeductionsCalculator();
  registerRealEstateWaterfallModelCalculator();
  calculatorRegistry.register(mortgageRefinanceCalculator);
  registerRentalPropertyROICalculator();
  registerRentalYieldCalculator();
  registerRentersInsuranceCalculator();
  registerRentVsBuyCalculator();
  registerReverseMortgageCalculator();
  registerSelfStorageFacilityROICalculator();
  registerTenantImprovementAllowanceCalculator();
  registerTimberlandInvestmentCalculator();
  registerTitleInsuranceCalculator();
  registerUSDALoanCalculator();
  registerAnnuityBuyoutCalculator();
  registerAPTValueCalculator();
  registerEstatePlanningCalculator();
  registerEstateTaxLiabilityCalculator();
  registerExecutiveDeferredCompensationCalculator();
  registerFAFSACalculator();
  registerFixedIndexAnnuityCalculator();
  registerFlexibleSpendingAccountCalculator();
  calculatorRegistry.register(generationSkippingTransferGstTaxCalculator);
  registerGiftTaxCalculator();
  registerGrantorRetainedAnnuityTrustCalculator();
  registerGrantorRetainedAnnuityTrustCalculator();
  registerHealthSavingsAccountCalculator();
  registerHSATripleTaxAdvantageCalculator();
  registerImmediateAnnuityPayoutCalculator();
  registerInheritanceTaxEstimator();
  // calculatorRegistry.register(aiPromptCostCalculator); // TODO: Fix interface compatibility

  // Lifestyle calculators
  calculatorRegistry.register(automotiveCalculator);
  calculatorRegistry.register(cookingCalculator);
  calculatorRegistry.register(everydayCalculator);
  calculatorRegistry.register(hobbiesCalculator);
}

// Auto-register calculators when module is imported
// Ensure all imports are resolved before registration
Promise.resolve().then(() => {
  registerAllCalculators();
});