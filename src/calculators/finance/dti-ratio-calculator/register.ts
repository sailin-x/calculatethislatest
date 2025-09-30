import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DtiRatioCalculator } from './DtiRatioCalculator';

export function registerDtiRatioCalculator(): void {
  calculatorRegistry.register(DtiRatioCalculator);
}

export { DtiRatioCalculator };
