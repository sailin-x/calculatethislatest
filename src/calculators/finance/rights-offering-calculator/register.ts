import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RightsOfferingCalculator } from './RightsOfferingCalculator';

export function registerRightsOfferingCalculator(): void {
  calculatorRegistry.register(RightsOfferingCalculator);
}

export { RightsOfferingCalculator };
