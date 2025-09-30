import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { KurtosisCalculator } from './KurtosisCalculator';

export function registerKurtosisCalculator(): void {
  calculatorRegistry.register(KurtosisCalculator);
}

export { KurtosisCalculator };
