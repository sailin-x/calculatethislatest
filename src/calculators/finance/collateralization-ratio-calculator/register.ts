import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CollateralizationRatioCalculator } from './CollateralizationRatioCalculator';

export function registerCollateralizationRatioCalculator(): void {
  calculatorRegistry.register(CollateralizationRatioCalculator);
}

export { CollateralizationRatioCalculator };
