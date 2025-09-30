import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HardinessCalculator } from './HardinessCalculator';

export function registerHardinessCalculator(): void {
  calculatorRegistry.register(HardinessCalculator);
}

export { HardinessCalculator };
