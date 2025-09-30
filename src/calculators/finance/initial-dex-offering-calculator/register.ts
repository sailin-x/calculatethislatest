import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { InitialDexOfferingCalculator } from './InitialDexOfferingCalculator';

export function registerInitialDexOfferingCalculator(): void {
  calculatorRegistry.register(InitialDexOfferingCalculator);
}

export { InitialDexOfferingCalculator };
