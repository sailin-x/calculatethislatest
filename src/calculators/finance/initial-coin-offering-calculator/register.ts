import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { InitialCoinOfferingCalculator } from './InitialCoinOfferingCalculator';

export function registerInitialCoinOfferingCalculator(): void {
  calculatorRegistry.register(InitialCoinOfferingCalculator);
}

export { InitialCoinOfferingCalculator };
