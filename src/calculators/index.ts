// Minimal calculator registry for testing
import { calculatorRegistry } from '../data/calculatorRegistry';

// Only import calculators we know work
import { mortgageCalculator } from './finance/mortgage';
import { portfolioCalculator } from './finance/investment';
import { personalInjuryCalculator } from './legal/personal-injury';
import { saasMetricsCalculator } from './business/saas-metrics';
import { bmrCalculator } from './health/bmr-tdee';
import { concreteCalculator } from './construction/concrete';

/**
 * Register minimal set of working calculators
 */
export function registerMinimalCalculators(): void {
  try {
    calculatorRegistry.register(mortgageCalculator);
    calculatorRegistry.register(portfolioCalculator);
    calculatorRegistry.register(personalInjuryCalculator);
    calculatorRegistry.register(saasMetricsCalculator);
    calculatorRegistry.register(bmrCalculator);
    calculatorRegistry.register(concreteCalculator);
    
    console.log('✅ Minimal calculators registered successfully');
  } catch (error) {
    console.error('❌ Error registering calculators:', error);
  }
}

// Auto-register calculators when module is imported
registerMinimalCalculators();