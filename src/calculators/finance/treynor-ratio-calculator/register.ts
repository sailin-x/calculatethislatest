import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TreynorRatioCalculator } from './TreynorRatioCalculator';

export function registerTreynorRatioCalculator(): void {
  calculatorRegistry.register(TreynorRatioCalculator);
}

export { TreynorRatioCalculator };
