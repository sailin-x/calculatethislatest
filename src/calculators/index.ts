// Calculator registry - imports and registers all calculators
import { calculatorRegistry } from '../data/calculatorRegistry';

// Finance calculators
import { mortgageCalculator } from './finance/mortgage';
import { portfolioCalculator } from './finance/investment';
import { balloonMortgageCalculator } from './finance/balloon-mortgage';
import { bareboatCharterCalculator } from './finance/bareboat-charter';
import { biweeklyMortgageCalculator } from './finance/biweekly-mortgage';
import { bridgeLoanCalculator } from './finance/bridge-loan';
import { brrrrStrategyCalculator } from './finance/brrrr-strategy';
import { buildingReplacementCostCalculator } from './finance/building-replacement-cost';
import { capRateCalculator } from './finance/cap-rate';
import { cashFlowCalculator } from './finance/cash-flow';
import { cashOnCashReturnCalculator } from './finance/cash-on-cash-return';
import { commercialRealEstateCalculator } from './finance/commercial-real-estate';
import { cashOutRefinanceCalculator } from './finance/cash-out-refinance';
import { registerLoanToValueRatioCalculator } from './finance/loan-to-value-ratio/register';
import { registerMezzanineFinancingCalculator } from './finance/mezzanine-financing/register';
import { registerMortgageAPRComparisonCalculator } from './finance/mortgage-apr-comparison/register';

// Legal calculators
import { personalInjuryCalculator } from './legal/personal-injury';

// Business calculators
import { saasMetricsCalculator } from './business/saas-metrics';

// Health calculators
import { bmrCalculator } from './health/bmr-tdee';

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
  // Finance & Investment calculators
  calculatorRegistry.register(mortgageCalculator);
  calculatorRegistry.register(portfolioCalculator);
  calculatorRegistry.register(balloonMortgageCalculator);
  calculatorRegistry.register(bareboatCharterCalculator);
  calculatorRegistry.register(biweeklyMortgageCalculator);
  calculatorRegistry.register(bridgeLoanCalculator);
  calculatorRegistry.register(brrrrStrategyCalculator);
  calculatorRegistry.register(buildingReplacementCostCalculator);
  calculatorRegistry.register(capRateCalculator);
  calculatorRegistry.register(cashFlowCalculator);
  calculatorRegistry.register(cashOnCashReturnCalculator);
  calculatorRegistry.register(commercialRealEstateCalculator);
  calculatorRegistry.register(cashOutRefinanceCalculator);
  registerLoanToValueRatioCalculator(calculatorRegistry);
  registerMezzanineFinancingCalculator(calculatorRegistry);
  registerMortgageAPRComparisonCalculator(calculatorRegistry);
  
  // Legal & Settlement calculators
  calculatorRegistry.register(personalInjuryCalculator);
  
  // Business & Operations calculators
  calculatorRegistry.register(saasMetricsCalculator);
  
  // Health & Fitness calculators
  calculatorRegistry.register(bmrCalculator);
  
  // Construction & Industrial calculators
  calculatorRegistry.register(concreteCalculator);
  
  // Math & Science calculators
  calculatorRegistry.register(statisticsCalculator);
  calculatorRegistry.register(algebraCalculator);
  calculatorRegistry.register(calculusCalculator);
  calculatorRegistry.register(geometryCalculator);
  calculatorRegistry.register(unitConversionCalculator);
  calculatorRegistry.register(complexNumberCalculator);
  calculatorRegistry.register(matrixCalculator);
  calculatorRegistry.register(scientificCalculator);
  
  // Lifestyle & Automotive calculators
  calculatorRegistry.register(automotiveCalculator);
  calculatorRegistry.register(cookingCalculator);
  calculatorRegistry.register(everydayCalculator);
  calculatorRegistry.register(hobbiesCalculator);
  
  // TODO: Add more calculators as they are implemented
  // calculatorRegistry.register(retirementCalculator);
  // etc.
}

// Auto-register calculators when module is imported
registerAllCalculators();